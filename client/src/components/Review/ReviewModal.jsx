import React from 'react'
import { useState, useEffect } from 'react'
import CommentReviewForm from './CommentReviewForm';
import CommentReviewList from './CommentReviewList';
import MoviePageDetails from '../MoviePage/MoviePageDetails';


const ReviewModal = ({ isOpen, onClose, review, user, authUser }) => {

  const [comments, setComments] = useState([])
  const [message, setMessage] = useState('')
 

  useEffect(() => {
    let mounted = true;
    const loadComments = async () => {
      setMessage('Loading...');
      try {
        const res = await fetch(`https://bootcampproject-production.up.railway.app/getReviewCommentsByWatchedMovie/${review._id}`);
        const reviewComments  = await res.json();

        if (!mounted) return;
        if (res.ok ){
           setComments(reviewComments );
        }
        // setMessage(comments);
      } catch (error) {
        console.log("Error:", error);
        setComments([]);
       if (!mounted) return;
        setMessage("Showing Data from static JSON");
      }
    }
    if (isOpen) {
       loadComments();        
    }
   

  }, [isOpen, review]);


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
            <div className="flex flex-row justify-between">
                <MoviePageDetails movie={review.movieId} user={user} isReview={true} />
                <div className="">{review.review}</div>
            </div>
            
            <CommentReviewList comments={comments} />
            { authUser && (
              <CommentReviewForm watchedMovieId={review._id} commenterId={authUser} />
            )}
            
          </div>

        </div>
      </div>
    </div>
  )
}

export default ReviewModal