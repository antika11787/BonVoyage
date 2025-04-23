import React from "react";
import "../../../app/globals.css";

const Loader = ({ color }: { color?: string }) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`w-6 h-6 border-2 ${color ? color : "border-t-blue-500"} border-gray-100 rounded-full animate-spin`}></div>
    </div>
  );
};

export default Loader;
