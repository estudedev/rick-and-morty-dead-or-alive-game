import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./fonts/get_schwifty.ttf";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);
