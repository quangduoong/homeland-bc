import React, { useContext, useEffect } from "react";
import House from "./House";
import { Link } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import { ListingsContext } from "../context/Listings/ListingsContextProvider";

const HouseList = ({ listings, setListings }) => {
  const {
    listingsState: { listingsLoading },
  } = useContext(ListingsContext);

  const originalListings = useContext(ListingsContext).listingsState.listings;

  useEffect(() => {
    if (!listings) {
      console.log(originalListings);
      setListings(originalListings);
    }
  }, []);

  if (listings?.length < 1) {
    return (
      <div className="text-center text-3xl text-gray-400 mt-48">
        Sorry, nothing was found.
      </div>
    );
  }
  if (listingsLoading) {
    return (
      <ImSpinner9 className="mx-auto animate-spin text-violet-700 text-5xl mt-[200px]" />
    );
  }

  return (
    listings && (
      <section className="mb-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
            {listings?.map((house, index) => {
              return (
                <Link
                  to={`/property/${house._id}`}
                  key={index}
                  state={{ house: house }}
                >
                  <House house={house} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    )
  );
};

export default HouseList;
