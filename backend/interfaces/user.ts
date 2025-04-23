import mongoose from "mongoose";
export type IUser = {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    profilePic: string;
    address: string;
    phoneNo: string;
    role: string;
    gender: string;
}