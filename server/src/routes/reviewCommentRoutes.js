import express from 'express';
import {createReviewComment,getReviewCommentsByWatchedMovie} from '../controllers/reviewCommentController.js';

const router = express.Router();

router.post("/createReviewComment", createReviewComment);  // create a review comment entry
router.get("/getReviewCommentsByWatchedMovie/:watchedMovieId", getReviewCommentsByWatchedMovie); // get review comments by movieId

export default router; // ES Module export
