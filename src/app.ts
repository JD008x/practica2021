import * as express from "express";
import * as bodyParser from "body-parser";
import router from "./routes/routes";

export { makeApp };

let app: express.Application;

async function makeApp(): Promise<express.Application> {
    if (app) return app;

    app = express();


    // middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(router);

    const mongoose = require('mongoose');

    await mongoose.connect('mongodb+srv://RaresOnescu:w5570SIo0zomycYr@waters.kco3w.mongodb.net/test');


    return app;
}
