import fs from "fs";
import Path from "path";
import csv from 'csvtojson';

import { getConnection, Not } from "typeorm";
import { Vaccine } from "../db/models/Vaccine";
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

// async function _downloadVaccineCSVFile() {
//     try {
//         console.log("request to download Vaccine and Treatment csv file");

//         // const url = "https://covid.ourworldindata.org/data/owid-covid-data.json";
//         const url = "https://airtable.com/v0.3/view/viweyymxOAtNvo7yH/downloadCsv?x-time-zone=Asia%2FTehran&x-user-locale=en&x-airtable-application-id=appRalbC9sD1t6DIS&stringifiedObjectParams=%7B%22origin%22%3A%22viewMenuPopover%22%7D&requestId=reqbc5x80dtNRtaXF&accessPolicy=%7B%22allowedActions%22%3A%5B%7B%22modelClassName%22%3A%22application%22%2C%22modelIdSelector%22%3A%22appRalbC9sD1t6DIS%22%2C%22action%22%3A%22read%22%7D%2C%7B%22modelClassName%22%3A%22application%22%2C%22modelIdSelector%22%3A%22appRalbC9sD1t6DIS%22%2C%22action%22%3A%22readForDetailView%22%7D%2C%7B%22modelClassName%22%3A%22application%22%2C%22modelIdSelector%22%3A%22appRalbC9sD1t6DIS%22%2C%22action%22%3A%22readBlockInstallationPages%22%7D%2C%7B%22modelClassName%22%3A%22application%22%2C%22modelIdSelector%22";
//         const csvFilePath = Path.resolve(__dirname, "vaccine-data.csv");

//         // axios image download with response type "stream"
//         const response = await Axios({
//             method: "GET",
//             url: url,
//             responseType: "stream",
//         });

//         if (response) {
//             console.log("request to download vaccine data has been approved");
//             // pipe the result stream into a file on disc
//             // const saved = await response.data.pipe(fs.createWriteStream(csvFilePath));
//             console.log("start downloading and saving vaccine csv file");
//             response.data.pipe(fs.createWriteStream(csvFilePath));

//             // return a promise and resolve when download finishes
//             return new Promise((resolve, reject) => {
//                 response.data.on("end", () => {
//                     resolve();
//                     console.log("vaccine csv file is updated");
//                     return true;
//                 });

//                 response.data.on("error", (err: any) => {
//                     console.log(err);
//                     console.log("couldn't write completely to the vaccine csv file");
//                     reject();
//                     return false;
//                 });
//             });
//         } else {
//             console.log("couldn't download vaccine csv file");
//         }
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

async function _convertCsvToJsonVaccine() {
    try {
        console.log("start converting vaccine csv file to json");

        const csvFilePath = Path.resolve(__dirname, "vaccine-data.csv");
        const jsonFilePath = Path.resolve(__dirname, "vaccine-data.json");

        csv()
            .fromFile(csvFilePath)
            .then(async (jsonObj) => {

                let data = JSON.stringify(jsonObj);

                fs.writeFile(jsonFilePath, data, (err) => {
                    // fs.writeFile(jsonFilePath, jsonData3, (err) => {
                    if (err) {
                        console.log('the vaccine json file has not been saved!');
                        return false;
                    };
                    console.log('the vaccine json file has been saved!');
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

export const convertVaccineData = async () => {
    // await _downloadVaccineCSVFile();
    await _convertCsvToJsonVaccine();
};

export const urlify = (text: any) => {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    let arr;
    arr = text.match(urlRegex)
    return arr;
    // return text.replace(urlRegex, function (url: any) {
    //     // return url;
    //     return '<a href="' + url + '">' + url + '</a>';
    // })
}

export const updateVaccine = async () => {

    const connect: any = await _connect();
    const VaccineRepository = connect.connection.getRepository(Vaccine);

    try {
        console.log("updating database with vaccine data");
        const jsonFilePath = Path.resolve(__dirname, "vaccine-data.json");

        let vacData: any = {};

        fs.readFile(jsonFilePath, 'utf-8', async (err, data) => {
            if (err) {
                console.log("couldn't read the vaccine json file");
                return false;
            };

            console.log('the vaccine json file has been read!');
            // parse json data
            vacData = JSON.parse(data);

            if (!(vacData.length > 0)) {
                console.log("couldn't parse vaccine json file");
            } else {
                console.log("vaccine json parsed");

                await vacData.forEach(async (e: any, i: number) => {
                    let url;
                    if (e["Published Results"]) {
                        url = urlify(e["Published Results"]);
                    }
                    // console.log(url);
                    let newData: any;
                    newData = new Vaccine();
                    newData.developerResearcher = e["Developer / Researcher"];
                    newData.treatmentVsVaccine = e["Treatment vs"][" Vaccine"];
                    // Object.keys(e.["Treatment vs"])[0]
                    newData.category = e["Product Category"] === "Unknown" ? "Other" : e["Product Category"];
                    newData.phase = e["Stage of Development"];
                    newData.nextSteps = e["Anticipated Next Steps"] === "Unknown" ? null : e["Anticipated Next Steps"];
                    newData.description = e["Product Description"] === "Unknown" ? null : e["Product Description"];
                    newData.clinicalTrialsForCovid19 = e["Clinical Trials for COVID-19"] === "" ? null : e["Clinical Trials for COVID-19"];
                    newData.funder = e.Funder === "Unknown" || e.Funder === "" ? null : e.Funder;
                    newData.publishedResults = url === undefined ? null : url;
                    newData.clinicalTrialsForOtherDiseases = e["Clinical Trials for Other Diseases (T only) / Related Use or Platform (V only)"] === "" ? null : e["Clinical Trials for Other Diseases (T only) / Related Use or Platform (V only)"];
                    newData.FDAApproved = e["FDA-Approved Indications"] === "Unknown" || e["FDA-Approved Indications"] === "" || e["FDA-Approved Indications"] === "N/A" || e["FDA-Approved Indications"] === "N/A\n" || e["FDA-Approved Indications"] === "N//A" ? null : e["FDA-Approved Indications"];
                    newData.lastUpdated = new Date(e["Date Last Updated"]);

                    // console.log(newData);

                    try {
                        let exist = await VaccineRepository.findOne({
                            developerResearcher: newData.developerResearcher,
                            category: newData.category,
                            phase: newData.phase,
                        });
                        if (exist) {
                            newData.vaccine_id = exist.vaccine_id;
                            await VaccineRepository.preload(newData);
                            // console.log(`vaccine ${newData.developerResearcher} preloaded`);
                            // await connect.queryRunner.rollbackTransaction();
                        } else {
                            await VaccineRepository.save(newData);
                            // console.log(`vaccine ${newData.developerResearcher} added`);
                        }
                    } catch (error) {
                        console.log(`couldn't update item: ${i}`);
                        console.log(error);
                    }

                });
                console.log("vaccine database is getting updated in a second.");
                return vacData;
            }
        })
    } catch (error) {
        console.log(error);
        console.log("couldn't update vaccine database");
        return false;
    } finally {
        await connect.queryRunner.release();
        // return true;
    }
};

/////////////////////////////////////////////////////
///////////////   Vaccines   ////////////////////////
/////////////////////////////////////////////////////

export async function getAllVaccineNames() {
    const connect: any = await _connect();
    const vaccineRepository = connect.connection.getRepository(Vaccine);

    try {
        const data = await vaccineRepository.find({
            where: {
                treatmentVsVaccine: "Vaccine"
            },
            order: { lastUpdated: "DESC" }
        });


        let names: any = [];
        let obj = {};

        let pureText: string;
        let realLength = 0;
        const validLength = 30;
        // justify developerResearcher to lower length.
        data.forEach((e: any) => {
            pureText = e.developerResearcher;
            realLength = pureText.length;
            pureText = pureText.substring(0, validLength);
            e.developerResearcher =
                pureText +
                (realLength - validLength < 0
                    ? ''
                    : `…`);

            obj = {
                developerResearcher: e.developerResearcher,
                // category: e.category,
                // phase: e.phase,
            }
            console.log(obj);

            names.push(e.developerResearcher)
            // names.push(obj)
        });
        return names;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getAllVaccines() {
    const connect: any = await _connect();
    const vaccineRepository = connect.connection.getRepository(Vaccine);

    try {
        const data = await vaccineRepository.find({
            where: {
                treatmentVsVaccine: "Vaccine"
            },
            order: { lastUpdated: "DESC" }
        });

        let properedData: any = [];
        let suitableObj = {};

        let developerResearcher: string;
        let developerResearcherLength = 0;

        let nextSteps: string;
        let nextStepsLength = 0;

        let description: string;
        let descriptionLength = 0;

        let funder: string;
        let funderLength = 0;

        let FDAApproved: string;
        let FDAApprovedLength = 0;

        const validLength = 40;
        const FDAvalidLength = 25;
        // justify developerResearcher to lower length.
        data.forEach((e: any) => {
            if (e.developerResearcher !== null) {
                developerResearcher = e.developerResearcher;
                developerResearcherLength = developerResearcher.length;
                developerResearcher = developerResearcher.substring(0, validLength);
                e.developerResearcher = developerResearcher + (developerResearcherLength - validLength < 0 ? '' : `… [+${developerResearcherLength - validLength}]`);
            }
            if (e.nextSteps !== null) {
                nextSteps = e.nextSteps;
                nextStepsLength = nextSteps.length;
                nextSteps = nextSteps.substring(0, validLength);
                e.nextSteps = nextSteps + (nextStepsLength - validLength < 0 ? '' : `… [+${nextStepsLength - validLength}]`);
            }
            if (e.description !== null) {
                description = e.description;
                descriptionLength = description.length;
                description = description.substring(0, validLength);
                e.description = description + (descriptionLength - validLength < 0 ? '' : `… [+${descriptionLength - validLength}]`);
            }
            if (e.funder !== null) {
                funder = e.funder;
                funderLength = funder.length;
                funder = funder.substring(0, validLength);
                e.funder = funder + (funderLength - validLength < 0 ? '' : `… [+${funderLength - validLength}]`);
            }
            if (e.FDAApproved !== null) {
                FDAApproved = e.FDAApproved;
                FDAApprovedLength = FDAApproved.length;
                FDAApproved = FDAApproved.substring(0, FDAvalidLength);
                e.FDAApproved = FDAApproved + (FDAApprovedLength - FDAvalidLength < 0 ? '' : `… [+${FDAApprovedLength - FDAvalidLength}]`);
            }

            suitableObj = {
                developerResearcher: e.developerResearcher,
                category: e.category,
                phase: e.phase,
                nextSteps: e.nextSteps,
                description: e.description,
                funder: e.funder,
                FDAApproved: e.FDAApproved,
                lastUpdated: e.lastUpdated
            }
            // console.log(suitableObj);

            properedData.push(suitableObj)
            // names.push(obj)
        });

        return properedData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getAllPhase_PreClinical_Vaccines() {
    const connect: any = await _connect();
    const vaccineRepository = connect.connection.getRepository(Vaccine);

    try {
        const data = await vaccineRepository.find({
            where: [{
                treatmentVsVaccine: "Vaccine",
                phase: "Pre-clinical"
            }, {
                treatmentVsVaccine: "Vaccine",
                phase: "Clinical"
            }
            ],
            order: { lastUpdated: "DESC" }
        });
        let properedData: any = [];
        let suitableObj = {};

        let developerResearcher: string;
        let developerResearcherLength = 0;

        let nextSteps: string;
        let nextStepsLength = 0;

        let description: string;
        let descriptionLength = 0;

        let funder: string;
        let funderLength = 0;

        let FDAApproved: string;
        let FDAApprovedLength = 0;

        const validLength = 40;
        const FDAvalidLength = 25;
        // justify developerResearcher to lower length.
        data.forEach((e: any) => {
            if (e.developerResearcher !== null) {
                developerResearcher = e.developerResearcher;
                developerResearcherLength = developerResearcher.length;
                developerResearcher = developerResearcher.substring(0, validLength);
                e.developerResearcher = developerResearcher + (developerResearcherLength - validLength < 0 ? '' : `… [+${developerResearcherLength - validLength}]`);
            }
            if (e.nextSteps !== null) {
                nextSteps = e.nextSteps;
                nextStepsLength = nextSteps.length;
                nextSteps = nextSteps.substring(0, validLength);
                e.nextSteps = nextSteps + (nextStepsLength - validLength < 0 ? '' : `… [+${nextStepsLength - validLength}]`);
            }
            if (e.description !== null) {
                description = e.description;
                descriptionLength = description.length;
                description = description.substring(0, validLength);
                e.description = description + (descriptionLength - validLength < 0 ? '' : `… [+${descriptionLength - validLength}]`);
            }
            if (e.funder !== null) {
                funder = e.funder;
                funderLength = funder.length;
                funder = funder.substring(0, validLength);
                e.funder = funder + (funderLength - validLength < 0 ? '' : `… [+${funderLength - validLength}]`);
            }
            if (e.FDAApproved !== null) {
                FDAApproved = e.FDAApproved;
                FDAApprovedLength = FDAApproved.length;
                FDAApproved = FDAApproved.substring(0, FDAvalidLength);
                e.FDAApproved = FDAApproved + (FDAApprovedLength - FDAvalidLength < 0 ? '' : `… [+${FDAApprovedLength - FDAvalidLength}]`);
            }

            suitableObj = {
                developerResearcher: e.developerResearcher,
                category: e.category,
                phase: e.phase,
                nextSteps: e.nextSteps,
                description: e.description,
                funder: e.funder,
                FDAApproved: e.FDAApproved,
                lastUpdated: e.lastUpdated
            }
            // console.log(suitableObj);

            properedData.push(suitableObj)
            // names.push(obj)
        });

        return properedData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getAllPhase_one_Vaccines() {
    const connect: any = await _connect();
    const vaccineRepository = connect.connection.getRepository(Vaccine);

    try {
        const data = await vaccineRepository.find({
            where: {
                treatmentVsVaccine: "Vaccine",
                phase: "Phase I"
            },
            order: { lastUpdated: "DESC" }
        });
        let properedData: any = [];
        let suitableObj = {};

        let developerResearcher: string;
        let developerResearcherLength = 0;

        let nextSteps: string;
        let nextStepsLength = 0;

        let description: string;
        let descriptionLength = 0;

        let funder: string;
        let funderLength = 0;

        let FDAApproved: string;
        let FDAApprovedLength = 0;

        const validLength = 40;
        const FDAvalidLength = 25;
        // justify developerResearcher to lower length.
        data.forEach((e: any) => {
            if (e.developerResearcher !== null) {
                developerResearcher = e.developerResearcher;
                developerResearcherLength = developerResearcher.length;
                developerResearcher = developerResearcher.substring(0, validLength);
                e.developerResearcher = developerResearcher + (developerResearcherLength - validLength < 0 ? '' : `… [+${developerResearcherLength - validLength}]`);
            }
            if (e.nextSteps !== null) {
                nextSteps = e.nextSteps;
                nextStepsLength = nextSteps.length;
                nextSteps = nextSteps.substring(0, validLength);
                e.nextSteps = nextSteps + (nextStepsLength - validLength < 0 ? '' : `… [+${nextStepsLength - validLength}]`);
            }
            if (e.description !== null) {
                description = e.description;
                descriptionLength = description.length;
                description = description.substring(0, validLength);
                e.description = description + (descriptionLength - validLength < 0 ? '' : `… [+${descriptionLength - validLength}]`);
            }
            if (e.funder !== null) {
                funder = e.funder;
                funderLength = funder.length;
                funder = funder.substring(0, validLength);
                e.funder = funder + (funderLength - validLength < 0 ? '' : `… [+${funderLength - validLength}]`);
            }
            if (e.FDAApproved !== null) {
                FDAApproved = e.FDAApproved;
                FDAApprovedLength = FDAApproved.length;
                FDAApproved = FDAApproved.substring(0, FDAvalidLength);
                e.FDAApproved = FDAApproved + (FDAApprovedLength - FDAvalidLength < 0 ? '' : `… [+${FDAApprovedLength - FDAvalidLength}]`);
            }

            suitableObj = {
                developerResearcher: e.developerResearcher,
                category: e.category,
                phase: e.phase,
                nextSteps: e.nextSteps,
                description: e.description,
                funder: e.funder,
                FDAApproved: e.FDAApproved,
                lastUpdated: e.lastUpdated
            }
            // console.log(suitableObj);

            properedData.push(suitableObj)
            // names.push(obj)
        });

        return properedData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getAllPhase_two_Vaccines() {
    const connect: any = await _connect();
    const vaccineRepository = connect.connection.getRepository(Vaccine);

    try {
        const data = await vaccineRepository.find({
            where: [{
                treatmentVsVaccine: "Vaccine",
                phase: "Phase I/II"
            }, {
                treatmentVsVaccine: "Vaccine",
                phase: "Phase II"
            }],
            order: { lastUpdated: "DESC" }
        });
        let properedData: any = [];
        let suitableObj = {};

        let developerResearcher: string;
        let developerResearcherLength = 0;

        let nextSteps: string;
        let nextStepsLength = 0;

        let description: string;
        let descriptionLength = 0;

        let funder: string;
        let funderLength = 0;

        let FDAApproved: string;
        let FDAApprovedLength = 0;

        const validLength = 40;
        const FDAvalidLength = 25;
        // justify developerResearcher to lower length.
        data.forEach((e: any) => {
            if (e.developerResearcher !== null) {
                developerResearcher = e.developerResearcher;
                developerResearcherLength = developerResearcher.length;
                developerResearcher = developerResearcher.substring(0, validLength);
                e.developerResearcher = developerResearcher + (developerResearcherLength - validLength < 0 ? '' : `… [+${developerResearcherLength - validLength}]`);
            }
            if (e.nextSteps !== null) {
                nextSteps = e.nextSteps;
                nextStepsLength = nextSteps.length;
                nextSteps = nextSteps.substring(0, validLength);
                e.nextSteps = nextSteps + (nextStepsLength - validLength < 0 ? '' : `… [+${nextStepsLength - validLength}]`);
            }
            if (e.description !== null) {
                description = e.description;
                descriptionLength = description.length;
                description = description.substring(0, validLength);
                e.description = description + (descriptionLength - validLength < 0 ? '' : `… [+${descriptionLength - validLength}]`);
            }
            if (e.funder !== null) {
                funder = e.funder;
                funderLength = funder.length;
                funder = funder.substring(0, validLength);
                e.funder = funder + (funderLength - validLength < 0 ? '' : `… [+${funderLength - validLength}]`);
            }
            if (e.FDAApproved !== null) {
                FDAApproved = e.FDAApproved;
                FDAApprovedLength = FDAApproved.length;
                FDAApproved = FDAApproved.substring(0, FDAvalidLength);
                e.FDAApproved = FDAApproved + (FDAApprovedLength - FDAvalidLength < 0 ? '' : `… [+${FDAApprovedLength - FDAvalidLength}]`);
            }

            suitableObj = {
                developerResearcher: e.developerResearcher,
                category: e.category,
                phase: e.phase,
                nextSteps: e.nextSteps,
                description: e.description,
                funder: e.funder,
                FDAApproved: e.FDAApproved,
                lastUpdated: e.lastUpdated
            }
            // console.log(suitableObj);

            properedData.push(suitableObj)
            // names.push(obj)
        });

        return properedData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}


export async function getAllPhase_three_Vaccines() {
    const connect: any = await _connect();
    const vaccineRepository = connect.connection.getRepository(Vaccine);

    try {
        const data = await vaccineRepository.find({
            where: [{
                treatmentVsVaccine: "Vaccine",
                phase: "Phase III"
            }, {
                treatmentVsVaccine: "Vaccine",
                phase: "Phase II/III"
            }],
            order: { lastUpdated: "DESC" }
        });
        let properedData: any = [];
        let suitableObj = {};

        let developerResearcher: string;
        let developerResearcherLength = 0;

        let nextSteps: string;
        let nextStepsLength = 0;

        let description: string;
        let descriptionLength = 0;

        let funder: string;
        let funderLength = 0;

        let FDAApproved: string;
        let FDAApprovedLength = 0;

        const validLength = 40;
        const FDAvalidLength = 25;
        // justify developerResearcher to lower length.
        data.forEach((e: any) => {
            if (e.developerResearcher !== null) {
                developerResearcher = e.developerResearcher;
                developerResearcherLength = developerResearcher.length;
                developerResearcher = developerResearcher.substring(0, validLength);
                e.developerResearcher = developerResearcher + (developerResearcherLength - validLength < 0 ? '' : `… [+${developerResearcherLength - validLength}]`);
            }
            if (e.nextSteps !== null) {
                nextSteps = e.nextSteps;
                nextStepsLength = nextSteps.length;
                nextSteps = nextSteps.substring(0, validLength);
                e.nextSteps = nextSteps + (nextStepsLength - validLength < 0 ? '' : `… [+${nextStepsLength - validLength}]`);
            }
            if (e.description !== null) {
                description = e.description;
                descriptionLength = description.length;
                description = description.substring(0, validLength);
                e.description = description + (descriptionLength - validLength < 0 ? '' : `… [+${descriptionLength - validLength}]`);
            }
            if (e.funder !== null) {
                funder = e.funder;
                funderLength = funder.length;
                funder = funder.substring(0, validLength);
                e.funder = funder + (funderLength - validLength < 0 ? '' : `… [+${funderLength - validLength}]`);
            }
            if (e.FDAApproved !== null) {
                FDAApproved = e.FDAApproved;
                FDAApprovedLength = FDAApproved.length;
                FDAApproved = FDAApproved.substring(0, FDAvalidLength);
                e.FDAApproved = FDAApproved + (FDAApprovedLength - FDAvalidLength < 0 ? '' : `… [+${FDAApprovedLength - FDAvalidLength}]`);

            }

            suitableObj = {
                developerResearcher: e.developerResearcher,
                category: e.category,
                phase: e.phase,
                nextSteps: e.nextSteps,
                description: e.description,
                funder: e.funder,
                FDAApproved: e.FDAApproved,
                lastUpdated: e.lastUpdated
            }
            // console.log(suitableObj);

            properedData.push(suitableObj)
            // names.push(obj)
        });

        return properedData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getAllPhase_four_Vaccines() {
    const connect: any = await _connect();
    const vaccineRepository = connect.connection.getRepository(Vaccine);

    try {
        const data = await vaccineRepository.find({
            where: [{
                treatmentVsVaccine: "Vaccine",
                phase: "Phase III/IV"
            }, {
                treatmentVsVaccine: "Vaccine",
                phase: "Phase IV"
            }],
            order: { lastUpdated: "DESC" }
        });
        let properedData: any = [];
        let suitableObj = {};

        let developerResearcher: string;
        let developerResearcherLength = 0;

        let nextSteps: string;
        let nextStepsLength = 0;

        let description: string;
        let descriptionLength = 0;

        let funder: string;
        let funderLength = 0;

        let FDAApproved: string;
        let FDAApprovedLength = 0;

        const validLength = 40;
        const FDAvalidLength = 25;
        // justify developerResearcher to lower length.
        data.forEach((e: any) => {
            if (e.developerResearcher !== null) {
                developerResearcher = e.developerResearcher;
                developerResearcherLength = developerResearcher.length;
                developerResearcher = developerResearcher.substring(0, validLength);
                e.developerResearcher = developerResearcher + (developerResearcherLength - validLength < 0 ? '' : `… [+${developerResearcherLength - validLength}]`);
            }
            if (e.nextSteps !== null) {
                nextSteps = e.nextSteps;
                nextStepsLength = nextSteps.length;
                nextSteps = nextSteps.substring(0, validLength);
                e.nextSteps = nextSteps + (nextStepsLength - validLength < 0 ? '' : `… [+${nextStepsLength - validLength}]`);
            }
            if (e.description !== null) {
                description = e.description;
                descriptionLength = description.length;
                description = description.substring(0, validLength);
                e.description = description + (descriptionLength - validLength < 0 ? '' : `… [+${descriptionLength - validLength}]`);
            }
            if (e.funder !== null) {
                funder = e.funder;
                funderLength = funder.length;
                funder = funder.substring(0, validLength);
                e.funder = funder + (funderLength - validLength < 0 ? '' : `… [+${funderLength - validLength}]`);
            }
            if (e.FDAApproved !== null) {
                FDAApproved = e.FDAApproved;
                FDAApprovedLength = FDAApproved.length;
                FDAApproved = FDAApproved.substring(0, FDAvalidLength);
                e.FDAApproved = FDAApproved + (FDAApprovedLength - FDAvalidLength < 0 ? '' : `… [+${FDAApprovedLength - FDAvalidLength}]`);
            }

            suitableObj = {
                developerResearcher: e.developerResearcher,
                category: e.category,
                phase: e.phase,
                nextSteps: e.nextSteps,
                description: e.description,
                funder: e.funder,
                FDAApproved: e.FDAApproved,
                lastUpdated: e.lastUpdated
            }
            // console.log(suitableObj);

            properedData.push(suitableObj)
            // names.push(obj)
        });

        return properedData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function get_FDA_Approved_Vaccines() {
    const connect: any = await _connect();
    const vaccineRepository = connect.connection.getRepository(Vaccine);

    try {
        const data = await vaccineRepository.find({
            where: {
                treatmentVsVaccine: "Vaccine",
                FDAApproved: Not("[null]") && Not("")

            },
            order: { lastUpdated: "DESC" }
        });
        let properedData: any = [];
        let suitableObj = {};

        let developerResearcher: string;
        let developerResearcherLength = 0;

        let nextSteps: string;
        let nextStepsLength = 0;

        let description: string;
        let descriptionLength = 0;

        let funder: string;
        let funderLength = 0;

        let FDAApproved: string;
        let FDAApprovedLength = 0;

        const validLength = 40;
        const FDAvalidLength = 25;
        // justify developerResearcher to lower length.
        data.forEach((e: any) => {
            if (e.developerResearcher !== null) {
                developerResearcher = e.developerResearcher;
                developerResearcherLength = developerResearcher.length;
                developerResearcher = developerResearcher.substring(0, validLength);
                e.developerResearcher = developerResearcher + (developerResearcherLength - validLength < 0 ? '' : `… [+${developerResearcherLength - validLength}]`);
            }
            if (e.nextSteps !== null) {
                nextSteps = e.nextSteps;
                nextStepsLength = nextSteps.length;
                nextSteps = nextSteps.substring(0, validLength);
                e.nextSteps = nextSteps + (nextStepsLength - validLength < 0 ? '' : `… [+${nextStepsLength - validLength}]`);
            }
            if (e.description !== null) {
                description = e.description;
                descriptionLength = description.length;
                description = description.substring(0, validLength);
                e.description = description + (descriptionLength - validLength < 0 ? '' : `… [+${descriptionLength - validLength}]`);
            }
            if (e.funder !== null) {
                funder = e.funder;
                funderLength = funder.length;
                funder = funder.substring(0, validLength);
                e.funder = funder + (funderLength - validLength < 0 ? '' : `… [+${funderLength - validLength}]`);
            }
            if (e.FDAApproved !== null) {
                FDAApproved = e.FDAApproved;
                FDAApprovedLength = FDAApproved.length;
                FDAApproved = FDAApproved.substring(0, FDAvalidLength);
                e.FDAApproved = FDAApproved + (FDAApprovedLength - FDAvalidLength < 0 ? '' : `… [+${FDAApprovedLength - FDAvalidLength}]`);
            }

            suitableObj = {
                developerResearcher: e.developerResearcher,
                category: e.category,
                phase: e.phase,
                nextSteps: e.nextSteps,
                description: e.description,
                funder: e.funder,
                FDAApproved: e.FDAApproved,
                lastUpdated: e.lastUpdated
            }
            // console.log(suitableObj);

            properedData.push(suitableObj)
            // names.push(obj)
        });

        return properedData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}


/////////////////////////////////////////////////////
///////////////   Treatments   //////////////////////
/////////////////////////////////////////////////////

export async function getAllTreatments() {
    const connect: any = await _connect();
    const vaccineRepository = connect.connection.getRepository(Vaccine);

    try {
        const data = await vaccineRepository.find({
            where: {
                treatmentVsVaccine: "Treatment"
            },
            order: { lastUpdated: "DESC" }
        });

        return data;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}


export async function getAllPreClinicalTreatments() {
    const connect: any = await _connect();
    const vaccineRepository = connect.connection.getRepository(Vaccine);

    try {
        const data = await vaccineRepository.find({
            where: {
                treatmentVsVaccine: "Treatment",
                phase: "Pre-clinical"
            },
            order: { lastUpdated: "DESC" }
        });

        return data;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getAllClinicalTreatments() {
    const connect: any = await _connect();
    const vaccineRepository = connect.connection.getRepository(Vaccine);

    try {
        const data = await vaccineRepository.find({
            where: {
                treatmentVsVaccine: "Treatment",
                phase: Not("Pre-clinical")
            },
            order: { lastUpdated: "DESC" }
        });

        return data;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getAll_FDA_Approved_Treatments() {
    const connect: any = await _connect();
    const vaccineRepository = connect.connection.getRepository(Vaccine);

    try {
        const data = await vaccineRepository.find({
            where: {
                treatmentVsVaccine: "Treatment",
                FDAApproved: Not("[null]")
                    && Not("")
                    && Not("N//A") && Not("N/A\n")
                // Country: Not(In(["World", "Total:"])),
            },
            order: { lastUpdated: "DESC" }
        });

        return data;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

/////////////////////////////////////////////////
///////////   category based    /////////////////
/////////////////////////////////////////////////

export async function getVaccineCategoryBased(category: String) {
    const connect: any = await _connect();
    const vaccineRepository = connect.connection.getRepository(Vaccine);

    console.log(category);

    try {
        const data = await vaccineRepository.find({
            where: {
                treatmentVsVaccine: "Vaccine",
                category: category,
            },
            order: { lastUpdated: "DESC" }
        });
        let properedData: any = [];
        let suitableObj = {};

        let developerResearcher: string;
        let developerResearcherLength = 0;

        let nextSteps: string;
        let nextStepsLength = 0;

        let description: string;
        let descriptionLength = 0;

        let funder: string;
        let funderLength = 0;

        let FDAApproved: string;
        let FDAApprovedLength = 0;

        const validLength = 40;
        const FDAvalidLength = 25;
        // justify developerResearcher to lower length.
        data.forEach((e: any) => {
            if (e.developerResearcher !== null) {
                developerResearcher = e.developerResearcher;
                developerResearcherLength = developerResearcher.length;
                developerResearcher = developerResearcher.substring(0, validLength);
                e.developerResearcher = developerResearcher + (developerResearcherLength - validLength < 0 ? '' : `… [+${developerResearcherLength - validLength}]`);
            }
            if (e.nextSteps !== null) {
                nextSteps = e.nextSteps;
                nextStepsLength = nextSteps.length;
                nextSteps = nextSteps.substring(0, validLength);
                e.nextSteps = nextSteps + (nextStepsLength - validLength < 0 ? '' : `… [+${nextStepsLength - validLength}]`);
            }
            if (e.description !== null) {
                description = e.description;
                descriptionLength = description.length;
                description = description.substring(0, validLength);
                e.description = description + (descriptionLength - validLength < 0 ? '' : `… [+${descriptionLength - validLength}]`);
            }
            if (e.funder !== null) {
                funder = e.funder;
                funderLength = funder.length;
                funder = funder.substring(0, validLength);
                e.funder = funder + (funderLength - validLength < 0 ? '' : `… [+${funderLength - validLength}]`);
            }
            if (e.FDAApproved !== null) {
                FDAApproved = e.FDAApproved;
                FDAApprovedLength = FDAApproved.length;
                FDAApproved = FDAApproved.substring(0, FDAvalidLength);
                e.FDAApproved = FDAApproved + (FDAApprovedLength - FDAvalidLength < 0 ? '' : `… [+${FDAApprovedLength - FDAvalidLength}]`);

            }

            suitableObj = {
                developerResearcher: e.developerResearcher,
                category: e.category,
                phase: e.phase,
                description: e.description,
                FDAApproved: e.FDAApproved,
                nextSteps: e.nextSteps,
                funder: e.funder,
                lastUpdated: e.lastUpdated
            }
            // console.log(suitableObj);

            properedData.push(suitableObj)
            // names.push(obj)
        });

        return properedData;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}

export async function getTreatmentCategoryBased(category: String) {
    const connect: any = await _connect();
    const vaccineRepository = connect.connection.getRepository(Vaccine);

    try {
        const data = await vaccineRepository.find({
            where: {
                treatmentVsVaccine: "Treatment",
                category: category,
            },
            order: { lastUpdated: "DESC" }
        });
        return data;
    } catch (error) {
        console.log(error);
    } finally {
        await connect.queryRunner.release();
    }
}