import React from 'react'
import FeedListItem from './FeedListItem'


const FeedList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return <p>No reviews available.</p>


  return (

    <div>{
      /* Reads reviews */
      reviews.map((review, index) => (

        <FeedListItem review={review} index={index}/>

      ))
    }</div>
  )
}

export default FeedList