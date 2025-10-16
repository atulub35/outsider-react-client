import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import Modal from './Modal';

const Search = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { get } = useApi();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({
        posts: [],
        users: []
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        const search = async () => {
            if (!query.trim()) {
                setResults({ posts: [], users: [] });
                return;
            }

            setIsLoading(true);
            try {
                const [postsResponse, usersResponse] = await Promise.all([
                    get(`/posts?query=${encodeURIComponent(query)}`),
                    get(`/users?query=${encodeURIComponent(query)}`)
                ]);
                setResults({
                    posts: postsResponse,
                    users: usersResponse
                });
            } catch (error) {
                console.error('Error searching:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(search, 300);
        return () => clearTimeout(debounceTimer);
    }, [query, get]);

    const handleResultClick = (type, id) => {
        onClose();
        navigate(`/${type}/${id}`);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Search">
            <div className="w-full">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search posts, users..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    autoFocus
                />
                
                {isLoading ? (
                    <div className="mt-4 text-center text-gray-500">Searching...</div>
                ) : (
                    <div className="mt-4 space-y-4">
                        {results.posts.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Posts</h3>
                                <div className="space-y-2">
                                    {results.posts.map(post => (
                                        <button
                                            key={post.id}
                                            onClick={() => handleResultClick('posts', post.id)}
                                            className="w-full text-left p-2 font-bold dark:text-white rounded-lg transition-colors"
                                        >
                                            <div className="font-medium">{post.title}</div>
                                            <div className="text-sm text-gray-500 truncate">{post.content}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {results.users.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Users</h3>
                                <div className="space-y-2">
                                    {results.users.map(user => (
                                        <button
                                            key={user.id}
                                            onClick={() => handleResultClick('users', user.id)}
                                            className="w-full text-left p-2 font-bold dark:text-white rounded-lg transition-colors"
                                        >
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {!isLoading && query && results.posts.length === 0 && results.users.length === 0 && (
                            <div className="text-center text-gray-500">No results found</div>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default Search; 