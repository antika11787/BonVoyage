import React, { useState, useEffect, useRef } from "react";
import { EllipsisVertical } from 'lucide-react';

type Props = {
  icon: React.ReactNode;
  name: string;
  color: string;
  onClick?: () => void;
  onEdit: () => void;
  onDelete?: () => void;
};

const CategoryCard = (props: Props) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleEllipsisClick = () => {
    setPopoverVisible(!popoverVisible);
  };

  const handleEditClick = () => {
    setPopoverVisible(false);
    if (props.onEdit) {
      props.onEdit();
    }
  };

  const handleDeleteClick = () => {
    setPopoverVisible(false);
    if (props.onDelete) {
      props.onDelete();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setPopoverVisible(false);
    }
  };

  useEffect(() => {
    if (popoverVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverVisible]);

  return (
    <div
      className={`relative w-full h-[150px] p-4 bg-white rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200`}
      onClick={props.onClick}
    >
      <div
        className="bg-white rounded-full p-3 mb-3 flex items-center justify-center text-white"
        style={{ backgroundColor: props.color }}
      >
        {props.icon}
      </div>
      <h3 className="text-sm font-medium text-gray-800 text-center">
        {props.name}
      </h3>
      <div className="absolute top-2 right-1" ref={popoverRef}>
        <EllipsisVertical size={20} className="text-gray-400 cursor-pointer" onClick={handleEllipsisClick} />
        {popoverVisible && (
          <div className="absolute right-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleEditClick}>
              Edit
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
