import React from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'
import { IoIosStar } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";

const FeedList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return <p>No reviews available.</p>


  return (

    <div>{
      /* Reads reviews */
      reviews.map((r, index) => (

        <div className="flex flex-col border-b-2  text-slate-50 bg-stone-900 m-4 p-2 " key={index}>
          <div className="review-items flex flex-col sm:flex-row">
            <div className="flex flex-col items-end m-2 gap-2">
              <p> {new Date(r.watchedAt).toLocaleDateString()}</p>
              <FaRegBookmark />
              <div className="flex flex-row gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <IoIosStar size={20} key={index} color='#D26D15' />
                ))}

              </div>

            </div>
            <div className="review-movie inline-block max-w-[200px]">

              <img src={r.movieId?.poster_url} alt={r.movieId?.title} title={r.movieId?.title} loading='lazy'
                onError={(e) => {
                  e.currentTarget.src = "/no_poster.svg";
                  e.currentTarget.alt = "Poster not available";
                }}
                className="block w-full h-auto shadow-sm"
              />
              <div
                className="bg-[#D26D15] text-white text-sm font-medium px-3 py-2 break-words top-0"
              >
                {r.movieId?.title}
              </div>
            </div>
            <div className="flex w-full items-end">
              <div className="user-review flex flex-col m-2 w-full h-1/2 shadow-sm border-2 p-2 items-start">
                <Link to="/">
                  <h3>
                    {r.userId.username},{r.userId.age}
                  </h3>
                </Link>
                {/* <Link to={`/profile/${r.userId._id}`}><h3>{r.userId.username} </h3> </Link> */}
                <p>{r.review}</p>
              </div>
            </div>
          </div>

        </div>

      ))
    }</div>
  )
}

export default FeedList