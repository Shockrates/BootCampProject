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