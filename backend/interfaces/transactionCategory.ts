import mongoose from "mongoose";
export type ITransactionCategory = {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  icon: string;
  color: string;
  userId?: mongoose.Schema.Types.ObjectId | null;
};
