import mongoose from 'mongoose';
import { IAuth } from '../interfaces/auth';

const authSchema = new mongoose.Schema<IAuth>({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    resetPasswordStatus: {
        type: Boolean,
        default: false
    },
    resetPasswordExpires: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: {
        type: String,
        default: ''
    },
}, {
    timestamps: true
});

const Auth = mongoose.model('Auth', authSchema);
export default Auth;