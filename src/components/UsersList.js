import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>{user.username}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersList;