import Express from "express";
import { getManager } from "typeorm";
import { OwidData } from "../db/models/OwidData";
import {
    convertVaccineData, updateVaccine,
    getAllVaccines, getAllPhase_PreClinical_Vaccines, getAllPhase_one_Vaccines, getAllPhase_two_Vaccines, getAllPhase_three_Vaccines, getAllPhase_four_Vaccines, get_FDA_Approved_Vaccines, getAllVaccineNames,
    getAllTreatments, getAllPreClinicalTreatments, getAllClinicalTreatments, getAll_FDA_Approved_Treatments,
    getVaccineCategoryBased, getTreatmentCategoryBased,
    getEachOne,
    getEverything
} from "../utils/vaccineAndTreatment";

const Router = Express.Router();

Router.post("/download-and-convert-vaccine-data", async (req, res) => {
    try {
        res.status(200).json(await convertVaccineData());
    } catch (error) {
        console.log(error);
    }
});

Router.put("/update-vaccine", async (req, res) => {
    try {
        const vacData = await updateVaccine();
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});


/////////////////////////////////////////////////////
///////////////   Vaccines   ////////////////////////
/////////////////////////////////////////////////////

Router.get("/get-all-vaccine-names", async (req, res) => {
    try {
        const vacData = await getAllVaccineNames();
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/get-all-vaccines", async (req, res) => {
    try {
        const vacData = await getAllVaccines();
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/get-all-vaccines-pre-clinical", async (req, res) => {
    try {
        const vacData = await getAllPhase_PreClinical_Vaccines();
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/get-all-vaccines-phase-i", async (req, res) => {
    try {
        const vacData = await getAllPhase_one_Vaccines();
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/get-all-vaccines-phase-ii", async (req, res) => {
    try {
        const vacData = await getAllPhase_two_Vaccines();
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/get-all-vaccines-phase-iii", async (req, res) => {
    try {
        const vacData = await getAllPhase_three_Vaccines();
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/get-all-vaccines-phase-iv", async (req, res) => {
    try {
        const vacData = await getAllPhase_four_Vaccines();
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/get-fda-approved-vaccines", async (req, res) => {
    try {
        const vacData = await get_FDA_Approved_Vaccines();
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});


/////////////////////////////////////////////////////
///////////////   Treatments   //////////////////////
/////////////////////////////////////////////////////

Router.get("/get-all-treatment", async (req, res) => {
    try {
        const vacData = await getAllTreatments();
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/get-all-treatment-pre-clinical", async (req, res) => {
    try {
        const vacData = await getAllPreClinicalTreatments();
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/get-all-treatment-clinical", async (req, res) => {
    try {
        const vacData = await getAllClinicalTreatments();
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/get-all-fda-approved-treatment", async (req, res) => {
    try {
        const vacData = await getAll_FDA_Approved_Treatments();
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});


/////////////////////////////////////////////////
///////////   category based    /////////////////
/////////////////////////////////////////////////

Router.get("/get-vaccines/:category", async (req, res) => {
    try {
        const vacData = await getVaccineCategoryBased(req.params.category);
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/get-treatments/:category", async (req, res) => {
    try {
        const vacData = await getTreatmentCategoryBased(req.params.category);
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});

export default Router;

/////////////////////////////////////////////////
///////////   Each One    ///////////////////////
/////////////////////////////////////////////////

Router.get("/get-vaccines/:category/:name", async (req, res) => {
    try {
        const vacData = await getEachOne(req.params.category, req.params.name);
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});

Router.get("/get-everything", async (req, res) => {
    try {
        const vacData = await getEverything();
        res.status(200).json(vacData);
    } catch (error) {
        console.log(error);
    }
});