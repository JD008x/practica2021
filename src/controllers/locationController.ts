import { Location } from "../entities/location.entity";
import { EntityManager } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

export { getLocationByName, saveLocation, getLocationById };


async function getLocationByName(em: EntityManager, name: string): Promise<Error | Location | null> {
    if (!(em instanceof EntityManager))
        return Error("invalid request");


    try {
        const location = await em.findOne(Location, { name: name });
        return location;
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

        return null;
    }
}

async function saveLocation(em: EntityManager, location: Partial<Location>): Promise<Error | Location> {
    if (!(em instanceof EntityManager))
        return Error("invalid request");

    if (!location || typeof location !== "object")
        return Error("invalid params");

    try {
        const locationExists = await em.findOne(Location, { id: location.id });
        if (locationExists)
            return Error("item already exists");
    } catch (ex) {
        if (ex instanceof Error)
            return ex;


    }

    const locationModel = new Location({
        id: location.id,
        name: location.name,
        address: location.address,
        telNumber: location.telNumber
    });

    try {
        await em.persistAndFlush([locationModel]);

    } catch (ex) {
        if (ex instanceof Error)
            return ex;

    }

      return locationModel;
  }
  async function getLocationById(em: EntityManager, uid: string): Promise<Error | Location | null> {
    if (!(em instanceof EntityManager)) {
        return Error("invalid request");
    }

    try {
        // maybe make sure "uid" gets parsed properly to an "ObjectId" before making the request with "em.findOne(..)"
        const objId = new ObjectId(uid);
        const location = await em.findOne(Location, { id: objId });
        return location;
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

        return null;
    }

}
