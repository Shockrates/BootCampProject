import React, { useState } from 'react'
import StarRating from './StarRating';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const MovieRating = () => {

    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [date, setDate] = useState("");

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

            <div className="">
                  <label htmlFor="review" className="block mb-2 text-sm font-medium">
                        You watched it at:
                    </label>
                    <div className="relative">
                        <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        className="bg-black text-white border border-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#D26D15]"
                        placeholderText="Choose a date"
                        />
                </div>
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