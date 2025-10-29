import React from 'react'
import { FaHeart } from "react-icons/fa";

const LikeReview = ({ review }) => {
    return (
        <>
            <FaHeart className='hover:scale-125 transition-all' /> {review.LikeCount} Likes
        </>
    )
}

export default LikeReview