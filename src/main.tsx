import React from "react";
import ReactDOM from "react-dom/client";
import { isMobile } from "react-device-detect";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

import App from "./App.tsx";
import MobileApp from "./MobileApp.tsx";

import { themeOptions } from "./util/muiTheme";
import "./index.css";

const theme = createTheme(themeOptions);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {isMobile ? <MobileApp /> : <App />}
    </ThemeProvider>
  </React.StrictMode>
);
