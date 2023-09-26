import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Server } from "./app/index";
import express from "express";

const app = express();
(async () => {
    const connection = await createConnection();
    const port = 5000;
    const server = new Server(app, connection);
    server.start(port);
})();
