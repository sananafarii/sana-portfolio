import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const StarField = () => {
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.2 });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points stride={3} positions={sphere} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c084fc"
          size={0.0025}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="canvas-stars" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
