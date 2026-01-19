const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Load vaccine-data.json
const vaccineDataPath = path.join(rootDir, 'app/src/utils/vaccine-data.json');
const vaccineData = JSON.parse(fs.readFileSync(vaccineDataPath, 'utf8'));
console.log('Loaded vaccine-data.json with', vaccineData.length, 'records');

// Load current mock-api-data.json  
const mockDataPath = path.join(rootDir, 'client/build/data/mock-api-data.json');
const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));
console.log('Current mock-api-data.json keys:', Object.keys(mockData));

// Transform data to expected format
function transformVaccineData(rawData) {
    const vaccineItems = [];
    const treatmentItems = [];
    
    rawData.forEach((item, index) => {
        // Handle the complex "Treatment vs" field which can be an object like {" Vaccine":"Vaccine"} or {" Vaccine":"Treatment"}
        let treatmentField = item['Treatment vs. Vaccine'] || item['Treatment vs'] || item['treatmentVsVaccine'] || '';
        
        // If it's an object, extract the value
        if (typeof treatmentField === 'object' && treatmentField !== null) {
            // Get the first value from the object
            const values = Object.values(treatmentField);
            treatmentField = values[0] || '';
        }
        
        treatmentField = String(treatmentField);
        const isTreatment = treatmentField.toLowerCase().includes('treatment');
        
        const developerName = item['Developer / Researcher'] || item['Developer'] || item.developerResearcher || 'Unknown';
        const categoryName = item['Product Category'] || item.category || 'Other';
        
        const transformed = {
            id: index + 1,
            developerResearcher: developerName,
            category: categoryName,
            phase: item['Stage of Development'] || item.phase || 'Pre-clinical',
            description: item['Product Description'] || item.description || developerName,
            treatmentVsVaccine: isTreatment ? 'Treatment' : 'Vaccine',
            funder: item['Funder(s)'] || item.funder || '',
            lastUpdated: item['Last Updated'] || item.lastUpdated || '',
            nextSteps: item['Anticipated Next Steps'] || item.nextSteps || '',
            FDAApproved: item['FDA-Approved Indications'] || item.FDAApproved || '',
            clinicalTrialsForCovid19: item['Clinical Trials for COVID-19'] || item.clinicalTrialsForCovid19 || '',
            clinicalTrialsForOtherDiseases: item['Clinical Trials for Other Diseases'] || item.clinicalTrialsForOtherDiseases || '',
            publishedResults: item['Published Results'] ? [item['Published Results']] : [],
            trimedCategory: categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
            trimedName: developerName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').substring(0, 80)
        };
        
        if (isTreatment) {
            treatmentItems.push(transformed);
        } else {
            vaccineItems.push(transformed);
        }
    });
    
    return { vaccines: vaccineItems, treatments: treatmentItems };
}

const { vaccines, treatments } = transformVaccineData(vaccineData);
console.log('Transformed:', vaccines.length, 'vaccines,', treatments.length, 'treatments');

// Update mock-api-data.json
mockData.vaccines = vaccines;
mockData.treatments = treatments;

// Write back
fs.writeFileSync(mockDataPath, JSON.stringify(mockData, null, 2));
console.log('Updated mock-api-data.json');
console.log('Sample vaccine:', vaccines[0]?.developerResearcher);
console.log('Sample treatment:', treatments[0]?.developerResearcher);
