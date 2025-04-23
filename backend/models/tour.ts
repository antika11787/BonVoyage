import mongoose from "mongoose";
import { ITour } from "../interfaces/tour";

const tourSchema = new mongoose.Schema<ITour>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    status: {
      type: String,
      enum: ["UPCOMING", "ONGOING", "COMPLETED"],
    },
    startDate: {
      type: Date,
      required: [true, "Please insert a start date"],
    },
    endDate: {
      type: Date,
      required: [true, "Please insert an end date"],
    },
    place: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      enum: ["UNDECIDED", "RELAX", "TREKKING", "HIKING", "PICNIC", "CAMPING"],
      required: false,
    },
    estimatedBudget: {
      type: Number,
      required: [true, "Please insert an estimated budget"],
    },
    // to check the expense of ongoing tour
    tourWalletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
    leaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    transactionCategoryIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "TransactionCategory",
    },
    // to search tours by tags
    tags: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
