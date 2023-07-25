import React, { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

const TopNavigation = () => {
    const { auth } = useAuth();

    const handleLogout = useCallback(() => {
        auth.signOut();
    }, [auth]);

    return (
        <div className={`p-3 flex justify-between`}>
            <p>F&O</p>
            <p className={`cursor-pointer`} onClick={handleLogout}>
                Logout
            </p>
        </div>
    );
};

export default TopNavigation;
