import React from "react";

interface BadgeProps {
  status: "ongoing" | "completed" | "upcoming";
  className?: string;
}

const statusStyles: Record<string, string> = {
  ongoing: "bg-blue-100 text-blue-700 border-blue-500",
  completed: "bg-green-100 text-green-700 border-green-500",
  upcoming: "bg-yellow-100 text-yellow-700 border-yellow-500",
};

const Badge: React.FC<BadgeProps> = ({ status, className }) => {
  return (
    <div className={`${className} ${statusStyles[status]}`}>
      <p className="pb-[3px]">{status.charAt(0).toUpperCase() + status.slice(1)}</p>
    </div>
  );
};

export default Badge;
