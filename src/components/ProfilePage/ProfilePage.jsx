import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as userService from '../../services/userService';
import { AuthedUserContext } from '../../App';
import '../Dashboard/Dashboard.css';

const ProfilePage = (props) => {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const authedUser = useContext(AuthedUserContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await userService.getUserProfile(userId);
                setProfile(profileData);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, [userId]);

    if (!profile) return <p>Loading...</p>;

    return (
        <main className="dashboard">
          <h1>{profile.username}'s Profile</h1>
          <p>Bio: {profile.bio || "No bio provided"}</p>
          <div className="movie-grid">
            {profile.movies && profile.movies.length > 0 ? (
              profile.movies.map((movie) => (
                <div key={movie._id} className="movie-item">
                  <Link to={`/movies/${movie._id}`} className="movie-link">
                    <h3>{movie.title}</h3>
                  </Link>
                  {movie.poster ? (
                    <img src={movie.poster} alt={`${movie.title} poster`} />
                  ) : (
                    <p>[Poster]</p>
                  )}
                </div>
              ))
            ) : (
              <p>No movies to display</p>
            )}
          </div>
          <button onClick={() => props.history.goBack()}>Back</button>
        </main>
      );
};

export default ProfilePage;