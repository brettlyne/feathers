import React from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slider from "@mui/material/Slider";

import { AnimationType } from "./util/animations";
import {
  VisualizationState,
  VisualizationStateUpdater,
} from "./util/visualizationState";

interface ControlsProps {
  state: VisualizationState;
  updateState: VisualizationStateUpdater;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const AnimationControls: React.FC<ControlsProps> = ({
  state,
  updateState,
  setActiveTab,
}) => {
  const [animTab, setAnimTab] = React.useState("animation");

  const animations = ["ripples", "waves", "jello", "banner", "orbits", "snake"];

  const tabs = [
    { label: "Animation", value: "animation" },
    { label: "Speed", value: "speed" },
  ];
  if (state.animationType === "orbits") {
    tabs.push(
      { label: "Orbit Inner Radius", value: "orbitInnerRadius" },
      { label: "Orbit Scale", value: "orbitScale" }
    );
  }
  if (state.animationType !== "ripples") {
    tabs.push(
      { label: "X Magnitude", value: "xMagnitude" },
      { label: "Y Magnitude", value: "yMagnitude" }
    );
  } else {
    tabs.push(
      { label: "Magnitude", value: "magnitude" },
      { label: "X Center", value: "xCenter" },
      { label: "Y Center", value: "yCenter" }
    );
  }

  return (
    <>
      {animTab === "animation" && (
        <div className="tile-control">
          {animations.map((anim) => (
            <IconButton
              className={`text-tile ${
                state.animationType === anim ? "active" : ""
              }`}
              sx={{ padding: 0 }}
              key={anim}
              onClick={() => {
                updateState("animationType", anim as AnimationType);
              }}
            >
              {anim}
            </IconButton>
          ))}
        </div>
      )}

      {animTab === "speed" && (
        <div className="slider-control">
          <Slider
            value={state.animationSpeed}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            step={0.1}
            onChange={(_event, newValue) => {
              updateState("animationSpeed", newValue as number);
            }}
          />
        </div>
      )}

      {animTab === "orbitInnerRadius" && (
        <div className="slider-control">
          <Slider
            value={state.orbitInnerRadius}
            valueLabelDisplay="auto"
            min={-5}
            max={5}
            step={0.1}
            onChange={(_event, newValue) => {
              updateState("orbitInnerRadius", newValue as number);
            }}
          />
        </div>
      )}

      {animTab === "orbitScale" && (
        <div className="slider-control">
          <Slider
            value={state.orbitScale}
            valueLabelDisplay="auto"
            min={-4}
            max={4}
            step={0.1}
            onChange={(_event, newValue) => {
              updateState("orbitScale", newValue as number);
            }}
          />
        </div>
      )}

      {animTab === "magnitude" && (
        <div className="slider-control">
          <Slider
            value={state.animationMagnitude}
            valueLabelDisplay="auto"
            min={0}
            max={2}
            step={0.1}
            onChange={(_event, newValue) => {
              updateState("animationMagnitude", newValue as number);
            }}
          />
        </div>
      )}

      {animTab === "xMagnitude" && (
        <div className="slider-control">
          <Slider
            value={state.xMagnitude}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            step={0.1}
            onChange={(_event, newValue) => {
              updateState("xMagnitude", newValue as number);
            }}
          />
        </div>
      )}

      {animTab === "yMagnitude" && (
        <div className="slider-control">
          <Slider
            value={state.yMagnitude}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            step={0.1}
            onChange={(_event, newValue) => {
              updateState("yMagnitude", newValue as number);
            }}
          />
        </div>
      )}

      {animTab === "xCenter" && (
        <div className="slider-control">
          <Slider
            value={state.rippleCenter[0]}
            valueLabelDisplay="auto"
            min={-20}
            max={20}
            step={0.1}
            onChange={(_event, newValue) => {
              updateState("rippleCenter", [
                newValue as number,
                state.rippleCenter[1],
                state.rippleCenter[2],
              ]);
            }}
          />
        </div>
      )}

      {animTab === "yCenter" && (
        <div className="slider-control">
          <Slider
            value={state.rippleCenter[1]}
            valueLabelDisplay="auto"
            min={-20}
            max={20}
            step={0.1}
            onChange={(_event, newValue) => {
              updateState("rippleCenter", [
                state.rippleCenter[0],
                newValue as number,
                state.rippleCenter[2],
              ]);
            }}
          />
        </div>
      )}

      <div className="tabs">
        <Tabs
          value={animTab}
          onChange={(_event, newValue) => {
            setAnimTab(newValue);
          }}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
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

export default AnimationControls;
