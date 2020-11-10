// export everything

import { Express, Request, Response } from "express";
import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import cors from 'cors';
// import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

// import dotenv from 'dotenv';
// import passport from "passport";

import { AppRoutes } from "./src/routes/index";
import { timers } from "./src/utils/timer";

export class Server {
    private app: Express;

    constructor(app: Express, red: any) {
        this.app = app;
        this.app.use(cors());

        this.app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded -> parse the code from url
        this.app.use(bodyParser.json()); // parse application/json -> parse the code from json code

        // //timer
        // timers();

        //Add routes
        AppRoutes(this.app);

        // app.use('/', createProxyMiddleware({ target: 'http://localhost:5000/', changeOrigin: true }));

        // https://expressjs.com/en/starter/static-files.html
        // this.app.use(express.static(path.resolve("./") + "/build/client"));

        // *********************************************** //
        // for development uncomment

        // this.app.use(express.static(path.resolve("./") + "/client/build"));

        // this.app.get("/api", (req: Request, res: Response): void => {
        //     res.send("You have reached the API!");
        // });

        // *********************************************** //
        // for both production and development uncomment
        this.app.use("/", express.static("./client/build"));
        // *********************************************** //

        // this.app.get("*", (req: Request, res: Response): void => {
        //     res.sendFile(path.resolve("./") + "/client/build/");
        // });

        // console.log(process.env.NODE_ENV);

        // *********************************************** //
        // for production uncomment

        // Set static folder
        app.use(express.static("../client/build"));
        // creating our route
        // here, we want to get anything that is not our api route, (not like: '/api/profile')
        app.get("*", (req, res) => {
            // for sending file , we need to add path module which is a built-in node module
            // __dirname is the current directory
            console.log(__dirname + "/../../");

            res.sendFile(path.resolve(__dirname + "/../../", "client", "build", "index.html"));
        });
        // *********************************************** //

        // Server static assets if in production
        if (process.env.NODE_ENV === "production") {
            console.log("oops");
            console.log(process.env.NODE_ENV);

            // Set static folder
            app.use(express.static("../client/build"));
            // creating our route
            // here, we want to get anything that is not our api route, (not like: '/api/profile')
            app.get("*", (req, res) => {
                // for sending file , we need to add path module which is a built-in node module
                // __dirname is the current directory
                res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
            });
        }
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }
}
