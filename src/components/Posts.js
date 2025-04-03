import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import Modal from './Modal'

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState({ title: '', content: '' })
    const [editingPost, setEditingPost] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [postToDelete, setPostToDelete] = useState(null)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async (query = '') => {
        try {
            const url = query 
                ? `${API_URL}/posts?query=${encodeURIComponent(query)}`
                : `${API_URL}/posts`
            
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setPosts(response.data)
        } catch (error) {
            console.error('Error fetching posts:', error)
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        setIsSearching(true)
        try {
            await fetchPosts(searchQuery)
        } catch (error) {
            console.error('Error searching posts:', error)
        } finally {
            setIsSearching(false)
        }
    }

    const handleCreatePost = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${API_URL}/posts`, newPost, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setNewPost({ title: '', content: '' })
            setIsCreateModalOpen(false)
            fetchPosts(searchQuery)
        } catch (error) {
            console.error('Error creating post:', error)
        }
    }

    const handleUpdatePost = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${API_URL}/posts/${editingPost.id}`, editingPost, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setEditingPost(null)
            fetchPosts()
        } catch (error) {
            console.error('Error updating post:', error)
        }
    }

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`${API_URL}/posts/${postId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setIsDeleteModalOpen(false)
            setPostToDelete(null)
            fetchPosts()
        } catch (error) {
            console.error('Error deleting post:', error)
        }
    }

    const handleLike = async (postId) => {
        try {
            await axios.post(`${API_URL}/posts/${postId}/like`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            fetchPosts()
        } catch (error) {
            console.error('Error toggling like:', error)
        }
    }

    const openDeleteModal = (post) => {
        setPostToDelete(post)
        setIsDeleteModalOpen(true)
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center">
                    <form onSubmit={handleSearch} className="flex gap-4 flex-1">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search posts by title or content..."
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isSearching ? 'Searching...' : 'Search'}
                        </button>
                    </form>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="ml-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Create Post
                    </button>
                </div>
            </div>

            {/* Create Post Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create New Post"
            >
                <form onSubmit={handleCreatePost}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Content
                        </label>
                        <textarea
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsCreateModalOpen(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Create Post
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false)
                    setPostToDelete(null)
                }}
                title="Delete Post"
                type="confirm"
                onConfirm={() => handleDeletePost(postToDelete?.id)}
                confirmText="Delete"
            >
                <div className="text-center">
                    <p className="text-gray-700">
                        Are you sure you want to delete the post "{postToDelete?.title}"?
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        This action cannot be undone.
                    </p>
                </div>
            </Modal>

            {/* Posts List */}
            <div className="space-y-6">
                {posts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        {isSearching ? 'Searching...' : 'No posts found'}
                    </div>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                            {editingPost?.id === post.id ? (
                                // Edit Form
                                <form onSubmit={handleUpdatePost}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={editingPost.title}
                                            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Content
                                        </label>
                                        <textarea
                                            value={editingPost.content}
                                            onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            rows="4"
                                            required
                                        />
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            type="submit"
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditingPost(null)}
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                // Post Display
                                <>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold">{post.title}</h3>
                                        <div className="flex space-x-2">
                                            {(
                                                <>
                                                    <button
                                                        onClick={() => setEditingPost(post)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(post)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4">{post.content}</p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>By {post.author_name}</span>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleLike(post.id)}
                                                className={`flex items-center space-x-1 ${
                                                    post.is_liked ? 'text-red-500' : 'text-gray-500'
                                                }`}
                                            >
                                                <span>❤️</span>
                                                <span>{post.likes_count}</span>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Posts 