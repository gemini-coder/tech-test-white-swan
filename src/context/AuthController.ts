import { AuthUser, TUser } from '../models/auth';

type UserCallback = (
    user: TUser | null,
    error: { message: string } | undefined
) => void;

const users: AuthUser[] = [
    {
        username: 'user',
        password: 'user',
        name: 'Joe Bloggs',
        permissions: ['restricted'],
    },
    {
        username: 'manager',
        password: 'manager',
        name: 'Franchesca Lovejoy (Manager)',
        permissions: ['accessAllAreas'],
    },
];

export class Auth {
    public user: TUser | null;
    private error: { message: string } | null;
    private callback!: UserCallback | null;

    public constructor() {
        this.user = null;
        this.error = null;
    }

    public onAuthStateChanged(callback: UserCallback) {
        this.callback = callback;
        return () => {
            this.callback = null;
        };
    }

    protected onUserChange(user: TUser | null, error?: { message: string }) {
        this.callback && this.callback(user, error);
    }

    public resolveUser() {
        const localUser = localStorage.getItem('user');
        if (localUser) {
            this.user = JSON.parse(localUser);
        }
        this.onUserChange(this.user);
        return this;
    }

    public async signIn(username: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            // For development purposes only - to replicate a delay in logging in
            setTimeout(async () => {
                const _user = users.find(
                    (user) =>
                        user.username === username && user.password === password
                );
                if (_user) {
                    await this.setUser({
                        username: _user.username,
                        name: _user.name,
                        permissions: _user.permissions,
                    });
                    resolve();
                } else {
                    reject('User not found');
                }
            }, 1500);
        });
    }

    public signOut() {
        this.unsetUser();
    }

    private async setUser(user: TUser) {
        if (!user) {
            await this.unsetUser();
        } else {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            this.onUserChange(this.user);
        }
    }

    private unsetUser(error?: { message: string }) {
        this.user = null;
        localStorage.removeItem('user');
        this.onUserChange(this.user, error);
    }
}
