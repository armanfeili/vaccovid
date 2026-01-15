/**
 * Static Data Validation Tests
 * Tests that the static JSON data files are valid and contain expected structure
 */

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../client/public/data/mock-api-data.json');

describe('Static Data Validation', () => {
  let data;

  beforeAll(() => {
    const fileContent = fs.readFileSync(DATA_PATH, 'utf8');
    data = JSON.parse(fileContent);
  });

  describe('JSON Structure', () => {
    it('should be valid JSON', () => {
      expect(data).toBeDefined();
      expect(typeof data).toBe('object');
    });

    it('should have world data', () => {
      expect(data).toHaveProperty('world');
      expect(data.world).toHaveProperty('TotalCases');
      expect(data.world).toHaveProperty('TotalDeaths');
      expect(data.world).toHaveProperty('TotalRecovered');
    });

    it('should have countries array', () => {
      expect(data).toHaveProperty('countries');
      expect(Array.isArray(data.countries)).toBe(true);
      expect(data.countries.length).toBeGreaterThan(0);
    });

    it('should have vaccines array', () => {
      expect(data).toHaveProperty('vaccines');
      expect(Array.isArray(data.vaccines)).toBe(true);
      expect(data.vaccines.length).toBeGreaterThan(0);
    });

    it('should have treatments array', () => {
      expect(data).toHaveProperty('treatments');
      expect(Array.isArray(data.treatments)).toBe(true);
    });

    it('should have news array', () => {
      expect(data).toHaveProperty('news');
      expect(Array.isArray(data.news)).toBe(true);
    });
  });

  describe('World Data', () => {
    it('should have positive case numbers', () => {
      expect(data.world.TotalCases).toBeGreaterThan(0);
      expect(data.world.TotalDeaths).toBeGreaterThan(0);
      expect(data.world.TotalRecovered).toBeGreaterThan(0);
    });

    it('deaths should be less than total cases', () => {
      expect(data.world.TotalDeaths).toBeLessThan(data.world.TotalCases);
    });

    it('recovered should be less than or equal to total cases', () => {
      expect(data.world.TotalRecovered).toBeLessThanOrEqual(data.world.TotalCases);
    });
  });

  describe('Countries Data', () => {
    it('each country should have required fields', () => {
      data.countries.forEach(country => {
        expect(country).toHaveProperty('Country');
        expect(country).toHaveProperty('iso');
        expect(country).toHaveProperty('TotalCases');
        expect(country).toHaveProperty('TotalDeaths');
        expect(country).toHaveProperty('Population');
      });
    });

    it('should include major countries', () => {
      const countryNames = data.countries.map(c => c.Country);
      expect(countryNames).toContain('United States');
      expect(countryNames).toContain('India');
      expect(countryNames).toContain('Brazil');
    });

    it('ISO codes should be 3 characters', () => {
      data.countries.forEach(country => {
        expect(country.iso.length).toBe(3);
      });
    });

    it('population should be positive for all countries', () => {
      data.countries.forEach(country => {
        expect(country.Population).toBeGreaterThan(0);
      });
    });
  });

  describe('Vaccines Data', () => {
    it('each vaccine should have required fields', () => {
      data.vaccines.forEach(vaccine => {
        expect(vaccine).toHaveProperty('id');
        expect(vaccine).toHaveProperty('name');
        expect(vaccine).toHaveProperty('developer');
        expect(vaccine).toHaveProperty('platform');
        expect(vaccine).toHaveProperty('clinical_stage');
      });
    });

    it('should include major vaccines', () => {
      const vaccineNames = data.vaccines.map(v => v.name);
      expect(vaccineNames).toContain('Pfizer-BioNTech');
      expect(vaccineNames).toContain('Moderna');
    });
  });

  describe('Treatments Data', () => {
    it('each treatment should have required fields', () => {
      data.treatments.forEach(treatment => {
        expect(treatment).toHaveProperty('id');
        expect(treatment).toHaveProperty('name');
        expect(treatment).toHaveProperty('category');
      });
    });
  });

  describe('News Data', () => {
    it('each news item should have required fields', () => {
      data.news.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('source');
      });
    });
  });
});
