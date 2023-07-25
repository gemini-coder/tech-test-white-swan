import React, {
    createContext,
    ReactElement,
    useContext,
    useEffect,
    useState,
} from 'react';
import { TAuthContext, TUser } from '../models/auth';
import { Auth } from './AuthController';

const auth = new Auth();

export const AuthContext = createContext<TAuthContext | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const [user, setUser] = useState<TUser | null>(auth.user);
    const [initialising, setInitialising] = useState(true);

    useEffect(() => {
        auth.resolveUser().onAuthStateChanged(async (user: TUser | null) => {
            setUser(user);
            setInitialising(false);
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: user,
                initialising: initialising,
                auth: auth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
