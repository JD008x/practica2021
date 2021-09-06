import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/IUser';

const UserSchema: Schema = new Schema(
    {
        id: { type: Number, required: true},
        userName: { type: String, required: true},
        email: { type: String, required: true},
        password: { type: String, required: true},
        realName: { type: String, required: true},
        creationDate: { type: Date },
        role: { type: String, required: true},
    }
)

export default mongoose.model<IUser>('User', UserSchema);