import { Menu, Transition } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ListingsContext } from "../../../../context/Listings/ListingsContextProvider";
import BlockchainUtils from "../../../../blockchain/utils/blockchainUtils";
import successAlert from "../../../alerts/successAlert";
import { sendEmail, templates } from "../../../../blockchain/utils/emailUtils";
import { AuthContext } from "../../../../context/Auth/AuthContextProvider";

function ManageRenters({ _listings }) {
  const { updateListing } = useContext(ListingsContext);
  const [isShowAction, setIsShowAction] = useState();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(_listings);

  const { findUser } = useContext(AuthContext);

  const headers = [
    "Property",
    "Account ID",
    "ETH Address",
    "Date",
    "Amount",
    "Status",
  ];

  useEffect(() => {
    setListings(
      _listings.filter((listing) => {
        return (
          listing.depositStatus !== null && listing.depositStatus !== undefined
        );
      })
    );
    setLoading(false);
  }, []);

  function onMouseOver(idx) {
    setIsShowAction({
      isShow: true,
      row: idx,
    });
  }

  function onMouseOut() {
    setIsShowAction(false);
  }

  /** Deny buyer */
  function onDenyDeposit(listing) {
    Swal.fire({
      title: "Are you sure to deny?",
      html: "You can change your mind later, don't worry.",
      showConfirmButton: true,
      showCancelButton: true,
      timer: 15000,
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      var response = await updateListing({
        id: listing._id,
        data: {
          depositStatus: "Denied",
        },
      });

      if (response.success) {
        var user = await findUser(listing.depositBy);
        user = user.user;
        var success = await sendEmail(templates.get("deposit_changes"), {
          to_email: user.email,
          to_name: user.name,
          property_link: "http://localhost:3000/property/" + listing._id,
        });
        if (success) await successAlert("Denied successfully.");
      }

      window.location.reload();
    });
  }

  /** Remove the deposit completely, return the deposit to buyer */
  async function onRemoveDeposit(listing) {
    Swal.fire({
      title: "Remove this request completely?",
      html: "We will give the deposit back to buyer.",
      showConfirmButton: true,
      showCancelButton: true,
      timer: 15000,
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      var utils = new BlockchainUtils();
      var account = await utils.getCurrentAccount();
      utils.account = account;

      var success = await utils.transfer(
        listing._id,
        listing.depositBy,
        listing.depositAddress
      );

      if (success) {
        var response = await updateListing({
          id: listing._id,
          data: {
            depositStatus: null,
            depositBy: null,
            depositAmount: null,
            depositCreatedAt: null,
            depositAddress: null,
          },
        });
        if (response.success) {
          var user = await findUser(listing.depositBy);
          user = user.user;
          var success1 = await sendEmail(templates.get("deposit_changes"), {
            to_email: user.email,
            to_name: user.name,
            property_link: "http://localhost:3000/property/" + listing._id,
          });
          if (success1) await success("Removed successfully.");
        }
      }
      window.location.reload();
    });
  }

  /** Confirm the deposit, begin a contract between seller and buyer*/
  function onConfirmDeposit(listing) {
    Swal.fire({
      title: "Confirm deposit?",
      html: "We will notify buyer.",
      showConfirmButton: true,
      showCancelButton: true,
      timer: 15000,
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      var response = await updateListing({
        id: listing._id,
        data: {
          depositStatus: "Confirmed",
        },
      });

      if (response.success) {
        var user = await findUser(listing.depositBy);
        user = user.user;

        var success = await sendEmail(templates.get("deposit_changes"), {
          to_email: user.email,
          to_name: user.name,
          property_link: window.location.href,
        });

        if (success) await successAlert("Confirmed deposit.");
      }

      window.location.reload();
    });
  }

  /** Finish deposit status, go to the end of contract process */
  function onFinishDeposit(listing) {
    Swal.fire({
      title: "Finish with your buyer?",
      html: "This house is going to be marked as rented.",
      showConfirmButton: true,
      showCancelButton: true,
      timer: 15000,
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      var utils = new BlockchainUtils();
      var account = await utils.getCurrentAccount();
      utils.account = account;

      var success = await utils.transfer(
        listing._id,
        listing.depositBy,
        listing.depositAddress
      );

      if (success) {
        var response = await updateListing({
          id: listing._id,
          data: {
            depositStatus: "Finished",
          },
        });

        if (response.success) {
          var user = await findUser(listing.depositBy);
          user = user.user;

          var success = await sendEmail(templates.get("deposit_changes"), {
            to_email: user.email,
            to_name: user.name,
            property_link: "http://localhost:3000/property/" + listing._id,
          });

          if (success) await successAlert("Marked as finish.");
        }

        window.location.reload();
      }
    });
  }

  return (
    !loading && (
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-1 text-violet-700 border border-gray-200"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listings?.map((row, idx) => (
            <tr
              key={idx}
              className="cursor-default relative"
              onMouseOver={() => onMouseOver(idx)}
              onMouseOut={onMouseOut}
            >
              <td className="truncate max-w-[200px] border px-1 border-gray-200 hover:text-violet-700">
                <Link
                  to={"/property/" + row._id}
                  state={{
                    house: listings?.filter(
                      (item) => item._id !== row.listingId
                    )[0],
                  }}
                >
                  {row.title}
                </Link>
              </td>
              <td className="truncate max-w-[100px]  border px-1 border-gray-200 hover:text-violet-700">
                <Link to={"/profile/" + row.depositBy}>{row.depositBy}</Link>
              </td>
              <td className="truncate max-w-[100px] border px-1 border-gray-200">
                {row.depositAddress}
              </td>
              <td className="truncate border px-1 border-gray-200">
                {new Date(row.depositCreatedAt).toDateString()}
              </td>
              <td className="truncate border max-w-[50px] px-1 border-gray-200">
                {row.depositAmount + " ETH"}
              </td>
              <td
                className={`truncate border px-1 border-gray-200 ${
                  row.depositStatus === "Confirmed"
                    ? "text-green-500"
                    : row.depositStatus === "Denied" ||
                      row.depositStatus === "Finished"
                    ? "text-gray-500"
                    : row.depositStatus === "Pending"
                    ? "text-yellow-500"
                    : ""
                }`}
              >
                {row.depositStatus}
              </td>
              <td>
                <Transition
                  show={
                    isShowAction?.isShow &&
                    isShowAction?.row === idx &&
                    row.depositStatus !== "Finished"
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
                  <Menu as="div" className="relative w-[150px] z-10 text-right">
                    <Menu.Button>
                      <FiMoreVertical
                        size={20}
                        className="right-0 text-violet-700 w-full"
                      />
                    </Menu.Button>
                    <Menu.Items
                      as="div"
                      className="absolute z-10 w-full bg-gray-50 rounded p-2 text-right right-0"
                    >
                      {row.depositStatus !== "Confirmed" && (
                        <Menu.Item
                          as="div"
                          className="hover:bg-gray-200 rounded p-1 cursor-pointer"
                          onClick={() => onConfirmDeposit(row)}
                        >
                          Confirm
                        </Menu.Item>
                      )}
                      {row.depositStatus !== "Denied" && (
                        <Menu.Item
                          as="div"
                          className="hover:bg-gray-200 rounded p-1 cursor-pointer"
                          onClick={() => onDenyDeposit(row)}
                        >
                          Deny
                        </Menu.Item>
                      )}
                      {row.depositStatus !== "Finished" &&
                        row.depositStatus !== "Denied" &&
                        row.depositStatus !== "Pending" && (
                          <Menu.Item
                            as="div"
                            className="hover:bg-gray-200 rounded p-1 cursor-pointer"
                            onClick={() => onFinishDeposit(row)}
                          >
                            Finish
                          </Menu.Item>
                        )}
                      {row.depositStatus === "Denied" &&
                        row.depositStatus !== "Pending" && (
                          <Menu.Item
                            as="div"
                            className="hover:bg-gray-200 rounded p-1 cursor-pointer"
                            onClick={() => onRemoveDeposit(row)}
                          >
                            Remove
                          </Menu.Item>
                        )}
                    </Menu.Items>
                  </Menu>
                </Transition>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
}

export default ManageRenters;
// const [waitList, setWaitList] = useState();
// const [isLoading, setIsLoading] = useState(true);

// useEffect(() => {
//   setWaitList([]);
//   for (const listing of listings) {
//     if (listing.waitList?.length > 0) {
//       for (const person of listing.waitList) {
//         setWaitList((prev) => [
//           {
//             listingId: listing._id,
//             listingTitle: listing.title,
//             personId: person._id,
//             personName: person.name,
//             personEmail: person.email,
//             createdAt: person.createdAt,
//             date: person.date,
//             period: person.period,
//             status:
//               person.accepted === true
//                 ? "Accepted"
//                 : person.denied === true
//                 ? "Denied"
//                 : "Pending",
//           },
//           ...prev,
//         ]);
//       }
//     }
//   }

//   const dateCompare = (a, b) => {
//     return b.createdAt - a.createdAt;
//   };

//   waitList && setWaitList(waitList?.sort(dateCompare));
//   setIsLoading(false);
//   console.log(listings);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [setWaitList, listings]);

// return (
//   !isLoading && <SignedList waitList={waitList} setWaitList={setWaitList} />
// );
