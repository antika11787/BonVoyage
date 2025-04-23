import VerifyEmail from "@/components/organisms/auth/verifyEmail";
import React from "react";
import AuthLayout from "../../layout";

const VerifyEmailPage = () => {
  return (
    <AuthLayout isLayoutApplied={false}>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <VerifyEmail />
      </div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
