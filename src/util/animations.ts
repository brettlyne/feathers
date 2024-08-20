import * as THREE from "three";

export type AnimationType =
  | "ripples"
  | "waves"
  | "jello"
  | "banner"
  | "orbits"
  | "snake";

export const animateParticles = (
  positions: Float32Array,
  originalPositions: Float32Array,
  time: number,
  animationType: AnimationType,
  center: THREE.Vector3,
  animationMagnitude: number,
  xMagnitude: number,
  yMagnitude: number
) => {
  for (let i = 0; i < positions.length; i += 3) {
    const x = originalPositions[i];
    const y = originalPositions[i + 1];
    const z = originalPositions[i + 2];
    const dist = Math.sqrt((x - center.x) ** 2 + (y - center.y) ** 2);
    const roughColWidth = 8 / Math.sqrt(positions.length / 3);

    switch (animationType) {
      case "ripples":
        // positions[i] = x;
        // positions[i + 1] = y;
        positions[i + 2] =
          Math.sin(dist * 0.5 - time * 2.0) * animationMagnitude;
        break;
      case "waves":
        positions[i] = x + 0.5 * Math.sin(2 * time) * xMagnitude;
        positions[i + 1] = y + yMagnitude * Math.cos(0.5 * x + time);
        positions[i + 2] = z + Math.cos(1 * x + time) * xMagnitude;
        break;
      case "jello":
        positions[i] = x * (1 + 0.5 * Math.sin(2 * time) * xMagnitude);
        positions[i + 1] = y * (1 + 0.5 * Math.cos(2 * time) * yMagnitude);
        // positions[i + 2] = Math.sin(x * 0.1 - time) * animationMagnitude;
        // positions[i + 2] = 0;
        break;
      case "banner":
        positions[i] = x + Math.sin(0.5 * time + 0.5 * x) * xMagnitude;
        positions[i + 1] = y + Math.sin(1 * time + 0.5 * x) * yMagnitude;
        // positions[i + 2] = 0;
        break;
      case "orbits":
        positions[i] =
          Math.cos(Math.atan2(y, x) + time * dist * 0.05) * dist * xMagnitude;
        positions[i + 1] =
          Math.sin(Math.atan2(y, x) + time * dist * 0.05) * dist * yMagnitude;
        // positions[i + 2] = 0;
        break;
      case "snake":
        positions[i] =
          ((x - time / 4) % (8 + roughColWidth)) * xMagnitude + 4 * xMagnitude;
        positions[i + 1] =
          y + (Math.sin(time / 1.5 + x * 0.75 + (y * y) / 4) * yMagnitude) / 2;
        // positions[i + 2] =
        // Math.sin(positions[i + 1]) * 0.1 * animationMagnitude;
        // positions[i + 2] = 0;

        break;
    }
  }
};
