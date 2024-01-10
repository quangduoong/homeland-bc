import React, { useState } from "react";
import Comment from "./utils/Comment";
import CreateComment from "./utils/CreateComment";

function CommentSection({ listingId, personId, comments, ownerId }) {
  const [updatedComments, setUpdatedComments] = useState(comments);
  const [seeMoreToggle, setSeeMoreToggle] = useState(false);

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-5">Comments</h2>
      <div className="mb-5">
        <CreateComment
          listingId={listingId}
          personId={personId}
          setUpdatedComments={setUpdatedComments}
        />
      </div>
      {updatedComments?.map((item, idx) => (
        <div key={idx} className="my-2">
          <Comment
            personId={item.personId}
            comment={item.comment}
            setSeeMoreToggle={setSeeMoreToggle}
            seeMoreToggle={seeMoreToggle}
            idx={idx}
          />
          <div className="-mt-3 ml-12"></div>
        </div>
      ))}
    </div>
  );
}

export default CommentSection;
