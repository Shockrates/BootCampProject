import React from 'react'
import { useState } from 'react';
import useAuth from './AuthProvider';
import { Link } from 'react-router-dom';
import { loginRequest, getAllUserLikes } from '../../utils/api'



/**
 * Login component (under construction).
 * - Manages state for email and password inputs using useState.
 * - Intended to handle user authentication via handleLogin function.
 * - Displays validation errors if login fails.
 * - Uses a controlled form with onChange handlers for inputs.
 */

const Login = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const email = credentials.email.trim();
        const password = credentials.password;

        if (!email || !password) {
            setError("Please enter a valid email and password");
            return;
        }

        try {
            const user = await loginRequest(email, password);
            if (!user) {
                setError("Invalid email or password");
                return;
            }

            const userLikes = await getAllUserLikes(user._id);
            console.log("Likes:", userLikes);

            login(user, userLikes);
        } catch (err) {
            console.error(err);
            setError("Login failed. Try again.");
        }
    }





    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }))
    }
    return (
        <div className="login-container">
            <div className="login-title">
                <h2>Sign in to your account</h2>
            </div>

            <div className="login-form">
                <form action=""
                    onSubmit={handleLogin}
                    className="space-y-6"
                >
                    <div>
                        <label htmlFor="email" className="form-label">Email address </label>
                        <div className="mt-2">
                            <input
                                name="email"
                                type='email'
                                value={credentials.email}
                                onChange={handleChange}
                                required
                                className='form-input'
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="form-label"> Password </label>
                        <div className="mt-2">
                            <input
                                name="password"
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                className='form-input'
                            />
                        </div>
                    </div>

                    {error && <div className="form-error">{error}</div>}
                    <div className="">
                        <button type="submit" className='login-btn'>Sign in</button>
                    </div>


                </form>

                <p className="register-text">
                    Don’t have an account?{" "}
                    <Link to="/register" className="register-link">
                        Register here
                    </Link>
                </p>

                {/**LOGS A TEST USER FOR TESTING PURPOSE */}
                <form action=""
                    onSubmit={() => {
                        login({
                            username: "Test User",
                            email: "tester@test.com",
                            age: "30"
                        });
                    }}
                    className="space-y-6"
                >
                    <div className="">
                        <button type="submit" className='login-btn'>Sign in a Test User (no need for credentials)</button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default Login