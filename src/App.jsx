import { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService';
import * as movieService from '../src/services/movieService';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieForm from './components/MovieForm/MovieForm'; 
import CommentForm from './components/CommentForm/CommentForm';
import UserSearch from './components/UserSearch/UserSearch';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ProfileEditForm from './components/ProfileEditForm/ProfileEditForm';


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); 
  const [movies, setMovies] = useState([]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      movieService.getMovies(user._id).then(setMovies);
    }
  }, [user]);

  return (
    <AuthedUserContext.Provider value={{ user, setUser }}>
      <NavBar />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Dashboard user={user} setUser={setUser} />} />
            <Route path="/movies/:movieId" element={<MovieDetails />} />
            <Route path="/add-movie" element={<MovieForm />} /> 
            <Route path="/edit-movie/:movieId" element={<MovieForm />} />
            <Route path="/movies/:movieId/add-comment" element={<CommentForm />} />
            <Route path="/movies/:movieId/comments/:commentId/edit" element={<CommentForm isEdit={true} />} />
            <Route path="/search-users" element={<UserSearch />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users/:userId/dashboard" element={<Dashboard />} />
            <Route path="/profile/:userId/edit" element={<ProfileEditForm />} />
          </>
        ) : (
          <Route path="/" element={<Landing />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;