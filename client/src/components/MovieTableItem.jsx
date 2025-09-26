import React from 'react'
import { Link } from 'react-router-dom'


export default function MovieTableItem({ movie, index }) {
    const genres = (movie.genre || []).join(', ')


    return (
        <Link to={`/movie/${index}`} className="movie-card-link" style={{ textDecoration: 'none' }}>
            <article className="movie-card" aria-labelledby={`movie-title-${index}`}>
                <div className="poster-wrap">
                    <img style={{ width: 300 }} src={movie.poster_url} alt={movie.title } title={movie.title }/>
                </div>


                <div className="card-body">
                    <h3 className="card-title">{movie.title} <small>({movie.year})</small></h3>
                    <div className="meta">{genres} • {movie.runtime} min • Directed by {movie.director}</div>
                </div>
            </article>
        </Link>
     
    )
}