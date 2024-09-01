const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const addComment = async (movieId, commentData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/movies/${movieId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(commentData),
    });

    if (!res.ok) {
      const error = await res.json(); 
      throw new Error(error.error); 
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getComments = async (movieId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/movies/${movieId}/comments`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!res.ok) {
      const error = await res.json(); 
      throw new Error(error.error); 
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateComment = async (movieId, commentId, commentData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/movies/${movieId}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(commentData),
    });

    if (!res.ok) {
      const error = await res.json(); 
      throw new Error(error.error); 
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteComment = async (movieId, commentId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/movies/${movieId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!res.ok) {
      const error = await res.json(); 
      throw new Error(error.error); 
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { addComment, getComments, updateComment, deleteComment };