import { Request } from "express";
import { EntityManager } from "@mikro-orm/core";

export interface IExpressRequest extends Request {
    em?: EntityManager;
}