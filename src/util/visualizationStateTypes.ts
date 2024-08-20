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
  animationType: AnimationType;
  particleSize: number;
  center: [number, number, number];
  animationMagnitude: number;
  rotation: number;
  color1: string;
  color2: string;
  bgColor: string;
  fov: number;
  animationSpeed: number;
  yMagnitude: number;
  innerRadius: number;
  innerScaling: number;
  outerRadius: number;
  outerScaling: number;
}

export type VisualizationStateUpdater = <K extends keyof VisualizationState>(
  key: K,
  value: VisualizationState[K]
) => void;

export const defaultVisualizationState: VisualizationState = {
  density: 5,
  arrangement: "grid",
  animationType: "ripples",
  particleSize: 10,
  center: [0, 0, 0],
  animationMagnitude: 0.5,
  rotation: 0,
  color1: "#ffffff",
  color2: "#ff00ff",
  bgColor: "#f0f0f0",
  fov: 75,
  animationSpeed: 1,
  yMagnitude: 1,
  innerRadius: 0,
  innerScaling: 1,
  outerRadius: 8,
  outerScaling: 1,
};
