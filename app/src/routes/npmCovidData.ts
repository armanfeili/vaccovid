import { getConnection, getManager } from "typeorm";
import { Statistics } from "../db/models/Statistics";
import express from "express";
import {
    fetch_npmData, getWorldData, getAllCountriesData, getAustraliaOceaniaCountriesData, getSouthAmericaCountriesData, getNorthAmericaCountriesData, getEuropeCountriesData, getAfricaCountriesData, getAsiaCountriesData, fetchCasesInAllUSStates, getAllCountriesNameOrdered, getNPMProvincesBasedOnISO,
} from "../utils/fetch";

const Router = express.Router();

// Route: /api/getdata
// Example: /api/getdata
// Public
// return all covid19 npm data that fetched every 30 min

Router.get("/", async (req, res) => {
    const connection = getConnection();
    // const queryRunner = connection.createQueryRunner();

    const StatRepository = await connection.getRepository(Statistics);
    res.send(
        await StatRepository.find({
            order: {
                rank: "ASC",
            },
        })
    );
});

Router.post("/fetch-npm-data", async (req, res) => {
    try {
        const data = await fetch_npmData();
        res.status(200).json({ message: "all countries are updated from npm", data: data })
    } catch (error) {
        console.log(error);
    }
});

Router.put("/update-us-states", async (req, res) => {
    try {
        await fetchCasesInAllUSStates();
        res.status(200).json({ message: "us states are updated" })
    } catch (error) {
        console.log(error);
    }
});

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
        // return res.send(await getProvincesBasedOnISO(req.params.iso.toUpperCase()));
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
