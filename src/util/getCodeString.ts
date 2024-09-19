import { VisualizationState } from "./visualizationState";
import { getCssFromBgState } from "./backgroundHelper";

const getCodeString = (state: VisualizationState) => {
  const { particleConfig, editorConfig } = state;
  const css = getCssFromBgState(editorConfig);

  let codeString = `
// THIS IS JUST A PLACEHOLDER
// STILL NEED TO PUBLISH PACKAGE TO NPM UNDER A DIFFERENT NAME

import React from "react";
import { Canvas } from "@react-three/fiber";
import HexagonParticles from "./HexagonParticles";
`;

  if (editorConfig.statsOn && editorConfig.interactiveCamera)
    codeString += `import { Stats, ArcballControls } from '@react-three/drei';\n`;
  else if (editorConfig.statsOn)
    codeString += `import { Stats } from '@react-three/drei';\n`;
  else if (editorConfig.interactiveCamera)
    codeString += `import { ArcballControls } from '@react-three/drei';\n`;

  codeString += `\nconst particleConfig = `;
  codeString += JSON.stringify(particleConfig, null, 4);

  codeString += `\n
const cameraConfig = {
  fov: ${editorConfig.fov},
  matrix: ${JSON.stringify(editorConfig.cameraMatrix)},
  near: 0.1,
  far: 1000,
}

const MyParticleCanvas: React.FC = () => {
  return (
    <div
      style={{
        width: "${editorConfig.dimensions[0]}",
        height: "${editorConfig.dimensions[1]}",
        background: "${css}",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          // 20% buffer on each side so particles don't blink out at edges
          width: "140%",
          height: "140%",
          left: "-20%",
          top: "-20%",
        }}
      >
        <Canvas camera={cameraConfig}>
          <HexagonParticles {...particleConfig} />\n`;

  if (editorConfig.interactiveCamera)
    codeString += `          <ArcballControls />\n`;
  if (editorConfig.statsOn) codeString += `          <Stats />\n`;

  codeString += `        </Canvas>
      </div>
    </div>
  );
};

export default MyParticleCanvas;

`;

  return codeString;
};

export default getCodeString;
