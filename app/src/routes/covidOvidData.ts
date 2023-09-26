import Express from "express";
import { getManager } from "typeorm";
import { OwidData } from "../db/models/OwidData";
import { updateOwid, downloadAndConvertOwidData } from "../utils/ovidData";
import { getOvidISOBased } from "../utils/ovidData";

const Router = Express.Router();

Router.get("/", async (req, res) => {
    const CovidDataRepository = getManager().getRepository(OwidData);
    const data = await CovidDataRepository.find();
    return res.send(data);
});

Router.put("/update-ovid", async (req, res) => {
    try {
        const covData = await updateOwid();
        res.status(200).json(covData);
    } catch (error) {
        console.log(error);
    }
});

Router.post("/download-and-convert-owid-data", async (req, res) => {
    try {
        res.status(200).json(await downloadAndConvertOwidData());
    } catch (error) {
        console.log(error);
    }
});


Router.put("/sixmonth/:iso", async (req, res) => {
    try {
        const symbol = req.params.symbol.toUpperCase();
        await getOvidISOBased(symbol);
        return res.send({ message: "all" });
    } catch (error) {
        console.log(error);
    }
});


Router.get("/sixmonth/:iso", async (req, res) => {
    try {
        return res.send(await getOvidISOBased(req.params.iso.toUpperCase()));
    } catch (error) {
        console.log(error);
    }
});



// Router.get("/:symbol/data/:date", async (req, res) => {
    // const CovidDataRepository = getManager().getRepository(OwidData);
    // // const CovidDataDateRepository = getManager().getRepository(CovidDataDate);
    // const symbol = req.params.symbol.toUpperCase();
    // // console.log(symbol);
    // const data = await CovidDataRepository.findOne({ where: { symbol: symbol } });
    // if (!data) return res.send({ error: "Not Exists" });
    // const dateData = await CovidDataDateRepository.find({
    //     where: { symbol: data, date: req.params.date },
    //     order: { date: "ASC" },
    // });
    // if (dateData.length < 1) return res.send({ error: "No data for this date" });
    // const respons = Object.assign(data, { data: dateData });
    // return res.send(respons);
// });

export default Router;
