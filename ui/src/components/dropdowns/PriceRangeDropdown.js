import React, { useState } from "react";
// import icons
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
// import headless ui components
import { Menu } from "@headlessui/react";

const PriceRangeDropdown = ({ searchData, setSearchData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const prices = [
    "Price(any)",
    "<100",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
    ">1000",
  ];

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiMapPinLine className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">
            {searchData.price}
          </div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu max-h-[300px] overflow-y-auto">
        {prices.map((price, index) => {
          const string =
            index === 0 || index === 1 || index === prices.length - 1
              ? price
              : `${price}-${prices[index + 1]}`;

          return (
            <Menu.Item
              as="li"
              onClick={() =>
                setSearchData({
                  ...searchData,
                  price: string,
                })
              }
              key={index}
              className="cursor-pointer hover:text-violet-700 transition"
            >
              {string}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PriceRangeDropdown;
