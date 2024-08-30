import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as movieService from '../../services/movieService';

const MovieForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    posterURL: '',
    releaseDate: '',
    rating: '',
    review: '',
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await movieService.addMovie(formData);
      navigate('/'); 
    } catch (err) {
      console.error('Error adding movie:', err);
    }
  };

  return (
    <main>
      <h1>Add a New Movie</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
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
            required
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
            required
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
            required
          />
        </div>
        <div>
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </main>
  );
};

export default MovieForm;