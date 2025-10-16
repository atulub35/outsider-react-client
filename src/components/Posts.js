import React, { useState, useEffect } from 'react'
import { API_URL } from '../config'
import Modal from './Modal'
import useApi from '../hooks/useApi'

const PostSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
        <div className="flex justify-between items-start mb-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="flex space-x-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
            </div>
        </div>
        <div className="space-y-3 mb-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
        <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
        </div>
    </div>
)

const Posts = () => {
    const { loading, error, get, post, put, delete: del } = useApi();
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState({ title: '', content: '' })
    const [editingPost, setEditingPost] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [postToDelete, setPostToDelete] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async (query = '') => {
        setIsLoading(true)
        try {
            const url = query 
                ? `/posts?query=${encodeURIComponent(query)}`
                : '/posts'
            
            const data = await get(url)
            setPosts(data)
        } catch (error) {
            console.error('Error fetching posts:', error)
        } finally {
            setIsLoading(false)
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
            await post('/posts', newPost)
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
            await put(`/posts/${editingPost.id}`, editingPost)
            setEditingPost(null)
            fetchPosts()
        } catch (error) {
            console.error('Error updating post:', error)
        }
    }

    const handleDeletePost = async (postId) => {
        try {
            await del(`/posts/${postId}`)
            setIsDeleteModalOpen(false)
            setPostToDelete(null)
            fetchPosts()
        } catch (error) {
            console.error('Error deleting post:', error)
        }
    }

    const handleLike = async (postId) => {
        try {
            await post(`/posts/${postId}/like`, {})
            updateLikes(postId)

        } catch (error) {
            console.error('Error toggling like:', error)
        }
    }

    const updateLikes = (postId) => {
        setPosts((prev) => prev.map(post => 
        {
            if (post.id === postId) console.log('postId', post.is_liked);
            
            return post.id === postId ? {...post, ...{ is_liked: !post.is_liked }} : post
        }
        ))
    }

    const openDeleteModal = (post) => {
        setPostToDelete(post)
        setIsDeleteModalOpen(true)
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Search Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between">
                    <form onSubmit={handleSearch} className="flex gap-4 flex-1">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search posts by title or content..."
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSearching || loading}
                            className="text-sm px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isSearching ? 'Searching...' : 'Search'}
                        </button>
                    </form>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="ml-4 text-sm px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Content
                        </label>
                        <textarea
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
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
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {loading ? 'Creating...' : 'Create Post'}
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
                {isLoading ? (
                    <>
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                    </>
                ) : posts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        {isSearching ? 'Searching...' : 'No posts found'}
                    </div>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            {editingPost?.id === post.id ? (
                                // Edit Form
                                <form onSubmit={handleUpdatePost}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={editingPost.title}
                                            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                            Content
                                        </label>
                                        <textarea
                                            value={editingPost.content}
                                            onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                            rows="4"
                                            required
                                        />
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            {loading ? 'Saving...' : 'Save'}
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
                                        <h3 className="text-xl font-bold dark:text-white">{post.title}</h3>
                                        <div className="flex space-x-2">
                                            {(
                                                <>
                                                    <button
                                                        onClick={() => setEditingPost(post)}
                                                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(post)}
                                                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>
                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span>By {post.author_name}</span>
                                        <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleLike(post.id)}
                                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                                                post.is_liked 
                                                    ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            <svg className="w-5 h-5" fill={post.is_liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
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