const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

export const getUserMovies = async (userId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/profiles/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //include jwt token
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      const data = await res.json();
      if (res.ok) {
        return data.user.movies; // adjust based on how backend sends the movie data
      } else {
        throw new Error(data.error || 'Error getting movies');
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
};