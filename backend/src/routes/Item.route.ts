import { Router, Response, NextFunction } from "express";
import { EntityManager } from "@mikro-orm/core";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as itemController from "../controllers/itemController";
import { Item } from "../entities/Item.entity";

export { setItemRoute };

function setItemRoute(router: Router): Router {
    router.get("/:inventoryNumber", getItem);
    router.post("/", postItem);
    router.get("/", getItems);
    router.delete("/:id", deleteItem)
    router.put("/", updateItem)
    router.get("/id/:id", getItemById);
    router.get("/name", getFilterByName);
    return router;
}
async function getFilterByName(req: IExpressRequest, res: Response, next: NextFunction) {

    if (!req.em || !(req.em instanceof EntityManager)) {
        return next(Error('EntityManager not available'));
    }

    let items: Error | string[] | null;
    try {
        items = await itemController.getItemsName(req.em);
    } catch (ex) {
        return next(ex);
    }

    if (items instanceof Error) {
        return next(items);
    }
    if (items === null) {
        return res.status(404).json(`Item with name '${req.params.name}' not found!`);
    }

    return res.json(items);

}

async function getItemById(req: IExpressRequest, res: Response, next: NextFunction) {

    if (!req.em || !(req.em instanceof EntityManager)) {
        return next(Error('EntityManager not available'));
    }

    let item: Error | Item | null;
    try {
        item = await itemController.getItemById(req.em, req.params.id);
    } catch (ex) {
        return next(ex);
    }

    if (item instanceof Error) {
        return next(item);
    }
    if (item === null) {
        return res.status(404).json(`Location with id '${req.params.id}' not found!`);
    }

    return res.json(item);

}

async function updateItem(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));
    let item: Error | Item | null;
    try {
        item = await itemController.updateItem(req.em, req.body);

    } catch (ex) {
        return next(ex);
    }
    if (item instanceof Error)

        return next(item);

    return res.status(201).json(item);
}


async function deleteItem(req: IExpressRequest, res: Response, next: NextFunction) {

    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));

    try {
        await itemController.deleteItem(req.em, req.params.id);

    } catch (ex) {
        return next(ex);

    }
    return res.status(202).end();
}

async function getItems(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));
    let items: Error | Item[] | null;

    try {
        items = await itemController.getItems(req.em);
        console.log(items);
    } catch (ex) {

        return next(ex);

    }
    if (items instanceof Error)
        return next(items);

    if (items === null)
        return res.status(404).end();

    return res.json(items);
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