import { Entity, SerializedPrimaryKey, PrimaryKey, Property, Enum } from "@mikro-orm/core";
import { ObjectId } from "mongodb";

@Entity()
export class User{
      @PrimaryKey()
      _id!: ObjectId;
      @SerializedPrimaryKey()
      id!: string;
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



      constructor( id: string,userName: string, email: string, password: string, realName: string, creationDate = new Date(), role: UserRole){
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.realName = realName;
        this.creationDate = creationDate;
        this.role = role;
    }
}
export enum UserRole {
      ADMIN = 'admin',
      USER = 'user'
    }

