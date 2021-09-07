import { Document } from 'mongoose'

export default interface ILocation extends Document {
      idLocation: Number;
      nume: String;
      adresa: String;
      nrTelefon: String;

}

