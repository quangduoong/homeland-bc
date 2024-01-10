import { Transition } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import { BiRecycle, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/Auth/AuthContextProvider";
import { ListingsContext } from "../../../context/Listings/ListingsContextProvider";
import errorAlert from "../../alerts/errorAlert";
import successAlert from "../../alerts/successAlert";
import warningAlert from "../../alerts/warningAlert";
import House from "../../House";

function GetDeletedListings() {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { getMyDeletedListings, restoreListing, hardDeleteListing } =
    useContext(ListingsContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isShowAction, setIsShowAction] = useState({});

  useEffect(() => {
    const loadListings = async () => {
      const gmdl = await getMyDeletedListings(user._id);
      setListings(gmdl.listings);
      setLoading(false);
    };
    loadListings();
  }, []);

  const onRestore = async (listingId) => {
    const wa = await warningAlert("Restore this listing?");

    if (wa.isConfirmed) {
      const rl = await restoreListing(listingId);
      if (rl?.success) {
        await successAlert(rl.message);
        window.location.href = "/me";
      } else if (rl) {
        await errorAlert(rl.message);
      }
    }
  };

  const onHardDelete = async (listingId) => {
    const wa = await warningAlert("Delete this listing permanently?");

    if (wa.isConfirmed) {
      const hdl = await hardDeleteListing(listingId);
      if (hdl?.success) {
        await successAlert(hdl.message);
        setListings(listings.filter((item) => item._id !== hdl.listing._id));
        window.location.href = "/me";
      } else if (hdl) {
        await errorAlert(hdl.message);
      }
    }
  };

  return (
    !loading && (
      <div>
        <div className="absolute right-0 p-1 grid grid-cols-2 flex justify-between lg:gap-14">
          {listings?.map((item, index) => (
            <div
              className="relative"
              onMouseOver={() => setIsShowAction({ isShow: true, idx: index })}
              key={index}
            >
              <Link to={"/property/" + item._id} state={{ house: item }}>
                <House house={item} />
              </Link>
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
                <div className="flex gap-2 absolute top-0 right-0 bg-white rounded p-2 opacity-50 hover:opacity-100 transition ease-in-out z-50">
                  <BiRecycle
                    size={30}
                    className="hover:text-violet-700 rounded"
                    onClick={() => onRestore(item._id)}
                  />
                  <BiTrash
                    size={30}
                    className="hover:text-violet-700 rounded"
                    onClick={() => onHardDelete(item._id)}
                  />
                </div>
              </Transition>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default GetDeletedListings;
