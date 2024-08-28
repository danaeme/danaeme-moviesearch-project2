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


// export const getMovieDetails = async (movieId) => {
//   try {
//     const res = await fetch(`${BACKEND_URL}/movies/${movieId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     });

//     if (!res.ok) {
//       throw new Error('Failed to fetch movie details');
//     }

//     const data = await res.json();

//     if (data && data._id) {
//       return data; // Return the movie details
//     } else {
//       throw new Error('Movie data is not structured as expected');
//     }
//   } catch (err) {
//     console.error('Error fetching movie details:', err);
//     throw err;
//   }
// };
