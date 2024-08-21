import React from "react";

import Button from "@mui/material/Button";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import VideocamIcon from "@mui/icons-material/Videocam";
import AppsIcon from "@mui/icons-material/Apps";
import HexagonIcon from "@mui/icons-material/Hexagon";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

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
  const [value, setValue] = React.useState(0);

  return (
    <div className="mobile-controls">
      <h1>hello</h1>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Scene" icon={<VideocamIcon />} />
        <BottomNavigationAction label="Field" icon={<AppsIcon />} />
        <BottomNavigationAction label="Shape" icon={<HexagonIcon />} />
        <BottomNavigationAction label="Animation" icon={<AutoAwesomeIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default Controls;
