import express from 'express';
import {createReviewLike} from '../controllers/reviewLikeController.js';

const router = express.Router();

router.post("/createReviewLike", createReviewLike);  // create a review comment entry

export default router; // ES Module export
