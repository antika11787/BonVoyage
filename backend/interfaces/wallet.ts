import mongoose from "mongoose";
export type IWallet = {
  _id: mongoose.Schema.Types.ObjectId;
  balance: number;
  userId?: mongoose.Schema.Types.ObjectId;
  tourId?: mongoose.Schema.Types.ObjectId;
};
