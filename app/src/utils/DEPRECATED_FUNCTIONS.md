# Deprecated Functions

This document lists all functions that have been deprecated as part of converting VacCOVID to a static website. These functions are no longer called by the application but are kept for reference purposes.

## fetch.ts

- `fetch_npmData()` - Fetches live COVID data from npm covid19-api package
- `fetchCasesInAllUSStates()` - Fetches live US state COVID data

## newsData.ts

- `saveWhoNews()` - Fetches WHO news data from RSS feeds
- `saveOtherNews()` - Fetches news from other sources  
- `fetchOtherNewsImages()` - Downloads news article images
- `update_DB_WithNewsImages()` - Updates database with news images
- `deleteOldOtherNewsImages()` - Deletes old news images
- `deleteAllOldNews()` - Deletes old news articles from database
- `deleteOldNews()` - Deletes old news articles

## covidAPIData.ts

- `updateProvinces()` - Updates province-level COVID data
- `addDailyReports()` - Adds daily COVID reports
- `addReports()` - Adds COVID reports to database
- `addUSStates()` - Adds US state COVID data
- `addCityReports()` - Adds city-level COVID reports

## ovidData.ts

- `updateOwid()` - Fetches and updates OWID (Our World in Data) COVID dataset
- `downloadAndConvertOwidData()` - Downloads and converts OWID data CSV

## vaccineAndTreatment.ts

- `convertVaccineData()` - Downloads vaccine data CSV and converts to database
- `updateVaccine()` - Updates vaccine data in database

---

**All GET functions remain active for reading archived data.**

**Deprecation Date:** November 3, 2025

**Reason:** Datasets are no longer maintained/updated. Website is now static with archived data only.
