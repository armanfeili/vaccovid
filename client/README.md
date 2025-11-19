# VacCOVID React Client (Archived)

This React app renders the archived VacCOVID dataset (COVID-19, vaccines, treatments, and news). Data was last collected on **February 14, 2023** and is read-only.

## Scripts
- `npm start` – run the client in development mode (expects the API at `http://localhost:5000/api` or proxied)
- `npm run build` – build the static site under `client/build`
- `npm test` – CRA test runner (no active tests for live fetching)

## Notes
- All API calls point at `/api`; no polling or background refresh is used.
- If you export JSON for static hosting, place it in `public/data/` and adjust the loader as needed.
- Environment variables for live data sources are no longer required.
