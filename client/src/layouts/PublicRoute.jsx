import React from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'
import { useAuth } from "../components/Auth/AuthProvider"

const PublicRoute = () => {
    const { user } = useAuth();
    if (user) {
        // if already logged in, send to dashboard
        return <Navigate to="/" replace />;
    }
    return (
        <div>
            <nav className="nav">
                <div className="nav-inner">
                    <div className="nav-right">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </div>
            </nav>

            <main className="main">
                <Outlet />
            </main>
        </div>

    )
}

export default PublicRoute