import { useEffect, useState, useContext } from 'react';
import { AuthedUserContext } from '../../App';
import * as movieService from '../../services/movieService'; 

const Dashboard = () => {
  const user = useContext(AuthedUserContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await movieService.getMovies(); 
        setMovies(movieData);
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    if (user) {
      fetchMovies();
    }
  }, [user]);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>Your Movies:</p>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;


