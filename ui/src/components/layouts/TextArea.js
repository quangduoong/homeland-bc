import React from "react";

function TextArea({ name, placeholder, value, onChange, defaultValue }) {
  return (
    <div className="w-full h-full">
      <label
        className="block uppercase font-bold tracking-wide text-gray-700 text-xs mb-2"
        htmlFor={name}
      >
        {name}
      </label>
      <textarea
        className="appearance-none block w-full h-48 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-700 resize-none"
        id={name}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      ></textarea>
    </div>
  );
}

export default TextArea;
