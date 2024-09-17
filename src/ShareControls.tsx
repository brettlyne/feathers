import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import queryString from "query-string";

import Button from "@mui/material/Button";
import LinkIcon from "@mui/icons-material/Link";
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
  // updateState,
  setActiveTab,
}) => {
  const [tab, setTab] = useState("share");
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const { particleConfig, editorConfig } = state;
  const timeoutRef = useRef<typeof globalThis.Timeout | null>(null);

  const handleShare = async () => {
    const str = queryString.stringify({
      ...particleConfig,
      ...editorConfig,
    });
    console.log(str);
    const obj = queryString.parse(str);
    console.log(obj);
    console.log(state);
    try {
      await navigator.clipboard.writeText("mouse");
      setShowCopiedMessage(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setShowCopiedMessage(false);
        timeoutRef.current = null;
      }, 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      {tab === "share" && (
        <div className="tile-control" style={{ alignItems: "center" }}>
          <Button
            variant="outlined"
            onClick={handleShare}
            startIcon={<LinkIcon />}
          >
            Share
          </Button>
          <AnimatePresence>
            {showCopiedMessage && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
              >
                Link copied to clipboard.
              </motion.p>
            )}
          </AnimatePresence>
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
          <Tab label="Share" value="share" />
          <Tab label="Code Export" value="export" />
          <Tab label="About" value="about" />
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
