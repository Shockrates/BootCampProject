import express from 'express';
import Movie from '../config/models/Movie.js';
import { getAllMovies, getMovie, searchMovies } from '../controllers/movieController.js';

const router = express.Router();

router.get("/getAllMovies", getAllMovies); // returns an array of 36 movies ( for community feed display )
router.get("/searchMovies", searchMovies); // req a "searchTerm" STRING || returns movies that match the search term in their title
router.get("/movie", getMovie);


export default router; // ES Module export
