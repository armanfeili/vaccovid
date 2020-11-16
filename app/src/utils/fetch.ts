import { getConnection, getManager, Not, In } from "typeorm";
import { Statistics } from "../db/models/Statistics";
import { worldSymbols } from "./world";
import { Province } from "../db/models/Provinces";
import { CovidProvincesAPI } from "../db/models/CovidProvincesAPI";

// import covid from 'covid19-api';
const covid = require("covid19-api");

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

const StrToFloat = (str: string): number => {
    if (str == "") return 0;
    return parseFloat(str.replace(/,/g, ""));
};

function searchCountry2LetterCode(countryName: any, worldSymbols: any) {
    for (var i = 0; i < worldSymbols.length; i++) {
        if (
            worldSymbols[i].name === countryName &&
            (countryName !== "Channel Islands" || countryName !== "MS Zaandam" || countryName !== "Diamond Princess")
        ) {
            return worldSymbols[i].alpha2;
            // return [worldSymbols[i].alpha2, worldSymbols[i].alpha3, countryName];
        }
    }
}

function searchCountry3LetterCode(countryName: any, worldSymbols: any) {
    for (var i = 0; i < worldSymbols.length; i++) {
        if (
            worldSymbols[i].name === countryName &&
            (countryName !== "Channel Islands" || countryName !== "MS Zaandam" || countryName !== "Diamond Princess")
        ) {
            return worldSymbols[i].alpha3;
            // return [worldSymbols[i].alpha2, worldSymbols[i].alpha3, countryName];
        }
    }
}

//Run For One at Start

const fetch_getdata = async () => {
    console.log("start fetching countries data from npm");

    const connect: any = await _connect();
    const StatRepository = connect.connection.getRepository(Statistics);
    try {
        //code run every 30 Min
        const data = await covid.getReports();

        let flag = 0;
        if ((await StatRepository.find()).length < 1) flag = 1;
        data[0][0].table[0].forEach(async (e: any, num: number) => {
            const temp = new Statistics();
            const alpha2: any = searchCountry2LetterCode(e["Country"], worldSymbols);
            const alpha3: any = searchCountry3LetterCode(e["Country"], worldSymbols);
            const Infection_Risk = parseFloat(((StrToFloat(e["TotalCases"]) / StrToFloat(e["Population"])) * 100).toFixed(2));
            const Case_Fatality_Rate = parseFloat(((StrToFloat(e["TotalDeaths"]) / StrToFloat(e["TotalCases"])) * 100).toFixed(2));
            const Test_Percentage = parseFloat(((StrToFloat(e["TotalTests"]) / StrToFloat(e["Population"])) * 100).toFixed(2));
            const Recovery_Proporation = parseFloat(((StrToFloat(e["TotalRecovered"]) / StrToFloat(e["TotalCases"])) * 100).toFixed(2));
            // console.log(alpha);
            // console.log(alpha[0]);

            temp.rank = StrToFloat(e["#"]);
            temp.Country = e["Country"];
            temp.Continent = e["Continent"];
            temp.TwoLetterSymbol = alpha2
            temp.ThreeLetterSymbol = alpha3

            temp.Infection_Risk = Infection_Risk;
            temp.Case_Fatality_Rate = Case_Fatality_Rate;
            temp.Recovery_Proporation = Recovery_Proporation;
            temp.Test_Percentage = Test_Percentage;

            temp.ActiveCases = StrToFloat(e["ActiveCases"]);
            temp.TotalCases = StrToFloat(e["TotalCases"]);
            temp.NewCases = StrToFloat(e["NewCases"]);
            temp.TotalDeaths = StrToFloat(e["TotalDeaths"]);
            temp.NewDeaths = StrToFloat(e["NewDeaths"]);
            temp.TotalRecovered = StrToFloat(e["TotalRecovered"]);
            temp.NewRecovered = StrToFloat(e["NewRecovered"]);
            temp.TotalTests = StrToFloat(e["TotalTests"]);
            temp.Population = StrToFloat(e["Population"]);
            temp.Deaths_1M_pop = StrToFloat(e["Deaths_1M_pop"]);
            temp.Serious_Critical = StrToFloat(e["Serious_Critical"]);
            temp.Tests_1M_Pop = StrToFloat(e["Tests_1M_Pop"]);
            temp.TotCases_1M_Pop = StrToFloat(e["TotCases_1M_Pop"]);
            temp.one_Caseevery_X_ppl = StrToFloat(e["1 Caseevery X ppl"]);
            temp.one_Deathevery_X_ppl = StrToFloat(e["1 Deathevery X ppl"]);
            temp.one_Testevery_X_ppl = StrToFloat(e["1 Testevery X ppl"]);
            try {
                if (flag == 0) {
                    await StatRepository.update({ Country: e["Country"] }, temp);
                } else if (flag == 1) {
                    await StatRepository.save(temp);
                }
            } catch (error) {
                console.log(error);
            }
            // console.log(num / data[0][0].table[0].length);
        });
    } catch (error) {
        console.log(error);
    } finally {
        // you need to release query runner which is manually created:
        await connect.queryRunner.release();
    }

};

//This function fetch data every 30 min from APIs
export const Fetcher = async () => {
    // setTimeout(async () => {
    await fetch_getdata();
    // }, 60 * 1000); // after 1 minutes
    // setInterval(
    //     fetch_getdata,
    //     // Min * Sec * Ms
    //     30 * 60 * 1000
    // );
};

export async function fetchCasesInAllUSStates() {
    // getConnection to DB
    const connect: any = await _connect();

    // entities to work with:
    // const usRepository = connect.connection.getRepository(USStatistics);
    const provinceRepository = connect.connection.getRepository(Province);
    const provinceReportRepository = connect.connection.getRepository(CovidProvincesAPI);

    await connect.queryRunner.startTransaction();
    // let worldData: Object | undefined = {}
    try {
        // const data = await covid.getCasesInAllUSStates();
        const data = await covid.getUnitedStateCasesByStates();
        // console.log(data[0][0].table[0]);
        if (data === undefined) {
            console.log("couldn't fetch data");
            await connect.queryRunner.rollbackTransaction();
            // return "No Data";
        }

        await data[0][0].table.forEach(async (element: any, num: any) => {
            const existProvince = await provinceRepository.findOne({
                iso: "USA",
            });

            if (!existProvince) {
                console.log("no such province");
                await connect.queryRunner.rollbackTransaction();
                // return "no such province";
            }

            const provinceReportExist = await provinceReportRepository.findOne({
                date: new Date(element.dateModified),
                province: existProvince,
                // name: existProvince
            });

            const Case_Fatality_Rate = parseFloat(
                ((StrToFloat(element.death) / StrToFloat(element.positive)) * 100).toFixed(2)
            );
            const activeCases = element.positive - (element.death + element.recovered);
            const Recovery_Proporation = parseFloat(((element.recovered / StrToFloat(element.death)) * 100).toFixed(2));

            if (!provinceReportExist) {
                // const newData: any = new CovidProvincesAPI();
                // newData.confirmed = element.total;
                // newData.deaths = element.death;
                // // newData.recovered = element.recovered;
                // newData.recovered = element.recovered;
                // newData.Case_Fatality_Rate = Case_Fatality_Rate;
                // newData.Recovery_Proporation = Recovery_Proporation;
                // newData.confirmed_diff = element.confirmed_diff;
                // newData.deaths_diff = element.deaths_diff;
                // newData.recovered_diff = element.recovered_diff;
                // newData.date = new Date(element.date);
                // newData.active = activeCases;
                // newData.active_diff = element.active_diff;
                // newData.fatality_rate = element.fatality_rate;
                // newData.province = existProvince;
                // // newData.province = element.province;
                // await provinceReportRepository.save(newData);
                const newData: any = new CovidProvincesAPI();
                newData.confirmed = element.positive;
                newData.deaths = element.death;
                // newData.recovered = element.recovered;
                newData.recovered = element.recovered;
                newData.Case_Fatality_Rate = Case_Fatality_Rate;
                newData.Recovery_Proporation = Recovery_Proporation;
                newData.confirmed_diff = element.positiveIncrease;
                newData.deaths_diff = element.deathIncrease;
                newData.recovered_diff = 0;
                newData.date = new Date(element.dateModified);
                // newData.date = new Date(element.dateModified);
                newData.active = activeCases;
                newData.active_diff = 0;
                newData.fatality_rate = 0;
                newData.province = existProvince;
                // newData.province = element.province;
                await provinceReportRepository.save(newData);
                await connect.queryRunner.commitTransaction();
            } else {
                console.log("report already exists");
                await connect.queryRunner.rollbackTransaction();
                // return "report already exists";
            }
        });
    } catch (error) {
        console.log(error);
    } finally {
        // you need to release query runner which is manually created:
        await connect.queryRunner.release();
    }
}

export async function getWorldData() {
    // getConnection to DB
    const connect: any = await _connect();

    // entities to work with:
    const StatRepository = connect.connection.getRepository(Statistics);

    try {
        let worldData: Object | undefined = {}
        worldData = await StatRepository.find({ Country: 'World' })
        return worldData;
    } catch (error) {
        console.log(error);
    } finally {
        // you need to release query runner which is manually created:
        await connect.queryRunner.release();
    }
}

export async function getAllCountriesNameOrdered() {
    // getConnection to DB
    const connect: any = await _connect();

    // entities to work with:
    const allCountriesData = connect.connection.getRepository(Statistics);

    try {
        let countriesData: any = [];
        let names: any = [];
        countriesData = await allCountriesData.find({
            where: [
                {
                    Country: Not(In(["World", "Total:"])),
                },
            ],
            order: {
                Country: "ASC",
            },
        });

        countriesData.forEach((e: any) => {
            let obj = {
                Country: "",
                ThreeLetterSymbol: ""
            };
            obj.Country = e.Country;
            obj.ThreeLetterSymbol = e.ThreeLetterSymbol;
            names.push(obj);
        })
        return names;
        // return countriesData;

    } catch (error) {
        console.log(error);
    } finally {
        // you need to release query runner which is manually created:
        await connect.queryRunner.release();
    }
}

export async function getAllCountriesData() {
    // getConnection to DB
    const connect: any = await _connect();

    // entities to work with:
    const StatRepository = connect.connection.getRepository(Statistics);

    try {
        let countriesData: any = [];
        let more_specific: any = [];
        countriesData = await StatRepository.find({
            where: [
                {
                    Country: Not(In(["World", "Total:"])),
                },
            ],
            order: {
                TotalCases: "DESC",
            },
        });

        countriesData.forEach((e: any) => {
            let obj = {
                Country: "",
                TwoLetterSymbol: "",
                ThreeLetterSymbol: "",
                Infection_Risk: "",
                Case_Fatality_Rate: "",
                Test_Percentage: "",
                Recovery_Proporation: "",
                TotalCases: "",
                NewCases: "",
                TotalDeaths: "",
                NewDeaths: "",
                TotalRecovered: "",
                NewRecovered: "",
                ActiveCases: "",
                TotalTests: "",
                Population: "",
                Serious_Critical: ""
            };
            obj.Country = e.Country;
            obj.TwoLetterSymbol = e.TwoLetterSymbol;
            obj.ThreeLetterSymbol = e.ThreeLetterSymbol;
            obj.Infection_Risk = e.Infection_Risk;
            obj.Case_Fatality_Rate = e.Case_Fatality_Rate;
            obj.Test_Percentage = e.Test_Percentage;
            obj.Recovery_Proporation = e.Recovery_Proporation;
            obj.TotalCases = e.TotalCases;
            obj.NewCases = e.NewCases;
            obj.TotalDeaths = e.TotalDeaths;
            obj.NewDeaths = e.NewDeaths;
            obj.TotalRecovered = e.TotalRecovered;
            obj.NewRecovered = e.NewRecovered;
            obj.ActiveCases = e.ActiveCases;
            obj.TotalTests = e.TotalTests;
            obj.Population = e.Population;
            obj.Serious_Critical = e.Serious_Critical;

            more_specific.push(obj);
        })
        return more_specific;
        // return countriesData;

    } catch (error) {
        console.log(error);
    } finally {
        // you need to release query runner which is manually created:
        await connect.queryRunner.release();
    }
}

export async function getNPMProvincesBasedOnISO(countryName: String, iso: String) {
    const connect: any = await _connect();
    const StatRepository = connect.connection.getRepository(Statistics);

    try {
        let country: any = {}
        country = await StatRepository.find({
            where: [
                {
                    Country: countryName,
                    ThreeLetterSymbol: iso,
                },
            ],
        });
        return country;
    } catch (error) {
        console.log(error);
    } finally {
        // you need to release query runner which is manually created:
        await connect.queryRunner.release();
    }
}

export async function getAsiaCountriesData() {
    // getConnection to DB
    const connect: any = await _connect();

    // entities to work with:
    const StatRepository = connect.connection.getRepository(Statistics);

    try {
        let AsiaData: any = {}
        AsiaData = await StatRepository.find({
            where: [
                {
                    Continent: "Asia",
                },
            ],
            order: {
                TotalCases: "DESC",
            },
        });

        // console.log(AsiaData.length);

        return AsiaData;
    } catch (error) {
        console.log(error);
    } finally {
        // you need to release query runner which is manually created:
        await connect.queryRunner.release();
    }
}

export async function getAfricaCountriesData() {
    // getConnection to DB
    const connect: any = await _connect();

    // entities to work with:
    const StatRepository = connect.connection.getRepository(Statistics);

    try {
        let AfricaData: any = {}
        AfricaData = await StatRepository.find({
            where: [
                {
                    Continent: "Africa",
                },
            ],
            order: {
                TotalCases: "DESC",
            },
        });

        // console.log(AfricaData.length);

        return AfricaData;
    } catch (error) {
        console.log(error);
    } finally {
        // you need to release query runner which is manually created:
        await connect.queryRunner.release();
    }
}

export async function getEuropeCountriesData() {
    // getConnection to DB
    const connect: any = await _connect();

    // entities to work with:
    const StatRepository = connect.connection.getRepository(Statistics);

    try {
        let EuropeData: any = {}
        EuropeData = await StatRepository.find({
            where: [
                {
                    Continent: "Europe",
                },
            ],
            order: {
                TotalCases: "DESC",
            },
        });

        // console.log(EuropeData.length);

        return EuropeData;
    } catch (error) {
        console.log(error);
    } finally {
        // you need to release query runner which is manually created:
        await connect.queryRunner.release();
    }
}

export async function getNorthAmericaCountriesData() {
    // getConnection to DB
    const connect: any = await _connect();

    // entities to work with:
    const StatRepository = connect.connection.getRepository(Statistics);

    try {
        let NorthAmericaData: any = {}
        NorthAmericaData = await StatRepository.find({
            where: [
                {
                    Continent: "North America",
                },
            ],
            order: {
                TotalCases: "DESC",
            },
        });

        // console.log(NorthAmericaData.length);

        return NorthAmericaData;
    } catch (error) {
        console.log(error);
    } finally {
        // you need to release query runner which is manually created:
        await connect.queryRunner.release();
    }
}

export async function getSouthAmericaCountriesData() {
    // getConnection to DB
    const connect: any = await _connect();

    // entities to work with:
    const StatRepository = connect.connection.getRepository(Statistics);

    try {
        let SouthAmericaData: any = {}
        SouthAmericaData = await StatRepository.find({
            where: [
                {
                    Continent: "South America",
                },
            ],
            order: {
                TotalCases: "DESC",
            },
        });

        // console.log(SouthAmericaData.length);

        return SouthAmericaData;
    } catch (error) {
        console.log(error);
    } finally {
        // you need to release query runner which is manually created:
        await connect.queryRunner.release();
    }
}

export async function getAustraliaOceaniaCountriesData() {
    // getConnection to DB
    const connect: any = await _connect();

    // entities to work with:
    const StatRepository = connect.connection.getRepository(Statistics);

    try {
        let AustraliaOceaniaData: any = {}
        AustraliaOceaniaData = await StatRepository.find({
            where: [
                {
                    Continent: "Australia/Oceania",
                },
            ],
            order: {
                TotalCases: "DESC",
            },
        });

        // console.log(AustraliaOceaniaData.length);

        return AustraliaOceaniaData;
    } catch (error) {
        console.log(error);
    } finally {
        // you need to release query runner which is manually created:
        await connect.queryRunner.release();
    }
}
