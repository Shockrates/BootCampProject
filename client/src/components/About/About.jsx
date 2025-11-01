import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import video from '../../assets/video.mp4';
import { fetchTopMoviesKaterina } from '../../utils/api'
import MoviesTable from './MoviesTable'


export default function About() {
    const navigate = useNavigate();
    // const [images, setImages] = useState([]);

    const handleLoginRedirect = () => {
        navigate('/imdb-top-movies'); // redirect to the login page
    };

    const [movies, setMovies] = useState([])

    /**
     * Testing fetching functionality from a JSON Server.
     * If Json server is running data is set from there
     * if that fails data is set from static imdb_top_1000.json
     */
    useEffect(() => {
        let mounted = true;
        const loadMovies = async () => {
            try {
                const movies = await fetchTopMoviesKaterina();
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


    return (
        <div>
            {/* Video Section */}
            <div className='video-container w-screen -mx-[calc((100vw-100%)/2)] relative'>
                <video
                    controls
                    src={video}
                    type="video/mp4"
                    preload="metadata"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='w-full h-auto'
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 space-y-4">
                    <h1 className="text-white text-4xl font-bold">This is Reel Talk</h1>
                    <h2 className="text-white text-xl text-center max-w-xl">
                        Log in to join our community and connect with film lovers
                    </h2>
                    <button
                        onClick={handleLoginRedirect}
                        className="bg-white text-black rounded-full px-6 py-3 font-semibold hover:bg-gray-200 transition"
                    >
                        Log In
                    </button>
                </div>
            </div>

            {/* Title for the Image Grid */}
            <div className="max-w-6xl mx-auto my-12 px-4">
                <h2 className="text-3xl font-bold text-center mb-6">Top Movies</h2>

                {/* Image Grid */}
                    <MoviesTable movies={movies} />
            </div>
        </div>
    );
}
