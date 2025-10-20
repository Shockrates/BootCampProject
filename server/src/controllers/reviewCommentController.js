import mongoose from 'mongoose';
import ReviewComment from "../config/models/ReviewComment.js"
import WatchedMovie from "../config/models/WatchedMovie.js";
import User from "../config/models/User.js";


// Controller function to create a ReviewComment entry
export async function createReviewComment(req, res) {
    try {
        const {watchedMovieId, commenterId, comment} = req.body;

        if (!watchedMovieId || !commenterId || !comment){
            return res.status(400).json({ message: 'All fields are required' });
        }
         // 1. Validate ObjectIds 
         if (
             !mongoose.Types.ObjectId.isValid(watchedMovieId) ||
             !mongoose.Types.ObjectId.isValid(commenterId)
         ) {
         return res.status(400).json({ message: "Invalid watchedMovieId or commenterId format" });
         }

        // 2. Check if commenter exists
        const currentUserId = await User.findOne({_id:commenterId });
        if (!currentUserId) {
          return res.status(400).json({ message: "This commenter does not exist in the UserDB" });
        }

        // 3. Check if watchedMovie exists
        const currentWatchedMovieId = await WatchedMovie.findOne({ _id:watchedMovieId });
        if (!currentWatchedMovieId) {
          return res.status(400).json({ message: "This watchedMovieId does not exist in the WatchedMovieDB" });
        }

        const reviewComment = new ReviewComment({ watchedMovieId, commenterId, comment });

        const savedReviewComment = await reviewComment.save();
        res.status(200).json({ savedReviewComment });
    } catch (error) {
        console.error("Error in create Review Comment controller", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
