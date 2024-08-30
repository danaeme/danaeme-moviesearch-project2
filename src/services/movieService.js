const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

export const getMovies = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/movies`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });
    const movies = await res.json();
    if (res.ok) {
      return movies;
    } else {
      throw new Error(movies.error || 'Failed to fetch movies');
    }
  } catch (err) {
    console.error('Error fetching movies:', err);
    throw err;
  }
};

// export { getUserMovies };


export const getMovieById = async (movieId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/movies/${movieId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      const movie = await res.json();
      if (res.ok) {
        return movie;
      } else {
        throw new Error(movie.error || 'Failed to fetch movie details');
      }
    } catch (err) {
      console.error('Error fetching movie details:', err);
      throw err;
    }
};

export const addMovie = async (movieData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(movieData),
      });
  
      if (!res.ok) {
        throw new Error('Failed to add movie');
      }
  
      return await res.json();
    } catch (err) {
      console.error('Error adding movie:', err);
      throw err;
    }
  };