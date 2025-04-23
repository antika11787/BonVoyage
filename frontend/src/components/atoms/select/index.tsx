import React from "react";
import { Controller } from "react-hook-form";

interface SelectProps {
  name: string;
  control: any;
  options: { value: string; label: string }[];
  label?: string;
  className?: string;
  errors?: any;
}

const Select: React.FC<SelectProps> = ({
  name,
  control,
  options,
  label,
  className,
  errors,
}) => {

    console.log("SelectProps", errors);

  return (
    <div className={`w-full mb-4 flex flex-col ${className}`}> 
      {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className="p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-700 focus:outline-none"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {errors && errors[name] && <span className="text-red-500">{errors[name]?.message}</span>}
    </div>
  );
};

export default Select;
