import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Posts from './components/Posts'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './components/Home'

// Auth route wrapper
const AuthRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    // If user is authenticated and tries to access login/signup, redirect to dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" state={{ from: location }} replace />
    }

    return children
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Header />
                    <main>
                        <Routes>
                            <Route
                                path="/login"
                                element={
                                    <AuthRoute>
                                        <Login />
                                    </AuthRoute>
                                }
                            />
                            <Route
                                path="/signup"
                                element={
                                    <AuthRoute>
                                        <SignUp />
                                    </AuthRoute>
                                }
                            />
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/posts"
                                element={
                                    <ProtectedRoute>
                                        <Posts />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
