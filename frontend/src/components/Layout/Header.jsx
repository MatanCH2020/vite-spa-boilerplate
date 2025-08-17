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
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Family AI Album Logo">
              <defs>
                <linearGradient id="aperture1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="aperture2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#065f46" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#84cc16" />
                </linearGradient>
                <linearGradient id="aperture3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c2d12" />
                  <stop offset="50%" stopColor="#ea580c" />
                  <stop offset="100%" stopColor="#facc15" />
                </linearGradient>
                <linearGradient id="familyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#84cc16" />
                </linearGradient>
              </defs>
              
              {/* Outer camera aperture ring */}
              <circle cx="200" cy="200" r="190" fill="none" stroke="#f3f4f6" strokeWidth="8"/>
              
              {/* Camera aperture blades */}
              <g transform="translate(200,200)">
                {/* Blade 1 */}
                <path d="M0,0 L120,-70 A140,140 0 0,1 140,0 L80,0 Z" fill="url(#aperture1)" transform="rotate(0)"/>
                {/* Blade 2 */}
                <path d="M0,0 L120,-70 A140,140 0 0,1 140,0 L80,0 Z" fill="url(#aperture2)" transform="rotate(51.4)"/>
                {/* Blade 3 */}
                <path d="M0,0 L120,-70 A140,140 0 0,1 140,0 L80,0 Z" fill="url(#aperture1)" transform="rotate(102.8)"/>
                {/* Blade 4 */}
                <path d="M0,0 L120,-70 A140,140 0 0,1 140,0 L80,0 Z" fill="url(#aperture3)" transform="rotate(154.2)"/>
                {/* Blade 5 */}
                <path d="M0,0 L120,-70 A140,140 0 0,1 140,0 L80,0 Z" fill="url(#aperture2)" transform="rotate(205.6)"/>
                {/* Blade 6 */}
                <path d="M0,0 L120,-70 A140,140 0 0,1 140,0 L80,0 Z" fill="url(#aperture1)" transform="rotate(257)"/>
                {/* Blade 7 */}
                <path d="M0,0 L120,-70 A140,140 0 0,1 140,0 L80,0 Z" fill="url(#aperture3)" transform="rotate(308.4)"/>
              </g>
              
              {/* Inner circle - black background for family */}
              <circle cx="200" cy="200" r="80" fill="#000000"/>
              
              {/* AI Family figures with network effect */}
              <g transform="translate(200,200)">
                {/* Parent 1 - geometric network style */}
                <g transform="translate(-30,-10)">
                  <circle cx="0" cy="-20" r="8" fill="url(#familyGlow)" opacity="0.8"/>
                  <path d="M-8,0 L8,0 L6,25 L-6,25 Z" fill="url(#familyGlow)" opacity="0.6"/>
                  <g stroke="url(#familyGlow)" strokeWidth="1" opacity="0.4">
                    <line x1="0" y1="-12" x2="15" y2="-15"/>
                    <line x1="0" y1="5" x2="20" y2="10"/>
                    <line x1="0" y1="15" x2="10" y2="30"/>
                  </g>
                </g>
                
                {/* Parent 2 - geometric network style */}
                <g transform="translate(30,-10)">
                  <circle cx="0" cy="-20" r="8" fill="url(#familyGlow)" opacity="0.8"/>
                  <path d="M-8,0 L8,0 L6,25 L-6,25 Z" fill="url(#familyGlow)" opacity="0.6"/>
                  <g stroke="url(#familyGlow)" strokeWidth="1" opacity="0.4">
                    <line x1="0" y1="-12" x2="-15" y2="-15"/>
                    <line x1="0" y1="5" x2="-20" y2="10"/>
                    <line x1="0" y1="15" x2="-10" y2="30"/>
                  </g>
                </g>
                
                {/* Child - geometric network style */}
                <g transform="translate(0,15)">
                  <circle cx="0" cy="-15" r="6" fill="url(#familyGlow)" opacity="0.9"/>
                  <path d="M-6,0 L6,0 L5,20 L-5,20 Z" fill="url(#familyGlow)" opacity="0.7"/>
                  <g stroke="url(#familyGlow)" strokeWidth="1" opacity="0.5">
                    <line x1="0" y1="-9" x2="-25" y2="-20"/>
                    <line x1="0" y1="-9" x2="25" y2="-20"/>
                    <line x1="0" y1="10" x2="0" y2="25"/>
                  </g>
                </g>
                
                {/* AI Network connections */}
                <g stroke="url(#familyGlow)" strokeWidth="0.5" opacity="0.3">
                  <line x1="-30" y1="-30" x2="30" y2="-30"/>
                  <line x1="-20" y1="-10" x2="20" y2="-10"/>
                  <line x1="-30" y1="0" x2="0" y2="0"/>
                  <line x1="30" y1="0" x2="0" y2="0"/>
                </g>
                
                {/* Small AI dots */}
                <circle cx="-45" cy="-25" r="1.5" fill="#22d3ee" opacity="0.6"/>
                <circle cx="45" cy="-25" r="1.5" fill="#10b981" opacity="0.6"/>
                <circle cx="0" cy="40" r="1.5" fill="#84cc16" opacity="0.6"/>
                <circle cx="-35" cy="20" r="1" fill="#22d3ee" opacity="0.4"/>
                <circle cx="35" cy="20" r="1" fill="#10b981" opacity="0.4"/>
              </g>
              
              {/* Inner aperture ring */}
              <circle cx="200" cy="200" r="85" fill="none" stroke="#374151" strokeWidth="2" opacity="0.5"/>
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