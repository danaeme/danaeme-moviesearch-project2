import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as commentService from '../../services/commentService';

const CommentForm = ({ isEdit = false }) => {
  const { movieId, commentId } = useParams();
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();

  // Load existing data if in edit mode
  useEffect(() => {
    if (isEdit) {
      const fetchComment = async () => {
        try {
          const comment = await commentService.getComment(movieId, commentId);          
          setCommentText(comment.comment);
        } catch (err) {
          console.error(err);
        }
      };

      fetchComment();
    }
  }, [isEdit, movieId, commentId]);

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await commentService.updateComment(movieId, commentId, { comment: commentText });
      } else {
        await commentService.addComment(movieId, { comment: commentText });
      }
      navigate(`/movies/${movieId}`);
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  return (
    <main>
      <h1>{isEdit ? 'Edit' : 'Add'} a Comment</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentText}
          onChange={handleChange}
          placeholder="Let them know what you think..."
          required
        />
        <button type="submit">{isEdit ? 'Update' : 'Post'} Comment</button>
      </form>
    </main>
  );
};

export default CommentForm;