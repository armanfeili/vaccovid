/**
 * Mock API Service
 * Replaces axios calls with local static data
 * Used when running as a static site without backend
 */

let mockData = null;

// Load mock data
export const loadMockData = async () => {
  if (mockData) return mockData;
  
  try {
  const url = `${process.env.PUBLIC_URL || ''}/data/mock-api-data.json`;
  const response = await fetch(url);
    mockData = await response.json();
    return mockData;
  } catch (error) {
    console.error('Failed to load mock data:', error);
    return null;
  }
};

// Mock API responses
export const mockAPI = {
  // COVID-19 Data
  getWorldData: async () => {
    const data = await loadMockData();
    return { data: data?.world || { success: true, data: {} } };
  },

  getAllCountries: async () => {
    const data = await loadMockData();
    return { data: { success: true, data: data?.countries || [] } };
  },

  getCountriesByRegion: async (region) => {
    const data = await loadMockData();
    // Return filtered or all countries for now
    return { data: { success: true, data: data?.countries || [] } };
  },

  getCountryByISO: async (iso) => {
    const data = await loadMockData();
    const country = data?.countries?.find(c => c.iso === iso);
    return { data: { success: true, data: country || {} } };
  },

  getAllCountriesNameOrdered: async () => {
    const data = await loadMockData();
    const sorted = [...(data?.countries || [])].sort((a, b) => 
      a.country.localeCompare(b.country)
    );
    return { data: { success: true, data: sorted } };
  },

  getUSStates: async () => {
    const data = await loadMockData();
    // Return mock US data
    return { data: { success: true, data: data?.countries || [] } };
  },

  getCanadaStates: async () => {
    const data = await loadMockData();
    return { data: { success: true, data: data?.countries || [] } };
  },

  getBrazilStates: async () => {
    const data = await loadMockData();
    return { data: { success: true, data: data?.countries || [] } };
  },

  getGermanyStates: async () => {
    const data = await loadMockData();
    return { data: { success: true, data: data?.countries || [] } };
  },

  getAustraliaStates: async () => {
    const data = await loadMockData();
    return { data: { success: true, data: data?.countries || [] } };
  },

  getOwidData: async () => {
    const data = await loadMockData();
    return { data: { success: true, data: data?.countries || [] } };
  },

  getOwidSixMonthData: async (iso) => {
    const data = await loadMockData();
    // Return mock 6-month history
    return { data: { success: true, data: [] } };
  },

  // Vaccine Data
  getAllVaccines: async () => {
    const data = await loadMockData();
    return { data: { success: true, data: data?.vaccines || [] } };
  },

  getVaccinesByPhase: async (phase) => {
    const data = await loadMockData();
    const filtered = (data?.vaccines || []).filter(v => 
      v.clinical_stage.toLowerCase().includes(phase.toLowerCase())
    );
    return { data: { success: true, data: filtered } };
  },

  getFDAApprovedVaccines: async () => {
    const data = await loadMockData();
    const approved = (data?.vaccines || []).filter(v => v.fda_approved);
    return { data: { success: true, data: approved } };
  },

  getVaccinesByCategory: async (category) => {
    const data = await loadMockData();
    const filtered = (data?.vaccines || []).filter(v => 
      v.platform.toLowerCase().includes(category.toLowerCase())
    );
    return { data: { success: true, data: filtered } };
  },

  getVaccineByNameAndCategory: async (category, name) => {
    const data = await loadMockData();
    const vaccine = (data?.vaccines || []).find(v => 
      v.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 
      name.toLowerCase().replace(/[^a-z0-9]/g, '')
    );
    return { data: { success: true, data: vaccine || {} } };
  },

  getAllVaccineNames: async () => {
    const data = await loadMockData();
    return { data: { success: true, data: data?.vaccines || [] } };
  },

  // Treatment Data
  getAllTreatments: async () => {
    const data = await loadMockData();
    return { data: { success: true, data: data?.treatments || [] } };
  },

  getTreatmentsByPhase: async (phase) => {
    const data = await loadMockData();
    const filtered = (data?.treatments || []).filter(t => 
      t.clinical_stage.toLowerCase().includes(phase.toLowerCase())
    );
    return { data: { success: true, data: filtered } };
  },

  getFDAApprovedTreatments: async () => {
    const data = await loadMockData();
    const approved = (data?.treatments || []).filter(t => t.fda_approved);
    return { data: { success: true, data: approved } };
  },

  getTreatmentsByCategory: async (category) => {
    const data = await loadMockData();
    const filtered = (data?.treatments || []).filter(t => 
      t.category.toLowerCase().includes(category.toLowerCase())
    );
    return { data: { success: true, data: filtered } };
  },

  getTreatmentByNameAndCategory: async (category, name) => {
    const data = await loadMockData();
    const treatment = (data?.treatments || []).find(t => 
      t.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 
      name.toLowerCase().replace(/[^a-z0-9]/g, '')
    );
    return { data: { success: true, data: treatment || {} } };
  },

  // News Data
  getAllNews: async (page = 1) => {
    const data = await loadMockData();
    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const news = (data?.news || []).slice(start, start + pageSize);
    return { 
      data: { 
        success: true, 
        data: news,
        currentPage: page,
        totalPages: Math.ceil((data?.news || []).length / pageSize)
      } 
    };
  },

  getNewsByCategory: async (category, page = 1) => {
    const data = await loadMockData();
    const pageSize = 10;
    const filtered = (data?.news || []).filter(n => 
      n.category.toLowerCase().includes(category.toLowerCase())
    );
    const start = (page - 1) * pageSize;
    const news = filtered.slice(start, start + pageSize);
    return { 
      data: { 
        success: true, 
        data: news,
        currentPage: page,
        totalPages: Math.ceil(filtered.length / pageSize)
      } 
    };
  },

  // Sitemap
  getSitemap: async () => {
    return { 
      data: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://armanfeili.github.io/vaccovid/</loc>
    <lastmod>2020-10-31</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://armanfeili.github.io/vaccovid/covid-19-tracker</loc>
    <lastmod>2020-10-31</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://armanfeili.github.io/vaccovid/vaccine-tracker</loc>
    <lastmod>2020-10-31</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://armanfeili.github.io/vaccovid/treatment-tracker</loc>
    <lastmod>2020-10-31</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://armanfeili.github.io/vaccovid/news</loc>
    <lastmod>2020-10-31</lastmod>
    <priority>0.7</priority>
  </url>
</urlset>` 
    };
  }
};

export default mockAPI;
