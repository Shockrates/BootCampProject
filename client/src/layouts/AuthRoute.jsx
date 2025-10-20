import React from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../components/Auth/AuthProvider'

const AuthRoute = () => {
    const { user } = useAuth();
    const location = useLocation();

    // Get the original intended route from state, fallback to dashboard
    const from = location.state?.from?.pathname || "/";
    if (user) {
        // if already logged in, send to dashboard
        return <Navigate to={from} replace />;
    }
    return (
        <Outlet />
    )
}

export default AuthRoute