import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import Search from './Search'

const Header = () => {
    const { isAuthenticated, logout } = useAuth()
    const { isDarkMode, toggleTheme } = useTheme()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setIsSearchOpen(true)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <header className="sticky top-0 z-40 flex h-16 justify-between border-b bg-white px-4 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex w-full select-none flex-row items-center">
                {/* Logo and Brand */}
                <div className="flex flex-shrink-0 flex-row items-center gap-2">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex flex-row items-center gap-2">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <div className="text-lg font-semibold dark:text-white">Outsider</div>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="ml-auto md:hidden">
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex w-full justify-end md:justify-start md:pl-6">
                    <nav className="relative z-10 flex max-w-max flex-1 items-center justify-center">
                        <ul className="flex flex-1 items-center justify-center gap-6">
                            <li>
                                <NavLink 
                                    to="/" 
                                    className={({ isActive }) => 
                                        `text-sm transition-colors duration-200 ${
                                            isActive 
                                                ? 'text-primary-600 font-medium dark:text-primary-400' 
                                                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                        }`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            {!isAuthenticated ? (
                                <>
                                    <li>
                                        <NavLink 
                                            to="/login" 
                                            className={({ isActive }) => 
                                                `text-sm transition-colors duration-200 ${
                                                    isActive 
                                                        ? 'text-primary-600 font-medium dark:text-primary-400' 
                                                        : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                                }`
                                            }
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/signup" 
                                            className={({ isActive }) => 
                                                `text-sm transition-colors duration-200 ${
                                                    isActive 
                                                        ? 'text-primary-600 font-medium dark:text-primary-400' 
                                                        : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                                }`
                                            }
                                        >
                                            Sign Up
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink 
                                            to="/dashboard" 
                                            className={({ isActive }) => 
                                                `text-sm transition-colors duration-200 ${
                                                    isActive 
                                                        ? 'text-primary-600 font-medium dark:text-primary-400' 
                                                        : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                                }`
                                            }
                                        >
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/posts" 
                                            className={({ isActive }) => 
                                                `text-sm transition-colors duration-200 ${
                                                    isActive 
                                                        ? 'text-primary-600 font-medium dark:text-primary-400' 
                                                        : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                                }`
                                            }
                                        >
                                            Posts
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>

                {/* Right Side Actions */}
                <div className="hidden items-center gap-2 md:flex">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        aria-label="Search…"
                    >
                        <div className="flex gap-2">
                            <span>Search…</span>
                            <span className="inline-flex items-center justify-center rounded border border-gray-200">
                                <kbd className="flex h-5 min-h-5 w-fit items-center px-1 py-0 text-center text-xs">
                                    <span>⌘</span>
                                    <span>K</span>
                                </kbd>
                            </span>
                        </div>
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                    <button
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        type="button"
                        aria-label="Open feedback form"
                    >
                        Feedback
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute inset-x-0 top-16 z-50 bg-white shadow-lg dark:bg-gray-900 dark:border-gray-700 md:hidden">
                    <div className="px-4 py-3">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `block py-2 text-sm transition-colors duration-200 ${
                                    isActive 
                                        ? 'text-primary-600 font-medium dark:text-primary-400' 
                                        : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        {!isAuthenticated ? (
                            <>
                                <NavLink 
                                    to="/login" 
                                    className={({ isActive }) => 
                                        `block py-2 text-sm transition-colors duration-200 ${
                                            isActive 
                                                ? 'text-primary-600 font-medium dark:text-primary-400' 
                                                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                        }`
                                    }
                                >
                                    Login
                                </NavLink>
                                <NavLink 
                                    to="/signup" 
                                    className={({ isActive }) => 
                                        `block py-2 text-sm transition-colors duration-200 ${
                                            isActive 
                                                ? 'text-primary-600 font-medium dark:text-primary-400' 
                                                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                        }`
                                    }
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink 
                                    to="/dashboard" 
                                    className={({ isActive }) => 
                                        `block py-2 text-sm transition-colors duration-200 ${
                                            isActive 
                                                ? 'text-primary-600 font-medium dark:text-primary-400' 
                                                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                        }`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink 
                                    to="/posts" 
                                    className={({ isActive }) => 
                                        `block py-2 text-sm transition-colors duration-200 ${
                                            isActive 
                                                ? 'text-primary-600 font-medium dark:text-primary-400' 
                                                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                        }`
                                    }
                                >
                                    Posts
                                </NavLink>
                                <button
                                    onClick={logout}
                                    className="block w-full py-2 text-left text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Search Modal */}
            <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </header>
    )
}

export default Header 