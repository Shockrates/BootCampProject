import { useParams, Link, useNavigate } from 'react-router-dom'
import movies from '../../data/imdb_top_1000.json'


const MoviePage = () => {

  //Takes the id value form url (ex. http://localhost:5173/movie/1 id='1' )
  const { id } = useParams()
  // Makes into a number (useParams() saves a s String)
  const idx = Number(id)
  //Hook for navigate
  const navigate = useNavigate()

  //If there is a movie in the imdb_top_1000.json at the idx index will return the movie else return null
  const movie = Number.isInteger(idx) && movies[idx] ? movies[idx] : null

  //Tranforms the genres table to a string
  const genres = (movie?.genre || []).join(', ')

  return (
    <article className="max-w-6xl mx-auto">
      {/* "Movie not found" block  If there is a movie show this block bellow*/}
      {!movie && (
        <div>
          <h1>Movie not found</h1>
          <p>We couldn't find the movie you requested.</p>
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
              {genres} • {movie.runtime} min
            </div>
            <div style={{ color: '#666', marginTop: 6 }}>Director: {movie.director}</div>
            <p style={{ marginTop: 12 }}>{movie.description}</p>

            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <Link to="/">← Back to Dashboard</Link>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export default MoviePage;
