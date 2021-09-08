import { Router, Response, NextFunction } from "express";
import { EntityManager } from "@mikro-orm/core";
import { User } from "../entities/user.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as userController from "../controllers/userController";

export { setUserRoute };

function setUserRoute(router: Router): Router {
      router.get("/:userName", getUser);
      router.post("/", postUser);
  
      return router;
  }
  async function getUser(req: IExpressRequest, res: Response, next: NextFunction) {
      
      if (!req.em || !(req.em instanceof EntityManager))
          return next(Error("EntityManager not available"));
       
          console.log(req.params);
      let user: Error | User | null;
      try {
          user = await userController.getUserByUserName(req.em,  req.params.userName );
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
   // console.log(req.body);
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