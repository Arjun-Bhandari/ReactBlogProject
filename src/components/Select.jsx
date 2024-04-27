import { clearAllListeners } from "@reduxjs/toolkit";
import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      <div className="flex items-start">
        {label && (
          <label className={`pl-1 text-neutral-50 ${className}`} htmlFor={id}>
            {label}:
          </label>
        )}
      </div>

      <select {...props} id={id} ref={ref} className={`px-2 py-1 rounded mb-4 ${className}`}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
export default React.forwardRef(Select);
