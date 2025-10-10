import React from 'react'

const MovieSearchModal = ({ children }) => {
    return (
        <div className='modal-container'>
            <div className="modal">
                <div className="modal-header">
                    <p className="close">&times;</p>
                </div>
                <div className="modal-content">
                    {children}
                </div>
                <div className="modal-footer"></div>
            </div>

        </div>
    )
}

export default MovieSearchModal