import * as mongoose from "mongoose";
import ILocation from '../interfaces/ILocation';

const LocationSchema: mongoose.Schema = new mongoose.Schema(
    {
        id: { type: Number, required: true},
        name: { type: String, required: true},
        address: { type: String, required: true},
        phoneNumber: { type: Date }
    }
)

export default mongoose.model<ILocation>('Location', LocationSchema);
