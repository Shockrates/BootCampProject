import React from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'
import { FaComments } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import RatingIcon from './RatingIcon';
import TimeAgo from '../Helper/TimeAgo';
import LikeReview from '../Helper/LikeReview';

const FeedListItem = ({ review, onOpen, isProfile = false }) => {
  //console.log(review.movieId.genre);


  return (
    <div className="flex flex-col border-b-2  text-slate-50 bg-stone-900 m-4 p-2 " >
      <div className={`review-items flex ${isProfile ? "flex-col" : "flex-col sm:flex-row"}`}>
        <div className="flex flex-col items-end m-2 gap-2">
          {!isProfile && (
            <TimeAgo createdAt={review.createdAt} />
          )}

          <FaRegBookmark />

        </div>
        {!isProfile && (
          <div className={`review-movie inline-block max-w-[250px] border-4 border-transparent hover:border-[#D26D15] transition-all ${isProfile ? "w-full" : "w-full"} `}>
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
        )}


        <div className="flex w-full items-end" >
          <div className={`user-review flex flex-col m-2 w-full shadow-md shadow-black border-1 p-2 items-start justify-between transition-all hover:bg-stone-800 ${isProfile ? "h-full" : "h-1/2 "} `}

          >

            <div className="h-full w-full"
              role="button"
              onClick={() => onOpen(review)}>
              <div className={`flex justify-between ${isProfile ? "flex-col" : "flex-row "}`}>
                <Link to={`/profile/${review.userId._id}`}>
                  {
                    review.userId.username && !isProfile && (
                      <h3>
                        {review.userId.username}, {review.userId.age}
                      </h3>
                    )
                  }

                </Link>
                {isProfile && (
                  <div className={`review-movie inline-block max-w-[250px] transition-all w-full`}>

                    <img src={review.movieId?.poster_url} alt={review.movieId?.title} title={review.movieId?.title} loading='lazy'
                      onError={(e) => {
                        e.currentTarget.src = "/no_postereview.svg";
                        e.currentTarget.alt = "Poster not available";
                      }}
                      className="block w-full h-auto shadow-sm"
                    />
                  </div>
                )}


                <RatingIcon rating={review.rating} />
              </div>


              {/* Watched at: <span className='text-xs'> {new Date(review.watchedAt).toLocaleDateString("el-GR")}</span> */}
              <p className={isProfile ? "truncate-multiline-short" : "truncate-multiline"}>{review.review}</p>
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