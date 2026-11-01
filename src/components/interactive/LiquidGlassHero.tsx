import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, Lightformer, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

type TransmissionMat = React.ComponentRef<typeof MeshTransmissionMaterial> & { distortion: number };

const Scene = () => {
  const slab = useRef<THREE.Mesh>(null);
  const mat = useRef<TransmissionMat>(null);
  const sheen = useRef<THREE.PointLight>(null);
  const prev = useRef(new THREE.Vector2());
  const art = useLoader(THREE.TextureLoader, '/images/hero-logo.webp');
  art.colorSpace = THREE.SRGBColorSpace;

  useFrame(({ pointer }, dt) => {
    // Pillar 4: cursor velocity drives viscous ripple strength, decaying back to calm
    const velocity = pointer.distanceTo(prev.current) / Math.max(dt, 1e-3);
    prev.current.copy(pointer);
    if (mat.current) {
      mat.current.distortion = THREE.MathUtils.damp(mat.current.distortion, 0.25 + Math.min(velocity, 4) * 0.35, 4, dt);
    }

    // Pillar 2: grazing light orbits the rim at the cursor angle (sin/cos)
    const angle = Math.atan2(pointer.y, pointer.x);
    sheen.current?.position.set(Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 1.2);

    if (slab.current) {
      slab.current.rotation.x = THREE.MathUtils.damp(slab.current.rotation.x, -pointer.y * 0.35, 3, dt);
      slab.current.rotation.y = THREE.MathUtils.damp(slab.current.rotation.y, pointer.x * 0.35, 3, dt);
    }
  });

  return (
    <>
      {/* Backdrop the glass refracts */}
      <mesh position-z={-1.2}>
        <planeGeometry args={[4.4, 4.4]} />
        <meshBasicMaterial map={art} transparent toneMapped={false} />
      </mesh>

      <RoundedBox ref={slab} args={[2.4, 2.4, 0.5]} radius={0.24} smoothness={8}>
        {/* Pillars 1 & 3: thick-lens IOR refraction + RGB dispersion; Fresnel rim is built into the physical shader */}
        <MeshTransmissionMaterial
          ref={mat}
          samples={6}
          resolution={512}
          thickness={0.6}
          ior={1.45}
          chromaticAberration={0.12}
          anisotropicBlur={0.1}
          roughness={0.04}
          distortion={0.25}
          distortionScale={0.4}
          temporalDistortion={0.15}
          clearcoat={1}
          backside
        />
      </RoundedBox>

      <pointLight ref={sheen} intensity={18} color="#fff6ea" />
      {/* Local light rig (no HDR download) for specular reflections */}
      <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 3, 2]} scale={[6, 1, 1]} />
        <Lightformer intensity={2} position={[-3, 0, 1]} scale={[1, 4, 1]} color="#FF7A00" />
        <Lightformer intensity={2} position={[3, 0, 1]} scale={[1, 4, 1]} color="#D81B60" />
      </Environment>
    </>
  );
};

// WebGL can be blocked (Brave Shields, no GPU) — fall back instead of unmounting the whole app
class WebGLBoundary extends React.Component<{ fallback: React.ReactNode; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function LiquidGlassHero({ fallback }: { fallback: React.ReactNode }) {
  return (
    <WebGLBoundary fallback={fallback}>
      {/* ponytail: renders every frame for ripples; add IntersectionObserver -> frameloop="never" if offscreen GPU cost shows up */}
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }} gl={{ alpha: true, antialias: true }} fallback={fallback}>
        <Scene />
      </Canvas>
    </WebGLBoundary>
  );
}
