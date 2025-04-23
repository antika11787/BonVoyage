"use client";

import { ForgotPasswordApi } from "@/apiEndpoints/auth";
import Button from "@/components/atoms/button";
import FormInput from "@/components/atoms/formInput";
import { FormDataForgotPassword } from "@/interfaces/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "@/components/atoms/loader";

const ForgotPassword = ({ className }: { className?: string }) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        defaultValues: {
            email: "",
        },
    });
    const onSubmit = async (data: FormDataForgotPassword) => {
        setIsLoading(true);
        try {
            await ForgotPasswordApi(data);
        } catch (error) {
            console.log("error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className={`${className} flex flex-col items-center justify-center`}>
            <FormInput
                nameProp="email"
                placeholder="Email"
                requiredProp={true}
                control={control}
                errors={errors}
            />
            <Button className="w-full bg-blue-500 p-2 mb-2 text-white rounded-3xl hover:bg-blue-600" type="submit" children={isLoading ? <Loader /> : "Submit"} />
            <div className="flex flex-col items-center justify-center">
                <span className="text-gray-800 text-sm">Remembered Password?&nbsp;</span>
                <Button className="text-sm" hasBackground={false}
                    textColor="text-blue-500" type="button" onClick={() => router.push("/login")}>Go Back to Login Page</Button>
            </div>
        </form>
    );
}

export default ForgotPassword;