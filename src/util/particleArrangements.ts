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

export const getGridParticleData = (density: number) => {
  const rawCount = getLogScaledCount(density);
  const cols = Math.ceil(Math.sqrt(rawCount));
  const count = cols * cols;
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const colWidth = FIELD_SIZE / (cols - 1);
  const start = -FIELD_SIZE / 2;

  for (let i = 0; i < count; i++) {
    const x = start + (i % cols) * colWidth;
    const y = start + Math.floor(i / cols) * colWidth;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
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

  const a = 0.1; // controls how tightly wound the spiral is
  const b = 0.2; // controls how quickly the spiral expands

  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 20;
    const r = a + b * t;
    positions[i * 3] = r * Math.cos(t);
    positions[i * 3 + 1] = r * Math.sin(t);
    positions[i * 3 + 2] = 0;
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
