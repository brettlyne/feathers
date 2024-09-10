import { AnimationMode } from "./shaderAnimations";

export interface VisualizationState {
  density: number;
  arrangement:
    | "grid"
    | "staggeredGrid"
    | "circular"
    | "spiral"
    | "random"
    | "hexagon";
  zAxisArrangement: "flat" | "dome" | "wavy" | "valley" | "cone" | "random";
  image: string;
  animationMode: AnimationMode;
  particleSize: number;
  center: [number, number, number];
  rippleCenter: [number, number, number];
  animationMagnitude: number;
  rotationMode: "constant" | "fieldLinear" | "fieldRadial";
  rotationRange: [number, number];
  colorMode: "solid" | "gradient" | "fieldLinear" | "fieldRadial" | "zPosition";
  color1: string;
  color2: string;
  background: {
    type: "solid" | "gradient" | "preset" | "custom";
    color?: string; // for solid
    colors?: string[]; // for gradient
    value?: string; // for preset or custom
  };
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
  depthTestOn: boolean;
  cameraMatrix: number[];
}

export type VisualizationStateUpdater = <K extends keyof VisualizationState>(
  key: K,
  value: VisualizationState[K]
) => void;

export const preset1: VisualizationState = {
  density: 5,
  arrangement: "grid",
  zAxisArrangement: "flat",
  image: "drop.png",
  animationMode: "ripples",
  particleSize: 30,
  center: [0, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotationMode: "constant",
  rotationRange: [0, 0],
  colorMode: "gradient",
  color1: "#ffffff",
  color2: "#ff00ff",
  background: { type: "solid", color: "#f0f0f0" },
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
  depthTestOn: true,
  cameraMatrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 18, 1],
};

export const preset2: VisualizationState = {
  density: 6.9,
  arrangement: "random",
  zAxisArrangement: "wavy",
  image: "moon.png",
  animationMode: "orbits",
  particleSize: 50,
  center: [-1.3, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotationMode: "constant",
  rotationRange: [0, 0],
  colorMode: "gradient",
  color1: "#ff3333",
  color2: "#ff00ff",
  background: { type: "solid", color: "#333f69" },
  fov: 55,
  animationSpeed: 1,
  xMagnitude: 0.8,
  yMagnitude: 1,
  orbitInnerRadius: 1.4,
  orbitScale: 0.7,
  innerRadius: 0.7,
  innerScaling: 2.7,
  outerRadius: 4.4,
  outerScaling: 0,
  depthTestOn: true,
  cameraMatrix: [
    0.9835927286821329, -0.040225039313114636, 0.17586156571547457, 0,
    -0.10587381713737798, 0.6605852750676465, 0.7432481612547478, 0,
    -0.14606874726785565, -0.749672622266586, 0.645488094774441, 0,
    -3.008596162733603, -13.40079125814129, 10.526752683366672, 1,
  ],
};

export const preset3: VisualizationState = {
  density: 5.9,
  arrangement: "random",
  zAxisArrangement: "dome",
  image: "mushroom.png",
  animationMode: "jello",
  particleSize: 31,
  center: [0, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotationMode: "constant",
  rotationRange: [0, 0],
  colorMode: "gradient",
  color1: "#f3d3a2",
  color2: "#fff7a3",
  background: { type: "solid", color: "#f4e8c9" },
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
  depthTestOn: false,
  cameraMatrix: [
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.0751308981393026,
    -0.07395166079615599, 15.143740007205523, 1,
  ],
};

export const preset4: VisualizationState = {
  density: 6.5,
  arrangement: "circular",
  zAxisArrangement: "flat",
  image: "feather.png",
  animationMode: "waves",
  particleSize: 13,
  center: [0, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotationMode: "constant",
  rotationRange: [5.55, 0],
  colorMode: "gradient",
  color1: "#aef7ff",
  color2: "#8cffc1",
  background: { type: "solid", color: "#240e34" },
  fov: 117,
  animationSpeed: 0.8,
  xMagnitude: 0.3,
  yMagnitude: 1,
  orbitInnerRadius: 0,
  orbitScale: 1,
  innerRadius: 0.5,
  innerScaling: 0,
  outerRadius: 5.9,
  outerScaling: 3.5,
  depthTestOn: false,
  cameraMatrix: [
    0.9969121740464922, 0.007568075754644811, 0.07815907795813744, 0,
    0.06671383086721562, -0.606615801723314, -0.7921909705813368, 0,
    0.04141717046002543, 0.794959114249879, -0.6052475730328313, 0,
    0.43920447807773527, 9.186013296316714, -5.033052190348866, 1,
  ],
};

export const preset5: VisualizationState = {
  density: 6.1,
  arrangement: "circular",
  zAxisArrangement: "dome",
  image: "mushroom.png",
  animationMode: "ripples",
  particleSize: 30,
  center: [0, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 1.3,
  rotationMode: "constant",
  rotationRange: [2.8, 0],
  colorMode: "gradient",
  color1: "#fff900",
  color2: "#ff00ff",
  background: { type: "solid", color: "#f0f0f0" },
  fov: 97,
  animationSpeed: 0.4,
  xMagnitude: 1,
  yMagnitude: 1,
  orbitInnerRadius: 0,
  orbitScale: 1,
  innerRadius: 0.7,
  innerScaling: 6.7,
  outerRadius: 4.9,
  outerScaling: 0,
  depthTestOn: true,
  cameraMatrix: [
    0.969367321443659, 0.12274832772864377, -0.21274361131880146, 0,
    0.1991716904418025, 0.11401284138982906, 0.9733096679499145, 0,
    0.1437276377169637, -0.9858670904528866, 0.08607233073562108, 0,
    1.0613684416767624, -7.280215789498701, 0.6356081335188752, 1,
  ],
};

export const preset6: VisualizationState = {
  density: 5,
  arrangement: "circular",
  zAxisArrangement: "cone",
  image: "moon.png",
  animationMode: "jello",
  particleSize: 30,
  center: [4.2, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotationMode: "constant",
  rotationRange: [0, 0],
  colorMode: "fieldLinear",
  color1: "#7d00ff",
  color2: "#abff50",
  background: { type: "solid", color: "#140620" },
  fov: 127,
  animationSpeed: 0.4,
  xMagnitude: 1,
  yMagnitude: 1,
  orbitInnerRadius: 0,
  orbitScale: 1,
  innerRadius: 2.7,
  innerScaling: 3.3,
  outerRadius: 6.4,
  outerScaling: 1,
  depthTestOn: false,
  cameraMatrix: [
    0.0016511365791112226, 0.25646758242243706, 0.9665514227988162, 0,
    -0.9971498808528314, -0.07248301862645491, 0.020936263420257534, 0,
    0.07542803764650322, -0.9638312047123179, 0.2556169398917218, 0,
    0.01227408039850031, -2.8094951341441834, 0.0415019453134237, 1,
  ],
};

export const preset7: VisualizationState = {
  density: 5,
  arrangement: "hexagon",
  zAxisArrangement: "wavy",
  image: "mushroom.png",
  animationMode: "ripples",
  particleSize: 30,
  center: [2.2, 3.4, 0],
  rippleCenter: [3.6, 5.2, 0],
  animationMagnitude: 1.5,
  rotationMode: "constant",
  rotationRange: [0, 0],
  colorMode: "fieldRadial",
  color1: "#ffff00",
  color2: "#ffc8ff",
  background: { type: "solid", color: "#cacee5" },
  fov: 75,
  animationSpeed: 0.6,
  xMagnitude: 1,
  yMagnitude: 1,
  orbitInnerRadius: 0,
  orbitScale: 1,
  innerRadius: 0,
  innerScaling: 8.7,
  outerRadius: 8.4,
  outerScaling: 0.5,
  depthTestOn: false,
  cameraMatrix: [
    0.5428570320276913, -0.8027876848935722, -0.24665395954921207, 0,
    -0.5733487511985205, -0.5688680926296896, 0.5896272574151877, 0,
    -0.6136590684388055, -0.17866456327732516, -0.7690913609914877, 0,
    -8.459757401024083, -2.6913328139768025, -10.74807756765347, 1,
  ],
};

const preset8: VisualizationState = {
  density: 6,
  arrangement: "staggeredGrid",
  zAxisArrangement: "valley",
  image: "drop.png",
  animationMode: "snake",
  particleSize: 51,
  center: [-2.7, 2.4, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotationMode: "fieldLinear",
  rotationRange: [4.27, 10.04],
  colorMode: "fieldLinear",
  color1: "#ff6666",
  color2: "#ff00ff",
  background: { type: "solid", color: "#f1ffe5" },
  fov: 80,
  animationSpeed: -3.7,
  xMagnitude: 1.4,
  yMagnitude: 1.2,
  orbitInnerRadius: 0,
  orbitScale: 1,
  innerRadius: 0,
  innerScaling: 4.1,
  outerRadius: 5.8,
  outerScaling: 0.8,
  depthTestOn: false,
  cameraMatrix: [
    0.9965214347044477, 0.07398162990109414, 0.03836337591714531, 0,
    0.04534133074310554, -0.8675600189821328, 0.49526132212213675, 0,
    0.06992277097646406, -0.49179907675889406, -0.8678965803585559, 0,
    1.646953837251463, -5.028587674049912, -6.128943141714856, 1,
  ],
};

export const presets = [
  preset1,
  preset2,
  preset3,
  preset4,
  preset5,
  preset6,
  preset7,
  preset8,
];
