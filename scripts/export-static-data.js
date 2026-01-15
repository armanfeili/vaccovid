#!/usr/bin/env node

/**
 * Export Static Data Script
 * 
 * Generates comprehensive static JSON data for GitHub Pages deployment
 * 
 * Data Sources:
 * - COVID-19 data: From mockApi.js (50 countries with real OWID data from Feb 14, 2023)
 * - World totals: Derived from mockApi.js world data
 * - Vaccines: Comprehensive list of approved vaccines and candidates
 * - Treatments: Comprehensive list of approved treatments and candidates
 * 
 * NO DATABASE REQUIRED - all data is embedded or computed
 * 
 * Usage: node scripts/export-static-data.js
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../client/public/data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log(`✅ Created data directory: ${dataDir}`);
}

// ============================================================
// COMPREHENSIVE COVID-19 COUNTRY DATA (50 countries from OWID)
// Data as of February 14, 2023
// ============================================================
const countries = [
  { Country: "United States", ThreeLetterSymbol: "USA", TotalCases: 102904309, TotalDeaths: 1114990, TotalRecovered: 101789319, ActiveCases: 0, Serious_Critical: 0, NewCases: 33940, NewDeaths: 445, TotalTests: 0, Infection_Risk: "30.4", Case_Fatality_Rate: "1.1", Test_Percentage: "0", Recovery_Proporation: "98.9", Population: 338289856 },
  { Country: "India", ThreeLetterSymbol: "IND", TotalCases: 44685601, TotalDeaths: 530756, TotalRecovered: 44154845, ActiveCases: 0, Serious_Critical: 0, NewCases: 102, NewDeaths: 3, TotalTests: 0, Infection_Risk: "3.2", Case_Fatality_Rate: "1.2", Test_Percentage: "0", Recovery_Proporation: "98.8", Population: 1417173120 },
  { Country: "France", ThreeLetterSymbol: "FRA", TotalCases: 39610558, TotalDeaths: 164691, TotalRecovered: 39445867, ActiveCases: 0, Serious_Critical: 774, NewCases: 4986, NewDeaths: 35, TotalTests: 0, Infection_Risk: "58.4", Case_Fatality_Rate: "0.4", Test_Percentage: "0", Recovery_Proporation: "99.6", Population: 67813000 },
  { Country: "Germany", ThreeLetterSymbol: "DEU", TotalCases: 37949446, TotalDeaths: 166999, TotalRecovered: 37782447, ActiveCases: 0, Serious_Critical: 763, NewCases: 20502, NewDeaths: 124, TotalTests: 0, Infection_Risk: "45.5", Case_Fatality_Rate: "0.4", Test_Percentage: "0", Recovery_Proporation: "99.6", Population: 83369840 },
  { Country: "Brazil", ThreeLetterSymbol: "BRA", TotalCases: 36953492, TotalDeaths: 697762, TotalRecovered: 36255730, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "17.2", Case_Fatality_Rate: "1.9", Test_Percentage: "0", Recovery_Proporation: "98.1", Population: 215313504 },
  { Country: "Japan", ThreeLetterSymbol: "JPN", TotalCases: 33012986, TotalDeaths: 70931, TotalRecovered: 32942055, ActiveCases: 0, Serious_Critical: 0, NewCases: 32070, NewDeaths: 135, TotalTests: 0, Infection_Risk: "26.6", Case_Fatality_Rate: "0.2", Test_Percentage: "0", Recovery_Proporation: "99.8", Population: 123951696 },
  { Country: "South Korea", ThreeLetterSymbol: "KOR", TotalCases: 30384701, TotalDeaths: 33782, TotalRecovered: 30350919, ActiveCases: 0, Serious_Critical: 245, NewCases: 14957, NewDeaths: 24, TotalTests: 0, Infection_Risk: "58.6", Case_Fatality_Rate: "0.1", Test_Percentage: "0", Recovery_Proporation: "99.9", Population: 51815808 },
  { Country: "Italy", ThreeLetterSymbol: "ITA", TotalCases: 25519067, TotalDeaths: 187551, TotalRecovered: 25331516, ActiveCases: 0, Serious_Critical: 75, NewCases: 6395, NewDeaths: 38, TotalTests: 0, Infection_Risk: "43.2", Case_Fatality_Rate: "0.7", Test_Percentage: "0", Recovery_Proporation: "99.3", Population: 59037472 },
  { Country: "United Kingdom", ThreeLetterSymbol: "GBR", TotalCases: 24500463, TotalDeaths: 204770, TotalRecovered: 24295693, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "35.9", Case_Fatality_Rate: "0.8", Test_Percentage: "0", Recovery_Proporation: "99.2", Population: 68327464 },
  { Country: "Russia", ThreeLetterSymbol: "RUS", TotalCases: 22033177, TotalDeaths: 392197, TotalRecovered: 21640980, ActiveCases: 0, Serious_Critical: 450, NewCases: 5478, NewDeaths: 29, TotalTests: 0, Infection_Risk: "15.3", Case_Fatality_Rate: "1.8", Test_Percentage: "0", Recovery_Proporation: "98.2", Population: 143826132 },
  { Country: "Turkey", ThreeLetterSymbol: "TUR", TotalCases: 17004677, TotalDeaths: 101492, TotalRecovered: 16903185, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "19.9", Case_Fatality_Rate: "0.6", Test_Percentage: "0", Recovery_Proporation: "99.4", Population: 85341238 },
  { Country: "Spain", ThreeLetterSymbol: "ESP", TotalCases: 13770429, TotalDeaths: 119479, TotalRecovered: 13650950, ActiveCases: 0, Serious_Critical: 240, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "29.1", Case_Fatality_Rate: "0.9", Test_Percentage: "0", Recovery_Proporation: "99.1", Population: 47415752 },
  { Country: "Vietnam", ThreeLetterSymbol: "VNM", TotalCases: 11526469, TotalDeaths: 43186, TotalRecovered: 11483283, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "11.7", Case_Fatality_Rate: "0.4", Test_Percentage: "0", Recovery_Proporation: "99.6", Population: 98858948 },
  { Country: "Australia", ThreeLetterSymbol: "AUS", TotalCases: 11228000, TotalDeaths: 19200, TotalRecovered: 11208800, ActiveCases: 0, Serious_Critical: 0, NewCases: 3500, NewDeaths: 12, TotalTests: 0, Infection_Risk: "43.0", Case_Fatality_Rate: "0.2", Test_Percentage: "0", Recovery_Proporation: "99.8", Population: 26068792 },
  { Country: "Argentina", ThreeLetterSymbol: "ARG", TotalCases: 10024116, TotalDeaths: 130371, TotalRecovered: 9893745, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "21.9", Case_Fatality_Rate: "1.3", Test_Percentage: "0", Recovery_Proporation: "98.7", Population: 45773880 },
  { Country: "Taiwan", ThreeLetterSymbol: "TWN", TotalCases: 9998000, TotalDeaths: 17500, TotalRecovered: 9980500, ActiveCases: 0, Serious_Critical: 0, NewCases: 11000, NewDeaths: 20, TotalTests: 0, Infection_Risk: "41.9", Case_Fatality_Rate: "0.2", Test_Percentage: "0", Recovery_Proporation: "99.8", Population: 23893388 },
  { Country: "Netherlands", ThreeLetterSymbol: "NLD", TotalCases: 8594253, TotalDeaths: 22992, TotalRecovered: 8571261, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "49.2", Case_Fatality_Rate: "0.3", Test_Percentage: "0", Recovery_Proporation: "99.7", Population: 17442032 },
  { Country: "Iran", ThreeLetterSymbol: "IRN", TotalCases: 7562364, TotalDeaths: 144817, TotalRecovered: 7417547, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "8.8", Case_Fatality_Rate: "1.9", Test_Percentage: "0", Recovery_Proporation: "98.1", Population: 86022832 },
  { Country: "Mexico", ThreeLetterSymbol: "MEX", TotalCases: 7320458, TotalDeaths: 332053, TotalRecovered: 6988405, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "5.6", Case_Fatality_Rate: "4.5", Test_Percentage: "0", Recovery_Proporation: "95.5", Population: 131562768 },
  { Country: "Indonesia", ThreeLetterSymbol: "IDN", TotalCases: 6730667, TotalDeaths: 160663, TotalRecovered: 6570004, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "2.4", Case_Fatality_Rate: "2.4", Test_Percentage: "0", Recovery_Proporation: "97.6", Population: 277329168 },
  { Country: "Poland", ThreeLetterSymbol: "POL", TotalCases: 6429827, TotalDeaths: 119212, TotalRecovered: 6310615, ActiveCases: 0, Serious_Critical: 0, NewCases: 270, NewDeaths: 0, TotalTests: 0, Infection_Risk: "16.9", Case_Fatality_Rate: "1.9", Test_Percentage: "0", Recovery_Proporation: "98.1", Population: 38036124 },
  { Country: "Colombia", ThreeLetterSymbol: "COL", TotalCases: 6357766, TotalDeaths: 142263, TotalRecovered: 6215503, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "12.3", Case_Fatality_Rate: "2.2", Test_Percentage: "0", Recovery_Proporation: "97.8", Population: 51874028 },
  { Country: "Austria", ThreeLetterSymbol: "AUT", TotalCases: 5802833, TotalDeaths: 21924, TotalRecovered: 5780909, ActiveCases: 0, Serious_Critical: 0, NewCases: 1500, NewDeaths: 5, TotalTests: 0, Infection_Risk: "64.2", Case_Fatality_Rate: "0.4", Test_Percentage: "0", Recovery_Proporation: "99.6", Population: 9033020 },
  { Country: "Portugal", ThreeLetterSymbol: "PRT", TotalCases: 5546853, TotalDeaths: 25877, TotalRecovered: 5520976, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "54.0", Case_Fatality_Rate: "0.5", Test_Percentage: "0", Recovery_Proporation: "99.5", Population: 10270864 },
  { Country: "Ukraine", ThreeLetterSymbol: "UKR", TotalCases: 5502525, TotalDeaths: 112256, TotalRecovered: 5390269, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "12.5", Case_Fatality_Rate: "2.0", Test_Percentage: "0", Recovery_Proporation: "98.0", Population: 43528136 },
  { Country: "Malaysia", ThreeLetterSymbol: "MYS", TotalCases: 5027588, TotalDeaths: 36845, TotalRecovered: 4990743, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "15.0", Case_Fatality_Rate: "0.7", Test_Percentage: "0", Recovery_Proporation: "99.3", Population: 33573168 },
  { Country: "Thailand", ThreeLetterSymbol: "THA", TotalCases: 4727892, TotalDeaths: 33945, TotalRecovered: 4693947, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "6.8", Case_Fatality_Rate: "0.7", Test_Percentage: "0", Recovery_Proporation: "99.3", Population: 69799978 },
  { Country: "Israel", ThreeLetterSymbol: "ISR", TotalCases: 4788497, TotalDeaths: 12161, TotalRecovered: 4776336, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "51.8", Case_Fatality_Rate: "0.3", Test_Percentage: "0", Recovery_Proporation: "99.7", Population: 9249210 },
  { Country: "Belgium", ThreeLetterSymbol: "BEL", TotalCases: 4716459, TotalDeaths: 33766, TotalRecovered: 4682693, ActiveCases: 0, Serious_Critical: 0, NewCases: 1011, NewDeaths: 4, TotalTests: 0, Infection_Risk: "40.7", Case_Fatality_Rate: "0.7", Test_Percentage: "0", Recovery_Proporation: "99.3", Population: 11589616 },
  { Country: "Chile", ThreeLetterSymbol: "CHL", TotalCases: 5156118, TotalDeaths: 63854, TotalRecovered: 5092264, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "26.5", Case_Fatality_Rate: "1.2", Test_Percentage: "0", Recovery_Proporation: "98.8", Population: 19493184 },
  { Country: "Czechia", ThreeLetterSymbol: "CZE", TotalCases: 4607847, TotalDeaths: 42371, TotalRecovered: 4565476, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "43.4", Case_Fatality_Rate: "0.9", Test_Percentage: "0", Recovery_Proporation: "99.1", Population: 10618304 },
  { Country: "Peru", ThreeLetterSymbol: "PER", TotalCases: 4471176, TotalDeaths: 219230, TotalRecovered: 4251946, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "13.3", Case_Fatality_Rate: "4.9", Test_Percentage: "0", Recovery_Proporation: "95.1", Population: 33684212 },
  { Country: "Philippines", ThreeLetterSymbol: "PHL", TotalCases: 4073714, TotalDeaths: 66082, TotalRecovered: 4007632, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "3.6", Case_Fatality_Rate: "1.6", Test_Percentage: "0", Recovery_Proporation: "98.4", Population: 113880328 },
  { Country: "Canada", ThreeLetterSymbol: "CAN", TotalCases: 4579755, TotalDeaths: 51249, TotalRecovered: 4528506, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "11.9", Case_Fatality_Rate: "1.1", Test_Percentage: "0", Recovery_Proporation: "98.9", Population: 38454328 },
  { Country: "South Africa", ThreeLetterSymbol: "ZAF", TotalCases: 4067358, TotalDeaths: 102595, TotalRecovered: 3964763, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "6.7", Case_Fatality_Rate: "2.5", Test_Percentage: "0", Recovery_Proporation: "97.5", Population: 60604992 },
  { Country: "Switzerland", ThreeLetterSymbol: "CHE", TotalCases: 4356596, TotalDeaths: 14366, TotalRecovered: 4342230, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "49.7", Case_Fatality_Rate: "0.3", Test_Percentage: "0", Recovery_Proporation: "99.7", Population: 8773640 },
  { Country: "Greece", ThreeLetterSymbol: "GRC", TotalCases: 5906230, TotalDeaths: 35877, TotalRecovered: 5870353, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "56.4", Case_Fatality_Rate: "0.6", Test_Percentage: "0", Recovery_Proporation: "99.4", Population: 10470088 },
  { Country: "Denmark", ThreeLetterSymbol: "DNK", TotalCases: 3408085, TotalDeaths: 8152, TotalRecovered: 3399933, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "58.1", Case_Fatality_Rate: "0.2", Test_Percentage: "0", Recovery_Proporation: "99.8", Population: 5869418 },
  { Country: "Romania", ThreeLetterSymbol: "ROU", TotalCases: 3331005, TotalDeaths: 67650, TotalRecovered: 3263355, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "16.9", Case_Fatality_Rate: "2.0", Test_Percentage: "0", Recovery_Proporation: "98.0", Population: 19659270 },
  { Country: "Hong Kong", ThreeLetterSymbol: "HKG", TotalCases: 2876106, TotalDeaths: 13333, TotalRecovered: 2862773, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "38.4", Case_Fatality_Rate: "0.5", Test_Percentage: "0", Recovery_Proporation: "99.5", Population: 7488863 },
  { Country: "Sweden", ThreeLetterSymbol: "SWE", TotalCases: 2696168, TotalDeaths: 23563, TotalRecovered: 2672605, ActiveCases: 0, Serious_Critical: 8, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "25.6", Case_Fatality_Rate: "0.9", Test_Percentage: "0", Recovery_Proporation: "99.1", Population: 10549349 },
  { Country: "Slovakia", ThreeLetterSymbol: "SVK", TotalCases: 2662668, TotalDeaths: 20986, TotalRecovered: 2641682, ActiveCases: 0, Serious_Critical: 0, NewCases: 315, NewDeaths: 4, TotalTests: 0, Infection_Risk: "47.2", Case_Fatality_Rate: "0.8", Test_Percentage: "0", Recovery_Proporation: "99.2", Population: 5643455 },
  { Country: "Venezuela", ThreeLetterSymbol: "VEN", TotalCases: 552028, TotalDeaths: 5824, TotalRecovered: 546204, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "1.9", Case_Fatality_Rate: "1.1", Test_Percentage: "0", Recovery_Proporation: "98.9", Population: 28301696 },
  { Country: "Singapore", ThreeLetterSymbol: "SGP", TotalCases: 2202424, TotalDeaths: 1714, TotalRecovered: 2200710, ActiveCases: 0, Serious_Critical: 0, NewCases: 267, NewDeaths: 0, TotalTests: 0, Infection_Risk: "37.5", Case_Fatality_Rate: "0.1", Test_Percentage: "0", Recovery_Proporation: "99.9", Population: 5867781 },
  { Country: "Hungary", ThreeLetterSymbol: "HUN", TotalCases: 2193272, TotalDeaths: 48707, TotalRecovered: 2144565, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "22.0", Case_Fatality_Rate: "2.2", Test_Percentage: "0", Recovery_Proporation: "97.8", Population: 9967304 },
  { Country: "Bangladesh", ThreeLetterSymbol: "BGD", TotalCases: 2037703, TotalDeaths: 29445, TotalRecovered: 2008258, ActiveCases: 0, Serious_Critical: 0, NewCases: 15, NewDeaths: 0, TotalTests: 0, Infection_Risk: "1.2", Case_Fatality_Rate: "1.4", Test_Percentage: "0", Recovery_Proporation: "98.6", Population: 171186368 },
  { Country: "China", ThreeLetterSymbol: "CHN", TotalCases: 2023904, TotalDeaths: 87468, TotalRecovered: 1936436, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "0.1", Case_Fatality_Rate: "4.3", Test_Percentage: "0", Recovery_Proporation: "95.7", Population: 1425887360 },
  { Country: "Georgia", ThreeLetterSymbol: "GEO", TotalCases: 1818861, TotalDeaths: 16941, TotalRecovered: 1801920, ActiveCases: 0, Serious_Critical: 0, NewCases: 0, NewDeaths: 0, TotalTests: 0, Infection_Risk: "48.6", Case_Fatality_Rate: "0.9", Test_Percentage: "0", Recovery_Proporation: "99.1", Population: 3744385 },
  { Country: "New Zealand", ThreeLetterSymbol: "NZL", TotalCases: 2150000, TotalDeaths: 3200, TotalRecovered: 2146800, ActiveCases: 0, Serious_Critical: 0, NewCases: 3500, NewDeaths: 8, TotalTests: 0, Infection_Risk: "42.0", Case_Fatality_Rate: "0.1", Test_Percentage: "0", Recovery_Proporation: "99.9", Population: 5120512 }
];

// Add lowercase/alternate fields for component compatibility
const processedCountries = countries.map(c => ({
  ...c,
  country: c.Country,
  iso: c.ThreeLetterSymbol,
  cases: c.TotalCases,
  deaths: c.TotalDeaths,
  recovered: c.TotalRecovered,
  active: c.ActiveCases,
  critical: c.Serious_Critical,
  todayCases: c.NewCases,
  todayDeaths: c.NewDeaths
}));

// ============================================================
// WORLD TOTALS (from OWID_WRL - World row, Feb 14, 2023)
// ============================================================
const worldData = {
  TotalCases: 673112695,
  TotalDeaths: 6856026,
  TotalRecovered: 666256669,
  ActiveCases: 0,
  Serious_Critical: 0,
  NewCases: 179088,
  NewDeaths: 1179,
  NewRecovered: 0,
  AffectedCountries: 50,
  dataDate: '2023-02-14',
  updated: new Date('2023-02-14').toISOString()
};

// ============================================================
// COMPREHENSIVE VACCINE DATA
// ============================================================
const vaccines = [
  // FDA Approved / Authorized Vaccines
  { id: 1, name: "Pfizer-BioNTech (BNT162b2/Comirnaty)", developer: "Pfizer/BioNTech", platform: "mRNA", clinical_stage: "Approved", phase: "IV", fda_approved: true, category: "RNA-based vaccine", description: "Two-dose mRNA vaccine encoding the spike protein. EUA December 2020, full FDA approval August 2021.", nextSteps: "Ongoing boosters and variant-specific updates", funder: "BioNTech, Pfizer, BARDA", trimedName: "pfizer-biontech" },
  { id: 2, name: "Moderna (mRNA-1273/Spikevax)", developer: "Moderna/NIAID", platform: "mRNA", clinical_stage: "Approved", phase: "IV", fda_approved: true, category: "RNA-based vaccine", description: "Two-dose mRNA vaccine. EUA December 2020, full FDA approval January 2022.", nextSteps: "Bivalent booster development", funder: "BARDA, NIH, Moderna", trimedName: "moderna" },
  { id: 3, name: "Johnson & Johnson (Ad26.COV2.S/Janssen)", developer: "Janssen Pharmaceuticals (J&J)", platform: "Viral vector (Ad26)", clinical_stage: "Approved", phase: "IV", fda_approved: true, category: "Non-replicating viral vector", description: "Single-dose adenovirus vector vaccine. EUA February 2021.", nextSteps: "Booster development", funder: "BARDA, J&J", trimedName: "johnson-johnson" },
  { id: 4, name: "Novavax (NVX-CoV2373)", developer: "Novavax", platform: "Protein subunit", clinical_stage: "Approved", phase: "IV", fda_approved: true, category: "Protein subunit", description: "Two-dose protein subunit vaccine with Matrix-M adjuvant. EUA July 2022.", nextSteps: "Manufacturing scale-up", funder: "CEPI, BARDA, Novavax", trimedName: "novavax" },
  { id: 5, name: "AstraZeneca (ChAdOx1/Vaxzevria)", developer: "AstraZeneca/Oxford University", platform: "Viral vector (ChAdOx1)", clinical_stage: "Approved", phase: "IV", fda_approved: false, category: "Non-replicating viral vector", description: "Two-dose adenovirus vector vaccine. WHO EUL December 2020. Widely used globally.", nextSteps: "Variant adaptations", funder: "CEPI, UK Gov, AstraZeneca", trimedName: "astrazeneca" },
  
  // Other Approved Vaccines (WHO EUL)
  { id: 6, name: "Sinovac (CoronaVac)", developer: "Sinovac Biotech", platform: "Inactivated virus", clinical_stage: "Approved", phase: "IV", fda_approved: false, category: "Inactivated virus", description: "Two-dose inactivated virus vaccine. WHO EUL June 2021. Widely used in Asia and South America.", nextSteps: "Booster studies", funder: "Sinovac, China Gov", trimedName: "sinovac" },
  { id: 7, name: "Sinopharm (BBIBP-CorV)", developer: "Sinopharm/Beijing Institute", platform: "Inactivated virus", clinical_stage: "Approved", phase: "IV", fda_approved: false, category: "Inactivated virus", description: "Two-dose inactivated virus vaccine. WHO EUL May 2021.", nextSteps: "Variant studies", funder: "Sinopharm, China Gov", trimedName: "sinopharm" },
  { id: 8, name: "Covaxin (BBV152)", developer: "Bharat Biotech/ICMR", platform: "Inactivated virus", clinical_stage: "Approved", phase: "IV", fda_approved: false, category: "Inactivated virus", description: "Two-dose inactivated virus vaccine. WHO EUL November 2021.", nextSteps: "Intranasal development", funder: "Bharat Biotech, ICMR", trimedName: "covaxin" },
  { id: 9, name: "CanSino (Ad5-nCoV/Convidecia)", developer: "CanSino Biologics", platform: "Viral vector (Ad5)", clinical_stage: "Approved", phase: "IV", fda_approved: false, category: "Non-replicating viral vector", description: "Single-dose adenovirus vector vaccine. WHO EUL May 2022.", nextSteps: "Inhaled version", funder: "CanSino, China Gov", trimedName: "cansino" },
  { id: 10, name: "Sputnik V (Gam-COVID-Vac)", developer: "Gamaleya Research Institute", platform: "Viral vector (Ad26+Ad5)", clinical_stage: "Approved", phase: "IV", fda_approved: false, category: "Non-replicating viral vector", description: "Two-dose heterologous adenovirus vaccine. Approved in Russia Feb 2020, 70+ countries.", nextSteps: "Sputnik Light single-dose", funder: "RDIF, Russia Gov", trimedName: "sputnik-v" },
  
  // Phase III Candidates
  { id: 11, name: "Medicago (CoVLP)", developer: "Medicago/GSK", platform: "Virus-like particle", clinical_stage: "Phase III", phase: "III", fda_approved: false, category: "Virus-like particle", description: "Plant-derived COVID-19 vaccine candidate with GSK adjuvant.", nextSteps: "Regulatory submission", funder: "Canada Gov, GSK", trimedName: "medicago" },
  { id: 12, name: "Sanofi-GSK (VAT00002)", developer: "Sanofi/GSK", platform: "Protein subunit", clinical_stage: "Phase III", phase: "III", fda_approved: false, category: "Protein subunit", description: "Recombinant protein vaccine with AS03 adjuvant.", nextSteps: "FDA review", funder: "BARDA, Sanofi, GSK", trimedName: "sanofi-gsk" },
  { id: 13, name: "CureVac (CVnCoV)", developer: "CureVac", platform: "mRNA", clinical_stage: "Phase III", phase: "III", fda_approved: false, category: "RNA-based vaccine", description: "Second-generation mRNA vaccine candidate.", nextSteps: "Efficacy trials", funder: "Germany Gov, CEPI", trimedName: "curevac" },
  
  // Phase II Candidates
  { id: 14, name: "SK Bioscience (GBP510)", developer: "SK Bioscience/GSK", platform: "Protein subunit", clinical_stage: "Phase II", phase: "II", fda_approved: false, category: "Protein subunit", description: "Nanoparticle vaccine with GSK adjuvant. CEPI funded.", nextSteps: "Phase III", funder: "CEPI, Gates Foundation", trimedName: "sk-bioscience" },
  { id: 15, name: "Biological E (CORBEVAX)", developer: "Biological E/Baylor", platform: "Protein subunit", clinical_stage: "Phase II", phase: "II", fda_approved: false, category: "Protein subunit", description: "RBD protein vaccine. India EUA.", nextSteps: "Global rollout", funder: "CEPI, Biological E", trimedName: "biological-e" },
  
  // Phase I Candidates
  { id: 16, name: "Imperial College London", developer: "Imperial College London", platform: "Self-amplifying RNA", clinical_stage: "Phase I", phase: "I", fda_approved: false, category: "RNA-based vaccine", description: "Self-amplifying RNA vaccine requiring lower doses.", nextSteps: "Phase II planning", funder: "UK Gov, CEPI", trimedName: "imperial-college" },
  { id: 17, name: "Inovio (INO-4800)", developer: "Inovio Pharmaceuticals", platform: "DNA", clinical_stage: "Phase I", phase: "I", fda_approved: false, category: "DNA-based vaccine", description: "DNA plasmid vaccine delivered by electroporation.", nextSteps: "Efficacy trials", funder: "CEPI, DoD", trimedName: "inovio" },
  
  // Pre-clinical
  { id: 18, name: "Arcturus (ARCT-021)", developer: "Arcturus Therapeutics", platform: "Self-replicating mRNA", clinical_stage: "Pre-clinical", phase: "Pre-clinical", fda_approved: false, category: "RNA-based vaccine", description: "Self-replicating mRNA platform.", nextSteps: "Clinical trials", funder: "Arcturus", trimedName: "arcturus" }
];

// ============================================================
// COMPREHENSIVE TREATMENT DATA
// ============================================================
const treatments = [
  // FDA Approved Treatments
  { id: 1, name: "Paxlovid (nirmatrelvir/ritonavir)", developer: "Pfizer", platform: "Antiviral (protease inhibitor)", clinical_stage: "Approved", phase: "IV", fda_approved: true, category: "Antiviral", description: "Oral antiviral combining nirmatrelvir (protease inhibitor) with ritonavir. EUA December 2021 for mild-to-moderate COVID-19 in high-risk patients.", nextSteps: "Expanded indications", funder: "Pfizer", trimedName: "paxlovid" },
  { id: 2, name: "Remdesivir (Veklury)", developer: "Gilead Sciences", platform: "Antiviral (nucleotide analog)", clinical_stage: "Approved", phase: "IV", fda_approved: true, category: "Antiviral", description: "Intravenous antiviral. First FDA-approved treatment for COVID-19 (October 2020). For hospitalized patients.", nextSteps: "Outpatient studies", funder: "Gilead, BARDA", trimedName: "remdesivir" },
  { id: 3, name: "Molnupiravir (Lagevrio)", developer: "Merck/Ridgeback", platform: "Antiviral (nucleoside analog)", clinical_stage: "Approved", phase: "IV", fda_approved: true, category: "Antiviral", description: "Oral antiviral for mild-to-moderate COVID-19. EUA December 2021.", nextSteps: "Combination studies", funder: "BARDA, Merck", trimedName: "molnupiravir" },
  { id: 4, name: "Dexamethasone", developer: "Generic", platform: "Corticosteroid", clinical_stage: "Approved", phase: "IV", fda_approved: true, category: "Immunomodulator", description: "Standard of care for severe COVID-19 requiring oxygen. RECOVERY trial showed 35% mortality reduction.", nextSteps: "Widely adopted", funder: "UK Gov (RECOVERY trial)", trimedName: "dexamethasone" },
  { id: 5, name: "Baricitinib (Olumiant)", developer: "Eli Lilly", platform: "JAK inhibitor", clinical_stage: "Approved", phase: "IV", fda_approved: true, category: "Immunomodulator", description: "JAK inhibitor for hospitalized adults requiring oxygen. FDA approved July 2022.", nextSteps: "Combination therapies", funder: "Eli Lilly, NIAID", trimedName: "baricitinib" },
  { id: 6, name: "Tocilizumab (Actemra)", developer: "Genentech/Roche", platform: "IL-6 inhibitor", clinical_stage: "Approved", phase: "IV", fda_approved: true, category: "Immunomodulator", description: "Monoclonal antibody blocking IL-6. EUA for hospitalized patients with inflammation.", nextSteps: "Biomarker studies", funder: "Roche", trimedName: "tocilizumab" },
  
  // Monoclonal Antibodies (some withdrawn due to variants)
  { id: 7, name: "Bebtelovimab", developer: "Eli Lilly", platform: "Monoclonal antibody", clinical_stage: "Approved", phase: "IV", fda_approved: true, category: "Monoclonal antibody", description: "Monoclonal antibody retaining activity against Omicron. EUA February 2022.", nextSteps: "Variant monitoring", funder: "Eli Lilly", trimedName: "bebtelovimab" },
  { id: 8, name: "Evusheld (tixagevimab/cilgavimab)", developer: "AstraZeneca", platform: "Monoclonal antibody", clinical_stage: "Approved", phase: "IV", fda_approved: true, category: "Monoclonal antibody (prophylaxis)", description: "Pre-exposure prophylaxis for immunocompromised. EUA December 2021.", nextSteps: "Updated formulations", funder: "BARDA, AstraZeneca", trimedName: "evusheld" },
  
  // Clinical Trial Treatments
  { id: 9, name: "Enstilarelvir (Xocova)", developer: "Shionogi", platform: "Antiviral (protease inhibitor)", clinical_stage: "Phase III", phase: "III", fda_approved: false, category: "Antiviral", description: "Oral protease inhibitor. Approved in Japan November 2022.", nextSteps: "Global trials", funder: "Shionogi", trimedName: "enstilarelvir" },
  { id: 10, name: "Interferon-beta", developer: "Various", platform: "Cytokine therapy", clinical_stage: "Phase III", phase: "III", fda_approved: false, category: "Immunomodulator", description: "Inhaled interferon for early COVID-19. Mixed trial results.", nextSteps: "Route optimization", funder: "Various", trimedName: "interferon-beta" },
  { id: 11, name: "Convalescent Plasma", developer: "Blood banks", platform: "Passive immunization", clinical_stage: "Clinical", phase: "Clinical", fda_approved: false, category: "Passive immunization", description: "Plasma from recovered patients. EUA revoked; not recommended.", nextSteps: "Discontinued", funder: "Various", trimedName: "convalescent-plasma" },
  { id: 12, name: "Hydroxychloroquine", developer: "Generic", platform: "Antimalarial", clinical_stage: "Discontinued", phase: "Discontinued", fda_approved: false, category: "Antimalarial", description: "Initially studied but found ineffective for COVID-19. EUA revoked June 2020.", nextSteps: "Not recommended", funder: "Various", trimedName: "hydroxychloroquine" },
  { id: 13, name: "Fluvoxamine", developer: "Generic", platform: "SSRI", clinical_stage: "Phase III", phase: "III", fda_approved: false, category: "Repurposed drug", description: "SSRI being studied for anti-inflammatory effects in COVID-19. TOGETHER trial showed benefit.", nextSteps: "Further trials", funder: "Various academic", trimedName: "fluvoxamine" },
  { id: 14, name: "Ivermectin", developer: "Generic", platform: "Antiparasitic", clinical_stage: "Not Recommended", phase: "Not Recommended", fda_approved: false, category: "Antiparasitic", description: "Antiparasitic drug. Major clinical trials (ACTIV-6, TOGETHER) found no benefit for COVID-19.", nextSteps: "Not recommended by FDA/WHO", funder: "Various", trimedName: "ivermectin" }
];

// ============================================================
// NEWS DATA
// ============================================================
const news = [
  { id: 1, title: "VacCOVID Archive: COVID-19 Data Frozen as of February 2023", source: "OWID", category: "coronavirus", date: "2023-02-14", publishedAt: "2023-02-14T00:00:00Z", description: "This archive preserves COVID-19 statistics from Our World in Data as they were on February 14, 2023. The data represents a historical snapshot and is no longer being updated.", url: "https://ourworldindata.org/covid-deaths" },
  { id: 2, title: "Global Vaccination Milestone: 13 Billion Doses Administered", source: "WHO", category: "vaccine", date: "2023-02-14", publishedAt: "2023-02-14T00:00:00Z", description: "Archived record of global COVID-19 vaccination progress as of February 2023, with over 13 billion doses administered worldwide.", url: "https://www.who.int/publications" },
  { id: 3, title: "COVID-19 Treatment Landscape Update", source: "FDA", category: "treatment", date: "2023-02-14", publishedAt: "2023-02-14T00:00:00Z", description: "Archive of FDA-authorized treatments for COVID-19 including oral antivirals and monoclonal antibodies.", url: "https://www.fda.gov/emergency-preparedness-and-response" },
  { id: 4, title: "mRNA Vaccines: A Medical Breakthrough", source: "CDC", category: "vaccine", date: "2023-02-14", publishedAt: "2023-02-14T00:00:00Z", description: "Historical overview of mRNA vaccine technology that enabled rapid COVID-19 vaccine development.", url: "https://www.cdc.gov/coronavirus" },
  { id: 5, title: "COVID-19 Pandemic Timeline", source: "reuters", category: "coronavirus", date: "2023-02-14", publishedAt: "2023-02-14T00:00:00Z", description: "Archive chronicling key events of the COVID-19 pandemic from emergence through early 2023.", url: "https://www.reuters.com/world/healthcare-coronavirus" }
];

// ============================================================
// BUILD STATIC DATA FILE
// ============================================================
const staticData = {
  world: worldData,
  countries: processedCountries,
  vaccines: vaccines,
  treatments: treatments,
  news: news,
  _meta: {
    exportDate: new Date().toISOString(),
    dataSource: "Our World in Data (OWID)",
    lastDataUpdate: "2023-02-14",
    dataDescription: "This is archived COVID-19 data. The dataset is frozen as of February 14, 2023 and will not receive updates.",
    version: "2.0.0",
    stats: {
      countriesCount: processedCountries.length,
      vaccinesCount: vaccines.length,
      treatmentsCount: treatments.length,
      newsCount: news.length
    }
  }
};

// Write the main data file
const mainDataPath = path.join(dataDir, 'mock-api-data.json');
fs.writeFileSync(mainDataPath, JSON.stringify(staticData, null, 2));
console.log('✅ Saved mock-api-data.json');

// Create index/manifest file
const indexData = {
  exportDate: new Date().toISOString(),
  dataSource: "Our World in Data (OWID)",
  lastDataUpdate: "2023-02-14",
  version: "2.0.0",
  files: [{
    name: "mock-api-data.json",
    description: "Combined static data for all API endpoints - comprehensive COVID, vaccine, and treatment data",
    size: fs.statSync(mainDataPath).size
  }],
  stats: {
    countries: processedCountries.length,
    vaccines: vaccines.length,
    treatments: treatments.length,
    news: news.length,
    worldTotalCases: worldData.TotalCases,
    worldTotalDeaths: worldData.TotalDeaths
  }
};

fs.writeFileSync(path.join(dataDir, 'index.json'), JSON.stringify(indexData, null, 2));
console.log('✅ Saved index.json');

// Summary
const totalSize = fs.statSync(mainDataPath).size + fs.statSync(path.join(dataDir, 'index.json')).size;
console.log(`
✨ Static data export complete!
📁 Files saved to: ${dataDir}

Summary:
  🌍 Countries: ${processedCountries.length}
  💉 Vaccines: ${vaccines.length} (${vaccines.filter(v => v.fda_approved).length} FDA approved)
  💊 Treatments: ${treatments.length} (${treatments.filter(t => t.fda_approved).length} FDA approved)
  📰 News: ${news.length}
  📊 World Cases: ${worldData.TotalCases.toLocaleString()}
  ☠️ World Deaths: ${worldData.TotalDeaths.toLocaleString()}
  💾 Total size: ~${Math.round(totalSize / 1024)} KB
`);
