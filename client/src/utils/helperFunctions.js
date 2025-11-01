export const isReviewLiked = (userLikes, reviewId) => {
    if (!Array.isArray(userLikes)) return false;

    const likedReviewIds = new Set(
        userLikes.map(like => like ? String(like.watchedMovieId) : null)
    );

    return likedReviewIds.has(String(reviewId));
}

export function getLikeIdByReviewId(userLikes, reviewId) {
    if (!Array.isArray(userLikes)) return null;

    const match = userLikes.find(
        like => String(like.watchedMovieId) === String(reviewId)
    );

    return match ? match._id : null;
}