import { useAuth } from 'contexts/NewAuthContext';
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { user, isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return children;
    }

    return <Navigate to="/auth/login" />;
};

export default RequireAuth;
