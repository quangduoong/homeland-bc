import React, { useContext, useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";

// import components
import Banner from "../components/Banner";
import HouseList from "../components/HouseList";
import Search from "../components/Search";
import { ListingsContext } from "../context/Listings/ListingsContextProvider";

const Home = () => {
  const {
    listingsState: { listingsLoading },
    getAvailable,
  } = useContext(ListingsContext);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await getAvailable();

      setListings(res.listings);
    };
    loadData();
    // console.log(listings);
  }, []);

  return listingsLoading ? (
    <ImSpinner9 className="m-auto text-5xl text-violet-500"></ImSpinner9>
  ) : (
    <div>
      <Banner setListings={setListings} />
      {/* <Search setListings={setListings} /> */}
      <HouseList listings={listings} setListings={setListings} />
    </div>
  );
};

export default Home;
