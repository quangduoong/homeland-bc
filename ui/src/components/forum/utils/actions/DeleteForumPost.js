import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { ForumContext } from "../../../../context/Forum/ForumContextProvider";
import errorAlert from "../../../alerts/errorAlert";
import successAlert from "../../../alerts/successAlert";
import warningAlert from "../../../alerts/warningAlert";

function DeleteForumPost({ setPost, postId }) {
  const { deleteForumPost } = useContext(ForumContext);
  const navigate = useNavigate();

  const onDeleteForumPost = async () => {
    const alert = await warningAlert("Delete this post?");

    if (alert?.isConfirmed) {
      const dp = await deleteForumPost(postId);

      if (dp?.success) {
        await successAlert(dp.message);
        setPost(undefined);
        navigate("/forum");
      } else if (dp) {
        await errorAlert(dp.message);
      }
    }
  };

  return (
    <div onClick={onDeleteForumPost}>
      <BiTrash size={30} />
    </div>
  );
}

export default DeleteForumPost;
