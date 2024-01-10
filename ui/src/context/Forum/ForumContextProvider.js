import React, { createContext, useReducer } from "react";
import errorCatch from "../utils/errorCatch";
import getApis from "../utils/getApis";
import reducer from "./forumReducer";

const ForumContext = createContext();

function ForumContextProvider({ children }) {
  const iniState = {
    forumLoading: true,
    posts: [],
  };
  const [forumState, dispatch] = useReducer(reducer, iniState);

  // * functions
  // * delete post
  const deleteForumPost = async (postId) => {
    try {
      const res = await getApis("delete", "/forum/delete-post/" + postId);

      if (res?.data?.success) {
        dispatch({
          type: "SET_POSTS",
          payload: {
            posts: forumState.posts.filter((item) => item._id !== postId),
          },
        });
      }

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * update post
  const updateForumPost = async (postId, data) => {
    try {
      const res = await getApis("put", "/forum/update-post/" + postId, data);

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * get user's forum posts
  const getUsersPosts = async (userId) => {
    try {
      const res = await getApis("get", "/forum/get-posts/" + userId);

      if (res?.data?.success)
        dispatch({
          type: "SET_POSTS",
          payload: { posts: res?.data?.posts.reverse() },
        });

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * like posts
  const likePosts = async (ids) => {
    try {
      const res = await getApis("put", "/forum/like-posts", { ids });

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * create comment
  const createComment = async (postId, data) => {
    try {
      const res = await getApis("put", "/forum/create-comment/" + postId, data);

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * get all posts
  const getAllPosts = async () => {
    try {
      const res = await getApis("get", "/forum/get-all-posts");

      if (res?.data?.success) {
        dispatch({
          type: "SET_POSTS",
          payload: { posts: res.data.posts.reverse() },
        });
      }

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * create post without images
  const createNoImagePost = async (data) => {
    try {
      const res = await getApis("post", "/forum/create-no-image-post", data);

      if (res?.data?.success) {
        dispatch({
          type: "SET_POSTS",
          payload: { posts: [res.data.post, ...forumState.posts] },
        });
      }

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * create post
  const createPost = async (data) => {
    try {
      const res = await getApis("post", "/forum/create-post", data);

      if (res?.data?.success) {
        dispatch({
          type: "SET_POSTS",
          payload: { posts: [res.data.post, ...forumState.posts] },
        });
      }

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };

  const value = {
    forumState,
    createNoImagePost,
    deleteForumPost,
    updateForumPost,
    createPost,
    getAllPosts,
    createComment,
    likePosts,
    getUsersPosts,
  };

  return (
    <ForumContext.Provider value={value}>{children}</ForumContext.Provider>
  );
}

export { ForumContext };
export default ForumContextProvider;
