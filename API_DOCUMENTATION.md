# Mulee Portfolio API Documentation

**Base URL**: `http://localhost:3000/api` (development)

**Base URL**: `https://api.yourdomain.com/api` (production)

**Authentication**: JWT Bearer Token in `Authorization` header

---

## Table of Contents
- [Authentication](#authentication)
- [Projects API](#projects-api)
- [Skills API](#skills-api)
- [Profile API](#profile-api)
- [Experience API](#experience-api)
- [Education API](#education-api)
- [Services API](#services-api)
- [Certificates API](#certificates-api)
- [Resume API](#resume-api)
- [Uploads API](#uploads-api)
- [Error Handling](#error-handling)

---

## Authentication

### Login
Authenticate with email and password to receive JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "admin@portfolio.com",
  "password": "Admin@123456"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@portfolio.com",
    "role": "admin"
  }
}
```

**Usage:**
```bash
# Get token
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"Admin@123456"}' \
  | jq -r '.accessToken')

# Use token
curl -X GET http://localhost:3000/api/projects \
  -H "Authorization: Bearer $TOKEN"
```

### Validate Token
Check if JWT token is valid.

**Endpoint:** `GET /auth/validate`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "isValid": true,
  "user": {
    "sub": "507f1f77bcf86cd799439011",
    "email": "admin@portfolio.com",
    "role": "admin",
    "iat": 1699921200,
    "exp": 1700526000
  }
}
```

### Get Profile
Get authenticated user information.

**Endpoint:** `GET /auth/profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "admin@portfolio.com",
  "role": "admin"
}
```

---

## Projects API

### List All Projects
Get all published projects (public endpoint).

**Endpoint:** `GET /projects`

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "E-Commerce Platform",
    "description": "Full-stack React and Node.js e-commerce application",
    "technologies": ["React", "Node.js", "MongoDB"],
    "image": "/uploads/project1.jpg",
    "demoUrl": "https://demo.example.com",
    "codeUrl": "https://github.com/user/project",
    "status": "published",
    "order": 1,
    "createdAt": "2026-11-13T10:30:00Z",
    "updatedAt": "2026-11-13T10:30:00Z"
  }
]
```

### Get Single Project
Get project by ID (public endpoint).

**Endpoint:** `GET /projects/:id`

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "E-Commerce Platform",
  "description": "Full-stack React and Node.js e-commerce application",
  "technologies": ["React", "Node.js", "MongoDB"],
  "image": "/uploads/project1.jpg",
  "demoUrl": "https://demo.example.com",
  "codeUrl": "https://github.com/user/project",
  "status": "published",
  "order": 1,
  "createdAt": "2026-11-13T10:30:00Z",
  "updatedAt": "2026-11-13T10:30:00Z"
}
```

### List All Draft Projects
Get all draft projects (admin only).

**Endpoint:** `GET /projects/drafts/all`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "New Project",
    "description": "Work in progress",
    "technologies": [],
    "status": "draft",
    "order": 999,
    "createdAt": "2026-11-13T11:00:00Z",
    "updatedAt": "2026-11-13T11:00:00Z"
  }
]
```

### Create Project
Create new project (admin only).

**Endpoint:** `POST /projects`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "My New Project",
  "description": "Project description here",
  "technologies": ["React", "TypeScript", "Tailwind"],
  "image": "/uploads/image.jpg",
  "demoUrl": "https://demo.example.com",
  "codeUrl": "https://github.com/user/project",
  "status": "draft"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "My New Project",
  "description": "Project description here",
  "technologies": ["React", "TypeScript", "Tailwind"],
  "image": "/uploads/image.jpg",
  "demoUrl": "https://demo.example.com",
  "codeUrl": "https://github.com/user/project",
  "status": "draft",
  "order": 1,
  "createdAt": "2026-11-13T11:05:00Z",
  "updatedAt": "2026-11-13T11:05:00Z"
}
```

### Update Project
Update existing project (admin only).

**Endpoint:** `PUT /projects/:id`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Project Title",
  "status": "published"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "Updated Project Title",
  "status": "published",
  "updatedAt": "2026-11-13T11:10:00Z"
}
```

### Delete Project
Delete project (admin only).

**Endpoint:** `DELETE /projects/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** `204 No Content`

### Reorder Projects
Batch reorder projects (admin only).

**Endpoint:** `PUT /projects/order/reorder`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
[
  { "id": "507f1f77bcf86cd799439011", "order": 1 },
  { "id": "507f1f77bcf86cd799439012", "order": 2 },
  { "id": "507f1f77bcf86cd799439013", "order": 3 }
]
```

**Response (200 OK):**
```json
{
  "message": "Projects reordered successfully"
}
```

---

## Skills API

### List All Skills
**Endpoint:** `GET /skills`

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "React",
    "category": "Frontend",
    "level": 95,
    "icon": "react",
    "order": 1,
    "status": "published",
    "createdAt": "2026-11-13T10:00:00Z"
  }
]
```

### Create Skill
**Endpoint:** `POST /skills`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "TypeScript",
  "category": "Frontend",
  "level": 90,
  "icon": "typescript",
  "status": "published"
}
```

### Update Skill
**Endpoint:** `PUT /skills/:id`

**Request Body:**
```json
{
  "level": 95,
  "status": "published"
}
```

### Delete Skill
**Endpoint:** `DELETE /skills/:id`

**Response:** `204 No Content`

---

## Profile API

### Get Profile
**Endpoint:** `GET /profiles`

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "title": "Full Stack Developer",
    "bio": "I build web applications with React and Node.js",
    "email": "john@example.com",
    "phone": "+1234567890",
    "location": "San Francisco, CA",
    "profileImage": "/uploads/profile.jpg",
    "socialLinks": {
      "github": "https://github.com/johndoe",
      "linkedin": "https://linkedin.com/in/johndoe",
      "twitter": "https://twitter.com/johndoe"
    },
    "status": "published",
    "createdAt": "2026-11-13T10:00:00Z"
  }
]
```

### Create/Update Profile
**Endpoint:** `POST /profiles` or `PUT /profiles/:id`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "title": "Full Stack Developer",
  "bio": "I build web applications",
  "email": "john@example.com",
  "phone": "+1234567890",
  "location": "San Francisco, CA",
  "socialLinks": {
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe"
  },
  "status": "published"
}
```

---

## Experience API

### List Experience
**Endpoint:** `GET /experience`

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "company": "Tech Company Inc",
    "position": "Senior Developer",
    "description": "Led development of React applications",
    "startDate": "2020-01-15",
    "endDate": "2023-06-30",
    "isCurrentlyWorking": false,
    "technologies": ["React", "Node.js", "MongoDB"],
    "order": 1,
    "status": "published",
    "createdAt": "2026-11-13T10:00:00Z"
  }
]
```

### Create Experience
**Endpoint:** `POST /experience`

**Request Body:**
```json
{
  "company": "Tech Company Inc",
  "position": "Senior Developer",
  "description": "Led development of React applications",
  "startDate": "2020-01-15",
  "endDate": "2023-06-30",
  "isCurrentlyWorking": false,
  "technologies": ["React", "Node.js", "MongoDB"],
  "status": "published"
}
```

---

## Education API

### List Education
**Endpoint:** `GET /education`

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "institution": "University of California",
    "degree": "Bachelor of Science",
    "field": "Computer Science",
    "description": "Graduated with honors",
    "startDate": "2016-09-01",
    "endDate": "2020-05-31",
    "grade": "3.8",
    "order": 1,
    "status": "published",
    "createdAt": "2026-11-13T10:00:00Z"
  }
]
```

### Create Education
**Endpoint:** `POST /education`

**Request Body:**
```json
{
  "institution": "University of California",
  "degree": "Bachelor of Science",
  "field": "Computer Science",
  "description": "Graduated with honors",
  "startDate": "2016-09-01",
  "endDate": "2020-05-31",
  "grade": "3.8",
  "status": "published"
}
```

---

## Services API

### List Services
**Endpoint:** `GET /services`

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Web Development",
    "description": "Full-stack web application development",
    "icon": "code",
    "order": 1,
    "status": "published",
    "createdAt": "2026-11-13T10:00:00Z"
  }
]
```

### Create Service
**Endpoint:** `POST /services`

**Request Body:**
```json
{
  "title": "Web Development",
  "description": "Full-stack web application development",
  "icon": "code",
  "status": "published"
}
```

---

## Certificates API

### List Certificates
**Endpoint:** `GET /certificates`

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "React Advanced Patterns",
    "issuer": "Udemy",
    "description": "Advanced React patterns and best practices",
    "certificateUrl": "https://cert.example.com",
    "issueDate": "2023-06-15",
    "expirationDate": "2026-06-15",
    "doesNotExpire": false,
    "order": 1,
    "status": "published",
    "createdAt": "2026-11-13T10:00:00Z"
  }
]
```

### Create Certificate
**Endpoint:** `POST /certificates`

**Request Body:**
```json
{
  "title": "React Advanced Patterns",
  "issuer": "Udemy",
  "description": "Advanced React patterns and best practices",
  "certificateUrl": "https://cert.example.com",
  "issueDate": "2023-06-15",
  "expirationDate": "2026-06-15",
  "doesNotExpire": false,
  "status": "published"
}
```

---

## Resume API

### List Resumes
**Endpoint:** `GET /resume`

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "fileName": "John_Doe_Resume.pdf",
    "filePath": "/uploads/john_doe_resume.pdf",
    "url": "/api/uploads/file/john_doe_resume.pdf",
    "description": "Latest resume",
    "status": "published",
    "createdAt": "2026-11-13T10:00:00Z"
  }
]
```

### Create Resume
**Endpoint:** `POST /resume`

**Request Body:**
```json
{
  "fileName": "John_Doe_Resume.pdf",
  "filePath": "/uploads/john_doe_resume.pdf",
  "url": "/api/uploads/file/john_doe_resume.pdf",
  "description": "Latest resume",
  "status": "published"
}
```

---

## Uploads API

### List Uploads
Get all uploaded files (public endpoint).

**Endpoint:** `GET /uploads`

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "filename": "9b6ba3f0-1234-5678-abcd-ef1234567890.jpg",
    "originalName": "profile.jpg",
    "size": 245000,
    "mimeType": "image/jpeg",
    "url": "/api/uploads/file/9b6ba3f0-1234-5678-abcd-ef1234567890.jpg",
    "createdAt": "2026-11-13T10:30:00Z"
  }
]
```

### Upload File
Upload new file (admin only).

**Endpoint:** `POST /uploads`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: File to upload (required)

**Supported File Types:**
- Images: `image/png`, `image/jpeg`, `image/webp`
- Documents: `application/pdf`

**Max File Size:** 50MB

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "filename": "9b6ba3f0-5678-1234-abcd-ef1234567890.jpg",
  "originalName": "project-screenshot.jpg",
  "size": 325000,
  "mimeType": "image/jpeg",
  "url": "/api/uploads/file/9b6ba3f0-5678-1234-abcd-ef1234567890.jpg",
  "createdAt": "2026-11-13T11:00:00Z"
}
```

**Example (curl):**
```bash
TOKEN="your-jwt-token"
curl -X POST http://localhost:3000/api/uploads \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/path/to/image.jpg"
```

### Delete Upload
Delete uploaded file (admin only).

**Endpoint:** `DELETE /uploads/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** `204 No Content`

---

## Error Handling

### Error Response Format
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "errors": [
    {
      "field": "title",
      "message": "title should not be empty"
    }
  ]
}
```

### Common Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Successful deletion |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

### Error Examples

**Missing Authorization Header:**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**Invalid Request Body:**
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "title should not be empty"
    }
  ]
}
```

**Resource Not Found:**
```json
{
  "statusCode": 404,
  "message": "Not Found"
}
```

---

## Rate Limiting

Currently no rate limiting. For production, implement:

```bash
# Recommended: 100 requests per minute per IP
# Use express-rate-limit or helmet rate limiter
```

---

## CORS Configuration

Allowed origins (development):
- `http://localhost:3000`
- `http://localhost:5173`
- `http://localhost:5174`
- `http://localhost:3001`

Production: Update in `.env`:
```
CORS_ORIGIN=https://admin.yourdomain.com,https://portfolio.yourdomain.com
```

---

## Pagination (Future Enhancement)

Currently returns all items. For pagination, add query params:

```
GET /projects?page=1&limit=10
GET /skills?skip=0&take=20
```

---

## Sorting & Filtering (Future Enhancement)

```
GET /projects?sort=-createdAt
GET /projects?status=published
GET /skills?category=Frontend&level=90
```

---

## Request/Response Examples

### Complete Flow: Create and Publish Project

```bash
# 1. Login
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"Admin@123456"}' \
  | jq -r '.accessToken')

# 2. Create project
PROJECT=$(curl -s -X POST http://localhost:3000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Portfolio Admin System",
    "description": "Full-stack portfolio management system",
    "technologies": ["React", "NestJS", "MongoDB"],
    "status": "draft"
  }')

PROJECT_ID=$(echo $PROJECT | jq -r '._id')

# 3. Upload image for project
curl -X POST http://localhost:3000/api/uploads \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@project-image.jpg"

# 4. Update project with image and publish
curl -X PUT http://localhost:3000/api/projects/$PROJECT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "image": "/api/uploads/file/uuid.jpg",
    "status": "published"
  }'

# 5. Verify published project
curl http://localhost:3000/api/projects/$PROJECT_ID
```

---

**API Version**: 1.0.0  
**Last Updated**: November 13, 2026  
**Status**: Production Ready ✅

