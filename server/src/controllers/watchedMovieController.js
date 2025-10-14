import WatchedMovie from "../config/models/WatchedMovie.js"

export async function createWatchedMovie (req,res) {
    try {
        const { userId,movieId,rating,review,watchedAt} = req.body;
        const watchedMovie = new WatchedMovie({userId,movieId,rating,review,watchedAt});
        
        const savedWatchedMovie = await watchedMovie.save();
        res.status(200).json({savedWatchedMovie});

    } catch (error) {
        console.error("Error in create Watched Movie controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

