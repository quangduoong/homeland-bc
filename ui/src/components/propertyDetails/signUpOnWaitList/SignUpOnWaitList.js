import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Popup from "reactjs-popup";
import PopupOverlay from "../../PopupOverlay";

function SignUpOnWaitList({ onSubmit }) {
  const [data, setData] = useState({
    date: "",
    number: "",
    period: "",
  });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Popup
        modal
        trigger={
          <button className="font-bold bg-violet-700 p-3 text-white rounded">
            Sign up on wait list
          </button>
        }
      >
        {(close) => (
          <PopupOverlay close={close} width="w-1/6" height="1/3">
            <form>
              <div className=" mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="title"
                >
                  Anticipated date
                </label>
                <input
                  className="appearance-none w-full block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="title"
                  type="date"
                  name="date"
                  value={data.date}
                  onChange={onChange}
                ></input>
              </div>
              <div className="relative ">
                <label
                  htmlFor="for"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  For
                </label>
                <div id="for" className="flex gap-2">
                  <input
                    className="appearance-none block w-1/2 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="number"
                    value={data.number}
                    onChange={onChange}
                  ></input>
                  <div className="relative">
                    <select
                      className="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="period"
                      name="period"
                      value={data.period}
                      onChange={onChange}
                    >
                      <option value="" disabled defaultValue></option>
                      <option value="day">day</option>
                      <option value="month">month</option>
                      <option value="year">year</option>
                    </select>
                    <FiChevronDown className="absolute top-3 right-2" />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button
                  className="bg-violet-700 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
                  onClick={(e) =>
                    onSubmit(e, {
                      date: data.date,
                      period: data.number + " " + data.period,
                    })
                  }
                >
                  Submit
                </button>
              </div>
            </form>
          </PopupOverlay>
        )}
      </Popup>
    </div>
  );
}

export default SignUpOnWaitList;
