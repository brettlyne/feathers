import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AnimationMode } from "./util/shaderAnimations";
import {
  getAnimationShaderChunk,
  getAnimationMainCode,
} from "./util/shaderAnimations";
import { getColorShaderChunk, ColorMode } from "./util/shaderColors";

import {
  getGridParticleData,
  getCircularParticleData,
  getSpiralParticleData,
  getRandomParticleData,
  getStaggeredGridParticleData,
  getHexParticleData,
} from "./util/particleArrangements";

interface HexagonParticlesProps {
  density: number;
  arrangement:
    | "grid"
    | "staggeredGrid"
    | "circular"
    | "spiral"
    | "random"
    | "hexagon";
  zAxisArrangement: "flat" | "dome" | "wavy" | "valley" | "cone" | "random";
  particleSize: number;
  center: [number, number, number];
  rippleCenter: [number, number, number];
  animationMagnitude: number;
  rotation: number;
  color1: string;
  color2: string;
  particleTexture: THREE.Texture | null;
  animationMode: AnimationMode;
  colorMode: ColorMode;
  innerRadius: number;
  innerScaling: number;
  outerRadius: number;
  outerScaling: number;
  animationSpeed: number;
  xMagnitude: number;
  yMagnitude: number;
  orbitInnerRadius: number;
  orbitScale: number;
  depthTestOn: boolean;
}

const HexagonParticles: React.FC<HexagonParticlesProps> = ({
  density,
  arrangement,
  zAxisArrangement,
  particleSize,
  center,
  rippleCenter,
  animationMagnitude,
  rotation,
  color1,
  color2,
  particleTexture,
  animationMode,
  colorMode,
  innerRadius,
  innerScaling,
  outerRadius,
  outerScaling,
  animationSpeed,
  xMagnitude,
  yMagnitude,
  orbitInnerRadius,
  orbitScale,
  depthTestOn,
}) => {
  const points = useRef<THREE.Points>(null);
  const [resetFlag, setResetFlag] = useState(0);

  const uniformsRef = useRef({
    uTime: { value: 0 },
    uSize: { value: particleSize },
    uCenter: { value: new THREE.Vector3(...center) },
    uRippleCenter: { value: new THREE.Vector3(...rippleCenter) },
    uAnimationMagnitude: { value: animationMagnitude },
    uRotation: { value: rotation },
    uColor1: { value: new THREE.Color(color1) },
    uColor2: { value: new THREE.Color(color2) },
    uTexture: { value: particleTexture },
    uInnerRadius: { value: innerRadius },
    uInnerScaling: { value: innerScaling },
    uOuterRadius: { value: outerRadius },
    uOuterScaling: { value: outerScaling },
    uXMagnitude: { value: xMagnitude },
    uYMagnitude: { value: yMagnitude },
    uOrbitInnerRadius: { value: orbitInnerRadius },
    uOrbitScale: { value: orbitScale },
    uResetFlag: { value: 0 },
  });

  const { positions, scales, count } = useMemo(() => {
    let particleData;
    switch (arrangement) {
      case "circular":
        particleData = getCircularParticleData(density, zAxisArrangement);
        break;
      case "spiral":
        particleData = getSpiralParticleData(density, zAxisArrangement);
        break;
      case "random":
        particleData = getRandomParticleData(density, zAxisArrangement);
        break;
      case "staggeredGrid":
        particleData = getStaggeredGridParticleData(density, zAxisArrangement);
        break;
      case "hexagon":
        particleData = getHexParticleData(density, zAxisArrangement);
        break;
      default:
        particleData = getGridParticleData(density, zAxisArrangement);
    }
    setResetFlag((prev) => prev + 1);
    return particleData;
  }, [density, arrangement, zAxisArrangement]);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
          uniform float uTime;
          uniform float uSize;
          uniform vec3 uCenter;
          uniform vec3 uRippleCenter;
          uniform float uAnimationMagnitude;
          uniform float uInnerRadius;
          uniform float uInnerScaling;
          uniform float uOuterRadius;
          uniform float uOuterScaling;
          uniform float uXMagnitude;
          uniform float uYMagnitude;
          uniform float uOrbitInnerRadius;
          uniform float uOrbitScale;
          uniform float uResetFlag;
          attribute float scale;
          varying vec2 vUv;
          varying vec3 vPosition;
          varying float dist;

          ${getAnimationShaderChunk(animationMode, positions.length / 3)}

          void main() {
            vUv = uv;
            vec3 pos = position;

            ${getAnimationMainCode(animationMode)}

            vPosition = pos;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            dist = distance(pos.xy, uCenter.xy);
            float t = smoothstep(uInnerRadius, uOuterRadius, dist);
            float scaleFactor = mix(uInnerScaling, uOuterScaling, t);

            gl_PointSize = uSize * scale * scaleFactor * (10. / -mvPosition.z);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform float uRotation;
          uniform sampler2D uTexture;
          uniform float uInnerRadius;
          uniform float uOuterRadius;
          varying vec2 vUv;
          varying vec3 vPosition;
          varying float dist;

          ${getColorShaderChunk(colorMode)}

          void main() {
            vec2 uv = gl_PointCoord * 2.0 - 1.0;
            float s = sin(uRotation);
            float c = cos(uRotation);
            uv = mat2(c, -s, s, c) * uv;
            uv = uv * 0.5 + 0.5;
            vec4 texColor = texture2D(uTexture, uv);
            if (texColor.a < 0.1) discard;
            
            vec3 color = getColor(vPosition, uv);
            gl_FragColor = vec4(color * texColor.rgb, texColor.a);
          }
        `,
        uniforms: uniformsRef.current,
        transparent: true,
        depthWrite: depthTestOn,
        depthTest: depthTestOn,
        blending: THREE.NormalBlending,
      }),
    [animationMode, colorMode, depthTestOn, positions.length]
  );

  useEffect(() => {
    if (points.current) {
      const geometry = points.current.geometry as THREE.BufferGeometry;
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute(
        "scale",
        new THREE.Float32BufferAttribute(scales, 1)
      );
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.scale.needsUpdate = true;
    }
  }, [positions, scales]);

  useFrame((state) => {
    const { clock } = state;
    uniformsRef.current.uTime.value = clock.getElapsedTime() * animationSpeed;
    uniformsRef.current.uSize.value = particleSize;
    uniformsRef.current.uCenter.value.set(...center);
    uniformsRef.current.uRippleCenter.value.set(...rippleCenter);
    uniformsRef.current.uAnimationMagnitude.value = animationMagnitude;
    uniformsRef.current.uRotation.value = rotation;
    uniformsRef.current.uColor1.value.set(color1);
    uniformsRef.current.uColor2.value.set(color2);
    uniformsRef.current.uInnerRadius.value = innerRadius;
    uniformsRef.current.uInnerScaling.value = innerScaling;
    uniformsRef.current.uOuterRadius.value = outerRadius;
    uniformsRef.current.uOuterScaling.value = outerScaling;
    uniformsRef.current.uXMagnitude.value = xMagnitude;
    uniformsRef.current.uYMagnitude.value = yMagnitude;
    uniformsRef.current.uOrbitInnerRadius.value = orbitInnerRadius;
    uniformsRef.current.uOrbitScale.value = orbitScale;
    uniformsRef.current.uResetFlag.value = resetFlag;

    if (resetFlag !== 0) {
      setResetFlag(0);
    }
  });

  useEffect(() => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.uTexture.value = particleTexture;
    }
  }, [particleTexture, shaderMaterial]);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={count}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} attach="material" />
    </points>
  );
};

export default HexagonParticles;
