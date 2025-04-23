import React from "react";
import { Metadata } from "next";
import ResetPassword from "@/components/organisms/auth/resetPassword";
import AuthLayout from "../../../layout";
import RootLayout from "@/app/layout";

export const metadata: Metadata = {
  title: "BonVoyage - Reset Password",
};

const ResetPasswordPage = () => {
  const ResetPasswordMemo = React.memo(ResetPassword);
  return (
    <RootLayout isLayoutNotApplied={true}>
      <AuthLayout title="Reset your Password" isLayoutApplied={true}>
        <div className="flex justify-center items-center h-screen">
          <ResetPasswordMemo className="w-[350px] h-[300px] bg-white z-10 rounded-md shadow-md md:w-[500px] p-5 md:p-10" />
        </div>
      </AuthLayout>
    </RootLayout>
  );
};

export default ResetPasswordPage;
