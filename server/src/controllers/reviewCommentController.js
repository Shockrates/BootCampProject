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

// Controller function to get ReviewComments by movieId
export async function getReviewCommentsByWatchedMovie(req, res) {
    try {
        const { watchedMovieId } = req.params;

        if (!watchedMovieId) {
            return res.status(400).json({ message: "WatchedMovie ID is required" });
        }
        // 1 . Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(watchedMovieId)) {
            return res.status(400).json({ message: "Invalid watchedMovieId format" });
        }
            // 2. Check if watchedMovie exists
        const reviewComments = await ReviewComment.find({ watchedMovieId })
            .populate({ path: 'commenterId', select: 'username email' })
            .lean();    
            console.log("Review Comments fetched:", reviewComments);
            //3. If no comments found
        if (!reviewComments || reviewComments.length === 0) {
            return res.status(200).json({ message: "No review comments found for this watched movie", reviewComments: [] });
        }

            //4. Return the review comments
        res.status(200).json(reviewComments);

            //5. Catch block
    } catch (error) {
        console.error("Error in get Review Comments by movie controller", error);
        res.status(500).json({ message: "Internal server error" });
    }   
}


// Controller function to Update ReviewComment by commentId
export async function updateReviewCommentsByCommentId(req, res) {
    try {
        const {comment}= req.body;//the string to be updated
        const {commentId}  = req.params;

        if (!comment ) {
            return res.status(400).json({ message: "Provide a string updated review" });
        }
        if (!commentId) {
            return res.status(400).json({ message: "Comment ID is required" });
        }
        // 1 . Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: "Invalid commentId format" });
        }

        // 2. Find the comment first
        const existingComment = await ReviewComment.findById(commentId);
        if (!existingComment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        // 2 Authorization check
        //find the user that made this comment(using the commentId)

        if (existingComment.commenterId.toString() !== req.userId) {
            return res.status(403).json({ message: "Not allowed to edit this comment." });
        }

// 4. Update the comment
    existingComment.comment = comment;
    await existingComment.save();

    // 5. Optionally populate commenter info
    const populatedComment = await existingComment.populate({
      path: "commenterId",
      select: "username email",
    });

    // 6. Return success
    return res.status(200).json(populatedComment);       //5. Return the review comments

        //6. Catch block
    } catch (error) {
        console.error("Error in get Review Comments by movie controller", error);
        res.status(500).json({ message: "Internal server error" });
    }   
}