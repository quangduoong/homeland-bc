import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { ListingsContext } from "../../../context/Listings/ListingsContextProvider";
import errorAlert from "../../alerts/errorAlert";
import successAlert from "../../alerts/successAlert";
import PopupOverlay from "../../PopupOverlay";
import WhatAreYouThinkingPanel from "../../WhatAreYouThinkingPanel";

function PopupComponent({ close, personId, listingId, setUpdatedComments }) {
  const [comment, setComment] = useState("");
  const { postComment } = useContext(ListingsContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!personId) navigate("/signin");
  }, []);

  return (
    personId && (
      <PopupOverlay close={close} width="w-2/5" height="h-2/5">
        <div className="h-full">
          <textarea
            className="resize-none appearance-none block w-full h-5/6 mb-2 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="text-right">
            <button
              className="bg-violet-700 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
              onClick={async () => {
                const pc = await postComment({
                  listingId,
                  personId,
                  comment,
                });

                if (pc?.success) {
                  await successAlert(pc.message);
                  setUpdatedComments(pc.listing.comments.reverse());
                  close();
                } else {
                  errorAlert(pc?.message);
                }
              }}
            >
              Post
            </button>
          </div>
        </div>
      </PopupOverlay>
    )
  );
}

function CreateComment({ listingId, personId, setUpdatedComments }) {
  return (
    <Popup
      modal
      trigger={
        <div>
          <WhatAreYouThinkingPanel></WhatAreYouThinkingPanel>
        </div>
      }
    >
      {(close) => (
        <PopupComponent
          close={close}
          personId={personId}
          listingId={listingId}
          setUpdatedComments={setUpdatedComments}
        />
      )}
    </Popup>
  );
}

export default CreateComment;
