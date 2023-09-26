import axios from "axios";
import { getConnection } from "typeorm";
import { Province } from "../db/models/Provinces";
import { CovidProvincesAPI } from "../db/models/CovidProvincesAPI";
import { state_symbols } from "./provinces-object";

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

function _searchCountryCode(countryName: any, worldSymbols: any) {
    for (var i = 0; i < worldSymbols.length; i++) {
        if (
            worldSymbols[i].name === countryName &&
            (countryName !== "Channel Islands" || countryName !== "MS Zaandam" || countryName !== "Diamond Princess")
        ) {
            return worldSymbols[i].alpha2;
        }
    }
}

function _searchProvinceCode(provinceName: any, stateSymbols: any) {
    for (var i = 0; i < stateSymbols.length; i++) {
        if (stateSymbols[i].name === provinceName) {
            return stateSymbols[i].alpha2;
        }
    }
}

async function _fetchData() {
    try {
        const data = (await axios.get(`http://covid-api.com/api/reports`));
        
        if (data === undefined) {
            console.error("couldn't fetch data from API");
            return "no data";
        } 
        return data.data.data; 
    } catch (error) {
        console.log(error);
    }
}

async function _fetchUSData() {
    try {
        const usData = (await axios.get(`https://api.covidtracking.com/v1/states/current.json`)).data;
        if (usData === undefined) {
            console.error("couldn't fetch data from API");
            return "no data";
        }
        return usData;
    } catch (error) {
        console.log(error);
    }
}

export async function updateProvinces() {
    console.log("start updating provinces");
    const connect: any = await _connect();
    const provinceRepository = connect.connection.getRepository(Province);
    try {

        let existProvince = await provinceRepository.find({
            where: { iso: "USA" }
        });
        if (existProvince.length > 40) {
            console.log("provinces already existed");
            return "provinces already existed";
        } else {
            const data = await _fetchData();
            if (!data) {
                console.log("couldn't fetch provinces data");
                return "no data";
            }

            await data.forEach(async (element: any, num: any) => {
                const alpha: any = _searchProvinceCode(element.region.province, state_symbols);

                let newProvince = new Province();
                newProvince.iso = element.region.iso;
                newProvince.name = element.region.name;
                newProvince.province = element.region.province;
                newProvince.TwoLetterSymbol = alpha;
                newProvince.lat = element.region.lat;
                newProvince.long = element.region.long;
                let dataId: any;
                let exist = await provinceRepository.findOne({
                    iso: element.region.iso,
                    name: element.region.name,
                    province: element.region.province,
                });
                if (exist) {
                    newProvince.province_id = exist.province_id;
                    dataId = await provinceRepository.preload(newProvince);
                    console.log(`province ${newProvince.name} preload`);
                } else {
                    dataId = await provinceRepository.save(newProvince);
                }
            });
        }
    } catch (error) {
        console.log(error);
        return "Not Done";
    } finally {
        return "done";
    }
}

export const addDailyReports = async () => {
    try {
        await addReports();
        await addUSStates();
    } catch (error) {
        console.log(error);
    }
};

export async function addReports() {
    console.log("start adding province reports");
    const connect: any = await _connect();
    const provinceRepository = connect.connection.getRepository(Province);
    const provinceReportRepository = connect.connection.getRepository(CovidProvincesAPI);

    try {
        const data = await _fetchData();
        if (data === undefined || data === "no data") {
            console.log("couldn't fetch data");
            return "No Data";
        }

        await data.forEach(async (element: any, num: any) => {
            const existProvince = await provinceRepository.findOne({
                iso: element.region.iso,
                name: element.region.name,
                province: element.region.province,
            });

            if (!existProvince && element.region.iso !== "CAN") {
                console.log(`no such province: iso:${element.region.iso}, name:${element.region.name}`);
                return `no such province`;
            }

            if (element.region.iso === "USA") {
                return "We get USA data from another API";
            }

            const provinceReportExist = await provinceReportRepository.findOne({
                date: new Date(element.date),
                province: existProvince,
            });

            const Case_Fatality_Rate = parseFloat(
                ((StrToFloat(element.deaths) / StrToFloat(element.confirmed)) * 100).toFixed(2)
            );
            const totalRecovered = element.confirmed - (element.deaths + element.active);
            const Recovery_Proporation = parseFloat(((totalRecovered / StrToFloat(element.confirmed)) * 100).toFixed(2));

            if (!provinceReportExist) {
                const newData: any = new CovidProvincesAPI();
                newData.confirmed = element.confirmed;
                newData.deaths = element.deaths;
                newData.recovered = totalRecovered;
                newData.Case_Fatality_Rate = Case_Fatality_Rate;
                newData.Recovery_Proporation = Recovery_Proporation; 
                newData.confirmed_diff = element.confirmed_diff;
                newData.deaths_diff = element.deaths_diff;
                newData.recovered_diff = element.recovered_diff;
                newData.date = new Date(element.date);
                newData.active = element.active;
                newData.active_diff = element.active_diff;
                newData.fatality_rate = element.fatality_rate;
                newData.province = existProvince;
                await provinceReportRepository.save(newData);
            } else {
                return "report already exists";
            }
        });
        console.log("all reports are updated");
    } catch (error) {
        console.log(error);
        return "Not Done";
    } finally {
        await connect.queryRunner.release();
        return "done";
    }
}

export async function addUSStates() {
    console.log("start adding US states");
    // getConnection to DB
    const connect: any = await _connect();

    // entities to work with:
    const provinceRepository = connect.connection.getRepository(Province);
    const provinceReportRepository = connect.connection.getRepository(CovidProvincesAPI);
    
    try {
    await connect.queryRunner.startTransaction();
        const data = await _fetchUSData();
        if (data === undefined) {
            console.log("couldn't fetch data");
            await connect.queryRunner.rollbackTransaction();
        }

        const existProvince = await provinceRepository.findOne({
            iso: "USA",
        });

        if (!existProvince) {
            console.log("no such province");
            await connect.queryRunner.rollbackTransaction();
        }

        await data.forEach(async (element: any, num: any) => {
            const Case_Fatality_Rate = parseFloat(
                ((StrToFloat(element.death) / StrToFloat(element.positive)) * 100).toFixed(2)
            );
            const activeCases = element.recovered === null || element.recovered === undefined ? 0 : element.positive - (element.death + element.recovered);
            const Recovery_Proporation = parseFloat(((element.recovered / StrToFloat(element.positive)) * 100).toFixed(2));
            const existProvince = await provinceRepository.findOne({
                iso: "USA",
                TwoLetterSymbol: element.state,
            });

            const provinceReportExist = await provinceReportRepository.findOne({
                date: new Date(element.date),
                province: existProvince,
            });

            if (!provinceReportExist) {
                const newData: any = new CovidProvincesAPI();
                newData.confirmed = element.positive;
                newData.deaths = element.death;
                newData.recovered =
                    element.recovered === null || element.recovered === undefined ? 0 : element.recovered;
                newData.Case_Fatality_Rate = Case_Fatality_Rate;
                newData.Recovery_Proporation = Recovery_Proporation;
                newData.confirmed_diff = element.positiveIncrease;
                newData.deaths_diff = element.deathIncrease;
                newData.recovered_diff = 0;
                newData.date = new Date(element.date);
                newData.active = activeCases;
                newData.active_diff = 0;
                newData.fatality_rate = 0;
                newData.province = existProvince;
                await provinceReportRepository.save(newData);
                return "one us state updated";
            } else {
                return "report already exists";
            }
        });
        console.log("all us states are updated");
        await connect.queryRunner.commitTransaction();
    } catch (error) {
        console.log(error);
        await connect.queryRunner.rollbackTransaction();
    } finally {
        await connect.queryRunner.release();
    }
}

export async function addCityReports() {
    // const connect: any = await _connect();

    // const citiesRepository = connect.connection.getRepository(Cities);

    // const citiesReportRepository = connect.connection.getRepository(CovidCitiesAPI);
    // await connect.queryRunner.startTransaction();
    // try {
    //     const data = await _fetchData();
    //     data.forEach((element: any) => {
    //         if (element.region.cities.length >= 1) {
    //             element.region.cities.forEach(async (element2: any) => {
    //                 const existCity = await citiesRepository.findOne({
    //                     name: element2.name,
    //                     lat: element2.lat,
    //                     long: element2.long,
    //                 });
    //                 if (!existCity) return;
    //                 const cityReportExist = await citiesReportRepository.findOne({
    //                     date: new Date(element2.date),
    //                     city: existCity,
    //                 });
    //                 if (!cityReportExist) {
    //                     const newCityData = new CovidCitiesAPI();
    //                     newCityData.date = new Date(element2.date);
    //                     newCityData.confirmed = element2.confirmed;
    //                     newCityData.confirmed_diff = element2.confirmed_diff;
    //                     newCityData.deaths = element2.deaths;
    //                     newCityData.deaths_diff = element2.deaths_diff;
    //                     newCityData.city = existCity;
    //                     await citiesReportRepository.save(newCityData);
    //                 }
    //             });
    //         }
    //     });
    //     await connect.queryRunner.commitTransaction();
    // } catch (error) {
    //     console.log(error);
    //     await connect.queryRunner.rollbackTransaction();
    //     return "Not Done";
    // } finally {
    //     // you need to release query runner which is manually created:
    //     await connect.queryRunner.release();
    //     return "done";
    // }
}

// Get Data from database
export async function getAll() {
    console.log("start 2");
    const connect: any = await _connect();
    try {
        const provinceRepository = connect.connection.getRepository(Province);
        const data = await provinceRepository.find({ relations: ["reports"] });

        return data;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }

}

export async function getReports(iso: String) {
    const connect: any = await _connect();
    const provinceRepository = connect.connection.getRepository(Province);
    try {
        const data = await provinceRepository.find({
            where: { iso: iso },
            relations: ["reports"],
        });

        let more_specific: any = [];
        data.forEach((e: any) => {
            let obj: any = {};
            
            obj.name = e.name;
            obj.province = e.province;
            obj.TwoLetterSymbol = e.TwoLetterSymbol;
            obj.iso = e.iso;
            if (e.reports[0] !== undefined) {
                obj.date = e.reports[0]?.date;
                obj.confirmed = e.reports[0].confirmed;
                obj.recovered = e.reports[0].recovered;
                obj.deaths = e.reports[0].deaths;
                obj.Case_Fatality_Rate = e.reports[0].Case_Fatality_Rate;
                obj.datRecovery_Proporatione = e.reports[0].datRecovery_Proporatione;
                obj.confirmed_diff = e.reports[0].confirmed_diff;
                obj.deaths_diff = e.reports[0].deaths_diff;
                obj.recovered_diff = e.reports[0].recovered_diff;
                obj.active = e.reports[0].active;
                obj.active_diff = e.reports[0].active_diff;
                obj.fatality_rate = e.reports[0].fatality_rate;
                obj.Recovery_Proporation = e.reports[0].Recovery_Proporation;
    
                more_specific.push(obj);
            }
        })
        return more_specific;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

// sort array of objects based on their values: string or number
function compareValues(key: any, order = "asc") {
    return function innerSort(a: any, b: any) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
    };
}

export async function getProvincesBasedOnISO(iso: String) {
    const connect: any = await _connect();
    const provinceRepository = connect.connection.getRepository(Province);
    try {
        const data = await provinceRepository.find({
            where: { iso: iso },
            relations: ["reports"],
        });
        let mixedData: any = [];
        data.forEach((element: any) => {
            let obj: any = {};
            obj.province = element.province;
            if (element.reports.length > 0) {
                obj.reports = true;
                obj.confirmed = element.reports[0].confirmed;
                obj.recovered = element.reports[0].recovered;
                obj.deaths = element.reports[0].deaths;
                obj.Case_Fatality_Rate = element.reports[0].Case_Fatality_Rate;
                obj.confirmed_diff = element.reports[0].confirmed_diff;
                obj.deaths_diff = element.reports[0].deaths_diff;
                obj.recovered_diff = element.reports[0].recovered_diff;
                obj.active = element.reports[0].active;
                obj.active_diff = element.reports[0].active_diff;
                obj.fatality_rate = element.reports[0].fatality_rate;
                obj.Recovery_Proporation = element.reports[0].Recovery_Proporation;
            }
            mixedData.push(obj);
        });

        mixedData = mixedData.sort(compareValues("confirmed", "desc"));

        return mixedData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getCitiesBasedOnISO(iso: String) {
    // let mixedData: any = [];
    // const connect:any = await _connect();
    // // const citiesRepository = connect.connection.getRepository(Cities);
    // try {
    //     // const data = await citiesRepository.find({
    //     //     where: { iso: iso },
    //     //     relations: ["reports"],
    //     //     order: {
    //     //         name: 'ASC',
    //     //     }
    //     // });
    //     const provinceRepository = connect.connection.getRepository(Province);
    //     const data = await provinceRepository.find({
    //         where: { iso: iso },
    //         relations: ["cities", "cities.reports"],
    //         // order: {
    //         //     province: 'ASC',
    //         // }
    //     });
    //     data.forEach((province) => {
    //         let obj: any = {};
    //         obj.province = province.province;
    //         if (province.cities.length > 0) {
    //             province.cities.forEach((city) => {
    //                 obj.reports = true;
    //                 obj.name = city.name;
    //                 // if (condition) {

    //                 // }
    //                 // obj.date = city.reports[0].date;
    //                 // obj.confirmed = city.reports[0].confirmed;
    //                 // obj.deaths = city.reports[0].deaths;
    //                 // obj.confirmed_diff = city.reports[0].confirmed_diff;
    //                 // obj.deaths_diff = city.reports[0].deaths_diff;
    //             });
    //         }

    //         // console.log(obj);
    //         mixedData.push(obj);
    //     });

    //     // mixedData = mixedData.sort(compareValues('confirmed', 'desc'));

    //     console.log(mixedData);

    //     // return mixedData;
    //     return data;
    // } catch (error) {
    //  console.log(error);
    // } finally {
    //     // you need to release query runner which is manually created:
    //     await connect.queryRunner.release();
    // }

    return 2;
}

// GET Province of Countries

export async function getUsaProvinces() {
    const connect: any = await _connect();
    const provinceRepository = connect.connection.getRepository(Province);
    try {
        const data = await provinceRepository.find({
            where: { iso: "USA" },
            relations: ["reports"],
        });
        return data;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getCanadaProvinces() {
    const connect: any = await _connect();
    const provinceRepository = connect.connection.getRepository(Province);
    try {
        const data = await provinceRepository.find({
            where: { iso: "CAN" },
            relations: ["reports"],
        });
        return data;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getBrazilProvinces() {
    const connect: any = await _connect();
    const provinceRepository = connect.connection.getRepository(Province);
    try {
        const data = await provinceRepository.find({
            where: { iso: "BRA" },
            relations: ["reports"],
        });
        return data;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getGermanyProvinces() {
    const connect: any = await _connect();
    const provinceRepository = connect.connection.getRepository(Province);
    try {
        const data = await provinceRepository.find({
            where: { iso: "DEU" },
            relations: ["reports"],
        });
        return data;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getAustraliaProvinces() {
    const connect: any = await _connect();
    const provinceRepository = connect.connection.getRepository(Province);
    try {
        const data = await provinceRepository.find({
            where: { iso: "AUS" },
            relations: ["reports"],
        });
        return data;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}
