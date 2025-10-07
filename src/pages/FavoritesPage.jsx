import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Favorite Movies</h1>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Back to Search
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <p className="text-gray-600 text-lg mb-4">No favorite movies yet</p>
            <p className="text-gray-500">
              Start searching for movies and add them to your favorites!
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              You have {favorites.length} favorite movie{favorites.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {favorites.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;