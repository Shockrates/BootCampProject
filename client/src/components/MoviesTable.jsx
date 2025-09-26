import React from 'react'
import MovieTableItem from './MovieTableItem'
import movies from '../data/imdb_top_1000.json'


// Minimal reactive grid: simply renders all movies as cards (no filters)
export default function MoviesTable() {
    if (!movies || movies.length === 0) return <p>No movies available.</p>


    return (
        <div className="cards-grid">
            {
                /* Reads only the first 36 movies */
                movies.slice(0, 36).map((m, i) => (
                    <MovieTableItem key={i} movie={m} index={i}/>
                ))
            }
        </div>
    )
}