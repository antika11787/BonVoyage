import { ButtonProps } from "@/interfaces/common";
import React from "react";

const Button = ({
    type,
    onClick,
    children,
    hasIcon = false,
    icon,
    disabled = false,
    className,
    hasBackground = true,
    background,
    textColor,
    padding,
    isSmall = false,
    isLarge = false
}: ButtonProps) => {
    return (
        <button className={`${className ?? ""} rounded-sm ${(hasBackground && background) ?? "bg-blue-500"} ${textColor ?? "text-white"} ${padding ?? "p-1"} ${isSmall ? "w-20" : ""} ${isLarge ? "w-40" : ""}`} type={type} onClick={onClick} disabled={disabled}>
            {hasIcon && icon}
            {children}
        </button>
    )
}

export default Button;