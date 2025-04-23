import { validationResult } from "express-validator";
import { AuthRequest } from "../interfaces/auth";
import { Request, Response } from "express";
import response from "../utils/sendResponse";
import HTTP_STATUS from "../constants/statusCodes";
import Transaction from "../models/transaction";
import Split from "../models/split";
import { ISplit } from "../interfaces/split";
import { IPaidBy } from "../interfaces/transaction";
import { createAdjustment , deleteAdjustment , updateAdjustment } from "../service/transaction/balanceAdjustment";

class TransactionController {
  async createTransaction(req: AuthRequest, res: Response): Promise<any> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Validation Errors",
          errors.array()
        );
      }

      const {
        tourId,
        amount,
        title,
        description,
        paidBy,
        transactionCategoryId,
        splitType,
        custom,
      } = req.body;

      const newTransaction = new Transaction({
        tourId,
        amount,
        title,
        description,
        paidBy,
        transactionCategoryId,
        splitType,
      });

      const savedTransaction = await newTransaction.save();

      await createAdjustment(
        paidBy,
        custom,
        amount,
        tourId,
        savedTransaction._id
      );

      return response(
        res,
        HTTP_STATUS.OK,
        "Transaction created successfully",
        savedTransaction
      );
    } catch (error) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async deleteTransaction(req: AuthRequest, res: Response): Promise<any> {
    try {
      const transactionId = req.params.id;
      const transaction = await Transaction.findById(transactionId);
      if (!transaction) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Transaction not found");
      }

      await deleteAdjustment(transactionId);

      await Transaction.deleteOne({ _id: transactionId });

      return response(res, HTTP_STATUS.OK, "Transaction deleted successfully");
    } catch (error) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }


  async updateTransaction(req: AuthRequest, res: Response): Promise<any> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Validation Errors",
          errors.array()
        );
      }

      const transactionId = req.params.id;
      const {
        tourId,
        amount,
        title,
        description,
        paidBy,
        transactionCategoryId,
        splitType,
        custom,
      } = req.body;

      const transaction = await Transaction.findById(transactionId);

      if (!transaction) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Transaction not found");
      }

      transaction.tourId = tourId;
      transaction.amount = amount;
      transaction.title = title;
      transaction.description = description;
      transaction.paidBy = paidBy;
      transaction.transactionCategoryId = transactionCategoryId;
      transaction.splitType = splitType;

      await transaction.save();

      await updateAdjustment(
        paidBy,
        custom,
        amount,
        tourId,
        transactionId
      );

      return response(
        res,
        HTTP_STATUS.OK,
        "Transaction updated successfully",
        transaction
      );

    } catch (error) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }
}

export default new TransactionController();
