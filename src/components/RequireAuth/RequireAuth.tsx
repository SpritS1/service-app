import React from 'react';
import useAuth from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { user, isUserStatusChecked } = useAuth();

    if (isUserStatusChecked) {
        if (user) return children;
        return <Navigate to="/auth/login" />;
    }
    return null;
};

export default RequireAuth;
