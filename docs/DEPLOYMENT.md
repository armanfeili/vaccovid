# VacCOVID Deployment Guide

## Table of Contents
1. [Deployment Overview](#deployment-overview)
2. [Local Development](#local-development)
3. [Docker Deployment](#docker-deployment)
4. [Kubernetes Deployment](#kubernetes-deployment)
5. [Helm Deployment](#helm-deployment)
6. [Cloud Platform Deployment](#cloud-platform-deployment)
7. [Production Checklist](#production-checklist)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Troubleshooting](#troubleshooting)

---

## Deployment Overview

VacCOVID can be deployed in multiple environments using different tools:

| Environment | Method | Complexity | Scale |
|------------|--------|-----------|-------|
| **Local** | Docker Compose | ⭐ | Single machine |
| **Production** | Docker | ⭐⭐ | Single/Multiple servers |
| **Enterprise** | Kubernetes | ⭐⭐⭐ | Cloud-scale |
| **Advanced** | Helm | ⭐⭐⭐⭐ | Enterprise |
| **Serverless** | Vercel/Netlify | ⭐ | Frontend only |
| **Platform** | Heroku/Railway | ⭐⭐ | Full stack |

---

## Local Development

### Prerequisites
- Docker and Docker Compose installed
- Port 5000 and 3000 available
- 2GB RAM minimum

### Quick Start

```bash
# Clone repository
git clone https://gitlab.com/vacovid/vaccine-now.git
cd vaccine-now

# Start with Docker Compose
docker-compose up

# Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Database: localhost:5432
```

### Configuration

**`.env` file** (create from example):
```env
# Backend
NODE_ENV=development
PORT=5000
LOG_LEVEL=debug

# Database
DB_HOST=postgres
DB_PORT=5432
DB_USER=vaccine_user
DB_PASSWORD=vaccine_password
DB_NAME=vaccovid

# Frontend
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Accessing Services

```bash
# Frontend
open http://localhost:3000

# Backend API
curl http://localhost:5000/api/npm-covid-data/world

# Database
psql -h localhost -U vaccine_user -d vaccovid
```

### Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f vaccovid-app
```

---

## Docker Deployment

### Build Docker Image

```bash
# Build image
docker build -t vaccovid:latest .

# Build with tag
docker build -t vaccovid:1.0.0 .

# Build without cache
docker build --no-cache -t vaccovid:latest .
```

### Run Docker Container

```bash
# Basic run
docker run -p 5000:5000 -p 3000:3000 vaccovid:latest

# With environment variables
docker run -p 5000:5000 -p 3000:3000 \
  -e DB_HOST=postgres.example.com \
  -e DB_USER=vaccine_user \
  -e DB_PASSWORD=password \
  vaccovid:latest

# With volumes
docker run -p 5000:5000 -p 3000:3000 \
  -v /data/vaccovid:/app/data \
  vaccovid:latest

# Background mode
docker run -d -p 5000:5000 -p 3000:3000 \
  --name vaccovid \
  vaccovid:latest
```

### Docker Compose File

**`docker-compose.yml`**:
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:13
    environment:
      POSTGRES_USER: vaccine_user
      POSTGRES_PASSWORD: vaccine_password
      POSTGRES_DB: vaccovid
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  vaccovid-app:
    build: .
    ports:
      - "5000:5000"
      - "3000:3000"
    environment:
      NODE_ENV: production
      DB_HOST: postgres
      DB_USER: vaccine_user
      DB_PASSWORD: vaccine_password
      DB_NAME: vaccovid
    depends_on:
      - postgres
    volumes:
      - ./client/build:/app/client/build

volumes:
  postgres_data:
```

### Docker Commands

```bash
# List images
docker images

# List running containers
docker ps

# View container logs
docker logs <container-id>

# Follow logs
docker logs -f <container-id>

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# Remove image
docker rmi vaccovid:latest

# Clean up unused resources
docker system prune -a
```

---

## Kubernetes Deployment

### Prerequisites

```bash
# Check kubectl installed
kubectl version --client

# Check cluster access
kubectl cluster-info

# Check nodes
kubectl get nodes
```

### Deploy to Kubernetes

**Step 1: Create Namespace**
```bash
kubectl create namespace vaccovid
```

**Step 2: Apply ConfigMap**
```bash
kubectl apply -f k8s/configmap.yaml -n vaccovid
```

**Step 3: Apply Database**
```bash
kubectl apply -f k8s/postgres.yaml -n vaccovid

# Wait for postgres to be ready
kubectl wait --for=condition=ready pod \
  -l app=postgres -n vaccovid --timeout=300s
```

**Step 4: Apply Deployments**
```bash
kubectl apply -f k8s/deployment.yaml -n vaccovid

# Wait for deployments
kubectl rollout status deployment/vaccovid-backend -n vaccovid
kubectl rollout status deployment/vaccovid-frontend -n vaccovid
```

**Step 5: Apply Ingress**
```bash
kubectl apply -f k8s/ingress.yaml -n vaccovid
```

### Verify Deployment

```bash
# Check pods
kubectl get pods -n vaccovid

# Check services
kubectl get svc -n vaccovid

# Check ingress
kubectl get ingress -n vaccovid

# Check deployments
kubectl get deployment -n vaccovid

# View pod logs
kubectl logs -f <pod-name> -n vaccovid

# Describe pod for errors
kubectl describe pod <pod-name> -n vaccovid
```

### Access Application

```bash
# Port forward to backend
kubectl port-forward -n vaccovid svc/vaccovid-backend 5000:5000

# Port forward to frontend
kubectl port-forward -n vaccovid svc/vaccovid-frontend 3000:3000

# Access via ingress
curl http://vaccovid.example.com
```

### Kubernetes Configuration

**`k8s/deployment.yaml` highlights**:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vaccovid-backend
  namespace: vaccovid
spec:
  replicas: 3
  selector:
    matchLabels:
      app: vaccovid-backend
  template:
    metadata:
      labels:
        app: vaccovid-backend
    spec:
      containers:
      - name: vaccovid
        image: vaccovid:latest
        ports:
        - containerPort: 5000
        env:
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: vaccovid-config
              key: db_host
        resources:
          requests:
            cpu: 250m
            memory: 512Mi
          limits:
            cpu: 500m
            memory: 1Gi
        livenessProbe:
          httpGet:
            path: /api/npm-covid-data/world
            port: 5000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/npm-covid-data/world
            port: 5000
          initialDelaySeconds: 10
          periodSeconds: 5
```

### Scaling

```bash
# Scale deployment
kubectl scale deployment vaccovid-backend --replicas=5 -n vaccovid

# Auto-scaling (HPA)
kubectl get hpa -n vaccovid
kubectl describe hpa vaccovid-backend -n vaccovid
```

### Updates

```bash
# Update image
kubectl set image deployment/vaccovid-backend \
  vaccovid=vaccovid:1.1.0 -n vaccovid

# Check rollout status
kubectl rollout status deployment/vaccovid-backend -n vaccovid

# Rollback if needed
kubectl rollout undo deployment/vaccovid-backend -n vaccovid
```

---

## Helm Deployment

### Prerequisites

```bash
# Install Helm
brew install helm  # macOS
# or
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Verify
helm version
```

### Deploy with Helm

**Step 1: Update Values**

Edit `helm/vaccovid/values.yaml`:
```yaml
image:
  repository: vaccovid
  tag: latest
  pullPolicy: IfNotPresent

backend:
  replicaCount: 3
  service:
    type: ClusterIP
    port: 5000

frontend:
  replicaCount: 2
  service:
    type: ClusterIP
    port: 3000

postgresql:
  enabled: true
  auth:
    username: vaccine_user
    password: vaccine_password
    database: vaccovid

ingress:
  enabled: true
  hosts:
    - host: vaccovid.example.com
      paths:
        - path: /
```

**Step 2: Install Release**
```bash
# Install
helm install vaccovid ./helm/vaccovid -n vaccovid --create-namespace

# Or upgrade (install if not exists)
helm upgrade --install vaccovid ./helm/vaccovid -n vaccovid --create-namespace
```

**Step 3: Verify**
```bash
# List releases
helm list -n vaccovid

# Get release info
helm status vaccovid -n vaccovid

# View generated manifests
helm template vaccovid ./helm/vaccovid
```

### Helm Commands

```bash
# Get values
helm get values vaccovid -n vaccovid

# Update values
helm upgrade vaccovid ./helm/vaccovid \
  --set backend.replicaCount=5 \
  -n vaccovid

# Rollback
helm rollback vaccovid -n vaccovid

# Uninstall
helm uninstall vaccovid -n vaccovid

# Package chart
helm package ./helm/vaccovid
```

---

## Cloud Platform Deployment

### Vercel (Frontend Only)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel

# Follow prompts for configuration
```

**`vercel.json`**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "env": {
    "REACT_APP_API_URL": "@api_url"
  }
}
```

### Netlify (Frontend Only)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd client
netlify deploy --prod --dir=build
```

**`netlify.toml`**:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/api/*"
  to = "https://api.example.com/:splat"
  status = 200
```

### Heroku (Full Stack)

```bash
# Install Heroku CLI
brew install heroku

# Login
heroku login

# Create app
heroku create vaccovid-app

# Add PostgreSQL
heroku addons:create heroku-postgresql:standard-0

# Deploy
git push heroku main

# View logs
heroku logs --tail

# Access
heroku open
```

**`Procfile`**:
```
web: npm start
```

### Railway (Full Stack)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# View logs
railway logs
```

### Render (Full Stack)

1. Connect GitHub repository
2. Create new Web Service
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add PostgreSQL database
6. Deploy

---

## Production Checklist

### Pre-Deployment

- [ ] Code reviewed and tested locally
- [ ] All dependencies updated
- [ ] No security vulnerabilities (`npm audit`)
- [ ] Environment variables configured
- [ ] Database backed up
- [ ] SSL/TLS certificate obtained

### Deployment

- [ ] Infrastructure provisioned
- [ ] Database migrations run
- [ ] Application deployed
- [ ] Health checks passing
- [ ] All endpoints responding
- [ ] Frontend loads correctly
- [ ] Database connection working

### Post-Deployment

- [ ] Monitor logs for errors
- [ ] Test all major features
- [ ] Verify data integrity
- [ ] Confirm SSL certificate
- [ ] Test failover procedures
- [ ] Document any issues
- [ ] Update status page

### Ongoing

- [ ] Monitor application performance
- [ ] Review logs daily
- [ ] Update dependencies monthly
- [ ] Backup database regularly
- [ ] Test disaster recovery
- [ ] Keep documentation current

---

## Monitoring & Maintenance

### Logs

```bash
# View application logs
docker logs vaccovid-app

# Follow logs
docker logs -f vaccovid-app

# View logs with timestamp
docker logs --timestamps vaccovid-app

# View last 100 lines
docker logs --tail 100 vaccovid-app
```

### Health Checks

```bash
# Check backend
curl http://localhost:5000/api/npm-covid-data/world

# Check frontend
curl http://localhost:3000

# Check database
psql -h localhost -U vaccine_user -d vaccovid -c "SELECT 1"
```

### Backups

```bash
# Backup PostgreSQL
pg_dump -h localhost -U vaccine_user vaccovid > backup.sql

# Restore from backup
psql -h localhost -U vaccine_user vaccovid < backup.sql

# Backup in Docker
docker exec vaccovid-postgres pg_dump -U vaccine_user vaccovid > backup.sql
```

### Updates

```bash
# Update dependencies
npm update
npm audit fix

# Update container image
docker pull vaccovid:latest
docker-compose up

# Update Kubernetes deployment
kubectl set image deployment/vaccovid-backend \
  vaccovid=vaccovid:new-tag
```

---

## Troubleshooting

### Application Won't Start

```bash
# Check logs
docker logs vaccovid-app

# Check ports
lsof -i :5000
lsof -i :3000

# Check environment
docker exec vaccovid-app env

# Rebuild
docker build --no-cache -t vaccovid:latest .
```

### Database Connection Error

```bash
# Check database
docker exec vaccovid-postgres psql -U vaccine_user -d vaccovid -c "SELECT 1"

# Check connection string
echo "postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

# Restart database
docker restart vaccovid-postgres
```

### Port Already in Use

```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>

# Change port in config
# Edit docker-compose.yml or env variables
```

### High Memory Usage

```bash
# Check memory
docker stats

# Check Node.js processes
docker exec vaccovid-app ps aux

# Increase memory limit
# Edit docker-compose.yml
```

### Application Slow

```bash
# Check database
EXPLAIN ANALYZE SELECT ...

# Check indexes
SELECT * FROM pg_stat_user_indexes;

# Check application metrics
docker stats

# Scale up
docker-compose up --scale backend=3
```

---

## Security Best Practices

### Docker

```dockerfile
# Use specific base image version
FROM node:16.13.0-alpine

# Run as non-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Remove sensitive files
RUN rm -rf /app/.env
```

### Environment Variables

```bash
# Never commit secrets
echo ".env" >> .gitignore

# Use secret management
# Kubernetes Secrets
# Docker Secrets
# Cloud provider secrets
```

### Network

```yaml
# Kubernetes NetworkPolicy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: vaccovid-policy
spec:
  podSelector:
    matchLabels:
      app: vaccovid-backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: vaccovid-frontend
```

---

## Performance Optimization

### Frontend

```bash
# Build optimization
npm run build --prefix client

# Results in:
# - Minified code
# - Tree shaking
# - Code splitting
# - Source maps removed
```

### Backend

```typescript
// Add caching
const cache = new Map();

app.get('/api/endpoint', (req, res) => {
  const cached = cache.get(req.path);
  if (cached) return res.json(cached);
  
  // Fetch data
  const data = fetchData();
  cache.set(req.path, data);
  res.json(data);
});
```

### Database

```sql
-- Add indexes
CREATE INDEX idx_country_code ON covid_report(country_code);
CREATE INDEX idx_date ON covid_report(date);
CREATE INDEX idx_vaccine_platform ON vaccine(platform);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM covid_report WHERE country_code = 'US';
```

---

*Last Updated: November 2025*
