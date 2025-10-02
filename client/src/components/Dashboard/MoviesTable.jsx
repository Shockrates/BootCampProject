import React, { useState, useEffect } from "react";
import MovieTableItem from './MovieTableItem'
import moviesTest from '../../data/movies.json'


/**
 * MoviesTable component.
 * - Fetches a list of movies from a local JSON server, falls back to static JSON if server fails.
 * - Stores movies in state and displays a message indicating data source.
 * - Renders each movie as a MovieTableItem in a simple responsive grid.
 * - Only the first 36 movies are displayed for performance/demo purposes.
 */


export default function MoviesTable() {

    const [movies, setMovies] = useState([])
    const [message, setMessage] = useState('')


    /**
     * Testing fetching functionality from a JSON Server.
     * If Json server is running data is set from there
     * if that fails data is set from static imdb_top_1000.json
     */
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let response = await fetch("http://localhost:3000/movies?_start=0&_limit=36");
                let movies = await response.json();
                setMovies(movies);
                setMessage("Showing Data from Json Server");
            } catch (error) {
                console.log("Error:", error);
                setMovies(moviesTest.slice(0, 36));
                setMessage("Showing Data from static JSON");
            }
        }
        fetchMovies();
    }, []);

    if (!movies || movies.length === 0) return <p>No movies available.</p>


    return (
        <>
            <div className="">{message}</div>
            <div className="cards-grid">
                {
                    /* Reads only the first 36 movies */
                    movies.map((m, i) => (
                        <MovieTableItem key={i} movie={m} index={i} />
                    ))
                }
            </div>
        </>

    )
}