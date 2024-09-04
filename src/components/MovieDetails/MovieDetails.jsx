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
      navigate(`/profile/${authedUser.user._id}`);
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

  const renderPopcornRating = (rating) => {
    const popcorns = [];
    for (let i = 0; i < rating; i++) {
      popcorns.push(<img src="/images/popcorn_emoji.png" alt="popcorn emoji" key={i} />);
    }
    return popcorns;
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
      <div className="rating-popcorn">
          {renderPopcornRating(movie.rating)}
      </div>      
      <p><strong>Review:</strong> {movie.review}</p>
      <strong>Comments:</strong>
      <ul>
        {movie.comments.length > 0 ? (
          movie.comments.map((comment) => (
            <li key={comment._id}>
              {comment.user.username}: "{comment.comment}"
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
        <button onClick={() => navigate("/dashboard")}>Back</button>
        </div>
       </main>
  );
};

export default MovieDetails;
