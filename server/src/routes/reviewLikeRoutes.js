import express from 'express';
import {createReviewLike,deleteLike,getAllLikesByUserId} from '../controllers/reviewLikeController.js';

const router = express.Router();

router.post("/createReviewLike", createReviewLike);  // create a review comment entry
router.delete("/deleteLike/:likeId", deleteLike);  // delete a review comment entry
router.get("/getAllLikesByUserId/:userId", getAllLikesByUserId);  // get a json of like_id and WatchedMovie 



export default router; // ES Module export
