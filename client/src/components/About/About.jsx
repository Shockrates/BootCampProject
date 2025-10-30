import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import video from '../../assets/video.mp4';
import { fetchTopMovies } from '../../utils/api'
import MoviesTable from './MoviesTable'


export default function About() {
    const navigate = useNavigate();
    // const [images, setImages] = useState([]);

    const handleLoginRedirect = () => {
        navigate('/imdb-top-movies'); // redirect to the login page
    };

    // // Fetch 4 images from backend
    // useEffect(() => {
    //     const fetchTopRated = async () => {
    //         try {
    //             const response = await fetch('/getAllMovies'); // your backend endpoint
    //             const data = await response.json();
    //             setImages(data.slice(0, 4)); // take only 4 images
    //         } catch (error) {
    //             console.error('Error fetching images:', error);
    //         }
    //     };

    //     fetchTopRated();
    // }, []);

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
                const movies = await fetchTopMovies(4, 0);
                if (!mounted) return;
                setMovies(movies);
            } catch (error) {
                console.log("Error:", error);
                if (!mounted) return;
                setMovies(moviesTest.slice(0, 1));
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MoviesTable movies={movies} />
                    {/* {images.map((img, index) => (
                        <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                            <img
                                src={img.url} // backend returns "url"
                                alt={img.title || `Movie ${index + 1}`}
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                            {img.title && (
                                <div className="p-2 text-center font-semibold">{img.title}</div>
                            )}
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );
}
