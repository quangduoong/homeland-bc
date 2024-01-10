import React from "react";

const InputForm = ({
  label,
  value,
  setValue,
  keyPayload,
  invalidFields,
  setInvalidFields,
  type,
}) => {
  return (
    <div>
      <label htmlFor={keyPayload} className="text-xs">
        {label}
      </label>
      <input
        type={type || "text"}
        id={keyPayload}
        className="outline-none bg-gray-200 p-2 rounded w-full"
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [keyPayload]: e.target.value }))
        }
        onFocus={() => setInvalidFields([])}
      />
      {invalidFields.length > 0 &&
        invalidFields.some((i) => i.name === keyPayload) && (
          <small className="text-red-500 italic">
            {invalidFields.find((i) => i.name === keyPayload)?.message}
          </small>
        )}
    </div>
  );
};

export default InputForm;
