# Deployment Guide - Mulee Portfolio Admin System

## Quick Deployment Summary

| Platform | Difficulty | Cost | Setup Time | Recommendation |
|----------|-----------|------|-----------|-----------------|
| Railway | ⭐ Easy | $5-20/mo | 10 mins | ✅ **RECOMMENDED** |
| Vercel + Heroku | ⭐⭐ Medium | Free-$20/mo | 20 mins | Good option |
| Docker + AWS | ⭐⭐⭐ Hard | $20-100+/mo | 1 hour | For scaling |

---

## 🚀 Railway Deployment (Recommended)

### Prerequisites
- GitHub account with repo access
- Railway account (https://railway.app)
- Custom domain (optional)

### Step 1: Connect GitHub
```bash
1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access GitHub
5. Select your mulee-portfolio repository
```

### Step 2: Add Services

**Backend Service:**
1. Click "+ Add Service"
2. Select "Database" → "MongoDB"
3. Railway auto-creates MongoDB cluster
4. Copy `MONGODB_URI` from variables

**Add Backend App:**
1. Click "+ Add Service"
2. Select "GitHub Repo" → your-repo
3. Configure build:
   - Root directory: `backend`
   - Build command: `npm install && npm run build`
   - Start command: `npm run prod`
   - Port: `3000`

**Add Admin Dashboard:**
1. Click "+ Add Service"  
2. Select "GitHub Repo" → your-repo
3. Configure build:
   - Root directory: `admin`
   - Build command: `npm install --legacy-peer-deps && npm run build`
   - Start command: `npm run preview`
   - Port: `5174`

### Step 3: Environment Variables

**Backend variables** (Railway UI):
```
NODE_ENV=production
PORT=3000
JWT_SECRET=<generate-64-char-random-string>
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=<your-secure-password>
CORS_ORIGIN=https://admin-yourdomain.com,https://portfolio-yourdomain.com
```

**Admin Dashboard variables:**
```
VITE_API_URL=https://backend-url.railway.app/api
```

### Step 4: Custom Domains

**For Backend:**
1. Railway Dashboard → Backend service
2. Click "Settings"
3. Domains → "Generate Domain" or add custom domain
4. Example: `api.yourdomain.com`

**For Admin Dashboard:**
1. Railway Dashboard → Admin Dashboard service
2. Same process
3. Example: `admin.yourdomain.com`

### Step 5: Deploy

```bash
# Simply push to main branch
git add .
git commit -m "Deploy to production on Railway"
git push origin main

# Railway auto-detects changes and deploys
# Watch deployment logs in Railway dashboard
```

### Verify Deployment

```bash
# Test backend
curl https://api.yourdomain.com/api/auth/validate

# Test admin dashboard
open https://admin.yourdomain.com
# Should show login page

# Check logs
# Railway Dashboard → Service → View logs
```

---

## 🌐 Vercel + Heroku Deployment

### Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy admin dashboard
cd admin
vercel --prod

# Follow prompts:
# - Project name: mulee-portfolio-admin
# - Framework: Vite
# - Build output: dist
# - Install Vercel GitHub integration for auto-deploys
```

**Vercel Environment Variables:**
```
VITE_API_URL=https://mulee-backend-heroku.herokuapp.com/api
```

### Deploy Backend to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create mulee-portfolio-backend

# Add MongoDB addon
heroku addons:create mongolab

# Set environment variables
heroku config:set \
  NODE_ENV=production \
  JWT_SECRET=your-64-char-secret \
  ADMIN_EMAIL=admin@portfolio.com \
  ADMIN_PASSWORD=your-secure-password \
  CORS_ORIGIN=https://mulee-portfolio-admin.vercel.app

# Deploy
cd backend
git push heroku main

# View logs
heroku logs --tail

# Get backend URL
heroku domains
# Update Vercel VITE_API_URL with this URL
```

### Auto-Deploy Setup

**For Vercel:**
- Enable GitHub integration in project settings
- Auto-deploys on main branch push

**For Heroku:**
```bash
# Connect Heroku to GitHub
heroku git:remote -a mulee-portfolio-backend

# Enable automatic deploys
heroku pipelines:create mulee-portfolio
heroku pipelines:connect mulee-portfolio

# Now deploys on git push heroku main
```

---

## 🐳 Docker + AWS ECS

### Build Docker Image

**Create `Dockerfile` in project root:**
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./backend/
COPY admin/package*.json ./admin/

# Install dependencies
WORKDIR /app/backend
RUN npm ci

WORKDIR /app/admin
RUN npm install --legacy-peer-deps

# Copy source code
WORKDIR /app
COPY backend ./backend
COPY admin ./admin

# Build backend
WORKDIR /app/backend
RUN npm run build

# Expose port
EXPOSE 3000

# Start backend
CMD ["npm", "run", "prod"]
```

**Build and test locally:**
```bash
# Build image
docker build -t mulee-portfolio:latest .

# Run container
docker run -e MONGODB_URI=mongodb://host.docker.internal:27017/mulee \
           -e JWT_SECRET=dev-secret \
           -p 3000:3000 \
           mulee-portfolio:latest

# Test
curl http://localhost:3000/api/auth/validate
```

### Push to AWS ECR

```bash
# Create ECR repository
aws ecr create-repository --repository-name mulee-portfolio --region us-east-1

# Login to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  123456789.dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag mulee-portfolio:latest \
  123456789.dkr.ecr.us-east-1.amazonaws.com/mulee-portfolio:latest

# Push to ECR
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/mulee-portfolio:latest
```

### Deploy to AWS ECS

```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name mulee-portfolio

# Create task definition
aws ecs register-task-definition \
  --family mulee-portfolio \
  --network-mode awsvpc \
  --requires-compatibilities FARGATE \
  --cpu 256 \
  --memory 512 \
  --container-definitions '[{
    "name": "mulee-backend",
    "image": "123456789.dkr.ecr.us-east-1.amazonaws.com/mulee-portfolio:latest",
    "portMappings": [{"containerPort": 3000}],
    "environment": [
      {"name": "NODE_ENV", "value": "production"},
      {"name": "MONGODB_URI", "value": "mongodb+srv://..."}
    ]
  }]'

# Create service
aws ecs create-service \
  --cluster mulee-portfolio \
  --service-name mulee-backend \
  --task-definition mulee-portfolio \
  --desired-count 2 \
  --launch-type FARGATE
```

---

## 📊 Monitoring & Observability

### Set Up Logging

**Use CloudWatch (AWS) or Papertrail:**

```bash
# For AWS CloudWatch
npm install aws-sdk

# Update main.ts to send logs
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

const winstonInstance = winston.createLogger({
  transports: [
    new WinstonCloudWatch({
      logGroupName: 'mulee-portfolio',
      logStreamName: 'backend'
    })
  ]
});
```

### Set Up Monitoring

**UptimeRobot (Free):**
1. Go to https://uptimerobot.com
2. Add monitor: https://api.yourdomain.com/api/auth/validate
3. Alert interval: 5 minutes
4. Notification: Email/Slack

**DataDog or New Relic:**
- More comprehensive monitoring
- APM, error tracking, logs
- Cost: ~$15/month

### Alerts

Set up alerts for:
- ❌ Server down (500+ errors)
- 🔐 Authentication failures (401 spikes)
- 📊 High response time (>1s)
- 💾 Database connection errors
- 📈 Memory usage >80%
- 💿 Disk usage >80%

---

## 🔄 Continuous Deployment

### GitHub Actions for Auto-Deploy

**Create `.github/workflows/deploy.yml`:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Railway
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: |
          npm install -g @railway/cli
          railway up --service backend
          railway up --service admin
```

### Manual Deployment

```bash
# Update code
git add .
git commit -m "Production fix"

# Push to deploy
git push origin main

# If using Heroku:
git push heroku main

# If using Railway: auto-deploys on GitHub push
```

---

## 🔒 Security Checklist

- [ ] JWT_SECRET is 64+ random characters
- [ ] ADMIN_PASSWORD is 12+ characters with mixed case, numbers, symbols
- [ ] HTTPS enabled on all domains
- [ ] CORS_ORIGIN whitelisted (no wildcards)
- [ ] Helmet security headers enabled
- [ ] MongoDB authentication enabled
- [ ] Backup strategy implemented
- [ ] Rate limiting configured
- [ ] OWASP top 10 vulnerabilities checked

---

## 📈 Scaling Considerations

**When you need to scale:**

1. **Horizontal Scaling (Multiple instances)**
   - Use load balancer (AWS ALB, Railway auto-handles)
   - Sessions stored in MongoDB (not local memory)
   - File uploads to S3 instead of local disk

2. **Database Optimization**
   - Create indexes on frequently queried fields
   - Enable MongoDB read replicas
   - Consider sharding for large collections

3. **Caching**
   - Add Redis for session caching
   - Cache API responses
   - Browser caching for static assets

4. **CDN**
   - Cloudflare for static content
   - Reduce bandwidth costs
   - Global distribution

---

## 💰 Cost Estimates (Monthly)

| Component | Service | Free Tier | Paid Tier |
|-----------|---------|-----------|-----------|
| Backend | Railway | ❌ | $5-10 |
| Admin Dashboard | Vercel | ✅ | Free |
| Database | MongoDB Atlas | 500MB | $9+ |
| Monitoring | Datadog | ❌ | $15 |
| **Total** | - | **$0** | **$30-40** |

*Free tier available through GitHub Education/Startup programs*

---

## 🚨 Disaster Recovery

### Backup Strategy
```bash
# Daily MongoDB backup
# Implement MongoDB auto-backup (Atlas does this)

# Code backup (Git)
git push origin main  # Always push important changes

# File backup
# Option 1: S3 versioning
# Option 2: Automated snapshots
# Option 3: Daily sync to separate bucket
```

### Recovery Procedures

**If backend down:**
1. Check logs: Railway/Heroku/AWS dashboard
2. Restart service: Railway/Heroku/ECS auto-restart
3. Manual restart: Deploy again

**If database down:**
1. Restore from latest backup
2. Point to backup database temporarily
3. Rebuild from MongoDB Atlas snapshot

**If git repo lost:**
1. Restore from GitHub backup (Settings → Backup)
2. Or rebuild from production running instance

---

## 📞 Support & Troubleshooting

### Common Issues

**"502 Bad Gateway" Error**
- Backend crashed or slow
- Check logs for errors
- Restart service
- Verify database connection

**"Cannot POST /api/..." Error**
- Backend not running
- CORS misconfigured
- Wrong API URL in admin dashboard

**"Connection to MongoDB failed"**
- MongoDB down
- Connection string wrong
- IP not whitelisted (Atlas)
- Authentication failed

### Getting Help

- Railway Support: https://support.railway.app
- Heroku Support: https://devcenter.heroku.com
- MongoDB Help: https://docs.mongodb.com
- NestJS Docs: https://docs.nestjs.com

---

## ✅ Final Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connection verified
- [ ] SSL certificate installed
- [ ] Admin credentials changed from defaults
- [ ] CORS origins configured
- [ ] File uploads directory ready
- [ ] Backup strategy in place
- [ ] Monitoring alerts configured
- [ ] DNS records pointing to services
- [ ] Security headers enabled
- [ ] Rate limiting configured
- [ ] Integration tests passed
- [ ] Admin dashboard loads
- [ ] File upload tested
- [ ] Project CRUD tested
- [ ] Custom domain working

---

**Status**: Ready for Production ✅

Deploy with confidence!

