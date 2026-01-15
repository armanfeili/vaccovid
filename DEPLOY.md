# Deployment Guide

This project has been configured to be deployed as a static site on GitHub Pages.

## Prerequisites

- Node.js installed
- `client` dependencies installed (`npm install` in `client` directory)

## Steps to Deploy

1.  **Generate Static Data**
    The site uses pre-generated static data instead of a live backend. Run the following command from the root of the repository to generate the data file:

    ```bash
    node scripts/export-static-data.js
    ```
    This creates `client/public/data/mock-api-data.json`.

2.  **Build the Client**
    Navigate to the `client` directory and run the build command.
    *Note: If you are using a newer Node.js version (v17+), you might need to set `NODE_OPTIONS=--openssl-legacy-provider`.*

    ```bash
    cd client
    export NODE_OPTIONS=--openssl-legacy-provider
    npm run build
    ```

3.  **Deploy to GitHub Pages**

    **Option A: Using the `gh-pages` package (Recommended)**
    The project is set up to deploy using the `gh-pages` package.

    ```bash
    cd client
    npm run deploy
    ```
    This will push the `build` folder to the `gh-pages` branch of your repository.

    **Option B: Manual Deployment**
    You can manually deploy the contents of the `client/build` directory to any static hosting service.

    -   Ensure your repository settings on GitHub have GitHub Pages enabled and pointing to the `gh-pages` branch.

## Configuration

-   **Homepage**: The `client/package.json` file has `"homepage": "."` set. This allows the app to be hosted at any subpath (e.g., `username.github.io/repo-name/` or `custom-domain.com/`).
-   **Router**: The app uses `HashRouter` (`/#/route`), which is compatible with GitHub Pages as it avoids server-side routing issues.
-   **Data**: The app loads data from `./data/mock-api-data.json`. This file is generated in Step 1.

## Troubleshooting

-   **Blank Page**: Check the console for errors. Ensure `mock-api-data.json` was generated and exists in the build output (`build/data/mock-api-data.json`).
-   **Build Errors**: If you see "OpenSSL" errors, make sure to use `export NODE_OPTIONS=--openssl-legacy-provider` before building.
