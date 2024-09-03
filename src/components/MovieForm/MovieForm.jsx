import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as movieService from '../../services/movieService';

const MovieForm = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    posterURL: '',
    releaseDate: '',
    rating: '',
    review: '',
  });
  
  useEffect(() => {
    if (movieId) {
      const fetchMovie = async () => {
        try {
          const movie = await movieService.getMovieById(movieId);
          setFormData({
            title: movie.title,
            posterURL: movie.posterURL,
            releaseDate: movie.releaseDate.slice(0, 10),
            rating: movie.rating,
            review: movie.review
          });
        } catch (err) {
          console.error(err);
        }
      };
      fetchMovie();
    }
  }, [movieId]);

  const handleChange = (m) => {
    setFormData({ ...formData, [m.target.name]: m.target.value });
  };

  const handleSubmit = async (m) => {
    m.preventDefault();
    try {
      if (movieId) {
        await movieService.updateMovie(movieId, formData); 
      } else {
        await movieService.addMovie(formData); 
      }
      navigate('/'); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="posterURL">Poster URL:</label>
        <input
          type="text"
          id="posterURL"
          name="posterURL"
          value={formData.posterURL}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="releaseDate">Release Date:</label>
        <input
          type="date"
          id="releaseDate"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="review">Review:</label>
        <textarea
          id="review"
          name="review"
          value={formData.review}
          onChange={handleChange}
        />
      </div>
     <button type="submit">{movieId ? 'Update Movie' : 'Add Movie'}</button> 
    </form>
  );
};

export default MovieForm;