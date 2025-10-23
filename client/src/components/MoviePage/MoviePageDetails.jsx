import React from 'react'
import { useNavigate } from 'react-router-dom'
import MovieRating from './MovieRating'

const MoviePageDetails = ({movie, user, isReview=false}) => {
    //Hook for navigate
  const navigate = useNavigate()
  //Tranforms the genres table to a string
  const genres = (movie?.genre || []).join(', ')
  return (
    <>
    <div className="movie-body">
            <img src={movie.poster_url} alt={`${movie.title} poster`} className="movie-poster" />
          </div>

          <div className='movie-info'>
            <h1 style={{ margin: 0 }}>
              {movie.title}  {movie.year && (<small>({movie.year})</small>)}
            </h1>
            <div style={{ color: '#666', marginTop: 6 }}>
              {genres} • {movie.runtime}
            </div>
            <div style={{ color: '#666', marginTop: 6 }}>Director: {movie.director}</div>
            <p style={{ marginTop: 12 }}>{movie.description}</p>

            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button className='btn-back' onClick={() => navigate(-1)}>← Go Back</button>
            </div>
            {user && !isReview &&
              <MovieRating movie={movie} userId={user._id} />
            }
          </div></>
        
  )
}

export default MoviePageDetails