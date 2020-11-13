import { Fetcher } from "./fetch";
import { firstTimeFetchAndSaveNews, fetchAndSaveNews, deleteAllOldNews } from "./newsData";
import { updateProvinces, addDailyReports } from "./covidAPIData";
import { updateDailyOwid } from "./ovidData";

export const timers = async () => {
    try {
        console.log("Load Timer");
        //Start Fetcher
        //in this function we fetch data from covid19 npm every 30 min and fetch data from owid Json and update Database
        await Fetcher();
        console.log("Load Fetcher");
        // countries
        await updateProvinces();
        console.log("calling updateProvinces finished");
        await addDailyReports();
        console.log("calling addDailyReports finished");
        //update Owid
        await updateDailyOwid();
        console.log("calling updateDailyOwid finished");
        // gets called once and fetch and save data into DB
        await firstTimeFetchAndSaveNews();
        console.log("calling firstTimeFetchAndSaveNews finished");
        // gets called every 2 hours.
        await fetchAndSaveNews();
        console.log("calling fetchAndSaveNews finished");
        // gets called every 2 hours.
        await deleteAllOldNews();
        console.log("calling deleteAllOldNews finished");
    } catch (error) {
        console.log(error);
    }
};
