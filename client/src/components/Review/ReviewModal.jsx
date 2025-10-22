import React from 'react'
import { useState, useEffect } from 'react'
import CommentReviewForm from './CommentReviewForm';
import CommentReviewList from './CommentReviewList';

const ReviewModal = ({ isOpen, onClose, review, user }) => {

  const [comments, setComments] = useState([])
  const [message, setMessage] = useState('')

  // useEffect(() => {
  //   let mounted = true;
  //   // console.log(review._id);

  //   const loadComments = async () => {
  //     setMessage('Loading...');
  //     try {
  //       const res = await fetch(`https://bootcampproject-production.up.railway.app/getReviewCommentsByWatchedMovie/${review._id}`);
  //       const comments = await res.json();

  //       //if (!mounted) return;
  //       setComments(comments);
  //       setMessage(comments);
  //     } catch (error) {
  //       console.log("Error:", error);
  //       //if (!mounted) return;
  //       setMessage("Showing Data from static JSON");
  //     }
  //   }
  //   loadComments();
  //   console.log(message);

  // }, []);


  if (!isOpen) return null;


  return (
    <div className="modal-container fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"

    >
      <div className="modal bg-slate-800 rounded-2xl shadow-lg w-[90%] p-6 text-white relative">
        {/* Header */}
        <div className="modal-header flex justify-between items-center border-b border-slate-700 pb-3">
          <h3 className="text-xl font-bold">User's Review</h3>
          <p
            className="close cursor-pointer text-2xl hover:text-indigo-400 transition"
            onClick={() => {
              onClose();
            }}
          >
            &times;
          </p>
        </div>


        {/*Content*/}
        <div className="modal bg-slate-800 rounded-2xl shadow-lg w-[90%] max-w-xl p-6 text-white relative max-h-[85vh] overflow-y-auto">
          <div className="modal-content mt-4">
            {user.username} review for {review.movieId.title}
            <CommentReviewList comments={comments} />
            <CommentReviewForm watchedMovieId={review._id} commenterId={user._id} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default ReviewModal