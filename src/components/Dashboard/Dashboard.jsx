import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as movieService from '../../services/movieService';
import * as userService from '../../services/userService'; 
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

  const handleDeleteUser = async () => {
    try {
      await userService.deleteUser(user._id);
      setUser(null); 
      navigate('/signin');
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  return (
    <main className="dashboard">
      <div className="header">
        <h1>{user.username}'s Anthology</h1>
      </div>
      <p> {user.bio || "No bio provided"}</p>
      <p className="flicks">What do you want to show off?:</p>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-item">
            <Link to={`/movies/${movie._id}`} className="movie-link">{movie.title}</Link>
            {movie.posterURL ? (
                <img src={movie.posterURL} alt={`${movie.title} poster`} className="movie-poster" />
              ) : (
                <p>[Poster]</p>
              )}
          </div>
        ))}
      </div>
      <div className="actions">
        <Link to="/search-users" className="action-link">Search for Users</Link>
        {user && (<Link to="/add-movie" className="action-link">Add new movie</Link>)}
        <button onClick={handleSignout} className="action-link">Sign out</button>
      </div>
      <div className="profile-actions">
        <button onClick={() => navigate(`/profile/${user._id}/edit`)} className="action-link">Edit Profile</button>
        <button onClick={handleDeleteUser} className="delete-button">Delete Profile</button>
      </div>
    </main>
  );
};

export default Dashboard;


