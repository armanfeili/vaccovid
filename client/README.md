# VacCOVID React Client

This project is a static React application tracking COVID-19 statistics, vaccines, treatments, and news. It is designed to be hosted on GitHub Pages using static data.

## Static Deployment

The application uses a mock API layer (`src/utils/mockApi.js`) to serve data from `public/data/mock-api-data.json` instead of a live backend.

### Prerequisites

- Node.js (Version 16 or compatible)
- `npm`

### Local Development

1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    # Note: Using legacy provider for OpenSSL due to older react-scripts
    NODE_OPTIONS=--openssl-legacy-provider npm start
    ```

### Deployment

To deploy to GitHub Pages manually:

1.  Update the `homepage` field in `package.json` to match your GitHub repository URL:
    ```json
    "homepage": "https://<username>.github.io/<repository-name>/"
    ```
2.  Run the deploy script:
    ```bash
    NODE_OPTIONS=--openssl-legacy-provider npm run deploy
    ```

### Automated Deployment

A GitHub Actions workflow is included in `.github/workflows/deploy.yml`. It will automatically build and deploy the `client` directory to the `gh-pages` branch whenever changes are pushed to `master` or `main`.

## Data

The data displayed is static and located in `public/data/mock-api-data.json`. This file contains snapshots of:
- World statistics
- Country statistics
- Vaccine information
- Treatment information
- News articles

## License

[MIT License](LICENSE)
