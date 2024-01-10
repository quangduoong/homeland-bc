import React, { createContext, useEffect, useReducer } from "react";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../assets/utils/constants";
import { reducer } from "./authReducer";
import { setAuthToken } from "../utils/setAuthToken";
import errorCatch from "../utils/errorCatch";
import getApis from "../utils/getApis";
import Swal from "sweetalert2";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  // init state
  const initState = {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  };
  // set up state
  const [authState, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // load user
  const loadUser = async () => {
    const token = localStorage[LOCAL_STORAGE_TOKEN_NAME];
    if (token) {
      setAuthToken(token);
      const get = await getMyInfo();
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: true,
          user: get.user,
        },
      });
    } else {
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };
  // * functions
  // * renter being denied (wait list)
  const denyRentersRequest = async ({ listingId, personId }) => {
    try {
      const dr = await getApis("put", "/users/deny-waitList/" + personId, {
        listingId,
      });

      return dr?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * get my info
  const getMyInfo = async () => {
    try {
      const res = await getApis("get", "/users/my-info");

      if (res?.data.success) {
        reset(res.data.user);
      }

      return res.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * accept renter side Wait List
  const acceptRentersWaitList = async ({ listingId, personId }) => {
    try {
      const res = await getApis("put", "/users/accept-waitList/" + personId, {
        listingId,
      });

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * reset user
  const reset = (user) => {
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: true, user },
    });
  };
  // * set on wait list of a user
  const setOnWaitList = async (data) => {
    try {
      const res = await getApis("put", "/users/set-onWaitList", data);

      if (res?.data.success) {
        reset(res.data.user);
      }

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * set user => owner
  const setIsOwner = (isOwner) =>
    getApis("put", "/users/set-isOwner", isOwner)
      .then((res) => {
        reset(res.data.user);
        return res.data;
      })
      .catch((error) => errorCatch(error));

  // * update user
  const updateUser = (data) =>
    getApis("put", "/users/update", data)
      .then((res) => {
        reset(res.data.user);
        return res.data;
      })
      .catch((error) => errorCatch(error));

  // * find user
  const findUser = async (id) => {
    try {
      const res = await getApis("post", `/users/find/${id}`);

      return res?.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * log out
  const logOut = async () => {
    return await Swal.fire({
      icon: "warning",
      title: "Log out?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#7F56D9",
      cancelButtonText: "No",
      cancelButtonColor: "gray",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        // localStorage.removeItem("user");
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: false, user: null },
        });
      }
      return result;
    });
  };
  // * sign up
  const signUp = async (data) => {
    try {
      const res = await getApis("post", "/users/create-user", data);

      if (res.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
      }

      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: true,
          user: res.data.user,
        },
      });

      return res.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // * log in
  const logIn = async (data) => {
    try {
      const res = await getApis("post", "/users/login", data);

      if (res.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
      }

      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: true,
          user: res.data.user,
        },
      });

      return res.data;
    } catch (error) {
      errorCatch(error);
    }
  };
  // assemble functions
  const value = {
    authState,
    dispatch,
    loadUser,
    logIn,
    signUp,
    logOut,
    findUser,
    updateUser,
    setIsOwner,
    setOnWaitList,
    acceptRentersWaitList,
    denyRentersRequest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
export default AuthContextProvider;
