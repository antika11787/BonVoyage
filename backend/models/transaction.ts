import mongoose from "mongoose";
import { ITransaction } from "../interfaces/transaction";

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: [true, "Tour ID is required"],
    },
    amount: {
      type: Number,
      default: 0,
      required: [true, "Amount is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: false,
    },
    paidBy: [
      {
        walletId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Wallet",
          required: [true, "Wallet ID is required"],
        },
        amount: {
          type: Number,
          required: [true, "Amount is required"],
        },
      },
    ],
    transactionCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TransactionCategory",
      required: [true, "Transaction Category ID is required"],
    },
    splitType: {
      type: String,
      enum: ["EQUAL", "CUSTOM"],
      required: [true, "Split Type is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
