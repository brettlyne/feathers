import React from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slider from "@mui/material/Slider";
import { HexColorPicker } from "react-colorful";

import chroma from "chroma-js";

import OnOffToggle from "./components/OnOffToggle";

import { bgPresets, getCssFromBgState } from "./util/backgroundHelper";
import preset1img from "/presets/preset-1.png";
import preset2img from "/presets/preset-2.png";
import preset3img from "/presets/preset-3.png";
import preset4img from "/presets/preset-4.png";
import preset5img from "/presets/preset-5.png";
import preset6img from "/presets/preset-6.png";
import preset7img from "/presets/preset-7.png";
import preset8img from "/presets/preset-8.png";
import preset9img from "/presets/preset-9.png";
import preset10img from "/presets/preset-10.png";

const presetImages = [
  preset1img,
  preset2img,
  preset3img,
  preset4img,
  preset5img,
  preset6img,
  preset7img,
  preset8img,
  preset9img,
  preset10img,
];

const dimensionPresets = [
  { label: "100vw × 100vh (fullscreen)", value: ["100vw", "100vh"] },
  { label: "800px × 450px", value: ["800px", "450px"] },
  { label: "600px × 600px", value: ["600px", "600px"] },
  { label: "100% × 20rem", value: ["100%", "20rem"] },
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

  const changeBackgroundMode = (
    mode: "solid" | "gradient" | "preset" | "custom" | string
  ) => {
    if (mode === "custom") {
      const css = getCssFromBgState(state.background);
      updateState("background", { type: "custom", value: css });
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
                setVState({ ...preset, statsOn: state.statsOn });
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

      {sceneTab === "dimensions" && (
        <>
          <div className="info">
            <p style={{ maxWidth: "42em" }}>
              Use CSS values for width and height. Here are a few presets:
            </p>
            <div style={{ display: "flex", gap: "10px", padding: "10px 0" }}>
              {dimensionPresets.map((preset) => (
                <Button
                  key={preset.label}
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                  onClick={() => {
                    updateState("dimensions", preset.value);
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
          <div
            className="double-color-control"
            style={{
              justifyContent: "flex-start",
              gap: "16px",
            }}
          >
            <TextField
              fullWidth
              label="Width"
              value={state.dimensions[0]}
              onChange={(e) => {
                updateState("dimensions", [
                  e.target.value,
                  state.dimensions[1],
                ]);
              }}
              size="small"
            />
            <TextField
              fullWidth
              label="Height"
              value={state.dimensions[1]}
              onChange={(e) => {
                updateState("dimensions", [
                  state.dimensions[0],
                  e.target.value,
                ]);
              }}
              size="small"
            />
          </div>
        </>
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

          {backgroundTab === "custom" && (
            <div
              className="double-color-control"
              style={{ background: "#363636" }}
            >
              <TextField
                multiline
                value={state.background.value}
                onChange={(e) => {
                  updateState("background", {
                    type: "custom",
                    value: e.target.value,
                  });
                }}
                sx={{
                  width: "100%",
                }}
                size="small"
                inputProps={{
                  style: {
                    fontFamily: `'Roboto Mono', 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace`,
                    fontSize: ".8rem",
                    lineHeight: "1.2rem",
                  },
                }}
              />
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
            <OnOffToggle
              value={state.depthTestOn}
              onChange={(newValue) => updateState("depthTestOn", newValue)}
            />
          </div>
        </>
      )}

      {sceneTab === "interactiveCamera" && (
        <>
          <div className="tile-control">
            <OnOffToggle
              value={state.interactiveCamera}
              onChange={(newValue) =>
                updateState("interactiveCamera", newValue)
              }
            />
          </div>
        </>
      )}

      {sceneTab === "stats" && (
        <>
          <div className="tile-control">
            <OnOffToggle
              value={state.statsOn}
              onChange={(newValue) => updateState("statsOn", newValue)}
            />
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
          <Tab label="Dimensions" value="dimensions" />
          <Tab label="Background" value="background" />
          <Tab label="Field of View" value="fov" />
          <Tab label="Depth Test" value="depthTest" />
          <Tab label="Interactive Camera" value="interactiveCamera" />
          <Tab label="Stats" value="stats" />
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
