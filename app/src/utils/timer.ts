import { Fetcher } from "./fetch";
import { fetchAndSaveWhoAndOtherNews, deleteAllOldNews } from "./newsData";
import { updateProvinces, addDailyReports } from "./covidAPIData";
import { downloadAndConvertOwidData, updateOwid } from "./ovidData";

export const timers = async () => {
    try {
        console.log("Load Timer");
        // initial fetching
        await updateProvinces();
        console.log("calling updateProvinces is finished");
        await Fetcher();
        console.log("calling Fetcher is finished");
        await addDailyReports();
        console.log("calling addDailyReports is finished");
        await downloadAndConvertOwidData();
        console.log("calling downloadAndConvertOwidData is finished");
        await updateOwid();
        console.log("calling updateOwid is finished");
        await fetchAndSaveWhoAndOtherNews();
        console.log("calling fetchAndSaveWhoAndOtherNews is finished");
        await deleteAllOldNews();
        console.log("calling deleteAllOldNews is finished");

        setInterval(async () => {
            //Start Fetcher - in this function we fetch data from covid19 npm
            await Fetcher();
            console.log("Load Fetcher");
        }, 1 * 30 * 60 * 1000); // Min * Sec * Ms - every 30 minutes 

        setInterval(async () => {
            // countries
            await addDailyReports();
            console.log("calling addDailyReports is finished");
            //update Owid
            await downloadAndConvertOwidData();
            console.log("calling downloadAndConvertOwidData is finished");
            await updateOwid();
            console.log("calling updateOwid is finished");
        }, 24 * 30 * 60 * 1000); // Min * Sec * Ms - every day 

        setInterval(async () => {
            await fetchAndSaveWhoAndOtherNews();
            console.log("calling fetchAndSaveWhoAndOtherNews is finished");
        }, 2 * 30 * 60 * 1000); // Min * Sec * Ms - every 2 hours

        setInterval(async () => {
            await deleteAllOldNews();
            console.log("calling deleteAllOldNews is finished");
        }, 5 * 30 * 60 * 1000); // Min * Sec * Ms - every 5 hours 
    } catch (error) {
        console.log(error);
    }
};
