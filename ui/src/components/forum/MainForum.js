import React, { useContext, useEffect } from "react";
import WhatAreYouThinkingPanel from "../WhatAreYouThinkingPanel";
import ActivityLists from "./ActivityLists";
// import ForumPost from "./ForumPost";
import CreateQuestion from "./popup/CreateQuestion";
import Popup from "reactjs-popup";
import StatisticsPanel from "../StatisticsPanel";
import { ForumContext } from "../../context/Forum/ForumContextProvider";
import ForumPost from "./ForumPost";

function MainForum({ stats, setPostsLiked }) {
  const {
    forumState: { posts },
  } = useContext(ForumContext);

  const postsLastChild = posts.length - 1;

  return (
    <div className="container m-auto flex justify-between">
      <div className="w-2/12 h-fit ">
        <ActivityLists />
        <br></br>
        <StatisticsPanel header="Our Forum Statistics" data={stats} />
      </div>
      <div className="w-9/12 flex-none">
        <div className="w-10/12">
          <div className="mb-4">
            <Popup
              modal
              trigger={
                <button className="w-full">
                  <WhatAreYouThinkingPanel />
                </button>
              }
            >
              {(close) => <CreateQuestion close={close} />}
            </Popup>
          </div>

          {posts &&
            posts?.map((item, index) => (
              <div key={index}>
                <ForumPost data={item} setPostsLiked={setPostsLiked} />
                {postsLastChild === index ? (
                  ""
                ) : (
                  <div className="w-full h-0.5 round-full bg-slate-50 my-3"></div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MainForum;
