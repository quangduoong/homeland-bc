import React, { useContext, useRef, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { ForumContext } from "../../../../context/Forum/ForumContextProvider";
import successAlert from "../../../alerts/successAlert";
import Button from "../../../layouts/Button";
import Input from "../../../layouts/Input";
import Popup from "reactjs-popup";
import TextArea from "../../../layouts/TextArea";
import PopupOverlay from "../../../layouts/PopupOverlay";
import errorAlert from "../../../alerts/errorAlert";

function UpdateForumPost({ post, setPost, postId }) {
  const form = useRef();
  const { updateForumPost } = useContext(ForumContext);

  const onUpdateForumPost = async (e, close) => {
    e.preventDefault();
    const title = form.current.title.value;
    const content = form.current.content.value;

    if (!title || !content) {
      return await errorAlert("Not enough information.");
    }

    const up = await updateForumPost(postId, { title, content });

    if (up?.success) {
      await successAlert(up.message);

      close();
      setPost(up.post);
    } else if (up) {
      await errorAlert(up.message);
    }
  };
  return (
    <Popup
      modal
      trigger={
        <div>
          <BiPencil size={30} />
        </div>
      }
    >
      {(close) => (
        <PopupOverlay close={close} width_height="w-1/3 h-3/5">
          <div>
            <form ref={form}>
              <Input
                name="title"
                type="text"
                placeholder="..."
                defaultValue={post.title}
              />
              <div className="h-2/3">
                <TextArea
                  name="content"
                  placeholder="..."
                  defaultValue={post.content}
                />
              </div>
              <div className="text-right">
                <Button
                  text="Update"
                  onClick={(e) => onUpdateForumPost(e, close)}
                />
              </div>
            </form>
          </div>
        </PopupOverlay>
      )}
    </Popup>
  );
}

export default UpdateForumPost;
