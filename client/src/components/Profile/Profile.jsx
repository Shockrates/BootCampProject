import React from 'react'
import MovieSearchModal from './MovieSearch/MovieSearchModal';
import { useAuth } from '../Auth/AuthProvider';

const Profile = () => {
  const { user } = useAuth();
  console.log(user);

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
//export function FavoriteMovies({ useAuth }) {
//const user = useAuth();
//const favoriteMovieIds = user?.favoriteMovies || [];
//const favoriteMovies = movies.filter(movie => favoriteMovieIds.includes(movie.id));
//}

//function FavoriteMovies({ useAuth }) {
//const [favoriteMovies, setFavoriteMoviesCounter] = React.useState([0]);

//return (
//<div>
//<p>WATCHED MOVIES</p>
//<h1>setFavoriteMoviesCounter</h1>
//</div>
//)

 //This is for favoritemovies
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
   ) }