import Fs from "fs";
import Path from "path";
import Axios from "axios";
import { getConnection, MoreThan } from "typeorm";
import { CovidData } from "../db/models/CovidData";
import { CovidDataDate } from "../db/models/CovidDataDate";
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

async function downloadOvid() {
    try {
        const url = "https://covid.ourworldindata.org/data/owid-covid-data.json";
        const path = Path.resolve(__dirname, "owid-covid-data.json");
        console.log(path);
        // axios image download with response type "stream"
        const response = await Axios({
            method: "GET",
            url: url,
            responseType: "stream",
        });

        // pipe the result stream into a file on disc
        response.data.pipe(Fs.createWriteStream(path));

        // return a promise and resolve when download finishes
        return new Promise((resolve, reject) => {
            response.data.on("end", () => {
                resolve();
                console.log("end");
            });

            response.data.on("error", (err: any) => {
                reject();
                console.log("error", err);
            });
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateDailyOwid = async () => {
    // setTimeout(async () => {
    await updateOwid();
    // }, 2 * 60 * 1000); // after 1 minutes

    setInterval(
        updateOwid,
        // Min * Sec * Ms
        24 * 60 * 60 * 1000
    );
};

export const updateOwid = async () => {
    const connect: any = await _connect();
    const CovidDataRepository = connect.connection.getRepository(CovidData);
    const CovidDataDateRepository = connect.connection.getRepository(CovidDataDate);

    try {
        await downloadOvid();
        const path = Path.resolve(__dirname, "owid-covid-data.json");
        const covData = await JSON.parse(Fs.readFileSync(path).toString());
        await connect.queryRunner.startTransaction();

        Object.keys(covData).forEach(async (e: any, nn: number) => {
            const x = covData[e];
            const existData = await CovidDataRepository.findOne({
                where: { symbol: e },
            });
            let newData: any;
            let newDataid: any;
            if (!existData) {
                newData = new CovidData();
                newData.symbol = e;
                newData.Country = x.location;
                newData.Continent = x.continent;
                newData.population = x.population;
                newDataid = await CovidDataRepository.save(newData);
                // console.log(nn);
            } else {
                newData = existData;
                newDataid = existData;
            }
            // console.log(x.data[1].date);
            await x.data.forEach(async (ex: any, nnn: number) => {
                const existdate = await CovidDataDateRepository.findOne({
                    where: { symbol: newDataid.id, date: ex.date },
                });
                if (!existdate) {
                    const newDataDate = new CovidDataDate();
                    newDataDate.symbol = newData;
                    newDataDate.date = ex.date;
                    newDataDate.total_cases = ex.total_cases;
                    newDataDate.new_cases = ex.new_cases;
                    newDataDate.total_deaths = ex.total_deaths;
                    newDataDate.new_deaths = ex.new_deaths;
                    newDataDate.new_tests = ex.new_tests;
                    newDataDate.total_tests = ex.total_tests;
                    try {
                        await CovidDataDateRepository.save(newDataDate);

                    } catch (error) {
                        console.log("++++++", error);
                    }
                }
            });
        });
    } catch (error) {
        return false;
    } finally {
        await connect.queryRunner.release();
    }
};

export async function getOvidISOBased(iso: String) {
    let today = new Date();
    let oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    let twoMonthAgo = new Date(today.getTime() - 2 * 30 * 24 * 60 * 60 * 1000);
    let sixMonthAgo = new Date(today.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);

    const connect: any = await _connect();
    const CovidDataRepository = connect.connection.getRepository(CovidData);
    const CovidDataDateRepository = connect.connection.getRepository(CovidDataDate);

    try {
        const symbol = iso.toUpperCase();
        const data = await CovidDataRepository.findOne({ where: { symbol: symbol } });

        if (!data) return { error: "Not Exists" };
        const dateData = await CovidDataDateRepository.find({
            where: { symbol: data, date: MoreThan(sixMonthAgo) },
            order: { date: "DESC" },
        });
        return dateData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}
