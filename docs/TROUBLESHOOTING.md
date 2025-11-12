# VacCOVID Troubleshooting Guide

## Table of Contents
1. [Installation Issues](#installation-issues)
2. [Runtime Issues](#runtime-issues)
3. [Database Issues](#database-issues)
4. [API Issues](#api-issues)
5. [Frontend Issues](#frontend-issues)
6. [Docker Issues](#docker-issues)
7. [Deployment Issues](#deployment-issues)
8. [Performance Issues](#performance-issues)
9. [Getting Help](#getting-help)

---

## Installation Issues

### Node Modules Installation Fails

**Problem**: `npm install` fails with errors

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and lock files
rm -rf node_modules package-lock.json

# Reinstall without scripts (avoid node-sass issues)
npm install --ignore-scripts

# Retry with regular install
npm install
```

**If node-sass still fails**:
```bash
# Use legacy peer deps flag
npm install --legacy-peer-deps

# Or skip post-install scripts
npm install --ignore-scripts && npx tsc --skipLibCheck
```

### TypeScript Compilation Fails

**Problem**: `npx tsc` returns errors

**Solution**:
```bash
# Compile with skip check
npx tsc --skipLibCheck

# Check specific errors
npx tsc --noEmit

# Rebuild from scratch
rm -rf build/
npx tsc --skipLibCheck
```

**Common Error**: `Cannot find module 'typeorm'`

```bash
# Reinstall specific dependency
npm install typeorm --save

# Reinstall all
npm install --force
```

### Client Dependencies Fail

**Problem**: `npm install --prefix client` fails

**Solution**:
```bash
# Navigate to client
cd client

# Clear cache
npm cache clean --force

# Install with legacy flag
npm install --legacy-peer-deps

# Go back
cd ..
```

---

## Runtime Issues

### Application Won't Start

**Problem**: `npm start` or `npm run server` fails

**Check Logs**:
```bash
# Backend logs
npm run server 2>&1 | head -50

# Check specific port
lsof -i :5000

# Try different port
PORT=5001 npm run server
```

**Common Issues**:

1. **Port already in use**:
```bash
# Kill process on port 5000
lsof -t -i tcp:5000 | xargs kill -9

# Or use npm script
npm run justServer
```

2. **Database not running**:
```bash
# Check PostgreSQL status
psql -U postgres -c "SELECT version();"

# Start PostgreSQL
brew services start postgresql  # macOS
sudo systemctl start postgresql # Linux
```

3. **Environment variables missing**:
```bash
# Create .env file
cp .env.example .env

# Verify variables
echo $DB_HOST
echo $DB_USER
echo $DB_PASSWORD
```

### "Cannot connect to database" Error

**Problem**: Connection error at startup

**Solution**:
```bash
# 1. Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# 2. Verify credentials in .env
cat .env | grep DB_

# 3. Test connection directly
psql -h $DB_HOST -U $DB_USER -d $DB_NAME

# 4. Check connection string
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
echo $DATABASE_URL
```

**If connection still fails**:
```bash
# Reset PostgreSQL
createdb vaccovid
createuser -P vaccine_user
psql vaccovid -c "GRANT ALL ON DATABASE vaccovid TO vaccine_user"
```

---

## Database Issues

### Database Not Found

**Problem**: Error "database 'vaccovid' does not exist"

**Solution**:
```bash
# Create database
createdb vaccovid

# Verify creation
psql -l | grep vaccovid
```

### User Permission Denied

**Problem**: "permission denied for database vaccovid"

**Solution**:
```bash
# Grant permissions
psql -U postgres -d vaccovid -c "GRANT ALL PRIVILEGES ON DATABASE vaccovid TO vaccine_user"

# Grant table permissions
psql -U postgres -d vaccovid -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO vaccine_user"

# Grant sequence permissions
psql -U postgres -d vaccovid -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO vaccine_user"
```

### Tables Missing

**Problem**: Tables don't exist in database

**Solution**:
```bash
# Run initialization script
psql -U postgres -d vaccovid -f scripts/init-db.sql

# Or manually create table
psql -U postgres -d vaccovid -c "CREATE TABLE IF NOT EXISTS country (id SERIAL PRIMARY KEY, code VARCHAR(3), name VARCHAR(255))"

# Verify tables
psql -U postgres -d vaccovid -c "\dt"
```

### Data Corruption or Missing Data

**Problem**: Data doesn't match expectations

**Solution**:
```bash
# Verify data integrity
psql -U postgres -d vaccovid -c "SELECT COUNT(*) FROM country"

# Check specific table
psql -U postgres -d vaccovid -c "SELECT COUNT(*) FROM covid_report WHERE country_code = 'USA'"

# Restore from backup
psql -U postgres -d vaccovid < backup.sql
```

### Query Slowness

**Problem**: Database queries are slow

**Solution**:
```bash
# 1. Check missing indexes
SELECT * FROM pg_stat_user_indexes WHERE idx_scan = 0;

# 2. Add indexes
psql -U postgres -d vaccovid -c "CREATE INDEX idx_covid_date ON covid_report(date)"

# 3. Analyze table statistics
psql -U postgres -d vaccovid -c "ANALYZE covid_report"

# 4. Check query plan
psql -U postgres -d vaccovid -c "EXPLAIN SELECT * FROM covid_report WHERE country_id = 1"
```

---

## API Issues

### Endpoint Returns 404

**Problem**: API endpoint not found

**Check Endpoint**:
```bash
# Test endpoint
curl -v http://localhost:5000/api/npm-covid-data/world

# Check routes are registered
# Edit app/src/routes/index.ts

# List all routes
grep "app.use" app/src/routes/index.ts
```

### Endpoint Returns 500 Error

**Problem**: Server error when calling API

**Solution**:
```bash
# Check backend logs
npm run server 2>&1 | tail -100

# Test with curl for more details
curl -v http://localhost:5000/api/npm-covid-data/countries

# Check if TypeScript compiled
ls -la build/src/routes/

# If not, recompile
npx tsc --skipLibCheck && npm run server
```

### CORS Error

**Problem**: "Access to XMLHttpRequest blocked by CORS policy"

**Solution**:
```bash
# CORS should already be enabled in Express
# Check app/index.ts has:
# app.use(cors());

# Verify in backend logs:
npm run server 2>&1 | grep -i cors

# If missing, add to app/index.ts:
# import cors from 'cors';
# app.use(cors());
```

### Missing or Invalid Data in Response

**Problem**: API returns empty or wrong data

**Solution**:
```bash
# 1. Check database has data
psql -U postgres -d vaccovid -c "SELECT COUNT(*) FROM covid_report"

# 2. Test database query directly
psql -U postgres -d vaccovid -c "SELECT * FROM covid_report LIMIT 1"

# 3. Check route is querying correct table
# Edit app/src/routes/npmCovidData.ts

# 4. Verify TypeORM connection
# Check ormconfig.json

# 5. Restart backend
npm run server
```

---

## Frontend Issues

### React App Won't Load

**Problem**: Page shows blank or errors

**Solution**:
```bash
# Check browser console (F12)
# Look for errors

# Check if backend is running
curl http://localhost:5000/api/npm-covid-data/world

# Clear React cache
cd client
rm -rf node_modules/.cache

# Restart React development server
npm run client
```

### "Cannot GET /" Error

**Problem**: Frontend shows "Cannot GET /" message

**Solution**:
```bash
# 1. React server might not be running
npm run client

# 2. Check port 3000 is available
lsof -i :3000

# 3. If used, kill it
lsof -t -i tcp:3000 | xargs kill -9

# 4. Restart
npm run client
```

### API Requests Failing in Frontend

**Problem**: Frontend can't connect to backend API

**Solution**:
```bash
# 1. Check backend is running
curl http://localhost:5000/api/npm-covid-data/world

# 2. Check REACT_APP_API_URL
# Edit .env or client/.env
echo $REACT_APP_API_URL

# 3. Check setupProxy.js
cat client/setupProxy.js

# 4. Verify API URL in Redux actions
grep "REACT_APP_API_URL" client/src/actions/*.js

# 5. Restart frontend
npm run client
```

### Components Not Rendering

**Problem**: Component shows blank or missing data

**Solution**:
```bash
# 1. Check browser console for errors (F12)
# 2. Open Redux DevTools (install extension)
# 3. Check Redux state is updating
# 4. Check API is returning data

curl http://localhost:5000/api/npm-covid-data/countries | jq '.' | head -50
```

### Styling Issues

**Problem**: CSS not applied or styles broken

**Solution**:
```bash
# Clear browser cache
# Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

# Recompile SCSS
npm run watch:sass

# Clear Node cache
cd client
rm -rf node_modules/.cache
npm install
```

---

## Docker Issues

### Image Build Fails

**Problem**: `docker build` returns errors

**Solution**:
```bash
# Clear Docker cache
docker system prune -a

# Build with no cache
docker build --no-cache -t vaccovid:latest .

# Check specific layer
docker build --progress=plain -t vaccovid:latest .

# View detailed error output
docker build 2>&1 | tail -100
```

### Container Won't Start

**Problem**: `docker run` fails or container exits

**Solution**:
```bash
# Check container logs
docker logs <container-id>

# Run with interactive terminal
docker run -it vaccovid:latest /bin/bash

# Test healthcheck
docker inspect --format='{{.State.Health.Status}}' <container-id>
```

### Port Conflicts

**Problem**: "port already in use"

**Solution**:
```bash
# Find process on port
lsof -i :5000

# Kill process
kill -9 <PID>

# Use different port
docker run -p 5001:5000 vaccovid:latest

# Check Docker port mappings
docker ps
```

### Docker Compose Fails

**Problem**: `docker-compose up` fails

**Solution**:
```bash
# Check docker-compose.yml syntax
docker-compose config

# View service logs
docker-compose logs

# View specific service
docker-compose logs vaccovid-app

# Rebuild services
docker-compose up --build

# Clean and rebuild
docker-compose down -v && docker-compose up
```

### Database Connection in Docker

**Problem**: App can't connect to database in Docker Compose

**Solution**:
```bash
# Use service name as hostname (not localhost)
# DB_HOST=postgres (not 127.0.0.1)

# Check docker-compose.yml:
# DB_HOST: postgres

# Test connection from app container
docker-compose exec vaccovid-app \
  psql -h postgres -U vaccine_user -d vaccovid -c "SELECT 1"

# View network
docker-compose exec vaccovid-app \
  nslookup postgres
```

---

## Deployment Issues

### Kubernetes Pod Won't Start

**Problem**: Pod stuck in Pending/CrashLoopBackOff

**Solution**:
```bash
# Check pod status
kubectl describe pod <pod-name> -n vaccovid

# View pod logs
kubectl logs <pod-name> -n vaccovid

# Check resource availability
kubectl describe nodes

# Check PVC status
kubectl get pvc -n vaccovid

# Check image pull
kubectl get events -n vaccovid --sort-by='.lastTimestamp'
```

### Services Can't Communicate

**Problem**: Pods can't reach each other

**Solution**:
```bash
# Check service
kubectl get svc -n vaccovid

# Test DNS
kubectl run -it --rm debug --image=busybox --restart=Never -- \
  nslookup vaccovid-backend.vaccovid.svc.cluster.local

# Check NetworkPolicy
kubectl get networkpolicy -n vaccovid

# Test connectivity
kubectl exec -it <pod-name> -n vaccovid -- \
  curl http://vaccovid-backend:5000/api/npm-covid-data/world
```

### Database Not Persisting

**Problem**: Data lost after pod restart

**Solution**:
```bash
# Check PVC
kubectl get pvc -n vaccovid

# Check PV
kubectl get pv

# Check storage class
kubectl get storageclass

# Verify mount in pod
kubectl exec -it <pod-name> -n vaccovid -- \
  mount | grep /data
```

---

## Performance Issues

### Application Slow

**Problem**: Pages load slowly or API is slow

**Solution**:
```bash
# Check server load
top
docker stats

# Check network latency
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:5000/api/npm-covid-data/countries

# Check query performance
EXPLAIN ANALYZE SELECT * FROM covid_report WHERE country_id = 1;

# Add indexes
psql -U postgres -d vaccovid -c "CREATE INDEX idx_covid_country_date ON covid_report(country_id, date)"
```

### Memory Leaks

**Problem**: Application memory keeps growing

**Solution**:
```bash
# Monitor memory
docker stats --no-stream

# Check for large queries
psql -U postgres -d vaccovid -c "SELECT COUNT(*) FROM covid_report"

# Check Node.js memory
docker exec <container-id> node --version
# Consider increasing heap size
NODE_OPTIONS=--max-old-space-size=2048 npm start
```

### High CPU Usage

**Problem**: CPU always at 100%

**Solution**:
```bash
# Check processes
docker top <container-id>

# Check database
psql -U postgres -d vaccovid -c "SELECT * FROM pg_stat_statements WHERE calls > 1000 ORDER BY mean_time DESC"

# Check indexes
psql -U postgres -d vaccovid -c "SELECT schemaname, tablename, indexname, idx_scan FROM pg_stat_user_indexes WHERE idx_scan = 0"
```

---

## Getting Help

### Check Logs

```bash
# Backend logs
npm run server 2>&1 | head -200

# Frontend logs
npm run client 2>&1 | head -200

# Docker logs
docker-compose logs -f

# Kubernetes logs
kubectl logs -f <pod-name> -n vaccovid
```

### Gather Diagnostics

```bash
# System info
uname -a
node --version
npm --version
docker --version

# Network info
netstat -an | grep -E ":(5000|3000|5432)"
curl -v http://localhost:5000/api/npm-covid-data/world

# Database info
psql -U postgres -c "SELECT version()"
```

### Resources

- **Node.js Issues**: https://nodejs.org/en/docs/
- **Express Debugging**: https://expressjs.com/en/guide/debugging.html
- **React DevTools**: https://github.com/facebook/react-devtools
- **Docker Help**: https://docs.docker.com/
- **Kubernetes Troubleshooting**: https://kubernetes.io/docs/tasks/debug-application-cluster/
- **PostgreSQL Help**: https://www.postgresql.org/docs/

### Reporting Issues

When reporting a bug, include:

1. **Error message**: Full error text
2. **Steps to reproduce**: Exact steps that cause issue
3. **Environment**: OS, Node version, Docker version, etc.
4. **Logs**: Relevant log output (see "Check Logs" above)
5. **Diagnostics**: Output from "Gather Diagnostics" above

---

*Last Updated: November 2025*
