const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Basic routes without external files first
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'השרת פועל בהצלחה',
    timestamp: new Date().toISOString() 
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API פועל בהצלחה',
    timestamp: new Date().toISOString() 
  });
});

// Placeholder auth routes
app.post('/api/auth/login', (req, res) => {
  res.json({ 
    message: 'Login endpoint - בפיתוח',
    token: 'placeholder-token',
    user: { id: 1, name: 'משתמש לדוגמה', email: 'test@example.com' }
  });
});

app.post('/api/auth/register', (req, res) => {
  res.json({ 
    message: 'Register endpoint - בפיתוח',
    token: 'placeholder-token',
    user: { id: 1, name: req.body.name || 'משתמש חדש', email: req.body.email }
  });
});

// Placeholder family routes
app.get('/api/family', (req, res) => {
  res.json({ 
    families: [
      { id: 1, name: 'משפחת דוגמה', status: 'draft', created_at: new Date().toISOString() }
    ]
  });
});

app.post('/api/family/create', (req, res) => {
  res.json({ 
    family: { 
      id: Date.now(), 
      name: req.body.name, 
      status: 'draft', 
      created_at: new Date().toISOString(),
      members: []
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'שגיאה פנימית בשרת',
    message: process.env.NODE_ENV === 'development' ? err.message : 'אירעה שגיאה לא צפויה'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'הנתיב לא נמצא' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});