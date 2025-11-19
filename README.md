# VacCOVID (Archived)

VacCOVID is now a read-only archive of COVID-19 case, vaccine, treatment, and news data. Live data collection stopped on February 14, 2023; everything you see is a historical snapshot preserved for reference and education.

## Current Status
- Data last collected: **February 14, 2023** (no live refresh or background jobs)
- API: Express/TypeORM backend with **GET-only** endpoints (`/api/*`) against the archived database
- Frontend: React app updated with archived notices and static timestamps; no polling, websockets, or timers
- Database: read-only configuration (`synchronize: false`), update endpoints removed

## Quickstart
1. Install server deps: `npm install --ignore-scripts`
2. Install client deps: `npm install --prefix client`
3. Build backend: `npx tsc --skipLibCheck`
4. Build frontend: `npm run build --prefix client`
5. Run the stack: `npm start`

### Useful Scripts
- `npm run server` – start the compiled API server (port 5000)
- `npm run client` – start the React dev server (port 3000)
- `npm run dev` – run both servers together
- `npm run build --prefix client` – create a production React build (read-only UI)

## Data & API
- COVID-19 data: `/api/npm-covid-data/*` (world/continent/country) and `/api/api-covid-data/*` (state/province)
- OWID time series: `/api/covid-ovid-data/*`
- Vaccines & treatments: `/api/vaccines/*`
- News archive: `/api/news/*`

All mutation/update endpoints have been removed. If you need JSON exports for static hosting, generate them from the database and place them under `client/public/data/` (see docs/TODO.md, Phase 5).

## Deployment Notes
- Works as a traditional server render (`npm start`) or as a static React build served by any CDN.
- Docker/Helm files are legacy; remove database dependencies if you keep them.
- Avoid introducing new environment variables tied to live data sources; everything should run offline against the archived dataset.

## Documentation
- `docs/TODO.md` – migration plan and remaining tasks
- `IMPLEMENTATION_SUMMARY.md` – completed backend cleanup details
- `PROJECT_STATUS.txt` – phase tracker

VacCOVID is preserved for historical analysis; please do not rely on it for current public health decisions.
