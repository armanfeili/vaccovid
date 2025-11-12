# VacCOVID API Documentation

## Table of Contents
1. [API Overview](#api-overview)
2. [Base URL & Authentication](#base-url--authentication)
3. [COVID-19 Data Endpoints](#covid-19-data-endpoints)
4. [Vaccine & Treatment Endpoints](#vaccine--treatment-endpoints)
5. [News Endpoints](#news-endpoints)
6. [Sitemap](#sitemap)
7. [Response Formats](#response-formats)
8. [Error Handling](#error-handling)
9. [Rate Limiting](#rate-limiting)
10. [Examples](#examples)

---

## API Overview

The VacCOVID API provides read-only access to archived COVID-19, vaccine, treatment, and news data. All endpoints return JSON data and support CORS for cross-origin requests.

**Key Characteristics**:
- **Type**: RESTful API
- **Protocol**: HTTP/HTTPS
- **Content Type**: application/json
- **Mode**: Read-only (GET requests only)
- **Data**: Static/Archived (Last updated October 2020)

---

## Base URL & Authentication

### Base URL
```
http://localhost:5000/api
```

For production:
```
https://vaccovid.live/api
```

### Authentication
**No authentication required** - All endpoints are publicly accessible.

### CORS
CORS headers are enabled for cross-origin requests from web browsers.

---

## COVID-19 Data Endpoints

All COVID-19 endpoints return data about cases, deaths, tests, and recovery statistics.

### 1. World Statistics

**Endpoint**:
```
GET /npm-covid-data/world
```

**Description**: Get global COVID-19 statistics

**Response**:
```json
{
  "success": true,
  "data": {
    "total_cases": 1234567,
    "total_deaths": 12345,
    "total_recovered": 1000000,
    "total_tests": 5000000,
    "active_cases": 222222
  }
}
```

**Parameters**: None

---

### 2. All Countries

**Endpoint**:
```
GET /npm-covid-data/countries
```

**Description**: Get COVID-19 statistics for all countries

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "country_code": "US",
      "country_name": "United States",
      "total_cases": 234567,
      "new_cases": 5000,
      "active_cases": 50000,
      "serious_critical": 2000,
      "total_deaths": 5000,
      "new_deaths": 100,
      "total_tests": 1000000,
      "recovered": 180000,
      "infection_risk": 2.5,
      "case_fatality_rate": 2.1,
      "test_percentage": 0.3,
      "recovery_percentage": 76.7
    },
    // ... more countries
  ]
}
```

**Parameters**: None

**Metrics Included**:
- `total_cases`: Cumulative confirmed cases
- `new_cases`: Cases reported in last 24 hours
- `active_cases`: Ongoing active infections
- `serious_critical`: Cases in critical condition
- `total_deaths`: Cumulative deaths
- `new_deaths`: Deaths in last 24 hours
- `total_tests`: Total tests conducted
- `recovered`: Total recovered patients
- `infection_risk`: Risk percentage
- `case_fatality_rate`: CFR percentage
- `test_percentage`: Tests as % of population
- `recovery_percentage`: Recovered as % of cases

---

### 3. Countries by Region

**Endpoint**:
```
GET /npm-covid-data/{region}
```

**Regions Available**:
- `asia`
- `africa`
- `europe`
- `northamerica`
- `southamerica`
- `australia`

**Example**:
```
GET /npm-covid-data/asia
```

**Response**: Array of countries in that region with same structure as "All Countries"

---

### 4. Country Report (ISO-based)

**Endpoint**:
```
GET /npm-covid-data/country-report-iso-based/{iso}
```

**Parameters**:
- `iso` (required): ISO 3166-1 alpha-3 country code (e.g., "USA", "GBR", "IND")

**Example**:
```
GET /npm-covid-data/country-report-iso-based/USA
```

**Response**:
```json
{
  "success": true,
  "data": {
    "country_code": "USA",
    "country_name": "United States",
    "total_cases": 234567,
    "new_cases": 5000,
    "active_cases": 50000,
    "serious_critical": 2000,
    "total_deaths": 5000,
    "new_deaths": 100,
    "total_tests": 1000000,
    "recovered": 180000,
    "metrics": {
      "infection_risk": 2.5,
      "case_fatality_rate": 2.1,
      "test_percentage": 0.3,
      "recovery_percentage": 76.7
    }
  }
}
```

---

### 5. API.io COVID Data

**Endpoint**:
```
GET /api-covid-data/allreports
```

**Description**: All COVID-19 reports from API.io source

**Response**: Array of reports with detailed country and province data

---

### 6. Province/State Data

**Endpoint**:
```
GET /api-covid-data/provinces-report-iso-based/{iso}
```

**Parameters**:
- `iso` (required): Country ISO code

**Example**:
```
GET /api-covid-data/provinces-report-iso-based/USA
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "country": "United States",
      "province": "New York",
      "cases": 100000,
      "deaths": 5000,
      "recovered": 80000,
      "updated": "2020-10-31"
    },
    // ... more states
  ]
}
```

---

### 7. US States

**Endpoint**:
```
GET /api-covid-data/usa-states
```

**Description**: COVID-19 data for all US states

**Response**: Array of US states with full statistics

---

### 8. Other Regional Data

**Endpoints** (similar pattern):
```
GET /api-covid-data/canada-states
GET /api-covid-data/brazil-states
GET /api-covid-data/germany-states
GET /api-covid-data/australia-states
```

---

### 9. OWID (Our World in Data)

**Endpoint**:
```
GET /covid-ovid-data/
```

**Description**: COVID-19 data from Our World in Data source

---

### 10. OWID 6-Month History

**Endpoint**:
```
GET /covid-ovid-data/sixmonth/{iso}
```

**Parameters**:
- `iso` (required): ISO 3166-1 alpha-3 country code

**Description**: 6-month historical trend data for a country

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "date": "2020-05-31",
      "total_cases": 100000,
      "total_deaths": 5000,
      "new_cases": 10000,
      "new_deaths": 500
    },
    {
      "date": "2020-06-30",
      "total_cases": 150000,
      "total_deaths": 7500,
      "new_cases": 12000,
      "new_deaths": 600
    },
    // ... more dates
  ]
}
```

---

## Vaccine & Treatment Endpoints

All vaccine and treatment endpoints return data about clinical trials and FDA approval status.

### 1. All Vaccines

**Endpoint**:
```
GET /vaccines/get-all-vaccines
```

**Description**: Get all vaccines in all clinical stages

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Pfizer-BioNTech",
      "manufacturer": "Pfizer Inc.",
      "clinical_stage": "Phase III",
      "platform": "mRNA",
      "description": "RNA-based vaccine...",
      "next_steps": "FDA review...",
      "fda_approved": false,
      "last_updated": "2020-10-31",
      "links": ["https://..."]
    },
    // ... more vaccines
  ]
}
```

---

### 2. Vaccines by Clinical Stage

**Endpoints**:
```
GET /vaccines/get-all-vaccines-pre-clinical
GET /vaccines/get-all-vaccines-phase-i
GET /vaccines/get-all-vaccines-phase-ii
GET /vaccines/get-all-vaccines-phase-iii
GET /vaccines/get-all-vaccines-phase-iv
```

**Description**: Get vaccines in a specific clinical stage

**Response**: Same structure as "All Vaccines" filtered by stage

---

### 3. FDA Approved Vaccines

**Endpoint**:
```
GET /vaccines/get-fda-approved-vaccines
```

**Description**: Get only FDA-approved vaccines

**Response**: Array of approved vaccines

---

### 4. Vaccines by Category

**Endpoint**:
```
GET /vaccines/get-vaccines/{category}
```

**Categories**:
- `rna-based` or `mRNA`
- `dna-based`
- `inactivated-virus`
- `live-attenuated-virus`
- `viral-vector-replicating`
- `viral-vector-non-replicating`
- `bacterial-vector`
- `virus-like-particle`
- `protein-subunit`

**Example**:
```
GET /vaccines/get-vaccines/mRNA
```

**Response**: Array of vaccines in that category

---

### 5. Specific Vaccine

**Endpoint**:
```
GET /vaccines/get-vaccines/{category}/{name}
```

**Parameters**:
- `category` (required): Vaccine category
- `name` (required): Vaccine name (URL-encoded)

**Example**:
```
GET /vaccines/get-vaccines/mRNA/Pfizer-BioNTech
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Pfizer-BioNTech",
    "manufacturer": "Pfizer Inc.",
    "clinical_stage": "Phase III",
    "platform": "mRNA",
    "description": "Detailed vaccine information...",
    "next_steps": "Detailed next steps...",
    "fda_approved": false,
    "last_updated": "2020-10-31",
    "efficacy": "95%",
    "links": [
      "https://clinicaltrials.gov/...",
      "https://..."
    ]
  }
}
```

---

### 6. All Treatments

**Endpoint**:
```
GET /vaccines/get-all-treatment
```

**Description**: Get all COVID-19 treatments

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Remdesivir",
      "category": "Antiviral",
      "clinical_stage": "Phase III",
      "description": "Antiviral medication...",
      "applications": "Treatment of COVID-19...",
      "fda_approved": false,
      "links": ["https://..."]
    },
    // ... more treatments
  ]
}
```

---

### 7. Treatments by Clinical Stage

**Endpoints**:
```
GET /vaccines/get-all-treatment-pre-clinical
GET /vaccines/get-all-treatment-clinical
GET /vaccines/get-all-fda-approved-treatment
```

---

### 8. Treatments by Category

**Endpoint**:
```
GET /vaccines/get-treatments/{category}
```

**Categories**:
- `antibodies`
- `antivirals`
- `cell-based-therapies`
- `rna-based`
- `device`
- `repurposing`

---

### 9. Specific Treatment

**Endpoint**:
```
GET /vaccines/get-treatments/{category}/{name}
```

**Example**:
```
GET /vaccines/get-treatments/antivirals/Remdesivir
```

---

## News Endpoints

All news endpoints return paginated news articles from archived sources.

### 1. All News

**Endpoint**:
```
GET /news/get-all-news/{page}
```

**Parameters**:
- `page` (required): Page number (starts at 1)

**Response**:
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": 1,
        "title": "New COVID-19 Cases...",
        "content": "Article content...",
        "source": "WHO",
        "category": "coronavirus",
        "published_date": "2020-10-31T10:30:00Z",
        "link": "https://www.who.int/...",
        "image_url": "https://..."
      },
      // ... more articles (typically 10-20 per page)
    ],
    "total_articles": 5000,
    "total_pages": 250,
    "current_page": 1,
    "articles_per_page": 20
  }
}
```

---

### 2. Category-Specific News

**Endpoints**:
```
GET /news/get-coronavirus-news/{page}
GET /news/get-vaccine-news/{page}
GET /news/get-health-news/{page}
```

**Parameters**:
- `page` (required): Page number

**Response**: Same as "All News" but filtered by category

---

## Sitemap

**Endpoint**:
```
GET /sitemap.xml
```

**Description**: XML sitemap for SEO

**Format**: Standard XML sitemap with all public URLs

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vaccovid.live/</loc>
    <changefreq>never</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- ... more URLs ... -->
</urlset>
```

---

## Response Formats

### Success Response

```json
{
  "success": true,
  "data": {
    // Actual response data
  },
  "timestamp": "2025-11-12T10:30:00Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2025-11-12T10:30:00Z"
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful request |
| 400 | Bad Request | Invalid parameters |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

### Common Errors

**Invalid ISO Code**:
```json
{
  "success": false,
  "error": "Invalid country code",
  "code": "INVALID_COUNTRY_CODE"
}
```

**Invalid Page Number**:
```json
{
  "success": false,
  "error": "Page number must be greater than 0",
  "code": "INVALID_PAGE"
}
```

**Not Found**:
```json
{
  "success": false,
  "error": "Vaccine not found",
  "code": "NOT_FOUND"
}
```

---

## Rate Limiting

**No rate limiting** is implemented since all data is static and served from cache.

However, for production deployments, consider implementing:
- Request throttling per IP
- API key system for tracking usage
- Redis caching for frequently accessed endpoints

---

## Examples

### Example 1: Get US COVID Statistics

```bash
curl -X GET "http://localhost:5000/api/npm-covid-data/country-report-iso-based/USA"
```

**Response**:
```json
{
  "success": true,
  "data": {
    "country_code": "USA",
    "country_name": "United States",
    "total_cases": 8534555,
    "new_cases": 65000,
    "active_cases": 2500000,
    "serious_critical": 18000,
    "total_deaths": 226000,
    "new_deaths": 800,
    "total_tests": 135000000,
    "recovered": 5800000,
    "metrics": {
      "infection_risk": 2.58,
      "case_fatality_rate": 2.65,
      "test_percentage": 40.8,
      "recovery_percentage": 67.9
    }
  }
}
```

### Example 2: Get All mRNA Vaccines

```bash
curl -X GET "http://localhost:5000/api/vaccines/get-vaccines/mRNA"
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Pfizer-BioNTech",
      "manufacturer": "Pfizer Inc.",
      "clinical_stage": "Phase III",
      "platform": "mRNA",
      "description": "...",
      "fda_approved": false,
      "last_updated": "2020-10-31"
    },
    {
      "id": 2,
      "name": "Moderna",
      "manufacturer": "Moderna Inc.",
      "clinical_stage": "Phase III",
      "platform": "mRNA",
      "description": "...",
      "fda_approved": false,
      "last_updated": "2020-10-31"
    }
  ]
}
```

### Example 3: Get First Page of COVID News

```bash
curl -X GET "http://localhost:5000/api/news/get-coronavirus-news/1"
```

**Response**:
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": 1,
        "title": "WHO Declares COVID-19 Pandemic",
        "content": "...",
        "source": "WHO",
        "category": "coronavirus",
        "published_date": "2020-10-31T10:30:00Z",
        "link": "https://www.who.int/...",
        "image_url": "https://..."
      },
      // ... more articles
    ],
    "total_articles": 5000,
    "total_pages": 250,
    "current_page": 1,
    "articles_per_page": 20
  }
}
```

### Example 4: Get 6-Month US Trend Data

```bash
curl -X GET "http://localhost:5000/api/covid-ovid-data/sixmonth/USA"
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "date": "2020-05-01",
      "total_cases": 1000000,
      "total_deaths": 56000,
      "new_cases": 50000,
      "new_deaths": 1500
    },
    {
      "date": "2020-06-01",
      "total_cases": 2000000,
      "total_deaths": 110000,
      "new_cases": 80000,
      "new_deaths": 2000
    },
    // ... more dates through October 2020
  ]
}
```

---

## Integration Guide

### Using Axios (JavaScript/React)

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Get country data
const getCountryData = async (iso) => {
  try {
    const response = await apiClient.get(`/npm-covid-data/country-report-iso-based/${iso}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Get vaccines
const getVaccines = async (category) => {
  try {
    const response = await apiClient.get(`/vaccines/get-vaccines/${category}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching vaccines:', error);
  }
};
```

### Using Fetch (JavaScript)

```javascript
// Get news
const getNews = async (page = 1) => {
  try {
    const response = await fetch(`/api/news/get-all-news/${page}`);
    const json = await response.json();
    return json.data.articles;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Using cURL

```bash
# Get all countries
curl -H "Accept: application/json" \
  "http://localhost:5000/api/npm-covid-data/countries"

# Get specific vaccine
curl "http://localhost:5000/api/vaccines/get-vaccines/mRNA/Pfizer-BioNTech"

# Get news page
curl "http://localhost:5000/api/news/get-vaccine-news/1"
```

---

*Last Updated: November 2025*  
*API Version: 1.0*  
*Data Status: Static Archive (October 2020)*
