import React from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slider from "@mui/material/Slider";
import { motion, AnimatePresence } from "framer-motion";

import {
  VisualizationState,
  VisualizationStateUpdater,
} from "./util/visualizationState";

interface ControlsProps {
  state: VisualizationState;
  updateState: VisualizationStateUpdater;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const FieldControls: React.FC<ControlsProps> = ({
  state,
  updateState,
  setActiveTab,
}) => {
  const [scalingTab, setScalingTab] = React.useState("innerScaling");
  const [mode, setMode] = React.useState("");

  const modes = ["arrangement", "zAxisArrangement", "density", "scaling"];
  const arrangements = [
    "grid",
    "staggeredGrid",
    "circular",
    "spiral",
    "hexagon",
    "random",
  ];
  const zAxisArrangements = ["flat", "dome", "wavy", "valley", "cone"];

  return (
    <AnimatePresence>
      {mode === "" && (
        <motion.div
          key="mode-select"
          className="scene-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="tile-control center buttons">
            {modes.map((mode) => (
              <Button
                sx={{ padding: "0.2rem .8rem" }}
                variant="contained"
                key={mode}
                onClick={() => {
                  setMode(mode);
                }}
              >
                {mode === "zAxisArrangement" ? "Z-Axis Arrangement" : mode}
              </Button>
            ))}
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
        </motion.div>
      )}

      {mode === "arrangement" && (
        <motion.div
          key="arrangement"
          className="scene-controls"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="tile-control">
            {arrangements.map((arrangement) => (
              <IconButton
                className={`text-tile ${
                  state.arrangement === arrangement ? "active" : ""
                }`}
                sx={{ padding: 0 }}
                key={arrangement}
                onClick={() => {
                  updateState(
                    "arrangement",
                    arrangement as VisualizationState["arrangement"]
                  );
                }}
              >
                {arrangement}
              </IconButton>
            ))}
          </div>
          <div className="solo-button">
            <Button
              variant="outlined"
              onClick={() => {
                setMode("");
              }}
            >
              Back to Field Settings
            </Button>
          </div>
        </motion.div>
      )}

      {mode === "zAxisArrangement" && (
        <motion.div
          key="zAxisArrangement"
          className="scene-controls"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="tile-control">
            {zAxisArrangements.map((zAxisArrangement) => (
              <IconButton
                className={`text-tile ${
                  state.zAxisArrangement === zAxisArrangement ? "active" : ""
                }`}
                sx={{ padding: 0 }}
                key={zAxisArrangement}
                onClick={() => {
                  updateState(
                    "zAxisArrangement",
                    zAxisArrangement as VisualizationState["zAxisArrangement"]
                  );
                }}
              >
                {zAxisArrangement}
              </IconButton>
            ))}
          </div>
          <div className="solo-button">
            <Button
              variant="outlined"
              onClick={() => {
                setMode("");
              }}
            >
              Back to Field Settings
            </Button>
          </div>
        </motion.div>
      )}

      {mode === "density" && (
        <motion.div
          key="density"
          className="scene-controls"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="slider-control">
            <Slider
              value={state.density}
              valueLabelDisplay="auto"
              min={1}
              max={10}
              step={0.1}
              onChange={(_event, newValue) => {
                updateState("density", newValue as number);
              }}
            />
          </div>
          <div className="solo-button">
            <Button
              variant="outlined"
              onClick={() => {
                setMode("");
              }}
            >
              Back to Field Settings
            </Button>
          </div>
        </motion.div>
      )}

      {mode === "scaling" && (
        <motion.div
          key="scaling"
          className="scene-controls"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {scalingTab === "x" && (
            <div className="slider-control">
              <Slider
                value={state.center[0]}
                valueLabelDisplay="auto"
                min={-50}
                max={50}
                step={0.1}
                onChange={(_event, newValue) => {
                  updateState("center", [
                    newValue as number,
                    state.center[1],
                    state.center[2],
                  ]);
                }}
              />
            </div>
          )}

          {scalingTab === "y" && (
            <div className="slider-control">
              <Slider
                value={state.center[1]}
                valueLabelDisplay="auto"
                min={-50}
                max={50}
                step={0.1}
                onChange={(_event, newValue) => {
                  updateState("center", [
                    state.center[0],
                    newValue as number,
                    state.center[2],
                  ]);
                }}
              />
            </div>
          )}

          {scalingTab === "innerRadius" && (
            <div className="slider-control">
              <Slider
                value={state.innerRadius}
                valueLabelDisplay="auto"
                min={0}
                max={10}
                step={0.1}
                onChange={(_event, newValue) => {
                  updateState("innerRadius", newValue as number);
                }}
              />
            </div>
          )}

          {scalingTab === "outerRadius" && (
            <div className="slider-control">
              <Slider
                value={state.outerRadius}
                valueLabelDisplay="auto"
                min={0}
                max={10}
                step={0.1}
                onChange={(_event, newValue) => {
                  updateState("outerRadius", newValue as number);
                }}
              />
            </div>
          )}

          {scalingTab === "innerScaling" && (
            <div className="slider-control">
              <Slider
                value={state.innerScaling}
                valueLabelDisplay="auto"
                min={0}
                max={5}
                step={0.1}
                onChange={(_event, newValue) => {
                  updateState("innerScaling", newValue as number);
                }}
              />
            </div>
          )}

          {scalingTab === "outerScaling" && (
            <div className="slider-control">
              <Slider
                value={state.outerScaling}
                valueLabelDisplay="auto"
                min={0}
                max={5}
                step={0.1}
                onChange={(_event, newValue) => {
                  updateState("outerScaling", newValue as number);
                }}
              />
            </div>
          )}

          <div className="tabs">
            <Tabs
              value={scalingTab}
              onChange={(_event, newValue) => {
                setScalingTab(newValue);
              }}
              variant="scrollable"
            >
              <Tab label="Inner Scaling" value="innerScaling" />
              <Tab label="Outer Scaling" value="outerScaling" />
              <Tab label="X" value="x" />
              <Tab label="Y" value="y" />
              <Tab label="Inner Radius" value="innerRadius" />
              <Tab label="Outer Radius" value="outerRadius" />
            </Tabs>
          </div>
          <div className="solo-button">
            <Button
              variant="outlined"
              onClick={() => {
                setMode("");
              }}
            >
              Back to Field Settings
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FieldControls;
