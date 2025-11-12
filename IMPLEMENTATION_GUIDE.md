# 🎯 Implementation & Troubleshooting Guide

**Status**: Phase 5 In Progress  
**Version**: 1.0  
**Last Updated**: November 3, 2025

---

## Overview

This guide provides step-by-step instructions to complete Phase 5 (Testing & Deployment Setup) and handle common issues encountered during the VacCOVID migration project.

---

## Part 1: Quick Start

### The Minimum You Need to Do Right Now

If you just want to get the app running with test data:

#### Step 1: Minimal PostgreSQL Setup

```bash
# Install PostgreSQL (if needed)
brew install postgresql@15

# Start PostgreSQL
brew services start postgresql@15

# Create database
createdb vaccovid

# Create user
psql -U postgres -c "CREATE USER vaccovid_user WITH PASSWORD 'test123';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE vaccovid TO vaccovid_user;"
```

#### Step 2: Update Configuration

Edit `/ormconfig.json`:
```json
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "vaccovid_user",
    "password": "test123",
    "database": "vaccovid",
    "synchronize": false,
    ...
}
```

#### Step 3: Run Application

```bash
cd "/Users/armanfeili/code/Old projects/vaccovid"

# Start everything
npm start

# OR in separate terminals:
# Terminal 1:
node build/index.js

# Terminal 2:
npm start --prefix client
```

#### Step 4: Access the App

- Backend API: http://localhost:5000
- Frontend UI: http://localhost:3000
- Test endpoint: `curl http://localhost:5000/vaccines/all`

---

## Part 2: Detailed Configuration

### PostgreSQL Installation Details

#### macOS (Homebrew)

```bash
# Install
brew install postgresql@15

# Start service (auto-start on boot)
brew services start postgresql@15

# Connect to default postgres user
psql -U postgres

# Create new database
createdb vaccovid

# Create new user with password
psql -U postgres -c "CREATE USER vaccovid_user WITH PASSWORD 'your_secure_password';"

# Grant all privileges
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE vaccovid TO vaccovid_user;"

# Verify connection
psql -U vaccovid_user -d vaccovid -h localhost
# Type: \dt (should show tables)
# Type: \q (to exit)
```

#### macOS (Docker - Alternative)

```bash
# Run PostgreSQL in Docker
docker run -d \
  --name vaccovid-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=vaccovid \
  -e POSTGRES_USER=vaccovid_user \
  -p 5432:5432 \
  postgres:15

# Connection string for ormconfig.json:
# host: "localhost"
# port: 5432
# username: "vaccovid_user"
# password: "postgres"
```

#### Linux (Ubuntu/Debian)

```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Start service
sudo systemctl start postgresql

# Create database as postgres user
sudo -u postgres createdb vaccovid

# Create user
sudo -u postgres psql -c "CREATE USER vaccovid_user WITH PASSWORD 'your_password';"

# Grant privileges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE vaccovid TO vaccovid_user;"
```

---

### Configuration Files

#### File 1: ormconfig.json (Database Connection)

**Location**: `/ormconfig.json`

```json
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "vaccovid_user",        // Change this
    "password": "your_password_here",   // Change this
    "database": "vaccovid",
    "synchronize": false,                // IMPORTANT: Keep false (read-only)
    "cache": {
        "duration": 30000
    },
    "logging": false,
    "entities": [
        "build/app/src/db/models/*.js"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ]
}
```

**Critical Setting**: `"synchronize": false`
- This locks the database to read-only mode
- Prevents TypeORM from modifying the schema
- **Do NOT change this to true**

#### File 2: secretData.ts (API Keys)

**Location**: `/app/src/config/secretData.ts`

```typescript
export const secretData = {
  // News API key (optional - only needed if you want fresh news)
  apiKey: 'your_news_api_key_or_xxx',
  apiKey2: 'your_backup_api_key_or_xxx',

  // News sources (pre-configured)
  sources: [
    'abc-news',
    'bbc-news',
    // ... (already configured)
  ],
};
```

**Note**: API keys are set to 'XXX' because the app uses archived data. If you want to update news, obtain a free API key from [newsapi.org](https://newsapi.org).

---

## Part 3: Running the Application

### Option A: Development Mode (Recommended)

```bash
# Full concurrent start (backend + frontend)
npm start

# This runs:
# 1. Backend on port 5000
# 2. Frontend on port 3000
# Press Ctrl+C to stop both
```

**Expected Output**:
```
> vaccine-now@1.0.0 start
> concurrently ...

[0] ...
[1] Server running on port 5000
[2] Compiled successfully!
[2] You can now view vaccine-now in the browser.
[2] Local: http://localhost:3000
```

### Option B: Backend Only

```bash
# Terminal 1: Start backend API server
node build/index.js

# Terminal 2: Test with curl
curl http://localhost:5000/vaccines/all

# Expected: JSON array of vaccines
```

### Option C: Frontend Only (No API)

```bash
# For testing React UI without backend
npm run client

# Access: http://localhost:3000
# Note: API calls will fail, but you can see the UI structure
```

### Option D: Production Mode

```bash
# Build everything first
npm run build --prefix client
npm run build  # (if any build script defined)

# Start production server
NODE_ENV=production node build/index.js
```

---

## Part 4: Troubleshooting

### Issue 1: PostgreSQL Connection Refused

**Error**:
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Causes & Solutions**:

1. PostgreSQL not running
   ```bash
   # Start it
   brew services start postgresql@15
   
   # Verify it's running
   brew services list | grep postgres
   ```

2. Wrong credentials in ormconfig.json
   ```bash
   # Test connection manually
   psql -U vaccovid_user -d vaccovid -h localhost
   
   # If it fails, check credentials
   # Run this as postgres user:
   psql -U postgres -c "ALTER USER vaccovid_user WITH PASSWORD 'newpassword';"
   ```

3. Port 5432 blocked or in use
   ```bash
   # Check what's using port 5432
   lsof -i :5432
   
   # Kill if needed
   kill -9 <PID>
   ```

### Issue 2: Password Authentication Failed

**Error**:
```
error: password authentication failed for user "vaccovid_user"
```

**Solution**:

1. Verify correct username/password combination:
   ```bash
   # Test login
   psql -U vaccovid_user -d vaccovid -h localhost -W
   # Enter password when prompted
   ```

2. Reset password if forgotten:
   ```bash
   # As postgres user
   sudo -u postgres psql
   
   # In psql prompt
   ALTER USER vaccovid_user WITH PASSWORD 'newpassword';
   \q
   
   # Update ormconfig.json with new password
   ```

3. Check ormconfig.json matches exactly:
   ```bash
   # Verify these are identical:
   # 1. Password in ormconfig.json
   # 2. Actual PostgreSQL user password
   ```

### Issue 3: Port Already in Use

**Error**:
```
Error: listen EADDRINUSE :::3000
Error: listen EADDRINUSE :::5000
```

**Solution**:

```bash
# Kill process on port 3000
lsof -t -i tcp:3000 | xargs kill -9

# Kill process on port 5000
lsof -t -i tcp:5000 | xargs kill -9

# Or kill both at once
lsof -t -i tcp:3000,5000 | xargs kill -9

# Verify
lsof -i tcp:3000,5000
# Should return nothing
```

### Issue 4: Cannot Find Module 'pg'

**Error**:
```
Error: Cannot find module 'pg'
```

**Solution**:

```bash
# Install PostgreSQL client
npm install pg

# Or reinstall all dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue 5: TypeScript Compilation Errors

**Error**:
```
error TS2307: Cannot find module 'express'
```

**Solution**:

```bash
# Skip lib check flag
npx tsc --skipLibCheck

# Or rebuild with full install
npm install
npm run build  # if build script exists

# For manual rebuild:
npx tsc --project tsconfig.json --skipLibCheck

# Verify build was created
ls -la build/
```

### Issue 6: React Build Fails

**Error**:
```
FAIL src/App.test.js
Cannot find module './index.css'
```

**Solution**:

```bash
# The file was created in Phase 4, but may be missing
touch client/src/index.css

# Or rebuild
npm run build --prefix client --verbose

# Check output
ls -la client/build/
```

### Issue 7: API Returns 404 on Valid Endpoints

**Causes**:

1. Backend not running
   ```bash
   # Check if process exists
   ps aux | grep "node build/index.js"
   
   # Restart
   node build/index.js
   ```

2. Endpoint was removed in Phase 1-3
   ```bash
   # This is expected - removed endpoints should return 404
   # Verify it's actually removed in source:
   grep -r "PUT /vaccines" app/src/routes/
   # Should find nothing
   ```

3. Wrong port or URL
   ```bash
   # Backend should be at:
   curl http://localhost:5000/vaccines/all
   
   # Not:
   curl http://localhost:3000/vaccines/all  # Wrong port
   ```

### Issue 8: Endpoint Returns Empty Data

**Likely Cause**: Database has no data

**Solution**:

1. Check if data exists in database:
   ```bash
   # Connect to database
   psql -U vaccovid_user -d vaccovid
   
   # List tables
   \dt
   
   # Check vaccine table
   SELECT COUNT(*) FROM vaccine;
   
   # If 0, database is empty - this is expected if never populated
   \q
   ```

2. If you need test data:
   - Data should have been created during original app setup
   - If database is empty, the routes will return empty arrays
   - This is normal for an archived system

### Issue 9: Browser Shows "Cannot GET /"

**Cause**: Frontend not running on port 3000

**Solution**:

```bash
# Start frontend
npm start --prefix client

# Or if React Scripts not working:
cd client
npx react-scripts start
```

### Issue 10: CORS Errors in Browser Console

**Error**:
```
Access to XMLHttpRequest at 'http://localhost:5000/...' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Likely Cause**: CORS headers not configured in backend

**Note**: This shouldn't happen since we removed live fetching, but if it does:

```typescript
// In app/src/routes/index.ts, add CORS middleware:
import cors from 'cors';

app.use(cors());
```

---

## Part 5: Testing Procedures

### Quick Validation (5 minutes)

```bash
# 1. Start app
npm start

# 2. In another terminal, test one endpoint
curl http://localhost:5000/vaccines/all

# 3. Open browser
open http://localhost:3000

# 4. Check browser console (F12 → Console)
# Should see: 0 errors, only warnings

# 5. Look for "(Archived Data)" text
# If visible, Phase 4 UI updates are working ✅
```

### Full Validation (30 minutes)

See `PHASE_5_DEPLOYMENT_GUIDE.md` for comprehensive testing procedures including:
- All 20+ GET endpoint tests
- Verification of removed endpoints
- UI component validation
- Data integrity checks
- Performance baseline measurement

---

## Part 6: Development Workflow

### Making Changes

If you need to modify the backend code:

```bash
# 1. Edit TypeScript files in app/src/
vim app/src/routes/vaccine.ts

# 2. Recompile TypeScript
npx tsc --project tsconfig.json --skipLibCheck

# 3. Restart backend
# Press Ctrl+C in backend terminal
# Run: node build/index.js

# 4. Test changes
curl http://localhost:5000/vaccines/all
```

### Making Frontend Changes

```bash
# 1. Edit React files in client/src/
vim client/src/App.js

# 2. Frontend hot-reloads automatically
# Changes should appear in browser immediately

# 3. If not, refresh browser (Cmd+R)

# 4. Build for production
npm run build --prefix client
```

---

## Part 7: Environment Variables

### Using .env File

Create `/app/.env` for backend configuration:

```
NODE_ENV=development
PORT=5000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=vaccovid_user
DATABASE_PASSWORD=your_password
DATABASE_NAME=vaccovid
NEWS_API_KEY=xxx
```

Then update code to use them:

```typescript
// app/src/index.ts
const db_host = process.env.DATABASE_HOST || 'localhost';
const db_user = process.env.DATABASE_USER || 'postgres';
```

### Using .env for Frontend

Create `/client/.env`:

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

Then use in React:

```javascript
// client/src/App.js
const API_URL = process.env.REACT_APP_API_URL;
```

---

## Part 8: Deployment Preparation Checklist

Before deploying to production:

- [ ] **Database**: PostgreSQL running, data populated, backups created
- [ ] **Backend**: All endpoints tested, 0 errors, built successfully
- [ ] **Frontend**: All components tested, built (1.15 MB gzipped), no console errors
- [ ] **Environment**: .env configured for production
- [ ] **Security**: API keys secured, no credentials in git
- [ ] **Testing**: Full test suite passed (see PHASE_5_DEPLOYMENT_GUIDE.md)
- [ ] **Documentation**: All procedures documented
- [ ] **Monitoring**: Error logging configured (optional)

---

## Part 9: Next Steps

### Phase 5 Completion
1. Follow Part 1 (Quick Start) to get app running locally
2. Follow Part 5 (Testing Procedures) to validate everything works
3. Document any issues in testing report

### Phase 6 (Infrastructure)
1. Choose deployment platform (Netlify, Vercel, AWS, etc.)
2. Set up environment variables and secrets
3. Configure CI/CD pipeline (GitHub Actions)
4. Deploy to staging environment

### Phase 7-10 (Production)
1. Security audit and dependency checks
2. Performance optimization
3. Production deployment
4. Monitoring and maintenance

---

## Quick Reference Commands

```bash
# PostgreSQL
brew services start postgresql@15
psql -U vaccovid_user -d vaccovid
\dt                    # List tables
SELECT COUNT(*) FROM vaccine;  # Count records

# Node/NPM
npm install            # Install all dependencies
npm start              # Start app (backend + frontend)
npm run client         # Start frontend only
node build/index.js    # Start backend only

# Building
npm run build --prefix client  # Build React
npx tsc --skipLibCheck        # Build TypeScript

# Testing
curl http://localhost:5000/vaccines/all
open http://localhost:3000

# Cleanup
lsof -t -i tcp:3000,5000 | xargs kill -9
rm -rf node_modules package-lock.json
npm install

# Git
git status
git add .
git commit -m "Phase 5: Testing setup"
git push
```

---

## Support

**For issues**:
1. Check the Troubleshooting section (Part 4)
2. See PHASE_5_DEPLOYMENT_GUIDE.md for detailed procedures
3. Check error logs in terminal output
4. Review browser console (F12) for client-side errors

**For documentation**:
- IMPLEMENTATION_SUMMARY.md - Technical overview
- DEPRECATED_FUNCTIONS.md - What was removed
- QUICK_START.md - Getting started guide
- PROJECT_STATUS.txt - Current status

---

*Last Updated: November 3, 2025*  
*Version: 1.0*  
*Status: Ready to Use*
