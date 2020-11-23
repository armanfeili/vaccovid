import { Express } from "express";

import apiTestRoute from "./testRoute";

import npmCovidData from "./npmCovidData";

import APICovidData from "./APICovidData";

import covidOvidData from "./covidOvidData";

import vaccine from "./vaccine";

import whoNews from "./news";

import sitemap from "./sitemap";

// All Routes Goes Here
export const AppRoutes = (app: Express) => {
  app.use("/api/test", apiTestRoute);
  // the URL to get data: 'localhost:5000/api/test/test1'

  // getData Folder
  app.use("/api/npm-covid-data/", npmCovidData);

  // covidData
  app.use("/api/api-covid-data/", APICovidData);

  // covidData
  app.use("/api/covid-ovid-data/", covidOvidData);

  // vaccine
  app.use("/api/vaccines/", vaccine);

  // whoNews
  app.use('/api/news/', whoNews);

  // generate sitemap
  app.use('/sitemap.xml', sitemap);
};
