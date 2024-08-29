import React from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ScienceIcon from "@mui/icons-material/Science";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slider from "@mui/material/Slider";

import { HexColorPicker } from "react-colorful";

import preset1img from "/presets/preset-1.png";
import preset2img from "/presets/preset-2.png";
import preset3img from "/presets/preset-3.png";
import preset4img from "/presets/preset-4.png";

import {
  VisualizationState,
  VisualizationStateUpdater,
  preset1,
  preset2,
  preset3,
  preset4,
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

  return (
    <>
      {sceneTab === "presets" && (
        <div className="tile-control">
          <IconButton sx={{ padding: 0 }} onClick={() => setVState(preset1)}>
            <img src={preset1img} className="tile" />
          </IconButton>
          <IconButton sx={{ padding: 0 }} onClick={() => setVState(preset2)}>
            <img src={preset2img} className="tile" />
          </IconButton>
          <IconButton sx={{ padding: 0 }} onClick={() => setVState(preset3)}>
            <img src={preset3img} className="tile" />
          </IconButton>
          <IconButton sx={{ padding: 0 }} onClick={() => setVState(preset4)}>
            <img src={preset4img} className="tile" />
          </IconButton>
        </div>
      )}
      {sceneTab === "background" && (
        <div className="color-control">
          <HexColorPicker
            color={state.bgColor}
            onChange={(newColor) => {
              updateState("bgColor", newColor);
            }}
          />
        </div>
      )}
      {sceneTab === "fov" && (
        <div className="slider-control">
          <Slider
            value={state.fov}
            valueLabelDisplay="auto"
            min={20}
            max={120}
            onChange={(_event, newValue) => {
              updateState("fov", newValue as number);
            }}
          />
        </div>
      )}
      {sceneTab === "depthTest" && (
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
