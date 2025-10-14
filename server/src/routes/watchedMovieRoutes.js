import express from 'express';
import { createWatchedMovie, getAllWatchedMovies } from '../controllers/watchedMovieController.js';

const router = express.Router();

router.post("/createWatchedMovie", createWatchedMovie); 

router.get("/test", getAllWatchedMovies); 

export default router; // ES Module export
