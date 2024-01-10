import React from "react";

function PopupOverlay({ close, width, height, children }) {
  return (
    <div className="relative top-0 left-0 w-screen h-screen bg-neutral-900/30 flex">
      <div className="w-full h-full" onClick={close}></div>
      <div
        className={
          "fixed z-50 top-2/4 left-2/4 bg-white rounded drop-shadow-2xl p-5 overflow-y-auto" +
          " " +
          width +
          " " +
          height
        }
        style={{ transform: "translate(-50%,-50%)" }}
      >
        {children}
      </div>
    </div>
  );
}

export default PopupOverlay;
