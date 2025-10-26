import express from 'express';
import Movie from '../config/models/WatchedMovie.js';
import { createWatchedMovie, watchedByUser, getAllWatchedMovies,getWatchedMovieByItsId ,getWatchedMoviesByMovieId, updateReviewByWatchedMovieId } from '../controllers/watchedMovieController.js';
import {verifyToken} from '../controllers/authMiddleware.js';

const router = express.Router();

router.post("/createWatchedMovie", createWatchedMovie);  // create a watched movie entry
router.get("/watchedByUser/:user", watchedByUser); // get watched movies by user
router.get("/getAllWatchedMovies", getAllWatchedMovies); // get all watched movies
router.get("/getWatchedMovieByitsId/:givenWatchedMovieId", getWatchedMovieByItsId); // get watched movies by user
router.get("/getWatchedMoviesByMovieId/:movieId", getWatchedMoviesByMovieId); // get watched movies by user
router.put("/updateReviewByWatchedMovieId/:watchedMovieId", verifyToken, updateReviewByWatchedMovieId); // edit review by WatchedMovieId

export default router; // ES Module export
