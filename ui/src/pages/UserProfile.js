import { Tab } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import StatisticsPanel from "../components/StatisticsPanel";
import GetDeletedListings from "../components/usersProfile/panels/GetDeletedListings";
import PersonalInfo from "../components/usersProfile/panels/PersonalInfo";
import YourListings from "../components/usersProfile/panels/YourListings";
import ManageRenters from "../components/usersProfile/panels/manageRenters/ManageRenters";
import ManageRenting from "../components/usersProfile/panels/mangeRenting/ManageRenting";
import { AuthContext } from "../context/Auth/AuthContextProvider";
import { ListingsContext } from "../context/Listings/ListingsContextProvider";

function UserProfile() {
  const { getUsersListings } = useContext(ListingsContext);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const a = user?.isOwner ? "Manage renters" : "Manage rentings";
  const tabs = ["Active Listings", "Deleted Listings", a];
  const [data, setData] = useState();

  useEffect(() => {
    const load = async () => {
      const res = await getUsersListings(user._id);
      setData(res?.listings);
    };
    load();
  }, []);

  const stats = [
    { key: "Listings", value: data && data.length },
    { key: "Rating", value: "4.5" },
  ];

  return (
    user && (
      <Tab.Group
        as="div"
        className="flex container h-[600px] mx-auto justify-between"
      >
        {/* user's avatar + info */}
        <div className=" w-1/5 ">
          <Tab.List className="mb-5">
            {tabs.map((tab, index) => (
              <Tab
                as="div"
                key={index}
                className={({ selected }) =>
                  `hover:text-violet-700 mb-1 p-1 -ml-1 cursor-default outline-none ${
                    selected ? "bg-gray-100 rounded text-violet-700" : ""
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <PersonalInfo user={user} />

          <StatisticsPanel header="About user" data={stats} />
        </div>
        <Tab.Panels className="w-8/12 relative -mt-12 pt-12 flex-none overflow-y-auto">
          <Tab.Panel as="div" className="">
            <YourListings data={data} isMineListings={true} />
          </Tab.Panel>
          <Tab.Panel as="div">
            <GetDeletedListings />
          </Tab.Panel>
          <Tab.Panel as="div">
            {user?.isOwner ? (
              <ManageRenters _listings={data} />
            ) : (
              <ManageRenting onWaitList={user.onWaitList} listings={data} />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    )
  );
}

export default UserProfile;
