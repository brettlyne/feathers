import React from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slider from "@mui/material/Slider";

import VideocamIcon from "@mui/icons-material/Videocam";
import AppsIcon from "@mui/icons-material/Apps";
import HexagonIcon from "@mui/icons-material/Hexagon";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { HexColorPicker } from "react-colorful";
import { motion, AnimatePresence } from "framer-motion";

import preset1img from "/presets/preset-1.png";
import preset2img from "/presets/preset-2.png";
import preset3img from "/presets/preset-3.png";
import preset4img from "/presets/preset-4.png";

// import { AnimationType } from "./util/animations";
import {
  VisualizationState,
  VisualizationStateUpdater,
} from "./util/visualizationState";

interface ControlsProps {
  state: VisualizationState;
  updateState: VisualizationStateUpdater;
}

const Controls: React.FC<ControlsProps> = ({ state, updateState }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [sceneTab, setSceneTab] = React.useState("presets");

  return (
    <div className="mobile-controls">
      <AnimatePresence>
        {activeTab === -1 && (
          <motion.div
            className="bottom-nav"
            key="bottom-nav"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <BottomNavigation
              showLabels
              value={activeTab}
              onChange={(_event, newValue) => {
                console.log(newValue);
                setActiveTab(newValue);
              }}
            >
              <BottomNavigationAction label="Scene" icon={<VideocamIcon />} />
              <BottomNavigationAction label="Field" icon={<AppsIcon />} />
              <BottomNavigationAction label="Shape" icon={<HexagonIcon />} />
              <BottomNavigationAction
                label="Animation"
                icon={<AutoAwesomeIcon />}
              />
            </BottomNavigation>
          </motion.div>
        )}
        {activeTab === 0 && (
          <motion.div
            className="scene-controls"
            key="scene"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {sceneTab === "presets" && (
              <div className="tile-control">
                <IconButton sx={{ padding: 0 }}>
                  <img src={preset1img} className="tile" />
                </IconButton>
                <IconButton sx={{ padding: 0 }}>
                  <img src={preset2img} className="tile" />
                </IconButton>
                <IconButton sx={{ padding: 0 }}>
                  <img src={preset3img} className="tile" />
                </IconButton>
                <IconButton sx={{ padding: 0 }}>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Controls;
