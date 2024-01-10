import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/Auth/AuthContextProvider";
import { ForumContext } from "../../../context/Forum/ForumContextProvider";
import errorAlert from "../../alerts/errorAlert";
import successAlert from "../../alerts/successAlert";

function CreateReply({ close, postId, setPost }) {
  const { createComment } = useContext(ForumContext);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  // * create comment
  const onReply = async () => {
    const data = { name: user.name, content: comment };
    const cc = await createComment(postId, data);

    if (cc?.success) {
      await successAlert(cc.message);
      setPost((prev) => ({ ...prev, comments: cc.comments.reverse() }));
    } else if (!cc?.success) await errorAlert(cc.message);

    close();
  };

  return (
    <div className="relative top-0 left-0 w-screen h-screen bg-neutral-900/30 flex">
      <div className="w-full h-full" onClick={close}></div>
      <div
        className="fixed z-50 top-2/4 left-2/4 w-3/12 h-2/6 bg-white rounded drop-shadow-2xl p-5"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <form className="w-full h-5/6">
          <div className="w-full h-4/6">
            <label
              className="block uppercase font-bold tracking-wide text-gray-700 text-xs mb-2"
              htmlFor="grid-last-name"
            >
              Comment
            </label>
            <textarea
              className="appearance-none block w-full h-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-700 resize-none"
              id="grid-last-name"
              type="text"
              placeholder="..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
        </form>
        <button
          className="bg-violet-700 absolute right-5 bottom-5 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
          onClick={onReply}
        >
          Comment
        </button>
      </div>
    </div>
  );
}

export default CreateReply;
