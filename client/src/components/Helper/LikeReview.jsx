import { useState, useEffect } from 'react'
import { FaHeart } from "react-icons/fa";
import { useAuth } from '../Auth/AuthProvider'
import { createLike, deleteLike } from '../../utils/api';
import { isReviewLiked, getLikeIdByReviewId } from '../../utils/helperFunctions';
import { bus } from "../../utils/eventBus";

const LikeReview = ({ review }) => {

    const { user } = useAuth();
    const [isLiked, setIsLiked] = useState(false);


    useEffect(() => {
        if (user && Array.isArray(user.likes)) {
            const liked = isReviewLiked(user.likes, review._id);
            setIsLiked(liked);
        } else {
            setIsLiked(false);
        }
    }, [user, review._id])

    const handleLike = async () => {

        if (!isLiked) {
            const like = await createLike(review._id, user._id, true);
            console.log(like);

            user.likes.push({ _id: like._id, watchedMovieId: like.watchedMovieId._id });
            localStorage.setItem('user', JSON.stringify(user))
            setIsLiked(prev => !prev);
            bus.emit("like:changed", {
                watchedMovieId: review._id,
                delta: 1,
                serverCount: like.LikeCount ?? null,
            });
        } else if (isLiked) {
            try {
                const likeId = getLikeIdByReviewId(user.likes, review._id);
                const like = await deleteLike(likeId)
                user.likes = user.likes.filter(
                    like => String(like._id) !== String(likeId)
                );
                localStorage.setItem("user", JSON.stringify(user));
                setIsLiked(prev => !prev);
                bus.emit("like:changed", {
                    watchedMovieId: review._id,
                    delta: -1,
                    serverCount: like.LikeCount ?? null,
                });

            } catch (error) {
                console.log(error.message);

            }

        }


    }

    return (
        <>
            <FaHeart className='hover:scale-125 transition-all'
                role="button"
                onClick={handleLike}
                fill={isLiked ? "gold" : "#AAB7B8"}
            //fill="gold"
            />
            {review.LikeCount} Likes
        </>
    )
}

export default LikeReview