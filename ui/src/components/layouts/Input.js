import React from "react";

function Input({ name, type, placeholder, onChange, value, defaultValue }) {
  return (
    <div className="w-full">
      <label
        className="block uppercase font-bold tracking-wide text-gray-700 text-xs mb-2"
        htmlFor={name}
      >
        {name}
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-700"
        id={name}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      ></input>
    </div>
  );
}

export default Input;
