import React, { useContext, useEffect, useRef, useState } from "react";
import MainForum from "../components/forum/MainForum";
import SinglePost from "../components/forum/SinglePost";
import { ForumContext } from "../context/Forum/ForumContextProvider";

// TODO post images
function Forum() {
  const {
    forumState: { forumLoading },
    getAllPosts,
    likePosts,
  } = useContext(ForumContext);
  const [numPosts, setNumPosts] = useState();
  const [postsLiked, setPostsLiked] = useState([]);
  const [state, setState] = useState();
  let postsLikedOnUnmount = useRef();
  const curUrl = window.location.pathname;
  const stats = [
    {
      key: "Posts",
      value: numPosts,
    },
  ];

  useEffect(() => {
    const loadPosts = async () => {
      const res = await getAllPosts();
      if (res?.success) {
        setNumPosts(res.posts.length);
      }
    };

    loadPosts();
    // unmount : set the likes
    return async () => {
      const ids = postsLikedOnUnmount.current;
      if (ids.length > 0) {
        // console.log(ids);
        const lp = await likePosts(ids);
      }
    };
  }, []);

  useEffect(() => {
    postsLikedOnUnmount.current = postsLiked;
  }, [postsLiked]);

  return (
    !forumLoading && (
      <div>
        {curUrl === "/forum" ? (
          <MainForum stats={stats} setPostsLiked={setPostsLiked} />
        ) : (
          <SinglePost stats={stats} setPostsLiked={setPostsLiked} />
        )}
      </div>
    )
  );
}

export default Forum;
