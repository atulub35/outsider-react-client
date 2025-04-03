import React, { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';

const UsersList = () => {
    const { loading, error, get } = useApi();
    console.log('loading in users list', loading);
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await get('/users');
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [get]);

    if (loading) {
        return (
            <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg p-6"
                        >
                            <div className="space-y-4">
                                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                <div className="flex items-center space-x-4">
                                    <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }

    return (
        <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">All Users</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                    >
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersList; 