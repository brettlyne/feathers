import React, { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ArcballControls, Stats } from "@react-three/drei";
import * as THREE from "three";
import Controls from "./Controls";
import HexagonParticles from "./HexagonParticles";
import "./desktop.css";
import {
  VisualizationState,
  VisualizationStateUpdater,
  preset1,
} from "./util/visualizationState";

const CameraController = ({ fov }: { fov: number }) => {
  useFrame((state) => {
    if (state.camera.type === "PerspectiveCamera") {
      (state.camera as THREE.PerspectiveCamera).fov = fov;
      state.camera.updateProjectionMatrix();
    }
  });
  return null;
};

const App: React.FC = () => {
  const [particleTexture, setParticleTexture] = useState<THREE.Texture | null>(
    null
  );
  const [vState, setVState] = useState<VisualizationState>(preset1);

  const updateVState: VisualizationStateUpdater = (key, value) => {
    setVState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(`./${vState.image}.png`, (texture) => {
      texture.flipY = false;
      setParticleTexture(texture);
    });
  }, [vState.image]);

  return (
    <div className="desktop-app-container">
      <Controls state={vState} updateState={updateVState} />
      <div
        className="container"
        style={{
          backgroundColor: vState.bgColor,
          overflow: "hidden",
          position: "relative",
          width: "800px",
          height: "800px",
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
              position: [0, 0, 10],
              fov: vState.fov,
              near: 0.1,
              far: 1000,
            }}
          >
            <CameraController fov={vState.fov} />
            <HexagonParticles particleTexture={particleTexture} {...vState} />
            <ArcballControls />
            <Stats />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default App;
