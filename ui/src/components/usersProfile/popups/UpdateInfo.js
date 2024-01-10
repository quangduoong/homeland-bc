import React, { useContext, useRef, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/Auth/AuthContextProvider";

function UpdateInfo({ user, close }) {
  const form = useRef(null);
  const { updateUser } = useContext(AuthContext);
  const fields = [
    "name",
    "phone",
    "email",
    "id Number",
    "date Of Birth",
    "address",
  ];

  const onSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(form.current);
    await updateUser(data).then((res) => {
      res.success
        ? Swal.fire({
            icon: "success",
            title: "Updated successfully.",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => close())
        : Swal.fire({
            icon: "error",
            title: "Update failed.",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => close());
    });
  };
  return (
    user && (
      <div>
        <form
          ref={form}
          onSubmit={onSubmit}
          encType="multipart/form-data"
          className="w-full h-5/6"
        >
          {fields.map((field, index) => (
            <div key={index} className="w-full h-4/6">
              <label className="block uppercase font-bold tracking-wide text-gray-700 text-xs mb-2">
                {field}
              </label>
              <input
                className="appearance-none block w-full h-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-700 resize-none"
                type={field === "date Of Birth" ? "date" : "text"}
                defaultValue={user[field]}
                name={field.split(" ").join("")}
              ></input>
            </div>
          ))}

          <button
            className="bg-violet-700 absolute right-5 bottom-5 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    )
  );
}

export default UpdateInfo;
