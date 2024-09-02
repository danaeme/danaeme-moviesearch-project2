const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const searchUsers = async (query) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/search?query=${query}`, {
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

const getUserProfile = async (userId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
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

export { searchUsers, getUserProfile };