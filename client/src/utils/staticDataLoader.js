/**
 * Static Data Loader
 * Loads data from JSON files instead of API
 * Used for GitHub Pages deployment
 */

class StaticDataLoader {
  constructor() {
    this.cache = {};
    this.dataUrl = '/vaccovid/data'; // GitHub Pages subdirectory path
  }

  /**
   * Load JSON data from file
   */
  async loadJSON(filename) {
    if (this.cache[filename]) {
      return this.cache[filename];
    }

    try {
      const response = await fetch(`${this.dataUrl}/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}: ${response.status}`);
      }
      const data = await response.json();
      this.cache[filename] = data;
      return data;
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      return { data: [] };
    }
  }

  /**
   * Get all vaccines
   */
  async getVaccines() {
    const result = await this.loadJSON('vaccines.json');
    return result.data || [];
  }

  /**
   * Get all news articles
   */
  async getNews(limit = 100) {
    const result = await this.loadJSON('news.json');
    const news = result.data || [];
    return news.slice(0, limit);
  }

  /**
   * Get vaccine by ID
   */
  async getVaccineById(id) {
    const vaccines = await this.getVaccines();
    return vaccines.find(v => v.id === id);
  }

  /**
   * Get news by source
   */
  async getNewsBySource(source) {
    const news = await this.getNews();
    return news.filter(n => n.source === source);
  }

  /**
   * Get unique news sources
   */
  async getNewsSources() {
    const news = await this.getNews();
    const sources = new Set(news.map(n => n.source));
    return Array.from(sources).sort();
  }

  /**
   * Search vaccines by name
   */
  async searchVaccines(query) {
    const vaccines = await this.getVaccines();
    const q = query.toLowerCase();
    return vaccines.filter(v => 
      v.name.toLowerCase().includes(q) ||
      (v.description && v.description.toLowerCase().includes(q))
    );
  }

  /**
   * Get data statistics
   */
  async getStats() {
    const vaccines = await this.getVaccines();
    const news = await this.getNews();
    
    return {
      vaccines: vaccines.length,
      newsArticles: news.length,
      lastUpdated: new Date().toISOString(),
      isStatic: true
    };
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache = {};
  }
}

// Export singleton instance
export const staticDataLoader = new StaticDataLoader();

export default StaticDataLoader;
