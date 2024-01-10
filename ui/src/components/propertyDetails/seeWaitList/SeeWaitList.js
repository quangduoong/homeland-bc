import React from "react";
import PopupOverlay from "../../PopupOverlay";
import Popup from "reactjs-popup";
import SeeWaitListTable from "./SeeWaitListTable";

function SeeWaitList({ waitList }) {
  return (
    <Popup
      modal
      trigger={
        <button className="font-bold bg-violet-700 px-2 text-white rounded">
          See wait list
        </button>
      }
    >
      {(close) => (
        <PopupOverlay close={close} width="w-1/2" height="h-96">
          <SeeWaitListTable waitList={waitList} />
        </PopupOverlay>
      )}
    </Popup>
  );
}

export default SeeWaitList;
