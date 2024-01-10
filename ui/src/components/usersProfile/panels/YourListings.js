import React, { useContext, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { ImSpinner9 } from "react-icons/im";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ListingsContext } from "../../../context/Listings/ListingsContextProvider";
import House from "../../House";
import dog from "../../../assets/img/3dDesigns/Dog.png";
import EditListing from "../popups/EditListing";
import { Transition } from "@headlessui/react";

function YoursListings({ data, isMineListings }) {
  const { deleteListing } = useContext(ListingsContext);
  const [isShowAction, setIsShowAction] = useState();

  if (!data) {
    return <ImSpinner9 className="animate-spin text-3xl text-violet-700" />;
  }

  const onMouseOver = (idx) => {
    setIsShowAction({ isShow: true, idx });
  };

  const onDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Delete this listing?",
      showConfirmButton: true,
      confirmButtonColor: "#7F56D9",
      showCancelButton: true,
      cancelButtonColor: "gray",
    }).then(
      (result) =>
        result.isConfirmed &&
        deleteListing(id).then((res) =>
          res.success
            ? Swal.fire({
                icon: "success",
                title: res.message,
                showConfirmButton: false,
                timer: 1500,
              }).then(() => window.location.reload())
            : Swal.fire({
                icon: "error",
                title: res.message,
              })
        )
    );
  };

  return data.length <= 0 ? (
    dog && (
      <div className="h-[500px] flex bg-gradient-to-r from-violet-600 to-violet-400 rounded relative">
        <img
          src={dog}
          className="absolute right-0 bottom-0 h-[400px] w-auto reverse z-10"
          alt=""
        ></img>
        <div className="w-11/12 h-5/6 rounded bg-white m-auto opacity-80 p-20 pr-64">
          <div className="text-violet-700 text-6xl font-bold uppercase mb-10">
            Nothing to see here...
          </div>
          <div className="">
            This person does not have any listings.
            <br /> Let's move on.
          </div>
        </div>
      </div>
    )
  ) : (
    <div className="absolute right-0 p-1 grid grid-cols-2 flex justify-between lg:gap-14">
      {data.map((listing, index) => (
        <div
          className="w-fit relative"
          key={index}
          onMouseOver={() => onMouseOver(index)}
        >
          <Link to={`/property/${listing._id}`} state={{ house: listing }}>
            <House house={listing} />
          </Link>
          {isMineListings && (
            <Transition
              show={
                isShowAction?.isShow && isShowAction?.idx === index
                  ? true
                  : false
              }
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute top-1 right-0"
            >
              <div className="flex gap-2 absolute top-0 right-0 bg-white rounded p-2 opacity-50 hover:opacity-100 transition ease-in-out">
                <EditListing listing={listing} />
                <BiTrash
                  size={30}
                  className="hover:text-violet-700 rounded"
                  onClick={() => onDelete(listing._id)}
                />
              </div>
            </Transition>
          )}
        </div>
      ))}
    </div>
  );
}

export default YoursListings;
