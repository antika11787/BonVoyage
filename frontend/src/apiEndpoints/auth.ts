import { axiosInstance } from "@/utils/axiosInstance";
import {
  CheckToken,
  FormData,
  FormDataForgotPassword,
  FormDataLogin,
  FormDataResetPassword,
} from "../interfaces/auth";
import { toast } from "react-toastify";

export const SignUpApi = async (data: FormData) => {
  return axiosInstance
    .post("/auth/register", data)
    .then((response) => {
      toast.success("Sign Up successful");
      return response.data.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.log("error", error);
    });
};

export const LoginApi = async (data: FormDataLogin) => {
  return axiosInstance
    .post("/auth/login", data)
    .then((response) => {
      toast.success("Login Successful");
      return response.data.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.log("error", error);
    });
};

export const VerifyEmailApi = async (token: any) => {
  return axiosInstance
    .post(`/auth/verify/${token}`)
    .then((response) => {
      return response.data.message;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const ForgotPasswordApi = async (data: FormDataForgotPassword) => {
  return axiosInstance
    .post("/auth/forgot-password", data)
    .then((response) => {
      toast.success("Password reset link sent to your email");
      return response.data.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.log("error", error);
    });
};

export const CheckTokenApi = async (data: CheckToken) => {
  return axiosInstance
    .post(`/auth/check-token`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.log("error", error);
    });
};

export const ResetPasswordApi = async (data: FormDataResetPassword) => {
  return axiosInstance
    .post(`/auth/reset-password`, data)
    .then((response) => {
      toast.success(response.data.message);
      return response.data.message;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.log("error", error);
    });
};
