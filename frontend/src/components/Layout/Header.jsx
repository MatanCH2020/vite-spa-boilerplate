import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Header = () => {
  const { state, actions } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Family Album Logo">
              <defs>
                <linearGradient id="familyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              {/* Simple family and camera icon */}
              <circle cx="7" cy="5" r="2" fill="url(#familyGradient)" />
              <circle cx="17" cy="5" r="2" fill="url(#familyGradient)" />
              <circle cx="12" cy="5" r="1.5" fill="url(#familyGradient)" />
              <path d="M5 9v8c0 1.1.9 2 2 2h2v-8c0-1.1-.9-2-2-2H5z" fill="url(#familyGradient)" />
              <path d="M15 9v8c0 1.1.9 2 2 2h2v-8c0-1.1-.9-2-2-2h-2z" fill="url(#familyGradient)" />
              <path d="M10 9v8c0 1.1.9 2 2 2h2v-8c0-1.1-.9-2-2-2h-2z" fill="url(#familyGradient)" />
              {/* Camera element */}
              <rect x="3" y="16" width="18" height="5" rx="2" fill="url(#familyGradient)" fillOpacity="0.4" />
              <circle cx="12" cy="18.5" r="1" fill="url(#familyGradient)" />
            </svg>
          </div>
          <span className="logo-text">אלבום משפחתי AI</span>
        </Link>
        
        <nav className="header-nav">
          {state.isAuthenticated ? (
            <div className="auth-nav">
              <span className="welcome-text">
                שלום, {state.user?.name || 'משתמש'}
              </span>
              <button 
                onClick={handleLogout}
                className="logout-btn"
              >
                התנתק
              </button>
            </div>
          ) : (
            <div className="guest-nav">
              <Link to="/login" className="nav-link">התחבר</Link>
              <Link to="/register" className="nav-link primary">הרשם</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;