# VacCOVID Changelog

All notable changes to this project will be documented in this file.

## [Static] - 2025-11-03

### Removed
- **Removed all data fetching/updating operations** - Website now serves archived data only
  - Deleted `app/src/utils/timer.ts` - Scheduled fetch jobs that ran every X minutes
  - Deleted `fetch.ts` - Timer initialization file
  - Removed POST `/api/vaccines/download-and-convert-vaccine-data` endpoint
  - Removed PUT `/api/vaccines/update-vaccine` endpoint
  - Removed 6 news update/delete endpoints (update-who-news, update-other-news, etc.)
  - Removed 5 COVID data update endpoints (updateProvinces, addReports, etc.)
  - Removed 2 OWID data update endpoints
  - Removed deprecated npm script: `npm run timer`

### Changed
- Changed `ormconfig.json` setting `synchronize: true` → `synchronize: false`
  - Database will no longer auto-sync schema changes
  - Ensures read-only operation against archived data

- Cleaned up all route files:
  - Removed imports of deprecated functions
  - Added deprecation comments explaining why endpoints were removed
  - Preserved all GET (read-only) endpoints

### Modified Files
- `package.json` - Removed timer script
- `ormconfig.json` - Disabled database synchronization  
- `app/src/routes/vaccine.ts` - Removed update endpoints
- `app/src/routes/news.ts` - Removed update/delete endpoints
- `app/src/routes/APICovidData.ts` - Removed update endpoints
- `app/src/routes/npmCovidData.ts` - Removed fetch endpoints
- `app/src/routes/covidOvidData.ts` - Removed update endpoints
- `app/src/routes/index.ts` - Removed unused test route

### Added
- `IMPLEMENTATION_SUMMARY.md` - Detailed summary of all changes
- `app/src/utils/DEPRECATED_FUNCTIONS.md` - List of deprecated functions for reference
- Documentation comments in all modified route files

---

## Technical Details

### Deprecated Functions (Kept in utilities, not imported)
- `fetch.ts`:  `fetch_npmData()`, `fetchCasesInAllUSStates()`
- `newsData.ts`: `saveWhoNews()`, `saveOtherNews()`, `fetchOtherNewsImages()`, etc.
- `covidAPIData.ts`: `updateProvinces()`, `addDailyReports()`, `addReports()`, etc.
- `ovidData.ts`: `updateOwid()`, `downloadAndConvertOwidData()`
- `vaccineAndTreatment.ts`: `convertVaccineData()`, `updateVaccine()`

All deprecated functions remain in their files for archival purposes but are no longer called or imported.

### Build Status
- ✅ TypeScript compilation successful
- ✅ Dependencies installed
- ✅ Ready for local testing and React builds

### Next Steps
- Phase 4: Frontend UI updates (remove "live update" indicators)
- Phase 5-10: Testing, documentation, deployment

---

**Deprecation Reason:** Datasets no longer maintained/updated. VacCOVID now functions as a static archive of COVID-19, vaccine, and news data.
