import React from 'react'
import logo from '../../assets/ReelTalk.png'
import { useAuth } from "../../components/Auth/AuthProvider"
import { Link } from 'react-router-dom'

const Navbar = ({user}) => {

    const { logout } = useAuth();
     const handleLogout = () => {
        logout(); // clears user + localStorage
    };
  return (
     <nav className="nav">
                <div className="nav-inner">

                    <div className="nav-left">
                        <Link to="/">
                            <img src={logo} width={80} alt={logo} title={logo} loading='lazy' />
                        </Link>
                        {user && (
                            <>
                                <Link to="/imdb-top-movies">Dashboard</Link>
                                <Link to="/about">About</Link>
                            </>
                        )}

                    </div>
                    <div className="nav-right">
                        {!user ? (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                       
                        ) : (
                            <>
                                <Link to={`/profile/${user._id}`}> {user.username} Profile</Link>
                                <button onClick={handleLogout}>
                                    Logout
                                </button>
                            </>)}
                    </div>
                </div>
            </nav>
  )
}

export default Navbar