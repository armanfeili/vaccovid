import { GET_ERRORS, GET_CORONAVIRUS_NEWS, GET_VACCINE_NEWS, GET_HEALTH_NEWS, NEWS_LOADING } from './types';
import axios from 'axios';
// Profile Loading
export const setNewsLoading = () => {
  // We don't need to send any payload or anything, it's just going to let the reducer know that it's loading.
  return {
    type: NEWS_LOADING
  };
};

export const getCoronavirusNews = (page) => dispatch => {
  // dispatch(setProfileLoading())
  axios.get(`/api/news/get-coronavirus-news/${page}`)
    .then(res => {
      // console.log(res.data)
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
  // dispatch(setProfileLoading())
  axios.get(`/api/news/get-vaccine-news/${page}`)
    .then(res => {
      // console.log(res.data)
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
  axios.get(`/api/news/get-health-news/${page}`)
    .then(res => {
      console.log(res.data.news);
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

//   axios
//     .get('/api/who-news/get-coronavirus-news')
//     .then((res) =>
//       dispatch({
//         type: GET_PROFILES,
//         payload: res.data,
//       })
//     )
//     .catch((err) =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: {},
//       })
//     )
// }
