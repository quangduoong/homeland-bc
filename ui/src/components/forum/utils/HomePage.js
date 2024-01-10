import React, { useContext } from "react";
import { BiHome } from "react-icons/bi";
import { ForumContext } from "../../../context/Forum/ForumContextProvider";

function HomePage() {
  const { getAllPosts } = useContext(ForumContext);

  const onClick = async () => {
    await getAllPosts();
  };
  return (
    <div className="flex" onClick={onClick}>
      <BiHome size={18} /> Home page
    </div>
  );
}

export default HomePage;
