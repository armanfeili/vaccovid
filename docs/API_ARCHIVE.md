# VacCOVID API – Archived Dataset

## Overview
VacCOVID now serves a frozen snapshot of COVID-19, vaccine, treatment, and news data (last collected: **February 14, 2023**). All endpoints are read-only; mutation/update routes were removed.

## Base URL
- Default: `/api`

## Available Endpoints (Read-Only)

### COVID-19 Data (npm-covid-data)
- `GET /api/npm-covid-data/world`
- `GET /api/npm-covid-data/countries`
- `GET /api/npm-covid-data/countries-name-ordered`
- `GET /api/npm-covid-data/country-report-iso-based/:country/:iso`
- `GET /api/npm-covid-data/asia`
- `GET /api/npm-covid-data/africa`
- `GET /api/npm-covid-data/europe`
- `GET /api/npm-covid-data/northamerica`
- `GET /api/npm-covid-data/southamerica`
- `GET /api/npm-covid-data/australia`

### COVID-19 Data (api-covid-data)
- `GET /api/api-covid-data/allreports`
- `GET /api/api-covid-data/reports/:iso`
- `GET /api/api-covid-data/provinces-report-iso-based/:iso`
- `GET /api/api-covid-data/cities-report-iso-based/:iso`
- `GET /api/api-covid-data/usa-states`
- `GET /api/api-covid-data/canada-states`
- `GET /api/api-covid-data/brazil-states`
- `GET /api/api-covid-data/germany-states`
- `GET /api/api-covid-data/australia-states`

### OWID Time Series
- `GET /api/covid-ovid-data/`
- `GET /api/covid-ovid-data/sixmonth/:iso`

### Vaccines & Treatments
- `GET /api/vaccines/get-all-vaccines`
- `GET /api/vaccines/get-all-vaccines-pre-clinical`
- `GET /api/vaccines/get-all-vaccines-phase-i`
- `GET /api/vaccines/get-all-vaccines-phase-ii`
- `GET /api/vaccines/get-all-vaccines-phase-iii`
- `GET /api/vaccines/get-all-vaccines-phase-iv`
- `GET /api/vaccines/get-fda-approved-vaccines`
- `GET /api/vaccines/get-vaccines/:category`
- `GET /api/vaccines/get-vaccines/:category/:name`
- `GET /api/vaccines/get-all-treatment`
- `GET /api/vaccines/get-all-treatment-pre-clinical`
- `GET /api/vaccines/get-all-treatment-clinical`
- `GET /api/vaccines/get-all-fda-approved-treatment`
- `GET /api/vaccines/get-treatments/:category`
- `GET /api/vaccines/get-treatments/:category/:name`

### News
- `GET /api/news/get-all-news/:page`
- `GET /api/news/get-coronavirus-news/:page`
- `GET /api/news/get-vaccine-news/:page`
- `GET /api/news/get-health-news/:page`

## Removed / Deprecated Endpoints (Do Not Use)
- All update/fetch/timer endpoints (e.g., `/fetch-npm-data`, `/update-vaccine`, `/update-who-news`, `/update-ovid`, `/updateProvinces`, etc.)
- Any POST/PUT/DELETE routes not listed above

## Notes
- Data is static and will not refresh; responses reflect the archived snapshot date.
- Database is configured read-only (`synchronize: false`).
- For static hosting without a database, export these responses to JSON and serve from `client/public/data/` (see `docs/MIGRATION_GUIDE.md`).
