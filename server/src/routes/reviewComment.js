import express from 'express';
import {ReviewComment} from '../controllers/reviewCommentController.js';

const router = express.Router();

router.post("/createWatchedMovie", createWatchedMovie);  // create a watched movie entry


export default router; // ES Module export
