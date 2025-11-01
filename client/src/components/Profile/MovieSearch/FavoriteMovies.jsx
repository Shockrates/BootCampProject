import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
import MovieSearchModal from './MovieSearch/MovieSearchModal';
import { useNavigate } from 'react-router-dom';
import getAllWatchedMovies from '../../api/movies/getAllWatchedMovies';
import { setProfileUser } from '../Profile/TestProfile';



const FavoriteMovies = ({ setProfileUser }) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    useEffect(() => {
      const fetchFavoriteMovies = async () => {
        try {
          const movies = await getAllWatchedMovies(profileUser._id);
          setFavoriteMovies(movies);
        } catch (error) {
          console.error('Error fetching favorite movies:', error);
          <h1> NO FAVORITE MOVIES FOUND</h1>
        }
      };
    }
  
return deafult FavoriteMovies;;  )
}  useEffect(() => {
      fetchFavoriteMovies();
    }   , [profileUser._id]);[]);               