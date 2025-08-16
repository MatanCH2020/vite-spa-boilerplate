# 🎨 אלבום משפחתי AI - AI Family Photo Album

> יצירת אלבומי משפחה מותאמים אישית עם בינה מלאכותית

## 📋 תיאור הפרויקט

אפליקציית ווב ליצירת אלבומי תמונות משפחתיים מדהימים בעזרת בינה מלאכותית. המשתמשים יכולים להעלות תמונות של בני המשפחה שלהם ולקבל אלבום מעוצב בסגנונות שונים כמו פורטרט קלאסי, ציור שמן, קריקטורה ועוד.

## ✨ תכונות עיקריות

### 🎯 Phase 1 - MVP (הושלם)
- [x] מבנה פרויקט מלא עם React + Express
- [x] תמיכה מלאה בעברית ו-RTL
- [x] ממשק ניהול בני משפחה
- [x] מערכת אוטנטיפיקציה (התחברות/הרשמה)
- [x] API endpoints לניהול משפחות
- [x] בסיס נתונים PostgreSQL
- [x] עיצוב responsive ונגיש

### 🚀 Phase 2 - תכונות מתקדמות (בפיתוח)
- [ ] העלאת תמונות עם Drag & Drop
- [ ] אינטגרציה עם Cloudinary
- [ ] ניתוח תמונות עם AI (BLIP-2/GPT-4V)
- [ ] אימון LORA עם Replicate API
- [ ] יצירת אלבומים בסגנונות שונים

### 🎨 Phase 3 - פולישינג (מתוכנן)
- [ ] מערכת תשלומים עם Stripe
- [ ] התראות SMS/Email
- [ ] יצוא PDF מעוצב
- [ ] אפשרות הזמנת הדפסה
- [ ] אופטימיזציית ביצועים

## 🏗️ ארכיטקטורה טכנית

### Frontend (React)
```
frontend/
├── src/
│   ├── components/          # רכיבים לשימוש חוזר
│   │   ├── Layout/         # Header, Layout
│   │   ├── FamilyMember/   # ניהול בני משפחה
│   │   └── Upload/         # העלאת תמונות
│   ├── pages/              # עמודי האפליקציה
│   ├── context/            # ניהול מצב גלובלי
│   ├── services/           # API calls
│   └── styles/             # קבצי CSS
```

### Backend (Node.js/Express)
```
backend/
├── routes/                 # API endpoints
├── models/                 # מודלים לבסיס נתונים
├── middleware/             # Authentication, validation
├── config/                 # הגדרות בסיס נתונים
├── migrations/             # סכמת בסיס נתונים
└── utils/                  # פונקציות עזר
```

### בסיס נתונים (PostgreSQL)
```sql
- users          # משתמשים
- families       # פרויקטי משפחה
- family_members # בני משפחה
- images         # תמונות
- albums         # אלבומים מוגמרים
- training_jobs  # עבודות אימון AI
```

## 🚀 התקנה והרצה

### דרישות מוקדמות
- Node.js 18+
- PostgreSQL 12+
- Git

### הקמת סביבת פיתוח

1. **שכפול הפרויקט**
```bash
git clone [repository-url]
cd "New Project AI"
```

2. **הגדרת Backend**
```bash
cd backend
npm install
cp .env.example .env
# ערוך את קובץ .env עם הגדרות המסד נתונים
npm run migrate  # יצירת טבלאות
npm run dev      # הרצה בפורט 5000
```

3. **הגדרת Frontend**
```bash
cd frontend
npm install
cp .env.example .env
# ערוך את קובץ .env לפי הצורך
npm run dev      # הרצה בפורט 5173
```

4. **גישה לאפליקציה**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔧 הגדרת בסיס נתונים

### PostgreSQL Setup
```bash
# יצירת בסיס נתונים חדש
createdb family_albums

# הרצת Migration
cd backend
npm run migrate
```

### משתני סביבה - Backend (.env)
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=family_albums
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
REPLICATE_API_TOKEN=your-token
```

### משתני סביבה - Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

## 📱 תמיכה בעברית ו-RTL

האפליקציה בנויה מלכתחילה עם תמיכה מלאה בעברית:

- **HTML**: `dir="rtl"` ו `lang="he"`
- **CSS**: תמיכה במיקום RTL
- **טיפוגרפיה**: פונטים Assistant ו-Heebo
- **UI/UX**: כל הטקסטים בעברית
- **טפסים**: תמיכה בכיוון טקסט נכון

## 🔑 API Endpoints

### Authentication
```
POST /api/auth/register  # הרשמה
POST /api/auth/login     # התחברות
GET  /api/auth/me        # פרטי משתמש נוכחי
```

### Family Management
```
POST /api/family/create         # יצירת משפחה חדשה
GET  /api/family               # רשימת משפחות של המשתמש
GET  /api/family/:id           # פרטי משפחה ספציפית
POST /api/family/:id/members   # הוספת בן משפחה
PUT  /api/family/members/:id   # עדכון בן משפחה
DELETE /api/family/members/:id # מחיקת בן משפחה
```

### File Upload & Processing
```
POST /api/upload/images        # העלאת תמונות
POST /api/training/start       # התחלת אימון LORA
GET  /api/training/status/:id  # בדיקת סטטוס אימון
POST /api/albums/generate      # יצירת אלבום
GET  /api/albums/:id          # קבלת אלבום מוגמר
```

## 🎨 מדריך לעיצוב

### צבעים
```css
--primary-color: #8b5cf6      /* סגול עיקרי */
--secondary-color: #ec4899    /* ורוד משני */
--success-color: #10b981      /* ירוק הצלחה */
--error-color: #ef4444        /* אדום שגיאה */
--text-color: #2c3e50         /* טקסט עיקרי */
--background-color: #fafafa   /* רקע */
```

### פונטים
- **עיקרי**: Assistant (Google Fonts)
- **משני**: Heebo (Google Fonts)
- **גיבוי**: Segoe UI, Tahoma, sans-serif

## 🔐 אבטחה

- **JWT Tokens**: אוטנטיפיקציה מאובטחת
- **Password Hashing**: bcryptjs
- **Input Validation**: ולידציה בצד שרת וקליינט
- **Rate Limiting**: הגנה מפני התקפות
- **CORS**: הגדרות מאובטחות
- **Helmet**: אבטחת HTTP headers

## 📊 מעקב ומוניטורינג

### לוגים
- Morgan לרישום בקשות HTTP
- מעקב אחר שגיאות ופעולות משמעותיות

### ביצועים
- Optimized images עם Cloudinary
- Lazy loading לתמונות
- Efficient database queries
- Responsive design למובייל

## 🚀 פיתוח

### סקריפטים זמינים

**Backend:**
```bash
npm start        # הרצה בפרודקשן
npm run dev      # הרצה בפיתוח עם nodemon
npm run migrate  # הרצת migrations
```

**Frontend:**
```bash
npm run dev      # סרווער פיתוח
npm run build    # בנייה לפרודקשן
npm run preview  # תצוגה מקדימה של הבנייה
```

### הוספת תכונות חדשות

1. **API Endpoint חדש**: הוסף route ב-`backend/routes/`
2. **Component חדש**: הוסף ב-`frontend/src/components/`
3. **Page חדש**: הוסף ב-`frontend/src/pages/` ועדכן ב-`App.jsx`
4. **Database Changes**: צור migration חדש ב-`backend/migrations/`

## 🤝 תרומה לפרויקט

1. Fork את הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit השינויים (`git commit -m 'Add amazing feature'`)
4. Push לבranch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## 📝 רישיון

פרויקט זה מורשה תחת רישיון MIT - ראה קובץ LICENSE לפרטים נוספים.

## 📞 יצירת קשר

עבור שאלות או תמיכה טכנית, פנו אל צוות הפיתוח.

---

<div align="center">
  <strong>🎨 בנוי עם אהבה לטכנולוגיה וחדשנות AI 🚀</strong>
</div>