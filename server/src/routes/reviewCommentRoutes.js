import express from 'express';
import {createReviewComment} from '../controllers/reviewCommentController.js';

const router = express.Router();

router.post("/createReviewComment", createReviewComment);  // create a review comment entry


export default router; // ES Module export
