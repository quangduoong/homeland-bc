import React from "react";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import { apiUrl } from "../assets/utils/constants";

const House = ({ house }) => {
  return (
    <div className="bg-white drop-shadow-md p-5 rounded rounded-tl-[90px] w-full max-w-[352px] h-[500px] mx-auto cursor-pointer hover:shadow-lg transition">
      <img
        className="mb-8 rounded rounded-tl-[90px] h-[230px]"
        src={
          house.images?.[0] &&
          `${apiUrl}/listings/${house.owner}/${house.images[0]}`
        }
        alt=""
      />
      <div className="mb-4 flex gap-x-2 text-sm truncate">
        <div
          className={`rounded-full text-white px-3 inline-block font-bold ${
            house.status === "for rent"
              ? "bg-green-100 text-green-500"
              : "bg-sky-100 text-sky-500"
          }`}
        >
          {house.status}
        </div>
        <div className="rounded-full text-white px-3 inline-block font-bold bg-gray-100 text-gray-500">
          {house.address.district}
        </div>
        <div className="rounded-full text-white px-3 inline-block font-bold bg-gray-100 text-gray-500">
          {house.address.city}
        </div>
      </div>
      {/* title  */}
      <div className="text-lg font-semibold max-w-[260px] truncate">
        {house.title}
      </div>
      {/* address  */}
      <div className="text-gray inline-block text-sm overflow-hidden">
        {house.address?.details +
          ", " +
          house.address?.district +
          ", " +
          house.address?.city}
      </div>
      <div className="flex gap-x-4 my-4">
        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px] rounded-full">
            <BiBed />
          </div>
          <div className="text-base">{house.bedrooms}</div>
        </div>
        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px] rounded-full">
            <BiBath />
          </div>
          <div className="text-base">{house.bathrooms}</div>
        </div>
        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px] rounded-full">
            <BiArea />
          </div>
          <div className="text-base">
            {house.area.length + "*" + house.area.width + "m2"}
          </div>
        </div>
      </div>
      <div className="text-lg font-semibold text-violet-600 mb-4">
        $ {house.payment.price + "/" + house.payment.period}
      </div>
    </div>
  );
};

export default House;
