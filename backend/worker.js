import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// Import routes
import authRoutes from './routes/auth.js';
import familyRoutes from './routes/family.js';
import uploadRoutes from './routes/upload.js';
import trainingRoutes from './routes/training.js';
import albumsRoutes from './routes/albums.js';

const app = express();

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}));

// CORS configuration for Cloudflare
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://your-frontend-domain.pages.dev',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware (increased limit for image uploads)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'יותר מדי בקשות ממכתובת IP זו, נסה שוב מאוחר יותר.'
});
app.use(limiter);

// Logging
app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'שרת האלבום המשפחתי פועל כרגיל',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/albums', albumsRoutes);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API פועל כרגיל' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('שגיאה בשרת:', err.stack);
  res.status(500).json({ 
    message: 'שגיאת שרת פנימית',
    error: process.env.NODE_ENV === 'development' ? err.message : 'משהו השתבש'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'נתיב לא נמצא' });
});

export default {
  async fetch(request, env, ctx) {
    // Set environment variables for the request
    process.env.DB = env.DB;
    process.env.JWT_SECRET = env.JWT_SECRET;
    process.env.FRONTEND_URL = env.FRONTEND_URL;
    process.env.CLOUDINARY_CLOUD_NAME = env.CLOUDINARY_CLOUD_NAME;
    process.env.CLOUDINARY_API_KEY = env.CLOUDINARY_API_KEY;
    process.env.CLOUDINARY_API_SECRET = env.CLOUDINARY_API_SECRET;
    
    return app.fetch(request, env, ctx);
  }
};