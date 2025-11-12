import { GET_ERRORS, GET_WORLD_COVID_DATA, GET_ALL_COUNTRIES_COVID_DATA, GET_ASIA_COUNTRIES_COVID_DATA, GET_AFRICA_COUNTRIES_COVID_DATA, GET_EUROPE_COUNTRIES_COVID_DATA, GET_NORTH_AMERICA_COUNTRIES_COVID_DATA, GET_SOUTH_AMERICA_COUNTRIES_COVID_DATA, GET_AUSTRALIA_OCEANIA_COUNTRIES_COVID_DATA, GET_USA_STATES_DATA, GET_CANADA_STATES_DATA, GET_BRAZIL_STATES_DATA, GET_GERMANY_STATES_DATA, GET_AUSTRALIA_STATES_DATA, GET_COUNTRY_STATES_AND_CITIES_DATA ,GET_ALL_COUNTRIES_COVID_DATA_NAME_ORDERED,GET_PROVINCE_ISO_REPORT_DATA,GET_CITIES_ISO_REPORT_DATA, GET_COUNTRY_ISO_BASED_DATA, GET_OVID_DATA, 
  CLEAR_DATA, CLEAR_WORLD_DATA, CLEAR_ALL_COUNTRIES_COVID_DATA_NAME_ORDERED_DATA, CLEAR_ALL_COUNTRIES_COVID_DATA, CLEAR_COUNTRY_ISO_BASED_DATA, CLEAR_COUNTRY_STATES_AND_CITIES_DATA, CLEAR_PROVINCE_ISO_REPORT_DATA, CLEAR_CITIES_ISO_REPORT_DATA,CLEAR_OVID_DATA,
  CLEAR_COUNTRIES_DATA, CLEAR_PROVINCES_DATA
} from './types';
import mockAPI from '../utils/mockApi';

export const clearData = () => dispatch => {
  try {
    dispatch(
      {
        type: CLEAR_DATA,
      }
    );
  } catch (error) {
    console.log("couldn't clear data");
  }
};

export const clearCountriesData = () => dispatch => {
  try {
    dispatch(
      {
        type: CLEAR_COUNTRIES_DATA,
      }
    );
  } catch (error) {
    console.log("couldn't clear countries");
  }
};

export const clearProvincesData = () => dispatch => {
  try {
    dispatch(
      {
        type: CLEAR_PROVINCES_DATA,
      }
    );
  } catch (error) {
    console.log("couldn't clear provinces");
  }
};


export const getWorldData = () => dispatch => {
  mockAPI.getWorldData()
    .then(res => {
      dispatch({
        type: GET_WORLD_COVID_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const clearWorldData = () => dispatch => {
  try {
    dispatch(
      {
        type: CLEAR_WORLD_DATA,
        payload:[]
      }
    );
  } catch (error) {
    console.log("couldn't clear world data");
  }
};

export const getAllCountriesDataNameOrdered = () => dispatch => {
  mockAPI.getAllCountriesNameOrdered()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_ALL_COUNTRIES_COVID_DATA_NAME_ORDERED,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const clearAllCountriesNameOrderedData = () => dispatch => {
  try {
    dispatch(
      {
        type: CLEAR_ALL_COUNTRIES_COVID_DATA_NAME_ORDERED_DATA,
      }
    );
  } catch (error) {
    console.log("couldn't clear countries name ordered data");
  }
};

export const getAllCountriesData = () => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_ALL_COUNTRIES_COVID_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};


export const clearAllCountriesData = () => dispatch => {
  try {
    dispatch(
      {
        type: CLEAR_ALL_COUNTRIES_COVID_DATA,
      }
    );
  } catch (error) {
    console.log("couldn't clear all countries data");
  }
};

export const getCountryISOBased = (countryName, iso) => dispatch => {
  mockAPI.getCountryByISO(iso)
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_COUNTRY_ISO_BASED_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const clearCountryISOBasedData = () => dispatch => {
  try {
    dispatch(
      {
        type: CLEAR_COUNTRY_ISO_BASED_DATA,
      }
    );
  } catch (error) {
    console.log("couldn't clear country iso based data");
  }
};

export const getPrrovinceAndCities = (iso) => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_COUNTRY_STATES_AND_CITIES_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const clearPrrovinceAndCitiesData = () => dispatch => {
  try {
    dispatch(
      {
        type: CLEAR_COUNTRY_STATES_AND_CITIES_DATA,
      }
    );
  } catch (error) {
    console.log("couldn't clear country states and cities data");
  }
};

export const getProvinceReportISOBased = (iso) => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_PROVINCE_ISO_REPORT_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};


export const clearProvinceReportISOBasedData = () => dispatch => {
  try {
    dispatch(
      {
        type: CLEAR_PROVINCE_ISO_REPORT_DATA,
      }
    );
  } catch (error) {
    console.log("couldn't clear province iso based data");
  }
};

export const getCitiesReportISOBased = (iso) => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_CITIES_ISO_REPORT_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};


export const clearCitiesReportISOBasedData = () => dispatch => {
  try {
    dispatch(
      {
        type: CLEAR_CITIES_ISO_REPORT_DATA,
      }
    );
  } catch (error) {
    console.log("couldn't clear cities iso based data");
  }
};

export const getUSAStatesData = () => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_USA_STATES_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getCanadaStatesData = () => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_CANADA_STATES_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getBrazilStatesData = () => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_BRAZIL_STATES_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getGermanyStatesData = () => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_GERMANY_STATES_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getAustraliaStatesData = () => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_AUSTRALIA_STATES_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getAsiaCountriesData = () => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_ASIA_COUNTRIES_COVID_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getAfricaCountriesData = () => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_AFRICA_COUNTRIES_COVID_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getEuropeCountriesData = () => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_EUROPE_COUNTRIES_COVID_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getNorthAmericaCountriesData = () => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_NORTH_AMERICA_COUNTRIES_COVID_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getSouthAmericaCountriesData = () => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_SOUTH_AMERICA_COUNTRIES_COVID_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getAustraliaOceaniaCountriesData = () => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_AUSTRALIA_OCEANIA_COUNTRIES_COVID_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getOvidData = (iso) => dispatch => {
  mockAPI.getAllCountries()
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_OVID_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};


export const clearOvidData = () => dispatch => {
  try {
    dispatch(
      {
        type: CLEAR_OVID_DATA,
        payload:[]
      }
    );
  } catch (error) {
    console.log("couldn't clear world data");
  }
};