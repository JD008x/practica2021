import { Router, Response, NextFunction } from "express";
import { EntityManager } from "@mikro-orm/core";
import { Category } from "../entities/category.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as categoryController from "../controllers/categoryController";

export { setCategoryRoute };

function setCategoryRoute(router: Router): Router {
    router.get("/:name", getCategory);
    router.post("/", postCategory);
    router.get("/", getCatgeories);
    router.delete("/:id", deleteCategory)
    router.put("/", updateCategory)
    return router;
  }
  async function getCategory(req: IExpressRequest, res: Response, next: NextFunction) {
      
      if (!req.em || !(req.em instanceof EntityManager))
          return next(Error("EntityManager not available"));
       
          console.log(req.params);
      let user: Error | Category | null;
      try {
          user = await categoryController.getCategoryByname(req.em,  req.params.name );
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
async function postCategory(req: IExpressRequest, res: Response, next: NextFunction) {
   // console.log(req.body);
    if (!req.em || !(req.em instanceof EntityManager))
          return next(Error("EntityManager not available"));
  
    let category: Error | Category;
    

      try {
          category = await categoryController.saveCategory(req.em, req.body);
      } catch (ex) {
          return next(ex);
      }
   
 if (category instanceof Error) 
          
          return next(category);
  
      return res.status(201).json(category);
  }

  async function updateCategory(req: IExpressRequest, res: Response, next: NextFunction) {

    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));
    let item: Error | Category | null;
    try {
        item = await categoryController.updateCategory(req.em, req.body);

    } catch (ex) {
        return next(ex);
    }
    if (item instanceof Error)

        return next(item);

    return res.status(201).json(item);
}

async function deleteCategory(req: IExpressRequest, res: Response, next: NextFunction) {

    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));

    try {
        await categoryController.deleteCategory(req.em, req.params.id);

    } catch (ex) {
        return next(ex);

    }
    return res.status(202).end();
}

async function getCatgeories(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.em || !(req.em instanceof EntityManager))
        return next(Error("EntityManager not available"));
    let items: Error | Category[] | null;
    try {
        items = await categoryController.getCatgeories(req.em);
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