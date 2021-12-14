import { fetch_npmData } from "./fetch";
import { fetchAndSaveWhoAndOtherNews, deleteAllOldNews } from "./newsData";
import { updateProvinces, addDailyReports } from "./covidAPIData";
import { downloadAndConvertOwidData, updateOwid } from "./ovidData";
import { convertVaccineData, updateVaccine } from "./vaccineAndTreatment";

export const timers = async () => {
    try {
        console.log("Load Timer");
        // initial fetching
        await updateProvinces();
        console.log("calling updateProvinces is finished");
        await fetch_npmData();
        console.log("calling fetch_npmData is finished");
        await addDailyReports();
        console.log("calling addDailyReports is finished");
        await downloadAndConvertOwidData();
        console.log("calling downloadAndConvertOwidData is finished");
        await fetchAndSaveWhoAndOtherNews();
        console.log("calling fetchAndSaveWhoAndOtherNews is finished");
        await deleteAllOldNews();
        console.log("calling deleteAllOldNews is finished");
        await convertVaccineData();
        console.log("calling convertVaccineData is finished");
        await updateVaccine();
        console.log("calling updateVaccine is finished");
        setTimeout(async () => { 
            await updateOwid();
            console.log("calling updateOwid is finished");
        }, 1 * 5 * 60 * 1000); // after 5 minutes

        setInterval(async () => {
            //Start Fetcher - in this function we fetch data from covid19 npm
            await fetch_npmData();
            console.log("calling fetch_npmData is finished");
        }, 1 * 5 * 60 * 1000); // Min * Sec * Ms - every 5 minutes 

        setInterval(async () => {
            // countries
            await addDailyReports();
            console.log("calling addDailyReports is finished");
            //update Owid
            await downloadAndConvertOwidData();
            console.log("calling downloadAndConvertOwidData is finished");

            setTimeout(async () => {
                await updateOwid();
                console.log("calling updateOwid is finished");
            }, 1 * 5 * 60 * 1000); // after 5 minutes
        }, 11 * 60 * 60 * 1000); // Min * Sec * Ms - 2 times a day 

        setInterval(async () => {
            // update vaccine
            await convertVaccineData();
            console.log("calling convertVaccineData is finished");
            setTimeout(async () => {
                await updateVaccine();
                console.log("calling updateVaccine is finished");
            }, 1 * 10 * 60 * 1000); // after 10 minutes
        }, 17 * 60 * 60 * 1000); // Min * Sec * Ms - every 17 hours 

        setInterval(async () => {
            await fetchAndSaveWhoAndOtherNews();
            console.log("calling fetchAndSaveWhoAndOtherNews is finished");
        }, 7 * 60 * 60 * 1000); // Min * Sec * Ms - every 7 hours

        setInterval(async () => {
            await deleteAllOldNews();
            console.log("calling deleteAllOldNews is finished");
        }, 5 * 13 * 60 * 60 * 1000); // Min * Sec * Ms - every 2.5 days 
    } catch (error) {
        console.log(error);
    }
};
