import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as movieService from '../../services/movieService';
import * as commentService from '../../services/commentService';
import { Link } from 'react-router-dom';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await movieService.getMovieById(movieId);
        if (movieData) {
          console.log(movieData);
          setMovie(movieData);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false); 
    };

    fetchMovie();
  }, [movieId]);

  const handleDelete = async () => {
      try {
        await movieService.deleteMovie(movieId);
        navigate('/'); 
      } catch (err) {
        console.error(err);
      }
  };

  if (!movie) return <p>Movie not found</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <main>
      <h1>{movie.title}</h1>
      <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Review:</strong> {movie.review}</p>
      <p><strong>Created By:</strong> {movie.createdBy.username}</p>
      <strong>Comments:</strong>
      <ul>
        {movie.comments.length > 0 ? (
          movie.comments.map(comment => (
            <li key={comment._id}>
              {comment.user.username}: "{comment.comment}"
            </li>
          ))) : (<li>No comments available</li>)}
      </ul>
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/edit-movie/${movieId}`}>
        <button>Edit</button>
      </Link>
      <Link to={`/movies/${movieId}/add-comment`}>
        <button>Add a Comment</button>
      </Link>
    </main>
  );
};

export default MovieDetails;
