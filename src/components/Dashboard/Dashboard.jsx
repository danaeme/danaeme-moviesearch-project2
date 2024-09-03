import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as movieService from '../../services/movieService';
import { AuthedUserContext } from '../../App';
import './Dashboard.css';

const Dashboard = () => {
  const { user, setUser } = useContext(AuthedUserContext);  
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

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
    }
  }, [user]);

  const handleSignout = () => {
    setUser(null);
    navigate('/signin'); 
  };

  return (
    <main className="dashboard">
      <div className="header">
        <h1>Welcome to {user.username}'s collection</h1>
      </div>
      <p>Bio: {user.bio || "No bio provided"}</p>
      <p className="flicks">Check out their flicks:</p>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-item">
            <Link to={`/movies/${movie._id}`} className="movie-link">{movie.title}</Link>
            {movie.poster ? (
              <img src={movie.poster} alt={`${movie.title} poster`} className="movie-poster" />
            ) : (
              <p className="placeholder-poster">[Poster]</p>
            )}
          </div>
        ))}
      </div>
      <div className="actions">
        <Link to="/search-users" className="action-link">Search for Users</Link>
        {user._id === user._id && (<Link to="/add-movie" className="action-link">Add new movie</Link>)}
        <button onClick={handleSignout} className="action-link">Sign out</button>
      </div>
    </main>
  );
};

export default Dashboard;


