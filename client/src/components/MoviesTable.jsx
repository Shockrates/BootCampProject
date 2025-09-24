import React from 'react'
import MovieTableItem from './MovieTableItem'
import movies from '../data/movies.json'


// Minimal reactive grid: simply renders all movies as cards (no filters)
export default function MoviesTable() {
    if (!movies || movies.length === 0) return <p>No movies available.</p>


    return (
        <div className="cards-grid">
            {movies.map((m, i) => (
                <MovieTableItem key={i} movie={m} />
            ))}
        </div>
    )
}