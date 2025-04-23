import mongoose from "mongoose";
import { IUser } from "../interfaces/user";
import { Request } from "express";

export type IAuth = {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    userId : IUser | mongoose.Schema.Types.ObjectId;
    resetPasswordStatus: boolean;
    resetPasswordExpires: Date;
    resetPasswordToken: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthRequest extends Request {
    user?: IUser | null;
}



