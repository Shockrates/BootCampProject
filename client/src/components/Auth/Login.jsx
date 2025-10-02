import React from 'react'
import { useState } from 'react';
import useAuth from './AuthProvider';
import { useNavigate } from 'react-router-dom';

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

    const {login } = useAuth();
    const navigate = useNavigate();

    

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const email = credentials.email.trim();
        const password = credentials.password;

        if(!email  || !password){
            setError("Please enter a valid email and password");
            return;
        }

        try {
            const user = await loginRequest(email, password);
            if (!user) {
                setError("Invalid email or password");
                return;
            }

            login(user);
            //navigate(from, { replace: true });
        } catch (err) {
                console.error(err);
        setError("Login failed. Try again.");
        }
    }

        
        
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials((prev) => ({...prev,[name]:value}))
    }
    return (
        <div className="">
            <h2>Login</h2>
            <form action=""
                onSubmit={handleLogin}
            >
                <div className="">
                    <label htmlFor="">Email:
                        <input
                            name="email"
                            type='email'
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                <div style={{ marginBottom: 8 }}>
                    <label>
                        Password
                        <input
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default Login