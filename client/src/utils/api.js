// /**
//  * api.js – API helper functions.
//  * - Defines the base URI for the backend (currently local JSON server).
//  * - Provides a login function that queries the /users endpoint with username and password.
//  * - Returns the first matching user if credentials are correct, or null if no match is found.
//  * - Logs errors to the console if the fetch request fails.
//  */

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