import SignupOrganism from "@/components/organisms/auth/signup";
import { Metadata } from "next";
import AuthLayout from "../layout";

export const metadata: Metadata = {
  title: "BonVoyage - Signup",
};

const SignupPage = () => {
  return (
    <AuthLayout title="Create a new Account" isLayoutApplied={true}>
      <div className="flex justify-center items-center h-screen">
        <SignupOrganism className="w-[350px] h-[400px] bg-white z-10 rounded-md shadow-md mt-[50px] md:w-[500px] pb-5 pr-5 pl-5 md:pb-10 md:pr-10 md:pl-10" />
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
