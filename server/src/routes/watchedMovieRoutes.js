import express from 'express';
import Movie from '../config/models/WatchedMovie.js';
import { createWatchedMovie, watchedByUser, getAllWatchedMovies,getWatchedMovieByItsId } from '../controllers/watchedMovieController.js';

const router = express.Router();

router.post("/createWatchedMovie", createWatchedMovie);  // create a watched movie entry
router.get("/watchedByUser/:user", watchedByUser); // get watched movies by user
router.get("/getAllWatchedMovies", getAllWatchedMovies); // get all watched movies
router.get("/getWatchedMovieByitsId/:givenWatchedMovieId", getWatchedMovieByItsId); // get watched movies by user


export default router; // ES Module export
