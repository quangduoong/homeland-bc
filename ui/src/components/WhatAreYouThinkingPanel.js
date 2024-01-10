import React, { useContext } from "react";
import { AuthContext } from "../context/Auth/AuthContextProvider";
import Avatar from "./Avatar";

function WhatAreYouThinkingPanel() {
  const {
    authState: { user },
  } = useContext(AuthContext);

  return (
    <div>
      <div className="flex">
        <div className="flex-none w-10 h-10 text-sm">
          <Avatar name={user?.name} />
        </div>
        <div className="bg-slate-50 w-full h-10 rounded flex items-center px-2 ml-3 cursor-text">
          <span className="text-zinc-500 h-fit ">
            What are you thinking? :)
          </span>
        </div>
      </div>
    </div>
  );
}

export default WhatAreYouThinkingPanel;
