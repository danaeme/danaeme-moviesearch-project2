import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as userService from '../../services/userService';
import { AuthedUserContext } from '../../App';

const ProfilePage = () => {
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
        <div>
            <h1>{profile.username}'s Profile</h1>
            {profile.movies?.length > 0 ? (
                profile.movies.map(movie => (
                    <div key={movie._id}>
                        <h2>
                            <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                        </h2>
                        {movie.posterURL && (
                            <img 
                                src={movie.posterURL} 
                                alt={`${movie.title} poster`} 
                                style={{ maxWidth: '200px', height: 'auto' }} 
                            />
                        )}
                    </div>
                ))
            ) : (
                <p>No movies found</p>
            )}
        </div>
    );
};

export default ProfilePage;