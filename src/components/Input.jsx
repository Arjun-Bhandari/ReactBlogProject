import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-start">
      {label && (
        <label className="mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${className}`}
        ref={ref}
        {...props}
        id={id}/>
    </div>
  );
});

export default Input;
