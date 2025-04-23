"use client";

import { CheckTokenApi, ResetPasswordApi } from "@/apiEndpoints/auth";
import Button from "@/components/atoms/button";
import FormInput from "@/components/atoms/formInput";
import ImageAtom from "@/components/atoms/image";
import { FormDataResetPassword } from "@/interfaces/auth";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { GrFormNextLink } from "react-icons/gr";
import crossIcon from "../../../../../public/images/delete.png";
import Loader from "@/components/atoms/loader";

const ResetPassword = ({ className }: { className?: string }) => {
  const router = useRouter();
  const params = useParams();
  const hasRunEffect = useRef(false);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!hasRunEffect.current) {
      setIsLoading(true);
      const verifyToken = async () => {
        try {
          const response = await CheckTokenApi({
            token: params.token,
            id: params.id,
          });
          if (response) {
            setIsTokenValid(response.success);
          }
        } catch (error) {
          setIsTokenValid(false);
          console.log("Error during token verification:", error);
        } finally {
          setIsLoading(false);
        }
      };
      verifyToken();
    }
    hasRunEffect.current = true;
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: FormDataResetPassword) => {
    try {
      const payload = {
        token: params.token,
        id: params.id,
        password: data.password,
      };
      await ResetPasswordApi(payload);
      router.push("/login");
    } catch (error) {
      console.log("error during reset password:", error);
    }
  };

  return isTokenValid ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${className} flex flex-col items-center justify-center`}
    >
      <FormInput
        nameProp="password"
        placeholder="Password"
        requiredProp={true}
        control={control}
        errors={errors}
        isPassword={true}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        showValidation={true}
      />
      <FormInput
        nameProp="confirm_password"
        placeholder="Confirm Password"
        requiredProp={true}
        control={control}
        errors={errors}
        isPassword={true}
        showPassword={showConfirmPassword}
        togglePasswordVisibility={toggleConfirmPasswordVisibility}
        watch={watch}
      />
      <Button
        className="w-full bg-blue-500 p-2 mb-2 text-white rounded-3xl hover:bg-blue-600"
        type="submit"
        children={isLoading ? <Loader /> : "Reset Password"}
      />
      <div className="flex flex-col items-center justify-center">
        <span className="text-gray-800 text-sm">
          Remembered Password?&nbsp;
        </span>
        <Button
          className="text-sm text-blue-500 hover:text-blue-700"
          type="button"
          hasBackground={false}
          textColor="text-blue-500"
          onClick={() => router.push("/login")}
        >Go Back to Login Page</Button>
      </div>
    </form>
  ) : (
    <div className={`${className} flex flex-col items-center justify-center`}>
      <ImageAtom
        src={crossIcon}
        alt="Email Verification"
        height={50}
        width={50}
      />
      <h1 className="text-2xl font-bold m-4 text-center text-gray-800">
        Invalid Request!
      </h1>
      <div
        className="flex items-center justify-center p-2 rounded-md bg-blue-500 cursor-pointer"
        onClick={() => router.push("/login")}
      >
        <p className="text-sm text-center text-white p-0 m-0">
          Go to Login Page
        </p>
        <div className="mt-1">
          <GrFormNextLink className="text-white text-md" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
