import React, { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ArcballControls, Stats } from "@react-three/drei";
import * as THREE from "three";
import Controls from "./Controls";
import HexagonParticles from "./HexagonParticles";
import "./HexagonParticles.css";
import { AnimationType } from "./util/animations";

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
  const [density, setDensity] = useState(5);
  const [arrangement, setArrangement] = useState<
    "grid" | "staggeredGrid" | "circular" | "spiral" | "random" | "hexagon"
  >("grid");
  const [animationType, setAnimationType] = useState<AnimationType>("ripples");
  const [particleSize, setParticleSize] = useState(10);
  const [center, setCenter] = useState<[number, number, number]>([0, 0, 0]);
  const [animationMagnitude, setAnimationMagnitude] = useState(0.5);
  const [rotation, setRotation] = useState(0);
  const [color1, setColor1] = useState("#ffffff");
  const [color2, setColor2] = useState("#ff00ff");
  const [bgColor, setBgColor] = useState("#f0f0f0");
  const [fov, setFov] = useState(75);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [particleTexture, setParticleTexture] = useState<THREE.Texture | null>(
    null
  );
  const [activeImage, setActiveImage] = useState("mushroom.png");
  const [innerRadius, setInnerRadius] = useState(0);
  const [innerScaling, setInnerScaling] = useState(1);
  const [outerRadius, setOuterRadius] = useState(8);
  const [outerScaling, setOuterScaling] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(`./${activeImage}`, (texture) => {
      texture.flipY = false;
      setParticleTexture(texture);
    });
  }, [activeImage]);

  return (
    <div className="app-container">
      <Controls
        density={density}
        setDensity={setDensity}
        arrangement={arrangement}
        setArrangement={setArrangement}
        particleSize={particleSize}
        setParticleSize={setParticleSize}
        center={center}
        setCenter={setCenter}
        animationMagnitude={animationMagnitude}
        setAnimationMagnitude={setAnimationMagnitude}
        rotation={rotation}
        setRotation={setRotation}
        color1={color1}
        setColor1={setColor1}
        color2={color2}
        setColor2={setColor2}
        bgColor={bgColor}
        setBgColor={setBgColor}
        fov={fov}
        setFov={setFov}
        scaleX={scaleX}
        setScaleX={setScaleX}
        scaleY={scaleY}
        setScaleY={setScaleY}
        animationType={animationType}
        setAnimationType={setAnimationType}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
        innerRadius={innerRadius}
        setInnerRadius={setInnerRadius}
        innerScaling={innerScaling}
        setInnerScaling={setInnerScaling}
        outerRadius={outerRadius}
        setOuterRadius={setOuterRadius}
        outerScaling={outerScaling}
        setOuterScaling={setOuterScaling}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
      />
      <div
        className="container"
        style={{
          backgroundColor: bgColor,
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
            camera={{ position: [0, 0, 10], fov: fov, near: 0.1, far: 1000 }}
          >
            <CameraController fov={fov} />
            <HexagonParticles
              density={density}
              arrangement={arrangement}
              particleSize={particleSize}
              center={center}
              animationMagnitude={animationMagnitude}
              rotation={rotation}
              color1={color1}
              color2={color2}
              scaleX={scaleX}
              scaleY={scaleY}
              particleTexture={particleTexture}
              animationType={animationType}
              innerRadius={innerRadius}
              innerScaling={innerScaling}
              outerRadius={outerRadius}
              outerScaling={outerScaling}
              animationSpeed={animationSpeed}
            />
            <ArcballControls />
            <Stats />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default App;
