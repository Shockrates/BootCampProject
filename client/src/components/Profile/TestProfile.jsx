import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
import MovieSearchModal from './MovieSearch/MovieSearchModal';
import FeedListItem from '../CommunityFeed/FeedListItem';

const Profile = () => {
  const { username } = useParams();
  const { loggedUser } = useAuth();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  // fetch profile by username (try deployed then local)
  const fetchProfileByUsername = async (u) => {
    try {
      const urls = [
        `https://bootcampproject-production.up.railway.app/user/username/${encodeURIComponent(u)}`,
        `http://localhost:3000/user/username/${encodeURIComponent(u)}`
      ];
      for (const url of urls) {
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();
        return data.user ?? data;
      }
    } catch (err) {
      console.error('fetchProfileByUsername error:', err);
    }
    return null;
  };

  const getAllWatchedMovies = async (userId) => {
    try {
      const urls = [
        `https://bootcampproject-production.up.railway.app/watchedByUser/${encodeURIComponent(userId)}`,
        `http://localhost:3000/watchedByUser/${encodeURIComponent(userId)}`
      ];
      for (const url of urls) {
        const res = await fetch(url);
        if (!res.ok) continue;
        const json = await res.json();
        return json.watchedMovies ?? json;
      }
    } catch (error) {
      console.error('getAllWatchedMovies error:', error);
    }
    return [];
  };

  const getUserReviews = async (userId) => {
    try {
      const urls = [
        `https://bootcampproject-production.up.railway.app/reviews/user/${encodeURIComponent(userId)}`,
        `https://bootcampproject-production.up.railway.app/reviews/byUser/${encodeURIComponent(userId)}`,
        `http://localhost:3000/reviews/user/${encodeURIComponent(userId)}`,
        `http://localhost:3000/reviews/byUser/${encodeURIComponent(userId)}`
      ];
      for (const url of urls) {
        const res = await fetch(url);
        if (!res.ok) continue;
        const json = await res.json();
        return json.reviews ?? json;
      }
    } catch (err) {
      console.error('getUserReviews error:', err);
    }
    return [];
  };

  useEffect(() => {
    let mounted = true;
    const loadProfile = async () => {
      setLoading(true);
      try {
        if (username) {
          const p = await fetchProfileByUsername(username);
          if (mounted) setProfileUser(p);
        } else {
          if (mounted) setProfileUser(loggedUser ?? null);
        }
      } catch (err) {
        console.error(err);
        if (mounted) setProfileUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadProfile();
    return () => { mounted = false; };
  }, [username, loggedUser]);

  // fetch watched movies + reviews when profileUser is available
  useEffect(() => {
    if (!profileUser?._id) {
      setWatchedMovies([]);
      setReviews([]);
      return;
    }
    let mounted = true;
    const loadExtras = async () => {
      const [wm, rv] = await Promise.all([
        getAllWatchedMovies(profileUser._id),
        getUserReviews(profileUser._id)
      ]);
      if (!mounted) return;
      setWatchedMovies(Array.isArray(wm) ? wm : []);
      setReviews(Array.isArray(rv) ? rv : []);
    };
    loadExtras();
    return () => { mounted = false; };
  }, [profileUser?._id]);

  const getTwoLetters = (name = '') => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  if (loading) return <div>Loading...</div>;
  if (!profileUser) return <div>No user found.</div>;

  const isOwner = !!loggedUser && (loggedUser._id === profileUser._id || loggedUser.username === profileUser.username);

  const avatarSrc = profileUser.avatar || profileUser.picture || profileUser.profilePicture || profileUser.imageUrl || null;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-gray-300">Go Back</button>

      <div className="flex items-center gap-4 mb-6">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={`${profileUser.username} avatar`}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-semibold">
            {getTwoLetters(profileUser.username)}
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold text-white">
            {profileUser.username} {isOwner ? '(You)' : ''}
          </h1>
          <div className="text-sm text-gray-300">{profileUser?.email ?? ''}</div>
        </div>

        <div className="ml-auto">
          {isOwner && <button className="register-btn">Edit Profile</button>}
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">{isOwner ? 'Your Watched Movies' : `${profileUser.username}'s Watched Movies`}</h2>
        {watchedMovies.length === 0 ? (
          <div className="text-gray-400">No watched movies to show.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {watchedMovies.map((m, i) => (
              <div key={m._id ?? m.id ?? i} className="bg-zinc-800 rounded p-3 flex gap-3">
                <img src={m.poster_url ?? m.poster ?? m.image} alt={m.title ?? m.name} className="w-16 h-24 object-cover rounded" />
                <div>
                  <div className="font-semibold text-white">{m.title ?? m.name}</div>
                  <div className="text-sm text-gray-400">{m.year ?? m.release_year}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">{isOwner ? 'Your Reviews' : `${profileUser.username}'s Reviews`}</h2>
        {reviews.length === 0 ? (
          <div className="text-gray-400">No reviews yet.</div>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r, i) => (
              <li key={r._id ?? r.id ?? i}>
                <FeedListItem review={r} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <MovieSearchModal />
    </div>
  );
};

export default Profile;