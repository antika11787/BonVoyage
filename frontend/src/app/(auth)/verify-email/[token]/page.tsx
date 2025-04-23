import VerifyEmail from "@/components/organisms/auth/verifyEmail";
import React from "react";
import AuthLayout from "../../layout";
import RootLayout from "@/app/layout";

const VerifyEmailPage = () => {
  return (
    <RootLayout isLayoutNotApplied={true}>
      <AuthLayout isLayoutApplied={false}>
        <div className="h-screen flex items-center justify-center bg-gray-100">
          <VerifyEmail />
        </div>
      </AuthLayout>
    </RootLayout>
  );
};

export default VerifyEmailPage;
