import React, { useState, useEffect } from "react";
import MovieTableItem from './MovieTableItem'
import moviesTest from '../data/imdb_top_1000.json'


// Minimal reactive grid: simply renders all movies as cards (no filters)
export default function MoviesTable() {

    const [movies, setMovies] = useState([])
    const [message, setMessage] = useState('')


    /**
     * Testing fetching functionality from a JSON Server.
     * If Json server is running data is set from there
     * if that fails data is set from static imdb_top_1000.json
     */

    useEffect(() => {
        fetch("http://localhost:3000/movies")
            .then((res) => res.json())
            .then((json) => {
                setMovies(json);
                setMessage("Showing Data from Json Server");
            })
            .catch(error => {
                setMovies(moviesTest);
                setMessage("Showing Data from static JSON");
            });
    }, []);

    if (!movies || movies.length === 0) return <p>No movies available.</p>


    return (
        <>
            <div className="">{message}</div>
            <div className="cards-grid">
                {
                    /* Reads only the first 36 movies */
                    movies.slice(0, 36).map((m, i) => (
                        <MovieTableItem key={i} movie={m} index={i} />
                    ))
                }
            </div>
        </>

    )
}