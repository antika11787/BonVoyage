import { validationResult } from "express-validator";
import response from "../utils/sendResponse";
import HTTP_STATUS from "../constants/statusCodes";
import { Request, Response } from "express";
import { AuthRequest } from "../interfaces/auth";
import TourMember from "../models/tourMember";
import Split from "../models/split";

class SplitController {
  async getMyWalletTransactions(req: AuthRequest, res: Response): Promise<any> {
    try {
      // get my wallet id
      const myWallet = await TourMember.findOne({
        userId: req.user?._id,
        tourId: req.params.tourId,
      }).select("walletId");

      if (!myWallet) {
        return response(
          res,
          HTTP_STATUS.NOT_FOUND,
          "You are not member of this tour"
        );
      }

      // get all transactions of my wallet

      const myWalletTransactions = await Split.aggregate([
        {
          $match: { walletId: myWallet.walletId },
        },
        {
          $lookup: {
            from: "transactions", // Collection name
            localField: "transactionId",
            foreignField: "_id",
            as: "transaction",
          },
        },
        {
          $unwind: "$transaction", // Convert array to object
        },
        {
          $sort: { "transaction.createdAt": -1 }, // Sort by transaction's createdAt in descending order
        },
      ]);

      return response(
        res,
        HTTP_STATUS.OK,
        "Transaction received successfully",
        myWalletTransactions
      );
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error",
        error
      );
    }
  }
}

export default new SplitController();
