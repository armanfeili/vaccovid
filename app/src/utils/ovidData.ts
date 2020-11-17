import fs from "fs";
import Path from "path";
import Axios from "axios";
import csv from 'csvtojson';

import { getConnection, MoreThan } from "typeorm";
import { OwidData } from "../db/models/OwidData";
// import { Console } from "console";

async function _connect() {
    try {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();

        return { connection, queryRunner };
    } catch (error) {
        console.log(error);
    }
}

async function _downloadOvid() {
    try {
        console.log("request to download owid csv file");

        // const url = "https://covid.ourworldindata.org/data/owid-covid-data.json";
        const url = "https://covid.ourworldindata.org/data/owid-covid-data.csv";
        const csvFilePath = Path.resolve(__dirname, "owid-covid-data.csv");

        // axios image download with response type "stream"
        const response = await Axios({
            method: "GET",
            url: url,
            responseType: "stream",
        });

        if (response) {
            console.log("request has been approved");
            // pipe the result stream into a file on disc
            // const saved = await response.data.pipe(fs.createWriteStream(csvFilePath));
            console.log("start downloading and saving owid csv file");
            response.data.pipe(fs.createWriteStream(csvFilePath));

            // return a promise and resolve when download finishes
            return new Promise((resolve, reject) => {
                response.data.on("end", () => {
                    resolve();
                    console.log("owid csv file is updated");
                    return true;
                });

                response.data.on("error", (err: any) => {
                    console.log(err);
                    console.log("couldn't write completely to the owid csv file");
                    reject();
                    return false;
                });
            });
        } else {
            console.log("couldn't download owid csv file");
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function _convertCsvToJsonOvid() {
    try {
        console.log("start converting owid csv file to json");

        const csvFilePath = Path.resolve(__dirname, "owid-covid-data.csv");
        const jsonFilePath = Path.resolve(__dirname, "owid-covid-data.json");

        csv()
            .fromFile(csvFilePath)
            .then(async (jsonObj) => {

                // console.log(jsonObj);
                let today = new Date();
                // let sixMonthAgo = new Date(today.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
                // let fourMonthAgo = new Date(today.getTime() - 4 * 30 * 24 * 60 * 60 * 1000);
                let oneMonthAgo = new Date(today.getTime() - 1 * 30 * 24 * 60 * 60 * 1000);
                let properedArary: any = [];
                jsonObj.forEach(e => {
                    // console.log(new Date(e.date).getTime());

                    if (new Date(e.date).getTime() > oneMonthAgo.getTime()) {
                        properedArary.push(e);
                    }
                });

                // let data = JSON.stringify(jsonObj[0]);
                // console.log(properedArary);
                let data = JSON.stringify(properedArary);

                // let data = JSON.stringify(jsonObj);
                // let data3 = [jsonObj[0], jsonObj[1]];
                // let jsonData3 = JSON.stringify(data3);
                // fs.writeFileSync(jsonFilePath, data);
                // console.log('the owid json file has been saved!');

                // const json = await jsonObj[0].pipe(fs.createWriteStream(jsonFilePath));
                // fs.writeFile(jsonFilePath, jsonObj.toString(), (err) => {

                fs.writeFile(jsonFilePath, data, (err) => {
                    // fs.writeFile(jsonFilePath, jsonData3, (err) => {
                    if (err) {
                        console.log('the owid json file has not been saved!');
                        return false;
                    };
                    console.log('the owid json file has been saved!');
                    return true
                });
                data = "";
            });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const downloadAndConvertOwidData = async () => {
    await _downloadOvid();
    await _convertCsvToJsonOvid();
};

export const updateOwid = async () => {

    const connect: any = await _connect();
    const OwidRepository = connect.connection.getRepository(OwidData);

    try {
        console.log("updating database with ovid data");
        const jsonFilePath = Path.resolve(__dirname, "owid-covid-data.json");

        let covData: any = {};

        fs.readFile(jsonFilePath, 'utf-8', async (err, data) => {
            if (err) {
                console.log("couldn't read the owid json file");
                return false;
            };

            console.log('the owid json file has been read!');
            // parse json data
            covData = JSON.parse(data);

            if (!(covData.length > 0)) {
                console.log("couldn't parse owid json file");
            } else {
                console.log("ovid json parsed");

                let today = new Date();
                let sixMonthAgo = new Date(today.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);

                await covData.forEach(async (e: any, i: number) => {
                    const existData = await OwidRepository.findOne({
                        // where: { date: e.date },
                        where: { date: new Date(e.date) },
                    });

                    if (!existData) {
                        // check if the data isn't older than 6 months ago.
                        if (new Date(e.date) > sixMonthAgo) {
                            let newData: any;
                            newData = new OwidData();
                            newData.symbol = e.iso_code;
                            newData.Country = e.location;
                            newData.Continent = e.continent;
                            newData.date = new Date(e.date);
                            newData.total_cases = e.total_cases === null || e.total_cases === "" ? 0 : Math.abs(parseInt(e.total_cases));
                            newData.new_cases = e.new_cases === null || e.new_cases === "" ? 0 : Math.abs(parseInt(e.new_cases));
                            newData.total_deaths = e.total_deaths === null || e.total_deaths === "" ? 0 : Math.abs(parseInt(e.total_deaths));
                            newData.new_deaths = e.new_deaths === null || e.new_deaths === "" ? 0 : Math.abs(parseInt(e.new_deaths));
                            newData.total_tests = e.total_tests === null || e.total_tests === "" ? 0 : Math.abs(parseInt(e.total_tests));
                            newData.new_tests = e.new_tests === null || e.new_tests === "" ? 0 : Math.abs(parseInt(e.new_tests));

                            try {
                                await OwidRepository.save(newData);
                            } catch (error) {
                                console.log(`couldn't update item: ${i}`);
                                console.log(error);
                            }
                        }
                    } else {
                        // nothing to do. go to next item
                    }
                });
                console.log("owid database is getting updated in a second.");
                return covData;
            }
        })
    } catch (error) {
        console.log(error);
        console.log("couldn't update ovid database");
        return false;
    } finally {
        await connect.queryRunner.release();
        // return true;
    }
};

export async function getOvidISOBased(iso: String) {
    let today = new Date();
    // let oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    // let twoMonthAgo = new Date(today.getTime() - 2 * 30 * 24 * 60 * 60 * 1000);
    let sixMonthAgo = new Date(today.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);

    const connect: any = await _connect();
    const OwidRepository = connect.connection.getRepository(OwidData);

    try {
        const symbol = iso.toUpperCase();
        const data = await OwidRepository.find({
            where: {
                symbol: symbol,
                date: MoreThan(sixMonthAgo)
            },
            order: { date: "DESC" }
        });

        return data;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}
