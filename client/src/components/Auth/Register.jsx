import React from 'react'
import { useState } from 'react';
import useAuth from './AuthProvider';
import { Link } from 'react-router-dom';
import { registerRequest } from '../../utils/api'
import Terms from './Terms';
import SelectSubscription from './SelectSubscription';

/**
 * Register component (under construction).
 * - Will manage state for user registration inputs (e.g., email, password, username,age).
 * - Intended to handle creating new users via a registration function.
 * - Will display validation errors and success messages as needed.
 * - Uses a controlled form similar to Login component.
 */
const Register = () => {
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "", confirmPass: "", age: "", acceptTerms: false, subscription: "free" });
    const [error, setError] = useState("");
    const [showTerms, setShowTerms] = useState(false);

    const { login } = useAuth();


    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        const username = credentials.username;
        const email = credentials.email.trim();
        const password = credentials.password;
        const confirmPass = credentials.confirmPass;
        const age = credentials.age;
        const acceptTerms = credentials.acceptTerms;
        const subscription = credentials.subscription;

        if (!username || !email || !password || !confirmPass || !age) {
            setError("Please fill in all fields");
            return;
        }

        if (password !== confirmPass) {
            setError("Passwords do not match");
            return;
        }

        if (!acceptTerms) {
            setError("You must accept the Terms and Conditions to continue");
            return;
        }

        try {
            const user = await registerRequest(username, email, password, confirmPass, age, acceptTerms, subscription);//TODO
            if (!user) {
                setError("An error occured");
                return;
            }
            login(user); // <- This will set User to localhost and cause redirect, 
        } catch (err) {
            console.error(err);
            setError("An error occured during registration. Please try again");
        }
    }


    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
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
                        <label htmlFor="username" className="form-label"> Username </label>
                        <div className="mt-2">
                            <input
                                name="username"
                                type="text"
                                pattern="[a-zA-Z0-9 ]+"
                                maxlength="20"
                                value={credentials.username}
                                onChange={handleChange}
                                required
                                className='form-input'
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="form-label"> Email address </label>
                        <div className="mt-2">
                            <input
                                name="email"
                                type="email"
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
                        <label htmlFor="confirmPass" className="form-label"> Confirm Password </label>
                        <div className="mt-2">
                            <input
                                name="confirmPass"
                                type="password"
                                value={credentials.confirmPass}
                                onChange={handleChange}
                                required
                                className='form-input'
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="age" className="form-label"> Age </label>
                        <div className="mt-2">
                            <input
                                name="age"
                                type="number"
                                min="1"
                                max="122"
                                value={credentials.age}
                                onChange={handleChange}
                                required
                                className='form-input'
                            />
                        </div>
                    </div>

                    <SelectSubscription
                        selected={credentials.subscription}
                        setSelected={(value) =>
                            setCredentials((prev) => ({ ...prev, subscription: value }))
                        }
                    />

                    <div className="flex items-center gap-2 mt-2">
                        <input
                            id="acceptTerms"
                            name="acceptTerms"
                            type="checkbox"
                            checked={credentials.acceptTerms}
                            onChange={handleChange}
                            className="w-4 h-4 text-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="acceptTerms" className="text-sm text-gray-200">
                            I agree to the{" "}
                            <button
                                type="button"
                                onClick={() => setShowTerms(true)}
                                className="text-indigo-400 hover:text-indigo-300 underline"
                            >
                                Terms and Conditions
                            </button>
                        </label>
                    </div>

                    {error && <div className="form-error">{error}</div>}
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

            {showTerms && (
                <Terms
                    title="Terms and Conditions"
                    onClose={() => setShowTerms(false)}
                    onConfirm={() => {
                        setCredentials((prev) => ({ ...prev, acceptTerms: true }));
                        setShowTerms(false);
                    }}
                    confirmText="Accept"
                >
                    <p>
                        Terms you have to accept
                    </p>
                </Terms>
            )}
        </div>
    )
}
export default Register
