import React from "react";

function Button({ text, onClick }) {
  return (
    <div>
      <button
        className="bg-violet-700 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
