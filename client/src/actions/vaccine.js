import { 
    GET_ERRORS, 
    GET_ALL_VACCINES,
    GET_ALL_VACCINES_PRE_CLINICAL,
    GET_ALL_VACCINES_PHASE_ONE,
    GET_ALL_VACCINES_PHASE_TWO,
    GET_ALL_VACCINES_PHASE_THREE,
    GET_ALL_VACCINES_PHASE_FOUR,
    GET_FDA_APPROVED_VACCINES,
    GET_VACCINES_CATEGORY_BASED,
    GET_ALL_TREATMENTS,
    GET_ALL_TREATMENTS_PRE_CLINICAL,
    GET_ALL_TREATMENTS_CLINICAL,
    GET_ALL_TREATMENTS_FDA_APPROVED,
    GET_TREATMENTS_CATEGORY_BASED,
    CLEAR_VACCINE_DATA, 
    CLEAR_EACH_VACCINE, 
    CLEAR_TREATMENT_DATA,
    GET_EACH
} from './types';
// Use mock API for static site deployment (GitHub Pages)
import mockAPI from '../utils/mockApi';

export const clearVaccineData = () => dispatch => {
  try {
    dispatch(
      {
        type: CLEAR_VACCINE_DATA,
        payload:[]
      }
    );
  } catch (error) {
    console.log("couldn't clear vaccine data");
  }
};

export const clearTreatmentData = () => dispatch => {
  try {
    dispatch(
      {
        type: CLEAR_TREATMENT_DATA,
        payload:[]
      }
    );
  } catch (error) {
    console.log("couldn't clear treatment data");
  }
};

export const clearEachVaccine = () => dispatch => {
  try {
    dispatch(
      {
        type: CLEAR_EACH_VACCINE,
        payload:[]
      }
    );
  } catch (error) {
    console.log("couldn't clear each vaccine data");
  }
};

/////////////////////////////////////////////////////
///////////////   Vaccines   ////////////////////////
/////////////////////////////////////////////////////

export const getAllVaccines = () => dispatch => {
  console.log('🚀 getAllVaccines action called');
  mockAPI.getAllVaccines()
    .then(res => {
      console.log('✅ getAllVaccines response:', res.data?.length || 0, 'vaccines');
      if (res.data?.length > 0) {
        console.log('📊 Sample vaccine:', res.data[0].developerResearcher);
      }
      dispatch({
        type: GET_ALL_VACCINES,
        payload: res.data
      });})
    .catch(err => 
        {
        console.log('❌ getAllVaccines error:', err);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    });
};

export const getAllVaccinesPreClinical = () => dispatch => {
  mockAPI.getVaccinesByPhase("pre-clinical")
    .then(res => {
      dispatch({
        type: GET_ALL_VACCINES_PRE_CLINICAL,
        payload: res.data
      });})
    .catch(err => 
        {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    });
};

export const getAllVaccinesPhaseOne = () => dispatch => {
  mockAPI.getVaccinesByPhase("Phase I")
    .then(res => {
      dispatch({
        type: GET_ALL_VACCINES_PHASE_ONE,
        payload: res.data
      });})
    .catch(err => 
        {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    });
};

export const getAllVaccinesPhaseTwo = () => dispatch => {
  mockAPI.getVaccinesByPhase("Phase II")
    .then(res => {
      dispatch({
        type: GET_ALL_VACCINES_PHASE_TWO,
        payload: res.data
      });})
    .catch(err => 
        {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    });
};

export const getAllVaccinesPhaseThree = () => dispatch => {
  mockAPI.getVaccinesByPhase("Phase III")
    .then(res => {
      dispatch({
        type: GET_ALL_VACCINES_PHASE_THREE,
        payload: res.data
      });})
    .catch(err => 
        {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    });
};

export const getAllVaccinesPhaseFour = () => dispatch => {
  mockAPI.getFDAApprovedVaccines()
    .then(res => {
      dispatch({
        type: GET_ALL_VACCINES_PHASE_FOUR,
        payload: res.data
      });})
    .catch(err => 
        {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    });
};

export const get_FDA_Approved_Vaccines = () => dispatch => {
  mockAPI.getFDAApprovedVaccines()
    .then(res => {
      dispatch({
        type: GET_FDA_APPROVED_VACCINES,
        payload: res.data
      });})
    .catch(err => 
        {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    });
};


export const getVaccinesCategoryBased = (category) => dispatch => {
  mockAPI.getVaccinesByCategory(category)
    .then(res => {
      dispatch({
        type: GET_VACCINES_CATEGORY_BASED,
        payload: res.data
      });})
    .catch(err => 
        {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    });
};

/////////////////////////////////////////////////////
///////////////   Treatments   //////////////////////
/////////////////////////////////////////////////////

export const getAllTreatments = () => dispatch => {
  console.log('🚀 getAllTreatments action called');
  mockAPI.getAllTreatments()
    .then(res => {
      console.log('✅ getAllTreatments response:', res.data?.length || 0, 'treatments');
      if (res.data?.length > 0) {
        console.log('💊 Sample treatment:', res.data[0].developerResearcher);
      }
      dispatch({
        type: GET_ALL_TREATMENTS,
        payload: res.data
      });})
    .catch(err => 
        {
        console.log('❌ getAllTreatments error:', err);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    });
};

export const getAllTreatmentsPreClinical = () => dispatch => {
  mockAPI.getTreatmentsByPhase("pre-clinical")
    .then(res => {
      dispatch({
        type: GET_ALL_TREATMENTS_PRE_CLINICAL,
        payload: res.data
      });})
    .catch(err => 
        {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    });
};

export const getAllTreatmentsClinical = () => dispatch => {
  mockAPI.getTreatmentsByPhase("clinical")
    .then(res => {
      dispatch({
        type: GET_ALL_TREATMENTS_CLINICAL,
        payload: res.data
      });})
    .catch(err => 
        {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    });
};

export const getAllTreatmentsFDAApproved = () => dispatch => {
  mockAPI.getFDAApprovedTreatments()
    .then(res => {
      dispatch({
        type: GET_ALL_TREATMENTS_FDA_APPROVED,
        payload: res.data
      });})
    .catch(err => 
        {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    });
};

export const getTreatmentsCategoryBased = (category) => dispatch => {
  mockAPI.getTreatmentsByCategory(category)
    .then(res => {
      dispatch({
        type: GET_TREATMENTS_CATEGORY_BASED,
        payload: res.data
      });})
    .catch(err => 
        {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    });
};

///////////////////////////////////////////////
/////////////  Get Each   //////////////////////
///////////////////////////////////////////////


export const getEachVacOrTreat = (category,name) => dispatch => {
  // Try to get a vaccine by name/category first, fall back to treatment if not found
  mockAPI.getVaccineByNameAndCategory(category, name)
    .then(res => {
      const data = res.data;
      const hasData = data && Array.isArray(data) && data.length > 0;
      if (hasData) {
        dispatch({
          type: GET_EACH,
          payload: data
        });
      } else {
        // fallback to treatment lookup
        mockAPI.getTreatmentByNameAndCategory(category, name)
          .then(res2 => {
            dispatch({
              type: GET_EACH,
              payload: res2.data || []
            });
          })
          .catch(err2 => {
            console.log(err2);
            dispatch({
              type: GET_ERRORS,
              payload: {}
            });
          });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    });
};
