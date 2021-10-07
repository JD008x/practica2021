import { Item } from "../entities/Item.entity";
import { EntityManager } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
//import * as categoryController from "../controllers/categoryController";



export { getItemByInventoryNumber, getItemById, saveItem, getItems, deleteItem, updateItem, getItemsName };

async function getItems(em: EntityManager, orderByProp: string, orderByDirection: "asc" | "desc", categoryId: string): Promise<Error | Item[] | null> {
    if (!(em instanceof EntityManager))
        return Error("invalid request");

    try {
        console.log("categoryId", categoryId)

        const items = await em.find(Item,
            categoryId && categoryId === "all" ? {} :  { 'category.id' : categoryId },
            { orderBy: orderByDirection ? { [orderByProp]: orderByDirection } : {}
        })
        console.log("items", items.length)

        if (orderByDirection) {
            const sorted = items.sort((a, b) => {
                console.log("tip", typeof b[orderByProp], b[orderByProp]);

                if (typeof b[orderByProp] === "string") {
                    return (b[orderByProp] as string).localeCompare(a[orderByProp] as string);
                }

                if (typeof b[orderByProp] === "object") {
                    return new Date(a[orderByProp]) > new Date(b[orderByProp]) ? -1 : 1;
                }

                return -1;
            })
            return orderByDirection === "desc" ? sorted : sorted.reverse();
        }

        return items;
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

        return null;
    }
}

async function getItemsName(em: EntityManager): Promise<Error | string[] | null> {
    if (!(em instanceof EntityManager))
        return Error("invalid request");

    try {
        const item = await em.find(Item.name, '...', { fields: ['name'] })
        return item;
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

        return null;
    }
}

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

async function getItemById(em: EntityManager, uid: string): Promise<Error | Item | null> {
    if (!(em instanceof EntityManager)) {
        return Error("invalid request");
    }

    try {
        // maybe make sure "uid" gets parsed properly to an "ObjectId" before making the request with "em.findOne(..)"
        const objId = new ObjectId(uid);
        const item = await em.findOne(Item, { _id: objId });
        return item;
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

        return null;
    }
}

async function deleteItem(em: EntityManager, id: string): Promise<void | Error> {

    if (!(em instanceof EntityManager))
        return Error("invalid request");

    const item = await getItemById(em, id);

    if (!item)
        return Error("item not found");

    if (item instanceof Error)
        return Error("item not found");

    try {
        await em.removeAndFlush(item);
    } catch (ex) {
        if (ex instanceof Error)
            return ex;
    }

}


async function updateItem(em: EntityManager, item: Item): Promise<Error | Item | null> {

    if (!(em instanceof EntityManager))
        return Error("invalid request");


    const id = item.id;

    const _item = await getItemById(em, id);

    if (!_item)
        return Error("item not found");

    if (_item instanceof Error)
        return Error("item not found");

    try {
        await em.nativeUpdate(Item, { id: id }, item)
        return item;
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

        return null;
    }

}

