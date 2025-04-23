import React from "react";

const Checkbox = ({ value, children }: { value: string, children: React.ReactNode }) => {
    return (
        <div className="flex items-center">
            <input type="checkbox"
                value={value}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm" />
            <label htmlFor="custom-checkbox" className="ms-2 text-sm font-medium">{children}</label>
        </div>
    );
}

export default Checkbox;