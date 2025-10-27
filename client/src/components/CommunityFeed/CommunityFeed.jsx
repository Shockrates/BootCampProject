import React, { useEffect, useState } from 'react'
import reviewsTest from '../../data/watchedMovies.json'
import FeedList from './FeedList'
import { fetchReviews } from '../../utils/api'
import { bus } from '../../utils/eventBus'

const CommunityFeed = () => {

    const [reviews, setReviews] = useState([])
    const [message, setMessage] = useState('')


    /**
     * Testing fetching functionality from a JSON Server.
     * If Json server is running data is set from there
     * if that fails data is set from static json
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

    /**
     * Listen for comment creation
     */
    useEffect(() => {
        const createCommentHandler = ({ watchedMovieId, serverCount }) => {
            setReviews((prev) =>
                prev.map((r) =>
                    r._id === watchedMovieId
                        ? { ...r, CommentCount: serverCount ?? r.CommentCount + 1 }
                        : r
                )
            );
        }
        bus.on("comment:created", createCommentHandler);
        return () => {
            bus.off("comment:created", createCommentHandler);
        }
    }, [])


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