import React from 'react'
import { useState } from 'react';

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

    const handleLogin = () => {

    }

    const handleChange = () => {

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