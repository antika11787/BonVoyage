import mongoose from "mongoose";
import { IWallet } from "../interfaces/wallet";

const walletSchema = new mongoose.Schema<IWallet>(
  {
    balance: {
      type: Number,
      required: [true, "Balance is required"],
    },
    // for user's personal wallet
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // for tour wallet
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
    },
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model("Wallet", walletSchema);
export default Wallet;
