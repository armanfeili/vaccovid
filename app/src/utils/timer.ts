import { Fetcher } from "./fetch";
import {
    firstTimeFetchAndSaveNews,
    firstTimeFetchNewsImages,
    fetchAndSaveNewsImages,
    deleteAllOldNews,
    fetchAndSaveNews,
} from "./newsData";
import { updateProvinces } from "./covidAPIData";
import { updateDailyOwid } from "./ovidData";

export const timers = () => {
    console.log("Load Timer");
    //Start Fetcher
    //in this function we fetch data from covid19 npm every 30 min and fetch data from owid Json and update Database
    Fetcher();
    //countries
    updateProvinces();
    //update Owid
    updateDailyOwid();
    // gets called once and fetch and save data into DB
    firstTimeFetchAndSaveNews();
    firstTimeFetchNewsImages();
    // gets called every 2 hours.
    fetchAndSaveNews();
    fetchAndSaveNewsImages();
    deleteAllOldNews();
};
