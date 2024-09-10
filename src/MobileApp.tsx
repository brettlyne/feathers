import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { ArcballControls, Stats } from "@react-three/drei";
import { ArcballControls } from "@react-three/drei";
import * as THREE from "three";
import chroma from "chroma-js";

import HexagonParticles from "./HexagonParticles";
import MobileControls from "./MobileControls";
import "./mobile.css";
import {
  VisualizationState,
  VisualizationStateUpdater,
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
  const [bgCSS, setBgCSS] = useState("#ff8800");

  const updateVState: VisualizationStateUpdater = (key, value) => {
    setVState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
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
    const bgPresets = [
      "radial-gradient(circle at 50% 110%, #f7ff0a, #ff9132, #e32968, #77107b)",
      "linear-gradient(75deg, #ffe799, #ffa172, #ff61b5)",
      "linear-gradient(225deg, #ffe5ce, #ffb4b1, #e589ca, #9c71f2)",
      "radial-gradient(120% 150% at 100% 0%, #FFEDED 0%, #FFF1E4 25%, #E1F1E4 50%, #EADEF7 75%, #EFDBF2 100%)",
      "linear-gradient(225deg, #f1ff56, #66d788, #009e96, #0a607b)",
      "linear-gradient(195deg, #8b2482, #55246d, #271c4e, #050b2b)",
      "linear-gradient(150deg, #9da6be, #707a94, #44516e, #142b4e)",
      "radial-gradient(90% 100% at 50% 100%, #737373 0%, #A8ACBC 100%)",
      "conic-gradient(from 180deg at 50% 120%, #e85907, #ec553f, #fd41ba, #65a6ff, #00dda7, #5cde53, #6ede42)",
      "conic-gradient(from 45deg at 70% -10%, #fff700, #c4f74d, #158be2, #670825, #590000)",
    ];

    let steps, colors;
    switch (vState.background.type) {
      case "solid":
        setBgCSS(vState.background.color || "#f0f0f0");
        break;
      case "custom":
        setBgCSS(String(vState.background.value) || "#f0f0f0");
        break;
      case "gradient":
        colors = vState.background.colors;
        steps = chroma.scale([colors[0], colors[1]]).mode("hsl").colors(4);
        setBgCSS(`linear-gradient(0deg, ${steps.join(", ")})`);
        break;
      case "preset":
        setBgCSS(bgPresets[vState.background.value || 0]);
        break;
    }
  }, [
    vState.background.type,
    vState.background.color,
    vState.background.colors,
    vState.background.value,
  ]);

  return (
    <div className="">
      <div
        className="container"
        style={{
          background: bgCSS,
          overflow: "hidden",
          position: "relative",
          width: "100vw",
          height: "100vh",
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
              fov: vState.fov,
              near: 0.1,
              far: 1000,
            }}
          >
            <CameraController
              fov={vState.fov}
              cameraMatrix={vState.cameraMatrix}
            />
            <HexagonParticles {...vState} />
            <ArcballControls
              ref={controlsRef}
              onChange={handleControlsChange}
            />
          </Canvas>
        </div>
      </div>
      <MobileControls
        state={vState}
        updateState={updateVState}
        setVState={setVState}
      />
      {/* <Stats /> */}
    </div>
  );
};

export default App;
