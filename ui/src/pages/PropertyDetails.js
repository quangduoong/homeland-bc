import emailjs from "@emailjs/browser";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiArea, BiBath, BiBed } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import swal from "sweetalert2";
import { apiUrl } from "../assets/utils/constants";
import BlockchainUtils from "../blockchain/utils/blockchainUtils";
import Avatar from "../components/Avatar";
import Carousel from "../components/Carousel";
import CommentSection from "../components/comments/CommentSection";
import DepositStatus from "../components/propertyDetails/popup/DepositStatus";
import { AuthContext } from "../context/Auth/AuthContextProvider";
import { ListingsContext } from "../context/Listings/ListingsContextProvider";
import Swal from "sweetalert2";
import successAlert from "../components/alerts/successAlert";
import errorAlert from "../components/alerts/errorAlert";

const PropertyDetails = () => {
  const location = useLocation();
  const [owner, setOwner] = useState({
    _id: "",
    name: "",
    phone: "",
    email: "",
    createdAt: "",
    isOwner: "",
    ethAddress: "",
  });
  const [house, setHouse] = useState(location?.state?.house);
  const [addedToWaitList, setAddedToWaitList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // context
  const {
    authState: { user, isAuthenticated },
    findUser,
    setOnWaitList,
  } = useContext(AuthContext);
  const { signUpOnWaitList, getListing, updateListing } =
    useContext(ListingsContext);

  useEffect(() => {
    const loadHouse = async () => {
      const gl = await getListing(
        window.location.pathname.split("property/")[1]
      );
      setHouse(gl.listing);
    };

    const loadOwner = async () => {
      const res = await findUser(house?.owner);
      setOwner(res?.user);
    };

    const isOnList = () => {
      const a = user?.onWaitList?.some(
        (listing) => listing.listingId === house?._id
      );
      if (a) {
        setAddedToWaitList(true);
      }
    };

    const loadAll = async () => {
      if (!house) {
        await loadHouse();
      } else {
        await loadOwner();
        isOnList();
        setIsLoading(false);
      }
    };
    loadAll();
  }, [house]);

  // * use emailjs to send mail
  const form = useRef();

  const handleOnSubmitContact = async (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_8m1jw59",
        "template_wvm7j17",
        form.current,
        "zobxarPOeuHdXuByf"
      )
      .then(
        () => {
          swal.fire({
            icon: "success",
            title: "Sent email successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          swal.fire({
            icon: "error",
            title: error.text,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  };

  // const onSignUpWaitList = async (e, data) => {
  //   e.preventDefault();

  //   const u = user && {
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     ...data,
  //   };
  //   const update = await signUpOnWaitList({ id: house._id, data: u });

  //   if (update?.success) {
  //     await successAlert(update.message);
  //     await setOnWaitList({
  //       listingId: house._id,
  //       listingTitle: house.title,
  //       ...data,
  //     });
  //     window.location.reload();
  //   } else errorAlert(update.message);
  // };

  async function onSendingDeposit() {
    var account = user.ethAddress;
    var utils = new BlockchainUtils(account);

    if (utils.account === undefined || utils.account === null) {
      account = await utils.getCurrentAccount();
      utils.account = account;
    }

    Swal.fire({
      title: "Are you sure?",
      html: "You are making a deposit of 1 ETH for this property.",
      showConfirmButton: true,
      showCancelButton: true,
      timer: 15000,
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      var ethAmount = 1;
      var success = await utils.sendDeposit(
        ethAmount,
        user._id,
        owner._id,
        owner.ethAddress,
        house
      );

      if (success) {
        await updateListing({
          id: house._id,
          data: {
            depositStatus: "Pending",
            depositAmount: ethAmount,
            depositBy: user._id,
            depositAddress: account,
            depositCreatedAt: Date.now(),
          },
        });
        await successAlert("Deposit confirmed!");
        window.location.href("http://localhost:3000/me");
      } else {
        await errorAlert("Deposit failed.");
      }
    });
  }

  if (isLoading) return "";

  return (
    <div className="container mx-auto min-h-[800px] mb-14 box-border">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{house?.title}</h2>
          <h3 className="text-lg mb-4">
            {house.address?.details +
              ", " +
              house.address?.district +
              ", " +
              house.address?.city}
          </h3>
        </div>
        <div className="mb-4 flex gap-x-2 text-sm">
          <div
            className={`${
              house.status === "for rent"
                ? "bg-green-100 text-green-500"
                : "bg-sky-100 text-sky-500"
            } font-bold rounded-full text-white h-fit p-1 m-auto inline-block `}
          >
            {house.status}
          </div>
          <div className="text-3xl font-semibold text-violet-600">
            $ {house.payment.price}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-8 lg:flex-row">
        <div className="w-[768px]">
          <div className="mb-8">
            {house.images.length === 1 && (
              <img
                src={`${apiUrl}/listings/${house.owner}/${house?.images[0]}`}
                className="w-full h-[559px]"
                alt=""
              />
            )}
            {house.images.length > 1 && (
              <div className="w-full h[300px]">
                <Carousel images={house.images} owner={house.owner} />
              </div>
            )}
          </div>
          <div className="flex justify-between mb-5">
            <div className="flex gap-x-6 text-violet-700 mb-6">
              <div className="flex gap-x-2 items-center">
                <BiBed className="text-2xl" />
                <div className="text-lg font-medium">{house.bedrooms}</div>
              </div>
              <div className="flex gap-x-2 items-center">
                <BiBath className="text-2xl" />
                <div className="text-lg font-medium">{house.bathrooms}</div>
              </div>
              <div className="flex gap-x-2 items-center">
                <BiArea className="text-2xl" />
                <div className="text-lg font-medium">
                  {house.area.length + "*" + house.area.width + "m2"}
                </div>
              </div>
            </div>
            <div className="w-fit">
              {!user?.isOwner &&
                // When there is no deposit for the house
                (house.depositStatus === null ||
                house.depositStatus === undefined ? (
                  <div
                    onClick={onSendingDeposit}
                    className="bg-violet-700 hover:bg-violet-800 font-bold text-white rounded p-4 text-sm w-fit transition cursor-pointer"
                  >
                    Send deposit
                  </div>
                ) : // When user is the one who made the deposit
                user?._id === house.depositBy ? (
                  <DepositStatus house={house} user={user} />
                ) : (
                  // When user is NOT the one made the deposit
                  <div className="border border-violet-700 font-bold text-violet-700 rounded p-4 text-sm w-full transition cursor-default">
                    This house was deposited by somebody else
                  </div>
                ))}
            </div>
          </div>
          {house.description.split("\r\n").map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
        <div className="flex-1 w-full mb-8 bg-white border border-2 border-violet-100 rounded px-6 py-10">
          <div className="flex items-center gap-x-4 mb-8">
            <div className="w-24 h-24 text-3xl">
              <Avatar name={owner?.name} />
            </div>
            <div className="">
              <div className="text-xl mb-2 font-bold text-violet-700">
                {owner?.name}
              </div>
              <Link
                to={user?._id === owner?._id ? "/me" : "/profile/" + owner?._id}
                state={user?._id === owner?._id ? "" : { user: owner }}
                className="text-violet-700 underline"
              >
                View Listings
              </Link>
            </div>
          </div>
          <form
            ref={form}
            onSubmit={handleOnSubmitContact}
            className="flex flex-col gap-y-4"
          >
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="text"
              placeholder="Name*"
              name="from_name"
              defaultValue={user?.name}
            />
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="text"
              placeholder="Email*"
              name="from_email"
              defaultValue={user?.email}
            />
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="text"
              placeholder="Phone*"
              name="from_phone"
              defaultValue={user?.phone}
            />
            <textarea
              className="border border-gray-300 focus:border-violet-700 rounded w-full p-4 h-36 text-sm  outline-none resize-none"
              type="text"
              placeholder="Message*"
              name="message"
              defaultValue={`Hello, I am interested in ${house.title}`}
            />
            <input
              className="hidden"
              name="to_name"
              value={owner?.name}
              onChange={() => {}}
            />
            <input
              className="hidden"
              name="to_email"
              value={owner?.email}
              onChange={() => {}}
            />
            <div className="flex gap-x-2">
              <button
                className="bg-violet-700 hover:bg-violet-800 font-bold text-white rounded p-4 text-sm w-full transition"
                type="submit"
                value="send"
              >
                Send message
              </button>
              <button className="border border-violet-700 font-bold text-violet-700 hover:border-purple-600 hover:text-purple-600 rounded p-4 text-sm w-full transition">
                Call
              </button>
            </div>
          </form>
        </div>
      </div>
      <br></br>
      <div className="w-2/3">
        <CommentSection
          listingId={house._id}
          personId={user?._id}
          comments={house.comments}
          ownerId={owner._id}
        />
      </div>
    </div>
  );
};

export default PropertyDetails;
