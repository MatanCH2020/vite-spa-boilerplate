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
npm run dev                    # Development server with nodemon
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

### Database Schema
Core entities: `users -> families -> family_members -> images -> albums`
- Users own families (1:many)
- Families contain members (1:many)
- Members have multiple images (1:many)
- Families generate albums (1:many)
- Training jobs track AI model creation per member

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
- Structured endpoint organization by feature area
- Automatic 401 handling for token expiration

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

## Future Development Phase

The application is currently in MVP phase. Next development phases include:
1. **Phase 2**: File upload system, AI integration (Replicate API), image analysis
2. **Phase 3**: Payment system (Stripe), PDF generation, printing services

When working on AI features, integrate with Replicate API for LORA training and Cloudinary for image management.