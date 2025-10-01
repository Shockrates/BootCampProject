import React from 'react'
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from "../components/Auth/AuthProvider"

const PrivateRoute = () => {
    const { user } = useAuth();
    const location = useLocation();

    //Change it to false in order to gain acces to the other pages
    if (false) {
        // send to login and keep where they were trying to go
        return <Navigate to="/auth/login" replace state={{ from: location }} />;
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