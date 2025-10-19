import React from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";

const FeedList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return <p>No reviews available.</p>
  return (

    <div>{
      /* Reads reviews */
      reviews.map((r) => (
        <div className="flex flex-col border  bg-slate-800 m-4 p-2 rounded-md">
          <div className="review-items flex flex-row">
            <div className="flex flex-col items-end m-2">
              <p> {r.watchedAt}</p>
              <CiBookmark />
              <div className="flex flex-row">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>

            </div>
            <div className="review-movie flex flex-col">
              <img src={r.movieId?.poster_url} alt={r.movieId?.title} title={r.movieId?.title} loading='lazy'
                onError={(e) => {
                  e.currentTarget.src = "/no_poster.svg";
                  e.currentTarget.alt = "Poster not available";
                }}
                width={200}
              />
            </div>
            <div className="user-review">
              <Link to="/">
                <h3>
                  {r.userId.username}
                </h3>
              </Link>
              {/* <Link to={`/profile/${r.userId._id}`}><h3>{r.userId.username} </h3> </Link> */}
              <p> {r.movieId?.title}</p>
              <p>{r.review}</p>
            </div>
          </div>

        </div>

      ))
    }</div>
  )
}

export default FeedList