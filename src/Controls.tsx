import React from "react";
import { AnimationType } from "./util/animations";

interface ControlsProps {
  density: number;
  setDensity: (density: number) => void;
  arrangement:
    | "grid"
    | "staggeredGrid"
    | "circular"
    | "spiral"
    | "random"
    | "hexagon";
  setArrangement: (
    arrangement:
      | "grid"
      | "staggeredGrid"
      | "circular"
      | "spiral"
      | "random"
      | "hexagon"
  ) => void;
  animationType: AnimationType;
  setAnimationType: (type: AnimationType) => void;
  particleSize: number;
  setParticleSize: (size: number) => void;
  center: [number, number, number];
  setCenter: (center: [number, number, number]) => void;
  animationMagnitude: number;
  setAnimationMagnitude: (magnitude: number) => void;
  rotation: number;
  setRotation: (rotation: number) => void;
  color1: string;
  setColor1: (color: string) => void;
  color2: string;
  setColor2: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  centerScaling: number;
  setCenterScaling: (scaling: number) => void;
  fov: number;
  setFov: (fov: number) => void;
  scaleX: number;
  setScaleX: (scale: number) => void;
  scaleY: number;
  setScaleY: (scale: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
  density,
  setDensity,
  arrangement,
  setArrangement,
  particleSize,
  setParticleSize,
  center,
  setCenter,
  animationMagnitude,
  setAnimationMagnitude,
  rotation,
  setRotation,
  color1,
  setColor1,
  color2,
  setColor2,
  bgColor,
  setBgColor,
  centerScaling,
  setCenterScaling,
  fov,
  setFov,
  scaleX,
  setScaleX,
  scaleY,
  setScaleY,
  animationType,
  setAnimationType,
}) => {
  return (
    <div className="controls">
      <div className="control-group">
        <label>Density: {density.toFixed(2)}</label>
        <input
          type="range"
          min="1"
          max="10"
          step="0.1"
          value={density}
          onChange={(e) => setDensity(parseFloat(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Arrangement:</label>
        <select
          value={arrangement}
          onChange={(e) =>
            setArrangement(
              e.target.value as
                | "grid"
                | "staggeredGrid"
                | "circular"
                | "spiral"
                | "random"
                | "hexagon"
            )
          }
        >
          <option value="grid">Grid</option>
          <option value="staggeredGrid">Staggered Grid</option>
          <option value="hexagon">Hexagon</option>
          <option value="circular">Circular</option>
          <option value="spiral">Spiral</option>
          <option value="random">Random</option>
        </select>
      </div>
      <div className="control-group">
        <label>Animation Type:</label>
        <select
          value={animationType}
          onChange={(e) => setAnimationType(e.target.value as AnimationType)}
        >
          <option value="ripples">Ripples</option>
          <option value="waves">Waves</option>
          <option value="jello">Jello</option>
          <option value="banner">Banner</option>
          <option value="orbits">Orbits</option>
          <option value="snake">Snake</option>
        </select>
      </div>
      <div className="control-group">
        <label>Particle Size: {particleSize.toFixed(2)}</label>
        <input
          type="range"
          min="1"
          max="50"
          step="0.1"
          value={particleSize}
          onChange={(e) => setParticleSize(parseFloat(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Center X: {center[0].toFixed(2)}</label>
        <input
          type="range"
          min="-50"
          max="50"
          step="0.1"
          value={center[0]}
          onChange={(e) =>
            setCenter([parseFloat(e.target.value), center[1], center[2]])
          }
        />
      </div>
      <div className="control-group">
        <label>Center Y: {center[1].toFixed(2)}</label>
        <input
          type="range"
          min="-50"
          max="50"
          step="0.1"
          value={center[1]}
          onChange={(e) =>
            setCenter([center[0], parseFloat(e.target.value), center[2]])
          }
        />
      </div>
      <div className="control-group">
        <label>Animation Magnitude: {animationMagnitude.toFixed(2)}</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={animationMagnitude}
          onChange={(e) => setAnimationMagnitude(parseFloat(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Rotation: {((rotation * 180) / Math.PI).toFixed(2)}°</label>
        <input
          type="range"
          min="0"
          max={2 * Math.PI}
          step="0.1"
          value={rotation}
          onChange={(e) => setRotation(parseFloat(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Color 1:</label>
        <input
          type="color"
          value={color1}
          onChange={(e) => setColor1(e.target.value)}
        />
      </div>
      <div className="control-group">
        <label>Color 2:</label>
        <input
          type="color"
          value={color2}
          onChange={(e) => setColor2(e.target.value)}
        />
      </div>
      <div className="control-group">
        <label>Background Color:</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </div>
      <div className="control-group">
        <label>Center Scaling: {centerScaling.toFixed(2)}</label>
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={centerScaling}
          onChange={(e) => setCenterScaling(parseFloat(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Camera FOV: {fov.toFixed(2)}°</label>
        <input
          type="range"
          min="20"
          max="120"
          step="1"
          value={fov}
          onChange={(e) => setFov(parseFloat(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Scale X: {scaleX.toFixed(2)}</label>
        <input
          type="range"
          min="0.1"
          max="8"
          step="0.1"
          value={scaleX}
          onChange={(e) => setScaleX(parseFloat(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Scale Y: {scaleY.toFixed(2)}</label>
        <input
          type="range"
          min="0.1"
          max="8"
          step="0.1"
          value={scaleY}
          onChange={(e) => setScaleY(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Controls;
