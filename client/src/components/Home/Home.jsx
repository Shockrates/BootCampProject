import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import video from '../../assets/video.mp4';
import { fetchTopXMovies } from '../../utils/api'
import MoviesTable from '../Dashboard/MoviesTable'
import FilterBar from './FilterBar'
import { useSearchParams } from "react-router-dom"
import useAuth from '../Auth/AuthProvider';
import { fetchReviews } from '../../utils/api'
import FeedList from '../CommunityFeed/FeedList'


export default function Home() {
    const navigate = useNavigate();
    // const [images, setImages] = useState([]);
    const { user } = useAuth();
    const handleLoginRedirect = () => {
        navigate('/imdb-top-movies'); // redirect to the login page
    };

    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [reviews, setReviews] = useState([])

    const [params] = useSearchParams()
    const genre = params.get("genre") // single source of truth for filter

    /**
     * Testing fetching functionality from a JSON Server.
     * If Json server is running data is set from there
     * if that fails data is set from static imdb_top_1000.json
     */
    useEffect(() => {
        let mounted = true;
        const loadMovies = async () => {
            try {
                //const movies = await fetchTopMoviesKaterina();
                const movies = await fetchTopXMovies(4);
                if (!mounted) return;
                setMovies(movies);
            } catch (error) {
                console.log("Error:", error);
                if (!mounted) return;
                //setMovies(moviesTest.slice(0, 1));
            }
        }
        loadMovies();
    }, []);
    useEffect(() => {
        let mounted = true;
            const normalizedGenre = genre && genre.toLowerCase() !== "all"
        ? genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase()
        : undefined;


        const loadFilteredMovies = async () => {
            try {
                const filteredMovies = await fetchTopXMovies(4, normalizedGenre);
                if (!mounted) return;
                setFilteredMovies(filteredMovies);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        loadFilteredMovies();

        return () => { mounted = false }
    }, [genre]); // <-- dependency on genre

    useEffect(() => {
        let mounted = true;
        const loadReviews = async () => {
            try {
                const reviews = await fetchReviews(4);
                if (!mounted) return;
                setReviews(reviews);

            } catch (error) {
                console.log("Error:", error);
                if (!mounted) return;
            }
        }
        loadReviews();


    }, []);
    return (
        <div>
            {/* Video Section */}
            <div className='video-container w-screen h-[75vh] overflow-hidden -mx-[calc((100vw-100%)/2)] relative'>
                <video
                    controls
                    src={video}
                    type="video/mp4"
                    preload="metadata"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='absolute inset-0 w-full h-full object-cover z-0'
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 space-y-4">
                    <h1 className="text-white text-4xl font-bold">This is Reel Talk</h1>
                    {!user && (
                        <>
                            <h2 className="text-white text-xl text-center max-w-xl">
                                Log in to join our community and connect with film lovers
                            </h2>
                            <button
                                onClick={handleLoginRedirect}
                                className="bg-white text-black rounded-full px-6 py-3 font-semibold hover:bg-gray-200 transition"
                            >
                                Log In
                            </button>
                        </>
                    )}

                </div>
            </div>

            {/* Title for the Image Grid */}
            {/* <div className="max-w-6xl mx-auto my-12 px-4">
                <h2 className="text-3xl font-bold text-center mb-6">Top Rated Movies by ReelTalk Users</h2>
                <MoviesTable movies={movies} />
            </div> */}
            {/* Title for the Genre Image Grid */}
            <div className="max-w-6xl mx-auto my-12 px-4">
                <h2 className="text-3xl font-bold text-center mb-6">
                      {genre && genre.toLowerCase() !== "all"
                        ? `Top Rated ${genre[0].toUpperCase() + genre.slice(1)} Movies by ReelTalk Users`
                        : "Top Rated Movies by ReelTalk Users"}

                    {/* {genre ? `Top Rated ${genre[0].toUpperCase() + genre.slice(1)} Movies by ReelTalk Users`
                        : "Top Rated Movies by ReelTalk Users"} */}
                </h2>
                <FilterBar />
                {/* Image Grid */}
                <MoviesTable movies={filteredMovies} />
            </div>

            <div className="max-w-6xl mx-auto my-12 px-4">
                <h2 className="text-3xl font-bold text-center mb-6">Recent Reviews</h2>
                {/* Image Grid */}
                <FeedList reviews={reviews} isProfile={true} isTable={true} />
            </div>


        </div>


    );
}
