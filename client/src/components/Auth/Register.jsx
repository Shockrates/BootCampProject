import React from 'react'
import { useState } from 'react';
import useAuth from './AuthProvider';
import { Link } from 'react-router-dom';
//TODO: registerRequest

/**
 * Register component (under construction).
 * - Will manage state for user registration inputs (e.g., email, password, username).
 * - Intended to handle creating new users via a registration function.
 * - Will display validation errors and success messages as needed.
 * - Uses a controlled form similar to Login component.
 */
const Register = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "", confirmPassword: "" }); //<- Age field also is needed
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { login } = useAuth();


    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const email = credentials.email.trim();
        const password = credentials.password;
        const confirmPassword = credentials.confirmPassword;

        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const user = await registerRequest(email, password, confirmPassword);//TODO
            if (!user) {
                setError("Registration failed. Please try again");
                return;
            }
            login(user); // <- This will set User to localhost and cause redirect, 
            setSuccess("Account created successfully!");
        } catch (err) {
            console.error(err);
            setError("An error occured during registration. Please try again")
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }))
    }
    return (
        <div className="register-container">
            <div className="register-title">
                <h2>Create a new account</h2>
            </div>

            <div className="register-form">
                <form action=""
                    onSubmit={handleRegister}
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

                    <div>
                        <label htmlFor="confirmPassword" className="form-label"> Confirm Password </label>
                        <div className="mt-2">
                            <input
                                name="confirmPassword"
                                type="password"
                                value={credentials.confirmPassword}
                                onChange={handleChange}
                                required
                                className='form-input'
                            />
                        </div>
                    </div>

                    {error && <div className="form-error">{error}</div>}
                    {success && <div className="form-success">{success}</div>}
                    <div className="">
                        <button type="submit" className='register-btn'>Register</button>
                    </div>


                </form>

                <p className="login-text">
                    Already have an account?{" "}
                    <Link to="/login" className="login-link">
                        Login here
                    </Link>
                </p>
            </div>

        </div>
    )
}
export default Register