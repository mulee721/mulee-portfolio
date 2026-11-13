# Quick Start Guide - Mulee Portfolio Admin System

## ✅ Status
- **Backend**: Built successfully (188 files compiled)
- **Admin Dashboard**: Ready to build
- **Frontend**: Original portfolio (preserved)

## 🚀 Start in 3 Steps

### 1️⃣ Start MongoDB
```bash
# Local MongoDB (if installed)
mongod

# OR use MongoDB Atlas (cloud)
# Get connection string from: https://www.mongodb.com/cloud/atlas
```

### 2️⃣ Start Backend
```bash
cd backend
npm run prod
# Listens on http://localhost:3000
```

Expected output:
```
╔════════════════════════════════════════════════════╗
║           🚀 Mulee Portfolio API Server            ║
╠════════════════════════════════════════════════════╣
║  ✅ Server started successfully                    ║
║  📍 Listening on: http://localhost:3000           ║
║  🌍 Environment: development                      ║
╚════════════════════════════════════════════════════╝
```

### 3️⃣ Start Admin Dashboard
```bash
cd admin
npm install  # First time only
npm run dev
# Open http://localhost:5174
```

**Login credentials:**
- Email: `admin@portfolio.com`
- Password: `Admin@123456`

---

## 📋 What You Can Do

### In Admin Dashboard
✅ Create/edit/delete projects  
✅ Manage skills and experience  
✅ Upload files and images  
✅ Control draft/published status  
✅ Manage portfolio profile  

### Backend API
✅ **40+ REST endpoints**
- `POST /api/auth/login` - Admin login
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- [Same for: skills, services, experience, education, certificates, resume, uploads]

### Frontend Portfolio
✅ View live portfolio at `http://localhost:5173` (optional)

---

## 🛠️ Troubleshooting

### Backend won't start
```bash
# 1. Check MongoDB is running
mongod

# 2. Verify .env.local has MongoDB URI
cat backend/.env.local | grep MONGODB_URI

# 3. Rebuild
cd backend
npm run build
npm run prod
```

### Admin dashboard won't connect
```bash
# Ensure backend is running on port 3000
# Check http://localhost:3000 in browser

# If "Cannot find module" error:
cd admin
npm install
```

### Port already in use
```bash
# Change port in backend/.env.local
PORT=3001
```

---

## 📁 Project Structure
```
MyP/
├── backend/          ← NestJS API (Port 3000)
├── admin/            ← React Dashboard (Port 5174)
├── frontend/         ← Original Portfolio (Port 5173)
└── docs/
    ├── PHASES_COMPLETED.md
    ├── BUILD_FIX_SUMMARY.md
    └── QUICK_START.md (this file)
```

---

## 🔧 Common Commands

### Backend
```bash
cd backend
npm run build      # Compile TypeScript
npm run prod       # Run production build
npm run dev        # Run dev mode
npm run lint       # Check code
```

### Admin Dashboard
```bash
cd admin
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Build for production
```

### Frontend (Optional)
```bash
cd frontend
npm run dev        # Start dev server
npm run build      # Build for production
```

---

## 🌍 Production Deployment

### Before deploying:
1. Update `.env` with production values
2. Change `JWT_SECRET` to random strong key
3. Update `MONGODB_URI` to production database
4. Update `CORS_ORIGIN` with production domains
5. Set `NODE_ENV=production`

### Deploy to:
- **Backend**: Heroku, AWS, DigitalOcean, Railway, etc.
- **Admin Dashboard**: Vercel, Netlify, GitHub Pages, etc.
- **Frontend**: Same as admin or separate hosting

---

## 📚 Full Documentation
- **PHASES_COMPLETED.md** - Complete system overview (all 10 phases)
- **BUILD_FIX_SUMMARY.md** - Build troubleshooting details
- **backend/README.md** - Backend API documentation

---

## ✨ You're All Set!
Backend is compiled and ready. Just start MongoDB and launch the services!

**Questions?** Check the documentation files above.
