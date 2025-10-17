import React from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'


const FeedList = ({reviews}) => {
    if (!reviews || reviews.length === 0) return <p>No reviews available.</p>
  return (
  
    <div>{
            /* Reads reviews */
            reviews.map((r) => (
              <div className="flex flex-col border  bg-slate-800 m-4 p-2 rounded-md">
                <Link to="/">
                  <h3>
                    {r.userId.username} 
                  </h3> 
                </Link>
                {/* <Link to={`/profile/${r.userId._id}`}><h3>{r.userId.username} </h3> </Link> */}
                <p> {r.movieId.title}</p>
                <p>{r.review}</p>
              </div>
               
            ))
        }</div>
  )
}

export default FeedList