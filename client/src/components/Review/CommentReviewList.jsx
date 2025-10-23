import React from 'react'

const CommentReviewList = ({ comments }) => {
    console.log(comments);
    
    if (!comments || comments.length === 0) return <p>No comments available.</p>
    return (
        <div>
            <div className="mb-5">List of comments:</div>
            {
                comments.map((comment, index) => (

                    <div className="my-3 mx-2 border-b-2 border-b-white" key={index}>
                        <span>{comment.commenterId.username}</span>
                        <p>{comment.comment}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default CommentReviewList