import { Document } from 'mongoose'

export default interface ILocation extends Document {
      idLocation: number;
      name: String;
      address: String;
      phoneNumber: String;

}

