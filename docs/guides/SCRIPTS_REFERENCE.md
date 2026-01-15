# VacCOVID Scripts Reference

Documentation for utility scripts in the `scripts/` folder.

---

## Overview

| Script | Purpose | Database Required |
|--------|---------|-------------------|
| `deploy-docker.sh` | Docker deployment for all environments | Optional |
| `deploy-cloud.sh` | Cloud platform auto-detection & deploy | No |
| `export-static-data.js` | Export DB data to JSON files | Yes |
| `extract-latest-covid-data.js` | Fetch latest COVID data from OWID | No |
| `init-db.sql` | Database initialization | Yes |

---

## deploy-docker.sh

Automated Docker deployment for development, staging, and production.

### Usage

```bash
./scripts/deploy-docker.sh [environment]
# environment: development | staging | production
```

### Environments

| Environment | Features |
|-------------|----------|
| `development` | Interactive mode, logs visible |
| `staging` | Detached mode, removes orphans |
| `production` | Detached, health checks, resource limits |

### Example

```bash
# Production deployment
./scripts/deploy-docker.sh production

# Development (default)
./scripts/deploy-docker.sh
```

### What It Does

1. Loads `.env.$ENVIRONMENT` if exists
2. Builds Docker images
3. Starts containers with appropriate settings
4. Waits 5 seconds for startup
5. Tests API and frontend endpoints
6. Shows status and access URLs

---

## deploy-cloud.sh

Auto-detects installed cloud CLIs and deploys accordingly.

### Usage

```bash
./scripts/deploy-cloud.sh [environment]
```

### Supported Platforms

| Platform | CLI Required | Deployment Type |
|----------|-------------|-----------------|
| Vercel | `vercel` | Frontend + serverless |
| Netlify | `netlify` | Frontend (static) |
| Heroku | `heroku` | Full-stack |
| Railway | `railway` | Full-stack |
| Render | `render` | Full-stack |

### Example

```bash
# Install a CLI first
npm install -g vercel

# Then deploy
./scripts/deploy-cloud.sh
```

---

## export-static-data.js

Exports PostgreSQL database data to JSON files for static hosting.

### Usage

```bash
node scripts/export-static-data.js
```

### Prerequisites

- PostgreSQL running with data
- Valid `ormconfig.json` configuration

### Output

Creates files in `client/public/data/`:

```
client/public/data/
├── vaccines.json   # All vaccine records
├── news.json       # News articles (last 1000)
└── index.json      # Export metadata
```

### JSON Structure

**vaccines.json:**
```json
{
  "data": [
    { "id": 1, "name": "Pfizer-BioNTech", ... },
    ...
  ]
}
```

---

## extract-latest-covid-data.js

Fetches latest COVID-19 data from Our World in Data (OWID).

### Usage

```bash
node scripts/extract-latest-covid-data.js
```

### Data Source

- **URL:** https://github.com/owid/covid-19-data
- **Format:** CSV → JSON transformation
- **Updates:** Real-time from OWID repository

> **Note:** Since the project is now archived, this script is primarily for reference. The mock API uses embedded data from February 2023.

---

## init-db.sql

PostgreSQL database initialization script.

### Usage

```bash
# Via psql
psql -U postgres -d vaccovid -f scripts/init-db.sql

# Or via docker-compose volume mount
# Automatically runs on first postgres container start
```

### What It Creates

1. Required database tables
2. Initial seed data
3. Database indexes
4. User permissions

### Docker Integration

Referenced in `docker-compose.yml`:

```yaml
postgres:
  volumes:
    - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql
```

---

## Quick Reference

### Most Common Commands

```bash
# Static Docker deployment
docker-compose -f docker-compose.static.yml up --build

# Export data for static hosting
node scripts/export-static-data.js

# Deploy to cloud (auto-detect)
./scripts/deploy-cloud.sh

# Full Docker stack (with DB)
./scripts/deploy-docker.sh development
```

---

*Last Updated: December 2025*
