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
// IMPORTANT: The format must match what the actions/reducers expect:
// - Actions use `res.data` as the payload
// - Reducers expect arrays directly (not wrapped in { success: true, data: [...] })
export const mockAPI = {
  // COVID-19 Data
  getWorldData: async () => {
    const data = await loadMockData();
    // Component expects world to be an ARRAY (world.length > 0, world.map)
    // The world data is a single object, so wrap it in an array
    const worldData = data?.world ? [data.world] : [];
    return { data: worldData };
  },

  getAllCountries: async () => {
    const data = await loadMockData();
    // Component expects countries to be an ARRAY directly
    return { data: data?.countries || [] };
  },

  getCountriesByRegion: async (region) => {
    const data = await loadMockData();
    // Return all countries for now (region filtering not implemented in static mode)
    return { data: data?.countries || [] };
  },

  getCountryByISO: async (iso) => {
    const data = await loadMockData();
    const country = data?.countries?.find(c => 
      c.iso?.toUpperCase() === iso?.toUpperCase() || 
      c.ThreeLetterSymbol?.toUpperCase() === iso?.toUpperCase()
    );
    // Component expects countryISOBased as an ARRAY (checks countryISOBased.length > 0)
    return { data: country ? [country] : [] };
  },

  getAllCountriesNameOrdered: async () => {
    const data = await loadMockData();
    const sorted = [...(data?.countries || [])].sort((a, b) => 
      (a.Country || a.country || '').localeCompare(b.Country || b.country || '')
    );
    return { data: sorted };
  },

  getProvincesByISO: async (iso) => {
    const data = await loadMockData();
    const isoUpper = iso?.toUpperCase();
    const provinces = data?.provinces?.[isoUpper] || [];
    return { data: provinces };
  },

  getUSStates: async () => {
    const data = await loadMockData();
    return { data: data?.provinces?.USA || [] };
  },

  getCanadaStates: async () => {
    const data = await loadMockData();
    return { data: data?.provinces?.CAN || [] };
  },

  getBrazilStates: async () => {
    const data = await loadMockData();
    return { data: data?.provinces?.BRA || [] };
  },

  getGermanyStates: async () => {
    const data = await loadMockData();
    return { data: data?.provinces?.DEU || [] };
  },

  getAustraliaStates: async () => {
    const data = await loadMockData();
    return { data: data?.provinces?.AUS || [] };
  },

  getOwidData: async (iso) => {
    const data = await loadMockData();
    
    // getOvidData is used by charts which expect time-series data with date, total_cases, etc.
    // We generate mock 6-month historical data from the available country stats
    // First, try to find the specific country if ISO is provided
    const country = iso ? data?.countries?.find(c => 
      c.iso?.toUpperCase() === iso?.toUpperCase() || 
      c.ThreeLetterSymbol?.toUpperCase() === iso?.toUpperCase()
    ) : null;
    
    // Use world data if no specific country, or country's data
    const totalCases = country?.TotalCases || country?.cases || data?.world?.TotalCases || 100000000;
    const totalDeaths = country?.TotalDeaths || country?.deaths || data?.world?.TotalDeaths || 1000000;
    const newCases = country?.NewCases || country?.todayCases || 1000;
    const newDeaths = country?.NewDeaths || country?.todayDeaths || 10;
    
    // Generate mock 6-month historical data
    const today = new Date('2023-02-14');
    const mockHistory = [];
    
    for (let i = 180; i >= 0; i -= 3) { // Every 3 days for 6 months
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const progress = 1 - (i / 180);
      
      mockHistory.push({
        date: date.toISOString().split('T')[0],
        total_cases: Math.round(totalCases * (0.5 + 0.5 * progress)),
        new_cases: Math.round(newCases * (0.5 + Math.random() * 0.5)),
        total_deaths: Math.round(totalDeaths * (0.5 + 0.5 * progress)),
        new_deaths: Math.round(newDeaths * (0.5 + Math.random() * 0.5)),
        iso_code: iso?.toUpperCase() || 'WRL'
      });
    }
    
    return { data: mockHistory };
  },

  getOwidSixMonthData: async (iso) => {
    const data = await loadMockData();
    // Find the country to get its data
    const country = data?.countries?.find(c => 
      c.iso?.toUpperCase() === iso?.toUpperCase() || 
      c.ThreeLetterSymbol?.toUpperCase() === iso?.toUpperCase()
    );
    
    if (!country) {
      return { data: [] };
    }
    
    // Generate mock 6-month historical data from the country's current stats
    // This allows the charts to render even in static mode
    const today = new Date('2023-02-14');
    const mockHistory = [];
    const totalCases = country.TotalCases || country.cases || 0;
    const totalDeaths = country.TotalDeaths || country.deaths || 0;
    
    for (let i = 180; i >= 0; i -= 7) { // Weekly data for 6 months
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const progress = 1 - (i / 180);
      
      mockHistory.push({
        date: date.toISOString().split('T')[0],
        total_cases: Math.round(totalCases * (0.5 + 0.5 * progress)),
        new_cases: Math.round((country.NewCases || country.todayCases || 0) * (0.5 + Math.random() * 0.5)),
        total_deaths: Math.round(totalDeaths * (0.5 + 0.5 * progress)),
        new_deaths: Math.round((country.NewDeaths || country.todayDeaths || 0) * (0.5 + Math.random() * 0.5)),
        iso_code: iso.toUpperCase()
      });
    }
    
    return { data: mockHistory };
  },

  // Vaccine Data
  getAllVaccines: async () => {
    const data = await loadMockData();
    console.log('📊 getAllVaccines: returning', (data?.vaccines || []).length, 'vaccines');
    return { data: data?.vaccines || [] };
  },

  getVaccinesByPhase: async (phase) => {
    const data = await loadMockData();
    const phaseLower = phase.toLowerCase().replace(/[^a-z0-9]/g, '');
    const filtered = (data?.vaccines || []).filter(v => {
      const vPhase = (v.phase || v.clinical_stage || v.stage || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return vPhase.includes(phaseLower) || phaseLower.includes(vPhase);
    });
    console.log('📊 getVaccinesByPhase:', phase, '- returning', filtered.length, 'vaccines');
    return { data: filtered };
  },

  getFDAApprovedVaccines: async () => {
    const data = await loadMockData();
    const approved = (data?.vaccines || []).filter(v => 
      v.fda_approved || 
      (v.FDAApproved && v.FDAApproved !== 'Not Approved Yet' && v.FDAApproved !== 'N/A') ||
      (v.phase || v.clinical_stage || '').toLowerCase().includes('approved')
    );
    console.log('📊 getFDAApprovedVaccines: returning', approved.length, 'vaccines');
    return { data: approved };
  },

  getVaccinesByCategory: async (category) => {
    const data = await loadMockData();
    const catLower = category.toLowerCase();
    const filtered = (data?.vaccines || []).filter(v => 
      (v.category || v.platform || '').toLowerCase().includes(catLower)
    );
    console.log('📊 getVaccinesByCategory:', category, '- returning', filtered.length, 'vaccines');
    return { data: filtered };
  },

  getVaccineByNameAndCategory: async (category, name) => {
    const data = await loadMockData();
    const nameLower = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const vaccine = (data?.vaccines || []).find(v => {
      const vName = (v.trimedName || v.developerResearcher || v.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return vName.includes(nameLower) || nameLower.includes(vName);
    });
    console.log('📊 getVaccineByNameAndCategory:', name, '- found:', !!vaccine);
    // Return as { data: [vaccine] } array because the component expects eachVacItem[0]
    return { data: vaccine ? [vaccine] : [] };
  },

  getAllVaccineNames: async () => {
    const data = await loadMockData();
    return { data: data?.vaccines || [] };
  },

  // Treatment Data
  getAllTreatments: async () => {
    const data = await loadMockData();
    console.log('💊 getAllTreatments: returning', (data?.treatments || []).length, 'treatments');
    return { data: data?.treatments || [] };
  },

  getTreatmentsByPhase: async (phase) => {
    const data = await loadMockData();
    const phaseLower = phase.toLowerCase().replace(/[^a-z0-9]/g, '');
    const filtered = (data?.treatments || []).filter(t => {
      const tPhase = (t.phase || t.clinical_stage || t.stage || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return tPhase.includes(phaseLower) || phaseLower.includes(tPhase);
    });
    console.log('💊 getTreatmentsByPhase:', phase, '- returning', filtered.length, 'treatments');
    return { data: filtered };
  },

  getFDAApprovedTreatments: async () => {
    const data = await loadMockData();
    const approved = (data?.treatments || []).filter(t => 
      t.fda_approved || 
      (t.FDAApproved && t.FDAApproved !== 'Not Approved Yet' && t.FDAApproved !== 'N/A')
    );
    console.log('💊 getFDAApprovedTreatments: returning', approved.length, 'treatments');
    return { data: approved };
  },

  getTreatmentsByCategory: async (category) => {
    const data = await loadMockData();
    const catLower = category.toLowerCase();
    const filtered = (data?.treatments || []).filter(t => 
      (t.category || '').toLowerCase().includes(catLower)
    );
    console.log('💊 getTreatmentsByCategory:', category, '- returning', filtered.length, 'treatments');
    return { data: filtered };
  },

  getTreatmentByNameAndCategory: async (category, name) => {
    const data = await loadMockData();
    const nameLower = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const treatment = (data?.treatments || []).find(t => {
      const tName = (t.trimedName || t.developerResearcher || t.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return tName.includes(nameLower) || nameLower.includes(tName);
    });
    console.log('💊 getTreatmentByNameAndCategory:', name, '- found:', !!treatment);
    // Return as { data: [treatment] } array because the component expects eachVacItem[0]
    return { data: treatment ? [treatment] : [] };
  },

  // News Data
  getAllNews: async (page = 0) => {
    const data = await loadMockData();
    const pageSize = 10;
    const start = page * pageSize;
    const news = (data?.news || []).slice(start, start + pageSize);
    console.log('📰 getAllNews page', page, '- returning', news.length, 'articles');
    // Return format expected by reducer: { news: [...] }
    return { data: { news } };
  },

  getNewsByCategory: async (category, page = 0) => {
    const data = await loadMockData();
    const pageSize = 10;
    const catLower = category.toLowerCase();
    
    // Filter by category or keywords
    let filtered = (data?.news || []).filter(n => {
      const newsCategory = (n.category || '').toLowerCase();
      const keywords = (n.keywords || []).map(k => k.toLowerCase());
      
      if (catLower.includes('coronavirus') || catLower.includes('covid')) {
        return newsCategory === 'coronavirus' || 
               keywords.some(k => k.includes('covid') || k.includes('corona') || k.includes('pandemic'));
      }
      if (catLower.includes('vaccine')) {
        return newsCategory === 'vaccine' || 
               keywords.some(k => k.includes('vaccine') || k.includes('vaccination'));
      }
      if (catLower.includes('health')) {
        return newsCategory === 'health' || 
               keywords.some(k => k.includes('health') || k.includes('who') || k.includes('medical'));
      }
      return newsCategory.includes(catLower);
    });
    
    // If no matches, return all news for the page
    if (filtered.length === 0) {
      filtered = data?.news || [];
    }
    
    const start = page * pageSize;
    const news = filtered.slice(start, start + pageSize);
    console.log('📰 getNewsByCategory', category, 'page', page, '- returning', news.length, 'articles');
    // Return format expected by reducer: { news: [...] }
    return { data: { news } };
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
