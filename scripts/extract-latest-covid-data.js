const fs = require('fs');
const path = require('path');

// Parse CSV file and extract latest data for each country
const csvPath = path.join(__dirname, '../app/src/utils/owid-covid-data.csv');
const outputPath = path.join(__dirname, '../mockApi.js');

console.log('📊 Reading COVID-19 data from OWID dataset...');

// Read the CSV file
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.split('\n');
const headers = lines[0].split(',');

// Parse CSV and group by country
const countriesData = {};
let worldData = null;

for (let i = 1; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  
  const values = lines[i].split(',');
  const row = {};
  headers.forEach((header, index) => {
    row[header.trim()] = values[index] ? values[index].trim() : '';
  });
  
  const location = row['location'];
  const date = row['date'];
  
  // Skip if missing data
  if (!location || !date) continue;
  
  // Capture World data separately
  if (location === 'World') {
    if (!worldData || date > worldData.date) {
      worldData = row;
    }
    continue;
  }
  
  // Store the most recent data for each country
  if (!countriesData[location] || date > countriesData[location].date) {
    countriesData[location] = row;
  }
}

// List of aggregate regions to exclude
const excludeRegions = [
  'World', 'High income', 'Upper middle income', 'Lower middle income', 'Low income',
  'Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania',
  'European Union', 'International'
];

// Extract top countries by total cases (exclude aggregate regions)
const topCountries = Object.values(countriesData)
  .filter(c => 
    c['total_cases'] && 
    parseFloat(c['total_cases']) > 100000 && 
    c['iso_code'] && 
    c['iso_code'].length === 3 &&
    !excludeRegions.includes(c['location'])
  )
  .sort((a, b) => parseFloat(b['total_cases'] || 0) - parseFloat(a['total_cases'] || 0))
  .slice(0, 50); // Get top 50 countries

console.log(`✅ Found ${topCountries.length} countries with significant case counts`);

// Map to the format expected by the app
const formattedCountries = topCountries.map(country => {
  const totalCases = parseInt(country['total_cases'] || 0);
  const totalDeaths = parseInt(country['total_deaths'] || 0);
  const totalRecovered = totalCases - totalDeaths - parseInt(country['active_cases'] || 0);
  const population = parseInt(country['population'] || 1);
  
  return {
    Country: country['location'],
    country: country['location'],
    ThreeLetterSymbol: country['iso_code'] || 'XXX',
    iso: country['iso_code'] || 'XX',
    TotalCases: totalCases,
    cases: totalCases,
    TotalDeaths: totalDeaths,
    deaths: totalDeaths,
    TotalRecovered: totalRecovered,
    recovered: totalRecovered,
    ActiveCases: parseInt(country['active_cases'] || 0),
    active: parseInt(country['active_cases'] || 0),
    Serious_Critical: parseInt(country['icu_patients'] || 0),
    critical: parseInt(country['icu_patients'] || 0),
    NewCases: parseInt(country['new_cases'] || 0),
    todayCases: parseInt(country['new_cases'] || 0),
    NewDeaths: parseInt(country['new_deaths'] || 0),
    todayDeaths: parseInt(country['new_deaths'] || 0),
    TotalTests: parseInt(country['total_tests'] || 0),
    Infection_Risk: ((totalCases / population) * 100).toFixed(1),
    Case_Fatality_Rate: ((totalDeaths / totalCases) * 100).toFixed(1),
    Test_Percentage: ((parseInt(country['total_tests'] || 0) / population) * 100).toFixed(0),
    Recovery_Proporation: ((totalRecovered / totalCases) * 100).toFixed(1),
    Population: population
  };
});

console.log('📝 Generating updated mockApi.js with real data...');
console.log(`   Latest data date: ${topCountries[0]?.date || 'Unknown'}`);
console.log(`   World data date: ${worldData?.date || 'Unknown'}`);

// Use actual world data from OWID dataset
const worldTotalCases = parseInt(worldData?.['total_cases'] || 0);
const worldTotalDeaths = parseInt(worldData?.['total_deaths'] || 0);
const worldNewCases = parseInt(worldData?.['new_cases'] || 0);
const worldNewDeaths = parseInt(worldData?.['new_deaths'] || 0);
const worldIcuPatients = parseInt(worldData?.['icu_patients'] || 0);

console.log(`   World Total Cases: ${worldTotalCases.toLocaleString()}`);
console.log(`   World Total Deaths: ${worldTotalDeaths.toLocaleString()}`);

// Generate the JavaScript code
const mockDataCode = `const express = require('express');
const router = express.Router();

// Real COVID-19 data from Our World in Data (OWID)
// Dataset: https://github.com/owid/covid-19-data
// Last Updated: ${topCountries[0]?.date || 'Unknown'}
// Data Collection Date: February 14, 2023
const mockCountries = ${JSON.stringify(formattedCountries, null, 2)};

const mockCovidData = {
  world: {
    cases: ${worldTotalCases},
    deaths: ${worldTotalDeaths},
    recovered: ${worldTotalCases - worldTotalDeaths},
    active: 0,
    critical: ${worldIcuPatients},
    todayCases: ${worldNewCases},
    todayDeaths: ${worldNewDeaths},
    todayRecovered: 0,
    affectedCountries: ${topCountries.length},
    updated: Date.now(),
    dataDate: '2023-02-14'
  }
};

// Mock vaccines (archived historical data)
const mockVaccines = [
  { id: 1, name: "Pfizer-BioNTech", description: "mRNA vaccine", stage: "Approved", developer: "Pfizer/BioNTech", category: "approved" },
  { id: 2, name: "Moderna", description: "mRNA vaccine", stage: "Approved", developer: "Moderna", category: "approved" },
  { id: 3, name: "AstraZeneca", description: "Viral vector vaccine", stage: "Approved", developer: "AstraZeneca/Oxford", category: "approved" },
  { id: 4, name: "Johnson & Johnson", description: "Viral vector vaccine", stage: "Approved", developer: "Johnson & Johnson", category: "approved" },
  { id: 5, name: "Novavax", description: "Protein subunit vaccine", stage: "Approved", developer: "Novavax", category: "approved" },
  { id: 6, name: "Sinovac", description: "Inactivated virus vaccine", stage: "Approved", developer: "Sinovac", category: "approved" }
];

const mockNews = [
  { id: 1, title: "COVID-19 Data Archive (Archived)", source: "OWID", date: "${topCountries[0]?.date || new Date().toISOString()}", description: "Historical COVID-19 statistics from Our World in Data", url: "#" },
  { id: 2, title: "Vaccine Development Archive (Archived)", source: "WHO", date: new Date().toISOString(), description: "Archive of global vaccination efforts", url: "#" }
];

// NPM COVID Data endpoints (what the app actually uses)
router.get('/npm-covid-data/world', (req, res) => {
  res.json(mockCovidData.world);
});

router.get('/npm-covid-data/countries', (req, res) => {
  res.json(mockCountries);
});

router.get('/npm-covid-data/countries-name-ordered', (req, res) => {
  const sorted = [...mockCountries].sort((a, b) => a.Country.localeCompare(b.Country));
  res.json(sorted);
});

router.get('/npm-covid-data/countries/:continent', (req, res) => {
  res.json(mockCountries);
});

router.get('/npm-covid-data/country/:iso', (req, res) => {
  const country = mockCountries.find(c => c.iso === req.params.iso.toUpperCase() || c.ThreeLetterSymbol === req.params.iso.toUpperCase());
  if (country) {
    res.json(country);
  } else {
    res.status(404).json({ error: 'Country not found' });
  }
});

// Legacy COVID data endpoints
router.get('/covid/world', (req, res) => {
  res.json(mockCovidData.world);
});

router.get('/covid/countries', (req, res) => {
  res.json({ countries: mockCountries });
});

// Vaccine endpoints
router.get('/vaccine/all', (req, res) => {
  res.json(mockVaccines);
});

router.get('/vaccine/:id', (req, res) => {
  const vaccine = mockVaccines.find(v => v.id === parseInt(req.params.id));
  if (vaccine) {
    res.json(vaccine);
  } else {
    res.status(404).json({ error: 'Vaccine not found' });
  }
});

router.get('/vaccines/get-all-vaccines', (req, res) => {
  res.json(mockVaccines);
});

router.get('/vaccines/get-all-vaccines-pre-clinical', (req, res) => {
  res.json(mockVaccines.filter(v => v.stage === 'Pre-Clinical'));
});

router.get('/vaccines/get-all-vaccines-phase-i', (req, res) => {
  res.json(mockVaccines.filter(v => v.stage === 'Phase I'));
});

router.get('/vaccines/get-all-vaccines-phase-ii', (req, res) => {
  res.json(mockVaccines.filter(v => v.stage === 'Phase II'));
});

router.get('/vaccines/get-all-vaccines-phase-iii', (req, res) => {
  res.json(mockVaccines.filter(v => v.stage === 'Phase III'));
});

router.get('/vaccines/get-all-vaccines-phase-iv', (req, res) => {
  res.json(mockVaccines.filter(v => v.stage === 'Phase IV'));
});

router.get('/vaccines/get-fda-approved-vaccines', (req, res) => {
  res.json(mockVaccines.filter(v => v.stage === 'Approved'));
});

router.get('/vaccines/get-vaccines/:category', (req, res) => {
  res.json(mockVaccines.filter(v => v.category === req.params.category));
});

router.get('/vaccines/get-vaccines/:category/:name', (req, res) => {
  const vaccine = mockVaccines.find(v => 
    v.category === req.params.category && 
    v.name.toLowerCase().includes(req.params.name.toLowerCase())
  );
  if (vaccine) {
    res.json(vaccine);
  } else {
    res.json(mockVaccines[0]);
  }
});

// Treatment endpoints
router.get('/vaccines/get-all-treatment', (req, res) => {
  res.json([]);
});

router.get('/vaccines/get-all-treatment-pre-clinical', (req, res) => {
  res.json([]);
});

router.get('/vaccines/get-all-treatment-clinical', (req, res) => {
  res.json([]);
});

router.get('/vaccines/get-all-fda-approved-treatment', (req, res) => {
  res.json([]);
});

router.get('/vaccines/get-treatments/:category', (req, res) => {
  res.json([]);
});

// News endpoints
router.get('/news', (req, res) => {
  res.json(mockNews);
});

router.get('/news/:source', (req, res) => {
  const sourceNews = mockNews.filter(n => n.source.toLowerCase() === req.params.source.toLowerCase());
  res.json(sourceNews);
});

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'Backend (Real Data API) Running', 
    timestamp: new Date().toISOString(),
    dataSource: 'Our World in Data (OWID)',
    lastUpdate: '${topCountries[0]?.date || 'Unknown'}'
  });
});

module.exports = router;
`;

fs.writeFileSync(outputPath, mockDataCode);

console.log('✅ mockApi.js updated with real COVID-19 data!');
console.log(`   Countries included: ${formattedCountries.length}`);
console.log(`   Top 5 countries by cases:`);
formattedCountries.slice(0, 5).forEach((c, i) => {
  console.log(`   ${i + 1}. ${c.Country}: ${c.TotalCases.toLocaleString()} cases`);
});
console.log('\n🔄 Restart the server to see the updated data!');
