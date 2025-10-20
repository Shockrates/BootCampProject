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
    1. On failure (400) or (500):
    json: { message: 'All fields are required' } 

    2. On success(200): 
    A JSON object containing the WatchedMovie i.e.:
    {
    "savedWatchedMovie": {
        "_id": "68f54bcdd4ccea8199b19962",
        "userId": "68e3e2e2a256bdaf47468be0",
        "movieId": "68f135d1a67f173b8e31f0b8",
        "rating": 3,
        "review": "Stanley Kubrick made an amazing job in this movie",
        "watchedAt": "2025-10-19T20:36:29.902Z",
        "createdAt": "2025-10-19T20:36:29.916Z",
        "updatedAt": "2025-10-19T20:36:29.916Z",
        "__v": 0
    }
}
    

2. getAllMovies
    Description:
    Fetches all watched movies saved in the database, sorted by newest first.
    
    Method: GET
    Endpoint: /getAllMovies
    
    ## Requires:    
    A request in the form of: getAllWatchedMovies?skip=0&limit=30, for the first 30 movies. 
    skip: skip the first N entries
    limit: give the next N entries
    
    ## Returns:
    
    1. On failure (500)
    json: { message: 'Internal server error' } 

    2. On success(200): 

    A JSON object containing the watched movie entries asked (N) in descending order of creation date. i.e.:
    "_id": "68f54bcdd4ccea8199b19962",
        "userId": {
            "_id": "68e3e2e2a256bdaf47468be0",
            "username": "Katerina",
            "email": "katerina@gmail.com"
        },
        "movieId": {
            "_id": "68f135d1a67f173b8e31f0b8",
            "title": "Paths of Glory",
            "poster_url": "https://m.media-amazon.com/images/M/MV5BNjViMmRkOTEtM2ViOS00ODg0LWJhYWEtNTBlOGQxNDczOGY3XkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_.jpg"
        },
        "rating": 3,
        "review": "Stanley Kubrick made an amazing job in this movie",
        "watchedAt": "2025-10-19T20:36:29.902Z",
        "createdAt": "2025-10-19T20:36:29.916Z",
        "updatedAt": "2025-10-19T20:36:29.916Z",
        "__v": 0    

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
    1. On failure (400) or (500)
    It returns a JSON with a message e.g: { message: 'Internal server error' } 

    2. On success(200): 
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