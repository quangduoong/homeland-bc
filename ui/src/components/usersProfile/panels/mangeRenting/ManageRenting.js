import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context/Auth/AuthContextProvider";
import { ListingsContext } from "../../../../context/Listings/ListingsContextProvider";
import House from "../../../House";

function ManageRenting({ onWaitList }) {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState();
  const { getAvailable } = useContext(ListingsContext);
  const {
    authState: { user },
  } = useContext(AuthContext);

  async function init() {
    const response = await getAvailable();

    setListings(
      response.listings.filter((listing, _) => listing.depositBy === user._id)
    );

    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    !loading && (
      <div className="absolute right-0 p-1 grid grid-cols-2 flex justify-between lg:gap-14">
        {listings.map((listing, index) => (
          <div
            className="w-fit relative"
            key={index}
            // onMouseOver={() => onMouseOver(index)}
          >
            <Link to={`/property/${listing._id}`} state={{ house: listing }}>
              <House house={listing} />
            </Link>
          </div>
        ))}
      </div>
    )
  );
}

export default ManageRenting;
//   const headers = ["Property", "Seller", "Date", "Amount", "Status"];
// const listings

//   const {
//     authState: { user },
//   } = useContext(AuthContext);
//   const {
//     listingsState: { listings },
//   } = useContext(ListingsContext);

//   const [isShowAction, setIsShowAction] = useState();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const dateCompare = (a, b) => {
//       return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//     };
//     onWaitList && onWaitList.sort(dateCompare).reverse();
//     setIsLoading(false);
//   }, [onWaitList]);

//   const onMouseOver = (idx) => {
//     setIsShowAction({
//       isShow: true,
//       row: idx,
//     });
//   };

//   const onPay = async (listingId) => {
//     const pay = await getApis("post", "/payment/create-payment/", {
//       item: { listingId, personId: user._id, price: 10000 },
//     });
//     window.location.href = pay.data.url;
//   };

//   const onMouseOut = () => {
//     setIsShowAction(false);
//   };

//   return (
//     !isLoading && (
//       <table className="table-auto w-full text-left border-collapse">
//         <thead>
//           <tr>
//             {headers.map((header, index) => (
//               <th
//                 key={index}
//                 className="px-1 text-violet-700 border border-gray-200"
//               >
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {onWaitList?.map((row, idx) => (
//             <tr
//               key={idx}
//               className=" relative "
//               onMouseOver={() => onMouseOver(idx)}
//               onMouseOut={onMouseOut}
//             >
//               <td className="truncate border px-1 border-gray-200 hover:text-violet-700">
//                 <Link
//                   to={"/property/" + row.listingId}
//                   state={{
//                     house: listings?.filter(
//                       (item) => item._id !== row.listingId
//                     )[0],
//                   }}
//                 >
//                   {row.listingTitle}
//                 </Link>
//               </td>
//               <td className="truncate border px-1 border-gray-200">
//                 {new Date(row.createdAt).toDateString()}
//               </td>
//               <td className="truncate border px-1 border-gray-200">
//                 {row.date}
//               </td>
//               <td className="truncate border px-1 border-gray-200">
//                 {row.period}
//               </td>
//               <td
//                 className={`truncate border px-1 border-gray-200 ${
//                   row.accepted === true
//                     ? "text-green-500"
//                     : row.denied === true
//                     ? "text-red-500"
//                     : "text-yellow-500"
//                 }`}
//               >
//                 {row.accepted === true
//                   ? "Accepted"
//                   : row.denied === true
//                   ? "Denied"
//                   : "Pending"}
//               </td>
//               <td>
//                 <Transition
//                   show={
//                     row.accepted &&
//                     isShowAction?.isShow &&
//                     isShowAction?.row === idx
//                       ? true
//                       : false
//                   }
//                   enter="transition-opacity duration-300"
//                   enterFrom="opacity-0"
//                   enterTo="opacity-100"
//                   leave="transition-opacity duration-300"
//                   leaveFrom="opacity-100"
//                   leaveTo="opacity-0"
//                   className="absolute top-1 right-0"
//                 >
//                   <Menu as="div" className="relative w-[150px] z-10 text-right">
//                     <Menu.Button>
//                       <FiMoreVertical
//                         size={20}
//                         className="right-0 text-violet-700 w-full"
//                       />
//                     </Menu.Button>
//                     <Menu.Items
//                       as="div"
//                       className="absolute z-10 w-full bg-gray-50 rounded p-2 text-right right-0"
//                     >
//                       {row.accepted && (
//                         <Menu.Item
//                           as="div"
//                           className="hover:bg-gray-200 rounded p-1 cursor-pointer"
//                           onClick={() => onPay(row.listingId)}
//                         >
//                           Pay
//                         </Menu.Item>
//                       )}
//                     </Menu.Items>
//                   </Menu>
//                 </Transition>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     )
//   );
