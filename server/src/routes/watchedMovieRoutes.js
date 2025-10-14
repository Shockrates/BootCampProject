import express from 'express';
import Movie from '../config/models/WatchedMovie.js';
import { createWatchedMovie, watchedByUser } from '../controllers/watchedMovieController.js';

const router = express.Router();

router.post("/createWatchedMovie", createWatchedMovie); // create a watched movie entry
router.get("/watchedByUser", watchedByUser); // get watched movies by user

export default router; // ES Module export
