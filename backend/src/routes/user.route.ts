import { Router, Response, NextFunction } from "express";
import { EntityManager } from "@mikro-orm/core";
import { User } from "../entities/user.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as userController from "../controllers/userController";

export { setUserRoute };

function setUserRoute(router: Router): Router {
    router.get("/:userName", getUser);
    router.post("/", postUser);
    router.get("/", getUsers );
    router.delete("/:id", deleteUser)
    router.put("/", updateUser)

    return router;
}

async function getUsers(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));
    let users: Error | User[] | null;
    try {
        users = await userController.getUsers(req.em);
        console.log(users);
    } catch (ex) {

        return next(ex);

    }
    if (users instanceof Error)
        return next(users);

    if (users === null)
        return res.status(404).end();

    return res.json(users);
}


async function getUser(req: IExpressRequest, res: Response, next: NextFunction) {

    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));

    let user: Error | User | null;
    try {
        user = await userController.getUserByUserName(req.em, req.params.userName);
        console.log(user);
    } catch (ex) {

        return next(ex);

    }

    if (user instanceof Error)
        return next(user);

    if (user === null)
        return res.status(404).end();

    return res.json(user);
}

async function postUser(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));

    let user: Error | User;

    try {
        const bcrypt = require('bcrypt');
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hashedPassword;

        user = await userController.saveUser(req.em, req.body);
    } catch (ex) {
        return next(ex);
    }
    if (user instanceof Error)

        return next(user);

    return res.status(201).json(user);
}



async function updateUser(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));
    let user: Error | User | null;
    try {
        user = await userController.updateUser(req.em, req.body);

    } catch (ex) {
        return next(ex);
    }
    if (user instanceof Error)

        return next(user);

    return res.status(201).json(user);
}

async function deleteUser(req: IExpressRequest, res: Response, next: NextFunction) {

    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));
    try {
        await userController.deleteUser(req.em, req.params.id);

    } catch (ex) {
        return next(ex);

    }
    return res.status(202).end();
}