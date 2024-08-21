import React from "react";
import Button from "@mui/material/Button";
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
  return (
    <div className="mobile-controls">
      <h1>hello</h1>
      <Button variant="contained">Hello world</Button>
    </div>
  );
};

export default Controls;
