import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as userService from '../../services/userService';
import { useContext } from 'react';
import { AuthedUserContext } from '../../App'; 


const ProfileEditForm = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { setUser } = useContext(AuthedUserContext);
    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        email: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await userService.getUserProfile(userId);
                setFormData({
                    username: profileData.username,
                    bio: profileData.bio || '',
                    email: profileData.email
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, [userId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await userService.updateUser(userId, {
                username: formData.username,
                bio: formData.bio,
                email: formData.email,
            });
                setUser((prevUser) => ({...prevUser,...updatedUser,})
            );
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input 
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Bio:
                    <textarea 
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </main>
    );
};

export default ProfileEditForm;