import LoginOrganism from "@/components/organisms/auth/login";
import { Metadata } from "next";
import AuthLayout from "../layout";

export const metadata: Metadata = {
  title: "BonVoyage - Login",
};

const LoginPage = () => {
  return (
    <AuthLayout title="Sign in to your Account" isLayoutApplied={true}>
      <div className="flex justify-center items-center h-screen">
        <LoginOrganism className="w-[350px] h-[320px] bg-white z-10 rounded-md shadow-md md:w-[500px] pb-5 pr-5 pl-5 md:pb-10 md:pr-10 md:pl-10" />
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
