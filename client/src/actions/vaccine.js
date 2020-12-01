import { GET_ERRORS, 
    GET_ALL_VACCINES,GET_ALL_VACCINES_PRE_CLINICAL,GET_ALL_VACCINES_PHASE_ONE,GET_ALL_VACCINES_PHASE_TWO,GET_ALL_VACCINES_PHASE_THREE,GET_ALL_VACCINES_PHASE_FOUR,GET_FDA_APPROVED_VACCINES,GET_VACCINES_CATEGORY_BASED,
    GET_ALL_TREATMENTS,GET_ALL_TREATMENTS_PRE_CLINICAL,GET_ALL_TREATMENTS_CLINICAL,GET_ALL_TREATMENTS_FDA_APPROVED,GET_TREATMENTS_CATEGORY_BASED,
    CLEAR_VACCINE_DATA, CLEAR_EACH_VACCINE, CLEAR_TREATMENT_DATA,
    GET_EACH
} from './types';
import axios from 'axios';
import {secretData} from './config';

const baseURL = secretData.baseURL;

/////////////////////////////////////////////////////
///////////////   Clear Data   //////////////////////
/////////////////////////////////////////////////////

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
  axios.get(`${baseURL}/vaccines/get-all-vaccines`)
    .then(res => {
      dispatch({
        type: GET_ALL_VACCINES,
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

export const getAllVaccinesPreClinical = () => dispatch => {
  axios.get(`${baseURL}/vaccines/get-all-vaccines-pre-clinical`)
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
  axios.get(`${baseURL}/vaccines/get-all-vaccines-phase-i`)
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
  axios.get(`${baseURL}/vaccines/get-all-vaccines-phase-ii`)
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
  axios.get(`${baseURL}/vaccines/get-all-vaccines-phase-iii`)
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
  axios.get(`${baseURL}/vaccines/get-all-vaccines-phase-iv`)
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
  axios.get(`${baseURL}/vaccines/get-fda-approved-vaccines`)
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
  axios.get(`${baseURL}/vaccines/get-vaccines/${category}`)
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
  axios.get(`${baseURL}/vaccines/get-all-treatment`)
    .then(res => {
      dispatch({
        type: GET_ALL_TREATMENTS,
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

export const getAllTreatmentsPreClinical = () => dispatch => {
  axios.get(`${baseURL}/vaccines/get-all-treatment-pre-clinical`)
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
  axios.get(`${baseURL}/vaccines/get-all-treatment-clinical`)
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
  axios.get(`${baseURL}/vaccines/get-all-fda-approved-treatment`)
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
  axios.get(`${baseURL}/vaccines/get-treatments/${category}`)
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

////////////////////////////////////////////////
/////////////  Get Each   //////////////////////
////////////////////////////////////////////////


export const getEachVacOrTreat = (category,name) => dispatch => {
  axios.get(`${baseURL}/vaccines/get-vaccines/${category}/${name}`)
    .then(res => {
      dispatch({
        type: GET_EACH,
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