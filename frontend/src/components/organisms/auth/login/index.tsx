"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormDataLogin } from "@/interfaces/auth";
import FormInput from "@/components/atoms/formInput";
import Button from "@/components/atoms/button";
import { LoginApi } from "@/apiEndpoints/auth";
import Checkbox from "@/components/atoms/checkbox";
import { useDispatch } from "react-redux";
import { saveLogin } from "@/redux/slices/user";
import Loader from "@/components/atoms/loader";

const LoginOrganism = ({ className }: { className?: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: FormDataLogin) => {
    setIsLoading(true);
    try {
      const response = await LoginApi(data);
      if (response) {
        dispatch(saveLogin({ token: response.token, user: response.user }));
        router.push("/tours");
      }
    } catch (error) {
      console.log("error during signup:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${className} flex flex-col items-center justify-center`}
    >
      <FormInput
        nameProp="email"
        placeholder="Email"
        requiredProp={true}
        control={control}
        errors={errors}
      />
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
      <div className="flex items-center justify-between w-full">
        <Checkbox value="remember-me" children="Remember me" />
        <span
          className="ms-2 text-sm font-normal hover:text-blue-500 hover:cursor-pointer"
          onClick={() => router.push("/forgot-password")}
        >
          Forgot Password?
        </span>
      </div>
      <Button
        className="w-full bg-blue-500 p-2 mt-4 mb-2 text-white rounded-3xl hover:bg-blue-600 m-auto"
        type="submit"
        children={isLoading ? <Loader /> : "Login"}
      />
      <div>
        <span>Don't have an account?&nbsp;</span>
        <Button
          className="text-blue-500 hover:text-blue-700"
          type="button"
          hasBackground={false}
          textColor="text-blue-500"
          onClick={() => router.push("/signup")}
        >Sign Up</Button>
      </div>
    </form>
  );
};

export default LoginOrganism;
