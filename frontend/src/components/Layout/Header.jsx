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
          <span className="logo-icon">👨‍👩‍👧‍👦</span>
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