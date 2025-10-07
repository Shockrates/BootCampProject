import React, { useState } from 'react'
import StarRating from './StarRating';

const MovieRating = () => {

    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");

    const handleReview = (e) => {
        e.preventDefault();
        console.log({ review, rating });   
    };

  return (
     <div className="">
        <form action="" 
            onSubmit={handleReview} 
            className="w-full mx-auto mt-10 p-6 bg-slate-800 text-white rounded-2xl shadow-lg space-y-6"
        >
              {/* Textarea */}
            <div>
                <label htmlFor="review" className="block mb-2 text-sm font-medium">
                Your review:
                </label>
                <textarea
                id="review"
                rows="4"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write something..."
                ></textarea>
            </div>

            <div className="">
                <StarRating value={rating} onChange={setRating} />
            </div>
             <button
                type="submit"
                className="w-full py-2 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-500 transition"
            >
                Submit
            </button>
        </form>
    </div>
  )
}

export default MovieRating