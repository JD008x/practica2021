import { Entity, PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

@Entity()
export class Category {
  @PrimaryKey()
  _id!: ObjectId;
  @SerializedPrimaryKey()
  id!: string;
  @Property()
  name!: string;
  @Property()
  parent_category?: Category;

  constructor(model?: Partial<Category>) {
    if (!model || !(model instanceof Object))
      model = <Category><any>{};

    this.name = model.name || "undefined";
    this.parent_category = model.parent_category;
  }
}

