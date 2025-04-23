import { validationResult } from "express-validator";
import response from "../utils/sendResponse";
import HTTP_STATUS from "../constants/statusCodes";
import { Request, Response } from "express";
import Tour from "../models/tour";
import Wallet from "../models/wallet";
import { AuthRequest } from "../interfaces/auth";
import { ITour } from "../interfaces/tour";
import TourMember from "../models/tourMember";

class TourController {
  async createTour(req: AuthRequest, res: Response): Promise<any> {
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
        title,
        description,
        startDate,
        endDate,
        place,
        type,
        estimatedBudget,
        tags,
      } = req.body;

      if (new Date(startDate) > new Date(endDate)) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Start Date should be less than End Date"
        );
      }

      const newTour = new Tour({
        title,
        description,
        startDate,
        endDate,
        place,
        type,
        estimatedBudget,
        tags,
        leaderId: req.user?._id,
      });

      const savedTour = await newTour.save();

      const newWallet = new Wallet({
        balance: 0,
        userId: null, // this wallet it for tour so no user is associated with it
        tourId: savedTour._id,
      });

      await newWallet.save();

      const newLeaderWallet = new Wallet({
        balance: 0,
        userId: req.user?._id,
        tourId: null,
      });

      await newLeaderWallet.save();

      const newTourMember = new TourMember({
        tourId: savedTour._id,
        userId: req.user?._id,
        role: "LEADER",
        walletId: newLeaderWallet._id,
      });

      await newTourMember.save();

      return response(
        res,
        HTTP_STATUS.OK,
        "Tour created successfully",
        savedTour
      );
    } catch (e) {
      console.log(e);
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async updateTourById(req: AuthRequest, res: Response): Promise<any> {
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
      const tourId = req.params.id;
      const {
        title,
        description,
        startDate,
        endDate,
        place,
        type,
        estimatedBudget,
        tags,
      } = req.body;

      if (new Date(startDate) > new Date(endDate)) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Start Date should be less than End Date"
        );
      }

      const tour: ITour | null = await Tour.findById(tourId);

      if (!tour) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Tour not found");
      }

      if (tour.leaderId != req.user?._id && req.user?.role !== "SUPER_ADMIN") {
        return response(
          res,
          HTTP_STATUS.FORBIDDEN,
          "You are not authorized to update this tour"
        );
      }

      const updatedTour = await Tour.findByIdAndUpdate(
        tourId,
        {
          $set: {
            title,
            description,
            startDate,
            endDate,
            place,
            type,
            estimatedBudget,
            tags,
          },
        },
        { new: true }
      );
      if (!updatedTour) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Tour not found");
      }

      return response(
        res,
        HTTP_STATUS.OK,
        "Tour updated successfully",
        updatedTour
      );
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async deleteTourById(req: AuthRequest, res: Response): Promise<any> {
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
      const tourId = req.params.id;
      const tour = await Tour.findById(tourId);
      if (!tour) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Tour not found");
      }
      if (tour.leaderId != req.user?._id && req.user?.role !== "SUPER_ADMIN") {
        return response(
          res,
          HTTP_STATUS.FORBIDDEN,
          "You are not authorized to delete this tour"
        );
      }
      await Tour.findByIdAndDelete(tourId);
      return response(res, HTTP_STATUS.OK, "Tour deleted successfully");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getAllTours(req: Request, res: Response): Promise<any> {
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
      let page = parseInt(req.query.page as string) || 1;
      let limit = parseInt(req.query.limit as string) || 10;

      const { title, tags } = req.query;

      // Build the query object dynamically
      const query: any = {};
      if (title) {
        query.title = { $regex: title, $options: "i" }; // Case-insensitive regex search
      }
      if (tags) {
        const tagArray = Array.isArray(tags) ? tags : [tags]; // Ensure tags is an array
        query.tags = { $in: tagArray }; // Match any of the provided tags
      }

      const tours = await Tour.find(query)
        .select("-__v")
        .skip((page - 1) * limit)
        .limit(limit);
      if (tours.length > 0) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Tours data received successfully",
          tours
        );
      }

      return response(res, HTTP_STATUS.NOT_FOUND, "No Tours Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getTourById(req: Request, res: Response): Promise<any> {
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
      const tourId = req.params.id;
      const tour = await Tour.findById(tourId).select("-__v");
      if (tour) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Tour data received successfully",
          tour
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Tour Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }
}

export default new TourController();
