
/*import React from 'react'
import { useState, useEffect } from 'react'
import MovieSearchModal from './MovieSearch/MovieSearchModal';
import FeedListItem from '../CommunityFeed/FeedListItem'
import { useAuth } from '../Auth/AuthProvider';
import { useParams } from 'react-router-dom';

import movies from '../../data/movies.json'; 
import {id} from 'react-router-dom';
*/

//import movies from '../../data/movies.json'; 
//import {id} from 'react-router-dom';


/*const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Profile</h1>
      <div className="profile">

        <div>Username: {user.username}</div>
        <div>Age: {user?.age}</div>
        <div>Email: {user?.email}</div>
      </div>
      <section className="my-6">
        <p className="text-gray-300 mb-4">
          Welcome to your profile! You can search for movies by clicking the button below:
        </p>
        <MovieSearchModal />
      </section>
    </div>
  )
}


export default Profile

This is for favorite movies
export function FavoriteMovies({ useAuth }) {
const user = useAuth();
const favoriteMovieIds = user?.favoriteMovies || [];
const favoriteMovies = movies.filter(movie => favoriteMovieIds.includes(movie.id));
}

function FavoriteMovies({ useAuth }) {
const [favoriteMovies, setFavoriteMoviesCounter] = React.useState([0]);

return (
<div>
<p>WATCHED MOVIES</p>
<h1>setFavoriteMoviesCounter</h1>
</div>
)

This is for favoritemovies
   export function FavoriteMovies({ useAuth }) {
   const user = useAuth();
   const favoriteMovieIds = user?.favoriteMovies || [];
   const favoriteMovies = movies.filter(movie => favoriteMovieIds.includes(movie.id, movie.poster_url));
 }

 function FavoriteMovies({ useAuth }) {
   const [favoriteMovies, setFavoriteMoviesCounter] = React.useState([0]);

    return (
     <div>
       <p>WATCHED MOVIES</p>
       <h1>setFavoriteMoviesCounter</h1>
     </div>
    ) } }   

const Profile = () => {

  const { user } = useAuth();
  const { id } = useParams();

  const [isOwner, setIsOwner] = useState(false);
  const [profileUser, setProfileUser] = useState(user);
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    console.log(id);

    const loadUser = async (userId) => {
      try {
        const res = await fetch(`https://bootcampproject-production.up.railway.app/user/${userId}`);
        const { user } = await res.json();
        console.log(user.username);
        setProfileUser(user);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    const loadWatchedMovies = async (userId) => {
      try {
        const res = await fetch(`https://bootcampproject-production.up.railway.app/watchedByUser/${userId}`);
        const { watchedMovies } = await res.json();
        setWatchedMovies(watchedMovies);
      } catch (error) {
        console.log("Error:", error);
      }
    }


    if (user._id === id) {
      setIsOwner(true)
      setProfileUser(user);
    } else {
      setIsOwner(false)
      loadUser(id)
    }
    loadWatchedMovies(profileUser._id)
  }, [id])



  //const authId = loadUser?._id ?? user?.id ?? null;
  //const isOwner = authId && String(authId) === String(id);


  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-white">
        Profile {isOwner ? '(Your Profile)' : `${profileUser.username}`}
      </h1>
      <div className="profile">

        <div>Username: {profileUser.username}</div>
        <div>Age: {profileUser?.age}</div>
        <div>Email: {profileUser?.email}</div>
      </div>
      <section className="my-6">


        {isOwner && (
          <div>
            <p className="text-gray-300 mb-4">
              Welcome to your profile! You can search for movies by clicking the button below:
            </p>
            <button className="registster-btn">Edit Profile </button>
          </div>
        )

        }

        <h1>{isOwner ? 'Your Reviews' : `${profileUser.username}'s Reviews `}</h1>

        {
          watchedMovies.map((review, index) => (

            <FeedListItem key={index} review={review} />

          ))
        }


      </section>
    </div>
  )
}

export default Profile */



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
import MovieSearchModal from './MovieSearch/MovieSearchModal';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams(); // now uses username from URL
  const { loggedUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  
  const getTwoLetters = (name = '') => {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
  }

  useEffect(() => {
    const loadByUsername = async (u) => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/user/username/${encodeURIComponent(u)}`);
        if (!res.ok) throw new Error('Failed to load user');
        const data = await res.json();
        setProfileUser(data);
      } catch (err) {
        console.error(err);
        setProfileUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      loadByUsername(username);
    } else {
      // no username in URL -> show authenticated user
      setProfileUser(loggedUser ?? null);
    }
  }, [username, loggedUser]);

  if (loading) return <div>Loading...</div>;
  if (!profileUser) return <div>No user found.</div>;
  <button on click={() => navigate(-1)}>Go Back</button>

  const isOwner = !!loggedUser && loggedUser.username === profileUser.username;

  return (

    <div className="profile flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-semibold"
        aria-hidden="true"
      >
        {getTwoLetters(profileUser?.username)}
      </div>
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-white">
        Profile {isOwner ? '(Your Profile)' : ''}
      </h1>

      <div className="profile">
        <div>Username: {profileUser.username}</div>
        <div>Age: {profileUser?.age ?? '—'}</div>
        <div>Email: {profileUser?.email ?? '—'}</div>
      </div>

      <section className="my-6">
        {isOwner && <button className="register-btn">Edit Profile</button>}
        <MovieSearchModal />
      </section>
    </div>
    </div>
  );
  

};

  export default Profile;



