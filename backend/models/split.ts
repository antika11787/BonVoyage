import mongoose from "mongoose";
import { ISplit } from "../interfaces/split";

const splitSchema = new mongoose.Schema<ISplit>(
  {
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: [true, "Transaction ID is required"],
    },
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: [true, "Wallet ID is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    adjustmentType: {
      type: String,
      enum: ["DEDUCTION", "ADDITION"],
      required: [true, "Type is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Split = mongoose.model("Split", splitSchema);
export default Split;
