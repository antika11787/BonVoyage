"use client";

import React, { useEffect, useState } from "react";
import verificationIcon from "../../../../../public/images/checklist.png";
import crossIcon from "../../../../../public/images/delete.png";
import { GrFormNextLink } from "react-icons/gr";
import { useRouter, useParams } from "next/navigation";
import ImageAtom from "@/components/atoms/image";
import { VerifyEmailApi } from "@/apiEndpoints/auth";

const VerifyEmail = () => {
  const router = useRouter();
  const params = useParams();

  const [verification, setVerification] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await VerifyEmailApi(params.token);
        if (response) {
          setVerification(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyEmail();
  }, [params.token]);

  if (verification) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] w-[80%] bg-white rounded-md shadow-2xl">
        <ImageAtom
          src={verificationIcon}
          alt="Email Verification"
          height={50}
          width={50}
        />
        <h1 className="text-2xl font-bold m-4 text-center text-gray-800">
          Email verification Successful!
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
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] w-[80%] bg-white rounded-md shadow-2xl">
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
  }
};

export default VerifyEmail;
