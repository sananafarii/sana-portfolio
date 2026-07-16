import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Outlines } from "@react-three/drei";

const SCROLL_ANCHORS = [
  { x: 0.84, y: 0.14 },
  { x: 0.07, y: 0.2 },
  { x: 0.1, y: 0.42 },
  { x: 0.8, y: 0.58 },
  { x: 0.12, y: 0.78 },
  { x: 0.75, y: 0.9 },
];

const lerp = (start, end, amount) => start + (end - start) * amount;

const smoothstep = (value) => value * value * (3 - 2 * value);

const getScrollProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return 0;
  return Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
};

const getAnchorPosition = (progress) => {
  const scaled = progress * (SCROLL_ANCHORS.length - 1);
  const index = Math.min(Math.floor(scaled), SCROLL_ANCHORS.length - 2);
  const fraction = smoothstep(scaled - index);
  const current = SCROLL_ANCHORS[index];
  const next = SCROLL_ANCHORS[index + 1];

  return {
    x: lerp(current.x, next.x, fraction),
    y: lerp(current.y, next.y, fraction),
  };
};

const FIN_ANGLES = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];

const Flame = () => {
  const innerRef = useRef();
  const outerRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const flicker = 1 + Math.sin(t * 14) * 0.1 + Math.sin(t * 21) * 0.06;

    if (innerRef.current) {
      innerRef.current.scale.y = flicker;
    }
    if (outerRef.current) {
      outerRef.current.scale.y = flicker * 0.88;
    }
  });

  return (
    <group position={[0, -1.38, 0]}>
      <mesh ref={outerRef} rotation={[Math.PI, 0, 0]} position={[0, 0.32, 0]}>
        <coneGeometry args={[0.24, 0.6, 10]} />
        <meshStandardMaterial
          color="#fb923c"
          emissive="#f97316"
          emissiveIntensity={0.55}
          transparent
          opacity={0.88}
        />
      </mesh>
      <mesh ref={innerRef} rotation={[Math.PI, 0, 0]} position={[0, 0.22, 0]}>
        <coneGeometry args={[0.13, 0.42, 10]} />
        <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.75} />
      </mesh>
    </group>
  );
};

const Sparkles = () => {
  const groupRef = useRef();
  const positions = [
    [-0.9, 0.8, 0.2],
    [0.85, 1.1, -0.1],
    [-0.6, -0.4, 0.5],
    [0.7, 0.2, -0.4],
    [-0.3, 1.4, -0.3],
    [0.4, -0.9, 0.15],
  ];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((spark, index) => {
      spark.scale.setScalar(0.55 + Math.sin(clock.getElapsedTime() * 3 + index) * 0.25);
    });
  });

  return (
    <group ref={groupRef}>
      {positions.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color="#fde68a" emissive="#fbbf24" emissiveIntensity={0.9} />
        </mesh>
      ))}
    </group>
  );
};

const IllustratedPart = ({ children, color, outline = "#9333ea", ...props }) => (
  <mesh castShadow {...props}>
    {children}
    <meshToonMaterial color={color} />
    <Outlines thickness={0.025} color={outline} />
  </mesh>
);

const CuteRocket = () => {
  const rocketRef = useRef();

  useFrame(({ clock }) => {
    if (rocketRef.current) {
      rocketRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.6) * 0.07;
    }
  });

  return (
    <group ref={rocketRef}>
      <Float speed={1.8} rotationIntensity={0.35} floatIntensity={1.6}>
        <group rotation={[0.12, 0.55, 0.1]}>
          <IllustratedPart color="#faf5ff" position={[0, 1.01, 0]}>
            <coneGeometry args={[0.34, 0.58, 16]} />
          </IllustratedPart>
          <IllustratedPart color="#faf5ff" position={[0, 0, 0]}>
            <cylinderGeometry args={[0.34, 0.38, 1.45, 16]} />
          </IllustratedPart>
          <IllustratedPart color="#c084fc" position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.345, 0.385, 0.28, 16]} />
          </IllustratedPart>
          <IllustratedPart color="#7dd3fc" position={[0, 0.48, 0.34]}>
            <sphereGeometry args={[0.15, 16, 16]} />
          </IllustratedPart>
          <IllustratedPart color="#bae6fd" outline="#38bdf8" position={[0, 0.48, 0.38]}>
            <circleGeometry args={[0.095, 16]} />
          </IllustratedPart>

          {FIN_ANGLES.map((angle, index) => (
            <IllustratedPart
              key={index}
              color="#f0abfc"
              outline="#d946ef"
              position={[Math.sin(angle) * 0.38, -0.38, Math.cos(angle) * 0.38]}
              rotation={[0, -angle, 0]}
            >
              <boxGeometry args={[0.09, 0.38, 0.3]} />
            </IllustratedPart>
          ))}

          <Flame />
          <Sparkles />
        </group>
      </Float>
    </group>
  );
};

const RocketScene = () => (
  <Canvas
    camera={{ position: [0, 0.15, 4.2], fov: 42 }}
    dpr={[1, 2]}
    gl={{ preserveDrawingBuffer: true, alpha: true, antialias: true }}
  >
    <Suspense fallback={null}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 5, 6]} intensity={1.15} />
      <pointLight position={[-3, 2, 3]} color="#c084fc" intensity={0.85} />
      <pointLight position={[2, -1, 2]} color="#fbbf24" intensity={0.35} />
      <CuteRocket />
    </Suspense>
  </Canvas>
);

const FloatingRocket = () => {
  const rocketRef = useRef(null);
  const motionRef = useRef(null);

  useEffect(() => {
    const setTransform = (x, y, rotation) => {
      if (!rocketRef.current) return;
      rocketRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
    };

    const getTarget = (time) => {
      const anchor = getAnchorPosition(getScrollProgress());
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const rocketWidth = rocketRef.current?.offsetWidth ?? 180;
      const rocketHeight = rocketRef.current?.offsetHeight ?? 220;
      const padding = 16;
      const navOffset = 88;

      const orbitX = Math.sin(time * 0.42) * Math.min(viewportWidth * 0.045, 42);
      const orbitY = Math.sin(time * 0.34 + 1.1) * Math.min(viewportHeight * 0.035, 36);
      const targetX = anchor.x * viewportWidth + orbitX;
      const targetY = anchor.y * viewportHeight + orbitY;
      const targetRotation = Math.sin(time * 0.55) * 6 + orbitX * 0.08;

      return {
        x: Math.min(Math.max(targetX, padding), viewportWidth - rocketWidth - padding),
        y: Math.min(Math.max(targetY, navOffset), viewportHeight - rocketHeight - padding),
        rotation: targetRotation,
      };
    };

    const initialTarget = getTarget(0);
    motionRef.current = { ...initialTarget };
    setTransform(initialTarget.x, initialTarget.y, initialTarget.rotation);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    let frameId = 0;

    const animate = (timestamp) => {
      const target = getTarget(timestamp * 0.001);
      const motion = motionRef.current;

      motion.x = lerp(motion.x, target.x, 0.06);
      motion.y = lerp(motion.y, target.y, 0.06);
      motion.rotation = lerp(motion.rotation, target.rotation, 0.08);
      setTransform(motion.x, motion.y, motion.rotation);

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <div ref={rocketRef} className="canvas-rocket floating-rocket" aria-hidden="true">
      <RocketScene />
    </div>
  );
};

export default FloatingRocket;
