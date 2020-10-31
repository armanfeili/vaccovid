import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Server } from "./app/index";
import express from "express";
// import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
// import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
const app = express();

// async function _connectionToDatabase_1() {
//   try {
//     // const firstConnection: Connection = await createConnection('default');
//     // firstConnection;
//     const connectionToDB: Connection = await createConnection();
//     return { connectionToDB };
//   } catch (error) {
//     throw error;
//   }
// }

(async () => {
    // const firstConnection: Connection = await createConnection('db1-connection');
    // firstConnection;
    const red = await createConnection();

    // app.use('/api', createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }));
    // app.use(
    //     '/api',
    //     createProxyMiddleware({
    //         target: 'http://localhost:5000',
    //         changeOrigin: true,
    //     })
    // );

    // app.use('/api', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

    // const port = 8080;
    const port = 5000;

    const server = new Server(app, red);
    server.start(port);
})();
