import { Menu, Transition } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../context/Auth/AuthContextProvider";
import { ListingsContext } from "../../../../../context/Listings/ListingsContextProvider";
import successAlert from "../../../../alerts/successAlert";
import warningAlert from "../../../../alerts/warningAlert";

function SignedList({ waitList, setWaitList }) {
  const [isShowAction, setIsShowAction] = useState();
  const {
    listingsState: { listings },
    acceptOwnersWaitList,
    denyOwnersRequest,
  } = useContext(ListingsContext);
  const { acceptRentersWaitList, denyRentersRequest } = useContext(AuthContext);

  const headers = [
    "Property",
    "Account",
    "Date signed",
    "Date anticipated",
    "Period",
    "Status",
  ];

  const onMouseOver = (idx) => {
    setIsShowAction({
      isShow: true,
      row: idx,
    });
  };

  const onMouseOut = () => {
    setIsShowAction(false);
  };

  const onAcceptRenter = async (listingId, personId) => {
    const res = await warningAlert(
      "Are you sure?",
      "Accept this reservation will notify this person, the procedure will be completed."
    );

    if (res.isConfirmed) {
      // * accept on owner's side
      const aoos = await acceptOwnersWaitList({ listingId, personId });
      // * accept on renter's side
      const aors = await acceptRentersWaitList({ listingId, personId });

      if (aoos?.success === true && aors?.success === true) {
        await successAlert(aoos.message);

        // update state status
        const newState = waitList.map((obj) => {
          if (obj.listingId === listingId && obj.personId === personId) {
            return { ...obj, status: "Accepted" };
          }
          return obj;
        });
        setWaitList(newState);
      } else return;
    }
  };

  const onDenyRenter = async (listingId, personId) => {
    const res = await warningAlert(
      "Do you want to deny this request (permanent)?"
    );

    if (res.isConfirmed) {
      // * deny on owner's side
      const doos = await denyOwnersRequest({ listingId, personId });
      // * deny on renter's side
      const dors = await denyRentersRequest({ listingId, personId });

      if (doos?.success === true && dors?.success === true) {
        await successAlert(doos.message);

        // update state status
        const newState = waitList.map((obj) => {
          if (obj.listingId === listingId && obj.personId === personId) {
            return { ...obj, status: "Denied" };
          }
          return obj;
        });
        setWaitList(newState);
      } else return;
    }
  };

  return (
    <table className="table-auto w-full text-left border-collapse">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="px-1 text-violet-700 border border-gray-200"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {waitList?.map((row, idx) => (
          <tr
            key={idx}
            className=" relative "
            onMouseOver={() => onMouseOver(idx)}
            onMouseOut={onMouseOut}
          >
            <td className="truncate border px-1 border-gray-200 hover:text-violet-700">
              <Link
                to={"/property/" + row.listingId}
                state={{
                  house: listings?.filter(
                    (item) => item._id !== row.listingId
                  )[0],
                }}
              >
                {row.listingTitle}
              </Link>
            </td>
            <td className="truncate border px-1 border-gray-200 hover:text-violet-700">
              <Link to={"/profile/" + row.personId}>{row.personName}</Link>
            </td>
            <td className="truncate border px-1 border-gray-200">
              {new Date(row.createdAt).toDateString()}
            </td>
            <td className="truncate border px-1 border-gray-200">{row.date}</td>
            <td className="truncate border px-1 border-gray-200">
              {row.period}
            </td>
            <td
              className={`truncate border px-1 border-gray-200 ${
                row.status === "Accepted"
                  ? "text-green-500"
                  : row.status === "Denied"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              {row.status}
            </td>
            <td>
              <Transition
                show={
                  isShowAction?.isShow && isShowAction?.row === idx
                    ? true
                    : false
                }
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute top-1 right-0"
              >
                <Menu as="div" className="relative w-[150px] z-10 text-right">
                  <Menu.Button>
                    <FiMoreVertical
                      size={20}
                      className="right-0 text-violet-700 w-full"
                    />
                  </Menu.Button>
                  <Menu.Items
                    as="div"
                    className="absolute z-10 w-full bg-gray-50 rounded p-2 text-right right-0"
                  >
                    {row.status !== "Accepted" && (
                      <Menu.Item
                        as="div"
                        className="hover:bg-gray-200 rounded p-1 cursor-pointer"
                        onClick={() =>
                          onAcceptRenter(row.listingId, row.personId)
                        }
                      >
                        Accept
                      </Menu.Item>
                    )}
                    {row.status !== "Denied" && (
                      <Menu.Item
                        as="div"
                        className="hover:bg-gray-200 rounded p-1 cursor-pointer"
                        onClick={() =>
                          onDenyRenter(row.listingId, row.personId)
                        }
                      >
                        Deny
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Menu>
              </Transition>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SignedList;
