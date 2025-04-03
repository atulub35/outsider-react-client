import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
    const { isAuthenticated, logout } = useAuth()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-40 flex h-16 justify-between border-b bg-white px-4 dark:bg-gray-900">
            <div className="flex w-full select-none flex-row items-center">
                {/* Logo and Brand */}
                <div className="flex flex-shrink-0 flex-row items-center gap-2">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex flex-row items-center gap-2">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <div className="text-lg font-semibold">YourApp</div>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="ml-auto md:hidden">
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:text-gray-300"
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
                                <Link to="/" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                    Home
                                </Link>
                            </li>
                            {!isAuthenticated ? (
                                <>
                                    <li>
                                        <Link to="/login" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/signup" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/dashboard" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/posts" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                            Posts
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={logout}
                                            className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>

                {/* Right Side Actions */}
                <div className="hidden items-center gap-2 md:flex">
                    <button
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
                <div className="absolute inset-x-0 top-16 z-50 bg-white shadow-lg dark:bg-gray-900 md:hidden">
                    <div className="px-4 py-3">
                        <Link to="/" className="block py-2 text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                            Home
                        </Link>
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="block py-2 text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                    Login
                                </Link>
                                <Link to="/signup" className="block py-2 text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard" className="block py-2 text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                    Dashboard
                                </Link>
                                <Link to="/posts" className="block py-2 text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                    Posts
                                </Link>
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
        </header>
    )
}

export default Header 