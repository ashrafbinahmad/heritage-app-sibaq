import React from "react";

export default function InputText({ value, onChange, placeholder, id }) {
  return (
    <input
      id={id}
      className="border-[0.5px] focus:border-gray-700 bg-[#d5dae0] focus:bg-gray-50 p-2 border-transparent border-solid rounded w-full placeholder:text-[14px] placeholder:text-gray-600 outline-none"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
