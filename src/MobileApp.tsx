import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ArcballControls, Stats } from "@react-three/drei";
import * as THREE from "three";

import { getCssFromBgState } from "./util/backgroundHelper";
import HexagonParticles from "./HexagonParticles";
import MobileControls from "./MobileControls";
import "./mobile.css";
import {
  VisualizationState,
  updateVisualizationState,
  preset1,
} from "./util/visualizationState";

const CameraController = ({
  fov,
  cameraMatrix,
}: {
  fov: number;
  cameraMatrix: number[];
}) => {
  const { camera } = useThree();

  useFrame(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fov;
      camera.matrix.fromArray(cameraMatrix);
      camera.matrix.decompose(camera.position, camera.quaternion, camera.scale);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

const App: React.FC = () => {
  const [vState, setVState] = useState<VisualizationState>(preset1);
  // @ts-expect-error TS2749
  const controlsRef = useRef<ArcballControls>(null);
  const [bgCSS, setBgCSS] = useState("#f0f0f0");
  const { particleConfig, editorConfig } = vState;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateVState = (key: string, value: any) => {
    setVState(updateVisualizationState(vState, key, value));
  };

  // if i press the p key, log vState to console
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "p") {
        console.log(vState);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [vState]);

  const handleControlsChange = () => {
    if (controlsRef.current && controlsRef.current.camera) {
      const newMatrix = controlsRef.current.camera.matrix.toArray();
      updateVState("cameraMatrix", newMatrix);
    }
  };

  // update background on state change
  useEffect(() => {
    setBgCSS(getCssFromBgState(editorConfig.background));
  }, [
    editorConfig.background,
    editorConfig.background.type,
    editorConfig.background.color,
    editorConfig.background.colors,
    editorConfig.background.value,
  ]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        minHeight: "90vh",
      }}
    >
      <div
        className="container"
        style={{
          background: bgCSS,
          overflow: "hidden",
          position: "relative",
          width: editorConfig.dimensions[0],
          height: editorConfig.dimensions[1],
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "140%",
            height: "140%",
            left: "-20%",
            top: "-20%",
            transformOrigin: "center center",
          }}
        >
          <Canvas
            camera={{
              fov: editorConfig.fov,
              near: 0.1,
              far: 1000,
            }}
          >
            <CameraController
              fov={editorConfig.fov}
              cameraMatrix={editorConfig.cameraMatrix}
            />
            <HexagonParticles {...particleConfig} />
            {editorConfig.interactiveCamera && (
              <ArcballControls
                ref={controlsRef}
                onChange={handleControlsChange}
              />
            )}
            {editorConfig.statsOn && <Stats />}
          </Canvas>
        </div>
      </div>
      <MobileControls
        state={vState}
        updateState={updateVState}
        setVState={setVState}
      />
    </div>
  );
};

export default App;
