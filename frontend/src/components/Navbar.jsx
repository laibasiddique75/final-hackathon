// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-extrabold text-blue-600 hover:text-blue-800 transition duration-300">
              TrackIt
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-blue-600 font-medium text-sm sm:text-base px-4 py-2 rounded-md hover:bg-blue-100 transition duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold text-sm sm:text-base px-4 py-2 rounded-full transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 font-medium text-sm sm:text-base px-4 py-2 rounded-md hover:bg-blue-100 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm sm:text-base px-4 py-2 rounded-full transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
