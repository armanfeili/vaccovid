import { GET_ERRORS, GET_CORONAVIRUS_NEWS, GET_VACCINE_NEWS, GET_HEALTH_NEWS, NEWS_LOADING } from './types';
import axios from 'axios';
import {secretData} from './config';

const baseURL = secretData.baseURL;

export const setNewsLoading = () => {
  return {
    type: NEWS_LOADING
  };
};

export const getCoronavirusNews = (page) => dispatch => {
  axios.get(`${baseURL}/news/get-coronavirus-news/${page}`)
    .then(res => {
      dispatch({
        type: GET_CORONAVIRUS_NEWS,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getVaccineNews = (page) => dispatch => {
  axios.get(`${baseURL}/news/get-vaccine-news/${page}`)
    .then(res => {
      dispatch({
        type: GET_VACCINE_NEWS,
        payload: res.data
      });})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getHealthNews = (page) => dispatch => {
  // dispatch(setProfileLoading())
  axios.get(`${baseURL}/news/get-health-news/${page}`)
    .then(res => {
      // console.log(res.data.news);
      dispatch({
        type: GET_HEALTH_NEWS,
        payload: res.data
      });
      return res.data;
    }
  )
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};
