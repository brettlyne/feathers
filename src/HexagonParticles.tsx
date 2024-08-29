import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { AnimationType, animateParticles } from "./util/animations";

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
  animationType: AnimationType;
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
  animationType,
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
  const { viewport } = useThree();
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uSize: { value: particleSize },
    uCenter: { value: new THREE.Vector3(...center) },
    uRippleCenter: { value: new THREE.Vector3(...rippleCenter) },
    uViewport: { value: new THREE.Vector2(viewport.width, viewport.height) },
    uAnimationMagnitude: { value: animationMagnitude },
    uRotation: { value: rotation },
    uColor1: { value: new THREE.Color(color1) },
    uColor2: { value: new THREE.Color(color2) },
    uTexture: { value: particleTexture },
    uInnerRadius: { value: innerRadius },
    uInnerScaling: { value: innerScaling },
    uOuterRadius: { value: outerRadius },
    uOuterScaling: { value: outerScaling },
    uDepthTestOn: { value: depthTestOn },
  });

  const { positions, scales, count, originalPositions } = useMemo(() => {
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
    const originalPositions = new Float32Array(particleData.positions);
    return { ...particleData, originalPositions };
  }, [density, arrangement, zAxisArrangement]);

  useEffect(() => {
    if (points.current) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute(
        "scale",
        new THREE.Float32BufferAttribute(scales, 1)
      );

      points.current.geometry.dispose();
      points.current.geometry = geometry;
    }
  }, [density, arrangement, positions, scales, depthTestOn]);

  useFrame((state) => {
    const { clock } = state;
    uniformsRef.current.uTime.value = clock.getElapsedTime() * animationSpeed;
    uniformsRef.current.uSize.value = particleSize;
    uniformsRef.current.uCenter.value.set(...center);
    uniformsRef.current.uRippleCenter.value.set(...rippleCenter);
    uniformsRef.current.uViewport.value.set(viewport.width, viewport.height);
    uniformsRef.current.uAnimationMagnitude.value = animationMagnitude;
    uniformsRef.current.uRotation.value = rotation;
    uniformsRef.current.uColor1.value.set(color1);
    uniformsRef.current.uColor2.value.set(color2);
    uniformsRef.current.uInnerRadius.value = innerRadius;
    uniformsRef.current.uInnerScaling.value = innerScaling;
    uniformsRef.current.uOuterRadius.value = outerRadius;
    uniformsRef.current.uOuterScaling.value = outerScaling;
    uniformsRef.current.uDepthTestOn.value = depthTestOn;

    if (points.current) {
      const positions = points.current.geometry.attributes.position
        .array as Float32Array;
      animateParticles(
        positions,
        originalPositions,
        clock.getElapsedTime() * animationSpeed,
        animationType,
        uniformsRef.current.uRippleCenter.value,
        animationMagnitude,
        xMagnitude,
        yMagnitude,
        orbitInnerRadius,
        orbitScale
      );
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
          uniform float uTime;
          uniform float uSize;
          uniform vec3 uCenter;
          uniform vec3 uRippleCenter;
          uniform vec2 uViewport;
          uniform float uAnimationMagnitude;
          uniform float uInnerRadius;
          uniform float uInnerScaling;
          uniform float uOuterRadius;
          uniform float uOuterScaling;
          attribute float scale;
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            float dist = distance(pos.xy, uCenter.xy);
            float t = smoothstep(uInnerRadius, uOuterRadius, dist);
            float scaleFactor = mix(uInnerScaling, uOuterScaling, t);

            gl_PointSize = uSize * scale * scaleFactor * (uViewport.y / -mvPosition.z);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform float uRotation;
          uniform sampler2D uTexture;
          varying vec2 vUv;
          
          void main() {
            vec2 uv = gl_PointCoord * 2.0 - 1.0;
            
            // Rotate the UV coordinates
            float s = sin(uRotation);
            float c = cos(uRotation);
            uv = mat2(c, -s, s, c) * uv;
            
            // Convert back to 0-1 range
            uv = uv * 0.5 + 0.5;
            
            vec4 texColor = texture2D(uTexture, uv);
            
            if (texColor.a < 0.1) discard;
            
            vec2 gradientUv = uv;
            float gradientAngle = 3.14159 / 4.0;
            float gradientPos = gradientUv.x * cos(gradientAngle) - gradientUv.y * sin(gradientAngle);
            gradientPos = gradientPos * 0.5 + 0.5;
            
            vec3 color = mix(uColor1, uColor2, gradientPos);
            
            gl_FragColor = vec4(color * texColor.rgb, texColor.a);
          }
        `,
        uniforms: uniformsRef.current,
        transparent: true,
        depthWrite: depthTestOn,
        depthTest: depthTestOn,
        blending: THREE.NormalBlending,
      }),
    [depthTestOn]
  );

  // Update the texture uniform when it changes
  React.useEffect(() => {
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
