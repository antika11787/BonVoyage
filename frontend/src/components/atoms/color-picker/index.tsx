import React, { useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
    value?: string;
    onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value = "#3498db", onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={pickerRef}>
            <button
            className="w-10 h-10 rounded-full border-2 border-gray-300"
            style={{ backgroundColor: value }}
            onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
            }}
            />
            {isOpen && (
            <div className="absolute left-0 mt-2 p-2 bg-white shadow-lg rounded-lg z-10">
                <HexColorPicker color={value} onChange={onChange} />
            </div>
            )}
        </div>
    );
};

export default ColorPicker;
