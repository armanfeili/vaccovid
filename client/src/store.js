// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers'; // because we named root reducer file as index.js , so we can don't write './reducers/index'

// // for creating store, we use a method called creatStore() and it get 3 arguments:
// // 1)root reducer of combineReducers 2)initial state 3)enhancer like applyMiddleware()

// const initialState = {}; // we don't need initialState (preloadedState) in this application

// const middleware = [thunk]; // an array of middlewares that we wanna apply to createStore

// // because of we need applyMiddleware() and Chrome Redux extension, we used compose() to be able to use both.
// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// export default store;

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

// In development, use the browser's Redux dev tools extension if installed
const enhancers = [];
const isDevelopment = process.env.NODE_ENV === "development";
if (
  isDevelopment &&
  typeof window !== "undefined" &&
  window.devToolsExtension
) {
  enhancers.push(window.devToolsExtension());
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    ...enhancers
  )
);

export default store;
