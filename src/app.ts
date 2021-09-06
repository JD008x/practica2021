import * as express from "express";
import * as bodyParser from "body-parser";

export { makeApp };

let app: express.Application;

async function makeApp(): Promise<express.Application> {
    if (app) return app;

    app = express();

    // middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    return app;
}