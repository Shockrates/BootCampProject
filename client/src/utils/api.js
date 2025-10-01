const URI = "http://localhost:3000";


export const login = async (username, password) => {
    try {
        // json-server supports filtering via query params:
        const res = await fetch(`${URI}/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
        const users = await res.json();
        // if a match exists, return the first match
        return users.length ? users[0] : null;
    } catch (error) {
        console.log("Error:", error);
    }

}