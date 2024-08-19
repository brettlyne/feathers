import React from "react";

interface ControlsProps {
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
}) => {
  return (
    <div className="controls">
      <div className="control-group">
        <label>Particle Size: {particleSize.toFixed(2)}</label>
        <input
          type="range"
          min="0.1"
          max="8"
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
          min="45"
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
