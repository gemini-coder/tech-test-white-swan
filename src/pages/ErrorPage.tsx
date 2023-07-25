import React from 'react';
import StaticLayout from '../layouts/StaticLayout';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ error }: { error: unknown }) => {
    const navigate = useNavigate();

    return (
        <StaticLayout>
            <div className={`h-full grid place-content-center text-center`}>
                You encountered an error
                <p
                    className={`mb-4 cursor-pointer`}
                    onClick={() => navigate('/')}
                >
                    Click here to go home
                </p>
                <pre> {JSON.stringify(error)}</pre>
            </div>
        </StaticLayout>
    );
};

export default ErrorPage;
