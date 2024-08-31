const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getMovies = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/movies`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      const movies = await res.json();
      if (res.ok) {
        return movies;
      } else {
        throw new Error(json.err);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
};
  

// export { getUserMovies };


const getMovieById = async (movieId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/movies/${movieId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      const movie = await res.json();
      if (res.ok) {
        return movie;
      } else {
        throw new Error(json.err);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
};

const addMovie = async (movieData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(movieData),
      });
      const movie = await res.json();
      if (res.ok) {
        return movie;
      } else {
        throw new Error(json.err);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
};

const updateMovie = async (movieId, updatedData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/movies/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedData),
      });
      const movie = await res.json();
      if (res.ok) {
        return movie;
      } else {
        throw new Error(json.err);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
};

const deleteMovie = async (movieId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.ok) {
        return { message: 'Movie deleted' };
      } else {
        const error = await res.json();
        throw new Error(json.err);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
};

export { getMovies, getMovieById, addMovie, updateMovie, deleteMovie };