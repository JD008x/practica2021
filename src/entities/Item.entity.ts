
import { Cascade, Entity, ManyToOne, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
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

    @ManyToOne(() => Category, { cascade: [Cascade.PERSIST, Cascade.REMOVE] })
    category!: Category;

    @Property()
    modifiedAt!: Date;

    @ManyToOne(() => Location, { cascade: [Cascade.PERSIST, Cascade.REMOVE] })
    location!: Location;

    @Property()
    inventoryNumber!: string;

    @Property()
    creationDate!: Date;


    constructor(model?: Partial<Item>) {
        if (!model || !(model instanceof Object))
            model = <Item><any>{};


        this.name = model.name || "undefined";
        this.description = model.description || "undefined";
        this.category = model.category || new Category();
        this.modifiedAt = model.modifiedAt || new Date();
        this.location = model.location || new Location();
        this.inventoryNumber = model.inventoryNumber || "undefined";
        this.creationDate = model.creationDate || new Date();
    }

}


