import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectId } from "mongodb";

@Entity()
export class Location{
    @PrimaryKey()
    id!: ObjectId;
    @Property()
    name!: string;
    @Property()
    address!: string;
    @Property()
    telNumber!: string;

  constructor(model?: Partial<Location>) {
    if (!model || !(model instanceof Object))
      model = <Location><any>{};

    this.name = model.name || "undefined";
    this.address = model.address || "undefined";
    this.telNumber = model.telNumber || "undefined";
  }
}


