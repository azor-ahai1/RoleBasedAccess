import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser  } from '../../store/authSlice'; // Import the selector
import logo from '../../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(selectUser ); // Get the current user from the store

  return (
    <header className="bg-gradient-primary text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img 
            src={logo} 
            alt="VRV Security Logo" 
            className="h-12 w-12 rounded-full transition-transform transform hover:scale-110"
          />
          <h1 className="text-2xl font-bold tracking-wider">RBAC Dashboard</h1>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className={`${
          isMenuOpen ? 'block' : 'hidden'} 
          md:block absolute md:relative 
          top-full left-0 md:top-auto md:left-auto 
          w-full md:w-auto bg-dark-primary md:bg-transparent
        `}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0">
            {[
              { to: '/', label: 'Home' },
              { to: '/users', label: 'Users' },
              { to: '/roles', label: 'Roles' },
              { to: '/permissions', label: 'Permissions' },
            ].map((link) => (
              <li key={link.to}>
                <Link 
                  to={link.to} 
                  className="block md:inline-block 
                    text-white hover:text-yellow-300 text-lg 
                    transition-colors duration-200 ease-in-out py-2 md:py-0 
                    border-b md:border-b-0 mx-2
                    border-transparent hover:border-yellow-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Login Option */}
            {!user && ( // Show login button only if there is no user
              <li>
                <Link 
                  to="/login" 
                  className="bg-light-blue text-gray-800 py-2 px-4 rounded-md transition-colors duration-200 ease-in-out hover:bg-yellow-300"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;