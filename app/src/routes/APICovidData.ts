import express from "express";
import {
    getAll,
    getReports,
    // DEPRECATED: addReports, updateProvinces, addUSStates, addCityReports - data no longer updated
    getUsaProvinces,
    getCanadaProvinces,
    getBrazilProvinces,
    getGermanyProvinces,
    getAustraliaProvinces,
    getProvincesBasedOnISO,
    getCitiesBasedOnISO,
} from "../utils/covidAPIData";

const Router = express.Router();

// DEPRECATED ENDPOINTS - Data no longer updated (REMOVED)
// - PUT /clear-data (REMOVED)
// - PUT /updateProvinces (REMOVED)
// - PUT /addReports (REMOVED)
// - PUT /addUsReports (REMOVED)
// - PUT /addCityReports (REMOVED)
// This website now serves archived COVID data only.

// Uncomment if you need deprecation warnings instead:
/*
const deprecatedEndpoint = (req, res) => {
  res.status(410).json({ 
    error: "This endpoint is deprecated. Data is no longer updated.",
    message: "This website now displays archived COVID data only."
  });
};

Router.put("/clear-data", deprecatedEndpoint);
Router.put("/updateProvinces", deprecatedEndpoint);
Router.put("/addReports", deprecatedEndpoint);
Router.put("/addUsReports", deprecatedEndpoint);
Router.put("/addCityReports", deprecatedEndpoint);
*/

// KEPT: GET endpoints for reading archived COVID data

Router.get("/allreports", async (req, res) => {
    try {
        return res.send(await getAll());
    } catch (error) {
        console.log(error);
    }
});

Router.get("/reports/:iso", async (req, res) => {
    try {
        return res.send(await getReports(req.params.iso.toUpperCase()));
    } catch (error) {
        console.log(error);
    }
});

Router.get("/provinces-report-iso-based/:iso", async (req, res) => {
    try {
        const provinces = await getProvincesBasedOnISO(req.params.iso.toUpperCase());
        res.status(200).json(provinces);
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
});

Router.get("/cities-report-iso-based/:iso", async (req, res) => {
    try {
        return res.send(await getCitiesBasedOnISO(req.params.iso.toUpperCase()));
    } catch (error) {
        console.log(error);
    }
});

Router.get("/usa-states", async (req, res) => {
    try {
        const usaProvinces = await getUsaProvinces();

        res.status(200).json(usaProvinces);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/canada-states", async (req, res) => {
    try {
        const canadaProvinces = await getCanadaProvinces();

        res.status(200).json(canadaProvinces);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/brazil-states", async (req, res) => {
    try {
        const brazilProvinces = await getBrazilProvinces();

        res.status(200).json(brazilProvinces);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/germany-states", async (req, res) => {
    try {
        const germanyProvinces = await getGermanyProvinces();

        res.status(200).json(germanyProvinces);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/australia-states", async (req, res) => {
    try {
        const australiaProvinces = await getAustraliaProvinces();

        res.status(200).json(australiaProvinces);
    } catch (error) {
        console.log(error);
    }
});

export default Router;
