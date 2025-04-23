import React from "react";
import { LucideProps } from "lucide-react";

const IconButton: React.FC<{
  name: string;
  Icon: React.FC<LucideProps>;
  onSelect: (name: string) => void;
  selected?: string;
  colorSelected?: string;
}> = ({ name, Icon, onSelect, selected, colorSelected }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelect(name);
  };
  return (
    <button
      className="flex flex-col items-center p-2 border rounded-lg bg-blue-500"
      style={{
        backgroundColor:
          selected === name
            ? colorSelected
              ? colorSelected
              : "rgb(59 130 246)"
            : "#ffffff",
        color: selected === name ? "#ffffff" : "#000000",
      }}
      onClick={handleClick}
    >
      <Icon size={24} />
    </button>
  );
};

export default IconButton;
