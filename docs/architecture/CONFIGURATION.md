# VacCOVID Configuration Reference

Complete reference for all configuration files in the VacCOVID project.

---

## Table of Contents

1. [Environment Variables](#environment-variables)
2. [Package Configuration](#package-configuration)
3. [TypeScript Configuration](#typescript-configuration)
4. [Docker Configuration](#docker-configuration)
5. [Database Configuration](#database-configuration)

---

## Environment Variables

### `.env.example`

Copy to `.env` and configure for your environment:

```bash
# Node Environment
NODE_ENV=development              # development | production

# Server Configuration
PORT=5000                         # Backend server port
HOST=localhost                    # Server hostname

# Database Configuration (for full backend mode)
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=vaccovid_user
DATABASE_PASSWORD=your_secure_password_here
DATABASE_NAME=vaccovid
DATABASE_SYNCHRONIZE=false        # IMPORTANT: Keep false for production
DATABASE_LOGGING=false
DATABASE_CACHE_DURATION=30000     # Cache duration in ms

# API Configuration
API_URL=http://localhost:5000
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development

# External APIs
NEWS_API_KEY=your_newsapi_key_here
OWID_API_URL=https://covid.ourworldindata.org/data

# Feature Flags
ENABLE_API_CACHE=true
ENABLE_CORS=true
READ_ONLY_MODE=true               # Archived data mode
```

---

## Package Configuration

### Root `package.json`

**Key Scripts:**

| Script | Command | Description |
|--------|---------|-------------|
| `npm start` | `concurrently "node build/index.js" "npm run client"` | Run backend + frontend |
| `npm run server` | `nodemon build/index.js` | Backend only with auto-reload |
| `npm run client` | `npm start --prefix client` | Frontend dev server |
| `npm run dev` | `concurrently "npm run server" "npm run client"` | Development mode |

**Key Dependencies:**

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.17.1 | Web server framework |
| typeorm | 0.2.24 | Database ORM |
| pg | ^8.3.3 | PostgreSQL driver |
| cors | ^2.8.5 | Cross-origin requests |
| typescript | ^4.0.2 | TypeScript compiler |
| concurrently | ^5.3.0 | Run multiple scripts |

### Client `package.json`

**Key Scripts:**

| Script | Command | Description |
|--------|---------|-------------|
| `npm start` | `react-scripts start` | Development server (port 3000) |
| `npm run build` | `react-scripts build` | Production build |
| `npm run deploy` | `gh-pages -d build` | Deploy to GitHub Pages |

**Homepage:** `https://armanfeili.github.io/vaccovid/`

**Key Dependencies:**

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^16.13.1 | UI library |
| redux | ^4.0.5 | State management |
| axios | ^0.20.0 | HTTP client |
| chart.js | ^2.9.4 | Data visualization |
| react-jvectormap | 0.0.16 | Interactive maps |
| react-router-dom | ^5.2.0 | Client-side routing |

---

## TypeScript Configuration

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "./build",
    "rootDir": "./",
    "strict": true,
    "strictPropertyInitialization": false,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react"
  }
}
```

**Key Settings:**

| Option | Value | Purpose |
|--------|-------|---------|
| `target` | es5 | Browser compatibility |
| `outDir` | ./build | Compiled JS output directory |
| `experimentalDecorators` | true | Required for TypeORM entities |
| `emitDecoratorMetadata` | true | Required for TypeORM |
| `strict` | true | Enable all strict checks |

---

## Docker Configuration

### Static Deployment (`Dockerfile.static`)

Minimal image for mock API deployment (no database):

```dockerfile
FROM node:16-alpine
WORKDIR /app

# Copy static assets
COPY server.js ./
COPY mockApi.js ./
COPY client/build ./client/build

# Install only Express
RUN echo '{"dependencies":{"express":"^4.17.1"}}' > package.json && \
    npm install --only=production

EXPOSE 3000
ENV NODE_ENV=production PORT=3000
CMD ["node", "server.js"]
```

### Static Compose (`docker-compose.static.yml`)

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
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Full Stack (`docker-compose.yml`)

For development with PostgreSQL:

```yaml
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: vaccovid_user
      POSTGRES_PASSWORD: vaccovid_password
      POSTGRES_DB: vaccovid
    ports: ["5432:5432"]
    
  backend:
    image: node:16-alpine
    ports: ["5000:5000"]
    command: sh -c "npm install && node server.js"
    
  frontend:
    image: node:16-alpine
    ports: ["3000:3000"]
    environment:
      REACT_APP_API_URL: http://localhost:5000
```

---

## Database Configuration

### `ormconfig.json` (Template)

> **Note:** This file is gitignored. Create from template:

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "vaccovid_user",
  "password": "your_password",
  "database": "vaccovid",
  "synchronize": false,
  "logging": false,
  "entities": ["app/src/db/models/**/*.ts"],
  "cache": {
    "duration": 30000
  }
}
```

**Important Settings:**

| Option | Value | Notes |
|--------|-------|-------|
| `synchronize` | **false** | Never true in production - prevents auto schema changes |
| `logging` | false | Set true for SQL debugging |
| `cache.duration` | 30000 | 30 second query cache |

---

## Quick Reference

### Running Modes

| Mode | Command | Database | Port |
|------|---------|----------|------|
| Static (Mock API) | `node server.js` | None | 3000 |
| Development | `npm run dev` | PostgreSQL | 5000 + 3000 |
| Production | `npm start` | PostgreSQL | 5000 |
| Docker Static | `docker-compose -f docker-compose.static.yml up` | None | 3000 |

### Port Summary

| Service | Default Port |
|---------|--------------|
| Frontend Dev Server | 3000 |
| Backend API | 5000 |
| PostgreSQL | 5432 |
| Static Server | 3000 |

---

*Last Updated: December 2025*
