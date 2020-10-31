import { combineReducers } from 'redux';
import { newsReducer } from './news';
import { covidCountriesReducer } from './covid_countries';
import { covidProvincesReducer } from './covid_provinces';

export default combineReducers({
  newsObject: newsReducer,
  countriesObject: covidCountriesReducer,
  provincesObject: covidProvincesReducer
});
