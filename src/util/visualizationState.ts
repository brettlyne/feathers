import { AnimationType } from "./animations";

export interface VisualizationState {
  density: number;
  arrangement:
    | "grid"
    | "staggeredGrid"
    | "circular"
    | "spiral"
    | "random"
    | "hexagon";
  image:
    | "drop"
    | "mushroom"
    | "feather"
    | "cloud"
    | "coin"
    | "glow"
    | "moon"
    | string;
  animationType: AnimationType;
  particleSize: number;
  center: [number, number, number];
  rippleCenter: [number, number, number];
  animationMagnitude: number;
  rotation: number;
  color1: string;
  color2: string;
  bgColor: string;
  fov: number;
  animationSpeed: number;
  xMagnitude: number;
  yMagnitude: number;
  orbitInnerRadius: number;
  orbitScale: number;
  innerRadius: number;
  innerScaling: number;
  outerRadius: number;
  outerScaling: number;
}

export type VisualizationStateUpdater = <K extends keyof VisualizationState>(
  key: K,
  value: VisualizationState[K]
) => void;

export const preset1: VisualizationState = {
  density: 5,
  arrangement: "grid",
  image: "drop",
  animationType: "ripples",
  particleSize: 10,
  center: [0, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotation: 0,
  color1: "#ffffff",
  color2: "#ff00ff",
  bgColor: "#f0f0f0",
  fov: 75,
  animationSpeed: 1,
  xMagnitude: 1,
  yMagnitude: 1,
  orbitInnerRadius: 0,
  orbitScale: 1,
  innerRadius: 0,
  innerScaling: 1,
  outerRadius: 4,
  outerScaling: 1,
};

export const preset2: VisualizationState = {
  density: 6.9,
  arrangement: "random",
  image: "moon",
  animationType: "orbits",
  particleSize: 14,
  center: [-1.3, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotation: 0,
  color1: "#ff3333",
  color2: "#ff00ff",
  bgColor: "#333f69",
  fov: 38,
  animationSpeed: 1,
  xMagnitude: 1.1,
  yMagnitude: 1,
  orbitInnerRadius: 1.4,
  orbitScale: 0.5,
  innerRadius: 0.6,
  innerScaling: 2.6,
  outerRadius: 4,
  outerScaling: 0.5,
};

export const preset3: VisualizationState = {
  density: 5.9,
  arrangement: "random",
  image: "mushroom",
  animationType: "jello",
  particleSize: 10,
  center: [0, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotation: 0,
  color1: "#f3d3a2",
  color2: "#fff7a3",
  bgColor: "#f4e8c9",
  fov: 75,
  animationSpeed: 0.3,
  xMagnitude: 1.1,
  yMagnitude: 1,
  orbitInnerRadius: 0,
  orbitScale: 1,
  innerRadius: 0,
  innerScaling: 4.7,
  outerRadius: 3.3,
  outerScaling: 0,
};

export const preset4: VisualizationState = {
  density: 6.5,
  arrangement: "circular",
  image: "feather",
  animationType: "waves",
  particleSize: 13,
  center: [0, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotation: 5.55,
  color1: "#aef7ff",
  color2: "#8cffc1",
  bgColor: "#240e34",
  fov: 117,
  animationSpeed: 0.8,
  xMagnitude: 0.3,
  yMagnitude: 1,
  orbitInnerRadius: 0,
  orbitScale: 1,
  innerRadius: 0,
  innerScaling: 0,
  outerRadius: 4,
  outerScaling: 1.1,
};
