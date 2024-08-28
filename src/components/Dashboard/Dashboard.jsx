import { AuthedUserContext } from '../../App';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as movieService from '../../services/movieService';


const Dashboard = ({ movies }) => {
  const user = useContext(AuthedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await movieService.getMovies();
        console.log("Fetched movies:", movieData); // debug: log fetched movies
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false); // loading set to false after data is fetched
      }
    };
  
    fetchMovies();
  }, []);

  return (
    <main>
      <h1>Welcome, {user ? user.username : 'Guest'}</h1>
      <p>This is the dashboard where you can see a list of your movies.</p>
      <h2>Your Movies:</h2>
      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>
              <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't added any movies yet.</p>
      )}
    </main>
  );
};

export default Dashboard;