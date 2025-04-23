import { validationResult } from "express-validator";
import { AuthRequest } from "../interfaces/auth";
import { Request, Response } from "express";
import response from "../utils/sendResponse";
import HTTP_STATUS from "../constants/statusCodes";
import TransactionCategory from "../models/transactionCategory";
import { ITransactionCategory } from "../interfaces/transactionCategory";

// not completed
class TransactionCategoryController {
  async createTransactionCategory(
    req: AuthRequest,
    res: Response
  ): Promise<any> {
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

      const { title, icon , color } = req.body;

      const existingCategory: ITransactionCategory | null =
        await TransactionCategory.findOne({
          title,
          $or: [{ userId: null }, { userId: req.user?._id }],
        });

      if (existingCategory) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Transaction category with this title already exists"
        );
      }

      const newCategory = new TransactionCategory({
        title,
        icon,
        color,
      });

      const savedCategory = await newCategory.save();
      if (req.user) {
        if (req.user.role === "SUPER_ADMIN") {
          savedCategory.userId = null;
        } else {
          savedCategory.userId = req.user._id;
        }
      }
      await newCategory.save();

      return response(
        res,
        HTTP_STATUS.OK,
        "Transaction category created successfully",
        savedCategory
      );
    } catch (e) {
      console.log(e);
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async updateTransactionCategory(
    req: AuthRequest,
    res: Response
  ): Promise<any> {
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
      const categoryId = req.params.id;
      const { title, icon , color } = req.body;

      const category: ITransactionCategory | null =
        await TransactionCategory.findById(categoryId);

      if (!category) {
        return response(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Transaction category not found"
        );
      }

      if (
        category.userId != req.user?._id &&
        req.user?.role !== "SUPER_ADMIN"
      ) {
        return response(
          res,
          HTTP_STATUS.FORBIDDEN,
          "You are not authorized to update this transaction category"
        );
      }

      const updateCategory = await TransactionCategory.findByIdAndUpdate(
        categoryId,
        { $set: { title, icon , color } },
        { new: true }
      );

      if (!updateCategory) {
        return response(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Transaction category not found"
        );
      }

      return response(
        res,
        HTTP_STATUS.OK,
        "Transaction category updated successfully",
        updateCategory
      );
    } catch (e) {
      console.log(e);
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async deleteTransactionCategory(
    req: AuthRequest,
    res: Response
  ): Promise<any> {
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
      const categoryId = req.params.id;
      const category: ITransactionCategory | null =
        await TransactionCategory.findById(categoryId);
      if (!category) {
        return response(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Transaction category not found"
        );
      }
      if (
        category.userId != req.user?._id &&
        req.user?.role !== "SUPER_ADMIN"
      ) {
        return response(
          res,
          HTTP_STATUS.FORBIDDEN,
          "You are not authorized to delete this transaction category"
        );
      }
      await TransactionCategory.findByIdAndDelete(categoryId);
      return response(
        res,
        HTTP_STATUS.OK,
        "Transaction category deleted successfully"
      );
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getTransactionCategories(
    req: AuthRequest,
    res: Response
  ): Promise<any> {
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

      let categories: ITransactionCategory[] = [];
      if (req.user?.role === "SUPER_ADMIN") {
        categories = await TransactionCategory.find().select("-__v");
      } else {
        categories = await TransactionCategory.find(
          req.user
            ? { $or: [{ userId: null }, { userId: req.user._id }] }
            : { userId: null }
        ).select("-__v");
      }

      if (categories.length > 0) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Transaction categories received successfully",
          categories
        );
      }

      return response(
        res,
        HTTP_STATUS.NOT_FOUND,
        "No Transaction categories found"
      );
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getTransactionCategoryById(
    req: AuthRequest,
    res: Response
  ): Promise<any> {
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

      const categoryId = req.params.id;
      const category: ITransactionCategory | null =
        await TransactionCategory.findById(categoryId);

      if (!category) {
        return response(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Transaction category not found"
        );
      }

      if (
        category.userId != req.user?._id &&
        req.user?.role !== "SUPER_ADMIN"
      ) {
        return response(
          res,
          HTTP_STATUS.FORBIDDEN,
          "You are not authorized to view this transaction category"
        );
      }

      return response(
        res,
        HTTP_STATUS.OK,
        "Transaction category received successfully",
        category
      );
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  
}

export default new TransactionCategoryController();
