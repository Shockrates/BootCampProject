import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
import MovieSearchModal from './MovieSearch/MovieSearchModal';
import FeedListItem from '../CommunityFeed/FeedListItem';




const TestProfile = () => {
  const { username } = useParams();
  const { loggedUser } = useAuth();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [watchedMovies, setWatchedMovies] = useState([]);

  const getTwoLetters = (name = '') => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const getAllWatchedMovies = async (userId) => {
    try {
      const res = await fetch(`https://bootcampproject-production.up.railway.app/watchedByUser/${userId}`);
      const { watchedMovies } = await res.json();
      return watchedMovies;
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    const loadByUsername = async (u) => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/user/username/${encodeURIComponent(u)}`);
        if (!res.ok) throw new Error('Failed to load user');
        const data = await res.json();
        // backend may return the user directly or { user }
        setProfileUser(data.user ?? data);
      } catch (err) {
        console.error(err);
        setProfileUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (username) loadByUsername(username);
    else setProfileUser(loggedUser ?? null);
  }, [username, loggedUser]);

  useEffect(() => {
    if (!profileUser?._id) {
      setWatchedMovies([]);
      return;
    }
    let mounted = true;
    const loadWatched = async () => {
      try {
        // try helper first, fallback to fetch
        const data = await getAllWatchedMovies(profileUser._id).catch(() => null);
        if (mounted && data) setWatchedMovies(data.watchedMovies ?? data);
        if (mounted && !data) {
          const res = await fetch(`http://localhost:3000/watchedByUser/${encodeURIComponent(profileUser._id)}`);
          if (res.ok) {
            const json = await res.json();
            setWatchedMovies(json.watchedMovies ?? json);
          } else setWatchedMovies([]);
        }
      } catch (err) {
        console.error('Error loading watched movies:', err);
        if (mounted) setWatchedMovies([]);
      }
    };
    loadWatched();
    return () => { mounted = false; };
  }, [profileUser?._id]);

  if (loading) return <div>Loading...</div>;
  if (!profileUser) return <div>No user found.</div>;

  const isOwner = !!loggedUser && loggedUser.username === profileUser.username;

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-gray-300">Go Back</button>

      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-semibold"
          aria-hidden="true"
        >
          {getTwoLetters(profileUser?.username)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {profileUser.username} {isOwner ? '(You)' : ''}
          </h1>
          <div className="text-sm text-gray-300">{profileUser?.email ?? ''}</div>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">
          {isOwner ? 'Your Watched Movies' : `${profileUser.username}'s Watched Movies`}
        </h2>

        {watchedMovies.length === 0 ? (
          <div className="text-gray-400">No watched movies to show.</div>
        ) : (
          <ul className="space-y-4">
            {watchedMovies.map((wm, idx) => (
              <li key={wm._id ?? wm.id ?? idx}>
                <FeedListItem review={wm} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {isOwner && (
        <section className="mb-6">
          <button className="register-btn">Edit Profile</button>
        </section>
      )}

      <MovieSearchModal />
    </div>
  );
};

export default TestProfile;