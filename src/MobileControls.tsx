import React from "react";

import Button from "@mui/material/Button";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import VideocamIcon from "@mui/icons-material/Videocam";
import AppsIcon from "@mui/icons-material/Apps";
import HexagonIcon from "@mui/icons-material/Hexagon";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion, AnimatePresence } from "framer-motion";

import { AnimationType } from "./util/animations";
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
              onChange={(event, newValue) => {
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
            <div className="tabs">
              <Tabs
                value={sceneTab}
                onChange={(event, newValue) => {
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
