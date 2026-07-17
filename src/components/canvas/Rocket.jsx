import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Outlines } from "@react-three/drei";

const HERO_ANCHOR = { x: 0.84, y: 0.14 };

const lerp = (start, end, amount) => start + (end - start) * amount;

const smoothstep = (value) => value * value * (3 - 2 * value);

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getOrbitBounds = () => {
  const orbit = document.querySelector(".tech-orbit");
  if (!orbit) return null;

  const rect = orbit.getBoundingClientRect();
  return {
    top: window.scrollY + rect.top,
    bottom: window.scrollY + rect.bottom,
  };
};

const getPlanetAnchors = () =>
  [...document.querySelectorAll(".tech-orbit__item[data-planet-index]")]
    .sort((a, b) => Number(a.dataset.planetIndex) - Number(b.dataset.planetIndex))
    .map((element) => {
      const planetEl = element.querySelector(".canvas-planet") ?? element;
      const rect = planetEl.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        bottom: rect.bottom,
      };
    });

const getHeroTarget = (rocketWidth, rocketHeight, time) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const padding = 16;
  const navOffset = 88;
  const orbitX = Math.sin(time * 0.42) * Math.min(viewportWidth * 0.045, 42);
  const orbitY = Math.sin(time * 0.34 + 1.1) * Math.min(viewportHeight * 0.035, 36);

  return {
    x: clamp(HERO_ANCHOR.x * viewportWidth + orbitX, padding, viewportWidth - rocketWidth - padding),
    y: clamp(HERO_ANCHOR.y * viewportHeight + orbitY, navOffset, viewportHeight - rocketHeight - padding),
    rotation: Math.sin(time * 0.55) * 6 + orbitX * 0.08,
    scale: 1,
  };
};

const TOUR_SCALE_MIN = 0.18;
const TOUR_SCALE_MAX = 0.28;
const BELOW_PLANET_GAP = 6;

const getPlanetTourTarget = (progress, planetAnchors, rocketWidth, time) => {
  const count = planetAnchors.length;
  if (count === 0) return null;

  const segmentSize = 1 / count;
  const index = Math.min(Math.floor(progress / segmentSize), count - 1);
  const localProgress = (progress - index * segmentSize) / segmentSize;
  const planet = planetAnchors[index];

  const orbitX = Math.sin(time * 0.42) * 4;
  const orbitY = Math.sin(time * 0.34 + 1.1) * 3;

  let scale = TOUR_SCALE_MIN;
  if (localProgress < 0.22) {
    scale = lerp(TOUR_SCALE_MIN, TOUR_SCALE_MAX, smoothstep(localProgress / 0.22));
  } else if (localProgress > 0.78) {
    scale = lerp(TOUR_SCALE_MAX, TOUR_SCALE_MIN, smoothstep((localProgress - 0.78) / 0.22));
  } else {
    scale = TOUR_SCALE_MAX;
  }

  const scaledWidth = rocketWidth * scale;

  return {
    x: planet.x - scaledWidth / 2 + orbitX,
    y: planet.bottom + BELOW_PLANET_GAP + orbitY,
    rotation: Math.sin(time * 0.55) * 2,
    scale,
  };
};

const getRocketTarget = (time, rocketWidth, rocketHeight) => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const hero = { ...getHeroTarget(rocketWidth, rocketHeight, time), inTour: false };
  const orbitBounds = getOrbitBounds();
  const planetAnchors = getPlanetAnchors();

  if (!orbitBounds || planetAnchors.length === 0) {
    return hero;
  }

  const tourStart = orbitBounds.top - viewportHeight * 0.32;
  const tourEnd = orbitBounds.bottom + viewportHeight * 0.12;
  const approachStart = tourStart - viewportHeight * 0.35;

  if (scrollY > tourEnd) {
    return hero;
  }

  if (scrollY >= tourStart) {
    const tourLength = Math.max(tourEnd - tourStart, 1);
    const progress = clamp((scrollY - tourStart) / tourLength, 0, 1);
    const tourTarget = getPlanetTourTarget(progress, planetAnchors, rocketWidth, time);
    if (tourTarget) return { ...tourTarget, inTour: true };
  }

  if (scrollY >= approachStart && scrollY < tourStart) {
    const approachProgress = smoothstep((scrollY - approachStart) / Math.max(tourStart - approachStart, 1));
    const firstPlanet = planetAnchors[0];
    const orbitX = Math.sin(time * 0.42) * 4;
    const orbitY = Math.sin(time * 0.34 + 1.1) * 3;
    const approachScale = TOUR_SCALE_MIN;
    const approachTarget = {
      x: firstPlanet.x - rocketWidth * approachScale / 2 + orbitX,
      y: firstPlanet.bottom + BELOW_PLANET_GAP + orbitY,
      rotation: 0,
      scale: approachScale,
      inTour: true,
    };

    return {
      x: lerp(hero.x, approachTarget.x, approachProgress),
      y: lerp(hero.y, approachTarget.y, approachProgress),
      rotation: lerp(hero.rotation, approachTarget.rotation, approachProgress),
      scale: lerp(hero.scale, approachTarget.scale, approachProgress),
      inTour: approachProgress > 0.4,
    };
  }

  return hero;
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
    const setTransform = (x, y, rotation, scale = 1, inTour = false) => {
      if (!rocketRef.current) return;
      rocketRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;
      rocketRef.current.style.zIndex = inTour ? "1" : "3";
    };

    const getTarget = (time) => {
      const rocketWidth = rocketRef.current?.offsetWidth ?? 180;
      const rocketHeight = rocketRef.current?.offsetHeight ?? 220;
      return getRocketTarget(time, rocketWidth, rocketHeight);
    };

    const initialTarget = getTarget(0);
    motionRef.current = { ...initialTarget };
    setTransform(initialTarget.x, initialTarget.y, initialTarget.rotation, initialTarget.scale, initialTarget.inTour);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    let frameId = 0;

    const animate = (timestamp) => {
      const target = getTarget(timestamp * 0.001);
      const motion = motionRef.current;

      motion.x = lerp(motion.x, target.x, 0.07);
      motion.y = lerp(motion.y, target.y, 0.07);
      motion.rotation = lerp(motion.rotation, target.rotation, 0.08);
      motion.scale = lerp(motion.scale, target.scale, 0.09);
      motion.inTour = target.inTour;
      setTransform(motion.x, motion.y, motion.rotation, motion.scale, motion.inTour);

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
