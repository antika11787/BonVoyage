import mongoose from "mongoose";
export type ITour = {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  status: string;
  startDate: Date;
  endDate: Date;
  place: string;
  type: string;
  estimatedBudget: number;
  tourWalletId: mongoose.Schema.Types.ObjectId;
  leaderId: mongoose.Schema.Types.ObjectId;
  transactionCategoryIds: mongoose.Schema.Types.ObjectId[];
  tags: string[];
};
