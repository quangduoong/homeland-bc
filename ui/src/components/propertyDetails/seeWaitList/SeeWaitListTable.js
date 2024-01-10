import { Menu, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";

function SeeWaitListTable({ waitList }) {
  const headers = [
    // "ID",
    "Name",
    "Email",
    "Date created",
    "Date anticipated",
    "Period",
  ];
  const [isShowAction, setIsShowAction] = useState({
    isShow: false,
    rowId: undefined,
  });

  const onMouseOver = (rowId) => {
    setIsShowAction({ isShow: true, rowId });
  };

  const onMouseOut = () => {
    setIsShowAction({ isShow: false, rowId: undefined });
  };

  return (
    <table className="table-fixed w-full text-left border-collapse ">
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th
              key={idx}
              className="w-1/3 px-1 text-violet-700 border border-gray-200"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {waitList?.map((person, idx) => (
          <tr
            key={idx}
            className="w-full relative "
            onMouseOver={() => onMouseOver(person._id)}
            onMouseOut={onMouseOut}
          >
            {/* <td className="truncate border px-1  border-gray-200">
              {person._id}
            </td> */}
            <td className="truncate border px-1 border-gray-200">
              {person.name}
            </td>
            <td className="truncate border px-1 border-gray-200">
              {person.email}
            </td>
            <td className="truncate border px-1 border-gray-200">
              {new Date(person.createdAt).toDateString()}
            </td>
            <td className="truncate border px-1 border-gray-200">
              {person.date}
            </td>
            <td className="truncate border px-1 border-gray-200">
              {person.period}
            </td>
            <td>
              <Transition
                show={
                  isShowAction.isShow && isShowAction.rowId === person._id
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
                <Menu as="div" className="relative w-[150px] text-right z-10">
                  <Menu.Button>
                    <FiMoreVertical
                      size={20}
                      className="right-0 w-full text-violet-700"
                    />
                  </Menu.Button>
                  <Menu.Items
                    as="div"
                    className="absolute z-10 w-full bg-gray-50 rounded p-2 text-right right-0"
                  >
                    <Menu.Item
                      as="div"
                      className="hover:bg-gray-200 rounded p-1"
                    >
                      <Link
                        to={"/profile/" + person._id}
                        state={{ user: person }}
                      >
                        Visit profile
                      </Link>
                    </Menu.Item>
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

export default SeeWaitListTable;
