import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MobileApp from "./MobileApp.tsx";
import "./index.css";

const isMobile = () => {
  const userAgent =
    typeof window.navigator === "undefined" ? "" : navigator.userAgent;
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(userAgent);
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{isMobile() ? <MobileApp /> : <App />}</React.StrictMode>
);
