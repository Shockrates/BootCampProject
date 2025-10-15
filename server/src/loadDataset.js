import mongoose from 'mongoose';
import fs from 'fs';
import Movie from './config/models/Movie.js';
import WatchedMovie from './config/models/WatchedMovie.js';
import 'dotenv/config';
import { connectDB } from './config/db.js';
async function seedMovies() {
  try {
    await connectDB();
    // Clear existing movies
    await Movie.deleteMany({});
    console.log('Cleared existing movies');

    const movieDatasetFilePath = '../client/src/data/movies.json';
    ;

    // Check if dataset file exists
    if (!fs.existsSync(movieDatasetFilePath)) {
      console.error('Dataset file not found! Please download movies_dataset.json and place it in the server folder.');
      return;
    }

    console.log('Reading dataset file...');
    const moviesData = JSON.parse(fs.readFileSync(movieDatasetFilePath, 'utf8'));

    // Insert movies
    const insertedMovies = await Movie.insertMany(moviesData, { ordered: false });
    console.log(`Successfully seeded ${insertedMovies.length} movies`);

    console.log('Movies added:');
    insertedMovies.forEach(movie => {
      console.log(`- ${movie.title} (${movie.year})`);
    });
  } catch (error) {
    console.error('Error seeding movies: ', error);
  } finally {
    mongoose.connection.close();
  }
};

async function seedReviews() {
  try {
    await connectDB();
    // Clear existing movies
    await WatchedMovie.deleteMany({});
    console.log('Cleared existing movies');

    const reviewsFilePath = '../client/src/data/watchedMovies.json';
    ;

    // Check if dataset file exists
    if (!fs.existsSync(reviewsFilePath)) {
      console.error('Dataset file not found! Please download movies_dataset.json and place it in the server folder.');
      return;
    }

    console.log('Reading dataset file...');
    const reviewsData = JSON.parse(fs.readFileSync(reviewsFilePath, 'utf8'));

    // Insert movies
    const reviews = await WatchedMovie.insertMany(reviewsData, { ordered: false });
    console.log(`Successfully seeded ${reviews.length} movies`);

    console.log('Movies added:');
    reviews.forEach(review => {
      console.log(`- ${review.userId} (${review.movieId})`);
    });
  } catch (error) {
    console.error('Error seeding movies: ', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
//seedMovies();
seedReviews();