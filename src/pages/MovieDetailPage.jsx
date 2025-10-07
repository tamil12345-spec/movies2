import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../services/omdbApi';
import { useFavorites } from '../context/FavoritesContext';

const MovieDetailPage = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(imdbID);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const movieData = await getMovieDetails(imdbID);
        setMovie(movieData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(imdbID);
    } else {
      addFavorite(movie);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-700 text-lg mb-4">{error}</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Search
          </Link>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Movie not found</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Search
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-poster.jpg'}
                alt={movie.Title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{movie.Title}</h1>
                <button
                  onClick={handleFavoriteClick}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    favorite
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`}
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
                  <span>{favorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-700">Year</h3>
                  <p className="text-gray-600">{movie.Year}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Rated</h3>
                  <p className="text-gray-600">{movie.Rated}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Released</h3>
                  <p className="text-gray-600">{movie.Released}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Runtime</h3>
                  <p className="text-gray-600">{movie.Runtime}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Genre</h3>
                  <p className="text-gray-600">{movie.Genre}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Type</h3>
                  <p className="text-gray-600 capitalize">{movie.Type}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Plot</h3>
                <p className="text-gray-600 leading-relaxed">{movie.Plot}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Director</h3>
                <p className="text-gray-600">{movie.Director}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Cast</h3>
                <p className="text-gray-600">{movie.Actors}</p>
              </div>

              {movie.Ratings && movie.Ratings.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Ratings</h3>
                  <div className="space-y-2">
                    {movie.Ratings.map((rating, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <span className="font-medium text-gray-700 min-w-[100px]">
                          {rating.Source}:
                        </span>
                        <span className="text-gray-600">{rating.Value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">IMDb Rating</h3>
                <p className="text-gray-600">{movie.imdbRating}/10 ({movie.imdbVotes} votes)</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Box Office</h3>
                <p className="text-gray-600">{movie.BoxOffice || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;