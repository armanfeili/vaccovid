import Fs from "fs";
import Path from "path";
import Axios from "axios";
import { getConnection, MoreThan } from "typeorm";
import { CovidData } from "../db/models/CovidData";
import { CovidDataDate } from "../db/models/CovidDataDate";
import { Console } from "console";

async function _connect() {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    const manager = queryRunner.manager;

    return { connection, manager, queryRunner };
}

async function downloadOvid() {
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
}

export const updateOwid = async () => {
    const connection = getConnection();
    // const queryRunner = connection.createQueryRunner();

    const CovidDataRepository = connection.getRepository(CovidData);
    const CovidDataDateRepository = connection.getRepository(CovidDataDate);
    await downloadOvid();
    const path = Path.resolve(__dirname, "owid-covid-data.json");
    const covData = await JSON.parse(Fs.readFileSync(path).toString());
    try {
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
                newData.population_density = x.population_density;
                newData.median_age = x.median_age;
                newData.aged_65_older = x.aged_65_older;
                newData.aged_70_older = x.aged_70_older;
                newData.gdp_per_capita = x.gdp_per_capita;
                newData.cardiovasc_death_rate = x.cardiovasc_death_rate;
                newData.diabetes_prevalence = x.diabetes_prevalence;
                newData.female_smokers = x.female_smokers;
                newData.male_smokers = x.male_smokers;
                newData.hospital_beds_per_thousand = x.hospital_beds_per_thousand;
                newData.life_expectancy = x.life_expectancy;
                try {
                    newDataid = await CovidDataRepository.save(newData);
                } catch (error) {
                    console.log(error);
                }

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
                    newDataDate.new_cases_smoothed = ex.new_cases_smoothed;
                    newDataDate.total_deaths = ex.total_deaths;
                    newDataDate.new_deaths = ex.new_deaths;
                    newDataDate.new_deaths_smoothed = ex.new_deaths_smoothed;
                    newDataDate.total_cases_per_million = ex.total_cases_per_million;
                    newDataDate.new_cases_per_million = ex.new_cases_per_million;
                    newDataDate.new_cases_smoothed_per_million = ex.new_cases_smoothed_per_million;
                    newDataDate.total_deaths_per_million = ex.total_deaths_per_million;
                    newDataDate.new_deaths_per_million = ex.new_deaths_per_million;
                    newDataDate.new_deaths_smoothed_per_million = ex.new_deaths_smoothed_per_million;
                    newDataDate.new_tests = ex.new_tests;
                    newDataDate.total_tests = ex.total_tests;
                    newDataDate.total_tests_per_thousand = ex.total_tests_per_thousand;
                    newDataDate.new_tests_smoothed = ex.new_tests_smoothed;
                    newDataDate.new_tests_smoothed_per_thousand = ex.new_tests_smoothed_per_thousand;
                    newDataDate.tests_per_case = ex.tests_per_case;
                    newDataDate.positive_rate = ex.positive_rate;
                    newDataDate.stringency_index = ex.stringency_index;
                    newDataDate.tests_units = ex.tests_units;
                    try {
                        await CovidDataDateRepository.save(newDataDate);
                    } catch (error) {
                        console.log("++++++", error);
                    }

                    // console.log('        ' + nnn);
                }
            });
        });
    } catch (error) {
        return false;
    } finally {
        return true;
    }
};

export async function getOvidISOBased(iso: String) {
    let today = new Date();
    let oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    let twoMonthAgo = new Date(today.getTime() - 2 * 30 * 24 * 60 * 60 * 1000);
    let sixMonthAgo = new Date(today.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);

    const connect = await _connect();
    const CovidDataRepository = connect.connection.getRepository(CovidData);
    const CovidDataDateRepository = connect.connection.getRepository(CovidDataDate);

    const symbol = iso.toUpperCase();
    const data = await CovidDataRepository.findOne({ where: { symbol: symbol } });

    if (!data) return ({ error: "Not Exists" });
    const dateData = await CovidDataDateRepository.find({
        where: { symbol: data, date: MoreThan(sixMonthAgo) },
        order: { date: "DESC" },
    });
    return dateData;
}
