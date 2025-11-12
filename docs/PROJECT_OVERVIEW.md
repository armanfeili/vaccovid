# VacCOVID Project Overview

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Project Purpose](#project-purpose)
3. [Key Features](#key-features)
4. [Project History](#project-history)
5. [Current Status](#current-status)
6. [Technology Stack](#technology-stack)
7. [Team](#team)

---

## Executive Summary

**VacCOVID** is a comprehensive, archived COVID-19 tracking and vaccine information website. Originally launched as a real-time pandemic tracker, it has been converted to a **static archive** displaying historical data from 2020-2021. The application provides information about COVID-19 cases, vaccine development, and treatments across 219 countries with detailed state-level data for 23 countries.

**Project Status**: Static Archive (Read-Only)  
**Data Freshness**: Last updated October 2020 (Historical)  
**Availability**: Production-ready for deployment

---

## Project Purpose

VacCOVID was created to serve the global community during the COVID-19 pandemic with:

1. **Real-time COVID-19 tracking** across all countries
2. **Vaccine development progress** monitoring
3. **Treatment information** for COVID-19
4. **News aggregation** from 20+ trusted sources
5. **Interactive maps** showing pandemic spread
6. **Data analytics** with trend analysis

The project was developed by a team of 2 programmers and 1 medical doctor based in Shiraz, Iran, over 6 months of development.

---

## Key Features

### 1. COVID-19 Tracker
- **Global Coverage**: 219 countries + territories
- **Regional Data**: 23 countries with state/province-level breakdowns
  - United States, Canada, India, Australia, Brazil, Japan
  - Germany, France, UK, Netherlands, Italy, China, Chile
  - Colombia, Denmark, Mexico, Peru, Pakistan, Russia
  - Spain, Sweden, Ukraine
- **Metrics Tracked**:
  - Total cases and new cases
  - Active cases, serious/critical cases
  - Total deaths and new deaths
  - Total tests and recovered cases
  - Computed metrics: Infection risk, CFR, Test %, Recovery %
- **Historical Data**: 6-month trend analysis with charts
- **Data Sources**: 3 different APIs for accuracy verification
  - Postman COVID-19 APIs
  - Our World in Data (OWID)
  - npm covid19-api

### 2. Vaccine Tracker
- **230+ Vaccines** tracked across all clinical stages
- **Clinical Stages**:
  - Pre-clinical studies
  - Phase I, II, III, IV clinical trials
  - FDA-approved vaccines
- **Vaccine Platforms**:
  - RNA-based (mRNA)
  - DNA-based
  - Inactivated virus
  - Live attenuated virus
  - Viral vector (replicating/non-replicating)
  - Bacterial vector
  - Virus-like particles (VLP)
  - Protein-subunit vaccines
- **Data Includes**:
  - Clinical trial stage
  - FDA approval status
  - Product descriptions
  - Development timelines
  - Links to detailed results
- **Data Source**: FasterCures (Milken Institute)

### 3. Treatment Tracker
- **Treatments** organized by clinical stage and platform
- **Treatment Categories**:
  - Antibodies (monoclonal, convalescent plasma)
  - Antivirals
  - Cell-based therapies
  - RNA-based therapies
  - Medical devices
  - Drug repurposing candidates
- **FDA Approval Status** clearly marked
- **Data Source**: FasterCures (Milken Institute)

### 4. News Section
- **20+ News Sources**:
  - WHO (priority)
  - CNN, BBC, FOX News, TIME
  - MNT, Bloomberg, ABC News
  - CBS, CBC, NBC, USA Today
  - New Scientist, National Geographic
  - Google News, News24, Wall Street Journal
  - Washington Post, Axios, and more
- **Coverage**: COVID-19 specific news
- **Update Frequency**: Every 5 hours (archived schedule)
- **Categories**: General, vaccine, health-related news

### 5. Interactive Maps
- **Global Map**: Worldwide COVID-19 spread visualization
- **Country Maps**: Detailed maps for major countries
  - United States
  - Canada
  - Brazil
  - Germany
  - Australia
- **Color Coding**: Cases per capita visualization
- **Planned Expansion**: Additional countries in development

### 6. Data Analytics
- **Trend Analysis**: 6-month historical trends
- **Comparative Analytics**: Country vs. global averages
- **Computed Metrics**:
  - Infection risk rate
  - Case fatality rate (CFR)
  - Test percentage
  - Recovery percentage
- **Data Presentation**: Tables, charts, visualizations

---

## Project History

### Original Development Timeline
- **Duration**: 6 months of active development
- **Team Size**: 3 people (2 programmers, 1 medical doctor)
- **Location**: Shiraz, Iran
- **Launch Date**: Early 2020 (During pandemic onset)

### Evolution Phases
1. **Phase 1-2**: Backend Cleanup & Deprecation
   - Removed all scheduled data fetching
   - Disabled database synchronization
   - Removed data update endpoints

2. **Phase 3**: Build & Compilation
   - Compiled TypeScript codebase
   - Installed all dependencies
   - Prepared for static deployment

3. **Phase 4**: Infrastructure Setup
   - Created Docker containerization
   - Built Kubernetes manifests
   - Configured Helm charts
   - Setup CI/CD pipeline

4. **Phase 5**: Testing & Deployment (Current)
   - Ready for local testing
   - Docker Compose configured
   - Kubernetes ready for enterprise deployment

---

## Current Status

### Data Status
- **Type**: Static Archive
- **Last Updated**: October 2020
- **Accessibility**: Read-only (all GET endpoints)
- **Purpose**: Historical reference and demonstration

### Active Endpoints
All endpoints are **read-only** and return archived data:

#### COVID-19 Data (20+ endpoints)
```
GET /api/npm-covid-data/world
GET /api/npm-covid-data/countries
GET /api/npm-covid-data/[continent]
GET /api/api-covid-data/[reports]
GET /api/covid-ovid-data/[data]
```

#### Vaccine & Treatment Data (15+ endpoints)
```
GET /api/vaccines/get-all-vaccines
GET /api/vaccines/get-all-vaccines-[phase]
GET /api/vaccines/get-fda-approved-vaccines
GET /api/vaccines/get-all-treatment
GET /api/vaccines/get-vaccines/[category]/[name]
```

#### News Data (4 endpoints)
```
GET /api/news/get-all-news/:page
GET /api/news/get-[category]-news/:page
```

#### Sitemap
```
GET /sitemap.xml
```

### Removed Functionality
- ❌ Scheduled data refresh jobs
- ❌ External API data fetching
- ❌ News RSS feed updates
- ❌ Database write operations
- ❌ Data deletion operations
- ❌ Real-time updates

### Deployment Readiness
✅ **Docker Compose**: Ready for local development  
✅ **Kubernetes**: Production-grade manifests  
✅ **Helm Charts**: Advanced deployment  
✅ **Cloud Platforms**: Vercel, Netlify, Heroku, Railway, Render  
✅ **CI/CD**: GitHub Actions pipeline configured  

---

## Technology Stack

### Backend
- **Runtime**: Node.js (JavaScript/TypeScript)
- **Framework**: Express.js
- **Language**: TypeScript (compiled to JavaScript)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **API Data**: Multiple COVID-19 APIs
- **Feed Parsing**: RSS Parser (archived)

### Frontend
- **Framework**: React 16.13+
- **State Management**: Redux
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Visualization**: Chart.js, React jVectorMap
- **Styling**: SCSS/CSS
- **Testing**: Jest, React Testing Library

### Build & Deployment
- **Build Tool**: TypeScript Compiler, React Scripts
- **Package Manager**: npm
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes
- **Chart Management**: Helm
- **CI/CD**: GitHub Actions
- **Cloud Ready**: Vercel, Netlify, Heroku, Railway, Render

### Dependencies Highlights
- **Chart.js** - Data visualization
- **React Router** - Client-side routing
- **Redux** - State management
- **Axios** - HTTP requests
- **Sitemap** - SEO sitemap generation
- **Winston** - Logging
- **CORS** - Cross-origin requests
- **Validator** - Data validation

---

## Team

### Original Team
- **2 Programmers**: Frontend and backend development
- **1 Medical Doctor**: Medical expertise and data validation

### Team Location
**Shiraz, Iran**

### Project Duration
**6 months** of active development (2020)

### Mission
Provide accurate, up-to-date pandemic information to help communities stay safe and informed during the COVID-19 crisis.

---

## Quick Links

- **Repository**: GitLab (vaccine-now)
- **Website**: vaccovid.live (archived)
- **Documentation**: See `/docs` folder
- **Demo Video**: https://www.youtube.com/watch?v=5gTknFJ4oj4&pbjreload=101

---

## Next Steps

See the following documentation for more details:

1. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design and components
2. **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
3. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment instructions
4. **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Database structure
5. **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - Development setup
6. **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and solutions

---

*Last Updated: November 2025*  
*Project Status: Archive Mode (Static, Read-Only)*
