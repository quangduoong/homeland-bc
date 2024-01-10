import React, { createContext, useReducer } from "react";
import errorCatch from "../utils/errorCatch";
import getApis from "../utils/getApis";
import reducer from "./listingsReducer";

export const ListingsContext = createContext();

function ListingsContextProvider({ children }) {
  // init state
  const initState = {
    listingsLoading: true,
    listings: [],
  };
  // set up state
  const [listingsState, dispatch] = useReducer(reducer, initState);
  // * functions
  // * hard delete listing
  const hardDeleteListing = async (listingId) => {
    try {
      const res = await getApis("delete", "/listings/hard-delete/" + listingId);

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * restore listing
  const restoreListing = async (listingId) => {
    try {
      const res = await getApis(
        "patch",
        "/listings/restore-listing/" + listingId
      );

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * get users deleted listings
  const getMyDeletedListings = async (userId) => {
    try {
      const res = await getApis(
        "get",
        "/listings/get-deleted-listings/" + userId
      );

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * create reply to a comment
  const createReply = async (commentId, data) => {
    try {
      const res = await getApis("put", "/listings/create-reply/" + commentId, {
        data,
      });

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * get listing
  const getListing = async (listingId) => {
    try {
      const res = await getApis("get", "/listings/get-listing/" + listingId);

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * post a comment
  const postComment = async ({ listingId, personId, comment }) => {
    try {
      const res = await getApis("post", "/listings/post-comment/" + listingId, {
        personId,
        comment,
      });

      return res.data;
    } catch (error) {
      errorCatch(errorCatch);
    }
  };
  // * search on category
  const search = (data) => {
    const { district, city, status, price } = data;
    let filteredCity = [];
    let filteredDistrict = [];
    let filteredStatus = [];
    let filteredPrice = [];

    for (const listing of listingsState.listings) {
      if (!city || listing.address.city === city) filteredCity.push(listing);
      if (!district || listing.address.district === district)
        filteredDistrict.push(listing);
      if (!status || listing.status === status.toLowerCase())
        filteredStatus.push(listing);
      if (
        price.length <= 0 ||
        (listing.payment.price >= price[0] && listing.payment.price <= price[1])
      )
        filteredPrice.push(listing);
    }

    // intersect
    const filteredListings = filteredCity.filter(
      (l) =>
        filteredDistrict.includes(l) &&
        filteredStatus.includes(l) &&
        filteredPrice.includes(l)
    );

    return filteredListings;
  };
  // * owner deny request (wait list) owner side
  const denyOwnersRequest = async ({ listingId, personId }) => {
    try {
      const dr = await getApis("put", "/listings/deny-waitList/" + listingId, {
        personId,
      });

      return dr?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * accept Owner's side wait list
  const acceptOwnersWaitList = async ({ listingId, personId }) => {
    try {
      const res = await getApis(
        "put",
        "/listings/accept-waitList/" + listingId,
        { personId }
      );

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * update listing
  const updateListing = async ({ id, data }) => {
    try {
      const res = await getApis("put", "/listings/update/" + id, data);

      return res.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * sign up on wait list of a listing
  const signUpOnWaitList = async ({ id, data }) => {
    try {
      const res = await getApis(
        "put",
        "/listings/add-to-wait-list/" + id,
        data
      );

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * get user's listings
  const getUsersListings = async (id) => {
    try {
      const res = await getApis("get", "/listings/get-users-listings/" + id);

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * delete a listing
  const deleteListing = (id) => {
    return getApis("delete", "/listings/delete/" + id)
      .then((res) => res?.data)
      .catch((error) => errorCatch(error));
  };
  // * create a listing
  const create = async (data) => {
    try {
      const res = await getApis("post", "/listings/create", data);

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * get all available listings
  const getAvailable = async () => {
    try {
      const res = await getApis("get", "/listings/get-available");

      if (res.data.success)
        dispatch({
          type: "SET_LISTINGS",
          payload: { listings: res.data.listings },
        });

      return res.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // assemble
  const value = {
    listingsState,
    hardDeleteListing,
    restoreListing,
    getMyDeletedListings,
    getAvailable,
    getUsersListings,
    create,
    deleteListing,
    signUpOnWaitList,
    updateListing,
    acceptOwnersWaitList,
    denyOwnersRequest,
    search,
    postComment,
    getListing,
    createReply,
  };

  return (
    <ListingsContext.Provider value={value}>
      {children}
    </ListingsContext.Provider>
  );
}

export default ListingsContextProvider;
