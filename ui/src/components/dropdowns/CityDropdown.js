import React, { useState } from "react";
// import icons
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
// import headless ui components
import { Menu } from "@headlessui/react";

const CityDropdown = ({ searchData, setSearchData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cities = ["City(any)", "TPHCM", "Ha Noi"];

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiMapPinLine className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">
            {searchData.city}
          </div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {cities.map((city, index) => (
          <Menu.Item
            as="li"
            onClick={() => setSearchData({ ...searchData, city: city })}
            key={index}
            className="cursor-pointer hover:text-violet-700 transition"
          >
            {city}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default CityDropdown;
