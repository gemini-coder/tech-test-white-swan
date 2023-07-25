import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import {
    createBrowserRouter,
    RouterProvider,
    useRouteError,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AuthGuard from './context/AuthGuard';
import FixturesPage from './pages/FixturesPage';
import ViewFixturePage from './pages/ViewFixturePage';
import fixturesData from './data/fixtures.json';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
    {
        path: 'login',
        element: <LoginPage />,
    },
    {
        path: '',
        loader: async () => {
            return fixturesData;
        },
        errorElement: <ErrorBoundary />,
        element: (
            <AuthGuard>
                <FixturesPage />
            </AuthGuard>
        ),
    },
    {
        path: '/viewFixture/:id',
        loader: async ({ params }) => {
            const fixture = fixturesData.find((f) => f.fixture_id == params.id);
            if (fixture) {
                return fixture;
            } else {
                throw new Response('Not Found', { status: 404 });
            }
        },
        errorElement: <ErrorBoundary />,
        element: (
            <AuthGuard>
                <ViewFixturePage />
            </AuthGuard>
        ),
    },
]);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

function ErrorBoundary() {
    const error = useRouteError();
    return <ErrorPage error={error} />;
}

export default App;
