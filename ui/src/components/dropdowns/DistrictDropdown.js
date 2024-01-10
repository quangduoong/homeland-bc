import React, { useState } from "react";
// import icons
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
// import headless ui components
import { Menu } from "@headlessui/react";

export const districts = [
  "District(any)",
  "District 1",
  "District 2",
  "District 3",
  "District 4",
  "District 5",
  "District 6",
  "District 7",
  "District 8",
  "District 9",
  "District 10",
  "District 11",
  "District 12",
  "Thu Duc",
  "Binh Tan",
  "Tan Binh",
  "Tan Phu",
  "Phu Nhuan",
  "Binh Thanh",
  "Go Vap",
  "Hoc Mon",
  "Binh Chanh",
  "Nha Be",
  "Cu Chi",
];

const DistrictDropdown = ({ searchData, setSearchData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiMapPinLine className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">
            {searchData.district}
          </div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu  overflow-y-auto max-h-[300px]">
        {districts.map((district, index) => (
          <Menu.Item
            as="li"
            onClick={() => setSearchData({ ...searchData, district: district })}
            key={index}
            className="cursor-pointer hover:text-violet-700 transition"
          >
            {district}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default DistrictDropdown;
