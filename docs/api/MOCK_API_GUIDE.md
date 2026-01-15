# VacCOVID Mock API Guide

Complete documentation for the embedded mock API system that serves archived COVID-19 data.

---

## Overview

The VacCOVID Mock API provides pre-embedded COVID-19 data without requiring a database connection. This enables:

- **Static deployment** on GitHub Pages, Netlify, Vercel
- **Offline development** without PostgreSQL setup
- **Docker deployment** with minimal image size
- **Historical data preservation** from February 14, 2023

---

## Data Source

| Attribute | Value |
|-----------|-------|
| **Source** | [Our World in Data (OWID)](https://github.com/owid/covid-19-data) |
| **Last Update** | February 14, 2023 |
| **Countries** | 50+ countries with complete statistics |
| **Data Type** | Read-only archived snapshot |

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  server.js                       │
│         Express Static Server (port 3000)        │
└──────────────────────┬──────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        ▼                              ▼
┌───────────────┐              ┌───────────────────┐
│  mockApi.js   │              │  client/build/    │
│  /api/* routes│              │  React Static     │
└───────────────┘              └───────────────────┘
```

---

## API Endpoints

### COVID-19 Data

| Endpoint | Description | Response |
|----------|-------------|----------|
| `GET /api/npm-covid-data/world` | Global statistics | Array with totals |
| `GET /api/npm-covid-data/countries` | All countries | Array of 50+ countries |
| `GET /api/npm-covid-data/countries-name-ordered` | Countries A-Z | Sorted array |
| `GET /api/npm-covid-data/countries/:continent` | By continent | Filtered array |
| `GET /api/npm-covid-data/country/:iso` | Single country | Country object |

### Vaccines

| Endpoint | Description |
|----------|-------------|
| `GET /api/vaccines/get-all-vaccines` | All vaccines |
| `GET /api/vaccines/get-fda-approved-vaccines` | FDA approved only |
| `GET /api/vaccines/get-all-vaccines-phase-i` | Phase I trials |
| `GET /api/vaccines/get-all-vaccines-phase-ii` | Phase II trials |
| `GET /api/vaccines/get-all-vaccines-phase-iii` | Phase III trials |
| `GET /api/vaccines/get-vaccines/:category` | By category |
| `GET /api/vaccine/all` | All vaccines (legacy) |
| `GET /api/vaccine/:id` | Single vaccine by ID |

### Treatments

| Endpoint | Description |
|----------|-------------|
| `GET /api/vaccines/get-all-treatment` | All treatments |
| `GET /api/vaccines/get-all-fda-approved-treatment` | FDA approved |
| `GET /api/vaccines/get-treatments/:category` | By category |

### News

| Endpoint | Description |
|----------|-------------|
| `GET /api/news` | All archived news |
| `GET /api/news/:source` | News by source |

### Health Check

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | API health status |

---

## Data Structures

### Country Object

```json
{
  "Country": "United States",
  "ThreeLetterSymbol": "USA",
  "iso": "USA",
  "TotalCases": 102904309,
  "TotalDeaths": 1114990,
  "TotalRecovered": 101789319,
  "ActiveCases": 0,
  "Serious_Critical": 0,
  "NewCases": 33940,
  "NewDeaths": 445,
  "Infection_Risk": "30.4",
  "Case_Fatality_Rate": "1.1",
  "Recovery_Proporation": "98.9",
  "Population": 338289856
}
```

### World Statistics

```json
{
  "TotalCases": 673112695,
  "TotalDeaths": 6856026,
  "TotalRecovered": 666256669,
  "ActiveCases": 0,
  "Serious_Critical": 0,
  "NewCases": 179088,
  "NewDeaths": 1179
}
```

### Vaccine Object

```json
{
  "id": 1,
  "name": "Pfizer-BioNTech",
  "description": "mRNA vaccine",
  "stage": "Approved",
  "developer": "Pfizer/BioNTech",
  "category": "approved"
}
```

---

## Running the Mock API

### Standalone Server

```bash
# Start server on port 3000
node server.js

# Test endpoints
curl http://localhost:3000/api/health
curl http://localhost:3000/api/npm-covid-data/world
curl http://localhost:3000/api/npm-covid-data/countries
```

### Docker

```bash
# Build and run
docker-compose -f docker-compose.static.yml up --build

# Access at http://localhost:3000
```

---

## File Locations

| File | Description |
|------|-------------|
| `server.js` | Express server that mounts mock API |
| `mockApi.js` | All mock endpoints and embedded data |
| `client/build/` | Pre-built React frontend |

---

## Extending the Mock API

### Adding New Data

Edit `mockApi.js` and add to the data arrays:

```javascript
// Add a new country
const mockCountries = [
  // ... existing countries
  {
    "Country": "New Country",
    "ThreeLetterSymbol": "NEW",
    "iso": "NEW",
    // ... other fields
  }
];
```

### Adding New Endpoints

```javascript
// Add new route in mockApi.js
router.get('/custom-endpoint', (req, res) => {
  res.json({ data: 'your data here' });
});
```

---

## Legacy Endpoints

These endpoints exist for backward compatibility:

| Legacy | Current Equivalent |
|--------|-------------------|
| `GET /api/covid/world` | `GET /api/npm-covid-data/world` |
| `GET /api/covid/countries` | `GET /api/npm-covid-data/countries` |
| `GET /api/vaccine/all` | `GET /api/vaccines/get-all-vaccines` |

---

*Last Updated: December 2025*
