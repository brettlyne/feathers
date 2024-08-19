import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const FIELD_SIZE = 8; // centered on the origin

interface HexagonParticlesProps {
  particleSize: number;
  center: [number, number, number];
  animationMagnitude: number;
  rotation: number;
  color1: string;
  color2: string;
  centerScaling: number;
  scaleX: number;
  scaleY: number;
  particleTexture: THREE.Texture | null;
}

const HexagonParticles: React.FC<HexagonParticlesProps> = ({
  particleSize,
  center,
  animationMagnitude,
  rotation,
  color1,
  color2,
  centerScaling,
  scaleX,
  scaleY,
  particleTexture,
}) => {
  const points = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uSize: { value: particleSize },
    uCenter: { value: new THREE.Vector3(...center) },
    uViewport: { value: new THREE.Vector2(viewport.width, viewport.height) },
    uAnimationMagnitude: { value: animationMagnitude },
    uRotation: { value: rotation },
    uColor1: { value: new THREE.Color(color1) },
    uColor2: { value: new THREE.Color(color2) },
    uCenterScaling: { value: centerScaling },
    uScaleX: { value: scaleX },
    uScaleY: { value: scaleY },
    uTexture: { value: particleTexture },
  });

  const [positions, scales] = useMemo(() => {
    const count = 10000;
    const cols = Math.ceil(Math.sqrt(count));

    const positions = new Float32Array(cols * cols * 3);
    const scales = new Float32Array(cols * cols);
    const colWidth = FIELD_SIZE / (cols - 1);
    const start = -FIELD_SIZE / 2;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < cols; j++) {
        const x = start + i * colWidth;
        const y = start + j * colWidth;
        const index = i * cols + j;
        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = 0;
        scales[index] = 1;
      }
    }

    return [positions, scales];
  }, []);

  useFrame((state) => {
    const { clock } = state;
    uniformsRef.current.uTime.value = clock.getElapsedTime();
    uniformsRef.current.uSize.value = particleSize;
    uniformsRef.current.uCenter.value.set(...center);
    uniformsRef.current.uViewport.value.set(viewport.width, viewport.height);
    uniformsRef.current.uAnimationMagnitude.value = animationMagnitude;
    uniformsRef.current.uRotation.value = rotation;
    uniformsRef.current.uColor1.value.set(color1);
    uniformsRef.current.uColor2.value.set(color2);
    uniformsRef.current.uCenterScaling.value = centerScaling;
    uniformsRef.current.uScaleX.value = scaleX;
    uniformsRef.current.uScaleY.value = scaleY;

    if (points.current) {
      const positions = points.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const dist = Math.sqrt((x - center[0]) ** 2 + (y - center[1]) ** 2);
        positions[i + 2] =
          Math.sin(dist * 0.5 - clock.elapsedTime * 2.0) * animationMagnitude;
      }
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
          uniform vec2 uViewport;
          uniform float uAnimationMagnitude;
          uniform float uCenterScaling;
          uniform float uScaleX;
          uniform float uScaleY;
          attribute float scale;
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            float dist = distance(pos.xy, uCenter.xy);
            float scaleFactor = 1.0 - (1.0 - uCenterScaling) * (1.0 - smoothstep(0.0, 50.0, dist));
            gl_PointSize = uSize * scale * scaleFactor * (uViewport.y / -mvPosition.z);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform float uRotation;
          uniform float uScaleX;
          uniform float uScaleY;
          uniform sampler2D uTexture;
          varying vec2 vUv;
          
          void main() {
            vec2 uv = gl_PointCoord * 2.0 - 1.0;
            
            // Apply scaling to UV coordinates
            uv.x *= uScaleX;
            uv.y *= uScaleY;
            
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
        depthWrite: true,
        depthTest: true,
      }),
    []
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
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} attach="material" />
    </points>
  );
};

export default HexagonParticles;
