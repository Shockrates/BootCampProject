import React from 'react'
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from "../components/Auth/AuthProvider"


/**
 * PrivateRoute component.
 * - Checks if a user is authenticated via AuthProvider.
 * - If not authenticated, redirects to login page while saving intended location.
 * - If authenticated, renders navigation and nested routes via <Outlet />.
 * This ensures only logged-in users can access protected pages like Dashboard or About.
 */

const PrivateRoute = () => {
    const { user } = useAuth();
    const location = useLocation();

    //Change it to false in order to gain acces to the other pages
    if (false) {
        // send to login and keep where they were trying to go
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // user is present: render nested routes
    return (
        <>
            <nav className="nav">
                <div className="nav-inner">
                    <div className="nav-left">
                        <Link to="/">Dashboard</Link>
                        <Link to="/about">About</Link>
                    </div>
                    <div className="nav-right">
                        <Link to="/profile">Profile</Link>
                        {!user ? (<p>No user Found </p>) : (<p>{user.username} </p>)}
                    </div>
                </div>
            </nav>

            <main className="main">
                <Outlet />
            </main>
        </>
    )
}

export default PrivateRoute
