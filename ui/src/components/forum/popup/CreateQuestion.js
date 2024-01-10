import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../context/Auth/AuthContextProvider";
import { ForumContext } from "../../../context/Forum/ForumContextProvider";
import errorAlert from "../../alerts/errorAlert";
import successAlert from "../../alerts/successAlert";

function CreateQuestion({ close }) {
  const { createPost, createNoImagePost } = useContext(ForumContext);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const form = useRef();

  const onPost = async (e) => {
    e.preventDefault();

    if (!form.current.title.value || !form.current.content.value) {
      return await errorAlert("Not enough information");
    }

    const fd = new FormData(form.current);
    fd.append("name", user.name);

    let cp;
    if (form.current.image.value) {
      cp = await createPost(fd);
    } else cp = await createNoImagePost(fd);

    if (cp?.success) {
      await successAlert(cp.message);
      close();
    } else if (!cp?.success) {
      await errorAlert(cp.message);
    }
  };

  return (
    <div className="relative top-0 left-0 w-screen h-screen bg-neutral-900/30 flex">
      <div className="w-full h-full" onClick={close}></div>
      <div
        className="fixed z-50 top-2/4 left-2/4 w-3/12 h-3/5 bg-white rounded drop-shadow-2xl p-5"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <form ref={form} encType="multipart/form-data" className="w-full h-5/6">
          <div className="w-full">
            <label
              className="block uppercase font-bold tracking-wide text-gray-700 text-xs mb-2"
              htmlFor="grid-first-name"
            >
              Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-700"
              id="grid-first-name"
              type="text"
              placeholder="..."
              name="title"
            ></input>
          </div>
          <div className="w-full h-4/6">
            <label
              className="block uppercase font-bold tracking-wide text-gray-700 text-xs mb-2"
              htmlFor="grid-last-name"
            >
              Content
            </label>
            <textarea
              className="appearance-none block w-full h-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-700 resize-none"
              id="grid-last-name"
              type="text"
              placeholder="..."
              name="content"
            ></textarea>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>
          <button
            className="bg-violet-700 absolute right-5 bottom-5 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
            onClick={onPost}
          >
            Button
          </button>
        </form>{" "}
      </div>{" "}
    </div>
  );
}

export default CreateQuestion;
