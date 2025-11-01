import Movie from "../config/models/Movie.js";
import WatchedMovie from '../config/models/WatchedMovie.js';



// Controller function to get all movies
export async function getAllMovies(req, res) {
    try {
        const movies = await Movie.find().limit(37);

        if (!movies) return res.status(404).json({ message: "Movies not found" });

        res.status(200).json({movies});
    } catch (error) {
        console.error("Error in getAllMovies controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Controller function to search movies by title
export async function searchMovies(req, res) {
    try {
        const searchTerm = req.query.searchTerm;

        const searchRegex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive        

        const movies = await Movie.find({ title: { $regex: searchRegex } });

        if (!movies) return res.status(404).json({ message: "Movie not found" });

        res.status(200).json({movies});
    } catch (error) {
        console.error("Error in searchMovies controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller function to get movie by id
export async function getMovie(req, res) {
    try {
        const id = req.query.id;
        const genre = req.params.genre;

        // const searchRegex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive        

        const movie = await Movie.findById(id);

        if (!movie) return res.status(404).json({ message: "Movie not found" });

        res.status(200).json({movie});
    } catch (error) {
        console.error("Error in searchMovies controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller function to get 4 top movies
export async function get4Movies(req, res) {
  try {
    // Step 1: Aggregate average ratings from WatchedMovie
    const avgRatings = await WatchedMovie.aggregate([
      {
        $group: {
          _id: "$movieId",
          avgRating: { $avg: "$rating" }
        }
      },
      {
        $sort: { avgRating: -1 } // Sort descending by avg rating
      },
      {
        $limit: 4 // Get top 4 movies
      }
    ]);

    // Step 2: Extract movie IDs
    const movieIds = avgRatings.map(r => r._id);

    // Step 3: Fetch movie details and merge ratings
    const movies = await Movie.find({ _id: { $in: movieIds } }).lean();

    // Step 4: Attach average rating to each movie
    const moviesWithRating = movies.map(movie => {
      const found = avgRatings.find(r => r._id.toString() === movie._id.toString());
      return { ...movie, averageRating: found?.avgRating || 0 };
    });

    // Step 5: Return result
    res.status(200).json({ movies: moviesWithRating });
  } catch (error) {
    console.error("Error in get4Movies controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getTopXMovies(req, res) {
  const limit = parseInt(req.params.limit, 10) || 4;
  const genre = req.query.genre;
  try {
     const pipeline = [
      /**
       * Groups all reviews by their movieId.
       * _id becomes the group key (here, the movieId of the movie).
       * avgRating: calculates the average rating of all reviews in that group using the $avg accumulator.
       * reviewCount: counts how many reviews are in that group using $sum: 1.
       */
      { $group: {
          _id: "$movieId",
          avgRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 }
      }},
      /**
       * Sorts the grouped results by average rating, descending (-1).
       */
      { $sort: { avgRating: -1, reviewCount: -1 }},
      /**
       * Takes only the top limit results after sorting.
       */
      { $limit: limit },
      /**
       * Performs a join between the current pipeline documents and the movies collection.
       * localField: "_id" is the _id we grouped by earlier (the movie’s _id).
       * foreignField: "_id" is the _id field in the movies collection.
       * as: "movie" puts the matched movie(s) in a new array field called "movie".
       */
      { $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "_id",
          as: "movie"
      }},
      /**
       * Converts the movie array (from $lookup) into a single object.
       * If a movie was found, it just unwraps it
       */
      { $unwind: "$movie" },
      /**
       * Merge avgRating & reviewCount into the movie object
       */ 
      {
        $addFields: {
          "movie.avgRating": "$avgRating",
          "movie.reviewCount": "$reviewCount"
        }
      },
      /**
       * Replace the root document with the movie object
       */
      { $replaceRoot: { newRoot: "$movie" } },
      /**
       * Shapes the final output — selects only the fields you want to return.
       * include avgRating/reviewCount
       */
      { $project: {
          avgRating: 1,
          reviewCount: 1,
          title: 1,
          runtime: 1,
          director: 1,
          year: 1,
          genre: 1,
          description: 1,
          poster_url: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1
      }}
    ];

    if (genre) {
      const genreMatchStage = {
        $match: {
          "movie.genre": genre
        }
      };
      // We insert before $replaceRoot to use "movie.genre"
      pipeline.splice(pipeline.findIndex(st => st.$replaceRoot), 0, genreMatchStage);
    }
    const moviesWithAvgRating= await WatchedMovie.aggregate(pipeline).exec();
    res.json({movies:moviesWithAvgRating});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}