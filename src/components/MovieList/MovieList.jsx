import { Link, useNavigate } from 'react-router-dom';

const MovieList = ({ movies }) => {
    const navigate = useNavigate();
  
    const handleMovieClick = (movie) => {
      navigate(`/movies/${movie._id}`);
    };
  
    return (
      <main>
        <h1>Your Movies:</h1>
        <ul>
          {movies.map((movie) => (
            <li key={movie._id} onClick={() => handleMovieClick(movie)}>
              {movie.title}
            </li>
          ))}
        </ul>
      </main>
    );
  };
  
  export default MovieList;