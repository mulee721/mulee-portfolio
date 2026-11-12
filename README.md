# Mulee | Full-Stack Developer Portfolio + Admin Dashboard

A complete portfolio management system featuring a modern public portfolio, secure admin dashboard, and a REST API backend.

## 🎯 Project Overview

This is a **monorepo** containing three integrated applications:

1. **Frontend** (`/frontend`) - Public portfolio website
2. **Admin Dashboard** (`/admin`) - Private content management interface
3. **Backend** (`/backend`) - NestJS REST API + MongoDB

## 🚀 Features

### Public Portfolio
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Dark/light theme toggle
- ✅ Multilingual support (English, Amharic, Afaan Oromo)
- ✅ Projects showcase with details page
- ✅ Skills, experience, and education sections
- ✅ Services showcase
- ✅ Contact form with EmailJS
- ✅ Resume/CV download
- ✅ Smooth animations and transitions

### Admin Dashboard
- 🔒 Secure login (JWT authentication)
- 📊 Dashboard overview with statistics
- 📝 Complete CRUD for all portfolio sections
- 🖼️ Image and file upload management
- 📸 Multiple screenshot upload
- 📄 Resume/CV management
- 🏷️ Draft and publish system
- 👤 Profile management
- 📱 Responsive admin interface

### Backend API
- 🔐 JWT authentication
- 📦 MongoDB + Mongoose
- 📤 File upload handling (Multer)
- 🗄️ RESTful API endpoints
- ✨ Published/draft content separation
- 🛡️ Input validation and security

## 📁 Project Structure

```
MyP/
├── frontend/              # Public React portfolio
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/      # Theme & Language
│   │   ├── data/          # Static content
│   │   ├── pages/
│   │   ├── sections/
│   │   └── translations/  # EN, Amharic, Afaan Oromo
│   ├── public/            # Assets & images
│   ├── package.json
│   └── vite.config.ts
│
├── admin/                 # React admin dashboard
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/               # NestJS API server
│   ├── src/
│   │   ├── auth/
│   │   ├── profiles/
│   │   ├── projects/
│   │   ├── skills/
│   │   ├── services/
│   │   ├── experience/
│   │   ├── education/
│   │   ├── certificates/
│   │   ├── resume/
│   │   ├── uploads/
│   │   └── main.ts
│   └── package.json
│
└── README.md              # This file
```

## 🛠️ Tech Stack

### Frontend & Admin
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- NestJS 11
- Node.js
- MongoDB + Mongoose
- Multer (file uploads)
- JWT authentication
- bcrypt (password hashing)

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- EmailJS account (for contact form)

## 🚀 Quick Start

### Option 1: Frontend Only (Development)

```bash
# Install dependencies
cd frontend
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

### Option 2: Full Stack (When Ready)

```bash
# Install frontend dependencies
cd frontend
npm install

# Install admin dependencies
cd ../admin
npm install

# Install backend dependencies
cd ../backend
npm install

# Copy environment file
cp .env.example .env.local
# Edit .env.local with your MongoDB and EmailJS credentials

# Start backend (from backend directory)
npm run start

# Start frontend dev server (in another terminal, from frontend directory)
npm run dev

# Start admin dashboard (in another terminal, from admin directory)
npm run dev
```

## 🔑 Environment Setup

### Backend (.env.local in backend/)
```env
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
ADMIN_PASSWORD=your_secure_admin_password
FILE_UPLOAD_PATH=./uploads
NODE_ENV=development
```

### Frontend (.env.local in frontend/)
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_MAIL_TO=your_email@example.com
```

## 📖 Development Phases

- ✅ Phase 1: Project Inspection
- ✅ Phase 2: Git Checkpoint & Build Protection
- ⏳ Phase 3: Backend Initialization
- ⏳ Phase 4: Database & MongoDB Setup
- ⏳ Phase 5: Authentication System
- ⏳ Phase 6: File Management
- ⏳ Phase 7: Admin Dashboard
- ⏳ Phase 8: API Endpoints
- ⏳ Phase 9: Frontend Integration
- ⏳ Phase 10: Testing & Deployment

See `PHASE2_CHECKPOINT.md` for detailed progress.

## 🔐 Security

- Passwords hashed with bcrypt
- JWT authentication for admin
- Protected API routes with guards
- File upload validation
- Environment variables for secrets
- CORS configuration
- Input validation
- Rate limiting (planned)

## 📱 Responsive Design

- Mobile: Optimized for < 640px
- Tablet: 640px - 1024px
- Desktop: 1024px+

## 🌍 Multilingual Support

Currently supported:
- English (en)
- Amharic (am)
- Afaan Oromo (om)

## 👤 Author

**Mulee (Mulugeta Daba)**

- GitHub: https://github.com/mulee721
- Instagram: @mulee_19
- Location: Jimma, Ethiopia

## 📝 License

This project is personal work. All rights reserved.

## 📞 Contact

For questions or feedback:
- Email: mulugetadaba719@gmail.com
- GitHub Issues: https://github.com/mulee721/mulee-portfolio/issues

---

**Last Updated**: November 9, 2026  
**Current Phase**: Phase 2 Complete ✅  
**Next Phase**: Phase 3 - Backend Initialization
