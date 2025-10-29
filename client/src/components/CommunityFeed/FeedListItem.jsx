import React from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'
import { FaComments } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import RatingIcon from './RatingIcon';
import TimeAgo from '../Helper/TimeAgo';
import LikeReview from '../Helper/LikeReview';

const FeedListItem = ({ review, onOpen }) => {
  //console.log(review.movieId.genre);


  return (
    <div className="flex flex-col border-b-2  text-slate-50 bg-stone-900 m-4 p-2 " >
      <div className="review-items flex flex-col sm:flex-row">
        <div className="flex flex-col items-end m-2 gap-2">
          <TimeAgo createdAt={review.createdAt} />
          <FaRegBookmark />
          <RatingIcon rating={review.rating} />
        </div>

        <div className="review-movie inline-block max-w-[250px] border-4 border-transparent hover:border-[#D26D15] transition-all">
          <Link to={`/movie/${review.movieId?._id}`}>
            <img src={review.movieId?.poster_url} alt={review.movieId?.title} title={review.movieId?.title} loading='lazy'
              onError={(e) => {
                e.currentTarget.src = "/no_postereview.svg";
                e.currentTarget.alt = "Poster not available";
              }}
              className="block w-full h-auto shadow-sm"
            />
          </Link>
          <div
            className="bg-[#D26D15] text-white text-sm font-medium px-3 py-2 break-words top-0"
          >
            <h3>{review.movieId?.title}</h3>
            <div className="">
              {
                review.movieId?.genre && review.movieId?.genre.map((g, i) => (
                  <span className="" key={i}>{g} </span>
                ))
              }

            </div>

          </div>
        </div>

        <div className="flex w-full items-end" >
          <div className="user-review flex flex-col m-2 w-full h-1/2 shadow-md shadow-black border-1 p-2 items-start justify-between transition-all hover:bg-stone-800"
            role="button"
            onClick={() => onOpen(review)}
          >
            <div className="">
              <Link to={`/profile/${review.userId._id}`}>
                <h3>
                  {review.userId.username}, {review.userId.age}
                </h3>
              </Link>

              {/* Watched at: <span className='text-xs'> {new Date(review.watchedAt).toLocaleDateString("el-GR")}</span> */}
              <p>{review.review}</p>
            </div>

            <div className="flex flex-row w-full justify-between">
              <span className='flex items-center gap-2'>
                {/* <FaHeart /> {review.LikeCount} Likes */}
                <LikeReview review={review} />
              </span>
              <span className='flex items-center gap-2'>
                <FaComments /> {review.CommentCount} Comments
              </span>



            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default FeedListItem