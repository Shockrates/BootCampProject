# Backend node.js 

BACKEND for Team A's BootCamp Project for SKG.Education 

## Project Endpoints

## Watched movies Endpoints
1. createWatchedMovie
    Description:
    Creates a new record of a movie that a user has watched.

    Method: POST
    Endpoint: /createWatchedMovie

    ## Required Fields:

    userId – The ID of the user

    movieId – The ID or reference of the movie

    rating – User’s rating for the movie (accepted 1-5)

    review – User’s text review (optional)

    watchedAt – Date the movie was watched (optional; defaults to current date/time, accepted example:"2025-09-10T00:00:00.000Z")

    ## Returns:
    A JSON object containing the saved Watched Movie document from the database. (In case no comment was )

2. getAllMovies
    Description:
    Fetches all watched movies saved in the database, sorted by newest first.
    
    Method: GET
    Endpoint: /getAllMovies

    ## Returns:
    A JSON array containing all watched movie entries in descending order of creation date.