# VacCOVID System Architecture

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [System Components](#system-components)
3. [Data Flow](#data-flow)
4. [Database Schema](#database-schema)
5. [Frontend Architecture](#frontend-architecture)
6. [Backend Architecture](#backend-architecture)
7. [API Architecture](#api-architecture)
8. [Deployment Architecture](#deployment-architecture)

---

## Architecture Overview

VacCOVID follows a **three-tier architecture** pattern:

```
┌─────────────────────────────────────┐
│      Presentation Layer (React)     │
│  - React Components                 │
│  - Redux State Management           │
│  - React Router Navigation          │
└──────────────┬──────────────────────┘
               │ HTTP/REST
┌──────────────▼──────────────────────┐
│    Application Layer (Express)      │
│  - RESTful API Routes               │
│  - Data Processing                  │
│  - Request Validation               │
└──────────────┬──────────────────────┘
               │ SQL
┌──────────────▼──────────────────────┐
│    Data Layer (PostgreSQL)          │
│  - COVID-19 Data                    │
│  - Vaccine Data                     │
│  - Treatment Data                   │
│  - News Data                        │
└─────────────────────────────────────┘
```

---

## System Components

### 1. Frontend (React SPA)

**Purpose**: Interactive user interface for browsing pandemic data

**Key Components**:

```
client/src/
├── components/
│   ├── common/              # Shared components
│   │   ├── Header
│   │   ├── Footer
│   │   ├── Navigation
│   │   └── Sidebar
│   ├── coronavirus/         # COVID-19 tracker components
│   │   ├── CountryTable
│   │   ├── WorldStats
│   │   ├── TrendChart
│   │   └── MetricsDisplay
│   ├── map/                 # Map components
│   │   ├── WorldMap
│   │   ├── CountryMap
│   │   └── RegionMap
│   ├── vaccines/            # Vaccine tracker components
│   │   ├── VaccineTable
│   │   ├── VaccinePhases
│   │   ├── PlatformFilter
│   │   └── VaccineDetail
│   ├── news/                # News section components
│   │   ├── NewsList
│   │   ├── NewsCard
│   │   ├── NewsCategoryFilter
│   │   └── InfiniteScroller
│   └── views/               # Page views and layouts
│
├── actions/                 # Redux action creators
│   ├── covid_countries.js
│   ├── vaccine.js
│   ├── news.js
│   └── config.js
│
├── reducers/                # Redux state reducers
│   └── [state management]
│
├── utils/                   # Utility functions
│   └── [helpers and tools]
│
├── App.js                   # Main application component
├── index.js                 # React entry point
└── store.js                 # Redux store configuration
```

**Key Features**:
- Redux for centralized state management
- React Router for client-side navigation
- Axios for HTTP requests
- Chart.js for data visualization
- React jVectorMap for interactive maps
- Infinite scroll for news pagination

### 2. Backend (Express Server)

**Purpose**: Serve API endpoints and manage data access

**Architecture**:

```
app/
├── index.ts                 # Server entry point
├── src/
│   ├── routes/              # API route handlers
│   │   ├── index.ts         # Route registration
│   │   ├── npmCovidData.ts  # COVID-19 data (npm API)
│   │   ├── APICovidData.ts  # COVID-19 data (API.io)
│   │   ├── covidOvidData.ts # COVID-19 data (OWID)
│   │   ├── vaccine.ts       # Vaccine & treatment data
│   │   ├── news.ts          # News data
│   │   └── sitemap.ts       # Sitemap generation
│   │
│   ├── db/
│   │   └── models/          # TypeORM entity definitions
│   │       ├── CovidReport
│   │       ├── Vaccine
│   │       ├── Treatment
│   │       ├── News
│   │       └── [other entities]
│   │
│   ├── utils/               # Data access functions
│   │   ├── covidAPIData.ts  # COVID data fetchers
│   │   ├── newsData.ts      # News data fetchers
│   │   ├── ovidData.ts      # OWID data fetchers
│   │   ├── vaccineAndTreatment.ts  # Vaccine data
│   │   ├── fetch.ts         # HTTP fetching utilities
│   │   ├── provinces-object.ts     # Province data
│   │   ├── countries.json   # Country codes/names
│   │   ├── world.json       # World map data
│   │   ├── world.ts         # World data utilities
│   │   ├── sitemap-generate.ts    # Sitemap generation
│   │   └── DEPRECATED_FUNCTIONS.md # Function deprecation
│   │
│   ├── validation/          # Input validation
│   │   ├── is-empty.ts
│   │   └── val-news/
│   │
│   └── config/              # Configuration
│       └── secretData.ts     # Secrets management
│
├── ormconfig.json           # TypeORM configuration
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript configuration
```

**Request Flow**:
```
HTTP Request
    ↓
Express Router
    ↓
Route Handler
    ↓
TypeORM Repository
    ↓
PostgreSQL Database
    ↓
Response Processing
    ↓
HTTP Response
```

### 3. Database (PostgreSQL)

**Purpose**: Store archived COVID-19, vaccine, treatment, and news data

**Tables** (Logical Structure):

```
covid_reports
├── id (PK)
├── country_code (FK)
├── date
├── total_cases
├── new_cases
├── active_cases
├── critical_cases
├── total_deaths
├── new_deaths
├── total_tests
├── recovered
└── computed_metrics

vaccine
├── id (PK)
├── name
├── manufacturer
├── clinical_stage
├── platform
├── fda_approved
├── description
├── next_steps
├── last_updated
└── links

treatment
├── id (PK)
├── name
├── category
├── clinical_stage
├── fda_approved
├── description
├── applications
└── links

news
├── id (PK)
├── title
├── content
├── source
├── category
├── published_date
├── link
└── image_url

country
├── id (PK)
├── code (iso-3166)
├── name
└── metadata
```

**Data Characteristics**:
- **Read-Only**: No write operations (application level)
- **Static**: No scheduled updates
- **Historical**: Data from October 2020
- **Normalized**: Proper relationships and indexes

---

## Data Flow

### Request-Response Flow

#### 1. COVID-19 Data Request

```
User Request
    ↓
React Component
    ↓
Redux Action
    ↓
Axios GET /api/npm-covid-data/countries
    ↓
Express Route Handler
    ↓
TypeORM Repository Query
    ↓
PostgreSQL SELECT
    ↓
Data Processing & Formatting
    ↓
JSON Response
    ↓
Redux Reducer Updates
    ↓
Component Re-render
    ↓
User Sees Data
```

#### 2. Vaccine Data Request

```
User Search/Filter
    ↓
React Component Updates
    ↓
Redux Action (vaccine.js)
    ↓
Axios GET /api/vaccines/get-vaccines/:category/:name
    ↓
Express Route (vaccine.ts)
    ↓
Filter & Process Data
    ↓
Return Matching Results
    ↓
Redux Store Update
    ↓
Component Props Update
    ↓
UI Re-renders with Results
```

#### 3. News Pagination

```
User Scrolls/Requests Page
    ↓
React Component
    ↓
Axios GET /api/news/get-all-news/:page
    ↓
Express Route Handler
    ↓
Calculate Offset/Limit
    ↓
Database Query
    ↓
Return Page of Results
    ↓
Redux InfiniteScroll Updates
    ↓
Append Results to List
    ↓
User Sees More News
```

---

## Database Schema

### Core Entities

#### CovidReport Entity
```sql
CREATE TABLE covid_report (
  id SERIAL PRIMARY KEY,
  country_code VARCHAR(3),
  date DATE,
  total_cases INTEGER,
  new_cases INTEGER,
  active_cases INTEGER,
  serious_critical INTEGER,
  total_deaths INTEGER,
  new_deaths INTEGER,
  total_tests INTEGER,
  recovered INTEGER,
  infection_risk DECIMAL,
  case_fatality_rate DECIMAL,
  test_percentage DECIMAL,
  recovery_percentage DECIMAL,
  FOREIGN KEY (country_code) REFERENCES country(code)
);
```

#### Vaccine Entity
```sql
CREATE TABLE vaccine (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  manufacturer VARCHAR(255),
  clinical_stage VARCHAR(100),
  platform VARCHAR(100),
  description TEXT,
  next_steps TEXT,
  fda_approved BOOLEAN,
  last_updated DATE,
  links TEXT
);
```

#### Treatment Entity
```sql
CREATE TABLE treatment (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  category VARCHAR(100),
  clinical_stage VARCHAR(100),
  fda_approved BOOLEAN,
  description TEXT,
  applications TEXT,
  links TEXT
);
```

#### News Entity
```sql
CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500),
  content TEXT,
  source VARCHAR(255),
  category VARCHAR(100),
  published_date TIMESTAMP,
  link VARCHAR(500),
  image_url VARCHAR(500)
);
```

#### Country Entity
```sql
CREATE TABLE country (
  id SERIAL PRIMARY KEY,
  code VARCHAR(3) UNIQUE,
  name VARCHAR(255),
  region VARCHAR(100)
);
```

---

## Frontend Architecture

### State Management (Redux)

```
Redux Store
├── covid
│   ├── countries: []
│   ├── worldStats: {}
│   ├── selectedCountry: null
│   ├── trends: {}
│   └── loading: false
│
├── vaccine
│   ├── allVaccines: []
│   ├── filteredVaccines: []
│   ├── selectedPhase: 'all'
│   ├── selectedPlatform: 'all'
│   ├── allTreatments: []
│   └── loading: false
│
├── news
│   ├── allNews: []
│   ├── currentPage: 1
│   ├── category: 'all'
│   ├── hasMore: true
│   └── loading: false
│
└── config
    ├── language: 'en'
    ├── theme: 'light'
    └── apiBaseUrl: '/api'
```

### Component Hierarchy

```
App
├── Header
├── Navigation
├── MainContent
│   ├── CoronavirusTracker (Route: /)
│   │   ├── WorldStats
│   │   ├── CountriesTable
│   │   ├── TrendChart
│   │   └── MetricsDisplay
│   │
│   ├── VaccineTracker (Route: /vaccines)
│   │   ├── VaccineFilter
│   │   ├── VaccineTable
│   │   └── VaccineDetails
│   │
│   ├── TreatmentTracker (Route: /treatments)
│   │   ├── TreatmentFilter
│   │   └── TreatmentTable
│   │
│   ├── Maps (Route: /maps)
│   │   ├── WorldMap
│   │   └── CountryMapSelector
│   │
│   └── News (Route: /news)
│       ├── NewsFilter
│       ├── NewsList
│       └── InfiniteScroller
│
├── Footer
└── Sidebar (Mobile)
```

### Communication Flow

```
User Interaction
    ↓
Event Handler in Component
    ↓
Dispatch Redux Action
    ↓
Async Thunk (Redux Thunk)
    ↓
Axios HTTP Request
    ↓
Backend Response
    ↓
Dispatch Action with Data
    ↓
Reducer Updates State
    ↓
Subscribed Components Re-render
    ↓
Component Receives New Props
    ↓
DOM Updates
    ↓
User Sees Result
```

---

## Backend Architecture

### API Endpoints Organization

**Route Files**:

| File | Purpose | Methods |
|------|---------|---------|
| `npmCovidData.ts` | COVID data from npm API | GET |
| `APICovidData.ts` | COVID data from API.io | GET |
| `covidOvidData.ts` | COVID data from OWID | GET |
| `vaccine.ts` | Vaccine/treatment data | GET |
| `news.ts` | News articles | GET |
| `sitemap.ts` | SEO sitemap | GET |

### Request Validation

```
Request Arrives
    ↓
URL Routing
    ↓
Parameter Extraction
    ↓
Type Validation
    ↓
Business Logic
    ↓
Database Query
    ↓
Data Formatting
    ↓
Error Handling
    ↓
JSON Response
```

### Data Access Layer

**TypeORM Repositories**:
- Abstraction between routes and database
- Query building and execution
- Data relationship management
- Transaction support

**Pattern**:
```typescript
// Route Handler
const countries = await countryRepository.find();

// Returns
const formattedData = countries.map(c => ({
  code: c.code,
  name: c.name,
  cases: c.reports[0].total_cases,
  // ...
}));
```

---

## API Architecture

### API Endpoints Structure

```
/api/
├── npm-covid-data/
│   ├── world              # Global statistics
│   ├── countries          # All countries
│   ├── [continent]/       # Continent data
│   ├── country-report-iso-based/:iso
│   └── [more endpoints]
│
├── api-covid-data/
│   ├── allreports         # All reports
│   ├── reports/:iso       # Country reports
│   ├── provinces-report-iso-based/:iso
│   ├── usa-states         # US state data
│   └── [region]-states    # Other regions
│
├── covid-ovid-data/
│   ├── /                  # All data
│   └── sixmonth/:iso      # 6-month history
│
├── vaccines/
│   ├── get-all-vaccines           # All vaccines
│   ├── get-all-vaccines-phase-i   # Phase I vaccines
│   ├── get-vaccines/:category     # By category
│   ├── get-vaccines/:category/:name # Specific vaccine
│   ├── get-all-treatment          # All treatments
│   └── [more endpoints]
│
├── news/
│   ├── get-all-news/:page         # All news
│   ├── get-coronavirus-news/:page
│   ├── get-vaccine-news/:page
│   └── get-health-news/:page
│
└── /sitemap.xml           # XML sitemap
```

### Response Format

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "timestamp": "2025-11-12T10:30:00Z"
}
```

---

## Deployment Architecture

### Docker Containerization

```
Dockerfile (Multi-stage)
├── Build Stage
│   ├── Install dependencies
│   ├── Compile TypeScript
│   └── Build React frontend
│
└── Runtime Stage
    ├── Node.js runtime
    ├── Copy built artifacts
    ├── Copy production files
    └── Start server
```

### Docker Compose

```
Services
├── vaccovid-app
│   ├── Node.js backend
│   ├── React frontend
│   └── Port 5000, 3000
│
├── postgres
│   ├── PostgreSQL database
│   ├── Port 5432
│   └── Persistent volume
│
└── Networking
    ├── Internal network
    ├── Service discovery
    └── Health checks
```

### Kubernetes Architecture

```
Kubernetes Cluster
├── Namespace: vaccovid
│
├── Deployments
│   ├── backend (3 replicas, 2-10 autoscale)
│   ├── frontend (2 replicas, 2-5 autoscale)
│   └── postgres (1 StatefulSet)
│
├── Services
│   ├── backend-service
│   ├── frontend-service
│   └── postgres-service
│
├── Ingress
│   ├── TLS termination
│   ├── Host routing
│   └── Path routing
│
├── ConfigMaps
│   ├── Database config
│   └── App config
│
├── PersistentVolumes
│   ├── Database storage
│   └── Data persistence
│
├── HorizontalPodAutoscaler
│   ├── Backend scaling
│   └── Frontend scaling
│
└── Network Policies
    └── Pod isolation
```

### Helm Chart Structure

```
helm/vaccovid/
├── Chart.yaml            # Chart metadata
├── values.yaml           # Default values
│
├── templates/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── configmap.yaml
│   ├── secrets.yaml
│   ├── pvc.yaml
│   └── hpa.yaml
```

---

## Summary

VacCOVID's architecture is designed for:

- **Scalability**: Horizontal scaling with Kubernetes HPA
- **Reliability**: Multi-replica deployments, health checks
- **Maintainability**: Clear separation of concerns, modular components
- **Performance**: Indexed database, cached data, CDN-ready frontend
- **Security**: Read-only operations, isolated containers, network policies

The three-tier architecture provides clean separation between presentation (React), application logic (Express), and data (PostgreSQL), making the system easy to understand, maintain, and scale.

---

*Last Updated: November 2025*
