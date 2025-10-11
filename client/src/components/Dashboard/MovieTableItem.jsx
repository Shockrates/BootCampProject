import React from 'react'
import { Link } from 'react-router-dom'


/**
 * MovieTableItem component.
 * - Displays a single movie as a clickable card linking to its detailed page.
 * - Shows poster, title, year, genres, runtime, and director.
 * - Uses React Router <Link> to navigate to the corresponding MoviePage.
 * - Optimized for lazy loading of images for performance.
 */


export default function MovieTableItem({ movie, index }) {
    const genres = (movie.genre || []).join(', ')


    return (
        <Link to={`/movie/${movie._id}`} className="movie-card-link" style={{ textDecoration: 'none' }}>
            <article className="movie-card" aria-labelledby={`movie-title-${index}`}>
                <div className="poster-wrap">
                    <img src={movie.poster_url} alt={movie.title} title={movie.title} loading='lazy'
                        onError={(e) => {
                            e.currentTarget.src = "/no_poster.svg";
                            e.currentTarget.alt = "Poster not available";
                        }}
                    />
                </div>


                <div className="card-body">
                    <h3 className="card-title">{movie.title} <small>({movie.year})</small></h3>
                    <div className="meta">{genres} • {movie.runtime} min • Directed by {movie.director}</div>
                </div>
            </article>
        </Link>

    )
}