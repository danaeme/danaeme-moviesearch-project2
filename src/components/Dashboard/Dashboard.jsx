import { useEffect, useState, useContext } from 'react';
import { AuthedUserContext } from '../../App';
import * as movieService from '../../services/movieService'; 
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = useContext(AuthedUserContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await movieService.getMovies(); 
        setMovies(movieData);
      } catch (err) {
        console.error(err);
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
          <li key={movie._id}>
            <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/add-movie">Add a new Movie</Link>
    </main>
  );
};

export default Dashboard;


