import React from 'react'
import { useState } from 'react'
import MovieSearch from './MovieSearch';

const MovieSearchModal = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="movie-search text-center">
        <button onClick={() => setIsOpen(true)} className="register-btn">
            Search Movies
        </button>

        <MovieSearch
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            maxResults={6}
        />
        </div>

    )
}

export default MovieSearchModal

/*    return (
        <div className='modal-container'>
            <div className="modal">
                <div className="modal-header">
                    <p className="close">&times;</p>
                </div>
                <div className="modal-content">
                    <h3>Enter a movie title</h3>
                    <form action="" method="post">
                        <div className="movie-search-input flex">
                            <label htmlFor="movieTitle"></label>
                            <input type="text" name='movieTitle' />
                            <button type="submit" className='modal-btn'>Search</button>
                        </div>

                    </form>
                </div>
                <div className="modal-footer"></div>
            </div>

        </div>
    )
}

export default MovieSearchModal
*/