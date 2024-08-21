import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import VideocamIcon from "@mui/icons-material/Videocam";
import AppsIcon from "@mui/icons-material/Apps";
import HexagonIcon from "@mui/icons-material/Hexagon";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { motion, AnimatePresence } from "framer-motion";

// import { AnimationType } from "./util/animations";
import SceneControls from "./SceneControls";
import ShapeControls from "./ShapeControls";
import AnimationControls from "./AnimationControls";
import {
  VisualizationState,
  VisualizationStateUpdater,
} from "./util/visualizationState";

interface ControlsProps {
  state: VisualizationState;
  updateState: VisualizationStateUpdater;
}

const Controls: React.FC<ControlsProps> = ({ state, updateState }) => {
  const [activeTab, setActiveTab] = React.useState(3);

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
            <SceneControls
              state={state}
              updateState={updateState}
              setActiveTab={setActiveTab}
            />
          </motion.div>
        )}

        {activeTab === 2 && (
          <motion.div
            className="scene-controls"
            key="shape"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ShapeControls
              state={state}
              updateState={updateState}
              setActiveTab={setActiveTab}
            />
          </motion.div>
        )}

        {activeTab === 3 && (
          <motion.div
            className="scene-controls"
            key="animation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <AnimationControls
              state={state}
              updateState={updateState}
              setActiveTab={setActiveTab}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Controls;
