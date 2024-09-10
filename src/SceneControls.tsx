import React from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ScienceIcon from "@mui/icons-material/Science";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slider from "@mui/material/Slider";

import chroma from "chroma-js";

import { HexColorPicker } from "react-colorful";

import preset1img from "/presets/preset-1.png";
import preset2img from "/presets/preset-2.png";
import preset3img from "/presets/preset-3.png";
import preset4img from "/presets/preset-4.png";
import preset5img from "/presets/preset-5.png";
import preset7img from "/presets/preset-7.png";
import preset8img from "/presets/preset-8.png";
import preset9img from "/presets/preset-9.png";

const presetImages = [
  preset1img,
  preset2img,
  preset3img,
  preset4img,
  preset5img,
  preset7img,
  preset8img,
  preset9img,
];

import {
  VisualizationState,
  VisualizationStateUpdater,
  presets,
} from "./util/visualizationState";

interface ControlsProps {
  state: VisualizationState;
  updateState: VisualizationStateUpdater;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setVState: React.Dispatch<React.SetStateAction<VisualizationState>>;
}

const SceneControls: React.FC<ControlsProps> = ({
  state,
  updateState,
  setActiveTab,
  setVState,
}) => {
  const [sceneTab, setSceneTab] = React.useState("presets");
  const [backgroundTab, setBackgroundTab] = React.useState(
    state.background.type
  );

  const [initialBgState, setInitialBgState] = React.useState(state.background); // for reset

  const bgPresets = [
    "radial-gradient(circle at 50% 110%, #f7ff0a, #ff9132, #e32968, #77107b)",
    "linear-gradient(75deg, #ffe799, #ffa172, #ff61b5)",
    "linear-gradient(225deg, #ffe5ce, #ffb4b1, #e589ca, #9c71f2)",
    "radial-gradient(120% 150% at 100% 0%, #FFEDED 0%, #FFF1E4 25%, #E1F1E4 50%, #EADEF7 75%, #EFDBF2 100%)",
    "linear-gradient(225deg, #f1ff56, #66d788, #009e96, #0a607b)",
    "linear-gradient(195deg, #8b2482, #55246d, #271c4e, #050b2b)",
    "linear-gradient(150deg, #9da6be, #707a94, #44516e, #142b4e)",
    "radial-gradient(90% 100% at 50% 100%, #737373 0%, #A8ACBC 100%)",
    "conic-gradient(from 180deg at 50% 120%, #e85907, #ec553f, #fd41ba, #65a6ff, #00dda7, #5cde53, #6ede42)",
    "conic-gradient(from 45deg at 70% -10%, #fff700, #c4f74d, #158be2, #670825, #590000)",
  ];

  const changeBackgroundMode = (
    mode: "solid" | "gradient" | "preset" | "custom" | string
  ) => {
    if (mode === "custom") {
      // updateState("background", { type: "custom" });
      return;
    }
    if (mode === initialBgState.type) {
      updateState("background", initialBgState);
      return;
    }
    const gradientStart =
      state.background.color || initialBgState.color || "#615438";
    const gradientEnd =
      chroma(gradientStart).luminance() > 0.8
        ? chroma(gradientStart).darken(2).hex()
        : chroma(gradientStart).brighten(2).hex();
    const bgDefaults = {
      solid: {
        type: "solid",
        color: state.background.color || initialBgState.color || "#333f69",
      },
      custom: { type: "custom", value: "#888888" },
      gradient: { type: "gradient", colors: [gradientStart, gradientEnd] },
      preset: { type: "preset", value: bgPresets[0] },
    };

    updateState("background", bgDefaults[mode]);
  };

  return (
    <>
      {sceneTab === "presets" && (
        <div className="tile-control">
          {presets.map((preset, i) => (
            <IconButton
              sx={{ padding: 0 }}
              onClick={() => {
                setVState(preset);
                setBackgroundTab(preset.background.type);
                setInitialBgState(preset.background);
              }}
              key={i}
            >
              <img src={presetImages[i]} className="tile" />
            </IconButton>
          ))}
        </div>
      )}
      {sceneTab === "background" && (
        <>
          {backgroundTab === "solid" && (
            <div
              className="double-color-control"
              style={{ background: "#363636" }}
            >
              <HexColorPicker
                color={state.background.color}
                onChange={(newColor) => {
                  updateState("background", {
                    type: "solid",
                    color: newColor,
                  });
                }}
              />
            </div>
          )}

          {backgroundTab === "gradient" && (
            <div
              className="double-color-control"
              style={{ background: "#363636" }}
            >
              <HexColorPicker
                color={state.background.colors?.[0] ?? ""}
                onChange={(newColor) => {
                  updateState("background", {
                    type: "gradient",
                    colors: [newColor, state.background.colors?.[1] ?? ""],
                  });
                }}
              />
              <HexColorPicker
                color={state.background.colors?.[1] ?? ""}
                onChange={(newColor) => {
                  updateState("background", {
                    type: "gradient",
                    colors: [state.background.colors?.[0] ?? "", newColor],
                  });
                }}
              />
            </div>
          )}

          {backgroundTab === "preset" && (
            <div
              style={{
                background: "#363636",
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gridColumnGap: "12px",
                gridRowGap: "12px",
                padding: "12px",
              }}
            >
              {bgPresets.map((preset, i) => (
                <IconButton
                  sx={{
                    padding: 0,
                    background: preset,
                    height: 80,
                    borderRadius: 0.2,
                    outline:
                      state.background.value === preset
                        ? "2px solid white"
                        : "",
                  }}
                  onClick={() => {
                    updateState("background", {
                      type: "preset",
                      value: preset,
                    });
                  }}
                  key={i}
                />
              ))}
            </div>
          )}

          <Tabs
            value={backgroundTab}
            onChange={(_event, newValue) => {
              changeBackgroundMode(newValue);
              setBackgroundTab(newValue);
            }}
            variant="scrollable"
            sx={{ bgcolor: "#363636" }}
          >
            <Tab label="Solid" value="solid" />
            <Tab label="Gradient" value="gradient" />
            <Tab label="Presets" value="preset" />
            <Tab label="Custom" value="custom" />
          </Tabs>
        </>
      )}
      {sceneTab === "fov" && (
        <div className="slider-control">
          <Slider
            value={state.fov}
            valueLabelDisplay="auto"
            min={20}
            max={160}
            onChange={(_event, newValue) => {
              updateState("fov", newValue as number);
            }}
          />
        </div>
      )}
      {sceneTab === "depthTest" && (
        <>
          <div className="info">
            <p style={{ maxWidth: "42em" }}>
              Disabling depth test can look nice with transparent shapes and
              prevents "popping" when ordering changes, but layering is
              predetermined and ignores the camera position.
            </p>
          </div>
          <div className="tile-control">
            <IconButton
              className={`text-tile ${state.depthTestOn ? "active" : ""}`}
              sx={{ padding: 0 }}
              onClick={() => {
                updateState("depthTestOn", true);
              }}
            >
              on
            </IconButton>
            <IconButton
              className={`text-tile ${state.depthTestOn ? "" : "active"}`}
              sx={{ padding: 0 }}
              onClick={() => {
                updateState("depthTestOn", false);
              }}
            >
              off
            </IconButton>
          </div>
        </>
      )}
      <div className="tabs">
        <Tabs
          value={sceneTab}
          onChange={(_event, newValue) => {
            setSceneTab(newValue);
          }}
          variant="scrollable"
        >
          <Tab label="Presets" value="presets" />
          <Tab label="Background" value="background" />
          <Tab label="Field of View" value="fov" />
          <Tab
            icon={<ScienceIcon />}
            iconPosition="start"
            label="Depth Test"
            value="depthTest"
            sx={{ minHeight: "unset" }}
          />
        </Tabs>
      </div>
      <div className="solo-button">
        <Button
          variant="outlined"
          onClick={() => {
            setActiveTab(-1);
          }}
        >
          Done
        </Button>
      </div>
    </>
  );
};

export default SceneControls;
