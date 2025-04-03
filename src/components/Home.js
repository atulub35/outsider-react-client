import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ApiPerformance from './ApiPerformance';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Welcome to Our Social Platform
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Connect, share, and engage with your community in a whole new way.
                    </p>
                    
                    {!isAuthenticated ? (
                        <div className="space-y-4">
                            <p className="text-lg text-gray-700 mb-6">
                                Join us today and start your journey!
                            </p>
                            <div className="flex justify-center space-x-4">
                                <Link
                                    to="/signup"
                                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 transform hover:scale-105"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-lg text-gray-700 mb-6">
                                Welcome back! Continue your journey with us.
                            </p>
                            <Link
                                to="/dashboard"
                                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    )}

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="text-blue-600 dark:text-blue-400 text-3xl mb-4">🌟</div>
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">Connect</h3>
                            <p className="text-gray-600 dark:text-gray-300">Build meaningful connections with people who share your interests.</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="text-blue-600 dark:text-blue-400 text-3xl mb-4">💬</div>
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">Share</h3>
                            <p className="text-gray-600 dark:text-gray-300">Express yourself and share your thoughts with the community.</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="text-blue-600 dark:text-blue-400 text-3xl mb-4">🚀</div>
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">Grow</h3>
                            <p className="text-gray-600 dark:text-gray-300">Expand your network and discover new opportunities.</p>
                        </div>
                    </div>

                    {/* Tech Stack Section */}
                    <div className="mt-24">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Powered by Modern Technology</h2>
                        
                        {/* Add API Performance Component */}
                        <div className="mb-12">
                            <ApiPerformance />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Frontend Stack */}
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Frontend Stack</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">⚛️</div>
                                        <div class="text-left">
                                            <h4 className="font-medium dark:text-white">React.js</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">Modern UI library for building interactive interfaces</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">🎨</div>
                                        <div class="text-left">
                                            <h4 className="font-medium dark:text-white">Tailwind CSS</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">Utility-first CSS framework for rapid UI development</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">🔄</div>
                                        <div class="text-left">
                                            <h4 className="font-medium dark:text-white">React Router</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">Declarative routing for single-page applications</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Backend Stack */}
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Backend Stack</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">🚀</div>
                                        <div class="text-left">
                                            <h4 className="font-medium dark:text-white">Express.js</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">Fast, unopinionated web framework for Node.js</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">🔐</div>
                                        <div class="text-left">
                                            <h4 className="font-medium dark:text-white">Passport.js + JWT</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">Robust authentication with JWT tokens and Passport strategies</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">🗄️</div>
                                        <div class="text-left">
                                            <h4 className="font-medium dark:text-white">PostgreSQL</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">Powerful, open-source relational database system</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">🔒</div>
                                        <div class="text-left">
                                            <h4 className="font-medium dark:text-white">Bcrypt.js</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">Secure password hashing for user authentication</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Server Features */}
                        <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6">Server Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                                    <h4 className="font-medium dark:text-white mb-2">RESTful API</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Clean, well-structured endpoints for data operations</p>
                                </div>
                                <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                                    <h4 className="font-medium dark:text-white mb-2">Secure Authentication</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">JWT-based authentication with Passport.js strategies</p>
                                </div>
                                <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                                    <h4 className="font-medium dark:text-white mb-2">Database Management</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Efficient PostgreSQL integration with pg driver</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home; 