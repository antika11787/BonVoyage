import mongoose from "mongoose";

export type ISplit = {
  _id: mongoose.Schema.Types.ObjectId;
  transactionId: mongoose.Schema.Types.ObjectId;
  walletId: mongoose.Schema.Types.ObjectId;
  amount: number;
  adjustmentType: string;
};
