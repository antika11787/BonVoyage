import React from "react";

type FloatingButtonProps = {
  onClick?: () => void;
  Icon?: React.ReactNode;
  className?: string;   
};

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, Icon , className}) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-28 right-6 rounded-full shadow-lg flex items-center justify-center transition duration-300 ${className}`}
    >
      {Icon && Icon}
    </button>
  );
};

export default FloatingButton;
