import express from "express";
import {
    addReports,
    getAll,
    getReports,
    updateProvinces,
    getUsaProvinces,
    getCanadaProvinces,
    getBrazilProvinces,
    getGermanyProvinces,
    getAustraliaProvinces,
    getProvincesBasedOnISO,
    getCitiesBasedOnISO,
    addUSStates,
    addCityReports,
} from "../utils/covidAPIData";

const Router = express.Router();

Router.put("/clear-data", async (req, res) => {
    try {
        return res.send('data is cleared');
    } catch (error) {
        console.log(error);
    }
});

Router.put("/updateProvinces", async (req, res) => {
    try {
        return res.send(await updateProvinces());
    } catch (error) {
        console.log(error);
    }
});

Router.put("/addReports", async (req, res) => {
    try {
        await addReports();
        return res.send({ message: "all reports are updated" });
    } catch (error) {
        console.log(error);
    }
});

Router.put("/addUsReports", async (req, res) => {
    try {
        await addUSStates();
        return res.send({ message: "all US reports are updated" });
    } catch (error) {
        console.log(error);
    }
});

Router.put("/addCityReports", async (req, res) => {
    console.log("We are here city");
    try {
        await addCityReports();
        return res.send({ message: "all cities reports are updated" });
    } catch (error) {
        console.log(error);
    }
});

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
