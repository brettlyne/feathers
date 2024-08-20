import React from "react";
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
    <div className="controls">
      <div className="control-group">
        <label>Density: {state.density.toFixed(2)}</label>
        <input
          type="range"
          min="1"
          max="10"
          step="0.1"
          value={state.density}
          onChange={(e) => updateState("density", parseFloat(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Arrangement:</label>
        <select
          value={state.arrangement}
          onChange={(e) =>
            updateState(
              "arrangement",
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
          value={state.animationType}
          onChange={(e) =>
            updateState("animationType", e.target.value as AnimationType)
          }
        >
          <option value="ripples">Ripples</option>
          <option value="waves">Waves</option>
          <option value="jello">Jello</option>
          <option value="banner">Banner</option>
          <option value="orbits">Orbits</option>
          <option value="snake">Snake</option>
        </select>
      </div>

      <div
        className="animation-specific-controls"
        style={{
          backgroundColor: "#555",
          padding: "10px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div className="control-group">
          <label>Inner Radius: {state.innerRadius.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={state.innerRadius}
            onChange={(e) =>
              updateState("innerRadius", parseFloat(e.target.value))
            }
          />
        </div>
        <div className="control-group">
          <label>Inner Scaling: {state.innerScaling.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={state.innerScaling}
            onChange={(e) =>
              updateState("innerScaling", parseFloat(e.target.value))
            }
          />
        </div>
        <div className="control-group">
          <label>Outer Radius: {state.outerRadius.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={state.outerRadius}
            onChange={(e) =>
              updateState("outerRadius", parseFloat(e.target.value))
            }
          />
        </div>
        <div className="control-group">
          <label>Outer Scaling: {state.outerScaling.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={state.outerScaling}
            onChange={(e) =>
              updateState("outerScaling", parseFloat(e.target.value))
            }
          />
        </div>
        <div className="control-group">
          <label>Center X: {state.center[0].toFixed(2)}</label>
          <input
            type="range"
            min="-50"
            max="50"
            step="0.1"
            value={state.center[0]}
            onChange={(e) =>
              updateState("center", [
                parseFloat(e.target.value),
                state.center[1],
                state.center[2],
              ])
            }
          />
        </div>
        <div className="control-group">
          <label>Center Y: {state.center[1].toFixed(2)}</label>
          <input
            type="range"
            min="-50"
            max="50"
            step="0.1"
            value={state.center[1]}
            onChange={(e) =>
              updateState("center", [
                state.center[0],
                parseFloat(e.target.value),
                state.center[2],
              ])
            }
          />
        </div>
        <div className="control-group">
          <label>X Magnitude: {state.xMagnitude.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={state.xMagnitude}
            onChange={(e) =>
              updateState("xMagnitude", parseFloat(e.target.value))
            }
          />
        </div>
        <div className="control-group">
          <label>Y Magnitude: {state.yMagnitude.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={state.yMagnitude}
            onChange={(e) =>
              updateState("yMagnitude", parseFloat(e.target.value))
            }
          />
        </div>
      </div>
      <div className="control-group">
        <label>Animation Speed: {state.animationSpeed.toFixed(2)}x</label>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={state.animationSpeed}
          onChange={(e) =>
            updateState("animationSpeed", parseFloat(e.target.value))
          }
        />
      </div>
      <div className="control-group">
        <label>Particle Size: {state.particleSize.toFixed(2)}</label>
        <input
          type="range"
          min="1"
          max="50"
          step="0.1"
          value={state.particleSize}
          onChange={(e) =>
            updateState("particleSize", parseFloat(e.target.value))
          }
        />
      </div>
      <div className="control-group">
        <label>
          Animation Magnitude: {state.animationMagnitude.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={state.animationMagnitude}
          onChange={(e) =>
            updateState("animationMagnitude", parseFloat(e.target.value))
          }
        />
      </div>
      <div className="control-group">
        <label>
          Rotation: {((state.rotation * 180) / Math.PI).toFixed(2)}°
        </label>
        <input
          type="range"
          min="0"
          max={2 * Math.PI}
          step="0.1"
          value={state.rotation}
          onChange={(e) => updateState("rotation", parseFloat(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Color 1:</label>
        <input
          type="color"
          value={state.color1}
          onChange={(e) => updateState("color1", e.target.value)}
        />
      </div>
      <div className="control-group">
        <label>Color 2:</label>
        <input
          type="color"
          value={state.color2}
          onChange={(e) => updateState("color2", e.target.value)}
        />
      </div>
      <div className="control-group">
        <label>Background Color:</label>
        <input
          type="color"
          value={state.bgColor}
          onChange={(e) => updateState("bgColor", e.target.value)}
        />
      </div>
      <div className="control-group">
        <label>Camera FOV: {state.fov.toFixed(2)}°</label>
        <input
          type="range"
          min="20"
          max="120"
          step="1"
          value={state.fov}
          onChange={(e) => updateState("fov", parseFloat(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Scale X: {state.scaleX.toFixed(2)}</label>
        <input
          type="range"
          min="0.1"
          max="8"
          step="0.1"
          value={state.scaleX}
          onChange={(e) => updateState("scaleX", parseFloat(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Scale Y: {state.scaleY.toFixed(2)}</label>
        <input
          type="range"
          min="0.1"
          max="8"
          step="0.1"
          value={state.scaleY}
          onChange={(e) => updateState("scaleY", parseFloat(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Particle Image:</label>
        <select
          value={state.image}
          onChange={(e) => updateState("image", e.target.value)}
        >
          <option value="cloud">Cloud</option>
          <option value="coin">Coin</option>
          <option value="drop">Drop</option>
          <option value="feather">Feather</option>
          <option value="glow">Glow</option>
          <option value="moon">Moon</option>
          <option value="mushroom">Mushroom</option>
        </select>
      </div>
    </div>
  );
};

export default Controls;
