# VacCOVID Development Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Development Environment Setup](#development-environment-setup)
3. [Project Structure](#project-structure)
4. [Running Locally](#running-locally)
5. [Development Workflow](#development-workflow)
6. [Code Organization](#code-organization)
7. [Frontend Development](#frontend-development)
8. [Backend Development](#backend-development)
9. [Database Development](#database-development)
10. [Debugging](#debugging)
11. [Testing](#testing)
12. [Build Process](#build-process)

---

## Prerequisites

### Required Tools
- **Node.js**: v14 or higher (LTS recommended)
- **npm**: v6 or higher (comes with Node.js)
- **PostgreSQL**: v12 or higher
- **Git**: For version control
- **Code Editor**: VS Code recommended

### Verify Installation

```bash
# Check Node.js version
node --version     # Should be v14+

# Check npm version
npm --version      # Should be v6+

# Check PostgreSQL
psql --version     # Should be v12+

# Check Git
git --version
```

---

## Development Environment Setup

### 1. Clone Repository

```bash
git clone https://gitlab.com/vacovid/vaccine-now.git
cd vaccine-now
```

### 2. Install Root Dependencies

```bash
# Install with --ignore-scripts to skip node-sass Python 2 requirements
npm install --ignore-scripts
```

### 3. Install Client Dependencies

```bash
npm install --prefix client --ignore-scripts
```

### 4. Setup Environment Variables

```bash
# Copy example to .env (if exists)
cp .env.example .env

# Edit with your settings
nano .env
```

**Required Environment Variables**:

```env
# Backend
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=vaccovid

# Frontend
REACT_APP_API_URL=http://localhost:5000/api
```

### 5. Setup PostgreSQL Database

```bash
# Create database
createdb vaccovid

# Create user (if not exists)
createuser -P vaccine_user
# Enter password when prompted

# Grant privileges
psql -U postgres -d vaccovid -c "GRANT ALL PRIVILEGES ON DATABASE vaccovid TO vaccine_user;"

# Run initialization script (if available)
psql -U postgres -d vaccovid -f scripts/init-db.sql
```

### 6. Compile TypeScript

```bash
# Compile all TypeScript files
npx tsc --skipLibCheck
```

---

## Project Structure

### Root Structure

```
vaccovid/
├── app/                    # Backend (Node.js/Express/TypeScript)
├── client/                 # Frontend (React)
├── build/                  # Compiled backend (generated)
├── docs/                   # Documentation
├── k8s/                    # Kubernetes manifests
├── helm/                   # Helm charts
├── scripts/                # Utility scripts
├── ormconfig.json          # TypeORM configuration
├── package.json            # Root dependencies
├── tsconfig.json           # TypeScript config
├── Dockerfile              # Container image
├── docker-compose.yml      # Local development containers
└── README.md               # Project README
```

### Backend Structure

```
app/
├── index.ts                # Server entry point
├── src/
│   ├── config/
│   │   └── secretData.ts   # API keys, secrets
│   │
│   ├── db/
│   │   └── models/         # TypeORM entity definitions
│   │       ├── CovidReport.ts
│   │       ├── Vaccine.ts
│   │       ├── Treatment.ts
│   │       ├── News.ts
│   │       └── Country.ts
│   │
│   ├── routes/             # API endpoints
│   │   ├── index.ts        # Route registration
│   │   ├── npmCovidData.ts
│   │   ├── APICovidData.ts
│   │   ├── covidOvidData.ts
│   │   ├── vaccine.ts
│   │   ├── news.ts
│   │   └── sitemap.ts
│   │
│   ├── utils/              # Data access & utilities
│   │   ├── covidAPIData.ts
│   │   ├── newsData.ts
│   │   ├── ovidData.ts
│   │   ├── vaccineAndTreatment.ts
│   │   ├── fetch.ts
│   │   ├── countries.json
│   │   ├── world.json
│   │   ├── provinces-object.ts
│   │   ├── sitemap-generate.ts
│   │   ├── DEPRECATED_FUNCTIONS.md
│   │   └── [data files]
│   │
│   └── validation/         # Input validation
│       ├── is-empty.ts
│       └── val-news/
│
├── ormconfig.json          # Database configuration
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript config
```

### Frontend Structure

```
client/
├── public/                 # Static assets
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── components/         # React components
│   │   ├── common/         # Shared components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── Navigation.js
│   │   │   └── Sidebar.js
│   │   │
│   │   ├── coronavirus/    # COVID tracker
│   │   ├── vaccines/       # Vaccine tracker
│   │   ├── news/           # News section
│   │   ├── map/            # Map components
│   │   └── views/          # Page views
│   │
│   ├── actions/            # Redux action creators
│   │   ├── covid_countries.js
│   │   ├── vaccine.js
│   │   ├── news.js
│   │   └── types.js
│   │
│   ├── reducers/           # Redux reducers
│   │   ├── covid.js
│   │   ├── vaccine.js
│   │   ├── news.js
│   │   └── index.js
│   │
│   ├── utils/              # Helper functions
│   │   └── [utilities]
│   │
│   ├── views/              # CSS/SCSS
│   │   ├── stylesheets/
│   │   └── sass/
│   │
│   ├── App.js              # Main component
│   ├── index.js            # React entry point
│   ├── store.js            # Redux store
│   └── setupTests.js
│
├── package.json            # Dependencies
└── README.md
```

---

## Running Locally

### Option 1: Backend + Frontend (Separate Terminals)

**Terminal 1 - Backend**:
```bash
# Compile TypeScript (if changed)
npx tsc --skipLibCheck

# Start backend server
npm run server
# Output: Server running on port 5000
```

**Terminal 2 - Frontend**:
```bash
npm run client
# Output: Compiled successfully at http://localhost:3000
```

### Option 2: Both Together

```bash
npm start
# This runs backend + frontend concurrently
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

### Option 3: Using Docker Compose

```bash
docker-compose up
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Database: localhost:5432
```

---

## Development Workflow

### 1. Creating a Feature

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes to code

# Test locally
npm start

# Commit changes
git add .
git commit -m "Add my feature"

# Push to repository
git push origin feature/my-feature

# Create Pull Request
```

### 2. Modifying Backend

**File**: `app/src/routes/vaccine.ts`

```typescript
import { Router } from 'express';
import vaccineRoutes from '../utils/vaccineAndTreatment';

const router = Router();

// Get all vaccines
router.get('/get-all-vaccines', async (req, res) => {
  try {
    const vaccines = await vaccineRoutes.getAllVaccines();
    res.json({
      success: true,
      data: vaccines
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
```

**After changing backend TypeScript**:
```bash
# Recompile TypeScript
npx tsc --skipLibCheck

# Restart backend server
npm run server
```

### 3. Modifying Frontend

**File**: `client/src/components/coronavirus/CountryTable.js`

```javascript
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries } from '../../actions/covid_countries';

const CountryTable = () => {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.covid.countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <table>
      {/* Component JSX */}
    </table>
  );
};

export default CountryTable;
```

**React Hot Reload**: Changes are auto-reloaded in browser
- No restart needed
- State is preserved

---

## Code Organization

### Backend Code Style

```typescript
// 1. Imports
import { Router } from 'express';
import { getConnection } from 'typeorm';

// 2. Constants
const BATCH_SIZE = 100;

// 3. Route handler
router.get('/endpoint', async (req, res) => {
  try {
    // Validation
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID required' });
    }

    // Business logic
    const data = await repository.findById(id);

    // Response
    return res.json({ success: true, data });
  } catch (error) {
    // Error handling
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
```

### Frontend Code Style

```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// 2. Component
const MyComponent = ({ title, onClose }) => {
  // State
  const [loading, setLoading] = useState(false);
  const data = useSelector(state => state.data);

  // Effects
  useEffect(() => {
    // Initialization
  }, []);

  // Handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

---

## Frontend Development

### Redux Flow

```
User Action
    ↓
Dispatch Action Creator
    ↓
Action (plain object with type)
    ↓
Middleware (redux-thunk for async)
    ↓
Reducer (update state)
    ↓
Component Subscription (state updated)
    ↓
Component Re-render with new props
```

### Example Action Creator

```javascript
// actions/covid_countries.js
import axios from 'axios';

export const FETCH_COUNTRIES_REQUEST = 'FETCH_COUNTRIES_REQUEST';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_ERROR = 'FETCH_COUNTRIES_ERROR';

export const fetchCountries = () => async dispatch => {
  dispatch({ type: FETCH_COUNTRIES_REQUEST });
  
  try {
    const response = await axios.get('/api/npm-covid-data/countries');
    dispatch({
      type: FETCH_COUNTRIES_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_COUNTRIES_ERROR,
      payload: error.message
    });
  }
};
```

### Example Reducer

```javascript
// reducers/covid.js
import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_ERROR
} from '../actions/covid_countries';

const initialState = {
  countries: [],
  loading: false,
  error: null
};

export default function covid(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_COUNTRIES_SUCCESS:
      return { ...state, countries: action.payload, loading: false };
    case FETCH_COUNTRIES_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
```

---

## Backend Development

### Adding a New API Endpoint

**Step 1**: Create data access function

```typescript
// app/src/utils/myData.ts
export async function getMyData(filter: string) {
  const connection = getConnection();
  const data = await connection
    .getRepository(MyEntity)
    .find({ where: { filter } });
  return data;
}
```

**Step 2**: Create route handler

```typescript
// app/src/routes/myRoute.ts
import { Router } from 'express';
import { getMyData } from '../utils/myData';

const router = Router();

router.get('/my-data', async (req, res) => {
  try {
    const data = await getMyData(req.query.filter);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
```

**Step 3**: Register route

```typescript
// app/src/routes/index.ts
import myRoute from './myRoute';

export const AppRoutes = (app: Express) => {
  app.use('/api/my-route/', myRoute);
};
```

---

## Database Development

### TypeORM Entities

```typescript
// app/src/db/models/Vaccine.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('vaccine')
export class Vaccine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  manufacturer: string;

  @Column()
  clinical_stage: string;

  @Column()
  platform: string;

  @Column({ default: false })
  fda_approved: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;
}
```

### Querying Data

```typescript
import { getRepository } from 'typeorm';
import { Vaccine } from './models/Vaccine';

// Get all
const vaccines = await getRepository(Vaccine).find();

// Get one
const vaccine = await getRepository(Vaccine).findOne(id);

// With conditions
const approved = await getRepository(Vaccine).find({
  where: { fda_approved: true }
});

// Count
const count = await getRepository(Vaccine).count();
```

---

## Debugging

### Backend Debugging

**Using VS Code Debugger**:

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Backend",
      "program": "${workspaceFolder}/build/index.js",
      "outFiles": ["${workspaceFolder}/build/**/*.js"],
      "runtimeArgs": ["--skip-project"],
      "console": "integratedTerminal",
      "restart": true,
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

Then use F5 to start debugging.

**Console Logging**:
```typescript
// app/src/routes/vaccine.ts
console.log('Fetching vaccines:', filter);
console.error('Error occurred:', error);
```

### Frontend Debugging

**Browser DevTools**:
1. Open Chrome DevTools (F12)
2. Use React DevTools extension
3. Use Redux DevTools extension

**VS Code Debugger**:
```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Launch React",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}/client/src"
}
```

---

## Testing

### Frontend Tests

```bash
# Run all tests
npm test --prefix client

# Run with coverage
npm test --prefix client -- --coverage

# Run specific test
npm test --prefix client MyComponent.test.js
```

**Example Test**:
```javascript
// client/src/components/MyComponent.test.js
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders component', () => {
  render(<MyComponent />);
  expect(screen.getByText(/text/i)).toBeInTheDocument();
});
```

### Backend Tests

Backend tests can be created using Jest:

```bash
npm install --save-dev jest @types/jest ts-jest
```

**Example Test**:
```typescript
import { getMyData } from '../utils/myData';

describe('MyData', () => {
  test('should fetch data', async () => {
    const data = await getMyData('filter');
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
  });
});
```

---

## Build Process

### Build for Production

```bash
# 1. Compile TypeScript
npx tsc --skipLibCheck

# 2. Build React frontend
npm run build --prefix client

# 3. Output
# Backend: build/ directory
# Frontend: client/build/ directory
```

### Docker Build

```bash
# Build image
docker build -t vaccovid:latest .

# Run container
docker run -p 5000:5000 -p 3000:3000 vaccovid:latest
```

### Docker Compose

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# Stop
docker-compose down
```

---

## Common Tasks

### Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update package
npm update package-name

# Install new package
npm install new-package

# Uninstall package
npm uninstall package-name
```

### Database Queries

```bash
# Connect to database
psql -U vaccine_user -d vaccovid

# List tables
\dt

# Describe table
\d vaccine

# Run query
SELECT * FROM vaccine LIMIT 10;

# Exit
\q
```

### Port Conflicts

```bash
# Check what's using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use npm script
npm run justServer
```

---

## Resources

- **Node.js**: https://nodejs.org/
- **Express.js**: https://expressjs.com/
- **React**: https://reactjs.org/
- **Redux**: https://redux.js.org/
- **TypeScript**: https://www.typescriptlang.org/
- **PostgreSQL**: https://www.postgresql.org/
- **TypeORM**: https://typeorm.io/

---

*Last Updated: November 2025*
