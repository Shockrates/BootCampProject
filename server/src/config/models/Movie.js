import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true, unique: true },
    runtime: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: String, required: true },
    genre: [{ type: String, required: true }],
    description: { type: String, required: true },
    poster_url: { type: String, required: true },
}, { timestamps: true });

// Virtual to associate WatchedMovies with Movie
movieSchema.virtual('WatchedMovie', {
    ref: 'WatchedMovie',
    localField: '_id',
    foreignField: 'movieId',
});

// Virtual to calculate Average Rating from associated WatchedMovies
movieSchema.virtual('AverageRating').get( function() {
    if(!this.WatchedMovie || this.WatchedMovie.length === 0) return 0;
    const sum = this.WatchedMovie.reduce((acc, WatchedMovie) => acc + (WatchedMovie.rating || 0), 0);
    const avg = sum / this.WatchedMovie.length;
    return Math.round(avg * 10) / 10; // Round to one decimal place
});

movieSchema.set('toJSON', { virtuals: true });
movieSchema.set('toObject', { virtuals: true });


const Movie = mongoose.model('Movie', movieSchema);

export default Movie ;
