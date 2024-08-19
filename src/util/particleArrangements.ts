import * as THREE from "three";

const FIELD_SIZE = 8; // centered on the origin

const getLogScaledCount = (density: number) => {
  // apply density input (1-10) on log scale to range 9-10000
  const minCount = Math.log(9);
  const maxCount = Math.log(10000);
  const normalizedDensity = (density - 1) / 9;
  return Math.floor(
    Math.exp(minCount + (maxCount - minCount) * normalizedDensity)
  );
};

const getGrid = (density: number, staggered: boolean) => {
  const rawCount = getLogScaledCount(density);
  const cols = Math.ceil(Math.sqrt(rawCount));
  const count = cols * cols;
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const colWidth = FIELD_SIZE / (cols - 1);
  const start = -FIELD_SIZE / 2;

  for (let i = 0; i < count; i++) {
    let x = start + (i % cols) * colWidth;
    const y = start + Math.floor(i / cols) * colWidth;
    if (staggered) {
      const evenRow = Math.floor(i / cols) % 2 === 0;
      x += ((evenRow ? 1 : -1) * colWidth) / 4;
    }
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = 0; // z
    scales[i] = 1;
  }

  return { positions, scales, count };
};

export const getGridParticleData = (density: number) => {
  return getGrid(density, false);
};
export const getStaggeredGridParticleData = (density: number) => {
  return getGrid(density, true);
};

export const getHexParticleData = (density: number) => {
  const rawCount = getLogScaledCount(density);
  const pointsPerSide = Math.ceil(Math.sqrt(rawCount / 3));
  const hexRadius = FIELD_SIZE / (pointsPerSide * Math.sqrt(2));

  const directions = [
    [1, 0],
    [0.5, Math.sqrt(3) / 2],
    [-0.5, Math.sqrt(3) / 2],
    [-1, 0],
    [-0.5, -Math.sqrt(3) / 2],
    [0.5, -Math.sqrt(3) / 2],
  ];

  let ring = 0;
  let count = 0;
  const positionsArr = [];

  while (count < rawCount) {
    if (ring === 0) {
      positionsArr.push([0, 0]);
      count++;
    } else {
      const ringCount = ring * 6;
      for (let side = 0; side < 6; side++) {
        for (let i = 0; i < ring; i++) {
          const x =
            (directions[side][0] * ring + directions[(side + 2) % 6][0] * i) *
            hexRadius;
          const y =
            (directions[side][1] * ring + directions[(side + 2) % 6][1] * i) *
            hexRadius;
          positionsArr.push([x, y]);
        }
      }
      count += ringCount;
    }
    ring++;
  }

  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = positionsArr[i][0]; // x
    positions[i * 3 + 1] = positionsArr[i][1]; // y
    positions[i * 3 + 2] = 0; // z
    scales[i] = 1;
  }

  return { positions, scales, count };
};

export const getCircularParticleData = (density: number) => {
  const count = getLogScaledCount(density);
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = (Math.sqrt(Math.random()) * FIELD_SIZE) / 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = 0;
    scales[i] = 1;
  }

  return { positions, scales, count };
};

export const getSpiralParticleData = (density: number) => {
  const count = getLogScaledCount(density);
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const radius = FIELD_SIZE / 1.6;
  const turns = Math.ceil(Math.sqrt(count) / 2);

  for (let i = 0; i < count; i++) {
    const t = Math.sqrt(i / count) * turns * 2 * Math.PI;
    const r = radius * Math.sqrt(i / count);

    positions[i * 3] = r * Math.cos(t); // x
    positions[i * 3 + 1] = r * Math.sin(t); // y
    positions[i * 3 + 2] = 0; // z
    scales[i] = 1;
  }

  return { positions, scales, count };
};

export const getRandomParticleData = (density: number) => {
  const count = getLogScaledCount(density);
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * FIELD_SIZE;
    positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_SIZE;
    positions[i * 3 + 2] = 0;
    scales[i] = 1;
  }

  return { positions, scales, count };
};
