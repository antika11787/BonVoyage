import express, { Request, Response, Router } from "express";
import authController from "../controllers/auth";
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  checkToken,
  resetPasswordValidator,
} from "../middlewares/validation/authValidator";

const routes: Router = Router();

routes.post("/login", loginValidator, authController.login);

routes.post("/register", registerValidator, authController.register);

routes.post("/verify/:id", authController.verifyEmail);

routes.post("/forgot-password",forgotPasswordValidator,authController.sendForgotPasswordEmail);

routes.post("/check-token",checkToken,authController.checkResetPasswordToken);

routes.post("/reset-password",resetPasswordValidator,authController.resetPassword);

export = routes;
