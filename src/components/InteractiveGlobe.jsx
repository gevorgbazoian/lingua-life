import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Geographic data for cities
const CITIES = [
  { name: "Yerevan", lat: 40.1792, lon: 44.5152, flag: "🇦🇲", desc: "Headquarters / Base" },
  { name: "London", lat: 51.5074, lon: -0.1278, flag: "🇬🇧", desc: "Career & Tech opportunities" },
  { name: "Berlin", lat: 52.5200, lon: 13.4050, flag: "🇩🇪", desc: "Automotive & Innovation research" },
  { name: "Paris", lat: 48.8566, lon: 2.3522, flag: "🇫🇷", desc: "Diplomacy & Fashion elite" },
  { name: "Madrid", lat: 40.4168, lon: -3.7038, flag: "🇪🇸", desc: "Vibrant commerce & tourism links" },
  { name: "Moscow", lat: 55.7558, lon: 37.6173, flag: "🇷🇺", desc: "Trade & Scientific translation" },
  { name: "Rome", lat: 41.9028, lon: 12.4964, flag: "🇮🇹", desc: "Art, architecture, and luxury design" }
];

const GLOBE_RADIUS = 2.0;

// Convert Lat/Lon to 3D Cartesian Coordinate
function latLongToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);
  return new THREE.Vector3(x, y, z);
}

// Generate points for Bezier curve that arches high over the globe
function createCurvePoints(start, end) {
  const points = [];
  const startVec = start.clone();
  const endVec = end.clone();

  // Find midpoint
  const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  const distance = startVec.distanceTo(endVec);

  // Extrude midpoint outwards along its normal vector to create arc
  const normal = midPoint.clone().normalize();
  const arcHeight = distance * 0.45; // height of arch
  midPoint.addScaledVector(normal, arcHeight);

  // Generate Bezier curve coordinates
  const curve = new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec);
  return curve.getPoints(50);
}

// Inner Scene Component for Three.js
function GlobeScene({ activeIndex }) {
  const globeGroupRef = useRef(null);
  const pointsRef = useRef(null);
  const linesGroupRef = useRef(null);
  const [cityData, setCityData] = useState([]);

  // Generate globe dots (Fibonacci sphere distribution)
  useEffect(() => {
    const dotsCount = 1800;
    const positions = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle in radians

    for (let i = 0; i < dotsCount; i++) {
      const y = 1 - (i / (dotsCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY * GLOBE_RADIUS;
      const z = Math.sin(theta) * radiusAtY * GLOBE_RADIUS;
      positions.push(x, y * GLOBE_RADIUS, z * GLOBE_RADIUS);
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
    }

    // Initialize 3D Vector Positions for cities
    const compiled = CITIES.map((c) => {
      const pos = latLongToVector3(c.lat, c.lon, GLOBE_RADIUS);
      return { ...c, pos };
    });
    setCityData(compiled);
  }, []);

  // Animate rotation towards active city or base slow rotation
  useFrame(() => {
    if (globeGroupRef.current) {
      if (activeIndex === 0) {
        // Slow auto-rotate when no city is active
        globeGroupRef.current.rotation.y += 0.002;
        globeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          globeGroupRef.current.rotation.x,
          0.1,
          0.02
        );
      } else {
        // Smoothly rotate globe to face the active target city
        const targetCity = cityData[activeIndex];
        if (targetCity) {
          // Yerevan is targetCity[0]
          // Rotate target to face camera (negative Z axis)
          const targetRotationY = Math.atan2(-targetCity.pos.x, -targetCity.pos.z);
          const targetRotationX = Math.asin(targetCity.pos.y / GLOBE_RADIUS);

          globeGroupRef.current.rotation.y = THREE.MathUtils.lerp(
            globeGroupRef.current.rotation.y,
            targetRotationY,
            0.05
          );
          globeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
            globeGroupRef.current.rotation.x,
            -targetRotationX * 0.8,
            0.05
          );
        }
      }
    }
  });

  const baseCity = cityData[0]; // Yerevan

  return (
    <group ref={globeGroupRef}>
      {/* 1. Dot-Matrix Earth Sphere */}
      <points ref={pointsRef}>
        <bufferGeometry />
        <pointsMaterial
          color="#60a5fa"
          size={0.035}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.35}
        />
      </points>

      {/* 2. Sleek Core wireframe Sphere for depth */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS - 0.02, 32, 32]} />
        <meshBasicMaterial
          color="#05122c"
          transparent={true}
          opacity={0.6}
          wireframe={false}
        />
      </mesh>

      {/* 3. Outer Atmos Glow ring */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
        <meshBasicMaterial
          color="#60a5fa"
          wireframe={true}
          transparent={true}
          opacity={0.05}
        />
      </mesh>

      {/* 4. Yerevan Pin (Base Node) */}
      {baseCity && (
        <mesh position={baseCity.pos}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      )}

      {/* 5. City Pins & Connecting Paths */}
      <group ref={linesGroupRef}>
        {cityData.slice(1).map((city, idx) => {
          const isActive = activeIndex === idx + 1;
          const curvePoints = baseCity ? createCurvePoints(baseCity.pos, city.pos) : [];
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

          return (
            <group key={city.name}>
              {/* Target City Node */}
              <mesh position={city.pos}>
                <sphereGeometry args={[isActive ? 0.08 : 0.04, 16, 16]} />
                <meshBasicMaterial
                  color={isActive ? "#f43f5e" : "#60a5fa"}
                  transparent={true}
                  opacity={isActive ? 1.0 : 0.6}
                />
              </mesh>

              {/* Glowing ring around active city */}
              {isActive && (
                <mesh position={city.pos} scale={[1.5, 1.5, 1.5]}>
                  <sphereGeometry args={[0.08, 16, 16]} />
                  <meshBasicMaterial
                    color="#f43f5e"
                    transparent={true}
                    opacity={0.3}
                    wireframe={true}
                  />
                </mesh>
              )}

              {/* Bezier Path connection */}
              <line geometry={lineGeometry}>
                <lineBasicMaterial
                  color={isActive ? "#f43f5e" : "#60a5fa"}
                  linewidth={isActive ? 3 : 1}
                  transparent={true}
                  opacity={isActive ? 0.9 : 0.15}
                />
              </line>
            </group>
          );
        })}
      </group>
    </group>
  );
}

export default function InteractiveGlobe() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create ScrollTrigger to step through cities
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=3000",
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        // Map progress (0 to 1) to city index (0 to 6)
        const progress = self.progress;
        const totalSteps = CITIES.length;
        const step = Math.min(
          totalSteps - 1,
          Math.floor(progress * totalSteps)
        );
        setActiveIndex(step);
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="globe"
      className="relative min-h-screen bg-bg-dark flex flex-col md:flex-row items-center justify-between overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px]" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose-600/5 blur-[150px]" />

      {/* Left panel: City information and copy */}
      <div className="w-full md:w-5/12 px-8 md:pl-24 z-10 flex flex-col justify-center h-1/2 md:h-full py-16">
        <h2 className="text-xs font-bold tracking-widest text-rose-400 uppercase mb-3 font-display">
          Interactive World
        </h2>
        <h3 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-tight text-white mb-6">
          CONNECTING THE WORLD
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 font-sans">
          Scroll down to see Yerevan connecting dynamically to global capital cities. Languages are the ultimate bridge to international careers, education, and collaboration.
        </p>

        {/* Dynamic Card for active city */}
        <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden transition-all duration-500 shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{CITIES[activeIndex].flag}</span>
            <div>
              <h4 className="text-lg font-bold font-display text-white">
                {CITIES[activeIndex].name}
              </h4>
              <span className="text-[10px] tracking-widest text-blue-400 font-display uppercase">
                {activeIndex === 0 ? "Main Hub" : "Language Link"}
              </span>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed font-sans">
            {CITIES[activeIndex].desc}
          </p>

          {/* Connection Arc Details */}
          {activeIndex > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
              <span className="text-gray-500 font-display uppercase">Route:</span>
              <span className="text-rose-400 font-semibold font-display">
                Yerevan ➔ {CITIES[activeIndex].name}
              </span>
            </div>
          )}
        </div>

        {/* Scroll Progress indicator */}
        <div className="flex items-center gap-2 mt-8">
          {CITIES.map((city, idx) => (
            <div
              key={city.name}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-8 bg-rose-500" : "w-2 bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right panel: R3F Canvas Container */}
      <div className="w-full md:w-7/12 h-[50vh] md:h-screen relative flex items-center justify-center cursor-grab active:cursor-grabbing">
        
        {/* Helper overlay */}
        <div className="absolute top-10 right-10 text-[10px] uppercase font-bold tracking-widest text-gray-500 pointer-events-none border border-white/5 px-3 py-1 rounded bg-black/20">
          Scroll to orbit cities
        </div>

        <Canvas camera={{ position: [0, 0, 4.2], fov: 60 }} dpr={[1, 2]}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 5, 2]} intensity={1.5} />
          <GlobeScene activeIndex={activeIndex} />
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Custom separator line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
