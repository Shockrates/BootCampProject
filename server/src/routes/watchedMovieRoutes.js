import express from 'express';
import Movie from '../config/models/WatchedMovie.js';
import { createWatchedMovie } from '../controllers/watchedMovieController.js';

const router = express.Router();

router.post("/createWatchedMovie", createWatchedMovie); 

export default router; // ES Module export
