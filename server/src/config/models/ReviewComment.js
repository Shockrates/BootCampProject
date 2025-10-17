import mongoose from "mongoose";

const reviewCommentSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    watched_movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'WatchedMovie', required: true },
    commenter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, maxLength: 500, required: true },
}, { timestamps: true });

const ReviewComment = mongoose.model('ReviewComment', reviewCommentSchema);

export default ReviewComment;