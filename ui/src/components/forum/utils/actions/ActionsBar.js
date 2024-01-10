import React from "react";
import DeleteForumPost from "./DeleteForumPost";
import UpdateForumPost from "./UpdateForumPost";

function ActionsBar({ post, setPost, postId }) {
  return (
    <div className="flex gap-3">
      <div className="hover:text-violet-700 cursor-pointer" title="Update">
        <UpdateForumPost post={post} setPost={setPost} postId={postId} />
      </div>
      <div className="hover:text-violet-700 cursor-pointer" title="Delete">
        <DeleteForumPost post={post} setPost={setPost} postId={postId} />
      </div>
    </div>
  );
}

export default ActionsBar;
