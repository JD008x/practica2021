import { User} from "../entities/user.entity";
import { EntityManager } from "@mikro-orm/core";

export { getUserByUserName, saveUser };
      
      
async function getUserByUserName(em: EntityManager, userName: string): Promise<Error | User | null> {
      if (!(em instanceof EntityManager))
          return Error("invalid request");
  
  
    try {
        const user = await em.findOne(User, { userName: userName });
        return user;
      } catch (ex) {
          if(ex instanceof Error)
          return ex;
          
          return null;
      }
}
  
  async function saveUser(em: EntityManager, user: Partial<User>): Promise<Error | User> {
      if (!(em instanceof EntityManager))
          return Error("invalid request");
  
      if (!user || typeof user !== "object")
          return Error("invalid params");
  
      try {
          const userExists = await em.findOne(User, { id: user.id });
          if (userExists)
              return Error("item already exists");
      } catch (ex) {
          if(ex instanceof Error)
          return ex;
          
          
      }
  
      const userModel = new User({
            id: user.id,
            userName: user.userName,
            email: user.email,
            password: user.password,
            realName: user.realName,
            creationDate : user.creationDate,
            role: user.role
         
      });
  
      try {
          await em.persistAndFlush([userModel]);
         
      } catch (ex) {
          if(ex instanceof Error)
          return ex;
          
      }
  
      return userModel;
  }