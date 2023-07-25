import React from 'react';
import StaticLayout from '../layouts/StaticLayout';
import LoginForm from '../components/authenticaton/LoginForm';

const LoginPage = () => {
    return (
        <StaticLayout>
            <div className={`h-full grid place-content-center`}>
                <LoginForm />
            </div>
        </StaticLayout>
    );
};

export default LoginPage;
