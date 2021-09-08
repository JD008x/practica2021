import { Router, Response, NextFunction } from "express";
import { EntityManager } from "@mikro-orm/core";
import { Category } from "../entities/category.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as categoryController from "../controllers/categoryController";

export { setCategoryRoute };

function setCategoryRoute(router: Router): Router {
      router.get("/:name", getCategory);
      router.post("/", postCategory);
  
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