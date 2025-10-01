import React from 'react'
import { useState } from 'react';

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