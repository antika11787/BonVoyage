import { Request, Response } from "express";
import response from "../utils/sendResponse";
import { validationResult } from "express-validator";
import HTTP_STATUS from "../constants/statusCodes";
import User from "../models/user";
import Auth from "../models/auth";
import mongoose from "mongoose";
import { IUser } from "../interfaces/user";
import { AuthRequest, IAuth } from "../interfaces/auth";

class UserController {

    async getAllUser(req: Request, res: Response): Promise<any> {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Validation Errors", errors.array());
        }
        let page = parseInt(req.query.page as string) || 1;
        let limit = parseInt(req.query.limit as string) || 10;
        let search = req.query.search ? { 
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
          ]
        } : {};
        
        const users: IUser[] = await User.find(search).select("-__v")
        .skip((page - 1) * limit)
        .limit(limit);
        if (users.length > 0) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Users Data Received successfully",
          users
        );
        }
        return response(res, HTTP_STATUS.NOT_FOUND, "No Users Found");
      } catch (e) {
        return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
      }
      }
    
      async getUserById(req: Request, res: Response): Promise<any> {
        try {
          const userId = req.params.id;
          if (!mongoose.Types.ObjectId.isValid(userId)) {
            return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
          }
          const user:IUser|null = await User.findById({_id:userId}).select("-__v");
          if (user) {
            return response(
              res,
              HTTP_STATUS.OK,
              "User Data Received successfully",
              user
            );
          }
          return response(res, HTTP_STATUS.NOT_FOUND, "No User Found");
        } catch (e) {
          return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
        }
      }
    
      async updateUser(req: Request, res: Response): Promise<any> {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return response(
              res,
              HTTP_STATUS.BAD_REQUEST,
              "Validation Error",
              errors.array()
            );
          }
          const userId = req.params.id;
          if (!mongoose.Types.ObjectId.isValid(userId)) {
            return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
          }
          let user : IUser | null = await User.findById({_id:userId}).select("-__v");
          if (!user) {
            return response(res, HTTP_STATUS.NOT_FOUND, "User not found");
          }
          const { name, address, role, gender , profilePic , phoneNo } = req.body;
    
          const userUpdated : IUser | null = await User.findByIdAndUpdate(
            userId,
            { $set: { name, address, gender , role , profilePic , phoneNo } }
          );
         
          user = await User.findById({_id:userId}).select("-__v");
          if (userUpdated) {
            return response(res, HTTP_STATUS.OK, "User Updated Successfully", user);
          }
        } catch (e) {
          return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
        }
      }
    
      async deleteUser(req: Request, res: Response): Promise<any> {
        try {
          const userId = req.params.id;
          if (!mongoose.Types.ObjectId.isValid(userId)) {
            return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
          }
            const userDeleted: IUser | null = await User.findOneAndDelete(
                { _id: userId },
            ).select("-__v");
          const AuthDeleted: IAuth | null = await Auth.findOneAndDelete(
            { userId },
          ).select("-__v");
          if (userDeleted && AuthDeleted) {
            return response(res, HTTP_STATUS.OK, "User Deleted Successfully", userDeleted);
          }
          return response(res, HTTP_STATUS.NOT_FOUND, "User Not Found");
        } catch (e) {
          return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
        }
      }
    
      async getMyProfile(req: AuthRequest, res: Response): Promise<any> {
        try {
          const userId = req.user?._id;
          const user: IUser | null = await User.findById({_id:userId}).select("-__v");
          if (user) {
            return response(res, HTTP_STATUS.OK, "User Data Received successfully", user);
          }
          return response(res, HTTP_STATUS.NOT_FOUND, "No User Found");
        } catch (e) {
          return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
        }
      }
    
      async updateProfile(req: AuthRequest, res: Response): Promise<any> {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return response(
              res,
              HTTP_STATUS.BAD_REQUEST,
              "Validation Error",
              errors.array()
            );
          }
          const userId = req.user?._id;
          let user: IUser | null = await User.findById({_id:userId}).select("-__v");
          if (!user) {
            return response(res, HTTP_STATUS.NOT_FOUND, "User not found");
          }
          const { name, address, gender , profilePic , phoneNo } = req.body;
          const userUpdated: IUser | null = await User.findByIdAndUpdate(
            {_id:userId},
            { $set: { name, address,  gender , phoneNo , profilePic} }
          );
          user = await User.findById({_id:userId}).select("-__v");
          if (userUpdated) {
            return response(res, HTTP_STATUS.OK, "Profile Updated Successfully", user);
          }
        } catch (e) {
          return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
        }
      }
}

export default new UserController();