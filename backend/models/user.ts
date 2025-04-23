import mongoose from 'mongoose';
import { IUser } from '../interfaces/user';

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: '-'
    },
    address: {
        type: String,
        required: false
    },
    phoneNo: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['SUPER_ADMIN', 'USER'],
        default: 'USER',
        required: true
    },
    gender: {
        type: String,
        required: false,
    },
    email: {
        unique: true,
        type: String,
        required: true
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
