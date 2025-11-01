// /**
//  * api.js – API helper functions.
//  * - Defines the base URI for the backend (currently local JSON server).
//  * - Provides a login function that queries the /users endpoint with username and password.
//  * - Provides a register function that queries the /users endpoint with relevant credentials.
//  * - Returns the first matching user if credentials are correct, or null if no match is found.
//  * - Logs errors to the console if the fetch request fails.
//  */

const URI = "https://bootcampproject-production.up.railway.app";
//const URI = "http://localhost:3000";

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
    //const res = await fetch(`${URI}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);


    const res = await fetch(`${URI}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

    const { message, user, error } = await res.json();
    // if a match exists, return the first match
    console.log(message, ": ", error);
    return user ? user : null;
  } catch (error) {
    console.log("Error:", error);
  }
}

export const registerRequest = async (username, email, password, confirmPass, age) => {
  try {
    const res = await fetch(`${URI}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, confirmPass, age })
      })

    const { message, user, error } = await res.json();
    console.log(message, ": ", error);
    return user ? user : null;
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

  //Code for testing in json server
  //const url = `${URI}/movies?${params.toString()}`;
  //const res = await fetch(url);

  const res = await fetch(`${URI}/getAllMovies`);

  if (!res.ok) {
    // Throw so the caller knows this was a failure (not just an empty list)
    throw new Error(`Failed to fetch top movies (${res.status})`);
  }
  const { movies } = await res.json();

  return movies;
}

/**
 * Fetch the top N movies from the JSON server.
 * Only supports pagination via `start` and `limit`.
 *
 * @param {string} id  the id of the movie
 * @returns {Promise<movie>}  A Movie object
 */
export async function fetchMovie(id) {
  const params = new URLSearchParams();
  params.set('id', String(id));

  //Code for testing in json server
  //const url = `${URI}/movies?${params.toString()}`;
  //const res = await fetch(url);

  const res = await fetch(`${URI}/movie?${params.toString()}`);

  if (!res.ok) {
    // Throw so the caller knows this was a failure (not just an empty list)
    throw new Error(`Failed to fetch movie (${res.status})`);
  }
  const { movie } = await res.json();

  return movie;
}

export async function searchMovies(query) {
  const res = await fetch(
    `${URI}/searchMovies?searchTerm=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Server error");

  const { movies } = await res.json();

  return movies;
}


export async function fetchReviews(limit) {
  const params = new URLSearchParams();
  if (limit) params.set('limit', limit);
  const res = await fetch(`${URI}/getAllWatchedMovies/?${params.toString()}`);
  console.log(params.toString());
  if (!res.ok) {
    // Throw so the caller knows this was a failure (not just an empty list)
    throw new Error(`Failed to fetch reviews (${res.status})`);


  }
  const { watchedMovies } = await res.json();

  return watchedMovies;
}

export async function createReview(userId, movieId, rating, review, watchedAt) {
  try {

    const res = await fetch(`${URI}/createWatchedMovie`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, movieId, rating, review, watchedAt })
      })

    const { message, savedWatchedMovie } = await res.json();
    // if a match exists, return the first match
    console.log(message);
    return savedWatchedMovie ? savedWatchedMovie : null;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function createComment(watchedMovieId, commenterId, comment) {
  try {
    const res = await fetch(`${URI}/createReviewComment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ watchedMovieId, commenterId, comment })
      })

    const { message, savedReviewComment } = await res.json();
    if (message) {
      console.log(message);
    }
    console.log(savedReviewComment);
    return savedReviewComment ? savedReviewComment : null;
  } catch (error) {
    console.log("Error:", error.message);
  }
}

export async function createLike(watchedMovieId, likerId, like) {
  try {
    const res = await fetch(`${URI}/createReviewLike`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ watchedMovieId, likerId, like })
      })

    const { message, savedReviewLike } = await res.json();
    if (!res.ok) {
      console.log(message);
    }
    console.log(savedReviewLike);
    return savedReviewLike ? savedReviewLike : null;
  } catch (error) {
    console.log("Error:", error.message);
  }
}

export async function deleteLike(likeId) {
  try {

    const res = await fetch(`${URI}/deleteLike/${likeId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })

    const { likeToDelete, message } = await res.json();
    if (!res.ok) {
      console.log(message);
    }
    return likeToDelete;
  } catch (error) {
    console.log("Error:", error.message);
  }
}

export const getAllUserLikes = async (userId) => {

  try {
    const res = await fetch(`${URI}/getAllLikesByUserId/${userId}`);
    if (!res.ok) {
      // Throw so the caller knows this was a failure (not just an empty list)
      throw new Error(`Failed to fetch user likes, (${res.status})`);
    }
    const { message, likes } = await res.json();
    console.log(message);

    return likes;
  } catch (error) {
    console.log("Error:", error.message);
  }
}


export async function fetchTopMoviesKaterina() {
  const res = await fetch(`${URI}/get4Movies`);

  if (!res.ok) {
    // Throw so the caller knows this was a failure (not just an empty list)
    throw new Error(`Failed to fetch top movies (${res.status})`);
  }
  const { movies } = await res.json();

  return movies;
}
export async function fetchTopXMovies(limit = 36, genre) {
  const params = new URLSearchParams();
  if (genre) params.set('genre', genre);

  const res = await fetch(`${URI}/getTopMovies/${limit}?${params.toString()}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch top movies (${res.status})`);
  }

  const { movies } = await res.json();
  return movies;
}
