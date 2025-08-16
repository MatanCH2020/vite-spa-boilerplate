import React from 'react';
import { useParams } from 'react-router-dom';

const UploadPage = () => {
  const { familyId } = useParams();

  return (
    <div className="upload-page">
      <div className="container">
        <div className="coming-soon">
          <h1>העלאת תמונות</h1>
          <p>עמוד זה בפיתוח - יאפשר העלאת תמונות למשפחה {familyId}</p>
          <div className="placeholder-content">
            <div className="feature-preview">
              <h3>תכונות שיהיו זמינות:</h3>
              <ul>
                <li>העלאת תמונות בגרירה ושחרור</li>
                <li>תמיכה בפורמטים שונים (JPG, PNG, HEIC)</li>
                <li>בדיקת איכות תמונות אוטומטית</li>
                <li>עיבוד וניתוח תמונות עם AI</li>
                <li>מעקב אחר התקדמות ההעלאה</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;