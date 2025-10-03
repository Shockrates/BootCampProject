// /**
//  * api.js – API helper functions.
//  * - Defines the base URI for the backend (currently local JSON server).
//  * - Provides a login function that queries the /users endpoint with username and password.
//  * - Returns the first matching user if credentials are correct, or null if no match is found.
//  * - Logs errors to the console if the fetch request fails.
//  */

const URI = "http://localhost:3000";

/**
 * Attempts to log in a user by checking email and password against the JSON server.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object|null>} A promise that resolves to the user object if found,
 *                                or `null` if no matching user exists. 
 *                                Returns `undefined` only if an error occurs.
 */
export const loginRequest = async (email, password) => {
    try {
        // json-server supports filtering via query params:
        const res = await fetch(`${URI}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        const users = await res.json();
        // if a match exists, return the first match
        return users.length ? users[0] : null;
    } catch (error) {
        console.log("Error:", error);
    }

}

/**
 * Fetch the top N movies from the JSON server.
 * Only supports pagination via `start` and `limit`.
 *
 * @param {number} limit  Number of items to fetch (default 36)
 * @param {number} start  Offset to start from (default 0)
 * @returns {Promise<Array>}  Array of movie objects
 */
export async function fetchTopMovies(limit = 36, start = 0) {
  const params = new URLSearchParams();
  params.set('_start', String(start));
  params.set('_limit', String(limit));
  const url = `${URI}/movies?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    // Throw so the caller knows this was a failure (not just an empty list)
    throw new Error(`Failed to fetch top movies (${res.status})`);
  }
  const movies = await res.json();
  return movies; 
}