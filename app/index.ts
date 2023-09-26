import { Express, Request, Response } from "express";
import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import cors from 'cors';
import { AppRoutes } from "./src/routes/index";

export class Server {
    private app: Express;

    constructor(app: Express, red: any) {
        this.app = app;
        this.app.use(cors());

        this.app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded -> parse the code from url
        this.app.use(bodyParser.json()); // parse application/json -> parse the code from json code
        AppRoutes(this.app);

        // *********************************************** //
        // for both production and development uncomment
        this.app.use("/", express.static("./client/build"));
        // *********************************************** //
        app.use(express.static("../client/build"));
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname + "/../../", "client", "build", "index.html"));
        });
        // *********************************************** //
        if (process.env.NODE_ENV === "production") {
            console.log("oops");
            console.log(process.env.NODE_ENV);

            app.use(express.static("../client/build"));
            app.get("*", (req, res) => {
                res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
            });
        } 
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }
}
