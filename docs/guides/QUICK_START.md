# Quick Start Guide - VacCOVID Static Website

This is a static archive of COVID-19, vaccine, and news data. **Data is no longer updated.**

## What Changed

This project has been converted from a dynamic real-time data fetching application to a **static website** displaying archived data only. All data update endpoints and background fetching jobs have been removed.

### Key Changes

✅ **Removed:**
- All scheduled data fetching jobs (timers)
- All data update/delete endpoints
- Database synchronization on startup
- External data source dependencies for updates

✅ **Kept:**
- All read-only GET endpoints for accessing archived data
- Full React UI for browsing historical data
- Database with cached data
- All existing functionality for viewing data

## Setup

### Prerequisites
- Node.js v14 or higher
- PostgreSQL (for database, or you can modify to use embedded data)
- npm

### Installation

```bash
# Install root dependencies
npm install --ignore-scripts

# Install client dependencies
npm install --prefix client

# Compile TypeScript
npx tsc --skipLibCheck

# Build React frontend
npm run build --prefix client
```

### Running Locally

```bash
# Start the application (backend + frontend)
npm start

# Or start backend and frontend separately
npm run server        # Terminal 1
npm run client        # Terminal 2
```

The application will be available at `http://localhost:3000`

## API Endpoints

All endpoints are **read-only** and return archived data:

### COVID-19 Data
```
GET /api/npm-covid-data/world
GET /api/npm-covid-data/countries
GET /api/npm-covid-data/asia
GET /api/npm-covid-data/africa
GET /api/npm-covid-data/europe
GET /api/npm-covid-data/northamerica
GET /api/npm-covid-data/southamerica
GET /api/npm-covid-data/australia
```

### Vaccine & Treatment Data
```
GET /api/vaccines/get-all-vaccines
GET /api/vaccines/get-all-vaccines-phase-i
GET /api/vaccines/get-all-vaccines-phase-ii
GET /api/vaccines/get-all-vaccines-phase-iii
GET /api/vaccines/get-all-vaccines-phase-iv
GET /api/vaccines/get-fda-approved-vaccines
GET /api/vaccines/get-all-treatment
GET /api/vaccines/get-all-fda-approved-treatment
```

### News Data
```
GET /api/news/get-all-news/:page
GET /api/news/get-coronavirus-news/:page
GET /api/news/get-vaccine-news/:page
GET /api/news/get-health-news/:page
```

## Documentation

- **`IMPLEMENTATION_SUMMARY.md`** - Detailed summary of all changes made
- **`CHANGELOG.md`** - Version history and breaking changes
- **`docs/TODO.md`** - Project roadmap and remaining tasks
- **`app/src/utils/DEPRECATED_FUNCTIONS.md`** - List of deprecated functions

## Project Structure

```
vaccovid/
├── app/                          # Node.js/Express backend
│   ├── index.ts                  # Server entry point
│   └── src/
│       ├── routes/               # API endpoints (GET only)
│       ├── db/
│       │   └── models/           # Database models
│       └── utils/                # Data access functions (deprecated functions preserved)
│
├── client/                       # React frontend
│   └── src/
│       ├── components/           # React components
│       ├── actions/              # Redux actions (read-only)
│       ├── reducers/             # Redux reducers
│       └── views/                # Static assets
│
├── build/                        # Compiled TypeScript output
├── ormconfig.json                # TypeORM config (synchronize: false)
├── package.json                  # Dependencies
└── docs/
    └── TODO.md                   # Conversion progress
```

## What Was Removed

The following no longer exist:

- ❌ Scheduled data refresh jobs
- ❌ COVID data fetching (`covid19-api` calls)
- ❌ News RSS feed fetching and updates
- ❌ Vaccine data CSV downloading and updates
- ❌ OWID data fetching and updates
- ❌ All PUT/POST/DELETE endpoints
- ❌ Data update/delete operations

### Removed Endpoints

```
❌ POST /api/vaccines/download-and-convert-vaccine-data
❌ PUT /api/vaccines/update-vaccine
❌ PUT /api/news/update-who-news
❌ PUT /api/news/update-other-news
❌ DELETE /api/news/delete-old-news
❌ PUT /api/api-covid-data/addReports
❌ PUT /api/npm-covid-data/fetch-npm-data
❌ PUT /api/covid-ovid-data/update-ovid
```

## Data Information

- **Last Updated:** October 2020 (historical archive)
- **COVID-19 Data:** From multiple sources (npm covid19-api)
- **Vaccine Data:** Clinical trial data from 2020-2021
- **News Data:** Archived from 2020-2021 feeds
- **Note:** This is a snapshot and should not be used for current pandemic information

## Development

### Available Scripts

```bash
npm start          # Start backend + frontend
npm run server     # Start backend only
npm run client     # Start frontend only
npm run dev        # Start both with auto-reload
npx tsc            # Compile TypeScript
npm run build --prefix client  # Build React app
```

### Database Configuration

Edit `ormconfig.json` to configure PostgreSQL connection:

```json
{
  "host": "localhost",
  "port": 5432,
  "username": "your_username",
  "password": "your_password",
  "database": "vaccovid",
  "synchronize": false  // Important: prevents schema changes
}
```

## Deployment

### Static Hosting (Recommended)

For static hosting services (Netlify, Vercel, GitHub Pages):

```bash
# Build frontend only
npm run build --prefix client

# Deploy the `client/build` directory
```

### Traditional Hosting

For traditional hosting (Heroku, AWS, DigitalOcean):

```bash
# Compile TypeScript
npx tsc --skipLibCheck

# Start server
npm start
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
lsof -t -i tcp:5000 | xargs kill -9

# Then restart
npm start
```

### Database Connection Failed

1. Ensure PostgreSQL is running
2. Check credentials in `ormconfig.json`
3. Create database: `createdb vaccovid`

### React Build Errors

```bash
# Clear node_modules and reinstall
rm -rf client/node_modules client/package-lock.json
npm install --prefix client --ignore-scripts
npm run build --prefix client
```

## Future Improvements

See `docs/TODO.md` for planned improvements:

- Phase 4: Frontend UI updates for static data
- Phase 5: Data verification and archiving
- Phase 6: Build optimization
- Phase 7: Enhanced documentation
- Phase 8-10: Testing and deployment preparation

## License

See LICENSE file

## Support

For issues or questions, refer to:
- `IMPLEMENTATION_SUMMARY.md` - What was changed
- `CHANGELOG.md` - What was removed/modified
- `docs/TODO.md` - What still needs to be done
