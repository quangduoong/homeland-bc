import React, { useContext } from "react";
import { AuthContext } from "../../../context/Auth/AuthContextProvider";
import Popup from "reactjs-popup";
import UpdateInfo from "../popups/UpdateInfo";
import PopupOverlay from "../../PopupOverlay";
import Avatar from "../../Avatar";

function PersonalInfo({ user }) {
  const me = useContext(AuthContext).authState.user;

  const items = user && [
    { key: "Name", value: user.name },
    { key: "Phone", value: user.phone },
    { key: "Email", value: user.email },
    {
      key: "Since",
      value: new Date(user.createdAt)?.toDateString(),
    },
  ];

  return (
    user && (
      <div className="mb-2 bg-gray-50 rounded mx-auto  p-2">
        <div className="bg-white p-4 rounded">
          <div className="mb-1  w-24 h-24 text-3xl mx-auto">
            <Avatar name={user?.name} />
          </div>
          <div>
            <div className="mx-auto">
              {items.map((item, index) => (
                <div key={index} className="flex mb-2 text-sm ">
                  <div className="align-text-bottom">{item.key + ":"}</div>
                  <div className="font-bold ml-1 w-full truncate">
                    {item.value ?? "null"}
                  </div>
                </div>
              ))}
            </div>
            {me?._id === user._id && (
              <Popup
                modal
                trigger={
                  <div className="cursor-pointer underline underline-offset-2 text-xs text-violet-700">
                    Update your information
                  </div>
                }
              >
                {(close) => (
                  <PopupOverlay
                    className="transition ease-in-out duration-300 "
                    close={close}
                    width="w-3/12"
                    height="h-5/6"
                  >
                    <UpdateInfo user={user} close={close} />
                  </PopupOverlay>
                )}
              </Popup>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default PersonalInfo;
