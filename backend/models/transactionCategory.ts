import mongoose from "mongoose";
import { ITransactionCategory } from "../interfaces/transactionCategory";

const transactionCategorySchema = new mongoose.Schema<ITransactionCategory>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    
    icon: {
      type: String,
      required: [true, "Icon is required"],
    },

    color: {
      type: String,
      required: [true, "Color is required"],
    },

    // If a user other than super admin creates a transaction category, the userId field will be populated with the user's id.
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const TransactionCategory = mongoose.model(
  "TransactionCategory",
  transactionCategorySchema
);
export default TransactionCategory;
