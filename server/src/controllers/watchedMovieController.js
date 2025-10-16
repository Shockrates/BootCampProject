import Movie from "../config/models/Movie.js";
import WatchedMovie from "../config/models/WatchedMovie.js"


// Controller function to create a watched movie entry
export async function createWatchedMovie(req, res) {
    try {
        const { userId, movieId, rating, review, watchedAt } = req.body;
        const watchedMovie = new WatchedMovie({ userId, movieId, rating, review, watchedAt });

        const savedWatchedMovie = await watchedMovie.save();
        res.status(200).json({ savedWatchedMovie });
    } catch (error) {
        console.error("Error in create Watched Movie controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getAllWatchedMovies(req, res) {
    try {
        const watchedMovies = (await WatchedMovie.find().sort({ createdAt: -1 })); //-1 will sort in desc. order (newest first)
        res.status(200).json(watchedMovies);
    }
    catch (error) {
        console.error("Error in getAllWatchedMovies controller", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

// Controller function to get watched movies by user  
export async function watchedByUser(req, res) {
    try {
        const { user } = req.query;
        if (!user) {
            return res.status(400).json({ message: "User ID is required" });        // αν δεν υπαρχει καθολου user id, μονο τοτε λεει οτι ειναι απαραιτητο. 
        }                                                                       //to do : validate user by checking if it exists in User collection ( Matthew )

        const watchedMovies = await WatchedMovie.find({ userId: user }).lean();
        if (!watchedMovies || watchedMovies.length === 0) {
            return res.status(404).json({ message: "No watched movies found for this user" });
        }


        res.status(200).json(watchedMovies);
    } catch (error) {
        console.error("Error in getWatchedMoviesByUser controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}