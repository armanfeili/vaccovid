import Express from "express";
import { getManager } from "typeorm";
import { OwidData } from "../db/models/OwidData";
import { getOvidISOBased } from "../utils/ovidData";
// DEPRECATED: updateOwid, downloadAndConvertOwidData - data no longer updated

const Router = Express.Router();

Router.get("/", async (req, res) => {
    const CovidDataRepository = getManager().getRepository(OwidData);
    const data = await CovidDataRepository.find();
    return res.send(data);
});

// DEPRECATED ENDPOINTS - Data no longer updated (REMOVED)
// - PUT /update-ovid (REMOVED)
// - POST /download-and-convert-owid-data (REMOVED)
// This website now serves archived COVID data only.

// Uncomment if you need deprecation warnings instead:
/*
const deprecatedEndpoint = (req, res) => {
  res.status(410).json({ 
    error: "This endpoint is deprecated. Data is no longer updated.",
    message: "This website now displays archived COVID data only."
  });
};

Router.put("/update-ovid", deprecatedEndpoint);
Router.post("/download-and-convert-owid-data", deprecatedEndpoint);
*/

// KEPT: GET endpoints for reading archived COVID data

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
