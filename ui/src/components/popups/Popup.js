import React from "react";
import Popup from "reactjs-popup";
import PopupOverlay from "../PopupOverlay";

function Popup() {
  return (
    <Popup modal trigger={trigger}>
      {(close) => <PopupOverlay close={close}></PopupOverlay>}
    </Popup>
  );
}

export default Popup;
