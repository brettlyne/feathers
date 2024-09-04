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
  image:
    | "drop"
    | "mushroom"
    | "feather"
    | "cloud"
    | "coin"
    | "glow"
    | "moon"
    | string;
  animationType: "ripples" | "waves" | "jello" | "banner" | "orbits" | "snake";
  particleSize: number;
  center: [number, number, number];
  rippleCenter: [number, number, number];
  animationMagnitude: number;
  rotation: number;
  colorMode: "solid" | "gradient" | "fieldLinear" | "fieldRadial" | "zPosition";
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
  image: "drop",
  animationType: "ripples",
  particleSize: 30,
  center: [0, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotation: 0,
  colorMode: "gradient",
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
  depthTestOn: true,
  cameraMatrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 18, 1],
};

export const preset2: VisualizationState = {
  density: 6.9,
  arrangement: "random",
  zAxisArrangement: "wavy",
  image: "moon",
  animationType: "orbits",
  particleSize: 50,
  center: [-1.3, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotation: 0,
  colorMode: "gradient",
  color1: "#ff3333",
  color2: "#ff00ff",
  bgColor: "#333f69",
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
  image: "mushroom",
  animationType: "jello",
  particleSize: 31,
  center: [0, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotation: 0,
  colorMode: "gradient",
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
  image: "feather",
  animationType: "waves",
  particleSize: 13,
  center: [0, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotation: 5.55,
  colorMode: "gradient",
  color1: "#aef7ff",
  color2: "#8cffc1",
  bgColor: "#240e34",
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
  image: "mushroom",
  animationType: "ripples",
  particleSize: 30,
  center: [0, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 1.3,
  rotation: 2.8,
  colorMode: "gradient",
  color1: "#fff900",
  color2: "#ff00ff",
  bgColor: "#f0f0f0",
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

export const presets = [preset1, preset2, preset3, preset4, preset5];
