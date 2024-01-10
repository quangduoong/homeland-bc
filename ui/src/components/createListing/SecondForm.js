import React from "react";

function SecondForm({
  data,
  setData,
  setImages,
  setNextFormState,
  handleOnSubmit,
}) {
  const handleOnChangeValue = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "length" || name === "width") {
      setData({
        ...data,
        area: {
          ...data.area,
          [name]: value,
        },
      });
    } else if (name === "price" || name === "period") {
      setData({
        ...data,
        payment: {
          ...data.payment,
          [name]: value,
        },
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleOnChoosingImages = (event) => {
    const length = event.target.files.length;

    if (length > 5) {
      alert("You can only choose up to 5 images.");
    } else {
      // for (let i = 0; i < length; i++) {
      //   const target = event.target.files[i];
      //   target.fileindex = i;
      // }
      setImages(event.target.files);
    }
  };

  return (
    <div className="max-w-lg">
      <form
        className=""
        encType="multipart/form-data"
        onSubmit={handleOnSubmit}
      >
        <div className="flex -mx-3 mb-2 justify-between">
          <div className="w-full md:w-3/6 px-3 ">
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
                name="length"
                value={data.area.length}
                onChange={handleOnChangeValue}
              ></input>
              *
              <input
                className="appearance-none block w-5/12 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="width"
                name="width"
                value={data.area.width}
                onChange={handleOnChangeValue}
              ></input>
            </div>
          </div>
          <div className="flex md:w-2/5">
            <div className=" px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="num-of-bathrooms"
              >
                Bathrooms
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="num-of-bathrooms"
                placeholder="1"
                name="bathrooms"
                value={data.bathrooms}
                onChange={handleOnChangeValue}
              ></input>
            </div>
            <div className="  px-3 mb-6 md:mb-0">
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
                value={data.bedrooms}
                onChange={handleOnChangeValue}
              ></input>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="-mx-3 mb-6 flex">
          <div className="flex flex-1">
            <div className="w-1/2 px-3 mb-6 md:mb-0">
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
                name="price"
                value={data.payment.price}
                onChange={handleOnChangeValue}
              ></input>
            </div>
            /
            <div className=" px-3 mb-6 md:mb-0">
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
                  name="period"
                  value={data.payment.period}
                  onChange={handleOnChangeValue}
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
          </div>
          <div className="md:w-1/3 px-3 mb-6 md:mb-0">
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
                value={data.status}
                onChange={handleOnChangeValue}
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
        <div>
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
            onChange={handleOnChoosingImages}
          />
        </div>
        <div className="text-right">
          <button
            className="mx-3 bg-slate-200 hover:bg-slate-300 py-2 px-4 rounded"
            onClick={() => setNextFormState(false)}
          >
            Back
          </button>
          <button
            className="bg-violet-700 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
}

export default SecondForm;
