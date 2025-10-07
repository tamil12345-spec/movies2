import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.imdbID === movie.imdbID);
      if (!exists) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeFavorite = (imdbID) => {
    setFavorites(prev => prev.filter(movie => movie.imdbID !== imdbID));
  };

  const isFavorite = (imdbID) => {
    return favorites.some(movie => movie.imdbID === imdbID);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};