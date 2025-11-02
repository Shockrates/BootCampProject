import { useState, useEffect } from 'react'
import MovieSearchModal from './MovieSearch/MovieSearchModal';
import FeedList from '../CommunityFeed/FeedList'
import { useAuth } from '../Auth/AuthProvider';
import { useParams } from 'react-router-dom';
import FeedListCarusel from '../Home/FeedListCarusel';
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

// This is for favorite movies
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
    ) } }   */

const Profile = () => {

  const { user } = useAuth();
  const { id } = useParams();

  const [isOwner, setIsOwner] = useState(false);
  const [profileUser, setProfileUser] = useState(user);
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const loadUser = async (userId) => {
      try {
        const res = await fetch(`https://bootcampproject-production.up.railway.app/user/${userId}`);
        const { user } = await res.json();
        if (cancelled) return;
        setProfileUser(user);
      } catch (error) {
        console.log("Error:", error);
        if (!cancelled) setProfileUser(null);
      }
    }

    if (!user) {
      setIsOwner(false);
      setProfileUser(null);
      return () => { cancelled = true; };
    }

    if (user._id === id) {
      setIsOwner(true)
      setProfileUser(user);
    } else {
      setIsOwner(false)
      loadUser(id, user)
    }
    return () => { cancelled = true; };
  }, [id])

  useEffect(() => {
    if (!profileUser?._id) {
      setWatchedMovies([]); // optional: clear when no profile user
      return;
    }

    let cancelled = false;

    const loadWatchedMovies = async (userId) => {
      try {
        const res = await fetch(`https://bootcampproject-production.up.railway.app/watchedByUser/${userId}`);
        const { watchedMovies } = await res.json();
        if (cancelled) return;
        setWatchedMovies(watchedMovies ?? []);
      } catch (error) {
        console.log("Error:", error);
        if (!cancelled) setWatchedMovies([]);
      }
    }
    loadWatchedMovies(profileUser._id)
    return () => {
      cancelled = true;
    }
  }, [profileUser._id])




  //const authId = loadUser?._id ?? user?.id ?? null;
  //const isOwner = authId && String(authId) === String(id);


  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-white">
        {isOwner ? 'Your Profile' : `${profileUser.username}'s Profile `}
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

        <h1 className='mt-6'>{isOwner ? 'Your Reviews' : `${profileUser.username}'s Reviews `}</h1>

        {/* {
          watchedMovies.map((review, index) => (

            <FeedListItem key={index} review={review} />

          ))
        } */}
        <FeedListCarusel reviews={watchedMovies} isProfile={true} />

      </section>
    </div>
  )
}

// 
export default Profile



