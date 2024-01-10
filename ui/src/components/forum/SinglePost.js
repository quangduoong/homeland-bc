import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { AuthContext } from "../../context/Auth/AuthContextProvider";
import { ForumContext } from "../../context/Forum/ForumContextProvider";
import StatisticsPanel from "../StatisticsPanel";
import WhatAreYouThinkingPanel from "../WhatAreYouThinkingPanel";
import ActivityLists from "./ActivityLists";
import ForumPost from "./ForumPost";
import ForumPost_replies from "./ForumPost_replies";
import CreateReply from "./popup/CreateReply";
import ActionsBar from "./utils/actions/ActionsBar";

function SinglePost({ stats, setPostsLiked }) {
  const {
    forumState: { posts },
  } = useContext(ForumContext);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const [post, setPost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const findId = window.location.pathname.split("forum/")[1];

  useEffect(() => {
    for (const item of posts) {
      if (item._id === findId) {
        setPost(item);
        setIsLoading(false);
        return;
      }
    }
  }, []);

  return !isLoading ? (
    <div className="container min-h-[800px] m-auto flex justify-between">
      <div className="w-2/12 ">
        <ActivityLists />
        <br></br>
        <StatisticsPanel header="Our Forum Statistics" data={stats} />
      </div>
      <div className="w-9/12 flex-none relative">
        <div className="w-10/12">
          <div>
            <ForumPost data={post} setPostsLiked={setPostsLiked} />
          </div>
          <div className="my-4">
            <Popup
              modal
              trigger={
                <button className="w-full">
                  <WhatAreYouThinkingPanel />
                </button>
              }
            >
              {(close) => (
                <CreateReply
                  close={close}
                  postId={post._id}
                  setPost={setPost}
                />
              )}
            </Popup>
          </div>
          {post?.comments?.reverse().map((item, index) => (
            <div key={index}>
              <ForumPost_replies data={item} />
            </div>
          ))}
        </div>
        {user._id === post?.owner.id && (
          <div className="absolute top-0 right-0">
            <ActionsBar post={post} setPost={setPost} postId={findId} />
          </div>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}

export default SinglePost;
