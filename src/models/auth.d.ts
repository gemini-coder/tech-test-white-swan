import { Auth } from '../context/AuthController';

export type TPermissions = 'accessAllAreas' | 'restricted';

export type AuthUser = {
    username: string;
    password: string;
    name: string;
    permissions: TPermissions[];
};

export type TUser = {
    username: string;
    name: string;
    permissions: TPermissions[];
};

export type TAuthContext = {
    user: TUser | null;
    initialising: boolean;
    auth: Auth;
};
