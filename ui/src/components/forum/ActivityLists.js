import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomePage from "./utils/HomePage";
import SeeYourPosts from "./utils/SeeYourPosts";

function ActivityLists() {
  const [isActive, setIsActive] = useState();

  return (
    <ul className="list-none text-sm">
      <li
        className={
          "hover:text-violet-700 mb-1 p-1 -ml-1 cursor-default outline-none" +
          (isActive === "1" && " bg-gray-100 rounded text-violet-700")
        }
        id="1"
        onClick={() => setIsActive("1")}
      >
        <Link to="/forum">
          <HomePage />
        </Link>
      </li>
      <li
        className={
          "hover:text-violet-700 mb-1 p-1 -ml-1 cursor-default outline-none" +
          (isActive === "2" && " bg-gray-100 rounded text-violet-700")
        }
        id="2"
        onClick={() => setIsActive("2")}
      >
        <Link to="/forum">
          <SeeYourPosts />
        </Link>
      </li>
    </ul>
  );
}

export default ActivityLists;
