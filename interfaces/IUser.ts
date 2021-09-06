import { Document } from 'mongoose'

export default interface IUser extends Document {
      id: Number;
      userName: String;
      email: String;
      password: String;
      realName: String;
      creationDate: Date;
      role: String;

}