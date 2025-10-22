import React, { useState } from 'react'


const CommentReviewForm = ({ watchedMovieId, commenterId }) => {

    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    const handleComment = async (e) => {
        e.preventDefault();
        console.log(watchedMovieId, " ", commenterId, " ", comment);
        try {

            const res = await fetch(`http://localhost:3000/createReviewComment`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ watchedMovieId, commenterId, comment })
                })

            const { message, savedReviewComment } = await res.json();
            if (message) {
                setError(message)
            }

            //return savedWatchedMovie ? savedWatchedMovie : null;
        } catch (error) {

            console.log("Error:", error.message);
        }

    }

    return (
        <div className="">
            <form action=""
                onSubmit={handleComment}
                className="w-full mx-auto mt-10 p-6 bg-slate-800 text-white rounded-2xl shadow-lg space-y-6"
            >
                {/* Textarea */}
                <div>

                    <textarea
                        id="comment"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Add Comment"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-500 transition"
                >
                    Submit
                </button>
                {error && <div className="form-error">{error}</div>}
            </form>
        </div>
    )
}

export default CommentReviewForm