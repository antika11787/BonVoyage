"use client";

import { UserListProps } from "@/interfaces/common";
import { formatUppercaseWords } from "@/utils/helper";
import { User, ShieldCheck } from "lucide-react";
import React from "react";

const UserList = ({ _id, name, email, role, icons }: UserListProps) => {
  return (
    <div key={_id} className="flex items-center justify-between w-full">
      <div className="flex items-start gap-3 mb-3 flex-1 max-w-[70%]">
        <div className="relative bg-gray-200 bg-opacity-[0.6] min-w-12 h-12 rounded-full flex items-center justify-center">
          {role === "LEADER" && (
            <ShieldCheck className="absolute top-[-5px] left-[-5px] h-6 w-6 text-green-500" />
          )}
          <User className=" text-blue-500 w-7 h-7" />
        </div>
        <div className="max-w-[calc(100%-60px)]">
          <p className="truncate font-bold text-gray-700 min-w-[calc(80%-20px)]">{name}</p>
          <p className="truncate text-sm text-gray-500 min-w-[calc(80%-20px)]">
            {email}
          </p>
          <p className="text-sm text-gray-800">{formatUppercaseWords(role)}</p>
        </div>
      </div>
      <div>{icons ? <>{icons}</> : null}</div>
    </div>
  );
};

export default UserList;
