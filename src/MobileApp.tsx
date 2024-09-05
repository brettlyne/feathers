import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { ArcballControls, Stats } from "@react-three/drei";
import { ArcballControls } from "@react-three/drei";
import * as THREE from "three";
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
  const [particleTexture, setParticleTexture] = useState<THREE.Texture | null>(
    null
  );
  const [vState, setVState] = useState<VisualizationState>(preset1);
  // @ts-expect-error TS2749
  const controlsRef = useRef<ArcballControls>(null);

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

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(`./${vState.image}.png`, (texture) => {
      texture.flipY = false;
      setParticleTexture(texture);
    });
  }, [vState.image]);

  const handleControlsChange = () => {
    if (controlsRef.current && controlsRef.current.camera) {
      const newMatrix = controlsRef.current.camera.matrix.toArray();
      updateVState("cameraMatrix", newMatrix);
    }
  };

  return (
    <div className="">
      <div
        className="container"
        style={{
          backgroundColor: vState.bgColor,
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
            <HexagonParticles particleTexture={particleTexture} {...vState} />
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
