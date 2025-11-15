import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UsersList from './UsersList';

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Welcome, {user?.name}!</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
                    <p className="text-gray-600 dark:text-gray-300">No recent activity to display.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
                    <div className="space-x-4">
                        <NavLink 
                            to="/posts" 
                            className="text-sm w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            View All Posts
                        </NavLink>
                    </div>
                </div>
            </div>
            <UsersList />
        </div>
    );
};

export default Dashboard; 