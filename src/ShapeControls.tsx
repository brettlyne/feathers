import React from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slider from "@mui/material/Slider";

import { HexColorPicker } from "react-colorful";

import drop from "/drop.png";
import feather from "/feather.png";
import mushroom from "/mushroom.png";
import cloud from "/cloud.png";
import glow from "/glow.png";
import moon from "/moon.png";
import coin from "/coin.png";

import {
  VisualizationState,
  VisualizationStateUpdater,
} from "./util/visualizationState";

interface ControlsProps {
  state: VisualizationState;
  updateState: VisualizationStateUpdater;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const SceneControls: React.FC<ControlsProps> = ({
  state,
  updateState,
  setActiveTab,
}) => {
  const [shapeTab, setShapeTab] = React.useState("shape");

  const shapes = {
    drop: drop,
    feather: feather,
    mushroom: mushroom,
    cloud: cloud,
    glow: glow,
    moon: moon,
    coin: coin,
  };

  return (
    <>
      {shapeTab === "shape" && (
        <div className="tile-control">
          {Object.keys(shapes).map((shape) => (
            <IconButton
              sx={{ padding: 0 }}
              key={shape}
              onClick={() => {
                updateState("image", shape);
              }}
            >
              <img
                src={shapes[shape]}
                className={`tile ${shape === state.image ? "active" : ""}`}
              />
            </IconButton>
          ))}
        </div>
      )}

      {shapeTab === "rotation" && (
        <div className="slider-control">
          <Slider
            value={state.rotation}
            valueLabelDisplay="auto"
            min={0}
            step={0.01}
            max={2 * Math.PI}
            valueLabelFormat={(value) =>
              `${((value * 180) / Math.PI).toFixed(0)}°`
            }
            onChange={(_event, newValue) => {
              updateState("rotation", newValue as number);
            }}
          />
        </div>
      )}

      {shapeTab === "colors" && (
        <div className="double-color-control">
          <HexColorPicker
            color={state.color1}
            onChange={(newColor) => {
              updateState("color1", newColor);
            }}
          />
          <HexColorPicker
            color={state.color2}
            onChange={(newColor) => {
              updateState("color2", newColor);
            }}
          />
        </div>
      )}

      {shapeTab === "size" && (
        <div className="slider-control">
          <Slider
            value={state.particleSize}
            valueLabelDisplay="auto"
            min={0}
            max={60}
            onChange={(_event, newValue) => {
              updateState("particleSize", newValue as number);
            }}
          />
        </div>
      )}

      <div className="tabs">
        <Tabs
          value={shapeTab}
          onChange={(_event, newValue) => {
            setShapeTab(newValue);
          }}
          variant="scrollable"
        >
          <Tab label="Shape" value="shape" />
          <Tab label="Rotation" value="rotation" />
          <Tab label="Colors" value="colors" />
          <Tab label="Size" value="size" />
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
