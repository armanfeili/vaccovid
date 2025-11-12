import { getConnection, getManager } from "typeorm";
import { Statistics } from "../db/models/Statistics";
import express from "express";
import {
    getWorldData, getAllCountriesData, getAustraliaOceaniaCountriesData, getSouthAmericaCountriesData, getNorthAmericaCountriesData, getEuropeCountriesData, getAfricaCountriesData, getAsiaCountriesData, getAllCountriesNameOrdered, getNPMProvincesBasedOnISO,
    // DEPRECATED: fetch_npmData, fetchCasesInAllUSStates - data no longer updated
} from "../utils/fetch";

const Router = express.Router();

// DEPRECATED ENDPOINTS - Data no longer updated (REMOVED)
// - POST /fetch-npm-data (REMOVED)
// - PUT /update-us-states (REMOVED)
// This website now serves archived COVID data only.

// Uncomment if you need deprecation warnings instead:
/*
const deprecatedEndpoint = (req, res) => {
  res.status(410).json({ 
    error: "This endpoint is deprecated. Data is no longer updated.",
    message: "This website now displays archived COVID data only."
  });
};

Router.post("/fetch-npm-data", deprecatedEndpoint);
Router.put("/update-us-states", deprecatedEndpoint);
*/

// KEPT: GET endpoints for reading archived COVID data

Router.get("/world", async (req, res) => {
    try {
        const worldDataObject = await getWorldData();
        res.status(200).json(worldDataObject);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/countries-name-ordered", async (req, res) => {
    try {
        const countriesArray = await getAllCountriesNameOrdered();
        res.status(200).json(countriesArray);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/countries", async (req, res) => {
    try {
        const countriesArray = await getAllCountriesData();
        res.status(200).json(countriesArray);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/country-report-iso-based/:countryname/:iso", async (req, res) => {
    try {
        const countryArray = await getNPMProvincesBasedOnISO(req.params.countryname, req.params.iso.toLowerCase());
        res.status(200).json(countryArray);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/asia", async (req, res) => {
    try {
        const countriesArray = await getAsiaCountriesData();
        res.status(200).json(countriesArray);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/africa", async (req, res) => {
    try {
        const countriesArray = await getAfricaCountriesData();
        res.status(200).json(countriesArray);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/europe", async (req, res) => {
    try {
        const countriesArray = await getEuropeCountriesData();
        res.status(200).json(countriesArray);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/northamerica", async (req, res) => {
    try {
        const countriesArray = await getNorthAmericaCountriesData();
        res.status(200).json(countriesArray);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/southamerica", async (req, res) => {
    try {
        const countriesArray = await getSouthAmericaCountriesData();
        res.status(200).json(countriesArray)
    } catch (error) {
        console.log(error);
    }
});
Router.get("/australia", async (req, res) => {
    try {
        const countriesArray = await getAustraliaOceaniaCountriesData();
        res.status(200).json(countriesArray)
    } catch (error) {
        console.log(error);
    }
});

export default Router;
