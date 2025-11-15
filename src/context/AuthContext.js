import React, { createContext, useState, useContext, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { API_URL } from '../config';

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    // Validate token with backend
    const validateToken = async (token) => {
        try {
            // Check if token is expired locally first
            const decodedToken = jwtDecode(token)
            const currentTime = Date.now() / 1000
            
            if (decodedToken.exp && decodedToken.exp < currentTime) {
                // Token is expired
                localStorage.removeItem('token')
                return false
            }

            // Validate token with backend by making an authenticated request
            // Try a common endpoint that requires authentication
            // You can adjust this endpoint based on your backend API
            const response = await axios.get(`${API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).catch(async (error) => {
                // If /auth/me doesn't exist, try /api/metrics or another endpoint
                if (error.response?.status === 404) {
                    // Try alternative endpoint
                    return await axios.get(`${API_URL}/api/metrics`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                }
                throw error
            })

            // If we get here, token is valid
            setUser(decodedToken)
            setIsAuthenticated(true)
            return true
        } catch (error) {
            console.error('Token validation failed:', error)
            // Token is invalid or expired on backend
            localStorage.removeItem('token')
            setUser(null)
            setIsAuthenticated(false)
            return false
        }
    }
    
    useEffect(() => {
        // Check if user is logged in on component mount
        const token = localStorage.getItem('token')
        
        if (token) {
            // Validate token with backend
            validateToken(token).finally(() => {
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [])

    const login = (userData, token) => {
        localStorage.setItem('token', token)
        setUser(userData)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
} 