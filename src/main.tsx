import React from "react";
import ReactDOM from "react-dom/client";
import { isMobile } from "react-device-detect";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

import MobileApp from "./MobileApp.tsx";

import { themeOptions } from "./util/muiTheme";
import "./index.css";

const theme = createTheme(themeOptions);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {isMobile ? null : (
        <div
          style={{
            background: "#0f0",
            textAlign: "center",
            padding: "4px",
            fontSize: ".8em",
          }}
        >
          This prototype is currently best experienced on a mobile device
        </div>
      )}
      <MobileApp />
    </ThemeProvider>
  </React.StrictMode>
);
