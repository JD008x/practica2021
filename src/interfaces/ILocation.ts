import { Document } from 'mongoose'

export default interface ILocation extends Document {
      idLocation: Number;
      name: String;
      address: String;
      phoneNumber: String;

}

