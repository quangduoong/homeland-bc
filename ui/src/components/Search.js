import React, { useContext, useState } from "react";
// import icon
import { RiSearch2Line } from "react-icons/ri";
import { ListingsContext } from "../context/Listings/ListingsContextProvider";
import CityDropdown from "./dropdowns/CityDropdown";
import DistrictDropdown from "./dropdowns/DistrictDropdown";
import PriceRangeDropdown from "./dropdowns/PriceRangeDropdown";
import StatusDropdown from "./dropdowns/StatusDropdown";

const Search = ({ setListings }) => {
  const [searchData, setSearchData] = useState({
    city: "City(any)",
    district: "District(any)",
    status: "Status(any)",
    price: "Price(any)",
  });

  const { search } = useContext(ListingsContext);

  const onSearch = () => {
    const data = {};

    for (const key in searchData) {
      if (searchData[key].toString().match("any")) {
        Object.assign(data, { [key]: "" });
      } else Object.assign(data, { [key]: searchData[key] });
    }

    // create price range
    let newPrice;

    if (data.price === "") {
      newPrice = [];
    } else if (data.price === "<100") {
      newPrice = [0, 100];
    } else if (data.price === ">1000") {
      newPrice = [1000, 99999999999];
    } else {
      const from = data.price.split("-")[0];
      const to = data.price.split("-")[1];
      newPrice = [parseInt(from), parseInt(to)];
    }

    data.price = newPrice;

    // filter
    const filteredListings = search(data);
    setListings(filteredListings);
  };

  return (
    <div className="px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded z-10">
      <CityDropdown searchData={searchData} setSearchData={setSearchData} />
      <DistrictDropdown searchData={searchData} setSearchData={setSearchData} />
      <StatusDropdown searchData={searchData} setSearchData={setSearchData} />
      <PriceRangeDropdown
        searchData={searchData}
        setSearchData={setSearchData}
      />
      <button
        onClick={onSearch}
        className="bg-violet-700 hover:bg-violet-800 transition w-full lg:max-w-[162px] h-16 rounded flex justify-center items-center text-white text-lg"
      >
        <RiSearch2Line />
      </button>
    </div>
  );
};

export default Search;
