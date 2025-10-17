import mongoose from "mongoose";

const reviewCommentSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    watchedMovieId: { type: mongoose.Schema.Types.ObjectId, ref: 'WatchedMovie', required: true },
    commenterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, maxLength: 500, required: true },
}, { timestamps: true });

const ReviewComment = mongoose.model('ReviewComment', reviewCommentSchema);

export default ReviewComment;