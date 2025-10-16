import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, error, get, post, put, delete: del } = useApi();
    const [postData, setPostData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (id) {
            fetchPost(id)
        }
    }, [id])

    const fetchPost = async (postId) => {
        setIsLoading(true)
        try {
            const data = await get(`/posts/${postId}`)
            setPostData(data)
        } catch (error) {
            console.error('Error fetching post:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleLike = async () => {
        if (!postData) return;
        
        try {
            await post(`/posts/${postData.id}/like`, {})
            setPostData(prev => ({
                ...prev,
                is_liked: !prev.is_liked,
                likes_count: prev.is_liked ? prev.likes_count - 1 : prev.likes_count + 1
            }))
        } catch (error) {
            console.error('Error toggling like:', error)
        }
    }

    const handleBack = () => {
        navigate(-1)
    }

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <PostSkeleton />
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Error</h2>
                    <p className="text-red-600 dark:text-red-300">Failed to load post. Please try again.</p>
                    <button 
                        onClick={handleBack}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    if (!postData) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <h2 className="text-lg font-semibold mb-2">Post not found</h2>
                    <p>The post you're looking for doesn't exist or has been removed.</p>
                    <button 
                        onClick={handleBack}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-4">
                <button 
                    onClick={handleBack}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {postData.title}
                    </h1>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{new Date(postData.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
                
                <div className="prose dark:prose-invert max-w-none mb-6">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {postData.content}
                    </p>
                </div>
                
                <div className="flex items-center justify-between border-t dark:border-gray-700 pt-4">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleLike}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                                postData.is_liked 
                                    ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                        >
                            <svg className="w-5 h-5" fill={postData.is_liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{postData.likes_count || 0}</span>
                        </button>
                    </div>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        By {postData.author?.name || 'Unknown'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post 