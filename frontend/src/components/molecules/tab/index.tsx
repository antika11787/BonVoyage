import { TabProps } from "@/interfaces/common";
import React from "react";

const Tab = ({ items, currentTab, setCurrentTab, hasIcon }: TabProps) => {
  return (
    <div className="flex justify-between items-center bg-white m-[21px] rounded-md shadow-md px-5">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            setCurrentTab(item.id);
          }}
          className={`${
            currentTab === item.id
              ? "border-b-2 border-blue-500 text-blue-500"
              : ""
          } p-3 flex gap-2 items-center cursor-pointer`}
        >
          {hasIcon ? item.icon : <div></div>}
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Tab;
