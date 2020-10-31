// export everything

import { Express, Request, Response } from "express";
import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
// import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

// import dotenv from 'dotenv';
// import passport from "passport";

import { AppRoutes } from "./src/routes/index";
import { Fetcher } from "./src/utils/fetch";
import {
    firstTimeFetchAndSaveNews,
    firstTimeFetchNewsImages,
    fetchAndSaveNewsImages,
    deleteAllOldNews,
    fetchAndSaveNews,
} from "./src/utils/newsData";
import { updateProvinces } from "./src/utils/covidAPIData";

export class Server {
    private app: Express;

    constructor(app: Express, red: any) {
        this.app = app;

        this.app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded -> parse the code from url
        this.app.use(bodyParser.json()); // parse application/json -> parse the code from json code

        // red;
        //Start Fetcher
        //in this function we fetch data from covid19 npm every 30 min and fetch data from owid Json and update Database
        // Fetcher();

        //countries
        // updateProvinces();

        // gets called once and fetch and save data into DB
        // firstTimeFetchAndSaveNews();
        // firstTimeFetchNewsImages();

        // gets called every 2 hours.
        fetchAndSaveNews();
        // fetchAndSaveNewsImages();
        // deleteAllOldNews();

        //Add routes
        AppRoutes(this.app);

        // app.use('/', createProxyMiddleware({ target: 'http://localhost:5000/', changeOrigin: true }));

        // https://expressjs.com/en/starter/static-files.html
        this.app.use(express.static(path.resolve("./") + "/build/client"));

        this.app.use(express.static(path.resolve("./") + "/build/frontend"));

        this.app.get("/api", (req: Request, res: Response): void => {
            res.send("You have reached the API!");
        });

        this.app.get("*", (req: Request, res: Response): void => {
            res.sendFile(path.resolve("./") + "/build/client/index.html");
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }
}
