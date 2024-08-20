import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MobileApp from "./MobileApp.tsx";
import "./index.css";

import { isMobile } from "react-device-detect";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{isMobile ? <MobileApp /> : <App />}</React.StrictMode>
);
