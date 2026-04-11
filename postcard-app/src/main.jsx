import React from "react";
import ReactDOM from "react-dom/client";
import Providers from "./app/providers";
import "./index.css";
import "./styles/postcard.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);