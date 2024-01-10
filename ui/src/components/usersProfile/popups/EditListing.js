import React, { useContext, useRef } from "react";
import { BiEdit } from "react-icons/bi";
import Popup from "reactjs-popup";
import { ListingsContext } from "../../../context/Listings/ListingsContextProvider";
import errorAlert from "../../alerts/errorAlert";
import successAlert from "../../alerts/successAlert";
import { districts } from "../../dropdowns/DistrictDropdown";
import PopupOverlay from "../../PopupOverlay";

function EditListing({ listing }) {
  const { updateListing } = useContext(ListingsContext);
  const form = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();

    const list = [
      { key: "title" },
      { key: "description" },
      { key: "bathrooms" },
      { key: "bedrooms" },
      { key: "status" },
      { key: "address", nested: ["details", "district", "city"] },
      { key: "area", nested: ["length", "width"] },
      { key: "payment", nested: ["price", "period"] },
    ];

    let data = new FormData(form.current);

    // append nested object
    for (const item of list) {
      if (item.nested?.length > 0)
        for (const nested of item.nested) {
          data.delete(item.key + "." + nested);
          data.append(
            item.key + "[" + nested + "]",
            form.current[item.key + "." + nested].value
          );
        }
    }

    // check empty fields
    for (const item of list) {
      if (item.nested?.length > 0)
        for (const nested of item.nested) {
          if (!form.current[item.key + "." + nested].value)
            return await errorAlert("Not enough information!");
        }
      else {
        if (!form.current[item.key].value) {
          console.log(item.key);

          return await errorAlert("Not enough information!");
        }
      }
    }

    const res = await updateListing({ id: listing._id, data });
    if (res?.success) {
      await successAlert(res.message);
      window.location.reload();
    }
  };

  return (
    <Popup
      modal
      trigger={
        <div>
          <BiEdit size={30} className="hover:text-violet-700 rounded" />
        </div>
      }
    >
      {(close) => (
        <PopupOverlay close={close} width="w-2/3" height="h-5/6">
          <form
            className="flex gap-10"
            ref={form}
            encType="multipart/form-data"
            onSubmit={onSubmit}
          >
            <div className="w-1/2">
              <div className="mb-6">
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
                  defaultValue={listing.title}
                ></input>
              </div>
              <div className="w-full mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                  id="address"
                  type="text"
                  placeholder="Đường 3 Tháng 2, Phường 12, Quận 10, TPHCM"
                  name="address.details"
                  defaultValue={listing.address.details}
                ></input>
                <div id="area" className="flex mb-6 gap-6">
                  <div className="relative">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="district"
                    >
                      District
                    </label>
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="district"
                      name="address.district"
                      defaultValue={listing.address.district}
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
                    >
                      City
                    </label>
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="city"
                      name="address.city"
                      defaultValue={listing.address.city}
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
              <div className="w-full mb-6 md:mb-0">
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
                  defaultValue={listing.description}
                ></textarea>
              </div>
            </div>
            {/* form 2 */}
            <div className="w-1/2">
              <div className="flex justify-between mb-6">
                <div className="w-full md:w-3/6 ">
                  <label
                    className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="area"
                  >
                    AREA (unit: meters)
                  </label>
                  <div id="area" className="flex justify-between">
                    <input
                      className="appearance-none block w-5/12 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      placeholder="length"
                      name="area.length"
                      defaultValue={listing.area.length}
                    ></input>
                    *
                    <input
                      className="appearance-none block w-5/12 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      placeholder="width"
                      name="area.width"
                      defaultValue={listing.area.width}
                    ></input>
                  </div>
                </div>
                <div className="flex md:w-2/5">
                  <div className="md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="num-of-bathrooms"
                    >
                      Bathrooms
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="num-of-bathrooms"
                      placeholder="1"
                      name="bathrooms"
                      defaultValue={listing.bathrooms}
                    ></input>
                  </div>
                  <div className="px-3  md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="num-of-bedrooms"
                    >
                      Bedrooms
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="num-of-bedrooms"
                      type="text"
                      placeholder="2"
                      name="bedrooms"
                      defaultValue={listing.bedrooms}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="price"
                  type="text"
                  placeholder="2"
                  name="payment.price"
                  defaultValue={listing.payment.price}
                ></input>
              </div>
              <div className="flex gap-6 mb-6">
                <div className=" mb-6 md:mb-0">
                  <label
                    className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="period"
                  >
                    for
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="period"
                      name="payment.period"
                      defaultValue={listing.payment.period}
                    >
                      <option value="" disabled defaultValue></option>
                      <option value="day">a day</option>
                      <option value="month">a month</option>
                      <option value="year">a year</option>
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
                <div>
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="status"
                  >
                    status
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="status"
                      name="status"
                      defaultValue={listing.status}
                    >
                      <option value="" disabled defaultValue></option>
                      <option value="for rent">for rent</option>
                      <option value="shared room">shared room</option>
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
              <div className="mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="images"
                >
                  Images
                </label>
                <input
                  name="images"
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  multiple
                />
              </div>
              <div className="text-right">
                <button
                  className="mx-3 bg-slate-200 hover:bg-gray-300 py-2 px-4 rounded"
                  onClick={close}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-violet-700 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </PopupOverlay>
      )}
    </Popup>
  );
}

export default EditListing;
