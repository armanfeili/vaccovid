/**
 * Client Static Files Tests
 * Tests that the build files and required static assets exist
 */

const fs = require('fs');
const path = require('path');

const CLIENT_PUBLIC_DIR = path.join(__dirname, '../client/public');
const CLIENT_BUILD_DIR = path.join(__dirname, '../client/build');

describe('Client Public Files', () => {
  
  describe('Essential files exist', () => {
    it('should have index.html', () => {
      const filePath = path.join(CLIENT_PUBLIC_DIR, 'index.html');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it('should have 404.html for SPA routing', () => {
      const filePath = path.join(CLIENT_PUBLIC_DIR, '404.html');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it('should have manifest.json', () => {
      const filePath = path.join(CLIENT_PUBLIC_DIR, 'manifest.json');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it('should have favicon', () => {
      const favicon = path.join(CLIENT_PUBLIC_DIR, 'favicon.ico');
      expect(fs.existsSync(favicon)).toBe(true);
    });
  });

  describe('Data directory', () => {
    it('should have data directory', () => {
      const dataDir = path.join(CLIENT_PUBLIC_DIR, 'data');
      expect(fs.existsSync(dataDir)).toBe(true);
    });

    it('should have mock-api-data.json', () => {
      const dataFile = path.join(CLIENT_PUBLIC_DIR, 'data/mock-api-data.json');
      expect(fs.existsSync(dataFile)).toBe(true);
    });
  });

  describe('index.html content', () => {
    let htmlContent;

    beforeAll(() => {
      const filePath = path.join(CLIENT_PUBLIC_DIR, 'index.html');
      htmlContent = fs.readFileSync(filePath, 'utf8');
    });

    it('should contain root div', () => {
      expect(htmlContent).toContain('<div id="root">');
    });

    it('should have SPA redirect handler script', () => {
      expect(htmlContent).toContain('GitHub Pages SPA redirect handler');
    });

    it('should use %PUBLIC_URL% for assets', () => {
      expect(htmlContent).toContain('%PUBLIC_URL%/apple-touch-icon.png');
    });
  });

  describe('404.html content', () => {
    let htmlContent;

    beforeAll(() => {
      const filePath = path.join(CLIENT_PUBLIC_DIR, '404.html');
      htmlContent = fs.readFileSync(filePath, 'utf8');
    });

    it('should contain redirect script', () => {
      expect(htmlContent).toContain('l.replace');
    });

    it('should handle vaccovid path', () => {
      expect(htmlContent).toContain('pathSegmentsToKeep');
    });
  });
});

describe('Client Build Files', () => {
  const buildExists = fs.existsSync(CLIENT_BUILD_DIR);

  beforeAll(() => {
    if (!buildExists) {
      console.warn('Build directory does not exist - skipping build tests');
    }
  });

  (buildExists ? describe : describe.skip)('Build directory', () => {
    it('should have index.html', () => {
      expect(fs.existsSync(path.join(CLIENT_BUILD_DIR, 'index.html'))).toBe(true);
    });

    it('should have static directory', () => {
      expect(fs.existsSync(path.join(CLIENT_BUILD_DIR, 'static'))).toBe(true);
    });

    it('should have 404.html', () => {
      expect(fs.existsSync(path.join(CLIENT_BUILD_DIR, '404.html'))).toBe(true);
    });

    it('should have data directory with mock data', () => {
      expect(fs.existsSync(path.join(CLIENT_BUILD_DIR, 'data/mock-api-data.json'))).toBe(true);
    });
  });
});
