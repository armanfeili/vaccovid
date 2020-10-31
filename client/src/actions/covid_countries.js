import { GET_ERRORS, GET_WORLD_COVID_DATA, GET_ALL_COUNTRIES_COVID_DATA, GET_ASIA_COUNTRIES_COVID_DATA, GET_AFRICA_COUNTRIES_COVID_DATA, GET_EUROPE_COUNTRIES_COVID_DATA, GET_NORTH_AMERICA_COUNTRIES_COVID_DATA, GET_SOUTH_AMERICA_COUNTRIES_COVID_DATA, GET_AUSTRALIA_OCEANIA_COUNTRIES_COVID_DATA, GET_USA_STATES_DATA, GET_CANADA_STATES_DATA, GET_BRAZIL_STATES_DATA, GET_GERMANY_STATES_DATA, GET_AUSTRALIA_STATES_DATA, GET_COUNTRY_STATES_AND_CITIES_DATA ,GET_ALL_COUNTRIES_COVID_DATA_NAME_ORDERED,GET_PROVINCE_ISO_REPORT_DATA,GET_CITIES_ISO_REPORT_DATA, GET_COUNTRY_ISO_BASED_DATA, GET_OVID_DATA, CLEAR_DATA} from './types';
import axios from 'axios';

export const clearData = () => dispatch => {
  axios.get(`/api/clear-data`)
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: CLEAR_DATA,
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getWorldData = () => dispatch => {
  axios.get(`/api/npm-covid-data/world`)
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_WORLD_COVID_DATA,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getAllCountriesDataNameOrdered = () => dispatch => {
  axios.get(`/api/npm-covid-data/countries-name-ordered`)
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

export const getAllCountriesData = () => dispatch => {
  axios.get(`/api/npm-covid-data/countries`)
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

export const getCountryISOBased = (countryName, iso) => dispatch => {
  axios.get(`/api/npm-covid-data/country-report-iso-based/${countryName}/${iso}`)
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

export const getPrrovinceAndCities = (iso) => dispatch => {
  axios.get(`/api/api-covid-data/reports/${iso}`)
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

export const getProvinceReportISOBased = (iso) => dispatch => {
  axios.get(`/api/api-covid-data/provinces-report-iso-based/${iso}`)
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

export const getCitiesReportISOBased = (iso) => dispatch => {
  axios.get(`/api/api-covid-data/cities-report-iso-based/${iso}`)
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

export const getUSAStatesData = () => dispatch => {
  axios.get(`/api/api-covid-data/usa-states`)
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
  axios.get(`/api/api-covid-data/canada-states`)
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
  axios.get(`/api/api-covid-data/brazil-states`)
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
  axios.get(`/api/api-covid-data/germany-states`)
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
  axios.get(`/api/api-covid-data/australia-states`)
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
  axios.get(`/api/npm-covid-data/asia`)
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
  axios.get(`/api/npm-covid-data/africa`)
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
  axios.get(`/api/npm-covid-data/europe`)
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
  axios.get(`/api/npm-covid-data/northamerica`)
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
  axios.get(`/api/npm-covid-data/southamerica`)
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
  axios.get(`/api/npm-covid-data/australia`)
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
  axios.get(`/api/covid-ovid-data/sixmonth/${iso}`)
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
