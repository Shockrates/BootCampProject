import React, { useState, useEffect } from "react";
import MovieTableItem from './MovieTableItem'
import moviesTest from '../../data/movies.json'
import { fetchTopMovies } from "../../utils/api";



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
        let mounted = true;
        const loadMovies = async () => {
            setMessage('Loading...');
            try {
                const movies = await fetchTopMovies(37, 0);
                if (!mounted) return;
                setMovies(movies);
                setMessage("Showing Data from Backend Server");
            } catch (error) {
                console.log("Error:", error);
                if (!mounted) return;
                setMovies(moviesTest.slice(0, 36));
                setMessage("Showing Data from static JSON");
            }
        }
        loadMovies();
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