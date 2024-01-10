import React, { useEffect, useState } from "react";

function Avatar({ name }) {
  const [acronym, setAcronym] = useState();

  useEffect(() => {
    setAcronym(
      name
        ?.split(/\s/)
        .reduce((response, word) => (response += word.slice(0, 1)), "")
    );
  }, [name]);

  return (
    <div className="inline-flex overflow-hidden relative justify-center items-center w-full h-full bg-violet-100 rounded-full">
      <span className="font-bold text-violet-700">{acronym}</span>
    </div>
  );
}

export default Avatar;
