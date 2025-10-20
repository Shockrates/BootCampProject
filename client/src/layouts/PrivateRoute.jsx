import React from 'react'
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from "../components/Auth/AuthProvider"
import logo from '../assets/ReelTalk.png'


/**
 * PrivateRoute component.
 * - Checks if a user is authenticated via AuthProvider.
 * - If not authenticated, redirects to login page while saving intended location.
 * - If authenticated, renders navigation and nested routes via <Outlet />.
 * This ensures only logged-in users can access protected pages like Dashboard or About.
 */

const PrivateRoute = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    //Change it to false in order to gain acces to the other pages
    if (!user) {
        // send to login and keep where they were trying to go
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    const handleLogout = () => {
        logout(); // clears user + localStorage
    };

    // user is present: render nested routes
    return (
        <>
            <nav className="nav">
                <div className="nav-inner">

                    <div className="nav-left">
                        <Link to="/">
                            <img src={logo} width={80} alt={logo} title={logo} loading='lazy' />
                        </Link>

                        <Link to="/imdb-top-movies">Dashboard</Link>

                        <Link to="/about">About</Link>
                    </div>
                    <div className="nav-right">
                        {!user ? (
                            <p>No user Found </p>
                        ) : (
                            <>
                                <Link to="/profile"> {user.username} Profile</Link>
                                <button onClick={handleLogout}>
                                    Logout
                                </button>
                            </>)}
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
