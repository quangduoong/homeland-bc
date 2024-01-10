import React, { useState } from "react";
// import icons
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
// import headless ui components
import { Menu } from "@headlessui/react";

const StatusDropdown = ({ searchData, setSearchData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const statuses = ["Status(any)", "For rent", "Shared room"];

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiMapPinLine className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">
            {searchData.status}
          </div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {statuses.map((status, index) => (
          <Menu.Item
            as="li"
            onClick={() => setSearchData({ ...searchData, status: status })}
            key={index}
            className="cursor-pointer hover:text-violet-700 transition"
          >
            {status}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default StatusDropdown;
