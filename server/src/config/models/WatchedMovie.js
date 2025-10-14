import mongoose from "mongoose";



const watchedMovieSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String, maxLength: 500, required: false },
    watchedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const WatchedMovie = mongoose.model('WatchedMovie', watchedMovieSchema);

export default WatchedMovie;