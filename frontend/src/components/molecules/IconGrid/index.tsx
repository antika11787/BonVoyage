import React from "react";
import { LucideProps } from "lucide-react";
import IconButton from "@/components/atoms/icon-button";

const IconGrid: React.FC<{
  iconsList: [string, React.FC<LucideProps>][];
  onSelect: (name: string) => void;
  className?: string;
  selected?: string;
  colorSelected?: string;
}> = ({ iconsList, onSelect, className, selected, colorSelected }) => {
  return (
    <div
      className={`grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-4 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-150px)] ${className}`}
    >
      {iconsList.map(([name, Icon]) => (
        <IconButton
          key={name}
          name={name}
          Icon={Icon}
          onSelect={onSelect}
          selected={selected}
          colorSelected={colorSelected}
        />
      ))}
    </div>
  );
};

export default IconGrid;
