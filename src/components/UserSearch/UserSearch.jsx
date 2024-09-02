import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as userService from '../../services/userService';

const UserSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const users = await userService.searchUsers(query);
            setResults(users);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users..."
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map(user => (
                    <li key={user._id}>
                        <a href={`/profile/${user._id}`}>{user.username}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserSearch;