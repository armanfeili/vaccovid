const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BUILD_DIR = path.join(__dirname, 'client', 'build');

console.log(`📁 Frontend directory: ${BUILD_DIR}`);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load mock API routes
try {
  const mockApi = require('./mockApi');
  app.use('/api', mockApi);
  console.log('✅ Mock API loaded successfully');
} catch (err) {
  console.error('❌ Failed to load mock API:', err.message);
}

// Serve static files from client build
// The client was built with PUBLIC_URL=/vaccovid/, so serve at both paths
app.use('/vaccovid', express.static(BUILD_DIR));
app.use(express.static(BUILD_DIR));

// Handle React Router - serve index.html for all non-file requests
app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
  console.log(`📊 Frontend: ${BUILD_DIR}`);
  console.log(`📊 Mock API: Loaded`);
});
