import React from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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
  const [tab, setTab] = React.useState("share");
  const { particleConfig } = state;

  return (
    <>
      {tab === "share" && (
        <div className="tile-control">
          <p>share</p>
        </div>
      )}

      <div className="tabs">
        <Tabs
          value={tab}
          onChange={(_event, newValue) => {
            setTab(newValue);
          }}
          variant="scrollable"
        >
          <Tab label={"Share"} value={"share"} />
          <Tab label={"Code Export"} value={"export"} />
          <Tab label={"About"} value={"about"} />
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
