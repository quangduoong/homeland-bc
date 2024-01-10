import React, { useEffect, useState } from "react";
import BarChart from "../../../charts/BarChart";

function ListingsStats({ listings }) {
  const [monthlyListings, setMonthlyListings] = useState({
    labels: [],
    dataSet: [],
  });

  useEffect(() => {
    listings?.map((item) => {
      setMonthlyListings({
        ...monthlyListings,
        labels: [...monthlyListings?.labels, new Date(item.createdAt)],
      });
    });
  }, [listings]);

  console.log(monthlyListings);

  return;
  // <div>
  //   {/* show stats of monthly number of listings created  */}
  //   <BarChart data={monthlyListings} />
  // </div>
}

export default ListingsStats;
