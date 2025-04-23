import { Request, Response } from "express";
import response from "../utils/sendResponse";
import { validationResult } from "express-validator";
import HTTP_STATUS from "../constants/statusCodes";
import TourMember from "../models/tourMember";
import Wallet from "../models/wallet";
import { ITourMember } from "../interfaces/tourMember";
import { IWallet } from "../interfaces/wallet";
import { AuthRequest } from "../interfaces/auth";
import Tour from "../models/tour";
import User from "../models/user";
import mongoose from "mongoose";

class TourMemberController {
  async addMember(req: AuthRequest, res: Response): Promise<any> {
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

      const { tourId, userId, role } = req.body;

      const existingTour = await Tour.findOne({
        _id: tourId,
      });

      if (!existingTour) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Tour does not exist");
      }

      if (
        existingTour.leaderId != req.user?._id &&
        req.user?.role != "SUPER_ADMIN"
      ) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "You are not authorized to add members to this tour"
        );
      }

      const extUser = await User.findOne({
        _id: userId,
      });

      if (!extUser) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "User does not exist");
      }

      const existingTourMember = await TourMember.findOne({
        tourId,
        userId,
      });

      if (existingTourMember) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "User is already a member of this tour"
        );
      }

      const newWallet = new Wallet({
        userId,
        tourId: null,
        balance: 0,
      });

      const savedWallet: IWallet = await newWallet.save();

      const newTourMember = new TourMember({
        tourId,
        userId,
        role,
        walletId: savedWallet._id,
      });

      const savedTourMember: ITourMember = await newTourMember.save();

      if (!savedTourMember) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Unable to add Tour Member"
        );
      }

      return response(
        res,
        HTTP_STATUS.OK,
        "Member Added Successfully",
        savedTourMember
      );
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async removeMember(req: AuthRequest, res: Response): Promise<any> {
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

      const { tourId, userId } = req.params;

      const existingTour = await Tour.findOne({
        _id: tourId,
      });

      if (!existingTour) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Tour does not exist");
      }

      const extUser = await User.findOne({
        _id: userId,
      });

      if (!extUser) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "User does not exist");
      }

      const existingTourMember = await TourMember.findOne({
        tourId,
        userId,
      });

      if (!existingTourMember) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "User is not a member of this tour"
        );
      }

      if (
        existingTour.leaderId != req.user?._id &&
        req.user?.role != "SUPER_ADMIN"
      ) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "You are not authorized to remove members from this tour"
        );
      }

      const deletedTourMember = await TourMember.findOneAndDelete({
        tourId,
        userId,
      });

      const deletedWallet = await Wallet.findByIdAndDelete({
        _id: existingTourMember?.walletId,
      });

      if (!deletedWallet) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Unable to delete Tour Member"
        );
      }

      return response(
        res,
        HTTP_STATUS.OK,
        "Member Removed Successfully",
        deletedTourMember
      );
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async promoteMember(req: AuthRequest, res: Response): Promise<any> {
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

      const { tourId, userId, role } = req.body;

      const existingTour = await Tour.findOne({
        _id: tourId,
      });

      if (!existingTour) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Tour does not exist");
      }

      const extUser = await User.findOne({
        _id: userId,
      });

      if (!extUser) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "User does not exist");
      }

      const existingTourMember = await TourMember.findOne({
        tourId,
        userId,
      });

      if (!existingTourMember) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "User is not a member of this tour"
        );
      }

      if (
        existingTour.leaderId != req.user?._id &&
        req.user?.role != "SUPER_ADMIN"
      ) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "You are not authorized to promote members in this tour"
        );
      }

      const updatedTourMember = await TourMember.findOneAndUpdate(
        {
          tourId,
          userId,
        },
        { role },
        { new: true }
      );

      if (!updatedTourMember) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Unable to update Tour Member"
        );
      }

      return response(
        res,
        HTTP_STATUS.OK,
        "Member Updated Successfully",
        updatedTourMember
      );
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getTourMembers(req: Request, res: Response): Promise<any> {
    try {
      const tourId = req.params.tourId;
      const tourMembers = await TourMember.find({ tourId }).populate(
        "userId",
        "name email"
      );
      return response(res, HTTP_STATUS.OK, "Tour Members", tourMembers);
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getMyTours(req: AuthRequest, res: Response): Promise<any> {
    try {
      const userId = new mongoose.Types.ObjectId(req?.user?._id.toString());
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;
      const search = req.query.search as string;
      const today = new Date(new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 6 * 60 * 60 * 1000);

      const matchStage: any = { userId };

      const pipeline: any[] = [
        { $match: matchStage },
        {
          $lookup: {
            from: "tours",
            localField: "tourId",
            foreignField: "_id",
            as: "tour",
          },
        },
        { $unwind: "$tour" },
      ];

      if (status) {
        if (status === "UPCOMING") {
          pipeline.push({
            $match: {
              "tour.startDate": { $gt: today },
            },
          });
        } else if (status === "COMPLETED") {
          pipeline.push({
            $match: {
              "tour.endDate": {
                $lt: today,
              },
            },
          });
        } else if (status === "ONGOING") {
          pipeline.push({
            $match: {
              "tour.startDate": { $lte: today },
              "tour.endDate": {
                $gte: today,
              },
            },
          });
        } else {
          pipeline.push({ $match: { "tour.status": status } });
        }
      }

      if (search) {
        pipeline.push({
          $match: {
            $or: [
              { "tour.title": { $regex: search, $options: "i" } },
              { "tour.description": { $regex: search, $options: "i" } },
              { "tour.place": { $regex: search, $options: "i" } },
            ],
          },
        });
      }

      pipeline.push({ $sort: { "tour.createdAt": -1 } });

      const totalCount = await TourMember.aggregate(
        pipeline.concat([{ $count: "count" }])
      );

      pipeline.push({ $skip: (page - 1) * limit }, { $limit: limit });

      const tourMembers = await TourMember.aggregate(pipeline);

      return response(res, HTTP_STATUS.OK, "Tour List Received Successfully", {
        total: totalCount.length > 0 ? totalCount[0].count : 0,
        page,
        limit,
        data: tourMembers,
      });
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async leaveTour(req: AuthRequest, res: Response): Promise<any> {
    try {
      const userId = req.user?._id;
      const tourId = req.params.tourId;

      const existingTour = await Tour.findOne({
        _id: tourId,
      });

      if (!existingTour) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Tour does not exist");
      }

      const extUser = await User.findOne({
        _id: userId,
      });

      if (!extUser) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "User does not exist");
      }

      const existingTourMember = await TourMember.findOne({
        tourId,
        userId,
      });

      if (!existingTourMember) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "You are not a member of this tour"
        );
      }

      const deletedTourMember = await TourMember.findOneAndDelete({
        tourId,
        userId,
      });

      const deletedWallet = await Wallet.findByIdAndDelete({
        _id: existingTourMember?.walletId,
      });

      if (!deletedWallet) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Unable to leave Tour");
      }

      return response(
        res,
        HTTP_STATUS.OK,
        "Tour Left Successfully",
        deletedTourMember
      );
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }
}

export default new TourMemberController();
