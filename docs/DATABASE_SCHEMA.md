# VacCOVID Database Schema & Data Structure

## Table of Contents
1. [Database Overview](#database-overview)
2. [Entity Relationship Diagram](#entity-relationship-diagram)
3. [Core Entities](#core-entities)
4. [Data Types & Constraints](#data-types--constraints)
5. [Indexes & Performance](#indexes--performance)
6. [Sample Data](#sample-data)
7. [Data Relationships](#data-relationships)
8. [Query Examples](#query-examples)

---

## Database Overview

**System**: PostgreSQL 12+  
**Database Name**: `vaccovid`  
**Character Set**: UTF-8  
**Data Status**: Static/Archived (Read-only in application)  
**Data Date**: October 2020  

### Database Statistics

```sql
-- Total tables: 6+
-- Total records: ~10,000+
-- Database size: ~500MB
-- Connection: Read-only application user
```

---

## Entity Relationship Diagram

```
┌─────────────────┐
│    COUNTRY      │
│  (Dimension)    │
├─────────────────┤
│ id (PK)         │
│ code (ISO-3166) │
│ name            │
│ region          │
│ population      │
└────────┬────────┘
         │
         │ 1:N
         │
    ┌────▼─────────────────┐
    │   COVID_REPORT       │
    │  (Fact - Time Series)│
    ├──────────────────────┤
    │ id (PK)              │
    │ country_id (FK)      │
    │ date                 │
    │ total_cases          │
    │ new_cases            │
    │ active_cases         │
    │ serious_critical     │
    │ total_deaths         │
    │ new_deaths           │
    │ total_tests          │
    │ recovered            │
    │ computed_metrics     │
    └──────────────────────┘

┌─────────────────┐
│    PROVINCE     │
│  (Dimension)    │
├─────────────────┤
│ id (PK)         │
│ country_id (FK) │
│ name            │
│ code            │
└────────┬────────┘
         │
         │ 1:N
         │
    ┌────▼──────────────────┐
    │  PROVINCE_REPORT      │
    │ (Fact - Time Series)  │
    ├───────────────────────┤
    │ id (PK)               │
    │ province_id (FK)      │
    │ date                  │
    │ total_cases           │
    │ deaths                │
    │ recovered             │
    └───────────────────────┘

┌──────────────────┐
│     VACCINE      │
│  (Dimension)     │
├──────────────────┤
│ id (PK)          │
│ name             │
│ manufacturer     │
│ clinical_stage   │
│ platform         │
│ description      │
│ fda_approved     │
│ last_updated     │
└──────────────────┘

┌──────────────────┐
│   TREATMENT      │
│  (Dimension)     │
├──────────────────┤
│ id (PK)          │
│ name             │
│ category         │
│ clinical_stage   │
│ description      │
│ fda_approved     │
│ last_updated     │
└──────────────────┘

┌──────────────────┐
│      NEWS        │
│  (Fact)          │
├──────────────────┤
│ id (PK)          │
│ title            │
│ content          │
│ source           │
│ category         │
│ published_date   │
│ link             │
│ image_url        │
│ created_at       │
└──────────────────┘
```

---

## Core Entities

### 1. COUNTRY

**Purpose**: Dimension table for all countries/territories

**SQL Definition**:
```sql
CREATE TABLE country (
  id SERIAL PRIMARY KEY,
  code VARCHAR(3) UNIQUE NOT NULL,      -- ISO 3166-1 alpha-3
  name VARCHAR(255) NOT NULL,
  region VARCHAR(100),                  -- Continent/region
  population BIGINT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_country_code ON country(code);
CREATE INDEX idx_country_region ON country(region);
```

**Sample Data**:
```sql
| id | code | name             | region       | population  |
|----|------|------------------|--------------|-------------|
| 1  | USA  | United States    | North America| 331900000   |
| 2  | GBR  | United Kingdom   | Europe       | 67220000    |
| 3  | IND  | India            | Asia         | 1393409000  |
| 4  | BRA  | Brazil           | South America| 212559000   |
| 5  | CHN  | China            | Asia         | 1412000000  |
```

**Columns**:
- `id`: Unique identifier
- `code`: ISO 3166-1 alpha-3 country code (e.g., "USA", "GBR")
- `name`: Official country name
- `region`: Continental region
- `population`: Country population (at snapshot time)

---

### 2. PROVINCE

**Purpose**: Dimension table for regions within countries

**SQL Definition**:
```sql
CREATE TABLE province (
  id SERIAL PRIMARY KEY,
  country_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (country_id) REFERENCES country(id)
);

CREATE INDEX idx_province_country ON province(country_id);
CREATE INDEX idx_province_name ON province(name);
```

**Covered Countries**:
- United States (50 states + DC)
- Canada (10 provinces + 3 territories)
- Australia (8 states/territories)
- Brazil (27 states)
- Germany (16 states)

---

### 3. COVID_REPORT

**Purpose**: Fact table with daily COVID-19 statistics by country

**SQL Definition**:
```sql
CREATE TABLE covid_report (
  id SERIAL PRIMARY KEY,
  country_id INTEGER NOT NULL,
  date DATE NOT NULL,
  
  -- Case metrics
  total_cases INTEGER,
  new_cases INTEGER,
  active_cases INTEGER,
  serious_critical INTEGER,
  
  -- Death metrics
  total_deaths INTEGER,
  new_deaths INTEGER,
  
  -- Test & recovery metrics
  total_tests INTEGER,
  recovered INTEGER,
  
  -- Computed metrics
  infection_risk DECIMAL(5,2),          -- % of population infected
  case_fatality_rate DECIMAL(5,2),      -- Deaths / Total Cases %
  test_percentage DECIMAL(5,2),         -- Tests / Population %
  recovery_percentage DECIMAL(5,2),     -- Recovered / Cases %
  
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (country_id) REFERENCES country(id),
  UNIQUE(country_id, date)
);

CREATE INDEX idx_covid_country_date ON covid_report(country_id, date);
CREATE INDEX idx_covid_date ON covid_report(date);
CREATE INDEX idx_covid_cases ON covid_report(total_cases DESC);
```

**Sample Data**:
```sql
| id | country_id | date       | total_cases | new_cases | active_cases | total_deaths | new_deaths | ... |
|----|------------|------------|------------|-----------|--------------|-------------|-----------|-----|
| 1  | 1 (USA)    | 2020-10-31 | 8534555    | 65000     | 2500000      | 226000      | 800       | ... |
| 2  | 2 (GBR)    | 2020-10-31 | 1014711    | 15000     | 400000       | 47582       | 360       | ... |
| 3  | 3 (IND)    | 2020-10-31 | 8102051    | 45000     | 1500000      | 121090      | 500       | ... |
```

**Key Metrics**:

| Metric | Formula | Interpretation |
|--------|---------|-----------------|
| `infection_risk` | (total_cases / population) × 100 | % of population infected |
| `case_fatality_rate` | (total_deaths / total_cases) × 100 | % of cases that died |
| `test_percentage` | (total_tests / population) × 100 | % of population tested |
| `recovery_percentage` | (recovered / total_cases) × 100 | % of cases that recovered |

---

### 4. PROVINCE_REPORT

**Purpose**: Fact table with daily COVID-19 statistics by region

**SQL Definition**:
```sql
CREATE TABLE province_report (
  id SERIAL PRIMARY KEY,
  province_id INTEGER NOT NULL,
  date DATE NOT NULL,
  
  total_cases INTEGER,
  new_cases INTEGER,
  total_deaths INTEGER,
  new_deaths INTEGER,
  recovered INTEGER,
  
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (province_id) REFERENCES province(id),
  UNIQUE(province_id, date)
);

CREATE INDEX idx_province_report_date ON province_report(province_id, date);
```

**Sample Data**:
```sql
| id | province_id | date       | total_cases | deaths | recovered |
|----|-------------|------------|------------|--------|-----------|
| 1  | 1 (NY)      | 2020-10-31 | 450000     | 25000  | 350000    |
| 2  | 2 (CA)      | 2020-10-31 | 850000     | 32000  | 650000    |
```

---

### 5. VACCINE

**Purpose**: Dimension table for COVID-19 vaccines in development

**SQL Definition**:
```sql
CREATE TABLE vaccine (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  manufacturer VARCHAR(255),
  
  -- Development information
  clinical_stage VARCHAR(100),          -- Pre-clinical, Phase I/II/III/IV, FDA Approved
  platform VARCHAR(100),                -- mRNA, DNA, Viral Vector, etc.
  
  -- Detailed information
  description TEXT,
  next_steps TEXT,
  efficacy_rate DECIMAL(5,2),
  
  -- Status
  fda_approved BOOLEAN DEFAULT FALSE,
  approval_date DATE,
  
  -- Data lineage
  last_updated DATE,
  source VARCHAR(255),                  -- FasterCures, Milken Institute, etc.
  
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (manufacturer) REFERENCES company(name)
);

CREATE INDEX idx_vaccine_platform ON vaccine(platform);
CREATE INDEX idx_vaccine_stage ON vaccine(clinical_stage);
CREATE INDEX idx_vaccine_approved ON vaccine(fda_approved);
```

**Clinical Stages**:
```
Pre-clinical → Phase I → Phase II → Phase III → Phase IV (FDA Approved)
                                     ↓
                            Market Approval
```

**Platforms**:
- `mRNA` - RNA-based vaccines (Pfizer-BioNTech, Moderna)
- `DNA-based` - DNA plasmid vaccines
- `viral-vector` - Uses harmless virus as delivery
- `inactivated-virus` - Dead virus vaccine
- `live-attenuated` - Weakened live virus
- `protein-subunit` - Extracted viral proteins

**Sample Data**:
```sql
| id | name            | manufacturer | clinical_stage | platform | fda_approved |
|----|-----------------|--------------|-----------------|----------|--------------|
| 1  | Pfizer-BioNTech | Pfizer Inc.  | Phase III       | mRNA     | FALSE        |
| 2  | Moderna         | Moderna Inc. | Phase III       | mRNA     | FALSE        |
| 3  | AstraZeneca     | AstraZeneca  | Phase III       | Vector   | FALSE        |
```

---

### 6. TREATMENT

**Purpose**: Dimension table for COVID-19 treatments in development

**SQL Definition**:
```sql
CREATE TABLE treatment (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  
  -- Classification
  category VARCHAR(100),                -- Antiviral, Antibody, Cell-based, Device, RNA-based
  clinical_stage VARCHAR(100),          -- Pre-clinical, Clinical, FDA Approved
  
  -- Details
  description TEXT,
  applications TEXT,
  mechanism_of_action TEXT,
  
  -- Status
  fda_approved BOOLEAN DEFAULT FALSE,
  approval_date DATE,
  
  -- Data lineage
  last_updated DATE,
  source VARCHAR(255),
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_treatment_category ON treatment(category);
CREATE INDEX idx_treatment_stage ON treatment(clinical_stage);
```

**Treatment Categories**:
- `antibodies` - Monoclonal antibodies, convalescent plasma
- `antivirals` - Direct-acting antivirals (Remdesivir, etc.)
- `cell-based` - Stem cell therapies, NK cells
- `rna-based` - RNAi, siRNA, antisense oligonucleotides
- `device` - Extracorporeal filtration, oxygen therapy
- `repurposing` - Existing drugs tested for COVID-19

**Sample Data**:
```sql
| id | name       | category  | clinical_stage | fda_approved |
|----|-----------|-----------|----------------|--------------|
| 1  | Remdesivir| Antiviral | Phase III      | FALSE        |
| 2  | Tocilizumab| Antibody  | Phase III      | FALSE        |
```

---

### 7. NEWS

**Purpose**: Fact table for COVID-19 news articles from multiple sources

**SQL Definition**:
```sql
CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  
  -- Article information
  title VARCHAR(500) NOT NULL,
  content TEXT,
  summary TEXT,
  
  -- Metadata
  source VARCHAR(255),                  -- WHO, CNN, BBC, etc.
  category VARCHAR(100),                -- coronavirus, vaccine, health, other
  
  -- Dates
  published_date TIMESTAMP,
  retrieved_date TIMESTAMP,
  
  -- Links and images
  link VARCHAR(500),
  image_url VARCHAR(500),
  
  -- SEO and tracking
  author VARCHAR(255),
  language VARCHAR(10),                 -- 'en', 'es', etc.
  
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_news_published ON published_date,
  INDEX idx_news_source ON source,
  INDEX idx_news_category ON category
);

CREATE INDEX idx_news_date ON news(published_date DESC);
CREATE INDEX idx_news_source ON news(source);
CREATE INDEX idx_news_category ON news(category);
```

**News Sources**:
- WHO (World Health Organization)
- CNN, BBC, FOX News
- Bloomberg, TIME Magazine
- Medical News Today (MNT)
- National Geographic
- USA Today, Washington Post
- And 15+ others

**Categories**:
- `coronavirus` - General COVID-19 news
- `vaccine` - Vaccine development news
- `health` - General health and medical news
- `treatment` - Treatment and therapy news

**Sample Data**:
```sql
| id | title                          | source | category      | published_date |
|----|--------------------------------|--------|---------------|----------------|
| 1  | New Vaccine Shows Promise      | WHO    | vaccine       | 2020-10-31     |
| 2  | COVID Cases Rising             | CNN    | coronavirus   | 2020-10-31     |
| 3  | Treatment Trial Results        | MNT    | treatment     | 2020-10-31     |
```

---

## Data Types & Constraints

### Column Data Types

| Type | Usage | Examples |
|------|-------|----------|
| `SERIAL` | Auto-incrementing ID | Primary keys |
| `INTEGER` | Whole numbers | Case counts, deaths |
| `BIGINT` | Large numbers | Population counts |
| `DECIMAL(5,2)` | Percentages | CFR, infection risk |
| `VARCHAR(n)` | Variable text | Names, codes |
| `TEXT` | Long text | Descriptions |
| `DATE` | Date only | Report dates |
| `TIMESTAMP` | Date + time | Published dates |
| `BOOLEAN` | True/False | FDA approved status |

### Constraints

```sql
-- NOT NULL: Value must be provided
CREATE TABLE country (
  id SERIAL PRIMARY KEY,
  code VARCHAR(3) NOT NULL,
  name VARCHAR(255) NOT NULL
);

-- UNIQUE: Only one value across table
CREATE TABLE vaccine (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

-- FOREIGN KEY: Reference to another table
CREATE TABLE covid_report (
  id SERIAL PRIMARY KEY,
  country_id INTEGER NOT NULL,
  FOREIGN KEY (country_id) REFERENCES country(id)
);

-- CHECK: Validate values
CREATE TABLE covid_report (
  id SERIAL PRIMARY KEY,
  total_cases INTEGER CHECK (total_cases >= 0),
  infection_risk DECIMAL(5,2) CHECK (infection_risk >= 0 AND infection_risk <= 100)
);

-- DEFAULT: Set default value
CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  fda_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Indexes & Performance

### Existing Indexes

```sql
-- Primary Keys (automatic)
covid_report_pkey (id)
vaccine_pkey (id)
country_pkey (id)

-- Foreign Keys (recommended)
CREATE INDEX idx_covid_country_id ON covid_report(country_id);
CREATE INDEX idx_province_country_id ON province(country_id);
CREATE INDEX idx_province_report_province_id ON province_report(province_id);

-- Query Optimization
CREATE INDEX idx_covid_report_date ON covid_report(date);
CREATE INDEX idx_covid_report_country_date ON covid_report(country_id, date);
CREATE INDEX idx_vaccine_platform ON vaccine(platform);
CREATE INDEX idx_vaccine_stage ON vaccine(clinical_stage);
CREATE INDEX idx_news_published ON news(published_date DESC);
CREATE INDEX idx_news_source ON news(source);
```

### Query Optimization

**Slow Query (without index)**:
```sql
-- Takes 5+ seconds
SELECT * FROM covid_report WHERE date = '2020-10-31';
```

**Fast Query (with index)**:
```sql
-- Takes <100ms
CREATE INDEX idx_date ON covid_report(date);
SELECT * FROM covid_report WHERE date = '2020-10-31';
```

### Analyze Queries

```sql
-- Show query plan
EXPLAIN SELECT * FROM covid_report WHERE country_id = 1 AND date > '2020-09-01';

-- Show execution statistics
EXPLAIN ANALYZE SELECT * FROM covid_report WHERE country_id = 1;

-- Expected output includes:
-- Seq Scan / Index Scan
-- Cost: 0.00..1000.00 rows=100 width=256
-- Planning Time: 0.123 ms
-- Execution Time: 45.678 ms
```

---

## Sample Data

### INSERT Examples

```sql
-- Insert countries
INSERT INTO country (code, name, region, population) VALUES
  ('USA', 'United States', 'North America', 331900000),
  ('GBR', 'United Kingdom', 'Europe', 67220000),
  ('IND', 'India', 'Asia', 1393409000);

-- Insert COVID reports
INSERT INTO covid_report (country_id, date, total_cases, new_cases, total_deaths, new_deaths)
VALUES
  (1, '2020-10-31', 8534555, 65000, 226000, 800),
  (2, '2020-10-31', 1014711, 15000, 47582, 360);

-- Insert vaccines
INSERT INTO vaccine (name, manufacturer, clinical_stage, platform, fda_approved)
VALUES
  ('Pfizer-BioNTech', 'Pfizer Inc.', 'Phase III', 'mRNA', FALSE),
  ('Moderna', 'Moderna Inc.', 'Phase III', 'mRNA', FALSE);

-- Insert news
INSERT INTO news (title, source, category, published_date)
VALUES
  ('COVID-19 Cases Continue to Rise', 'WHO', 'coronavirus', '2020-10-31 12:00:00'),
  ('Vaccine Trials Show Positive Results', 'CNN', 'vaccine', '2020-10-31 14:30:00');
```

---

## Data Relationships

### One-to-Many Relationships

**Country → COVID Reports**:
```sql
-- Get all reports for United States
SELECT cr.* FROM covid_report cr
JOIN country c ON cr.country_id = c.id
WHERE c.code = 'USA';
```

**Province → Province Reports**:
```sql
-- Get all reports for New York state
SELECT pr.* FROM province_report pr
JOIN province p ON pr.province_id = p.id
WHERE p.name = 'New York' AND p.country_id = 1;
```

### Temporal Relationships

**Historical Trend Data**:
```sql
-- Get 6-month trend for USA
SELECT date, total_cases, new_cases, total_deaths
FROM covid_report
WHERE country_id = 1
AND date >= '2020-05-01' AND date <= '2020-10-31'
ORDER BY date;
```

---

## Query Examples

### Basic Queries

**Get all countries**:
```sql
SELECT * FROM country ORDER BY name;
```

**Get latest COVID data**:
```sql
SELECT c.name, cr.total_cases, cr.total_deaths, cr.recovered
FROM covid_report cr
JOIN country c ON cr.country_id = c.id
WHERE cr.date = (SELECT MAX(date) FROM covid_report)
ORDER BY cr.total_cases DESC;
```

**Get all vaccines by platform**:
```sql
SELECT platform, COUNT(*) as vaccine_count
FROM vaccine
GROUP BY platform
ORDER BY vaccine_count DESC;
```

### Advanced Queries

**Get countries with highest infection rate**:
```sql
SELECT c.name, cr.infection_risk, cr.date
FROM covid_report cr
JOIN country c ON cr.country_id = c.id
WHERE cr.date = (SELECT MAX(date) FROM covid_report)
ORDER BY cr.infection_risk DESC
LIMIT 10;
```

**Get vaccine development progress**:
```sql
SELECT clinical_stage, COUNT(*) as vaccine_count
FROM vaccine
GROUP BY clinical_stage
ORDER BY 
  CASE clinical_stage
    WHEN 'Pre-clinical' THEN 1
    WHEN 'Phase I' THEN 2
    WHEN 'Phase II' THEN 3
    WHEN 'Phase III' THEN 4
    WHEN 'Phase IV' THEN 5
    WHEN 'FDA Approved' THEN 6
  END;
```

**Get news trends**:
```sql
SELECT DATE_TRUNC('day', published_date) as day, COUNT(*) as article_count
FROM news
WHERE published_date >= NOW() - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', published_date)
ORDER BY day DESC;
```

---

## Maintenance

### Backup

```bash
# Full backup
pg_dump vaccovid > backup.sql

# Compressed backup
pg_dump vaccovid | gzip > backup.sql.gz

# Restore from backup
psql vaccovid < backup.sql
```

### Statistics

```sql
-- Table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Row counts
SELECT schemaname, tablename, n_live_tup
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;

-- Index usage
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

---

*Last Updated: November 2025*  
*Data Status: Static/Archived (October 2020)*
