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
        const movieData = await movieService.getMovies(user._id); 
        setMovies(movieData);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      fetchMovies();
    } else {
      console.log('User not found');
    }
  }, [user]);


  if (!user) return <p>Loading user data...</p>;
  if (movies.length === 0) return <p>No movies found</p>;

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <h2>Your Movies:</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/search-users">
        <button>Search for Users</button>
      </Link>
      <Link to="/add-movie">
        <button>Add a new Movie</button>
      </Link>
    </main>
  );
};

export default Dashboard;


