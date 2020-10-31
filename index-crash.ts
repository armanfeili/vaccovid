import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import express from 'express';

import { Express, Request, Response } from 'express';
import * as path from 'path';
import bodyParser from 'body-parser';

// import dotenv from 'dotenv';
// import passport from "passport";

import { AppRoutes } from './app/src/routes/index';
import { Fetcher } from './app/src/utils/fetch';

const app = express();

(async () => {
  const port = 5000;
  await createConnection('default');
  const server = new Server(app);
  server.start(port);
})();

class Server {
  private app: Express;

  constructor(app: Express) {
    this.app = app;

    this._connectionToDatabase_1();

    this.app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded -> parse the code from url
    this.app.use(bodyParser.json()); // parse application/json -> parse the code from json code

    //Start Fetcher
    //in this function we fetch data from covid19 npm every 30 min and fetch data from owid Json and update Database
    Fetcher();

    //Add routes
    AppRoutes(this.app);

    // https://expressjs.com/en/starter/static-files.html
    this.app.use(express.static(path.resolve('./') + '/build/client'));

    this.app.use(express.static(path.resolve('./') + '/build/frontend'));

    this.app.get('/api', (req: Request, res: Response): void => {
      res.send('You have reached the API!');
    });

    this.app.get('*', (req: Request, res: Response): void => {
      res.sendFile(path.resolve('./') + '/build/client/index.html');
    });
  }

  async _connectionToDatabase_1() {
    console.log('buji');

    // await createConnection('default');
    // try {
    //   const firstConnection: Connection = await createConnection();
    //   // firstConnection;
    //   // const connectionToDB: Connection = await createConnection(
    //   //   'db1-connection'
    //   // );
    //   //   const connections: Connection[] = await createConnections();

    //   return { firstConnection };
    // } catch (error) {
    //   throw error;
    // }
  }

  public start(port: number): void {
    this.app.listen(port, () =>
      console.log(`Server listening on port ${port}!`)
    );
  }
}
