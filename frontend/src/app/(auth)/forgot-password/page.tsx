import ForgotPassword from "@/components/organisms/auth/forgotPassword";
import { Metadata } from "next";
import React from "react";
import AuthLayout from "../layout";
import RootLayout from "@/app/layout";

export const metadata: Metadata = {
  title: "BonVoyage - Forgot Password",
};

const ForgotPasswordPage = () => {
  return (
    <RootLayout isLayoutNotApplied={true}>
      <AuthLayout title="Request for Password Reset" isLayoutApplied={true}>
        <div className="flex justify-center items-center h-screen">
          <ForgotPassword className="w-[350px] h-[250px] bg-white shadow-md z-10 rounded-md p-5 md:w-[500px] md:pb-10 md:pr-10 md:pl-10" />
        </div>
      </AuthLayout>
    </RootLayout>
  );
};

export default ForgotPasswordPage;
