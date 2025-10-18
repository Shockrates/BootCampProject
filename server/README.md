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
    A JSON object containing the saved Watched Movie document from the database.

2. getAllMovies
    Description:
    Fetches all watched movies saved in the database, sorted by newest first.
    
    Method: GET
    Endpoint: /getAllMovies

    ## Returns:
    A JSON array containing all watched movie entries in descending order of creation date.

3. watchedByUser
   Description:
   Fetches all the Watched Movies from a user.

   Method: GET
   Endpoint: /watchedByUser?user= { userid }

    ## Required Fields:

    userId – The ID of the user

   ## Returns:
   A JSON array containing all the records from the Watched Movie.


4. createReviewComment
    Description:
    Creates a new record of a ReviewComment for a watchedMovie

    Method: POST
    Endpoint: /createReviewComment

    ## Required Fields:

    watchedMovieId – The ID of the watchedMovie

    commenterId – The ID of the commenter in the User table

    comment – User’s text review 

    ## Returns:
    1. On failure (400) when not all fields are given:
    json: { message: 'All fields are required' } 

    2. On failure (400)....:
    json: { message: 'Invalid watchedMovieId or commenterId format' } 

    ... to be written.. 
    On success(200): 
    A JSON object containing the review Comment i.e.:
    "savedReviewComment": {
        "_id": "68f38e2c969aac8ea22baf6c",
        "watchedMovieId": "69011a8d89fba62b2def9804",
        "commenterId": "68e3e2e2a256bdaf47468be0",
        "comment": "I loved it",
        "createdAt": "2025-10-18T12:55:08.413Z",
        "updatedAt": "2025-10-18T12:55:08.413Z",
        "__v": 0
    }