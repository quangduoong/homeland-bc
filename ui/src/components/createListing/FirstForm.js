import React from "react";
import { districts } from "../dropdowns/DistrictDropdown";

function FirstForm({ data, setData, setNextFormState }) {
  const handleOnChangeValue = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "details" || name === "district" || name === "city") {
      setData({
        ...data,
        address: {
          ...data.address,
          [name]: value,
        },
      });
    } else
      setData({
        ...data,
        [name]: value,
      });
  };

  return (
    <div className="">
      <form className="">
        <div className=" -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="title"
              type="text"
              placeholder="Hà Đô Centrosa Garden"
              name="title"
              value={data.title}
              onChange={handleOnChangeValue}
            ></input>
          </div>
        </div>
        {/*  */}
        <div className=" -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address"
              type="text"
              placeholder="Đường 3 Tháng 2, Phường 12, Quận 10, TPHCM"
              name="details"
              value={data.address.details}
              onChange={handleOnChangeValue}
            ></input>
            <div id="area" className="flex justify-between">
              <div className="relative">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="district"
                ></label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="district"
                  name="district"
                  value={data.address.district}
                  onChange={handleOnChangeValue}
                >
                  <option value="" disabled defaultValue>
                    District
                  </option>
                  {districts.slice(1).map((district, index) => (
                    <option value={district} key={index}>
                      {district}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="city"
                ></label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="city"
                  name="city"
                  value={data.address.city}
                  onChange={handleOnChangeValue}
                >
                  <option value="" disabled defaultValue>
                    City
                  </option>
                  <option value="TPHCM">TPHCM</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="-mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="decription"
            >
              Description
            </label>
            <textarea
              className="appearance-none resize-none block w-full h-48 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="decription"
              type="text"
              placeholder="Chung cư Hà Đô Centrosa là dự án khu căn hộ cao cấp hạng sang tọa lạc tại trung tâm TPHCM. Với vị trí ngay vòng xoay Dân Chủ, dự án Hà Đô Centrosa Garden sở hữu những lợi thế thuận lợi di chuyển mà ít có căn hộ nào có được. Dự án này thuộc sở hữu của Công Ty Cổ Phần Hà Đô, một trong những tên tuổi khá quen thuộc của thị trường bất động sản TPHCM."
              name="description"
              value={data.description}
              onChange={handleOnChangeValue}
            ></textarea>
          </div>
        </div>
        {/*  */}
      </form>
      <div className="text-right">
        <button
          className="bg-violet-700 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
          onClick={() => setNextFormState(true)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FirstForm;
