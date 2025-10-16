import React, { useEffect, useState } from 'react'
import reviewsTest from '../../../data/watchedMovies.json'
import FeedList from './FeedList'
import { fetchReviews } from '../../../utils/api'

const CommunityFeed = () => {

    const [reviews, setReviews] = useState([])
    const [message, setMessage] = useState('')


    /**
     * Testing fetching functionality from a JSON Server.
     * If Json server is running data is set from there
     * if that fails data is set from static imdb_top_1000.json
     */
    useEffect(() => {
        let mounted = true;
        const loadReviews = async () => {
            setMessage('Loading...');
            try {
                const reviews = await fetchReviews();
                if (!mounted) return;
                setReviews(reviews);
                setMessage("Showing Data from Backend Server");
            } catch (error) {
                console.log("Error:", error);
                if (!mounted) return;
                setReviews(reviewsTest.slice(0, 36));
                setMessage("Showing Data from static JSON");
            }
        }
        loadReviews();
        console.log(message);

    }, []);
  return (
    <div>
        <h1>
            TESTING FOR CommunityFeed
        </h1>
<FeedList reviews={reviews} />
    </div>
  )
}

export default CommunityFeed