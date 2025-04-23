import mongoose from "mongoose";
export type ITourMember = {
    _id: mongoose.Schema.Types.ObjectId;
    tourId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    role: string;
    walletId: mongoose.Schema.Types.ObjectId;
}