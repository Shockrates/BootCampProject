import mongoose from 'mongoose';
import ReviewLike from "../config/models/ReviewLike.js"
import WatchedMovie from "../config/models/WatchedMovie.js";
import User from "../config/models/User.js";

// Controller function to create a ReviewLike entry
export async function createReviewLike(req, res) {
    try {
        const {watchedMovieId, likerId, like} = req.body;

        if (!watchedMovieId || !likerId || !like){
            return res.status(400).json({ message: 'All fields are required' });
        }
         // 1. Validate ObjectIds 
         if (
             !mongoose.Types.ObjectId.isValid(watchedMovieId) ||
             !mongoose.Types.ObjectId.isValid(likerId)
         ) {
         return res.status(400).json({ message: "Invalid watchedMovieId or likerId format" });
         }

        // 2. Check if liker exists
        const currentUserId = await User.findOne({_id:likerId });
        if (!currentUserId) {
          return res.status(400).json({ message: "This liker does not exist in the UserDB" });
        }

        // 3. Check if watchedMovie exists
        const currentWatchedMovieId = await WatchedMovie.findOne({ _id:watchedMovieId });
        if (!currentWatchedMovieId) {
          return res.status(400).json({ message: "This watchedMovieId does not exist in the WatchedMovieDB" });
        }

        const reviewLike = new ReviewLike({ watchedMovieId, likerId, like });

        const savedReviewLike = await reviewLike.save();
        res.status(200).json({ savedReviewLike });
    } catch (error) {
        console.error("Error in create Review Like controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
