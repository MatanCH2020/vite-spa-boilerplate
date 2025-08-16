import React from 'react';
import { useParams } from 'react-router-dom';

const AlbumPage = () => {
  const { id } = useParams();

  return (
    <div className="album-page">
      <div className="container">
        <div className="coming-soon">
          <h1>הצגת אלבום</h1>
          <p>עמוד זה בפיתוח - יציג את האלבום המוגמר {id}</p>
          <div className="placeholder-content">
            <div className="feature-preview">
              <h3>תכונות שיהיו זמינות:</h3>
              <ul>
                <li>גלריית תמונות של האלבום המוגמר</li>
                <li>אפשרויות שיתוף ברשתות חברתיות</li>
                <li>הורדה באיכות גבוהה</li>
                <li>יצירת PDF מעוצב לאלבום</li>
                <li>הזמנת הדפסה איכותית</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;