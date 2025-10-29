import React from 'react'
import { useState, useEffect } from 'react'
import CommentReviewForm from './CommentReviewForm';
import CommentReviewList from './CommentReviewList';
import MoviePageDetails from '../MoviePage/MoviePageDetails';
import { bus } from '../../utils/eventBus'


const ReviewModal = ({ isOpen, onClose, review, user, authUser }) => {

  const [comments, setComments] = useState([])
  const [message, setMessage] = useState('')

  const loadComments = async () => {
    setMessage('Loading...');
    try {
      const res = await fetch(`https://bootcampproject-production.up.railway.app/getReviewCommentsByWatchedMovie/${review._id}`);
      //const res = await fetch(`http://localhost:3000/getReviewCommentsByWatchedMovie/${review._id}`);
      const { message, reviewComments } = await res.json();
      if (res.ok) {
        setComments(reviewComments);
        return
      }
      setMessage(message);
    } catch (error) {
      console.log("Error:", error);
      setComments([]);
      setMessage("Showing Data from static JSON");
    }
  }

  useEffect(() => {
    if (isOpen) {
      loadComments();
    }
  }, [isOpen, review]);

  useEffect(() => {
    const refresh = ({ watchedMovieId }) => {
      if (watchedMovieId === review._id) {
        loadComments()
      }
    }

    bus.on("comment:created", refresh)
    return () => bus.off("comment:created", refresh)
  }, [review._id])

  if (!isOpen) return null;


  return (
    <div className="modal-container fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"

    >
      <div className="modal bg-slate-800 rounded-2xl shadow-lg w-[90%] p-6 text-white relative">
        {/* Header */}
        <div className="modal-header flex justify-between items-center border-b border-slate-700 pb-3">
          <h3 className="text-xl font-bold">{user.username}'s Review</h3>
          <p
            className="close cursor-pointer text-2xl hover:text-indigo-400 transition"
            onClick={
              onClose
            }
          >
            &times;
          </p>
        </div>


        {/*Content*/}
        <div className="modal bg-slate-800 rounded-2xl shadow-lg w-[90%] max-w-xl p-6 text-white relative max-h-[85vh] overflow-y-auto">
          <div className="modal-content mt-4">
            <div className="flex flex-row justify-between">
              <MoviePageDetails movie={review.movieId} user={user} isReview={true} />
              <div className="">{review.review}</div>
            </div>

            <CommentReviewList comments={comments} />
            {authUser && (
              <CommentReviewForm watchedMovieId={review._id} commenterId={authUser._id} />
            )}

          </div>

        </div>
      </div>
    </div>
  )
}

export default ReviewModal