import React, { createContext, useState, useContext, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    useEffect(() => {
        // Check if user is logged in on component mount
        const token = localStorage.getItem('token')
        console.log('token found', token)
        
        if (token) {
            try {
                const decodedToken = jwtDecode(token)
                setUser(decodedToken)
                setIsAuthenticated(true)
            } catch (error) {
                console.error('Error decoding token:', error)
                // If token is invalid, clear it
                localStorage.removeItem('token')
            }
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
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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