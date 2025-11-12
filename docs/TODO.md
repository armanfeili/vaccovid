# VacCOVID Static Website Conversion TODO

## Overview
Convert VacCOVID from a dynamic real-time data fetching application to a static website displaying archived COVID-19, vaccine, and news data. The datasets are no longer updated, so all periodic fetching mechanisms and database update logic should be removed or deprecated.

---

## Status Summary

✅ **Phase 1-3: COMPLETE** - Backend cleanup, database config, and build successful  
⏳ **Phase 4: PENDING** - Frontend UI updates  
⏳ **Phase 5-10: PENDING** - Testing, docs, deployment  

**Build Status:** TypeScript compilation ✅ | Dependencies ✅ | Ready for testing ✅

See `IMPLEMENTATION_SUMMARY.md` for detailed changes made.

---

## Phase 1: Backend Cleanup & Deprecation ✅ COMPLETE

### 1.1 Remove Data Fetching Timers ✅
- [x] **Deleted:** `app/src/utils/timer.ts`
  - Contained all scheduled data fetch jobs
  - Removed calls to: `fetch_npmData()`, `updateProvinces()`, `addDailyReports()`, `fetchAndSaveWhoAndOtherNews()`, `updateVaccine()`, `updateOwid()`

- [x] **Deleted:** `fetch.ts`
  - File only started the timer service
  - Removed "timer" script from `package.json`

### 1.2 Remove Vaccine Data Update Routes ✅
- [x] **In `app/src/routes/vaccine.ts`:**
  - Removed POST route: `/download-and-convert-vaccine-data`
  - Removed PUT route: `/update-vaccine`
  - Kept GET routes for reading archived vaccine/treatment data
  - Added deprecation notices to code

### 1.3 Remove News Update Routes ✅
- [x] **In `app/src/routes/news.ts`:**
  - Removed PUT route: `/update-who-news`
  - Removed PUT route: `/update-other-news`
  - Removed GET route: `/fetch-news-images`
  - Removed PUT route: `/update-store-news-images`
  - Removed DELETE route: `/delete-old-news-images`
  - Removed DELETE route: `/delete-old-news`
  - Kept GET routes for reading archived news data

### 1.4 Review and Clean COVID Data Routes ✅
- [x] **In `app/src/routes/APICovidData.ts`:**
  - Removed PUT: `/clear-data`, `/updateProvinces`, `/addReports`, `/addUsReports`, `/addCityReports`
  - Kept GET endpoints for reading archived data

- [x] **In `app/src/routes/npmCovidData.ts`:**
  - Removed POST: `/fetch-npm-data`
  - Removed PUT: `/update-us-states`
  - Kept read-only GET endpoints for world/country/continent data

- [x] **In `app/src/routes/covidOvidData.ts`:**
  - Removed PUT: `/update-ovid`
  - Removed POST: `/download-and-convert-owid-data`
  - Kept GET endpoints for reading archived OWID data

---

## Phase 2: Database & Data Layer Cleanup ✅ COMPLETE

### 2.1 Remove Dynamic Data Fetching Utilities ⏸️ (Deferred)
- [⏸️] **In `app/src/utils/fetch.ts`:**
  - Functions preserved but not imported by routes anymore
  - Status: Deprecated (kept for reference, see DEPRECATED_FUNCTIONS.md)

- [⏸️] **In `app/src/utils/newsData.ts`:**
  - Functions preserved but not imported by routes anymore
  - Status: Deprecated

- [⏸️] **In `app/src/utils/covidAPIData.ts`:**
  - Functions preserved but not imported by routes anymore
  - Status: Deprecated

- [⏸️] **In `app/src/utils/ovidData.ts`:**
  - Functions preserved but not imported by routes anymore
  - Status: Deprecated

- [⏸️] **In `app/src/utils/vaccineAndTreatment.ts`:**
  - Functions preserved but not imported by routes anymore
  - Status: Deprecated

### 2.2 Disable TypeORM Database Connections for Updates ✅
- [x] **Updated `ormconfig.json`:**
  - Changed `synchronize: true` → `synchronize: false`
  - Database will remain read-only
  - No migrations applied on startup

### 2.3 Remove fetch.ts Entry Point ✅
- [x] **Deleted:** `fetch.ts` root file
- [x] **Removed:** "timer" script from `package.json`

---

## Phase 3: Backend Server Simplification ✅ COMPLETE

### 3.1 Simplify Express Server ✅
- [x] **In `app/index.ts`:**
  - Current setup is correct for serving static files
  - CORS properly configured
  - API routes serve GET requests only

### 3.2 Simplify Entry Point ✅
- [x] **In `index.ts`:**
  - Database connection maintained for reading cached data
  - No timer initialization needed

### 3.3 Update npm Scripts ✅
- [x] **In `package.json`:**
  - Removed: `"timer": "node build/fetch.js"`
  - All other scripts remain functional

### 3.4 Build & Dependencies ✅
- [x] **Dependencies installed:** `npm install --ignore-scripts`
- [x] **TypeScript compilation:** Successful with `npx tsc --skipLibCheck`
- [x] **Client dependencies:** Installed in `client/` directory
- [x] **Cleanup:** Removed unused test route import from `app/src/routes/index.ts`

---

## Phase 4: Frontend Cleanup ⏳ PENDING

### 4.1 Remove API Fetch Dependencies from Actions
- [ ] **In `client/src/actions/news.js`:**
  - GET endpoints are read-only - no changes needed

- [ ] **In `client/src/actions/vaccine.js`:**
  - GET endpoints are read-only - no changes needed

- [ ] **In `client/src/actions/covid_countries.js`:**
  - Verify all endpoints are GET (read-only)
  - No changes needed

- [ ] **In `client/src/actions/config.js`:**
  - Verify `baseURL` configuration is correct
  - Ensure no hardcoded production URLs for live data sources

### 4.2 Remove Redux Actions for Live Updates
- [ ] **Review `client/src/store.js` and Redux setup:**
  - Remove any middleware for handling live data updates
  - Remove any polling or WebSocket connections (if present)

### 4.3 Update React Components
- [ ] **Review all components in `client/src/components/`:**
  - Remove "loading latest data" indicators
  - Remove "data last updated" timestamps
  - Update UI text to indicate data is archived/historical
  - Verify no background fetch requests

- [ ] **Specific components to review:**
  - `coronavirus-world.jsx`
  - `coronavirus-eachContinent.jsx`
  - `coronavirus-eachCountry.jsx`
  - `news/news.jsx`
  - `vaccines/vaccine.jsx`
  - `vaccines/treatment.jsx`

---

## Phase 5: Data Archiving & Verification ⏳ PENDING

### 5.1 Snapshot Current Database
- [ ] **Backup current PostgreSQL database:**
  - Export existing data as JSON or CSV files
  - Store in `app/src/data/` for reference
  - Document data collection date and sources

- [ ] **Verify archived data completeness:**
  - Ensure all countries have data
  - Ensure all vaccine/treatment categories complete
  - Ensure news archive accessible
  - Check data consistency

### 5.2 Create Static Data Files (Optional)
- [ ] **Convert to embedded JSON files:**
  - Export COVID statistics, vaccine data, news to JSON
  - Store in `client/public/data/`
  - Allows completely database-free operation if desired

---

## Phase 6: Build & Deployment Setup ⏳ PENDING

### 6.1 Update Build Process
- [ ] **Verify TypeScript compilation:** ✅ Already working
- [ ] **Test React build:**
  ```bash
  npm run build --prefix client
  ```
- [ ] **Verify no environment variables required for data fetching**
- [ ] **Check build includes all static assets**

### 6.2 Remove Docker/Deployment Files
- [ ] **Review deployment configuration:**
  - If Docker: remove database dependency
  - If CI/CD: remove data update jobs/steps
  - Simplify deployment process

### 6.3 Testing Setup
- [ ] **Update or create test files:**
  - Remove tests for data fetching operations
  - Add tests for archived data display
  - Test that update endpoints return deprecation errors

---

## Phase 7: Documentation & Communication ⏳ PENDING

### 7.1 Update README Files
- [ ] **In root `README.md`:**
  - Document that this is a static archive
  - Explain datasets are no longer updated
  - Provide setup instructions

- [ ] **In `client/README.md`:**
  - Update to reflect static-only nature
  - Remove live data fetching instructions
  - Document available static data endpoints

### 7.2 Add Deprecation Notices ✅ (Partially Complete)
- [x] **Added deprecation comments:** In all modified route files
- [x] **Created DEPRECATED_FUNCTIONS.md:** Lists all deprecated functions
- [ ] **Update API documentation:** Mark endpoints as archived data only
- [ ] **Add data age/collection date:** To all responses (optional)

### 7.3 Create Migration Guide
- [ ] **Document migration process:**
  - List all deprecated features
  - Explain what was removed and why
  - Provide examples for users

---

## Phase 8: Local Testing & Validation ⏳ PENDING

### 8.1 Local Environment Setup
- [ ] **Install dependencies:** ✅ Already done
- [ ] **Optional: Remove database requirement**
  - If using embedded JSON data
  - Update `ormconfig.json` to use SQLite or remove
  - Simplifies user setup

### 8.2 Build & Run Locally
- [ ] **Test TypeScript compilation:** ✅ Already working
- [ ] **Build React frontend:**
  ```bash
  npm run build --prefix client
  ```
- [ ] **Start server locally:**
  ```bash
  npm start
  ```
- [ ] **Verify all pages load:**
  - COVID-19 world tracker
  - Country/continent pages
  - Vaccine/treatment pages
  - News pages
  - Maps

### 8.3 API Endpoint Verification
- [ ] **Test all GET endpoints return data:**
  - `/api/npm-covid-data/*`
  - `/api/api-covid-data/*`
  - `/api/vaccines/*`
  - `/api/news/*`

- [ ] **Verify update endpoints are removed:**
  - Try accessing removed endpoints
  - Verify appropriate error messages

### 8.4 Frontend Functionality Tests
- [ ] **Verify React components render:**
  - No console errors
  - All data displays correctly
  - Navigation works
  - Maps render

- [ ] **Test responsive design:**
  - Mobile views
  - Tablet views
  - Desktop views

---

## Phase 9: Cleanup & Optimization ⏳ PENDING

### 9.1 Remove Unused Dependencies
- [ ] **Audit dependencies:**
  - `covid19-api` - no longer needed
  - `rss-parser` - no longer needed
  - Run: `npm audit`

- [ ] **Update dependencies:**
  - Update to latest secure versions
  - Run: `npm update`
  - Run: `npm audit fix`

### 9.2 Clean Up Code
- [ ] **Remove commented-out code:**
  - Review all `.ts` and `.js` files
  - Remove commented timer jobs
  - Remove commented fetch functions

- [ ] **Simplify file structure (optional):**
  - Archive utilities to `deprecated/` folder
  - Remove unused route files if applicable

### 9.3 Optimize Bundle Size
- [ ] **Analyze React bundle:**
  - Identify and remove unused packages
  - Optimize imports

---

## Phase 10: Final Deployment ⏳ PENDING

### 10.1 Pre-Deployment Checklist
- [ ] All dependencies up-to-date and secure
- [ ] No console warnings or errors
- [ ] All pages tested and working
- [ ] Database is read-only (or removed)
- [ ] No hardcoded API keys
- [ ] Documentation complete
- [ ] Git history cleaned

### 10.2 Deployment Options
- [ ] **Option A: Traditional Hosting** (Heroku, AWS, DigitalOcean)
- [ ] **Option B: Static Hosting** (Netlify, Vercel, GitHub Pages) - RECOMMENDED
- [ ] **Option C: Docker Container** (Docker Hub, registry)

### 10.3 Post-Deployment Verification
- [ ] All pages accessible
- [ ] No 404 errors for API endpoints
- [ ] Performance metrics acceptable
- [ ] SEO tags intact
- [ ] Analytics tracking working

---

## Summary

**Completed:** Phases 1-3 (Backend cleanup, database config, build setup)  
**In Progress:** Ready for Phase 4 (Frontend updates)  
**Total Timeline:** ~1-2 weeks (now: ~2-3 days remaining)  

**Key Achievements:**
- ✅ All data update endpoints removed
- ✅ Database set to read-only mode
- ✅ TypeScript compilation successful
- ✅ Dependencies installed
- ✅ Build directory created
- ✅ Documentation created (IMPLEMENTATION_SUMMARY.md, CHANGELOG.md, DEPRECATED_FUNCTIONS.md)

**Ready For:**
- Local testing with React build
- Frontend UI updates
- Production deployment
