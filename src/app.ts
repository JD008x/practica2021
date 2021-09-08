import * as express from "express";
import * as bodyParser from "body-parser";
import { setUserRoute } from "./routes/user.route";
import { setLocationRoute } from "./routes/location.route";
import { env } from "./env";
import  entities from "./entities/";
import { IExpressRequest } from "./interfaces/IExpressRequest";
import { IExpressError } from "./interfaces/IExpressError";
import {ReflectMetadataProvider, MikroORM} from "@mikro-orm/core";
import { MongoDriver } from '@mikro-orm/mongodb';
import { setCategoryRoute } from "./routes/category.route";


export { makeApp };

let app: express.Application;

async function makeApp(): Promise<express.Application> {
    if (app) return app;

    app = express();
    const orm = await MikroORM.init<MongoDriver>({
        metadataProvider: ReflectMetadataProvider,
        cache: { enabled: false },
        entities: entities,
        dbName: env.DB_NAME,
        clientUrl: env.MONGO_URL,
        type: "mongo"
    });
// make the entity manager available in request
app.use((req: IExpressRequest, _res: express.Response, next: express.NextFunction) => {
    req.em = orm.em.fork();
    next();
});
    // middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // app.use(router);
    app.use(env.USER_ROUTE, setUserRoute(express.Router()));
    app.use(env.CATEGORY_ROUTE, setCategoryRoute(express.Router()));
    app.use(env.LOCATION_ROUTE, setLocationRoute(express.Router()));

// 404
app.use((_req: express.Request, _res: express.Response, next: express.NextFunction) => {
    const err = new Error("Not Found") as IExpressError;
    err.status = 404;
    next(err);
});

// 500
app.use((err: IExpressError, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(err.status || 500).send(env.NODE_ENV === "development" ? err : {});
});

    return app;
}
