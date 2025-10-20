import React from 'react'
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from "../components/Auth/AuthProvider"
import logo from '../assets/ReelTalk.png'
/**
 * PublicRoute component.
 * - Checks if a user is already authenticated via AuthProvider.
 * - If authenticated, redirects to the dashboard to prevent access to login/register pages.
 * - If not authenticated, renders navigation and nested public routes via <Outlet />.
 * Ensures only unauthenticated users can access login or registration pages.
 */


const PublicRoute = () => {
    const { user } = useAuth();
    const location = useLocation();

    // Get the original intended route from state, fallback to dashboard
    const from = location.state?.from?.pathname || "/";
    if (user) {
        // if already logged in, send to dashboard
        return <Navigate to={from} replace />;
    }
    return (
        <div>
            <nav className="nav">
                <div className="nav-inner">
                    <div className="nav-left">
                        <Link to="/">
                            <img src={logo} width={80} alt={logo} title={logo} loading='lazy' />
                        </Link>

                    </div>
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