import React, { useState } from 'react'
import MovieSearchModal from './MovieSearchModal'

const MovieSearch = () => {

  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className='movie-search'>


      <button className='btn btn-open' onClick={() => setModalOpen(true)}>Search for Movies</button>
      {modalOpen && (
        <MovieSearchModal>
          <h3>Enter a movie title</h3>
          <form action="" method="post">
            <div className="movie-search-input flex">
              <label htmlFor="movieTitle"></label>
              <input type="text" name='movieTitle' />
              <button type="submit" className='modal-btn'>Search</button>
            </div>

          </form>
        </MovieSearchModal>
      )}

    </div>
  )
}

export default MovieSearch