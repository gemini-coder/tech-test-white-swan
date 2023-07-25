import React, { ReactElement, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}) => {
    const { user, initialising } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!initialising) {
            if (!user) navigate('/login');
        }
    }, [initialising, navigate, user]);

    if (initialising) return <p>Loading Application...</p>;

    return <>{children}</>;
};

export default AuthGuard;
