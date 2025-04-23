import { Request, Response } from "express";
import response from "../utils/sendResponse";
import { validationResult } from "express-validator";
import HTTP_STATUS from "../constants/statusCodes";
import Auth from "../models/auth";
import User from "../models/user";
import jsonWebtoken from "jsonwebtoken";
import appConfig from "../config/appconfig";
import sendEmail from "../utils/sendEmail";
import { IAuth } from "../interfaces/auth";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { IUser } from "../interfaces/user";

export class AuthController {
  //register function

  async register(req: Request, res: Response): Promise<any> {
    try {
      const errors = validationResult(req).array();
      if (errors.length > 0) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Validation failed",
          errors
        );
      }

      const { email, password, name } = req.body;

      const isExixtingUser: IAuth | null = await Auth.findOne({ email });

      if (isExixtingUser && isExixtingUser.isVerified) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "User with this email already exists"
        );
      }

      if (isExixtingUser && !isExixtingUser.isVerified) {
        await Auth.deleteOne({ email });
        await User.deleteOne({ _id: isExixtingUser.userId });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user = new User({
        name,
        email,
      });

      const newUser = await user.save();

      const auth = new Auth({
        email,
        password: hash,
        userId: newUser._id,
        isVerified: false,
      });

      await auth.save();

      //send email verification link
      if (process.env.ENABLE_EMAIL_VERIFICATION === "true") {
        const token = jsonWebtoken.sign({ data: user }, appConfig.jwtSecret, {
          expiresIn: "1d",
        });

        const link = `${process.env.CLIENT_URL}/verify-email/${token}`;

        const subject = "Email verification";
        const html = `<p>Click <a href="${link}">here</a> to verify your email address</p>`;
        sendEmail(email, subject, html);
      }

      return response(res, HTTP_STATUS.OK, "Registration successful", newUser);
    } catch (err: unknown) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error",
        err
      );
    }
  }

  //login function

  async login(req: Request, res: Response): Promise<any> {
    try {
      const errors = validationResult(req).array();
      if (errors.length > 0) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Validation failed",
          errors
        );
      }

      const { email, password } = req.body;

      const auth: IAuth | null = await Auth.findOne({ email });

      if (!auth) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid credentials");
      }

      const isMatch = await bcrypt.compare(password, auth.password);

      if (!isMatch) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid credentials");
      }

      if (!auth.isVerified) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Please verify your email address"
        );
      }

      let user = await User.findById(auth.userId).select("-__v");
      const token = jsonWebtoken.sign({ data: user }, appConfig.jwtSecret, {
        expiresIn: "7d",
      });

      return response(res, HTTP_STATUS.OK, "Login successful", {
        token,
        user,
      });
    } catch (err: unknown) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error",
        err
      );
    }
  }

  //verify email function

  async verifyEmail(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const decodedToken = jsonWebtoken.verify(id, appConfig.jwtSecret);
      const userEmail = (decodedToken as jsonWebtoken.JwtPayload).data.email;
      const emailvalidation = await Auth.findOneAndUpdate(
        { email: userEmail, isVerified: false },
        { isVerified: true }
      );
      if (emailvalidation) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Email verified successfully",
          decodedToken
        );
      } else {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid token");
      }
    } catch (e) {
      if (e instanceof jsonWebtoken.TokenExpiredError) {
        response(res, HTTP_STATUS.BAD_REQUEST, "Token expired");
      } else if (e instanceof jsonWebtoken.JsonWebTokenError) {
        response(res, HTTP_STATUS.BAD_REQUEST, "Invalid token");
      } else {
        response(
          res,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "Internal server error"
        );
      }
    }
  }

  //to send forgot password email

  async sendForgotPasswordEmail(req: Request, res: Response): Promise<any> {
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

      const { email } = req.body;
      const token = crypto.randomBytes(20).toString("hex");
      const userAuth: IAuth | null = await Auth.findOne({ email })
        .select("-password")
        .populate("userId", "name");
      if (!userAuth) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Invalid Request");
      }

      const updaedAuth = await Auth.findOneAndUpdate(
        { email },
        {
          $set: {
            resetPasswordToken: token,
            resetPasswordExpires: new Date(Date.now() + 3000000),
            resetPasswordStatus: true,
          },
        }
      );

      if (!updaedAuth) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Invalid Request");
      }

      if (process.env.ENABLE_EMAIL_VERIFICATION === "true") {
        const name = (userAuth.userId as IUser).name;
        const validationlink = `${process.env.CLIENT_URL}/reset-password/${token}/${userAuth._id}`;
        const renderedHtml = `<p>Hi ${name},</p>
      <p>You requested to reset your password</p>
      <p>Click <a href="${validationlink}">here</a> to reset your password</p>`;
        sendEmail(email, "Reset Password", renderedHtml);
      }
      return response(res, HTTP_STATUS.OK, "Email Sent Successfully");
    } catch (e) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Invalid Request"
      );
    }
  }

  //to check reset password token

  async checkResetPasswordToken(req: Request, res: Response): Promise<any> {
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
      const { token, id } = req.body;
      const userAuth = await Auth.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
        resetPasswordStatus: true,
        _id: id,
      });

      if (!userAuth) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Invalid Request");
      }

      return response(res, HTTP_STATUS.OK, "Valid Request");
    } catch (e) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }

  //finally to reset password

  async resetPassword(req: Request, res: Response): Promise<any> {
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
      const { token, id, password } = req.body;

      const userAuth = await Auth.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
        _id: id,
      });
      if (!userAuth) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Invalid Request");
      }
      const prevPass = userAuth.password;
      const match = await bcrypt.compare(password, prevPass);
      if (match) {
        return response(
          res,
          HTTP_STATUS.CONFLICT,
          "Password cannot be same as previous password"
        );
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const updatedAuth = await Auth.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            password: hash,
            resetPasswordToken: null,
            resetPasswordExpires: null,
            resetPasswordStatus: false,
          },
        }
      );
      if (!updatedAuth) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Invalid Request");
      }
      return response(res, HTTP_STATUS.OK, "Password Reset Successful");
    } catch (e) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }
}

export default new AuthController();
