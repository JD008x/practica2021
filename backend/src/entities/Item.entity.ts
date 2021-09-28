
import {  Entity, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Category } from './category.entity';
import { Location } from './location.entity';

@Entity()
export class Item {

    @PrimaryKey()
    _id!: ObjectId;

    @SerializedPrimaryKey()
    id!: string;

    @Property()
    name!: string;

    @Property()
    description!: string;

    
    @Property()
    category?: Category;
 
    @Property()
    modifiedAt!: Date;

    @Property()
    location?: Location;

    @Property()
    inventoryNumber!: string;

    @Property()
    creationDate!: Date;


    constructor(model?: Partial<Item>) {
        if (!model || !(model instanceof Object))
            model = <Item><any>{};


        this.name = model.name || "undefined";
        this.description = model.description || "undefined";
        this.category = model.category;
        this.modifiedAt = model.modifiedAt || new Date();
        this.location = model.location;
        this.inventoryNumber = model.inventoryNumber || "undefined";
        this.creationDate = model.creationDate || new Date();
    }

}


