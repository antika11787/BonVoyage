import mongoose from "mongoose";

export type IPaidBy = {
  walletId: mongoose.Schema.Types.ObjectId;
  amount: number;
};
export type ITransaction = {
  _id: mongoose.Schema.Types.ObjectId;
  tourId: mongoose.Schema.Types.ObjectId;
  amount: number;
  title: string;
  description?: string;
  paidBy: [IPaidBy];
  transactionCategoryId: mongoose.Schema.Types.ObjectId;
  splitType: string;
  custom?: [IPaidBy];
};
