import React from 'react'
import MovieSearchModal from './MovieSearch/MovieSearchModal';
import { useAuth } from '../Auth/AuthProvider';
import { useParams } from 'react-router-dom';
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


  const authId = loadUser?._id ?? user?.id ?? null;
  const isOwner = authId && String(authId) === String(id);


  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-white">
        Profile{isOwner ? '(Your Profile)' : ''}</h1>
      <div className="profile">

        <div>Username: {loadUser.username}</div>
        <div>Age: {loadUser?.age}</div>
        <div>Email: {loadUser?.email}</div>
      </div>
      <section className="my-6">
        <p className="text-gray-300 mb-4">
          Welcome to your profile! You can search for movies by clicking the button below:
        </p>

        {isOwner && (
          <div>
            ( //only for logged-in user viewing their own profile)
            <button className="registster-btn">Edit Profile </button>
          </div>
        )

        }



        <MovieSearchModal />
      </section>
    </div>
  )
}

// 
export default Profile



const loadUser = async (userId) => {
  try {
    const res = await fetch(`http://localhost:3000/user/${userId}`);

    const returnedUser = await res.json();

    console.log(user);
    setUser(returnedUser);
  } catch (error) {
    console.log("Error:", error);
  }
}
