import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { AuthContext } from "./context/Auth/AuthContextProvider";
import CreateListing from "./pages/createListing/CreateListing";
import Forum from "./pages/Forum";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OthersProfile from "./pages/OthersProfile";
import PropertyDetails from "./pages/PropertyDetails";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const {
    authState: { authLoading },
    logOut,
  } = useContext(AuthContext);

  useEffect(() => {
    const unmount = () => {
      logOut();
    };
    return () => unmount;
  }, []);

  return (
    !authLoading && (
      <BrowserRouter>
        <Header />
        <div className="max-w-[1440px] mx-auto bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/:id" element={<Forum />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/profile/:id" element={<OthersProfile />} />
            {/* protected  */}
            <Route element={<ProtectedRoute />}>
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/me" element={<UserProfile />}></Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    )
  );
};

export default App;
