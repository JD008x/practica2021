import * as mongoose from "mongoose";
import ILocation from '../interfaces/ILocation';

const LocationSchema: mongoose.Schema = new mongoose.Schema(
    {
        id: { type: Number, required: true},
        nume: { type: String, required: true},
        adresa: { type: String, required: true},
        nrTelefon: { type: Date }
    }
)

export default mongoose.model<ILocation>('Location', LocationSchema);
