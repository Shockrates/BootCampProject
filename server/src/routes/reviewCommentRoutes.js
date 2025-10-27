import express from 'express';
import {createReviewComment,getReviewCommentsByWatchedMovie,updateReviewCommentsByCommentId} from '../controllers/reviewCommentController.js';
import {verifyToken} from '../controllers/authMiddleware.js';

const router = express.Router();


router.post("/createReviewComment", createReviewComment);  // create a review comment entry
router.get("/getReviewCommentsByWatchedMovie/:watchedMovieId", getReviewCommentsByWatchedMovie); // get review comments by movieId
router.put("/UpdateReviewCommentsByCommentId/:commentId", verifyToken, updateReviewCommentsByCommentId); // edit review comment by commentId

export default router; // ES Module export