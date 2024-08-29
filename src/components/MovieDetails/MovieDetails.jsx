import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as movieService from '../../services/movieService';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await movieService.getMovieById(movieId);
        if (movieData) {
          console.log("Fetched movie details:", movieData);
          setMovie(movieData);
        }
      } catch (err) {
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <main>
      <h1>{movie.title}</h1>
      <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Review:</strong> {movie.review}</p>
      <p><strong>Created By:</strong> {movie.createdBy.username}</p>
      <strong>Comments:</strong>
      <ul>
        {movie.comments.map(comment => (
          <li key={comment._id}>{comment.comment}</li>
        ))}
      </ul>
    </main>
  );
};

export default MovieDetails;
