import React from 'react'

const FeedList = ({reviews}) => {
    if (!reviews || reviews.length === 0) return <p>No reviews available.</p>
  return (
  
    <div>{
            /* Reads reviews */
            reviews.map((r) => (
                <p>{r.userId}  {r.movieId}</p>
            ))
        }</div>
  )
}

export default FeedList