import React from "react";
import { Search } from "lucide-react";

const SearchAtom = ({
  className,
  value,
  onChange,
  backgroundColor,
  textColor,
}: {
  className?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  backgroundColor?: string;
  textColor?: string;
}) => {
  return (
    <div
      className={`${className} flex gap-2 items-center rounded-md py-3 px-4 bg-${
        backgroundColor ? backgroundColor : "white"
      } shadow-md`}
    >
      <Search
        className={`h-5 w-5 text-${textColor ? textColor : "gray-800"}`}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search..."
        className={`bg-transparent w-full outline-none text-${
          textColor ? textColor : "gray-800"
        } focus:outline-none`}
      />
    </div>
  );
};

export default SearchAtom;
