import React, { useContext } from "react";
import { BiNews } from "react-icons/bi";
import { AuthContext } from "../../../context/Auth/AuthContextProvider";
import { ForumContext } from "../../../context/Forum/ForumContextProvider";

function SeeYourPosts() {
  const { getUsersPosts } = useContext(ForumContext);
  const {
    authState: { user },
  } = useContext(AuthContext);

  const onClick = async () => {
    await getUsersPosts(user._id);
  };

  return (
    <div className="flex" onClick={onClick}>
      <BiNews size={18} /> See your posts
    </div>
  );
}

export default SeeYourPosts;
