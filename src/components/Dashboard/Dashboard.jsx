import { AuthedUserContext } from '../../App';
import { useContext, useState, useEffect } from 'react';
import * as movieService from '../../services/movieService';
import { Link } from 'react-router-dom';

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://localhost:3000/movies`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    fetchMovies();
  }, []);

  
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>This is the dashboard where you can see a list of your movies.</p>
      <h2>Your Movies:</h2>
      {movies.length ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>{movie.title}</li>
          ))}
        </ul>
      ) : (<p>You haven't added any movies yet.</p>)}
    </main>
  );
};

export default Dashboard;
