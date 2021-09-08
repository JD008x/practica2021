import { Router, Response, NextFunction } from "express";
import { EntityManager } from "@mikro-orm/core";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as itemController from "../controllers/itemController";
import { Item } from "../entities/Item.entity";

export { setItemRoute };

function setItemRoute(router: Router): Router {
    router.get("/:userName", getItem);
    router.post("/", postItem);

    return router;
}
async function getItem(req: IExpressRequest, res: Response, next: NextFunction) {

    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));

    console.log(req.params);
    let item: Error | Item | null;
    try {
        item = await itemController.getItemByInventoryNumber(req.em, req.params.inventoryNumber);
        console.log(item);
    } catch (ex) {

        return next(ex);

    }

    if (item instanceof Error)
        return next(item);

    if (item === null)
        return res.status(404).end();

    return res.json(item);
}
async function postItem(req: IExpressRequest, res: Response, next: NextFunction) {
    // console.log(req.body);
    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));

    let item: Error | Item;


    try {
        item = await itemController.saveItem(req.em, req.body);
    } catch (ex) {
        return next(ex);
    }

    if (item instanceof Error)

        return next(item);

    return res.status(201).json(item);
}