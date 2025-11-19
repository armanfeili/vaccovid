# VacCOVID Migration Guide (Archived → Static)

## What Changed
- All data update/fetch jobs removed (timers, mutation routes).
- Database set to read-only (`synchronize: false`).
- UI updated with archived notices; no live polling or countdowns.
- Dependencies remain for backward compatibility, but live fetch utilities are deprecated.

## Deprecated Features
- Scheduled fetchers (`timer.ts`, `fetch.ts`) removed.
- Mutation endpoints (PUT/POST/DELETE) for COVID data, vaccines, news removed.
- Background news/image fetching removed.

## How to Consume the Archive
1. **Use read-only API endpoints** (see `docs/API_ARCHIVE.md`).
2. **No API keys required**; base URL defaults to `/api`.
3. Treat responses as **static snapshot** (last collected: February 14, 2023).

## Optional: Go Fully Static (No Database)
1. Run the API against your archived DB and export responses to JSON:
   - COVID: `/api/npm-covid-data/*`, `/api/api-covid-data/*`, `/api/covid-ovid-data/*`
   - Vaccines/Treatments: `/api/vaccines/*`
   - News: `/api/news/*`
2. Place exported JSON files in `client/public/data/`.
3. Wire a loader (e.g., `/client/src/utils/staticDataLoader.js`) or adjust actions to read from those files instead of `/api`.
4. Deploy the React `build/` folder to a static host (Netlify, Vercel, GitHub Pages).

## Deployment Paths
- **Hybrid (current):** Backend serves archived API from read-only DB; React frontend consumes `/api`.
- **Static-only:** Serve pre-generated JSON with static hosting; remove backend/database from the deployment stack.

## Housekeeping Checklist
- Verify removed endpoints return appropriate errors.
- Ensure no background jobs or timers run at startup.
- Remove/replace unused dependencies once utility files are fully archived (e.g., `covid19-api`, `rss-parser`).
- Update infrastructure templates (Docker/CI) to exclude database if moving to JSON exports.

## Testing Suggestions
- Smoke test GET endpoints for expected data shapes.
- Render key pages (world, continent, country, vaccine, treatment, news) to ensure props resolve without live fetches.
- Validate builds: `npx tsc --skipLibCheck`, `npm run build --prefix client`.
