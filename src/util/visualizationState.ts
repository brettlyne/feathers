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
  rotationMode: "constant" | "fieldLinear" | "fieldRadial" | "zPosition";
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
  statsOn: boolean;
  interactiveCamera: boolean;
}

export type VisualizationStateUpdater = <K extends keyof VisualizationState>(
  key: K,
  value: VisualizationState[K]
) => void;

export const preset1: VisualizationState = {
  density: 5.1,
  arrangement: "spiral",
  zAxisArrangement: "dome",
  image: "drop.png",
  animationMode: "ripples",
  particleSize: 30,
  center: [0, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.9,
  rotationMode: "constant",
  rotationRange: [0, Math.PI / 2],
  colorMode: "fieldRadial",
  color1: "#ff1cc0",
  color2: "#ca7dff",
  background: {
    type: "gradient",
    colors: ["#e5a4eb", "#e6dfee"],
  },
  fov: 84,
  animationSpeed: 0.6,
  xMagnitude: 1,
  yMagnitude: 1,
  orbitInnerRadius: 0,
  orbitScale: 1,
  innerRadius: 0,
  innerScaling: 0.9,
  outerRadius: 6.1,
  outerScaling: 1.8,
  depthTestOn: true,
  cameraMatrix: [
    0.9699296371008498, -0.11878182646655928, 0.21243205213591745, 0,
    -0.12069903413308679, 0.5231822557192686, 0.8436302925214556, 0,
    -0.21134862723175887, -0.8439023669843343, 0.49311312370031674, 0,
    -3.0534246560189118, -11.982744001058986, 7.094776220115797, 1,
  ],
  statsOn: false,
  interactiveCamera: true,
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
  rotationRange: [0, Math.PI / 2],
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
  statsOn: false,
  interactiveCamera: true,
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
  rotationRange: [0, Math.PI / 2],
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
  statsOn: false,
  interactiveCamera: true,
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
  statsOn: false,
  interactiveCamera: true,
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
  statsOn: false,
  interactiveCamera: true,
};

export const preset6: VisualizationState = {
  density: 7.2,
  arrangement: "random",
  zAxisArrangement: "random",
  image: "coin.png",
  animationMode: "waves",
  particleSize: 30,
  center: [0, 0, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.9,
  rotationMode: "fieldRadial",
  rotationRange: [0, 1.5707963267948966],
  colorMode: "fieldLinear",
  color1: "#ffffff",
  color2: "#ffe000",
  background: {
    type: "custom",
    value:
      "linear-gradient( 16deg, hsl(223deg 68% 6%) 0%, hsl(227deg 70% 10%) 23%, hsl(232deg 72% 15%) 28%, hsl(236deg 74% 19%) 31%, hsl(240deg 76% 23%) 32%, hsl(245deg 78% 26%) 33%, hsl(249deg 80% 30%) 34%, hsl(254deg 83% 34%) 36%, hsl(258deg 85% 37%) 37%, hsl(262deg 88% 41%) 39%, hsl(267deg 90% 44%) 42%, hsl(269deg 84% 48%) 44%, hsl(269deg 76% 52%) 48%, hsl(269deg 76% 57%) 52%, hsl(269deg 75% 61%) 56%, hsl(269deg 74% 66%) 61%, hsl(270deg 72% 70%) 66%, hsl(270deg 70% 75%) 72%, hsl(270deg 67% 80%) 78%, hsl(270deg 63% 84%) 85%, hsl(270deg 53% 89%) 92%, hsl(270deg 27% 94%) 100%)",
  },
  fov: 160,
  animationSpeed: 0.5,
  xMagnitude: 0,
  yMagnitude: 9.3,
  orbitInnerRadius: 0,
  orbitScale: 1,
  innerRadius: 0,
  innerScaling: 0,
  outerRadius: 6.1,
  outerScaling: 1.8,
  depthTestOn: false,
  cameraMatrix: [
    -0.4529880870488296, 0.856986260360773, 0.24571597942483767, 0,
    -0.8648688309878438, -0.35554453740334613, -0.3543867761477142, 0,
    -0.2163416237749235, -0.3730450796827431, 0.9022381450298583, 0,
    0.23273567839592912, -0.5146926844922997, 2.4582219753133114, 1,
  ],
  statsOn: false,
  interactiveCamera: true,
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
  rotationRange: [0, Math.PI / 2],
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
  statsOn: false,
  interactiveCamera: true,
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
  statsOn: false,
  interactiveCamera: true,
};

const preset9: VisualizationState = {
  density: 7.3,
  arrangement: "hexagon",
  zAxisArrangement: "random",
  image: "feather.png",
  animationMode: "snake",
  particleSize: 30,
  center: [-7.7, 1.6, 0],
  rippleCenter: [0, 0, 0],
  animationMagnitude: 0.5,
  rotationMode: "zPosition",
  rotationRange: [0.23, 10.1],
  colorMode: "solid",
  color1: "#000000",
  color2: "#000000",
  background: {
    type: "gradient",
    colors: ["#000000", "#4f6178"],
  },
  fov: 122,
  animationSpeed: -3.6,
  xMagnitude: 4.6,
  yMagnitude: 3.3,
  orbitInnerRadius: 0,
  orbitScale: 1,
  innerRadius: 1.4,
  innerScaling: 2.8,
  outerRadius: 10,
  outerScaling: 1,
  depthTestOn: false,
  cameraMatrix: [
    0.1100246386542695, 0.7608254084310463, -0.6395617849549217, 0,
    0.9915560727870716, -0.1284557622857387, 0.0177671510005506, 0,
    -0.0686376966985623, -0.6361161961633438, -0.768534352889056, 0,
    -1.1622267780155604, -4.79632048553994, -3.5616598616195048, 1,
  ],
  statsOn: false,
  interactiveCamera: true,
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
  preset9,
];
