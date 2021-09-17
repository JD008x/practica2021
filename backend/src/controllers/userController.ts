import { User} from "../entities/user.entity";
import { EntityManager } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

export { getUserByUserName, saveUser, getUsers, getUserById, updateUser, deleteUser };
      
      
async function getUsers(em: EntityManager): Promise<Error | User[] | null> {
    if (!(em instanceof EntityManager))
        return Error("invalid request");

    try {
        const users = await em.find(User, {})
        return users;
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

        return null;
    }
}

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

  async function getUserById(em: EntityManager, uid: string): Promise<Error | User | null> {
    if (!(em instanceof EntityManager)) {
        return Error("invalid request");
    }

    try {
        const userId = new ObjectId(uid);
        const user = await em.findOne(User, {_id: userId});
        return user;
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

        return null;
    }
}

async function deleteUser(em: EntityManager, id: string): Promise<void | Error> {

    if (!(em instanceof EntityManager))
        return Error("invalid request");

    const user = await getUserById(em, id);

    if (!user)
        return Error("item not found");

    if (user instanceof Error)
        return Error("item not found");

    try {
        await em.removeAndFlush(user);
    } catch (ex) {
        if (ex instanceof Error)
            return ex;
    }

}

async function updateUser(em: EntityManager, user: User): Promise<Error | User | null> {

    if (!(em instanceof EntityManager))
        return Error("invalid request");

    const id = user.id;

    const _user = await getUserById(em, id);

    if (!_user)
        return Error("item not found");

    if (_user instanceof Error)
        return Error("item not found");

    try {
        await em.nativeUpdate(User, { id: id }, user)
        return user;
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

        return null;
    }
}
