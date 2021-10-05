import { Router, Response, NextFunction } from "express";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as emailController from "../controllers/emailController";

export { setEmailRoute };

function setEmailRoute(router: Router): Router {
      router.post("/", sendEmail);
      return router;
}
async function sendEmail(req: IExpressRequest, _res: Response, next: NextFunction) {
      try {
         emailController.sendEmail(req.body);
      } catch (ex) {
          console.log(ex);
          return next(ex);
      }
  
    
  }