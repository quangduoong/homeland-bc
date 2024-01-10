import React, { useState } from "react";
import Avatar from "../Avatar";

function ForumPost_replies({ data }) {
  const [seeMoreToggle, setSeeMoreToggle] = useState(false);
  const limitOfString = 100;

  return (
    <div>
      <div className="flex mt-2">
        <div className="w-10 h-10 rounded-full flex-none">
          <Avatar name={data.owner.name} />
        </div>

        <div className="ml-3 bg-slate-50 p-2 rounded">
          <div className="text-xs">{data.owner.name}</div>
          <div className=" max-w-2xl">
            {data.content.length > limitOfString ? (
              <span>
                {seeMoreToggle
                  ? data.content
                  : data.content.substr(0, limitOfString)}
                <span
                  onClick={() => setSeeMoreToggle(true)}
                  className="cursor-pointer"
                >
                  {" "}
                  {seeMoreToggle ? "" : " ...See more"}
                </span>
              </span>
            ) : (
              data.content
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumPost_replies;
