import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as userService from '../../services/userService';
import { AuthedUserContext } from '../../App';

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
        <div>
            <h1>{profile.username}'s Profile</h1>
            {profile.movies.map(movie => (
                <div key={movie._id}>
                    <Link to={`/movies/${movie._id}`}>
                        <h2>{movie.title}</h2>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ProfilePage;