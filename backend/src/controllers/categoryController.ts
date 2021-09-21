import { Category } from "../entities/category.entity";
import { EntityManager } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

export { getCategoryByname, saveCategory, getCatgeories, deleteCategory, updateCategory, getCategoryById };

async function getCatgeories(em: EntityManager): Promise<Error | Category[] | null> {
    if (!(em instanceof EntityManager))
        return Error("invalid request");

    try {
        const item = await em.find(Category, {})
        return item;
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

        return null;
    }
}

async function getCategoryByname(em: EntityManager, name: string): Promise<Error | Category | null> {
    if (!(em instanceof EntityManager))
        return Error("invalid request");


    try {
        const category = await em.findOne(Category, { name: name });
        return category;
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

        return null;
    }
}

async function saveCategory(em: EntityManager, category: Partial<Category>): Promise<Error | Category> {
    if (!(em instanceof EntityManager))
        return Error("invalid request");

    if (!category || typeof category !== "object")
        return Error("invalid params");

    try {
        const userExists = await em.findOne(Category, { id: category.id });
        if (userExists)
            return Error("item already exists");
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

    }

    const categoryModel = new Category({
        id: category.id,
        name: category.name,
        parent_category: category.parent_category,
    });

    try {
        await em.persistAndFlush([categoryModel]);

    } catch (ex) {
        if (ex instanceof Error)
            return ex;

    }

    return categoryModel;
}
async function getCategoryById(em: EntityManager, uid: string): Promise<Error | Category | null> {
    if (!(em instanceof EntityManager)) {
        return Error("invalid request");
    }

    try {
        // maybe make sure "uid" gets parsed properly to an "ObjectId" before making the request with "em.findOne(..)"
        const catId = new ObjectId(uid);
        const category = await em.findOne(Category, { _id: catId });
        return category;
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

        return null;
    }
}


async function deleteCategory(em: EntityManager, id: string): Promise<void | Error> {

    if (!(em instanceof EntityManager))
        return Error("invalid request");

    const category = await getCategoryById(em, id);

    if (!category)
        return Error("item not found");

    if (category instanceof Error)
        return Error("item not found");

    try {
        await em.removeAndFlush(category);
    } catch (ex) {
        if (ex instanceof Error)
            return ex;
    }

}


async function updateCategory(em: EntityManager, item: Category): Promise<Error | Category | null> {

    if (!(em instanceof EntityManager))
        return Error("invalid request");

    const id = item.id;

    const _item = await getCategoryById(em, id);

    if (!_item)
        return Error("item not found");

    if (_item instanceof Error)
        return Error("item not found");

    try {
        await em.nativeUpdate(Category, { id: id }, item)
        return item;
    } catch (ex) {
        if (ex instanceof Error)
            return ex;

        return null;
    }


}
