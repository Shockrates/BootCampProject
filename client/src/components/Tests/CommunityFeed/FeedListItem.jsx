import React from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'
import { FaComments } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import RatingIcon from './RatingIcon';

const FeedListItem = ({review, index}) => {
   //console.log(review.movieId.genre);
   review.movieId?.genre &&  review.movieId?.genre.map((genre) => (
                        console.log(genre)
                    ))
    
  return (
    <div className="flex flex-col border-b-2  text-slate-50 bg-stone-900 m-4 p-2 " key={index}>
          <div className="review-items flex flex-col sm:flex-row">
            <div className="flex flex-col items-end m-2 gap-2">
              <p> {new Date(review.watchedAt).toLocaleDateString()}</p>
              <FaRegBookmark />
              {/* <div className="flex flex-row gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <IoIosStar size={20} key={index} color='#D26D15' />
                ))}

              </div> */}
              <RatingIcon rating={review.rating}/>

            </div>
            <div className="review-movie inline-block max-w-[200px]">

              <img src={review.movieId?.poster_url} alt={review.movieId?.title} title={review.movieId?.title} loading='lazy'
                onError={(e) => {
                  e.currentTarget.src = "/no_postereview.svg";
                  e.currentTarget.alt = "Poster not available";
                }}
                className="block w-full h-auto shadow-sm"
              />
              <div
                className="bg-[#D26D15] text-white text-sm font-medium px-3 py-2 break-words top-0"
              >
                {review.movieId?.title}
             
                {
                //    review.movieId?.genre &&  review.movieId?.genre.map((genre) => (
                //         {genre}
                //     ))
                }
              </div>
            </div>
            <div className="flex w-full items-end">
              <div className="user-review flex flex-col m-2 w-full h-1/2 shadow-md shadow-black border-1 p-2 items-start justify-between">
              <div className="">
                          <Link to="/">
                  <h3>
                    {review.userId.username}, {review.userId.age}
                  </h3>
                </Link>
                
             
                {/* <Link to={`/profile/${review.userId._id}`}><h3>{review.userId.username} </h3> </Link> */}
                <p>{review.review}</p>
              </div>
              
                <div className="flex flex-row w-full justify-between">
                    <span className='flex items-center gap-2'>
                        <FaHeart /> 325 Likes
                    </span>
                    <span className='flex items-center gap-2'>
                        <FaComments /> 35 Comments
                    </span>
                    
                    

                </div>
              </div>
            </div>
          </div>

        </div>
  )
}

export default FeedListItem