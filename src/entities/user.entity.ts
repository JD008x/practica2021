import { Entity, PrimaryKey, Property, Enum } from "@mikro-orm/core";
import { ObjectId } from '@mikro-orm/mongodb';

@Entity()
export class User {
  @PrimaryKey()
  id!: ObjectId;
  // @SerializedPrimaryKey()
  // id!: number;
  @Property()
  userName!: string;
  @Property()
  email!: string;
  @Property()
  password!: string;
  @Property()
  realName!: string;
  @Property()
  creationDate = new Date();
  @Enum(() => UserRole)
  role: UserRole;


  constructor(model?: Partial<User>) {
    if (!model || !(model instanceof Object))
      model = <User><any>{};


    this.userName = model.userName || "undefined";
    this.email = model.email || "undefined";
    this.password = model.password || "undefined";
    this.realName = model.realName || "undefined";
    this.creationDate = model.creationDate || new Date();
    this.role = model.role || UserRole.UNKNOWN;
  }
}
export enum UserRole {
  UNKNOWN = 'unknown',
  ADMIN = 'admin',
  USER = 'user'
}

