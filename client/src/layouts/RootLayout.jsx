import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <>
            {/* <nav className="nav">
                <div className="nav-inner">
                    <div className="nav-left">
                        <Link to="/">Dashboard</Link>
                        <Link to="/about">About</Link>
                    </div>
                    <div className="nav-right">
                        <Link to="/profile">Profile</Link>
                    </div>
                </div>
            </nav> */}


            <Outlet />

        </>
    )
}

export default RootLayout