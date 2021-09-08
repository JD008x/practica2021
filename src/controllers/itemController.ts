import { Item } from "../entities/Item.entity";
import { EntityManager } from "@mikro-orm/core";

export { getItemByInventoryNumber, saveItem };


async function getItemByInventoryNumber(em: EntityManager, inventoryNumber: string): Promise<Error | Item | null> {
    if (!(em instanceof EntityManager))
        return Error("invalid request");


    try {
        const item = await em.findOne(Item, { inventoryNumber: inventoryNumber });
        return item;
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

        return null;
    }
}

async function saveItem(em: EntityManager, item: Partial<Item>): Promise<Error | Item> {
    if (!(em instanceof EntityManager))
        return Error("invalid request");

    if (!item || typeof item !== "object")
        return Error("invalid params");

    try {
        const itemExists = await em.findOne(Item, { id: item.id });
        if (itemExists)
            return Error("item already exists");
    } catch (ex) {
        if (ex instanceof Error)
            return ex;


    }

    const itemModel = new Item({
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        modifiedAt: item.modifiedAt,
        location: item.location,
        inventoryNumber: item.inventoryNumber,
        creationDate: item.creationDate
    });

    try {
        await em.persistAndFlush([itemModel]);

    } catch (ex) {
        if (ex instanceof Error)
            return ex;

    }

    return itemModel;
}