import React, { useContext, useEffect, useState } from "react";
import { BiCommentDetail, BiLike } from "react-icons/bi";
import { AuthContext } from "../../../context/Auth/AuthContextProvider";
import Avatar from "../../Avatar";

function Comment({
  personId,
  comment,
  setRepliesToggle,
  setSeeMoreToggle,
  seeMoreToggle,
  idx,
}) {
  const { findUser } = useContext(AuthContext);
  const [commenter, setCommenter] = useState({});
  const limitOfString = 100;

  useEffect(() => {
    const loadCommenter = async () => {
      const fu = await findUser(personId);
      setCommenter(fu.user);
    };
    loadCommenter();
  }, []);

  return (
    commenter && (
      <div className="flex">
        <div className="w-10 h-10 rounded-full flex-none">
          <Avatar name={commenter?.name} />
        </div>
        <div className="ml-3">
          <div className="text-slate-700 text-xs">{commenter.name}</div>
          <div className="max-w-2xl">
            {comment?.length > limitOfString ? (
              <span>
                {seeMoreToggle === idx
                  ? comment
                  : comment.substr(0, limitOfString)}
                <span
                  onClick={() => setSeeMoreToggle(idx)}
                  className="cursor-pointer"
                >
                  {seeMoreToggle === idx ? "" : " ...See more"}
                </span>
              </span>
            ) : (
              comment
            )}
          </div>
          <div className="flex mt-1">
            <div className="flex items-center h-5 text-violet-800 cursor-pointer"></div>
          </div>
        </div>
      </div>
    )
  );
}

export default Comment;
