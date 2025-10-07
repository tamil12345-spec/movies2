import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const MovieCard = ({ movie }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.imdbID);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Link to={`/movie/${movie.imdbID}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-poster.jpg'}
            alt={movie.Title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              className={`w-5 h-5 ${favorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
              fill={favorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {movie.Title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{movie.Year}</p>
          <p className="text-gray-500 text-sm capitalize">{movie.Type}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;