import React from 'react';
import { useAuth } from '../context/AuthContext';
import UsersList from './UsersList';

const Dashboard = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Welcome, {user?.name}!</h2>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
                    <p className="text-gray-600 dark:text-gray-300">No recent activity to display.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            Create New Post
                        </button>
                        <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                            View All Posts
                        </button>
                    </div>
                </div>
            </div>
            <UsersList />
        </div>
    );
};

export default Dashboard; 