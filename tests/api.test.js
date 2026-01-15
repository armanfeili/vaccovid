/**
 * Mock API Endpoint Tests
 * Tests the mock API routes that serve archived COVID-19 data
 */

const request = require('supertest');
const express = require('express');

// Import the mock API router
const mockApi = require('../mockApi');

// Create a test app
const app = express();
app.use(express.json());
app.use('/api', mockApi);

describe('COVID-19 Data API', () => {
  
  describe('GET /api/npm-covid-data/world', () => {
    it('should return world COVID data', async () => {
      const res = await request(app).get('/api/npm-covid-data/world');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('TotalCases');
      expect(res.body[0]).toHaveProperty('TotalDeaths');
      expect(res.body[0]).toHaveProperty('TotalRecovered');
    });
  });

  describe('GET /api/npm-covid-data/countries', () => {
    it('should return list of countries with COVID data', async () => {
      const res = await request(app).get('/api/npm-covid-data/countries');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('each country should have required fields', async () => {
      const res = await request(app).get('/api/npm-covid-data/countries');
      const country = res.body[0];
      expect(country).toHaveProperty('Country');
      expect(country).toHaveProperty('iso');
      expect(country).toHaveProperty('TotalCases');
      expect(country).toHaveProperty('TotalDeaths');
      expect(country).toHaveProperty('Population');
    });
  });

  describe('GET /api/npm-covid-data/countries-name-ordered', () => {
    it('should return countries ordered by name', async () => {
      const res = await request(app).get('/api/npm-covid-data/countries-name-ordered');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      
      // Verify alphabetical order
      for (let i = 1; i < res.body.length; i++) {
        expect(res.body[i].Country.localeCompare(res.body[i-1].Country)).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('GET /api/npm-covid-data/country/:iso', () => {
    it('should return USA data by ISO code', async () => {
      const res = await request(app).get('/api/npm-covid-data/country/USA');
      expect(res.statusCode).toBe(200);
      expect(res.body.Country).toBe('United States');
      expect(res.body.iso).toBe('USA');
    });

    it('should return 404 for unknown country', async () => {
      const res = await request(app).get('/api/npm-covid-data/country/XXX');
      expect(res.statusCode).toBe(404);
    });
  });
});

describe('Vaccine API', () => {
  
  describe('GET /api/vaccine/all', () => {
    it('should return list of vaccines', async () => {
      const res = await request(app).get('/api/vaccine/all');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/vaccines/get-all-vaccines', () => {
    it('should return all vaccines', async () => {
      const res = await request(app).get('/api/vaccines/get-all-vaccines');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/vaccines/get-fda-approved-vaccines', () => {
    it('should return FDA approved vaccines', async () => {
      const res = await request(app).get('/api/vaccines/get-fda-approved-vaccines');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});

describe('Treatment API', () => {
  
  describe('GET /api/vaccines/get-all-treatment', () => {
    it('should return treatments list', async () => {
      const res = await request(app).get('/api/vaccines/get-all-treatment');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});

describe('News API', () => {
  
  describe('GET /api/news', () => {
    it('should return news articles', async () => {
      const res = await request(app).get('/api/news');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});

describe('Health Check', () => {
  
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('dataSource');
    });
  });
});
