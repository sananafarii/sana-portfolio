import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";

const PLANET_VARIANTS = [
  { atmosphere: "#61dafb", surface: "#0891b2", emissive: "#22d3ee", ring: false, ringColor: null },
  { atmosphere: "#cbd5e1", surface: "#475569", emissive: "#f1f5f9", ring: false, ringColor: null },
  { atmosphere: "#3b82f6", surface: "#1e40af", emissive: "#60a5fa", ring: true, ringColor: "#93c5fd" },
  { atmosphere: "#c084fc", surface: "#6d28d9", emissive: "#a78bfa", ring: true, ringColor: "#ddd6fe" },
  { atmosphere: "#38bdf8", surface: "#0369a1", emissive: "#7dd3fc", ring: false, ringColor: null },
  { atmosphere: "#4ade80", surface: "#166534", emissive: "#86efac", ring: true, ringColor: "#bbf7d0" },
];

const PlanetMesh = ({ imgUrl, color, index = 0 }) => {
  const groupRef = useRef();
  const variant = PLANET_VARIANTS[index % PLANET_VARIANTS.length];
  const [decal] = useTexture([imgUrl]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={1.1}>
        <mesh scale={1.18}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={variant.atmosphere}
            transparent
            opacity={0.22}
            depthWrite={false}
          />
        </mesh>

        <mesh castShadow receiveShadow scale={2.1}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color={color || variant.surface}
            emissive={variant.emissive}
            emissiveIntensity={0.18}
            roughness={0.65}
            metalness={0.12}
          />
          <Decal position={[0, 0.15, 0.98]} rotation={[0, 0, 0]} scale={0.5} map={decal} />
        </mesh>

        {variant.ring && (
          <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
            <torusGeometry args={[2.65, 0.1, 16, 64]} />
            <meshStandardMaterial
              color={variant.ringColor || variant.atmosphere}
              transparent
              opacity={0.55}
              side={2}
            />
          </mesh>
        )}
      </Float>
    </group>
  );
};

const PlanetCanvas = ({ icon, color = "#c084fc", index = 0 }) => {
  return (
    <div className="canvas-planet">
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        camera={{ position: [0, 0, 5.5], fov: 42 }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 3, 5]} intensity={1.15} />
          <pointLight position={[-3, -2, 4]} color={color} intensity={0.55} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.7} />
          <PlanetMesh imgUrl={icon} color={color} index={index} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default PlanetCanvas;
