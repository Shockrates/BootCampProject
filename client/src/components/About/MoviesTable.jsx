//import React, { useState, useEffect } from "react";
import MovieTableItem from './MovieTableItem'
//import moviesTest from '../../data/movies.json'
//import { fetchTopMovies } from "../../utils/api";



/**
 * MoviesTable component.
 * 
 * - Accepts Movies and message.
 * - Renders each movie as a MovieTableItem in a simple responsive grid.
 * - Only the first 36 movies are displayed for performance/demo purposes.
 */


export default function MoviesTable({ movies, message = "" }) {

    return (
        <>
            <div className="">{message}</div>
            <div className="cards-grid">
                {/* Reads only the first 36 movies */
                    movies.map((m, i) => (
                        <MovieTableItem key={i} movie={m} index={i} />
                    ))
                }
            </div>
        </>

    )
}