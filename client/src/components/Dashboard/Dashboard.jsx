import React, { useState, useEffect } from 'react'
import MoviesTable from './MoviesTable'
import { fetchTopMovies } from '../../utils/api'


/**
 * Dashboard component.
 * - Fetches a list of movies from a local JSON server, falls back to static JSON if server fails.
 * - Stores movies in state and displays a message indicating data source
 * - Serves as the main landing page for authenticated users.
 * - Currently renders the MoviesTable component to display a list of movies.
 * - Will later include additional components such as search, filters, or stats.
 */

export default function Dashboard() {

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
            }
        }
        loadMovies();
        console.log(message);

    }, []);
    return (
        <div>
            <h1>Movies Dashboard</h1>
            <MoviesTable movies={movies} />
        </div>
    )
}