import { fetch_npmData } from "./fetch";
import { fetchAndSaveWhoAndOtherNews, deleteAllOldNews } from "./newsData";
import { updateProvinces, addDailyReports } from "./covidAPIData";
import { updateOwid } from "./ovidData";
// import { downloadAndConvertOwidData, updateOwid } from "./ovidData";
import { convertVaccineData, updateVaccine } from "./vaccineAndTreatment";

export const timers = async () => {
    try {
        console.log("Load Timer");
        // initial fetching
        await fetch_npmData();
        console.log("calling fetch_npmData is finished");
        setTimeout(async () => { 
            await updateProvinces();
            console.log("calling updateProvinces is finished");
        }, 1 * 1 * 60 * 1000); // after 1 minute
        setTimeout(async () => { 
            await addDailyReports();
            console.log("calling addDailyReports is finished");
        }, 1 * 2 * 60 * 1000); // after 2 minute
        // setTimeout(async () => { 
        //     await downloadAndConvertOwidData();
        //     console.log("calling downloadAndConvertOwidData is finished");
        // }, 1 * 3 * 60 * 1000); // after 3 minute
        setTimeout(async () => { 
            await fetchAndSaveWhoAndOtherNews();
            console.log("calling fetchAndSaveWhoAndOtherNews is finished");
        }, 1 * 4 * 60 * 1000); // after 4 minute
        
        setInterval(async () => {
            await fetch_npmData();
            console.log("calling fetch_npmData is finished");
        }, 1 * 5 * 60 * 1000); // Min * Sec * Ms - every 5 minutes 
        
        setTimeout(async () => {  
            await deleteAllOldNews();
            console.log("calling deleteAllOldNews is finished");
        }, 1 * 6 * 60 * 1000); // after 6 minute
        setTimeout(async () => { 
            await convertVaccineData();
            console.log("calling convertVaccineData is finished");
        }, 1 * 7 * 60 * 1000); // after 7 minute
        
        setTimeout(async () => { 
            await updateVaccine();
            console.log("calling updateVaccine is finished");
        }, 1 * 8 * 60 * 1000); // after 8 minute
        setTimeout(async () => { 
            await updateOwid();
            console.log("calling updateOwid is finished");
        }, 1 * 9 * 60 * 1000); // after 9 minute
    

        setInterval(async () => {
            setTimeout(async () => { 
                await addDailyReports();
                console.log("calling addDailyReports is finished");
            }, 1 * 1 * 60 * 1000); // after 1 minute
            
            // setTimeout(async () => { 
            //     await downloadAndConvertOwidData();
            //     console.log("calling downloadAndConvertOwidData is finished");
            // }, 1 * 3 * 60 * 1000); // after 2 minute
            
            setTimeout(async () => {
                await updateOwid();
                console.log("calling updateOwid is finished");
            }, 1 * 6 * 60 * 1000); // after 4 minutes
        }, 11 * 60 * 60 * 1000); // Min * Sec * Ms - 2 times a day 

        setInterval(async () => {
            setTimeout(async () => {
                await convertVaccineData();
                console.log("calling convertVaccineData is finished");
            }, 1 * 1 * 60 * 1000); // after 1 minutes
            setTimeout(async () => {
                await updateVaccine();
                console.log("calling updateVaccine is finished");
            }, 1 * 3 * 60 * 1000); // after 3 minutes
        }, 17 * 60 * 60 * 1000); // Min * Sec * Ms - every 17 hours 

        setInterval(async () => {
            setTimeout(async () => {
                await fetchAndSaveWhoAndOtherNews();
                console.log("calling fetchAndSaveWhoAndOtherNews is finished");
            }, 1 * 3 * 60 * 1000); // after 3 minutes
        }, 13 * 60 * 60 * 1000); // Min * Sec * Ms - every 7 hours

        setInterval(async () => {
            setTimeout(async () => {
                await deleteAllOldNews();
                console.log("calling deleteAllOldNews is finished");
            }, 1 * 3 * 60 * 1000); // after 3 minutes
        }, 3 * 23 * 60 * 60 * 1000); // Min * Sec * Ms - every 2.5 days 

    } catch (error) {
        console.log(error);
    }
};
