import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as commentService from '../../services/commentService';

const CommentForm = () => {
  const { movieId } = useParams();
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await commentService.addComment(movieId, { comment: commentText });
      navigate(`/movies/${movieId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <h1>Add a Comment</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentText}
          onChange={handleChange}
          placeholder="Let them know what you think..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>
    </main>
  );
};

export default CommentForm;