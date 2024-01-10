import React, { useEffect, useState } from "react";
import { BiCommentDetail, BiDetail, BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { apiUrl } from "../../assets/utils/constants";

function ForumPost({ data, setPostsLiked }) {
  const [seeMoreToggle, setSeeMoreToggle] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const limitOfString = 100;

  useEffect(() => {
    if (isLiked) {
      setPostsLiked((prev) => [...prev, data._id]);
    } else {
      setPostsLiked((prev) => prev.filter((item) => item !== data._id));
    }
  }, [isLiked]);

  const onLikeForumPost = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full flex-none">
          {" "}
          <Avatar name={data.owner.name} />
        </div>
        <div className="ml-1 h-fit hover:text-violet-800 cursor-pointer">
          {data.owner.name}
        </div>
      </div>
      <div className="mt-1">
        <div className="text-black text-xl font-bold">{data.title}</div>
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
        {data.image && (
          <div className="my-5">
            <img
              className="max-w-lg max-h-96"
              src={apiUrl + "/listings/" + data.owner.id + "/" + data.image}
              alt=""
            />
          </div>
        )}
        <div className="flex mt-1 gap-5">
          <div
            className="flex items-center h-5 text-violet-800 cursor-pointer"
            onClick={onLikeForumPost}
          >
            {isLiked ? (
              <div className="flex ">
                <AiFillLike size={20} />
                <span>I like this</span>
              </div>
            ) : (
              <div className="flex ">
                <BiLike size={20} />
                <span>{data.numLikes + " likes"}</span>
              </div>
            )}
          </div>
          <Link
            className="mb-1 flex items-center h-5 text-violet-800 cursor-pointer"
            to={`/forum/${data._id}`}
          >
            <BiDetail size={20} />
            <span>See More Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForumPost;
