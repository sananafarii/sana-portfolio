import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earthRef = useRef();

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  const earth = useGLTF("/planet/scene.gltf");

  return (
    <primitive ref={earthRef} object={earth.scene} scale={2.5} position={[0, 0, 0]} />
  );
};

const EarthCanvas = () => {
  return (
    <div className="canvas-earth">
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <ambientLight intensity={0.35} />
          <directionalLight position={[2, 1, 1]} intensity={1.2} />
          <pointLight position={[-2, -1, -1]} intensity={0.5} color="#e879a0" />
          <Earth />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

useGLTF.preload("/planet/scene.gltf");

export default EarthCanvas;
