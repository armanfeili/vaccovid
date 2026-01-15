# GitHub Pages Deployment - Complete Setup Guide

**Target**: `https://armanfeili.github.io/vaccovid/`  
**Type**: Static React site with archived data  
**Time**: ~15 minutes to complete

---

## 🚀 Quick Start (4 Steps)

### Step 1: Update package.json

Add these fields to `/package.json`:

```json
{
  "homepage": "https://armanfeili.github.io/vaccovid/",
  "scripts": {
    "export-data": "node scripts/export-static-data.js",
    "build": "cd client && npm run build",
    "deploy": "npm run build && gh-pages -d client/build"
  }
}
```

### Step 2: Install gh-pages

```bash
npm install gh-pages --save-dev
```

### Step 3: Update ormconfig.json

Make sure your database credentials are set:

```json
{
  "username": "vaccovid_user",
  "password": "test123",
  "database": "vaccovid",
  "synchronize": false
}
```

### Step 4: Deploy

```bash
# Export data from database
npm run export-data

# Review exported files in client/public/data/

# Deploy to GitHub Pages
npm run deploy
```

**Result**: Live at `https://armanfeili.github.io/vaccovid/` ✨

---

## 📋 Detailed Setup Steps

### Prerequisites

- ✅ PostgreSQL running with vaccovid database
- ✅ Node.js v16+ installed
- ✅ Git repository pushed to GitHub
- ✅ GitHub account with repository access

### Step 1: Prepare Environment

```bash
cd /Users/armanfeili/code/Old\ projects/vaccovid

# Verify database connection
psql -U vaccovid_user -d vaccovid -c "SELECT COUNT(*) FROM vaccine;"

# Verify Node.js version
node --version  # Should be v16+
```

### Step 2: Update Configuration Files

#### A. Update `package.json`

Add to scripts section:
```json
"homepage": "https://armanfeili.github.io/vaccovid/",
"export-data": "node scripts/export-static-data.js",
"build": "cd client && npm run build",
"deploy": "npm run build && gh-pages -d client/build"
```

#### B. Update `client/package.json`

Ensure build script exists:
```json
"scripts": {
  "build": "react-scripts build",
  "start": "react-scripts start"
}
```

#### C. Update `client/.env` (Create if doesn't exist)

```env
PUBLIC_URL=/vaccovid
REACT_APP_API_URL=https://armanfeili.github.io/vaccovid
REACT_APP_STATIC_DATA=true
```

### Step 3: Install Dependencies

```bash
# Root dependencies
npm install gh-pages --save-dev

# Client dependencies (if not already)
cd client
npm install
cd ..
```

### Step 4: Export Database Data

```bash
npm run export-data
```

This will:
- Connect to PostgreSQL
- Export vaccines table → `client/public/data/vaccines.json`
- Export news table → `client/public/data/news.json`
- Create `client/public/data/index.json` with metadata

**Verify**:
```bash
ls -lah client/public/data/
# Should show: vaccines.json, news.json, index.json
```

### Step 5: Build React App

```bash
npm run build
```

This will:
- Install client dependencies
- Build production React app
- Output to `client/build/`

**Verify**:
```bash
ls -lah client/build/
# Should show index.html and other built files
```

### Step 6: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
- Push `client/build/` to `gh-pages` branch
- GitHub automatically deploys to GitHub Pages
- Should complete in ~1 minute

**Verify**:
```bash
# Visit the URL
open https://armanfeili.github.io/vaccovid/

# Or test from command line
curl -s https://armanfeili.github.io/vaccovid/ | head -20
```

### Step 7: Configure GitHub Repository Settings

In GitHub web UI:

1. Go to `Settings` → `Pages`
2. Ensure:
   - Source: Deploy from branch
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Click Save
4. Wait 1-2 minutes for deployment

---

## 📁 File Structure After Setup

```
vaccovid/
├── .github/
│   └── workflows/
│       └── deploy-github-pages.yml    ← Auto-deploy on push
├── client/
│   ├── public/
│   │   ├── data/
│   │   │   ├── vaccines.json          ← Exported data
│   │   │   ├── news.json              ← Exported data
│   │   │   └── index.json
│   │   └── index.html
│   ├── build/                         ← Production build
│   ├── src/
│   │   └── utils/
│   │       └── staticDataLoader.js    ← Data loader utility
│   └── package.json
├── scripts/
│   └── export-static-data.js          ← Export script
├── package.json                       ← Updated with homepage & scripts
└── .env                               ← Optional local config
```

---

## 🔄 Updating Data (After First Deploy)

Whenever you need to update the data:

```bash
# 1. Export fresh data
npm run export-data

# 2. Commit changes
git add client/public/data/
git commit -m "Update static data"

# 3. Deploy automatically
git push origin main
```

GitHub Actions will automatically:
- Build React app
- Deploy to GitHub Pages
- Complete within 2 minutes

---

## 🧪 Testing Before Deployment

### Local Testing

```bash
# Start development server
cd client
npm start
# Opens http://localhost:3000

# Test that data loads from JSON files
# Check browser console for any errors
```

### Staging Test (on gh-pages branch)

```bash
# View staging deployment
# URL: https://armanfeili.github.io/vaccovid/

# After pushing to main, GitHub Actions deploys automatically
```

---

## 🔧 Troubleshooting

### Issue: "404 - Not Found"
**Solution**: 
- Verify repository name is correct: `vaccovid`
- Check GitHub Pages settings: Settings → Pages
- Branch should be `gh-pages`

### Issue: "Blank Page or CSS Missing"
**Solution**:
- Verify `PUBLIC_URL=/vaccovid` in `.env`
- Rebuild: `npm run build`
- Clear browser cache (Cmd+Shift+R)

### Issue: "Data Not Loading"
**Solution**:
- Verify data files exist: `ls client/public/data/`
- Run: `npm run export-data` again
- Check browser console for CORS/fetch errors

### Issue: "Database Connection Failed"
**Solution**:
```bash
# Verify PostgreSQL is running
brew services list | grep postgres

# Start if not running
brew services start postgresql@15

# Test connection
psql -U vaccovid_user -d vaccovid -c "SELECT 1;"
```

### Issue: "Module not found errors"
**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules client/node_modules
npm install
cd client && npm install && cd ..

# Rebuild
npm run build
```

---

## 🎯 Manual Deployment (Alternative)

If GitHub Actions doesn't work:

```bash
# Build locally
npm run build

# Install gh-pages locally
npm install -g gh-pages

# Deploy manually
gh-pages -d client/build
```

---

## 📊 Deployment Configuration Options

### Option 1: Automatic (Recommended)

GitHub Actions deploys automatically on every push to main.

**File**: `.github/workflows/deploy-github-pages.yml`

**Trigger**: Push to main branch

### Option 2: Manual

Deploy whenever you want manually.

```bash
npm run deploy
```

### Option 3: Scheduled

Deploy at specific times (e.g., daily at midnight).

Edit `.github/workflows/deploy-github-pages.yml`:
```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
```

---

## 🔒 Security Considerations

### Database Credentials
- ✅ Credentials in `ormconfig.json` (git ignored)
- ✅ No credentials in exported JSON files
- ✅ Only public data exported

### GitHub Pages
- ✅ HTTPS enabled automatically
- ✅ Site is read-only (no backend mutations)
- ✅ All data is public (archived data)

### Data Privacy
- ✅ Only data you explicitly export is published
- ✅ Personal data should not be in exports
- ✅ Review `client/public/data/*.json` before deploy

---

## 📈 Performance Notes

### Load Times
- **First Load**: ~2-3 seconds (data files loaded)
- **Subsequent Loads**: ~500ms (data cached in browser)
- **Works Offline**: Yes, after first load

### Bundle Size
- React app: ~1.15 MB (gzipped)
- Data files: ~200-500 KB (varies)
- Total: ~1.5-2 MB

### Optimization
- Data is cached in browser memory
- No database queries needed
- CDN-backed by GitHub Pages

---

## 🎉 Success Indicators

After deployment, you should see:

✅ `https://armanfeili.github.io/vaccovid/` loads  
✅ No console errors  
✅ Data displays from JSON files  
✅ All pages work (vaccine, news, etc.)  
✅ Mobile responsive  
✅ Works in multiple browsers

---

## 📞 Support Quick Links

- **GitHub Pages Docs**: https://pages.github.com/
- **Create React App Build**: https://create-react-app.dev/docs/deployment/
- **gh-pages Package**: https://www.npmjs.com/package/gh-pages
- **Repository**: https://github.com/armanfeili/vaccovid

---

## ✨ Next Steps

1. ✅ Complete this setup guide
2. ✅ Export data: `npm run export-data`
3. ✅ Build app: `npm run build`
4. ✅ Deploy: `npm run deploy` or `git push`
5. ✅ Verify at: `https://armanfeili.github.io/vaccovid/`
6. ✅ Share URL with stakeholders

---

**Ready to deploy?** Run: `npm run export-data && npm run deploy` 🚀
