import mongoose from "mongoose";

const reviewLikeSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    watchedMovieId: { type: mongoose.Schema.Types.ObjectId, ref: 'WatchedMovie', required: true },
    likerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    like: { type: Boolean, required: true },
}, { timestamps: true });

const ReviewLike = mongoose.model('ReviewLike', reviewLikeSchema);

export default ReviewLike;