import { useParams, Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import MovieRating from './MovieRating'
import { useAuth } from '../Auth/AuthProvider'
import { fetchMovie } from '../../utils/api';


const MoviePage = () => {

  const [movie, setMovie] = useState()
  const [message, setMessage] = useState("")

  //Takes the id value form url (ex. http://localhost:5173/movie/1 id='1' )
  const { id } = useParams()

  //Hook for navigate
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true;
    const loadMovies = async () => {
      setMessage('Loading...');
      try {
        const movies = await fetchMovie(id);
        if (!mounted) return;
        setMovie(movies);
        setMessage("Showing Data from Backend Server");
      } catch (error) {
        console.log("Error:", error);
        if (!mounted) return;
        setMessage(error.message);
      }
    }
    loadMovies();

  }, []);

  //Tranforms the genres table to a string
  const genres = (movie?.genre || []).join(', ')

  //Check if the user is logged in
  const { user } = useAuth();

  return (
    <article className="max-w-6xl mx-auto mt-10">
      {/* "Movie not found" block  If there is a movie show this block bellow*/}
      {!movie && (
        <div>
          <h1>Movie not found</h1>
          <p>We couldn't find the movie you requested.</p>
          <div>{message}</div>
          {/** Click event for navogating back */}
          <button onClick={() => navigate(-1)}>Go back</button>
        </div>
      )}

      {/* Movie details block */}
      {movie && (
        <div className='movie-page'>
          <div className="movie-body">
            <img src={movie.poster_url} alt={`${movie.title} poster`} className="movie-poster" />
          </div>

          <div className='movie-info'>
            <h1 style={{ margin: 0 }}>
              {movie.title} <small>({movie.year})</small>
            </h1>
            <div style={{ color: '#666', marginTop: 6 }}>
              {genres} • {movie.runtime}
            </div>
            <div style={{ color: '#666', marginTop: 6 }}>Director: {movie.director}</div>
            <p style={{ marginTop: 12 }}>{movie.description}</p>

            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button className='btn-back' onClick={() => navigate(-1)}>← Go Back</button>
            </div>
            {user &&
              <MovieRating movieId={id} userId={user._id} />
            }
          </div>
        </div>
      )}
    </article>
  )
}

export default MoviePage;
