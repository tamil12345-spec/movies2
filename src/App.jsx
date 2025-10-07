import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import SearchPage from './pages/SearchPage';
import MovieDetailPage from './pages/MovieDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="App">
          <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center py-4">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                  MovieSearch
                </Link>
                <div className="space-x-4">
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Search
                  </Link>
                  <Link
                    to="/favorites"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Favorites
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/movie/:imdbID" element={<MovieDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;