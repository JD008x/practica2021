import { Router, Response, NextFunction } from "express";
import { EntityManager } from "@mikro-orm/core";
import { Location } from "../entities/location.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as locationController from "../controllers/locationController";


export { setLocationRoute };

function setLocationRoute(router: Router): Router {
    router.get("/:name", getLocation);
    router.get("/id/:id", getLocationById);
    router.get("/", getLocations);
    router.post("/", postLocation);
    router.put("/", updateLocation);
    router.delete("/:id", deleteLocation);
    router.get("/name/:name", getLocationByName)

    return router;
}
async function getLocation(req: IExpressRequest, res: Response, next: NextFunction) {

    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));

    let location: Error | Location | null;
    try {
        location = await locationController.getLocationByName(req.em, req.params.name);
    } catch (ex) {

        return next(ex);

    }

    if (location instanceof Error)
        return next(location);

    if (location === null)
        return res.status(404).end();

    return res.json(location);
}
async function postLocation(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));

    let location: Error | Location;


    try {
        location = await locationController.saveLocation(req.em, req.body);
    } catch (ex) {
        return next(ex);
    }

    if (location instanceof Error)

        return next(location);

    return res.status(201).json(location);
}



  async function getLocationByName(req: IExpressRequest, res: Response, next: NextFunction) {

    if (!req.em || !(req.em instanceof EntityManager)) {
        return next(Error('EntityManager not available'));
    }

    console.log(req.params);
    let location: Error | Location | null;
    try {
        location = await locationController.getLocationByName(req.em, req.params.name);
        console.log(location);
    } catch (ex) {
        return next(ex);
    }

    if (location instanceof Error) {
        return next(location);
    }
    if (location === null) {
        return res.status(404).json(`Location with name '${req.params.name}' not found!`);
    }

    return res.json(location);

}

  async function getLocationById(req: IExpressRequest, res: Response, next: NextFunction) {


    if (!req.em || !(req.em instanceof EntityManager)) {
        return next(Error('EntityManager not available'));
    }
    let location: Error | Location | null;
    try {
        location = await locationController.getLocationById(req.em, req.params.id);
    } catch (ex) {
        return next(ex);
    }

    if (location instanceof Error) {
        return next(location);
    }
    if (location === null) {
        return res.status(404).json(`Location with id '${req.params.id}' not found!`);
    }

    return res.json(location);

}

async function updateLocation(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));
    let location: Error | Location | null;
    try {
        location = await locationController.updateLocation(req.em, req.body);

    } catch (ex) {
        return next(ex);
    }
    if (location instanceof Error)
        return next(location);

    return res.status(201).json(location);
}


async function deleteLocation(req: IExpressRequest, res: Response, next: NextFunction) {

    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));

    try {
        await locationController.deleteLocation(req.em, req.params.id);

    } catch (ex) {
        return next(ex);

    }
    return res.status(202).end();
}


async function getLocations(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));
    let locations: Error | Location[] | null;
    //let item: Error | Item | null;
    try {
        locations = await locationController.getLocations(req.em);
    } catch (ex) {

        return next(ex);

    }
    if (locations instanceof Error)
        return next(locations);

    if (locations === null)
        return res.status(404).end();

    return res.json(locations);
}