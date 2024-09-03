import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import * as movieService from '../../services/movieService';
import * as commentService from '../../services/commentService';
import { AuthedUserContext } from '../../App';
import './MovieDetails.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const authedUser = useContext(AuthedUserContext);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await movieService.getMovieById(movieId);
        setMovie(movieData);
      } catch (err) {
        setErrorMessage('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleDelete = async () => {
    try {
      await movieService.deleteMovie(movieId);
      navigate('/');
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentService.deleteComment(movie._id, commentId);
      const updatedMovie = await movieService.getMovieById(movie._id);
      setMovie(updatedMovie); 
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;
  if (!movie) return <p>No movie data available.</p>;
  if (!authedUser) return <p>User not authenticated.</p>;

  return (
  <main className="movie-details">
    <div className="movie-poster-container">
      {movie.posterURL ? (
        <img src={movie.posterURL} alt={`${movie.title} poster`} className="movie-poster" />
      ) : (
        <p>[Poster]</p>
      )}
    </div>
    <div className="movie-info">
      <h1>{movie.title}</h1>
      <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Review:</strong> {movie.review}</p>
      <p><strong>Created By:</strong> {movie.createdBy.username}</p>
      <strong>Comments:</strong>
      <ul>
        {movie.comments.length > 0 ? (
          movie.comments.map((comment) => (
            <li key={comment._id}>
              {comment.user.username}: "{comment.comment}"
              {/* Only show edit/delete for the user's own comments */}
              {authedUser && comment.user && comment.user._id === authedUser.user._id && (
                <>
                  <button onClick={() => navigate(`/movies/${movieId}/comments/${comment._id}/edit`)} style={{ marginLeft: '10px' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteComment(comment._id)} style={{ marginLeft: '10px' }}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <li>No comments available</li>
        )}
      </ul>
      {movie.createdBy._id === authedUser.user._id && (
        <>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => navigate(`/edit-movie/${movieId}`)}>Edit</button>
        </>
      )}
        <button onClick={() => navigate(`/movies/${movieId}/add-comment`)}>Add a Comment</button>
      </div>
      <div className="movie-actions">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </main>
  );
};

export default MovieDetails;
