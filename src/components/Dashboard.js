import React from 'react';
import { useAuth } from '../context/AuthContext';
import UsersList from './UsersList';

const Dashboard = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome, {user?.name}!
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="btn btn-primary"
                    >
                        Logout
                    </button>
                </div>
                <div className="mt-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Your Profile</h2>
                    <div className="space-y-2">
                        <p className="text-gray-600">
                            <span className="font-medium">Name:</span> {user?.name}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Email:</span> {user?.email}
                        </p>
                    </div>
                </div>
            </div>
            <UsersList />
        </div>
    );
};

export default Dashboard; 