/**
 * API Service
 * Calls backend API endpoints
 * Uses baseURL from config for API calls
 */

import { secretData } from '../actions/config';

const baseURL = secretData.baseURL || '/api';

// Helper function to make API calls
const apiCall = async (endpoint) => {
  try {
    const url = `${baseURL}${endpoint}`;
    console.log(`📡 API call: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(`❌ API call failed for ${endpoint}:`, error);
    throw error;
  }
};

export const api = {
  // Vaccine endpoints
  getAllVaccines: () => apiCall('/vaccines/get-all-vaccines'),
  getVaccinesByPhase: (phase) => {
    const phaseMap = {
      'pre-clinical': '/vaccines/get-all-vaccines-pre-clinical',
      'Phase I': '/vaccines/get-all-vaccines-phase-i',
      'Phase II': '/vaccines/get-all-vaccines-phase-ii',
      'Phase III': '/vaccines/get-all-vaccines-phase-iii',
      'phase iv': '/vaccines/get-all-vaccines-phase-iv',
      'approved': '/vaccines/get-fda-approved-vaccines'
    };
    const endpoint = phaseMap[phase] || '/vaccines/get-all-vaccines';
    return apiCall(endpoint);
  },
  getFDAApprovedVaccines: () => apiCall('/vaccines/get-fda-approved-vaccines'),
  getVaccinesByCategory: (category) => apiCall(`/vaccines/get-vaccines/${category}`),
  getVaccineByNameAndCategory: (category, name) => apiCall(`/vaccines/get-vaccines/${category}/${name}`),

  // Treatment endpoints
  getAllTreatments: () => apiCall('/vaccines/get-all-treatment'),
  getTreatmentsByPhase: (phase) => {
    if (phase === 'pre-clinical') {
      return apiCall('/vaccines/get-all-treatment-pre-clinical');
    } else if (phase === 'clinical') {
      return apiCall('/vaccines/get-all-treatment-clinical');
    }
    return apiCall('/vaccines/get-all-treatment');
  },
  getFDAApprovedTreatments: () => apiCall('/vaccines/get-all-fda-approved-treatment'),
  getTreatmentsByCategory: (category) => apiCall(`/vaccines/get-treatments/${category}`),
  getTreatmentByNameAndCategory: (category, name) => apiCall(`/vaccines/get-treatments/${category}/${name}`),
};

export default api;
