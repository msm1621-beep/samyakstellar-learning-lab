import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Ring, Html, Stars } from '@react-three/drei';
import { useRef, useState, Suspense, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { Rocket, Info, X } from 'lucide-react';
import WebGLBoundary from './WebGLBoundary';

interface MoonData {
  name: string;
  radius: number;
  distance: number;
  color: string;
  orbitSpeed: number;
}

interface CelestialData {
  name: string;
  radius: number;
  distance: number;
  color: string;
  orbitSpeed: number;
  rotationSpeed: number;
  hasRings?: boolean;
  ringColor?: string;
  moons?: number;
  moonData?: MoonData[];
  funFact: string;
  emoji: string;
  type: 'planet' | 'dwarf-planet';
}

const planetsData: CelestialData[] = [
  { name: 'Mercury', radius: 0.2, distance: 4, color: '#b5b5b5', orbitSpeed: 0.8, rotationSpeed: 0.01, funFact: 'Mercury is the fastest planet, zooming around the Sun in just 88 days!', emoji: '☿️', type: 'planet' },
  { name: 'Venus', radius: 0.35, distance: 6, color: '#e6c87a', orbitSpeed: 0.6, rotationSpeed: 0.008, funFact: 'Venus spins backwards! The Sun rises in the west there.', emoji: '♀️', type: 'planet' },
  { 
    name: 'Earth', radius: 0.4, distance: 8, color: '#6b93d6', orbitSpeed: 0.5, rotationSpeed: 0.02, moons: 1, 
    moonData: [{ name: 'Moon', radius: 0.1, distance: 0.8, color: '#c0c0c0', orbitSpeed: 2 }],
    funFact: 'Earth is the only planet not named after a god!', emoji: '🌍', type: 'planet' 
  },
  { 
    name: 'Mars', radius: 0.25, distance: 10, color: '#c1440e', orbitSpeed: 0.4, rotationSpeed: 0.018, moons: 2,
    moonData: [
      { name: 'Phobos', radius: 0.04, distance: 0.5, color: '#8b7355', orbitSpeed: 4 },
      { name: 'Deimos', radius: 0.03, distance: 0.7, color: '#a08060', orbitSpeed: 2.5 },
    ],
    funFact: 'Mars has the tallest volcano in our solar system - Olympus Mons!', emoji: '♂️', type: 'planet' 
  },
  { 
    name: 'Jupiter', radius: 1.2, distance: 16, color: '#d8ca9d', orbitSpeed: 0.2, rotationSpeed: 0.04, moons: 95,
    moonData: [
      { name: 'Io', radius: 0.1, distance: 1.8, color: '#f4d03f', orbitSpeed: 3 },
      { name: 'Europa', radius: 0.09, distance: 2.2, color: '#e8dcc8', orbitSpeed: 2.5 },
      { name: 'Ganymede', radius: 0.15, distance: 2.7, color: '#a89080', orbitSpeed: 2 },
      { name: 'Callisto', radius: 0.13, distance: 3.2, color: '#706050', orbitSpeed: 1.5 },
    ],
    funFact: 'Jupiter is so big that 1,300 Earths could fit inside it!', emoji: '♃', type: 'planet' 
  },
  { 
    name: 'Saturn', radius: 1, distance: 21, color: '#f4d59e', orbitSpeed: 0.15, rotationSpeed: 0.035, hasRings: true, ringColor: '#c9a55a', moons: 146,
    moonData: [
      { name: 'Titan', radius: 0.14, distance: 2, color: '#d4a574', orbitSpeed: 2 },
      { name: 'Rhea', radius: 0.06, distance: 2.5, color: '#c8c8c8', orbitSpeed: 2.5 },
      { name: 'Enceladus', radius: 0.04, distance: 1.5, color: '#ffffff', orbitSpeed: 3.5 },
    ],
    funFact: 'Saturn would float in water because it\'s less dense than water!', emoji: '🪐', type: 'planet' 
  },
  { 
    name: 'Uranus', radius: 0.6, distance: 26, color: '#c9eeff', orbitSpeed: 0.1, rotationSpeed: 0.025, hasRings: true, ringColor: '#8bc9e8', moons: 28,
    moonData: [
      { name: 'Titania', radius: 0.06, distance: 1.2, color: '#b0a090', orbitSpeed: 2.5 },
      { name: 'Oberon', radius: 0.05, distance: 1.5, color: '#908070', orbitSpeed: 2 },
    ],
    funFact: 'Uranus rotates on its side like a rolling ball!', emoji: '⛢', type: 'planet' 
  },
  { 
    name: 'Neptune', radius: 0.55, distance: 31, color: '#5b5ddf', orbitSpeed: 0.08, rotationSpeed: 0.022, moons: 16,
    moonData: [
      { name: 'Triton', radius: 0.08, distance: 1.2, color: '#d0e0f0', orbitSpeed: 2.5 },
    ],
    funFact: 'Neptune has the strongest winds in the solar system - up to 1,200 mph!', emoji: '♆', type: 'planet' 
  },
];

const dwarfPlanetsData: CelestialData[] = [
  { name: 'Ceres', radius: 0.12, distance: 12.5, color: '#8c8c8c', orbitSpeed: 0.35, rotationSpeed: 0.015, funFact: 'Ceres is the largest object in the asteroid belt and has water ice!', emoji: '🪨', type: 'dwarf-planet' },
  { 
    name: 'Pluto', radius: 0.15, distance: 35, color: '#d4a574', orbitSpeed: 0.04, rotationSpeed: 0.01, moons: 5,
    moonData: [
      { name: 'Charon', radius: 0.07, distance: 0.5, color: '#808080', orbitSpeed: 2 },
      { name: 'Nix', radius: 0.02, distance: 0.7, color: '#c0c0c0', orbitSpeed: 3 },
    ],
    funFact: 'Pluto has a heart-shaped glacier made of nitrogen ice!', emoji: '💜', type: 'dwarf-planet' 
  },
  { 
    name: 'Haumea', radius: 0.13, distance: 38, color: '#f5f5f5', orbitSpeed: 0.035, rotationSpeed: 0.05, moons: 2,
    moonData: [
      { name: "Hi'iaka", radius: 0.02, distance: 0.5, color: '#d0d0d0', orbitSpeed: 2.5 },
    ],
    funFact: 'Haumea is shaped like an egg because it spins so fast!', emoji: '🥚', type: 'dwarf-planet' 
  },
  { 
    name: 'Makemake', radius: 0.14, distance: 41, color: '#c4a882', orbitSpeed: 0.03, rotationSpeed: 0.012, moons: 1,
    moonData: [
      { name: 'MK2', radius: 0.02, distance: 0.4, color: '#505050', orbitSpeed: 3 },
    ],
    funFact: 'Makemake is named after the Rapa Nui god of fertility!', emoji: '🗿', type: 'dwarf-planet' 
  },
  { 
    name: 'Eris', radius: 0.16, distance: 45, color: '#e8e8e8', orbitSpeed: 0.025, rotationSpeed: 0.008, moons: 1,
    moonData: [
      { name: 'Dysnomia', radius: 0.03, distance: 0.5, color: '#a0a0a0', orbitSpeed: 2 },
    ],
    funFact: 'Eris is more massive than Pluto and caused Pluto to be reclassified!', emoji: '⚪', type: 'dwarf-planet' 
  },
];

const allCelestialBodies = [...planetsData, ...dwarfPlanetsData];

const Sun = ({ onClick }: { onClick: () => void }) => {
  const sunRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      <mesh ref={sunRef} onClick={onClick}>
        <Sphere args={[2, 32, 32]}>
          <meshBasicMaterial color="#fdb813" />
        </Sphere>
        <pointLight intensity={2} distance={100} decay={0.5} />
      </mesh>
      <Html distanceFactor={15} position={[0, 3, 0]}>
        <div className="bg-orange-500/80 px-2 py-0.5 rounded-full whitespace-nowrap">
          <span className="text-white text-xs font-fredoka font-bold">☀️ Sun</span>
        </div>
      </Html>
    </group>
  );
};

const AsteroidBelt = () => {
  const asteroids = useMemo(() => {
    const items = [];
    for (let i = 0; i < 300; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 12 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 0.8;
      items.push({
        position: [
          Math.cos(angle) * distance,
          height,
          Math.sin(angle) * distance
        ] as [number, number, number],
        size: 0.02 + Math.random() * 0.04,
      });
    }
    return items;
  }, []);

  return (
    <group>
      {/* Belt ring indicator */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[11.8, 14.2, 64]} />
        <meshBasicMaterial color="#8b7355" opacity={0.08} transparent side={THREE.DoubleSide} />
      </mesh>
      
      {asteroids.map((asteroid, i) => (
        <mesh key={i} position={asteroid.position}>
          <dodecahedronGeometry args={[asteroid.size]} />
          <meshStandardMaterial color="#a0937d" roughness={0.9} />
        </mesh>
      ))}
      
      <Html distanceFactor={20} position={[13, 1.5, 0]}>
        <div className="bg-amber-700/70 px-2 py-0.5 rounded-full whitespace-nowrap">
          <span className="text-white text-xs font-fredoka">🪨 Asteroid Belt</span>
        </div>
      </Html>
    </group>
  );
};

const KuiperBelt = () => {
  const objects = useMemo(() => {
    const items = [];
    for (let i = 0; i < 500; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 33 + Math.random() * 15;
      const height = (Math.random() - 0.5) * 2;
      items.push({
        position: [
          Math.cos(angle) * distance,
          height,
          Math.sin(angle) * distance
        ] as [number, number, number],
        size: 0.03 + Math.random() * 0.06,
        color: Math.random() > 0.5 ? '#a8c8dc' : '#d4c4a8',
      });
    }
    return items;
  }, []);

  return (
    <group>
      {/* Belt ring indicator */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[32, 50, 64]} />
        <meshBasicMaterial color="#6b8fa3" opacity={0.05} transparent side={THREE.DoubleSide} />
      </mesh>
      
      {objects.map((obj, i) => (
        <mesh key={i} position={obj.position}>
          <icosahedronGeometry args={[obj.size]} />
          <meshStandardMaterial color={obj.color} roughness={0.85} />
        </mesh>
      ))}
      
      <Html distanceFactor={25} position={[40, 3, 0]}>
        <div className="bg-cyan-700/70 px-2 py-0.5 rounded-full whitespace-nowrap">
          <span className="text-white text-xs font-fredoka">❄️ Kuiper Belt</span>
        </div>
      </Html>
    </group>
  );
};

// Moon component that orbits around a planet
const Moon = ({ moon, parentRef }: { moon: MoonData; parentRef: React.RefObject<THREE.Group> }) => {
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (moonRef.current && parentRef.current) {
      const t = clock.getElapsedTime() * moon.orbitSpeed;
      moonRef.current.position.x = Math.cos(t) * moon.distance;
      moonRef.current.position.z = Math.sin(t) * moon.distance;
      moonRef.current.position.y = Math.sin(t * 0.5) * 0.1; // Slight vertical wobble
    }
  });

  return (
    <mesh ref={moonRef}>
      <Sphere args={[moon.radius, 16, 16]}>
        <meshStandardMaterial color={moon.color} />
      </Sphere>
    </mesh>
  );
};

const CelestialBody = ({ data, onClick, isSelected }: { data: CelestialData; onClick: () => void; isSelected: boolean }) => {
  const bodyRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const isDwarf = data.type === 'dwarf-planet';
  const labelColor = isDwarf ? 'bg-purple-600/80' : 'bg-cosmic-purple/80';

  useFrame(({ clock }) => {
    if (bodyRef.current) {
      const t = clock.getElapsedTime() * data.orbitSpeed;
      bodyRef.current.position.x = Math.cos(t) * data.distance;
      bodyRef.current.position.z = Math.sin(t) * data.distance;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += data.rotationSpeed;
    }
  });

  return (
    <>
      {/* Orbit path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.distance - 0.02, data.distance + 0.02, 64]} />
        <meshBasicMaterial 
          color={isDwarf ? '#9b87f5' : '#ffffff'} 
          opacity={isDwarf ? 0.1 : 0.15} 
          transparent 
          side={THREE.DoubleSide} 
        />
      </mesh>
      
      <group ref={bodyRef}>
        <mesh 
          ref={meshRef} 
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered || isSelected ? 1.3 : 1}
        >
          <Sphere args={[data.radius, 32, 32]}>
            <meshStandardMaterial 
              color={data.color} 
              emissive={isSelected ? data.color : '#000000'}
              emissiveIntensity={isSelected ? 0.4 : 0}
            />
          </Sphere>
        </mesh>
        
        {/* Saturn-like rings */}
        {data.hasRings && (
          <Ring args={[data.radius * 1.4, data.radius * 2.2, 64]} rotation={[-Math.PI / 2.5, 0, 0]}>
            <meshBasicMaterial color={data.ringColor} opacity={0.7} transparent side={THREE.DoubleSide} />
          </Ring>
        )}
        
        {/* Moons orbiting the planet */}
        {data.moonData && data.moonData.map((moon, index) => (
          <Moon key={`${data.name}-moon-${index}`} moon={moon} parentRef={bodyRef} />
        ))}
        
        {/* Always visible label */}
        <Html distanceFactor={12} position={[0, data.radius + 0.6, 0]}>
          <div className={`${labelColor} px-2 py-0.5 rounded-full whitespace-nowrap transition-all ${
            hovered || isSelected ? 'scale-110 ring-2 ring-white/50' : ''
          }`}>
            <span className="text-white text-xs font-fredoka">{data.emoji} {data.name}</span>
            {isDwarf && <span className="text-white/70 text-[10px] ml-1">(dwarf)</span>}
            {data.moonData && data.moonData.length > 0 && (
              <span className="text-white/60 text-[10px] ml-1">🌙{data.moons}</span>
            )}
          </div>
        </Html>
      </group>
    </>
  );
};

const Scene = ({ onSelectBody, selectedBody }: { onSelectBody: (body: CelestialData | null) => void; selectedBody: CelestialData | null }) => {
  return (
    <>
      <ambientLight intensity={0.15} />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <Sun onClick={() => onSelectBody(null)} />
      <AsteroidBelt />
      <KuiperBelt />
      
      {allCelestialBodies.map((body) => (
        <CelestialBody 
          key={body.name} 
          data={body} 
          onClick={() => onSelectBody(body)}
          isSelected={selectedBody?.name === body.name}
        />
      ))}
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={80}
        autoRotate={!selectedBody}
        autoRotateSpeed={0.3}
      />
    </>
  );
};

const SolarSystem3D = () => {
  const [selectedBody, setSelectedBody] = useState<CelestialData | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '100px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="solar-system-3d" className="py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cosmic-purple/20 to-nebula-pink/20 px-4 py-2 rounded-full mb-4">
            <Rocket className="w-5 h-5 text-cosmic-purple" />
            <span className="text-cosmic-purple font-semibold">Interactive Experience</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-fredoka font-bold text-white mb-4">
            🚀 Explore Our Solar System in 3D!
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Drag to rotate, scroll to zoom, and click on planets to learn amazing facts! Now with asteroid belt, Kuiper belt, and dwarf planets!
          </p>
        </div>

        <div ref={containerRef} className="relative h-[500px] md:h-[650px] rounded-3xl overflow-hidden border-2 border-cosmic-purple/30 bg-space-dark/50 backdrop-blur-sm">
          {/* Instructions overlay */}
          {showInstructions && (
            <div className="absolute top-4 left-4 z-20 bg-space-dark/90 p-4 rounded-xl border border-cosmic-purple/30 max-w-xs animate-fade-in">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-fredoka font-bold flex items-center gap-2">
                  <Info className="w-4 h-4 text-cosmic-purple" /> How to Explore
                </h3>
                <button 
                  onClick={() => setShowInstructions(false)}
                  className="text-white/50 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ul className="text-white/70 text-sm space-y-1">
                <li>🖱️ <strong>Drag</strong> to rotate the view</li>
                <li>🔍 <strong>Scroll</strong> to zoom in/out</li>
                <li>👆 <strong>Click</strong> a planet to learn about it</li>
                <li>🪨 <strong>Zoom out</strong> to see the Kuiper Belt!</li>
              </ul>
            </div>
          )}

          {/* Body info panel */}
          {selectedBody && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:top-4 md:bottom-auto z-20 bg-gradient-to-br from-space-dark/95 to-cosmic-purple/20 p-5 rounded-2xl border border-cosmic-purple/40 max-w-sm animate-scale-in backdrop-blur-md">
              <button 
                onClick={() => setSelectedBody(null)}
                className="absolute top-2 right-2 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{selectedBody.emoji}</span>
                <div>
                  <h3 className="text-2xl font-fredoka font-bold text-white">{selectedBody.name}</h3>
                  <div className="flex items-center gap-2">
                    {selectedBody.type === 'dwarf-planet' && (
                      <span className="text-purple-400 text-xs bg-purple-500/20 px-2 py-0.5 rounded-full">Dwarf Planet</span>
                    )}
                    {selectedBody.moons && (
                      <span className="text-cosmic-purple text-sm">🌙 {selectedBody.moons} moon{selectedBody.moons > 1 ? 's' : ''}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/90 text-sm leading-relaxed">
                  💡 <strong>Fun Fact:</strong> {selectedBody.funFact}
                </p>
              </div>
            </div>
          )}

          {/* 3D Canvas — only mounted when in view to avoid WebGL context exhaustion */}
          {inView ? (
            <WebGLBoundary>
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white font-fredoka text-xl animate-pulse">
                    🌌 Loading Solar System...
                  </div>
                </div>
              }>
                <Canvas
                  camera={{ position: [0, 20, 40], fov: 60 }}
                  dpr={[1, 1.5]}
                  gl={{ antialias: false, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false }}
                  onCreated={({ gl }) => {
                    gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault());
                  }}
                >
                  <Scene onSelectBody={setSelectedBody} selectedBody={selectedBody} />
                </Canvas>
              </Suspense>
            </WebGLBoundary>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white font-fredoka text-xl animate-pulse">
                🌌 Scroll to load Solar System...
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="absolute top-4 right-4 z-20 bg-space-dark/80 p-3 rounded-xl border border-cosmic-purple/20">
            <div className="text-white/80 text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cosmic-purple"></div>
                <span>Planets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                <span>Dwarf Planets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-700"></div>
                <span>Asteroid Belt</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-700"></div>
                <span>Kuiper Belt</span>
              </div>
            </div>
          </div>

          {/* Quick select buttons */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 flex-wrap justify-center max-w-full px-4">
            {allCelestialBodies.map((body) => (
              <button
                key={body.name}
                onClick={() => setSelectedBody(body)}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all hover:scale-125 ${
                  selectedBody?.name === body.name 
                    ? 'ring-2 ring-white scale-110' 
                    : 'opacity-70 hover:opacity-100'
                } ${body.type === 'dwarf-planet' ? 'ring-1 ring-purple-400/50' : ''}`}
                style={{ backgroundColor: body.color }}
                title={`${body.name}${body.type === 'dwarf-planet' ? ' (Dwarf Planet)' : ''}`}
              >
                <span className="text-[10px]">{body.emoji}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarSystem3D;
