import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StatisticsPanel from "../components/StatisticsPanel";
import PersonalInfo from "../components/usersProfile/panels/PersonalInfo";
import YourListings from "../components/usersProfile/panels/YourListings";
import { AuthContext } from "../context/Auth/AuthContextProvider";
import { ListingsContext } from "../context/Listings/ListingsContextProvider";

function OthersProfile() {
  const location = useLocation();
  const [user, setUser] = useState(location?.state?.user);
  const [isLoading, setIsLoading] = useState(true);
  const { getUsersListings } = useContext(ListingsContext);
  const { findUser } = useContext(AuthContext);
  const [listings, setListings] = useState();

  useEffect(() => {
    const loadUser = async () => {
      if (!user) {
        const fu = await findUser(
          window.location.pathname.split("profile/")[1]
        );
        setUser(fu.user);
      }
    };
    const loadUsersListings = async () => {
      const gul = await getUsersListings(user._id);
      setListings(gul.listings);
    };
    const load = async () => {
      await loadUser();
      if (user) {
        await loadUsersListings();
        setIsLoading(false);
      }
    };
    load();
  }, [user]);

  const stats = [
    { key: "Listings", value: listings && listings.length },
    { key: "Rating", value: "4.5" },
  ];

  if (isLoading) return "";

  return (
    <div className="flex container h-[600px] mx-auto justify-between">
      <div className=" w-1/5 ">
        <PersonalInfo user={user} />
        <StatisticsPanel header="About user" data={stats} />
      </div>
      <div className="w-8/12 relative -mt-12 pt-12 flex-none overflow-y-auto">
        <YourListings data={listings} isMineListings={false} />
      </div>
    </div>
  );
}

export default OthersProfile;
