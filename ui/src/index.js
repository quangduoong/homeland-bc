import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextProvider from "./context/Auth/AuthContextProvider";
import ForumContextProvider from "./context/Forum/ForumContextProvider";
import ListingsContextProvider from "./context/Listings/ListingsContextProvider";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ListingsContextProvider>
      <ForumContextProvider>
        <App />
      </ForumContextProvider>
    </ListingsContextProvider>
  </AuthContextProvider>
);
