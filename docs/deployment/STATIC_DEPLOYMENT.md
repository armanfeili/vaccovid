# VacCOVID Static Deployment Guide

Guide for deploying VacCOVID as a static website with embedded mock API data.

---

## Deployment Options

| Method | Database | Best For | Time |
|--------|----------|----------|------|
| Docker Static | None | Self-hosting, local demo | 5 min |
| GitHub Pages | None | Free hosting, static only | 10 min |
| Netlify | None | Free hosting, easy CI/CD | 5 min |
| Vercel | None | Free hosting, serverless | 5 min |

---

## Docker Static Deployment

### Quick Start

```bash
# Build and run with docker-compose
docker-compose -f docker-compose.static.yml up --build

# Access at http://localhost:3000
```

### Manual Build

```bash
# Build the image
docker build -f Dockerfile.static -t vaccovid-static .

# Run container
docker run -d -p 3000:3000 --name vaccovid vaccovid-static

# Verify
curl http://localhost:3000/api/health
```

### Configuration

**`docker-compose.static.yml`:**
```yaml
version: '3.8'
services:
  vaccovid:
    build:
      context: .
      dockerfile: Dockerfile.static
    container_name: vaccovid-static
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
    restart: unless-stopped
```

**`Dockerfile.static`:**
- Base: `node:16-alpine`
- Includes: `server.js`, `mockApi.js`, `client/build/`
- Dependencies: Express only
- Size: ~50MB

---

## GitHub Pages Deployment

### Prerequisites

1. Ensure `client/package.json` has correct homepage:
   ```json
   {
     "homepage": "https://armanfeili.github.io/vaccovid/"
   }
   ```

2. Install gh-pages:
   ```bash
   cd client
   npm install gh-pages --save-dev
   ```

### Build and Deploy

```bash
# Build React app
cd client
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Automated Deployment

Add to `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          
      - name: Install and Build
        run: |
          cd client
          npm ci
          npm run build
          
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./client/build
```

> **Note:** GitHub Pages serves static files only. For API functionality, use the full Docker deployment or deploy the mock API to a separate service.

---

## Netlify Deployment

### Quick Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build frontend
cd client && npm run build

# Deploy
netlify deploy --prod --dir=build
```

### Configuration (`netlify.toml`)

```toml
[build]
  base = "client"
  publish = "build"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Vercel Deployment

### Quick Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from client directory
cd client
vercel --prod
```

### Configuration (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Full Static Export

For completely static hosting without a Node.js server:

### 1. Export Mock Data to JSON

```bash
# Creates JSON files in client/public/data/
node scripts/export-static-data.js
```

### 2. Modify Frontend API Calls

Update `client/src/` to fetch from static JSON instead of `/api/*`:

```javascript
// Instead of: axios.get('/api/npm-covid-data/countries')
// Use: axios.get('/data/countries.json')
```

### 3. Build and Deploy

```bash
cd client
npm run build
# Deploy client/build/ to any static host
```

---

## Architecture Comparison

### With Mock API Server (Recommended)

```
[Browser] → [server.js:3000] → [mockApi.js] → Embedded Data
                ↓
        [client/build/] Static React
```

### Pure Static (GitHub Pages)

```
[Browser] → [GitHub Pages CDN]
                ↓
        [client/build/]
            ↓
    [/data/*.json] Static JSON files
```

---

## Troubleshooting

### Port Already in Use

```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Docker Build Fails

```bash
# Clean build
docker-compose -f docker-compose.static.yml build --no-cache
```

### Missing client/build

```bash
# Build React app first
cd client && npm run build
```

---

## Verification

After deployment, verify these endpoints:

| Endpoint | Expected Result |
|----------|-----------------|
| `/` | React app loads |
| `/api/health` | JSON health response |
| `/api/npm-covid-data/world` | World COVID stats |
| `/api/vaccines/get-all-vaccines` | Vaccine list |

---

*Last Updated: December 2025*
