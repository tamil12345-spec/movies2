import React, { useState, useEffect } from 'react';
import { searchMovies } from '../services/omdbApi';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const performSearch = async (searchQuery, page = 1, movieType = type) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const data = await searchMovies(searchQuery, page, movieType);
      setMovies(data.Search || []);
      setTotalResults(parseInt(data.totalResults) || 0);
      setTotalPages(Math.ceil((parseInt(data.totalResults) || 0) / 10));
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
      setMovies([]);
      setTotalPages(0);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1);
    performSearch(searchQuery, 1, type);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    if (query) {
      setCurrentPage(1);
      performSearch(query, 1, newType);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    performSearch(query, page, type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Movie Search
        </h1>
        
        <SearchBar onSearch={handleSearch} initialQuery={query} />
        <FilterDropdown selectedType={type} onTypeChange={handleTypeChange} />

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Searching movies...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <>
            <div className="mb-4 text-gray-600">
              Found {totalResults} results for "{query}"
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {!loading && !error && query && movies.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">No movies found for "{query}"</p>
          </div>
        )}

        {!loading && !error && !query && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">Enter a movie title to start searching</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;