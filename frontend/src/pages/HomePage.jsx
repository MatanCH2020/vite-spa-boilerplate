import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { familyAPI } from '../services/api';
import './HomePage.css';

const HomePage = () => {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [showCreateFamily, setShowCreateFamily] = useState(false);
  const [familyName, setFamilyName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateFamily = async (e) => {
    e.preventDefault();
    if (!familyName.trim()) return;

    setLoading(true);
    try {
      const response = await familyAPI.create({ name: familyName });
      actions.setCurrentFamily(response.data.family);
      navigate(`/family/${response.data.family.id}`);
    } catch (error) {
      actions.setError('שגיאה ביצירת המשפחה');
    } finally {
      setLoading(false);
    }
  };

  if (!state.isAuthenticated) {
    return (
      <div className="home-page">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              צרו אלבום משפחתי מדהים עם
              <br />
              <span className="gradient-text">בינה מלאכותית</span>
            </h1>
            <p className="hero-description">
              יצרו תמונות משפחתיות מותאמות אישית בסגנונות שונים - 
              פורטרט קלאסי, ציור שמן, קריקטורה ועוד
            </p>
            <div className="hero-actions">
              <Link to="/register" className="cta-button">
                התחל עכשיו בחינם
              </Link>
              <Link to="/login" className="secondary-button">
                כבר יש לי חשבון
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="family-illustration">
              <img 
                src="/logo.png" 
                alt="Family AI Album Logo" 
                className="hero-logo"
                loading="eager"
                decoding="sync"
              />
              <div className="magic-sparkles">✨</div>
            </div>
          </div>
        </div>

        <div className="features-section">
          <div className="container">
            <h2 className="section-title">איך זה עובד?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📸</div>
                <h3>העלאת תמונות</h3>
                <p>העלו 20+ תמונות של כל בן משפחה לקבלת תוצאות מושלמות</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>בחירת סגנון</h3>
                <p>בחרו מתוך מגוון סגנונות - קלאסי, קריקטורה, ציור שמן ועוד</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <h3>עיבוד AI</h3>
                <p>הבינה המלאכותית יוצרת אלבום מותאם אישית למשפחתכם</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💖</div>
                <h3>תוצאה מדהימה</h3>
                <p>קבלו אלבום יפהפה מוכן להדפסה ושיתוף</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page authenticated">
      <div className="container">
        <div className="welcome-section">
          <h1>שלום {state.user?.name}! 👋</h1>
          <p>מוכנים ליצור אלבום משפחתי חדש?</p>
        </div>

        {!showCreateFamily ? (
          <div className="actions-section">
            <button 
              onClick={() => setShowCreateFamily(true)}
              className="create-family-button"
            >
              <span className="button-icon">➕</span>
              צור אלבום משפחתי חדש
            </button>
          </div>
        ) : (
          <div className="create-family-form card">
            <h2>צרו אלבום משפחתי חדש</h2>
            <form onSubmit={handleCreateFamily}>
              <div className="form-group">
                <label htmlFor="familyName">שם האלבום</label>
                <input
                  type="text"
                  id="familyName"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  placeholder="למשל: משפחת כהן 2024"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-actions">
                <button 
                  type="submit" 
                  disabled={loading || !familyName.trim()}
                >
                  {loading ? 'יוצר...' : 'יצירת אלבום'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowCreateFamily(false)}
                  className="secondary-button"
                  disabled={loading}
                >
                  ביטול
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;