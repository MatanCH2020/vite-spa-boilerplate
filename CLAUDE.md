# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hebrew RTL web application for creating AI-powered family photo albums. The application allows families to upload photos and generate customized albums in various artistic styles using AI/ML services.

**Stack**: React (frontend) + Node.js/Express (backend) + PostgreSQL
**Language**: Hebrew with full RTL support
**Architecture**: Full-stack web application with planned AI integration

## Development Commands

### Backend (Node.js/Express)
```bash
cd backend
npm install                    # Install dependencies
npm run dev                    # Development server with nodemon (port 5000)
npm start                      # Production server
npm run migrate               # Run database migrations
npm test                      # Run tests (placeholder)
```

### Frontend (React/Vite)
```bash
cd frontend
npm install                    # Install dependencies
npm run dev                    # Development server (port 5173)
npm run build                  # Production build
npm run preview                # Preview production build
npm run lint                   # ESLint checking
```

### Database Setup
```bash
# Create PostgreSQL database
createdb family_albums

# Run migrations (from backend directory)
npm run migrate
```

### Quick Start (Full Application)
```bash
# Terminal 1 - Backend
cd backend && npm install && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm install && npm run dev
```

### Full Application
- Backend runs on port 5000
- Frontend runs on port 5173
- Health check: `curl http://localhost:5000/health`

## Architecture & Key Design Patterns

### Frontend State Management
- **Global State**: React Context (`AppContext.jsx`) with useReducer pattern
- **State Structure**: `{ user, isAuthenticated, currentFamily, families, loading, error }`
- **Authentication**: JWT tokens stored in localStorage with automatic API header injection
- **Routing**: React Router with protected routes (`ProtectedRoute.jsx`)
- **Styling**: Component-scoped CSS with RTL utilities, @fontsource/assistant and @fontsource/heebo fonts
- **HTTP Client**: Axios with interceptors for token management

### Backend Architecture
- **API Structure**: RESTful endpoints organized by feature (`/auth`, `/family`, `/upload`, `/training`, `/albums`)
- **Database Models**: Direct SQL queries with PostgreSQL (no ORM)
- **Authentication**: JWT-based with middleware for protected routes (`middleware/auth.js`)
- **File Handling**: Multer for uploads, planned Cloudinary integration
- **Security**: Helmet, CORS, rate limiting, bcryptjs password hashing
- **Logging**: Morgan for HTTP request logging

**Express Configuration**:
- JSON payload limit: 50MB (for large image uploads)
- CORS enabled with credentials for frontend URL
- Combined logging format with Morgan
- Error handling with Hebrew error messages
- Health check endpoint at `/health`

### Database Schema
Core entities: `users -> families -> family_members -> images -> albums`
- Users own families (1:many)
- Families contain members (1:many)  
- Members have multiple images (1:many)
- Families generate albums (1:many)
- Training jobs track AI model creation per member

**Key Tables**:
- `users`: Email, name, password_hash with auto-timestamps
- `families`: Linked to user, has status (draft/training/processing/completed/failed)
- `family_members`: Name, role (dad/mom/child), avatar_url
- `images`: URLs, filenames, AI analysis_data (JSONB), quality_score
- `albums`: Style types, status, result_urls (JSONB), metadata (JSONB)
- `training_jobs`: Replicate API integration, model URLs, error tracking

**Database Features**:
- Automatic updated_at triggers on all main tables
- Performance indexes on foreign keys and query-heavy columns
- JSONB fields for flexible metadata and AI analysis data

### Hebrew RTL Implementation
- **HTML**: `dir="rtl"` and `lang="he"` attributes
- **CSS**: Custom properties with RTL-specific layouts and positioning
- **Typography**: Assistant and Heebo fonts optimized for Hebrew
- **Forms**: All inputs configured for RTL text direction
- **Navigation**: Mirrored layouts for right-to-left reading patterns

## Critical Development Notes

### Express Version Compatibility
The project requires **Express 4.x** (specifically 4.19.2). Express 5.x causes path-to-regexp compatibility issues. If encountering route parsing errors, downgrade Express.

### Server Files
- `server.js`: Full server with complete route imports
- `server-simple.js`: Simplified server with inline routes for testing/development
- Use `server-simple.js` when route files have issues or for rapid prototyping

### Environment Configuration
Both frontend and backend require `.env` files:

**Backend (.env)**:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=family_albums
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env)**:
```env
VITE_API_URL=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

### Database Operations
Migration script is embedded in package.json (`npm run migrate`). Requires PostgreSQL running with configured database.
- Database models use direct SQL queries, not an ORM
- Migration file: `migrations/001_initial_schema.sql`
- Database connection: `config/database.js`
- Models located in `models/` directory (User.js, Family.js, FamilyMember.js)

### API Service Pattern
Frontend uses centralized API service (`services/api.js`) with:
- Automatic JWT token attachment
- Response/request interceptors  
- Structured endpoint organization by feature area (`authAPI`, `familyAPI`, `uploadAPI`, `trainingAPI`, `albumsAPI`)
- Automatic 401 handling for token expiration with redirect to login
- 30-second timeout for API requests
- Multipart/form-data support for file uploads

### Component Organization
- **Layout**: Header navigation with authentication state (`components/Layout/`)
- **Pages**: Route-level components with business logic (`pages/`)
- **Components**: Reusable UI components organized by feature (`components/FamilyMember/`, `components/Upload/`)
- **Context**: Global state management for user and family data (`context/AppContext.jsx`)
- **Services**: API communication layer (`services/api.js`)
- **Routing**: React Router with protected routes and authentication guards

### Styling Approach
- CSS custom properties for theming
- Component-scoped CSS files
- RTL utility classes
- Responsive design with mobile-first approach
- Hebrew-optimized typography and spacing

## Development Workflow

### Git Workflow Rules
**MANDATORY**: After EVERY code change, modification, or file creation, Claude must:
1. Switch to the `dev` branch (if not already on it)
2. Stage all changes with `git add .`
3. Commit changes with a descriptive message
4. Push to `origin dev`

This ensures all development work is properly tracked and backed up to the dev branch.

### Testing API Endpoints
```bash
# Health check
curl http://localhost:5000/health

# Test API connectivity
curl http://localhost:5000/api/test
```

### Database Connection Testing
The backend automatically tests PostgreSQL connection on startup and logs connection status. If database connection fails, check:
1. PostgreSQL service is running
2. Database `family_albums` exists
3. Environment variables in `.env` match your PostgreSQL setup

### Debugging State Management
Frontend uses React Context with useReducer. Debug state in browser dev tools:
- React DevTools: View AppContext state
- localStorage: Check for `token` key
- Network tab: Verify API requests include Authorization header

## Future Development Phase

The application is currently in MVP phase. Next development phases include:
1. **Phase 2**: File upload system, AI integration (Replicate API), image analysis
2. **Phase 3**: Payment system (Stripe), PDF generation, printing services

When working on AI features, integrate with Replicate API for LORA training and Cloudinary for image management.