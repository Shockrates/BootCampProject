# Backend node.js 

BACKEND for Team A's BootCamp Project for SKG.Education 

## Project Endpoints

## Watched movies Endpoints
1. **createWatchedMovie**
   
    Description:
    Creates a new record of a movie that a user has watched.

    **Method**: POST
    **Endpoint**: /createWatchedMovie

    ### Required Fields:

    **userId** – The ID of the user

    **movieId** – The ID or reference of the movie

    **rating** – User’s rating for the movie (accepted 1-5)

    **review** – User’s text review (optional)

    **watchedAt** – Date the movie was watched (optional; defaults to current date/time, accepted example:"2025-09-10T00:00:00.000Z")

    ### Returns:
    1. On failure (400) or (500):
    json: { message: 'All fields are required' } 

    2. On success(200): 
    A JSON object containing the WatchedMovie i.e.:{ "savedWatchedMovie": {
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
    

3. **getAllMovies**
    Description:
    Fetches all watched movies saved in the database, sorted by newest first.
    
    **Method**: GET
    **Endpoint**: /getAllMovies
    
    ### Requires:    
    A request in the form of: getAllWatchedMovies?skip=0&limit=30, for the first 30 movies. 
    skip: skip the first N entries (default=0)
    limit: give the next N entries (default=20)
    
    ### Returns:
    
    1. On failure (500)
    json: { message: 'Internal server error' } 

    2. On success(200): 
    A JSON object containing the watched movie entries asked (N) in descending order of creation date. i.e.:
   "_id": "68f8c6194afd9f566be87a68",
        "userId": {
            "_id": "68e3f75bb5747e6294a5c49b",
            "username": "Gandalf the Gray",
            "email": "aWizardIsNeverLate@gmail.com"
        },
        "movieId": {
            "_id": "68f135d1a67f173b8e31f080",
            "title": "Saving Private Ryan",
            "poster_url": "https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg"
        },
        "rating": 3,
        "review": "Where's Bryan?",
        "watchedAt": "2020-10-22T11:54:41.000Z",
        "createdAt": "2025-10-22T11:55:05.185Z",
        "updatedAt": "2025-10-22T11:55:05.185Z",
        "__v": 0,
        "CommentCount": 0,
        "id": "68f8c6194afd9f566be87a68"
    

4. **watchedByUser**
   Description:
   Fetches all the Watched Movies from a user.

   **Method**: GET
   **Endpoint**: /watchedByUser?user= { userid }

    ### Required Fields:

    userId – The ID of the user

   ### Returns:
   A JSON array containing all the records from the Watched Movie.

## Review Comment Endpoints

1. **createReviewComment**
    Description:
    Creates a new record of a ReviewComment for a watchedMovie

    **Method**: POST
    **Endpoint**: /createReviewComment

    ### Required Fields:

    **watchedMovieId** – The ID of the watchedMovie

    **commenterId** – The ID of the commenter in the User table

    **comment** – User’s text review 

    ### Returns:
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
