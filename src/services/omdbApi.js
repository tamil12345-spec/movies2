const API_KEY = '189a8481'; 
const BASE_URL = 'https://www.omdbapi.com/';


export const searchMovies = async (query, page = 1, type = '') => {
  try {
    const params = new URLSearchParams({
      apikey: API_KEY,
      s: query,
      page: page.toString(),
    });
    
    if (type) {
      params.append('type', type);
    }

    const response = await fetch(`${BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getMovieDetails = async (imdbID) => {
  try {
    const params = new URLSearchParams({
      apikey: API_KEY,
      i: imdbID,
      plot: 'full'
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Movie not found');
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};