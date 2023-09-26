import { getConnection, getManager, Not, In } from "typeorm";
import { Statistics } from "../db/models/Statistics";
import { worldSymbols } from "./world";
import { Province } from "../db/models/Provinces";
import { CovidProvincesAPI } from "../db/models/CovidProvincesAPI";

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

const StrToFloat = (str: string | number): number => {
    if (str === "") return 0;
    return parseFloat(str.toString().replace(/,/g, ""));
};

const StrToInt = (str: string): number => {
    if (str == "") return 0;
    return parseInt(str.replace(/,/g, ""));
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
        }
    }
}

//Run For One at Start

export const fetch_npmData = async () => {
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
            const Infection_Risk = e["TotalCases"] === "" || e["TotalCases"] === "N/A" || e["Population"] === "" || e["Population"] === "N/A" ? 0 : parseFloat(((StrToFloat(e["TotalCases"]) / StrToFloat(e["Population"])) * 100).toFixed(2));
            const Case_Fatality_Rate = e["TotalDeaths"] === "" || e["TotalDeaths"] === "N/A" || e["TotalCases"] === "" || e["TotalCases"] === "N/A" ? 0 : parseFloat(((StrToFloat(e["TotalDeaths"]) / StrToFloat(e["TotalCases"])) * 100).toFixed(2));
            const Test_Percentage = e["TotalTests"] === "" || e["TotalTests"] === "N/A" || e["Population"] === "" || e["Population"] === "N/A" ? 0 : parseFloat(((StrToFloat(e["TotalTests"]) / StrToFloat(e["Population"])) * 100).toFixed(2));
            const Recovery_Proporation = e["TotalRecovered"] === "" || e["TotalRecovered"] === "N/A" || e["TotalCases"] === "" || e["TotalCases"] === "N/A" ? 0 : parseFloat(((StrToFloat(e["TotalRecovered"]) / StrToFloat(e["TotalCases"])) * 100).toFixed(2));

            temp.rank = StrToFloat(e["#"]);
            temp.Country = e["Country"];
            temp.Continent = e["Continent"];
            temp.TwoLetterSymbol = alpha2
            temp.ThreeLetterSymbol = alpha3

            temp.Infection_Risk = Infection_Risk;
            temp.Case_Fatality_Rate = Case_Fatality_Rate;
            temp.Recovery_Proporation = Recovery_Proporation;
            temp.Test_Percentage = Test_Percentage;

            temp.ActiveCases = e["ActiveCases"] === "" || e["ActiveCases"] === "N/A" ? 0 : StrToInt(e["ActiveCases"]);
            temp.TotalCases = e["TotalCases"] === "" || e["TotalCases"] === "N/A" ? 0 : StrToInt(e["TotalCases"]);
            if(e["NewCases"] !== "" || e["NewCases"] !== "N/A" || e["NewCases"] !== 0) temp.NewCases = StrToInt(e["NewCases"])
            temp.TotalDeaths = e["TotalDeaths"] === "" || e["TotalDeaths"] === "N/A" ? 0 : StrToInt(e["TotalDeaths"]);
            temp.NewDeaths = e["NewDeaths"] === "" || e["NewDeaths"] === "N/A" ? 0 : StrToInt(e["NewDeaths"]);
            temp.TotalRecovered = e["TotalRecovered"] === "" || e["TotalRecovered"] === "N/A" ? (e["TotalDeaths"] === "" || e["TotalDeaths"] === "N/A" || e["TotalCases"] === "" || e["TotalCases"] === "N/A" ? 0 : StrToInt(e["TotalCases"]) - StrToInt(e["TotalDeaths"])) : StrToInt(e["TotalRecovered"]);
            temp.NewRecovered = e["NewRecovered"] === "" || e["NewRecovered"] === "N/A" ? 0 : StrToInt(e["NewRecovered"]);
            temp.TotalTests = e["TotalTests"] === "" || e["TotalTests"] === "N/A" ? 0 : StrToInt(e["TotalTests"]);
            temp.Population = e["Population"] === "" || e["Population"] === "N/A" ? 0 : StrToInt(e["Population"]);
            temp.Serious_Critical = e["Serious_Critical"] === "" || e["Serious_Critical"] === "N/A" ? 0 : StrToInt(e["Serious_Critical"]);
            temp.Deaths_1M_pop = e["Deaths_1M_pop"] === "" || e["Deaths_1M_pop"] === "N/A" ? 0 : StrToFloat(e["Deaths_1M_pop"]);
            temp.Tests_1M_Pop = e["Tests_1M_Pop"] === "" || e["Tests_1M_Pop"] === "N/A" ? 0 : StrToFloat(e["Tests_1M_Pop"]);
            temp.TotCases_1M_Pop = e["TotCases_1M_Pop"] === "" || e["TotCases_1M_Pop"] === "N/A" ? 0 : StrToFloat(e["TotCases_1M_Pop"]);
            temp.one_Caseevery_X_ppl = e["one_Caseevery_X_ppl"] === "" || e["one_Caseevery_X_ppl"] === "N/A" ? 0 : StrToFloat(e["1 Caseevery X ppl"]);
            temp.one_Deathevery_X_ppl = e["one_Deathevery_X_ppl"] === "" || e["one_Deathevery_X_ppl"] === "N/A" ? 0 : StrToFloat(e["1 Deathevery X ppl"]);
            temp.one_Testevery_X_ppl = e["one_Testevery_X_ppl"] === "" || e["one_Testevery_X_ppl"] === "N/A" ? 0 : StrToFloat(e["1 Testevery X ppl"]);
            try {
                if (flag == 0) {
                    await StatRepository.update({ Country: e["Country"] }, temp);
                } else if (flag == 1) {
                    await StatRepository.save(temp);
                }
            } catch (error) {
                console.log(error);
            }
        });
        console.log("all countries are updated from npm");
        return data;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }

};

export async function fetchCasesInAllUSStates() {
    const connect: any = await _connect();
    const provinceRepository = connect.connection.getRepository(Province);
    const provinceReportRepository = connect.connection.getRepository(CovidProvincesAPI);

    try {
        const data = await covid.getUnitedStateCasesByStates();
        if (data === undefined) {
            console.log("couldn't fetch data");
        }

        await data[0][0].table.forEach(async (element: any, num: any) => {
            const existProvince = await provinceRepository.findOne({
                iso: "USA",
            });

            if (!existProvince) {
                console.log("no such province");
            }

            const provinceReportExist = await provinceReportRepository.findOne({
                date: new Date(element.dateModified),
                province: existProvince,
            });

            const Case_Fatality_Rate = parseFloat(
                ((StrToFloat(element.death) / StrToFloat(element.positive)) * 100).toFixed(2)
            );
            const activeCases = element.positive - (element.death + element.recovered);
            const Recovery_Proporation = parseFloat(((element.recovered / StrToFloat(element.death)) * 100).toFixed(2));

            if (!provinceReportExist) {
                const newData: any = new CovidProvincesAPI();
                newData.confirmed = element.positive;
                newData.deaths = element.death;
                newData.recovered = element.recovered;
                newData.Case_Fatality_Rate = Case_Fatality_Rate;
                newData.Recovery_Proporation = Recovery_Proporation;
                newData.confirmed_diff = element.positiveIncrease;
                newData.deaths_diff = element.deathIncrease;
                newData.recovered_diff = 0;
                newData.date = new Date(element.dateModified);
                newData.active = activeCases;
                newData.active_diff = 0;
                newData.fatality_rate = 0;
                newData.province = existProvince;
                await provinceReportRepository.save(newData);
            } else {
                console.log("report already exists");
            }
        });
    } catch (error) {
        console.log(error);
    } finally {
        // you need to release query runner which is manually created:
        // await connect.queryRunner.release();
    }
}

export async function getWorldData() {
    const connect: any = await _connect();
    const StatRepository = connect.connection.getRepository(Statistics);

    try {
        let worldData: Object | undefined = {}
        worldData = await StatRepository.find({ Country: 'World' })
        return worldData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getAllCountriesNameOrdered() {
    const connect: any = await _connect();
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

    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getAllCountriesData() {
    const connect: any = await _connect();
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
            let obj: any = {};
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
            obj.TotalRecovered = parseInt(e.TotalRecovered);
            obj.NewRecovered = e.NewRecovered;
            obj.ActiveCases = e.ActiveCases;
            obj.TotalTests = parseInt(e.TotalTests);
            obj.Population = parseInt(e.Population);
            obj.Serious_Critical = e.Serious_Critical;

            more_specific.push(obj);
        })
        return more_specific;
    } catch (error) {
        console.log(error);
    } finally {
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
        await connect.queryRunner.release();
    }
}

export async function getAsiaCountriesData() {
    const connect: any = await _connect();
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

        return AsiaData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getAfricaCountriesData() {
    const connect: any = await _connect();
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

        return AfricaData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getEuropeCountriesData() {
    const connect: any = await _connect();
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

        return EuropeData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getNorthAmericaCountriesData() {
    const connect: any = await _connect();
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

        return NorthAmericaData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getSouthAmericaCountriesData() {
    const connect: any = await _connect();
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
        return SouthAmericaData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getAustraliaOceaniaCountriesData() {
    const connect: any = await _connect();
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

        return AustraliaOceaniaData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}
