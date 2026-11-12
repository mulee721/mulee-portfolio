# Mulee Portfolio API

NestJS 11 REST API backend for the Mulee Portfolio management system.

## 🎯 Overview

This is the backend API that powers the Mulee Portfolio system. It provides:

- 🔐 Secure admin authentication with JWT
- 📦 MongoDB database with Mongoose ODM
- 📸 File upload management (images, PDFs, etc.)
- 🗄️ RESTful API endpoints for content management
- 📄 Comprehensive data validation
- 🛡️ Security headers and CORS protection
- 📝 Request logging and error handling

## 📁 Project Structure

```
backend/
├── src/
│   ├── common/                 # Shared utilities
│   │   ├── decorators/         # Custom decorators
│   │   ├── filters/            # Exception filters
│   │   ├── guards/             # Authentication guards
│   │   ├── interceptors/       # Request/response interceptors
│   │   └── middleware/         # Custom middleware
│   ├── modules/                # Feature modules
│   │   ├── auth/               # Authentication (JWT, login)
│   │   ├── admin/              # Admin management
│   │   ├── profile/            # Profile management
│   │   ├── projects/           # Projects CRUD
│   │   ├── skills/             # Skills management
│   │   ├── services/           # Services management
│   │   ├── experience/         # Experience records
│   │   ├── education/          # Education records
│   │   ├── certificates/       # Certificates management
│   │   ├── resume/             # Resume/CV management
│   │   └── uploads/            # File upload handling
│   ├── database/               # MongoDB schemas
│   ├── config/                 # Configuration files
│   ├── app.controller.ts       # Main controller
│   ├── app.module.ts           # Root module
│   ├── app.service.ts          # Root service
│   └── main.ts                 # Application entry point
├── dist/                       # Compiled output
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── nest-cli.json               # NestJS CLI config
└── .env.example                # Environment template
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### Configuration

```bash
# Copy environment template
cp .env.example .env.local

# Edit with your MongoDB URI and other settings
nano .env.local
```

### Running the Server

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm run prod

# Debug mode
npm run debug
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Server health status
- `GET /` - Welcome message

### Authentication (Phase 5)
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Current admin profile

### Profile (Phase 8)
- `GET /api/profile` - Get profile (public)
- `GET /api/profile/admin` - Get profile (admin)
- `PUT /api/profile` - Update profile (admin)

### Projects (Phase 8)
- `GET /api/projects` - List published projects (public)
- `GET /api/projects/admin` - List all projects (admin)
- `POST /api/projects` - Create project (admin)
- `GET /api/projects/:id` - Get project details (public)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Skills (Phase 8)
- `GET /api/skills` - List all skills
- `POST /api/skills` - Add skill (admin)
- `PUT /api/skills/:id` - Update skill (admin)
- `DELETE /api/skills/:id` - Delete skill (admin)

### Services (Phase 8)
- `GET /api/services` - List all services
- `POST /api/services` - Add service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Experience (Phase 8)
- `GET /api/experience` - List all experience records
- `POST /api/experience` - Add experience (admin)
- `PUT /api/experience/:id` - Update experience (admin)
- `DELETE /api/experience/:id` - Delete experience (admin)

### Education (Phase 8)
- `GET /api/education` - List all education records
- `POST /api/education` - Add education (admin)
- `PUT /api/education/:id` - Update education (admin)
- `DELETE /api/education/:id` - Delete education (admin)

### Certificates (Phase 8)
- `GET /api/certificates` - List all certificates
- `POST /api/certificates` - Add certificate (admin)
- `PUT /api/certificates/:id` - Update certificate (admin)
- `DELETE /api/certificates/:id` - Delete certificate (admin)

### Resume (Phase 8)
- `GET /api/resume` - Download current resume
- `POST /api/resume` - Upload new resume (admin)
- `DELETE /api/resume` - Delete resume (admin)

### Uploads (Phase 6)
- `POST /api/uploads/image` - Upload image (admin)
- `POST /api/uploads/document` - Upload document (admin)
- `POST /api/uploads/multiple` - Upload multiple files (admin)
- `DELETE /api/uploads/:id` - Delete uploaded file (admin)

## 🔐 Authentication

### JWT Token

The API uses JWT (JSON Web Tokens) for authentication:

1. Admin logs in with credentials
2. Server returns JWT token
3. Token is sent in `Authorization: Bearer <token>` header
4. Token is validated on protected routes

### Security Features

- Passwords hashed with bcrypt
- JWT signing with secret key
- Protected routes with guards
- CORS configured for frontend URLs
- Helmet security headers
- Input validation and sanitization
- Rate limiting (to be added)

## 💾 Database

### MongoDB Collections

The following collections will be created:

- `admins` - Admin user accounts
- `profiles` - Portfolio profile information
- `projects` - Project portfolio items
- `skills` - Technical skills
- `services` - Service offerings
- `experience` - Work experience records
- `education` - Education records
- `certificates` - Certificates and credentials
- `resumes` - Uploaded resume files
- `uploads` - Uploaded file metadata
- `activity_logs` - Admin action logs

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov

# E2E tests
npm run test:e2e
```

## 📝 Development Workflow

### Adding a New Endpoint

1. Create controller method in module controller
2. Create service method in module service
3. Add DTO (Data Transfer Object) for request validation
4. Add MongoDB schema if needed
5. Add authentication guard if protected
6. Test with curl or Postman

### Database Migrations

Run from MongoDB Compass or CLI:

```bash
# Connect to MongoDB and run migrations in database/migrations/
```

## 🚨 Error Handling

All errors follow this format:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "timestamp": "2026-11-09T10:30:00Z",
  "path": "/api/projects"
}
```

## 📊 Logging

Logs are printed to console and include:

- HTTP method, URL, status code
- Response time
- Client IP and user agent
- Error stack traces

## 🔄 CORS Configuration

CORS is configured for:
- Frontend: `http://localhost:5173`
- Admin Dashboard: `http://localhost:5174`
- Production: Configure in `.env.local`

## 🐳 Docker (Optional)

```bash
# Build Docker image
docker build -t mulee-portfolio-api .

# Run container
docker run -p 3000:3000 --env-file .env.local mulee-portfolio-api
```

## 📚 Documentation

- [NestJS Docs](https://docs.nestjs.com)
- [Mongoose Docs](https://mongoosejs.com)
- [JWT Guide](https://jwt.io)
- [REST API Best Practices](https://restfulapi.net)

## 🤝 Contributing

This is a private portfolio project. For changes:

1. Create feature branch
2. Make changes following NestJS conventions
3. Add tests
4. Create pull request

## 📄 License

Private - Mulee Portfolio

## 👤 Author

**Mulee (Mulugeta Daba)**

- Email: mulugetadaba719@gmail.com
- GitHub: https://github.com/mulee721
- Location: Jimma, Ethiopia

---

**Phase Status**: Phase 3 (Initialization) ✅  
**Last Updated**: November 9, 2026  
**Next Phase**: Phase 4 (Database & MongoDB Setup)
