"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormData } from "@/interfaces/auth";
import FormInput from "@/components/atoms/formInput";
import Button from "@/components/atoms/button";
import { SignUpApi } from "@/apiEndpoints/auth";
import Loader from "@/components/atoms/loader";

const SignupOrganism = ({ className }: { className?: string }) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      await SignUpApi(payload);
      // router.push("/login");
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
        nameProp="name"
        placeholder="name"
        requiredProp={true}
        control={control}
        errors={errors}
      />
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
        className="w-full bg-blue-500 p-2 mt-4 mb-2 text-white rounded-3xl hover:bg-blue-600"
        type="submit"
        children={isLoading ? <Loader /> : "Sign up"}
      />
      <div>
        <span>Already have an account?&nbsp;</span>
        <Button
          className="text-blue-500 hover:text-blue-700"
          type="button"
          hasBackground={false}
          textColor="text-blue-500"
          onClick={() => router.push("/login")}
        >Login</Button>
      </div>
    </form>
  );
};

export default SignupOrganism;
