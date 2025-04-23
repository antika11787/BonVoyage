"use client";

import { InputFieldProps } from "@/interfaces/common";
import { FormInputProps } from "@/interfaces/auth";
import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import Button from "../button";
import { PiEyeClosed, PiEye } from "react-icons/pi";

const FormInput = ({
  labelProp,
  nameProp,
  placeholder,
  requiredProp,
  control,
  errors,
  isPassword = false,
  showPassword,
  togglePasswordVisibility,
  watch,
  showValidation,
  value = "",
  type = "text",
  tag = "input",
}: FormInputProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full mb-4">
      <Controller
        name={nameProp}
        control={control}
        defaultValue={value}
        rules={{
          required: requiredProp,
          ...(!showValidation &&
            isPassword &&
            nameProp === "password" && {
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            },
          }),
          ...(isPassword &&
            nameProp !== "password" && {
            validate: (value) =>
              value === (watch ? watch("password") : "") ||
              "Passwords do not match",
          }),
        }}
        render={({ field }: { field: InputFieldProps }) => (
          <div
            className={`relative w-full p-2 border rounded-md ${isClicked ? "border-blue-500" : "border-gray-300"
              } flex items-center justify-center cursor-pointer`}
            onClick={() => setIsClicked(true)}
            ref={inputRef}
          >
            {isClicked && (
              <label className="absolute top-[-10px] left-2 text-xs text-blue-700 bg-white px-2 transition-opacity duration-300">
                {isPassword && nameProp !== "password"
                  ? "Confirm Password"
                  : labelProp?.replace(/\b\w/g, char => char.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2') || nameProp.replace(/\b\w/g, char => char.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2')}
              </label>
            )}
            {React.createElement(
              tag,
              {
                autoComplete: isPassword ? "off" : "on",
                type: isPassword ? (showPassword ? type : "password") : type,
                placeholder: isClicked ? "" : placeholder,
                ...field,
                className: `w-full h-full focus:outline-none ${tag === "textarea" ? "resize-none" : ""}`,
                onFocus: () => {
                  setIsClicked(true);
                },
                onBlur: () => {
                  setIsClicked(false);
                },
              },
              null
            )}
            {isPassword && (
              <Button
                type="button"
                onClick={togglePasswordVisibility}
                hasIcon
                hasBackground={false}
                textColor="text-gray-500"
                icon={showPassword ? <PiEye /> : <PiEyeClosed />}
              >
              </Button>
            )}
          </div>
        )}
      />
      {errors[nameProp] && (
        <span className="text-red-500">{errors[nameProp].message}</span>
      )}
    </div>
  );
};

export default FormInput;
