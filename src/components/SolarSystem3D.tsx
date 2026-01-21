import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Ring, Html, Stars } from '@react-three/drei';
import { useRef, useState, Suspense } from 'react';
import * as THREE from 'three';
import { Rocket, Info, X } from 'lucide-react';

interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  color: string;
  orbitSpeed: number;
  rotationSpeed: number;
  hasRings?: boolean;
  ringColor?: string;
  moons?: number;
  funFact: string;
  emoji: string;
}

const planetsData: PlanetData[] = [
  { name: 'Mercury', radius: 0.2, distance: 4, color: '#b5b5b5', orbitSpeed: 0.8, rotationSpeed: 0.01, funFact: 'Mercury is the fastest planet, zooming around the Sun in just 88 days!', emoji: '☿️' },
  { name: 'Venus', radius: 0.35, distance: 6, color: '#e6c87a', orbitSpeed: 0.6, rotationSpeed: 0.008, funFact: 'Venus spins backwards! The Sun rises in the west there.', emoji: '♀️' },
  { name: 'Earth', radius: 0.4, distance: 8, color: '#6b93d6', orbitSpeed: 0.5, rotationSpeed: 0.02, moons: 1, funFact: 'Earth is the only planet not named after a god!', emoji: '🌍' },
  { name: 'Mars', radius: 0.25, distance: 10, color: '#c1440e', orbitSpeed: 0.4, rotationSpeed: 0.018, moons: 2, funFact: 'Mars has the tallest volcano in our solar system - Olympus Mons!', emoji: '♂️' },
  { name: 'Jupiter', radius: 1.2, distance: 14, color: '#d8ca9d', orbitSpeed: 0.2, rotationSpeed: 0.04, moons: 95, funFact: 'Jupiter is so big that 1,300 Earths could fit inside it!', emoji: '♃' },
  { name: 'Saturn', radius: 1, distance: 18, color: '#f4d59e', orbitSpeed: 0.15, rotationSpeed: 0.035, hasRings: true, ringColor: '#c9a55a', moons: 146, funFact: 'Saturn would float in water because it\'s less dense than water!', emoji: '🪐' },
  { name: 'Uranus', radius: 0.6, distance: 22, color: '#c9eeff', orbitSpeed: 0.1, rotationSpeed: 0.025, hasRings: true, ringColor: '#8bc9e8', moons: 28, funFact: 'Uranus rotates on its side like a rolling ball!', emoji: '⛢' },
  { name: 'Neptune', radius: 0.55, distance: 26, color: '#5b5ddf', orbitSpeed: 0.08, rotationSpeed: 0.022, moons: 16, funFact: 'Neptune has the strongest winds in the solar system - up to 1,200 mph!', emoji: '♆' },
];

const Sun = ({ onClick }: { onClick: () => void }) => {
  const sunRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={sunRef} onClick={onClick}>
      <Sphere args={[2, 32, 32]}>
        <meshBasicMaterial color="#fdb813" />
      </Sphere>
      <pointLight intensity={2} distance={100} decay={0.5} />
    </mesh>
  );
};

const Planet = ({ data, onClick, isSelected }: { data: PlanetData; onClick: () => void; isSelected: boolean }) => {
  const planetRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (planetRef.current) {
      const t = clock.getElapsedTime() * data.orbitSpeed;
      planetRef.current.position.x = Math.cos(t) * data.distance;
      planetRef.current.position.z = Math.sin(t) * data.distance;
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
        <meshBasicMaterial color="#ffffff" opacity={0.15} transparent side={THREE.DoubleSide} />
      </mesh>
      
      <group ref={planetRef}>
        <mesh 
          ref={meshRef} 
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered || isSelected ? 1.2 : 1}
        >
          <Sphere args={[data.radius, 32, 32]}>
            <meshStandardMaterial 
              color={data.color} 
              emissive={isSelected ? data.color : '#000000'}
              emissiveIntensity={isSelected ? 0.3 : 0}
            />
          </Sphere>
        </mesh>
        
        {/* Saturn-like rings */}
        {data.hasRings && (
          <Ring args={[data.radius * 1.4, data.radius * 2.2, 64]} rotation={[-Math.PI / 2.5, 0, 0]}>
            <meshBasicMaterial color={data.ringColor} opacity={0.7} transparent side={THREE.DoubleSide} />
          </Ring>
        )}
        
        {/* Planet label on hover */}
        {(hovered || isSelected) && (
          <Html distanceFactor={10} position={[0, data.radius + 0.5, 0]}>
            <div className="bg-space-dark/90 px-3 py-1 rounded-full border border-cosmic-purple/50 whitespace-nowrap">
              <span className="text-white text-sm font-fredoka">{data.emoji} {data.name}</span>
            </div>
          </Html>
        )}
      </group>
    </>
  );
};

const Scene = ({ onSelectPlanet, selectedPlanet }: { onSelectPlanet: (planet: PlanetData | null) => void; selectedPlanet: PlanetData | null }) => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <Sun onClick={() => onSelectPlanet(null)} />
      
      {planetsData.map((planet) => (
        <Planet 
          key={planet.name} 
          data={planet} 
          onClick={() => onSelectPlanet(planet)}
          isSelected={selectedPlanet?.name === planet.name}
        />
      ))}
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
        autoRotate={!selectedPlanet}
        autoRotateSpeed={0.3}
      />
    </>
  );
};

const SolarSystem3D = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);

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
            Drag to rotate, scroll to zoom, and click on planets to learn amazing facts!
          </p>
        </div>

        <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden border-2 border-cosmic-purple/30 bg-space-dark/50 backdrop-blur-sm">
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
              </ul>
            </div>
          )}

          {/* Planet info panel */}
          {selectedPlanet && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:top-4 md:bottom-auto z-20 bg-gradient-to-br from-space-dark/95 to-cosmic-purple/20 p-5 rounded-2xl border border-cosmic-purple/40 max-w-sm animate-scale-in backdrop-blur-md">
              <button 
                onClick={() => setSelectedPlanet(null)}
                className="absolute top-2 right-2 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{selectedPlanet.emoji}</span>
                <div>
                  <h3 className="text-2xl font-fredoka font-bold text-white">{selectedPlanet.name}</h3>
                  {selectedPlanet.moons && (
                    <p className="text-cosmic-purple text-sm">🌙 {selectedPlanet.moons} moon{selectedPlanet.moons > 1 ? 's' : ''}</p>
                  )}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/90 text-sm leading-relaxed">
                  💡 <strong>Fun Fact:</strong> {selectedPlanet.funFact}
                </p>
              </div>
            </div>
          )}

          {/* 3D Canvas */}
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white font-fredoka text-xl animate-pulse">
                🌌 Loading Solar System...
              </div>
            </div>
          }>
            <Canvas camera={{ position: [0, 15, 30], fov: 60 }}>
              <Scene onSelectPlanet={setSelectedPlanet} selectedPlanet={selectedPlanet} />
            </Canvas>
          </Suspense>

          {/* Planet quick select */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 flex-wrap justify-center max-w-full px-4">
            {planetsData.map((planet) => (
              <button
                key={planet.name}
                onClick={() => setSelectedPlanet(planet)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all hover:scale-125 ${
                  selectedPlanet?.name === planet.name 
                    ? 'ring-2 ring-white scale-110' 
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: planet.color }}
                title={planet.name}
              >
                <span className="text-xs">{planet.emoji}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarSystem3D;
