import { createContext, useContext, useState, useEffect } from "react";

/**
 * AuthProvider component and hook.
 * - Creates a React Context to store authentication state (user info).
 * - Persists user data in localStorage and restores it on page reload.
 * - Provides login and logout functions to update user state globally.
 * - Exposes useAuth hook for consuming auth state in any component.
 * - Wraps children components to give them access to authentication context.
 */


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem("user");
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    })

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}

export { useAuth as default };