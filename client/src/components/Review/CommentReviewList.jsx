import React from 'react'

const CommentReviewList = ({ comments }) => {
    return (
        <div>
            <div className="">List of comments To DO</div>
            {
                comments.map((comment, index) => (

                    <div className="" key={index}>
                        {comment.comment}
                    </div>
                ))
            }
        </div>
    )
}

export default CommentReviewList