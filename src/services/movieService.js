const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

export const getMovies = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await res.json();
    return data; // movies are returned as an array
  } catch (err) {
    console.error('Error fetching movies:', err);
    throw err;
  }
};

// get the details of a specific movie by  ID
export const getMovieDetails = async (movieId) => {
    try {
        const res = await fetch(`${BACKEND_URL}/movies/${movieId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch movie details: ${res.statusText}`);
        }

        const data = await res.json();
        if (data && data._id) {
            return data;
        } else {
            console.error('Unexpected response structure:', data);
            return null;
        }
    } catch (err) {
        console.error('Error fetching movie details:', err);
        return null;
    }
};