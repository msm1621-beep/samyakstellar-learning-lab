import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Ring, Sphere, Stars } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Crosshair, Info, RotateCcw, Rocket, Telescope, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WebGLGuard } from './WebGLBoundary';
import { distantSpaceObjects, type DistantSpaceObject } from '@/data/distantSpaceObjects';
import { nearbyStarSystems, type NearbyPlanetData, type NearbyStarSystemData, type StarCompanionData } from '@/data/nearbyStarSystems';

interface MoonData {
  name: string;
  radius: number;
  distance: number;
  color: string;
  orbitSpeed: number;
  funFact: string;
}

type BodyKind = 'planet' | 'dwarf-planet' | 'comet' | 'asteroid';
interface CelestialData {
  name: string;
  radius: number;
  distance: number;
  color: string;
  orbitSpeed: number;
  rotationSpeed: number;
  hasRings?: boolean;
  ringColor?: string;
  moonData?: MoonData[];
  funFact: string;
  emoji: string;
  kind: BodyKind;
  eccentricity?: number;
  inclination?: number;
  orbitPeriod?: string;
}

interface SelectedInfo {
  name: string;
  emoji: string;
  category: string;
  fact: string;
  detail: string;
  focus: [number, number, number];
}

const moon = (name: string, radius: number, distance: number, color: string, orbitSpeed: number, funFact: string): MoonData => ({ name, radius, distance, color, orbitSpeed, funFact });

const planetsData: CelestialData[] = [
  { name: 'Mercury', radius: 0.2, distance: 4, color: '#b5b5b5', orbitSpeed: 0.8, rotationSpeed: 0.01, funFact: 'Mercury is the fastest planet, completing an orbit in just 88 Earth days.', emoji: '☿️', kind: 'planet' },
  { name: 'Venus', radius: 0.35, distance: 6, color: '#e6c87a', orbitSpeed: 0.6, rotationSpeed: 0.008, funFact: 'Venus rotates backwards compared with most planets, so its Sun rises in the west.', emoji: '♀️', kind: 'planet' },
  { name: 'Earth', radius: 0.4, distance: 8, color: '#6b93d6', orbitSpeed: 0.5, rotationSpeed: 0.02, moonData: [moon('Moon (Luna)', 0.11, 0.85, '#c0c0c0', 2, 'Earth’s only natural satellite helps drive ocean tides and is the first world beyond Earth visited by people.')], funFact: 'Earth is the only known world with life on its surface and abundant liquid water.', emoji: '🌍', kind: 'planet' },
  { name: 'Mars', radius: 0.25, distance: 10, color: '#c1440e', orbitSpeed: 0.4, rotationSpeed: 0.018, moonData: [
    moon('Phobos', 0.07, 0.58, '#8b7355', 4, 'Phobos is slowly spiraling toward Mars and may break apart in the distant future.'),
    moon('Deimos', 0.055, 0.9, '#a08060', 2.5, 'Deimos is the smaller, more distant of Mars’s two moons.'),
  ], funFact: 'Mars is home to Olympus Mons, the tallest known volcano in the Solar System.', emoji: '♂️', kind: 'planet' },
  { name: 'Jupiter', radius: 1.2, distance: 16, color: '#d8ca9d', orbitSpeed: 0.2, rotationSpeed: 0.04, moonData: [
    moon('Io', 0.11, 1.65, '#f4d03f', 3, 'Io is the most volcanically active world known, powered by tidal heating.'), moon('Europa', 0.1, 2.0, '#e8dcc8', 2.7, 'Europa’s icy crust covers a global ocean that may contain more water than Earth’s oceans.'), moon('Ganymede', 0.15, 2.35, '#a89080', 2.2, 'Ganymede is the largest moon in the Solar System and has its own magnetic field.'), moon('Callisto', 0.13, 2.75, '#706050', 1.8, 'Callisto’s ancient, heavily cratered surface records billions of years of impacts.'), moon('Amalthea', 0.075, 3.15, '#bd6b42', 1.5, 'Amalthea is a small, irregular moon orbiting close to Jupiter.'), moon('Himalia', 0.07, 3.55, '#98816c', 1.3, 'Himalia is the largest member of Jupiter’s outer Himalia group.'), moon('Elara', 0.055, 3.95, '#a48a78', 1.1, 'Elara is a small irregular outer moon of Jupiter.'), moon('Pasiphae', 0.05, 4.35, '#806d60', 0.95, 'Pasiphae travels in a distant, retrograde orbit around Jupiter.'), moon('Sinope', 0.045, 4.75, '#997c68', 0.82, 'Sinope follows a far-out retrograde orbit around Jupiter.'), moon('Lysithea', 0.045, 5.15, '#ad9581', 0.7, 'Lysithea is a small irregular moon in Jupiter’s outer satellite system.'),
  ], funFact: 'Jupiter is the largest planet; its Great Red Spot is a long-lived giant storm.', emoji: '♃', kind: 'planet' },
  { name: 'Saturn', radius: 1, distance: 21, color: '#f4d59e', orbitSpeed: 0.15, rotationSpeed: 0.035, hasRings: true, ringColor: '#c9a55a', moonData: [
    moon('Titan', 0.14, 1.55, '#d4a574', 2.8, 'Titan has lakes and seas of liquid methane and a thick nitrogen-rich atmosphere.'), moon('Enceladus', 0.07, 1.9, '#ffffff', 2.5, 'Enceladus sprays water-rich plumes into space from a hidden subsurface ocean.'), moon('Mimas', 0.06, 2.25, '#c8c8c8', 2.2, 'A huge impact crater gives Mimas a resemblance to the fictional Death Star.'), moon('Tethys', 0.07, 2.6, '#d0d0d0', 2, 'Tethys has a giant canyon system and a vast impact basin.'), moon('Dione', 0.08, 2.95, '#c9c9c9', 1.8, 'Dione has bright wispy cliffs made of exposed ice.'), moon('Rhea', 0.09, 3.3, '#c8c8c8', 1.65, 'Rhea is Saturn’s second-largest moon and is mostly made of water ice.'), moon('Iapetus', 0.08, 3.65, '#a89080', 1.5, 'Iapetus has one bright hemisphere and one very dark hemisphere.'), moon('Hyperion', 0.05, 4, '#b49a78', 1.35, 'Hyperion’s irregular shape and porous surface make it tumble chaotically.'), moon('Phoebe', 0.05, 4.35, '#796d60', 1.2, 'Phoebe travels backwards around Saturn and may be a captured object.'), moon('Epimetheus', 0.04, 4.7, '#c0b6a7', 1.05, 'Epimetheus shares a closely related orbit with Janus; the two moons exchange orbital tracks.'), moon('Janus', 0.05, 5.05, '#b8aa98', 0.95, 'Janus shares a co-orbital path with Epimetheus.'), moon('Helene', 0.035, 5.4, '#d2c5b4', 0.85, 'Helene is a small moon that travels near the same orbit as Dione.'), moon('Telesto', 0.035, 5.75, '#ded4c2', 0.75, 'Telesto is a small Trojan moon sharing Tethys’s orbit.'), moon('Calypso', 0.03, 6.1, '#d8d0c0', 0.68, 'Calypso is another small Trojan companion of Tethys.'), moon('Atlas', 0.035, 6.45, '#c8ad8e', 0.6, 'Atlas is a small moon that helps shape the edge of Saturn’s A ring.'),
  ], funFact: 'Saturn’s bright rings are made mostly of countless pieces of water ice and rock.', emoji: '🪐', kind: 'planet' },
  { name: 'Uranus', radius: 0.6, distance: 26, color: '#7dd9dc', orbitSpeed: 0.1, rotationSpeed: 0.025, hasRings: true, ringColor: '#8bc9e8', moonData: [
    moon('Miranda', 0.06, 1.2, '#b0a090', 2.8, 'Miranda has enormous cliffs and patchwork terrain, likely shaped by ancient upheaval.'), moon('Ariel', 0.07, 1.6, '#d0c8bc', 2.45, 'Ariel has a young-looking surface marked by long valleys and fault canyons.'), moon('Umbriel', 0.07, 2.0, '#807a74', 2.1, 'Umbriel is one of Uranus’s darkest large moons.'), moon('Titania', 0.09, 2.4, '#b0a090', 1.8, 'Titania is the largest moon of Uranus.'), moon('Oberon', 0.08, 2.8, '#908070', 1.55, 'Oberon is a distant, cratered moon with possible signs of past geology.'), moon('Puck', 0.045, 3.2, '#a49a8a', 1.3, 'Puck is a small inner moon discovered by Voyager 2.'), moon('Belinda', 0.035, 3.6, '#c2b8aa', 1.1, 'Belinda is a small inner moon of Uranus, found in Voyager images.'),
  ], funFact: 'Uranus rotates on its side, giving it some of the most extreme seasons in the Solar System.', emoji: '⛢', kind: 'planet' },
  { name: 'Neptune', radius: 0.55, distance: 31, color: '#4b78df', orbitSpeed: 0.08, rotationSpeed: 0.022, moonData: [
    moon('Triton', 0.09, 1.25, '#d0e0f0', 2.6, 'Triton orbits Neptune backwards and may be a captured Kuiper Belt object.'), moon('Proteus', 0.06, 1.7, '#a4a0a0', 2.2, 'Proteus is Neptune’s largest inner moon and has a heavily cratered surface.'), moon('Nereid', 0.05, 2.15, '#b0b0b0', 1.8, 'Nereid follows one of the most elongated orbits of any known moon.'), moon('Larissa', 0.04, 2.6, '#b9b2a8', 1.45, 'Larissa is a small inner moon named after a nymph from Greek mythology.'),
  ], funFact: 'Neptune is a distant ice giant with supersonic winds and deep blue clouds.', emoji: '♆', kind: 'planet' },
];

const dwarfPlanetsData: CelestialData[] = [
  { name: 'Ceres', radius: 0.14, distance: 12.4, color: '#929292', orbitSpeed: 0.34, rotationSpeed: 0.015, funFact: 'Ceres is the largest object in the asteroid belt and has bright salt deposits inside Occator Crater.', emoji: '🪨', kind: 'dwarf-planet', orbitPeriod: '4.6 years' },
  { name: 'Pluto', radius: 0.16, distance: 35, color: '#d4a574', orbitSpeed: 0.04, rotationSpeed: 0.01, moonData: [moon('Charon', 0.08, 0.55, '#808080', 2, 'Charon is so large compared with Pluto that the pair orbit a point in space between them.'), moon('Hydra', 0.04, 0.82, '#c0c0c0', 1.5, 'Hydra is a small, irregular outer moon of Pluto.')], funFact: 'Pluto has a heart-shaped region called Tombaugh Regio, including a nitrogen-ice plain.', emoji: '💜', kind: 'dwarf-planet', orbitPeriod: '248 years' },
  { name: 'Haumea', radius: 0.13, distance: 38, color: '#f5f5f5', orbitSpeed: 0.035, rotationSpeed: 0.05, moonData: [moon("Hi'iaka", 0.03, 0.55, '#d0d0d0', 2.5, "Hi'iaka is the larger outer moon of the rapidly spinning dwarf planet Haumea."), moon('Namaka', 0.025, 0.82, '#bcbcbc', 2, 'Namaka is Haumea’s smaller inner moon.')], funFact: 'Haumea spins so quickly that it is stretched into an unusually elongated shape.', emoji: '🥚', kind: 'dwarf-planet', orbitPeriod: '284 years' },
  { name: 'Makemake', radius: 0.14, distance: 41, color: '#c4a882', orbitSpeed: 0.03, rotationSpeed: 0.012, moonData: [moon('MK2 (S/2015)', 0.03, 0.55, '#505050', 2.2, 'Makemake’s small, dark companion is informally nicknamed MK2.')], funFact: 'Makemake is a distant dwarf planet named for a creator deity from Rapa Nui tradition.', emoji: '🗿', kind: 'dwarf-planet', orbitPeriod: '306 years' },
  { name: 'Eris', radius: 0.16, distance: 45, color: '#e8e8e8', orbitSpeed: 0.025, rotationSpeed: 0.008, moonData: [moon('Dysnomia', 0.04, 0.58, '#a0a0a0', 1.8, 'Dysnomia is the known moon of Eris and helps astronomers estimate Eris’s mass.')], funFact: 'Eris is a massive distant dwarf planet whose discovery helped spark the debate that redefined planets.', emoji: '⚪', kind: 'dwarf-planet', orbitPeriod: 'about 558 years' },
  { name: 'Sedna', radius: 0.12, distance: 56, color: '#bd755b', orbitSpeed: 0.018, rotationSpeed: 0.009, funFact: 'Sedna travels on an extraordinarily long, elongated orbit far beyond Neptune; one orbit takes roughly 11,000 years.', emoji: '🔴', kind: 'dwarf-planet', eccentricity: 0.3, inclination: 0.12, orbitPeriod: 'about 11,000 years' },
];

const minorBodiesData: CelestialData[] = [
  { name: "Halley's Comet", radius: 0.14, distance: 28, color: '#bde7f1', orbitSpeed: 0.09, rotationSpeed: 0.02, funFact: "Halley's Comet returns to the inner Solar System about every 76 years. ESA's Giotto spacecraft flew past its nucleus in 1986.", emoji: '☄️', kind: 'comet', eccentricity: 0.44, inclination: 0.16, orbitPeriod: 'about 76 years' },
  { name: 'Comet Hale–Bopp', radius: 0.19, distance: 34, color: '#c9efff', orbitSpeed: 0.045, rotationSpeed: 0.015, funFact: 'Hale–Bopp was exceptionally bright in 1997 and has an orbital period of roughly 2,500 years.', emoji: '☄️', kind: 'comet', eccentricity: 0.4, inclination: 0.12, orbitPeriod: 'about 2,500 years' },
  { name: 'Comet Tsuchinshan–ATLAS', radius: 0.16, distance: 38, color: '#9de8df', orbitSpeed: 0.035, rotationSpeed: 0.015, funFact: 'Comet C/2023 A3 (Tsuchinshan–ATLAS) became a prominent naked-eye comet in 2024.', emoji: '☄️', kind: 'comet', eccentricity: 0.38, inclination: 0.18, orbitPeriod: 'very long-period' },
  { name: "Devil's Comet (12P/Pons–Brooks)", radius: 0.15, distance: 25, color: '#b9d7ff', orbitSpeed: 0.07, rotationSpeed: 0.018, funFact: '12P/Pons–Brooks is a periodic comet whose outbursts can make its coma appear to grow dramatically.', emoji: '☄️', kind: 'comet', eccentricity: 0.32, inclination: 0.2, orbitPeriod: 'about 71 years' },
  { name: 'Comet 67P/Churyumov–Gerasimenko', radius: 0.13, distance: 30, color: '#d8cdbb', orbitSpeed: 0.055, rotationSpeed: 0.025, funFact: 'ESA’s Rosetta mission orbited Comet 67P and delivered the Philae lander to its surface.', emoji: '☄️', kind: 'comet', eccentricity: 0.27, inclination: 0.09, orbitPeriod: 'about 6.4 years' },
  { name: 'Bennu', radius: 0.09, distance: 12.1, color: '#9c9386', orbitSpeed: 0.36, rotationSpeed: 0.04, funFact: 'NASA’s OSIRIS-REx returned a sample from asteroid Bennu to Earth in 2023.', emoji: '🪨', kind: 'asteroid', eccentricity: 0.17, inclination: 0.05, orbitPeriod: 'about 1.2 years' },
  { name: 'Vesta', radius: 0.15, distance: 13.2, color: '#b3a89b', orbitSpeed: 0.31, rotationSpeed: 0.025, funFact: 'Vesta is one of the largest asteroids; NASA’s Dawn spacecraft studied it before visiting Ceres.', emoji: '🪨', kind: 'asteroid', eccentricity: 0.08, inclination: 0.07, orbitPeriod: '3.6 years' },
  { name: 'Pallas', radius: 0.12, distance: 13.8, color: '#a79b8c', orbitSpeed: 0.28, rotationSpeed: 0.02, funFact: 'Pallas is a large asteroid with an unusually tilted orbit through the asteroid belt.', emoji: '🪨', kind: 'asteroid', eccentricity: 0.13, inclination: 0.22, orbitPeriod: '4.6 years' },
  { name: 'Hygiea', radius: 0.12, distance: 14, color: '#908b83', orbitSpeed: 0.26, rotationSpeed: 0.02, funFact: 'Hygiea is one of the largest objects in the main asteroid belt and is nearly spherical.', emoji: '🪨', kind: 'asteroid', orbitPeriod: '5.6 years' },
  { name: 'Apophis', radius: 0.09, distance: 7, color: '#baaa96', orbitSpeed: 0.54, rotationSpeed: 0.03, funFact: 'Apophis is a near-Earth asteroid that will pass close to Earth in 2029. It poses no known impact threat for at least the next century.', emoji: '🪨', kind: 'asteroid', eccentricity: 0.16, orbitPeriod: '0.9 years' },
  { name: 'Eros', radius: 0.11, distance: 10.8, color: '#b79a7c', orbitSpeed: 0.38, rotationSpeed: 0.03, funFact: 'Eros was the first asteroid orbited and landed on by a spacecraft, NASA’s NEAR Shoemaker.', emoji: '🪨', kind: 'asteroid', eccentricity: 0.2, orbitPeriod: '1.8 years' },
  { name: 'Itokawa', radius: 0.09, distance: 9, color: '#aea393', orbitSpeed: 0.43, rotationSpeed: 0.03, funFact: 'Itokawa is a rubble-pile asteroid. Japan’s Hayabusa mission returned tiny samples to Earth in 2010.', emoji: '🪨', kind: 'asteroid', eccentricity: 0.15, orbitPeriod: '1.5 years' },
];

const allCelestialBodies = [...planetsData, ...dwarfPlanetsData, ...minorBodiesData];

const starSystems: NearbyStarSystemData[] = nearbyStarSystems;

const infoForBody = (body: CelestialData): SelectedInfo => ({
  name: body.name,
  emoji: body.emoji,
  category: body.kind === 'dwarf-planet' ? 'Dwarf planet' : body.kind === 'asteroid' ? 'Asteroid' : body.kind === 'comet' ? 'Comet' : 'Planet',
  fact: body.funFact,
  detail: [body.orbitPeriod ? `Illustrated orbit period: ${body.orbitPeriod}` : '', body.moonData?.length ? `${body.moonData.length} featured moon${body.moonData.length === 1 ? '' : 's'} shown` : ''].filter(Boolean).join(' · ') || 'Select a moon or keep exploring the scene.',
  focus: [body.distance, 0, 0],
});

const infoForStar = (star: NearbyStarSystemData, companion?: StarCompanionData): SelectedInfo => ({
  name: companion?.name ?? star.name,
  emoji: star.category === 'Brown dwarf' ? '🟤' : star.distantShowcase ? '✦' : '⭐',
  category: companion ? `${companion.spectral} companion` : `${star.category ?? 'Star'} · ${star.spectral}`,
  fact: companion?.fact ?? star.fact,
  detail: `${star.distantShowcase ? 'Distant showcase' : `${star.distanceLy} light-years from the Sun`} · ${companion?.spectral ?? star.spectral}. Nearby-star positions and companion paths are schematic.`,
  focus: star.position,
});

const seededShell = (count: number, minRadius: number, maxRadius: number, seedOffset = 0) => Array.from({ length: count }, (_, i) => {
  const seed = i + seedOffset;
  const y = 1 - 2 * ((seed * 0.61803398875) % 1);
  const angle = seed * 2.399963229728653;
  const radial = Math.sqrt(1 - y * y);
  const r = minRadius + ((seed * 0.754877666) % 1) * (maxRadius - minRadius);
  return { position: [Math.cos(angle) * radial * r, y * r, Math.sin(angle) * radial * r] as [number, number, number], size: 0.035 + ((seed * 0.324717957) % 1) * 0.075 };
});

function InstancedBelt({ count, inner, outer, color, seedOffset = 0, label, labelPosition, shape = 'rock' }: { count: number; inner: number; outer: number; color: string; seedOffset?: number; label: string; labelPosition: [number, number, number]; shape?: 'rock' | 'ice' }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(() => seededShell(count, inner, outer, seedOffset).map((item, i) => {
    const angle = (i * 2.3999632297 + seedOffset) % (Math.PI * 2);
    const distance = inner + ((i * 0.6180339887) % 1) * (outer - inner);
    return { ...item, position: [Math.cos(angle) * distance, item.position[1] * 0.018 * distance, Math.sin(angle) * distance] as [number, number, number], size: 0.025 + (i % 7) * 0.006, shade: 0.72 + (i % 5) * 0.07 };
  }), [count, inner, outer, seedOffset]);
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    const base = new THREE.Color(color);
    items.forEach((item, index) => {
      dummy.position.set(...item.position);
      dummy.rotation.set(index * 0.17, index * 0.31, index * 0.11);
      dummy.scale.setScalar(item.size);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
      mesh.setColorAt(index, base.clone().multiplyScalar(item.shade));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [color, items]);
  return <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[inner, outer, 96]} />
      <meshBasicMaterial color={color} opacity={0.08} transparent side={THREE.DoubleSide} />
    </mesh>
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {shape === 'ice' ? <icosahedronGeometry args={[1, 0]} /> : <dodecahedronGeometry args={[1, 0]} />}
      <meshStandardMaterial color={color} roughness={0.9} />
    </instancedMesh>
    <Html distanceFactor={22} position={labelPosition}>
      <span className="rounded-full border border-border bg-card/90 px-2 py-1 text-xs text-card-foreground whitespace-nowrap">{label}</span>
    </Html>
  </group>;
}

function OortCloud() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(() => seededShell(340, 91, 111, 814), []);
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    const pale = new THREE.Color('#92c8dd');
    items.forEach((item, index) => {
      dummy.position.set(...item.position);
      dummy.scale.setScalar(item.size * 0.72);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
      mesh.setColorAt(index, pale.clone().multiplyScalar(0.65 + (index % 6) * 0.07));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [items]);
  return <group>
    <mesh>
      <sphereGeometry args={[99, 28, 18]} />
      <meshBasicMaterial color="#80bbd4" wireframe transparent opacity={0.065} />
    </mesh>
    <instancedMesh ref={meshRef} args={[undefined, undefined, items.length]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#92c8dd" roughness={1} />
    </instancedMesh>
    <Html distanceFactor={45} position={[0, 103, 0]}>
      <span className="rounded-full border border-border bg-card/85 px-3 py-1.5 text-xs font-semibold text-card-foreground whitespace-nowrap">Oort Cloud · schematic outer boundary</span>
    </Html>
  </group>;
}

function Sun({ onClick }: { onClick: () => void }) {
  const sunRef = useRef<THREE.Mesh>(null);
  useFrame((_, rawDelta) => {
    if (sunRef.current) sunRef.current.rotation.y += Math.min(rawDelta, 0.05) * 0.28;
  });
  return <group>
    <mesh ref={sunRef} onClick={onClick} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }}>
      <Sphere args={[2, 32, 32]}><meshBasicMaterial color="#fdb813" /></Sphere>
      <pointLight intensity={2.4} distance={160} decay={0.7} />
    </mesh>
    <StarGlow tint="#fdb813" size={9} />
    <Html distanceFactor={15} position={[0, 3, 0]}>
      <span className="rounded-full border border-border bg-card/85 px-2 py-1 text-xs font-bold text-card-foreground whitespace-nowrap">☀️ Sun</span>
    </Html>
  </group>;
}

function Moon({ moon: moonData, parentRef, onSelect }: { moon: MoonData; parentRef: React.RefObject<THREE.Group>; onSelect: () => void }) {
  const moonRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!moonRef.current || !parentRef.current) return;
    const t = clock.getElapsedTime() * moonData.orbitSpeed;
    moonRef.current.position.set(Math.cos(t) * moonData.distance, Math.sin(t * 0.5) * 0.08, Math.sin(t) * moonData.distance);
  });
  return <mesh ref={moonRef} onClick={(event) => { event.stopPropagation(); onSelect(); }} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }}>
    <Sphere args={[moonData.radius, 14, 14]}><meshStandardMaterial color={moonData.color} roughness={0.86} /></Sphere>
  </mesh>;
}

function CometTail({ direction, length, radius }: { direction: THREE.Vector3; length: number; radius: number }) {
  const rotation = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction), [direction]);
  return <mesh position={direction.clone().multiplyScalar(length * 0.48)} quaternion={rotation}>
    <coneGeometry args={[radius, length, 10, 1, true]} />
    <meshBasicMaterial color="#a9e9ed" transparent opacity={0.45} side={THREE.DoubleSide} depthWrite={false} />
  </mesh>;
}

function CelestialBody({ data, onSelect, isSelected }: { data: CelestialData; onSelect: (info: SelectedInfo) => void; isSelected: boolean }) {
  const bodyRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const isComet = data.kind === 'comet';
  const eccentricity = data.eccentricity ?? 0.02;
  const orbitGeometry = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, data.distance * (1 + eccentricity), data.distance * (1 - eccentricity), 0, Math.PI * 2, false, 0);
    const points = curve.getPoints(120).map((point) => new THREE.Vector3(point.x, point.x * (data.inclination ?? 0), point.y));
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [data.distance, eccentricity, data.inclination]);
  useEffect(() => () => orbitGeometry.dispose(), [orbitGeometry]);
  useFrame(({ clock }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (bodyRef.current) {
      const t = clock.getElapsedTime() * data.orbitSpeed;
      const a = data.distance * (1 + eccentricity);
      const b = data.distance * (1 - eccentricity);
      bodyRef.current.position.set(Math.cos(t) * a, Math.sin(t) * a * (data.inclination ?? 0), Math.sin(t) * b);
    }
    if (meshRef.current) meshRef.current.rotation.y += delta * data.rotationSpeed;
  });
  const localDirection = useMemo(() => new THREE.Vector3(data.distance, 0, 0).normalize(), [data.distance]);
  const info = infoForBody(data);
  return <>
    <primitive object={new THREE.Line(orbitGeometry, new THREE.LineBasicMaterial({ color: data.kind === 'dwarf-planet' ? '#a78bca' : isComet ? '#9ddce4' : '#9eb4c4', transparent: true, opacity: isComet ? 0.2 : 0.11 }))} />
    <group ref={bodyRef}>
      <mesh ref={meshRef} onClick={(event) => { event.stopPropagation(); onSelect(info); }} onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { setHovered(false); document.body.style.cursor = ''; }} scale={hovered || isSelected ? 1.28 : 1}>
        <Sphere args={[data.radius, 24, 20]}>
          <meshStandardMaterial color={data.color} roughness={0.8} emissive={isSelected ? data.color : '#000000'} emissiveIntensity={isSelected ? 0.28 : 0} />
        </Sphere>
      </mesh>
      {isComet && <CometTail direction={localDirection} length={Math.max(1.6, data.radius * 13)} radius={data.radius * 1.8} />}
      {data.hasRings && <Ring args={[data.radius * 1.4, data.radius * 2.2, 48]} rotation={[-Math.PI / 2.5, 0, 0]}><meshBasicMaterial color={data.ringColor} opacity={0.68} transparent side={THREE.DoubleSide} /></Ring>}
      {data.moonData?.map((moonData) => <Moon key={`${data.name}-${moonData.name}`} moon={moonData} parentRef={bodyRef} onSelect={() => onSelect({ name: moonData.name, emoji: '🌙', category: `Moon of ${data.name}`, fact: moonData.funFact, detail: `Shown as one of ${data.moonData?.length ?? 0} featured moons in this schematic viewer.`, focus: [data.distance, 0, 0] })} />)}
      <Html distanceFactor={14} position={[0, data.radius + 0.58, 0]}>
        <span className={`rounded-full border px-2 py-0.5 text-xs whitespace-nowrap transition-all ${isSelected || hovered ? 'border-primary/50 bg-card text-card-foreground' : 'border-border bg-card/80 text-card-foreground'}`}>
          {data.emoji} {data.name}{data.moonData?.length ? <span className="ml-1 opacity-70">· {data.moonData.length} moons</span> : null}
        </span>
      </Html>
    </group>
  </>;
}

function NearbyPlanetNode({ planet: planetData, onSelect, isSelected }: { planet: NearbyPlanetData; onSelect: (info: SelectedInfo) => void; isSelected: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useFrame(({ clock }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (ref.current) {
      const angle = clock.getElapsedTime() * planetData.orbitSpeed;
      ref.current.position.set(Math.cos(angle) * planetData.orbitRadius, Math.sin(angle * 0.4) * 0.12, Math.sin(angle) * planetData.orbitRadius);
      ref.current.rotation.y += delta * 0.2;
    }
  });
  const info: SelectedInfo = { name: planetData.name, emoji: '🪐', category: 'Exoplanet', fact: planetData.fact, detail: 'Schematic mini-orbit around its host star; discovery and orbital values are simplified for learning.', focus: [0, 0, 0] };
  return <mesh ref={ref} onClick={(event) => { event.stopPropagation(); onSelect(info); }} onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { setHovered(false); document.body.style.cursor = ''; }} scale={isSelected || hovered ? 1.45 : 1}>
    <Sphere args={[planetData.radius, 10, 8]}><meshStandardMaterial color={planetData.color} roughness={0.9} /></Sphere>
  </mesh>;
}

function StarSystemNode({ star, onSelect, isSelected }: { star: NearbyStarSystemData; onSelect: (info: SelectedInfo) => void; isSelected: boolean }) {
  const companionsRef = useRef<(THREE.Mesh | null)[]>([]);
  const hostRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useFrame(({ clock }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (hostRef.current) hostRef.current.rotation.y += delta * 0.1;
    star.companions?.forEach((companion, index) => {
      const mesh = companionsRef.current[index];
      if (!mesh) return;
      const angle = clock.getElapsedTime() * companion.orbitSpeed + index * Math.PI;
      mesh.position.set(Math.cos(angle) * companion.orbitRadius, Math.sin(angle * 0.4) * 0.18, Math.sin(angle) * companion.orbitRadius);
    });
  });
  return <group position={star.position}>
    {star.companions?.map((companion) => <mesh key={`${star.name}-${companion.name}`} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[companion.orbitRadius - 0.035, companion.orbitRadius + 0.035, 64]} />
      <meshBasicMaterial color={star.color} transparent opacity={0.32} side={THREE.DoubleSide} />
    </mesh>)}
    <mesh ref={hostRef} onClick={(event) => { event.stopPropagation(); onSelect(infoForStar(star)); }} onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { setHovered(false); document.body.style.cursor = ''; }} scale={isSelected || hovered ? 1.2 : 1}>
      <Sphere args={[star.radius, 20, 16]}><meshBasicMaterial color={star.color} /></Sphere>
      <pointLight intensity={star.distantShowcase ? 0.45 : 0.18} distance={star.distantShowcase ? 26 : 14} decay={2} color={star.color} />
    </mesh>
    <StarGlow tint={star.color} size={star.radius * 5.2} />
    {star.companions?.map((companion, index) => <mesh key={companion.name} ref={(mesh) => { companionsRef.current[index] = mesh; }} onClick={(event) => { event.stopPropagation(); onSelect(infoForStar(star, companion)); }} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }}>
      <Sphere args={[companion.radius, 18, 14]}><meshBasicMaterial color={companion.color} /></Sphere>
      <StarGlow tint={companion.color} size={companion.radius * 4.6} />
    </mesh>)}
    {star.planets?.map((planetData) => <NearbyPlanetNode key={planetData.name} planet={planetData} onSelect={(info) => onSelect({ ...info, focus: star.position })} isSelected={isSelected} />)}
    <Html distanceFactor={46} position={[0, star.radius + 1.2, 0]}>
      <span className="rounded-full border border-border bg-card/85 px-2 py-0.5 text-[11px] text-card-foreground whitespace-nowrap">{star.distantShowcase ? '✦ distant showcase' : `${star.category === 'Brown dwarf' ? '🟤' : '⭐'} ${star.name.replace(/ A$/, '')}`}</span>
    </Html>
  </group>;
}

const infoForDistant = (object: DistantSpaceObject): SelectedInfo => ({
  name: object.name, emoji: object.kind === 'Black hole' ? '⚫' : object.kind === 'Star' ? '⭐' : '✦',
  category: object.kind, fact: object.fact,
  detail: `${object.distanceLy === null ? 'Distance uncertain' : `Approximately ${object.distanceLy.toLocaleString()} light-years from Earth`} · Schematic position and size.`,
  focus: object.position,
});

function SoftGalaxy({ object, onSelect }: { object: DistantSpaceObject; onSelect: (info: SelectedInfo) => void }) {
  const ref = useRef<THREE.Mesh>(null);
  const spiral = object.name.includes('Andromeda');
  const uniforms = useMemo(() => ({
    tint: { value: new THREE.Color(object.color) },
    spiral: { value: spiral ? 1 : 0 },
  }), [object.color, spiral]);
  useFrame(({ camera }) => { ref.current?.quaternion.copy(camera.quaternion); });
  return <mesh ref={ref} onClick={(event) => { event.stopPropagation(); onSelect(infoForDistant(object)); }}
    onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }}>
    <planeGeometry args={[spiral ? 32 : 24, spiral ? 32 : 24]} />
    <shaderMaterial transparent depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} uniforms={uniforms}
      vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
      fragmentShader={`
        varying vec2 vUv; uniform vec3 tint; uniform float spiral;
        void main() {
          vec2 p = (vUv - 0.5) * 2.0;
          p = mat2(0.92, -0.39, 0.39, 0.92) * p;
          p.y *= mix(1.2, 2.15, spiral);
          float r = length(p);
          float angle = atan(p.y, p.x);
          float halo = exp(-r * r * 5.5);
          float core = exp(-r * r * 60.0);
          float arms = 0.5 + 0.5 * sin(angle * 2.0 - r * 14.0);
          float clouds = 0.65 + 0.18 * sin(p.x * 14.0 + p.y * 9.0) + 0.17 * cos(p.y * 19.0 - p.x * 7.0);
          float light = halo * mix(clouds, 0.35 + arms * 0.45, spiral) + core * mix(0.12, 0.5, spiral);
          float edge = 1.0 - smoothstep(0.65, 1.0, r);
          gl_FragColor = vec4(mix(tint, vec3(1.0), core * 0.45), light * edge * 0.8);
        }
      `} />
  </mesh>;
}

function StarGlow({ tint, size }: { tint: string; size: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({ colorA: { value: new THREE.Color(tint) }, uTime: { value: 0 } }), [tint]);
  useFrame(({ clock, camera }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    ref.current?.quaternion.copy(camera.quaternion);
  });
  return <mesh ref={ref} raycast={() => null}>
    <planeGeometry args={[size, size]} />
    <shaderMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending} uniforms={uniforms}
      vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
      fragmentShader={`
        varying vec2 vUv; uniform vec3 colorA; uniform float uTime;
        void main() {
          vec2 p = (vUv - 0.5) * 2.0;
          float r = length(p);
          float core = exp(-r * r * 14.0);
          float halo = exp(-r * 3.2) * 0.55;
          float spikes = (exp(-abs(p.x) * 26.0) + exp(-abs(p.y) * 26.0)) * exp(-r * 2.4) * 0.4;
          float twinkle = 0.88 + 0.12 * sin(uTime * 2.4 + p.x * 3.0);
          float a = clamp((core + halo + spikes) * twinkle, 0.0, 1.0);
          gl_FragColor = vec4(mix(colorA, vec3(1.0), core * 0.65), a);
        }
      `} />
  </mesh>;
}

function NebulaBillboard({ object, onSelect }: { object: DistantSpaceObject; onSelect: (info: SelectedInfo) => void }) {
  const ref = useRef<THREE.Mesh>(null);
  const ring = object.name.includes('Ring') || object.name.includes('Helix');
  const uniforms = useMemo(() => ({
    colorA: { value: new THREE.Color(object.color) },
    colorB: { value: new THREE.Color(object.color).offsetHSL(0.48, -0.08, 0.14) },
    uTime: { value: 0 },
    uRing: { value: ring ? 1 : 0 },
  }), [object.color, ring]);
  useFrame(({ clock, camera }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    ref.current?.quaternion.copy(camera.quaternion);
  });
  const size = ring ? 14 : 16;
  return <mesh ref={ref} onClick={(event) => { event.stopPropagation(); onSelect(infoForDistant(object)); }}
    onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }}>
    <planeGeometry args={[size, size]} />
    <shaderMaterial transparent depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} uniforms={uniforms}
      vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
      fragmentShader={`
        varying vec2 vUv; uniform vec3 colorA; uniform vec3 colorB; uniform float uTime; uniform float uRing;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float vnoise(vec2 p) {
          vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
        }
        float fbm(vec2 p) {
          float value = 0.0; float amp = 0.55;
          for (int k = 0; k < 4; k++) { value += amp * vnoise(p); p *= 2.05; amp *= 0.55; }
          return value;
        }
        void main() {
          vec2 p = (vUv - 0.5) * 2.0;
          float r = length(p);
          float wisp = fbm(p * 2.3 + vec2(uTime * 0.03, -uTime * 0.02));
          float wisp2 = fbm(p * 4.1 - vec2(uTime * 0.02, uTime * 0.025) + wisp);
          float density;
          if (uRing > 0.5) {
            float ringBand = exp(-pow((r - 0.52) * 5.5, 2.0));
            float filaments = 0.55 + 0.45 * sin(atan(p.y, p.x) * 9.0 + wisp * 6.0);
            density = ringBand * (0.45 + 0.55 * filaments) + exp(-r * r * 26.0) * 0.35;
          } else {
            density = pow(max(wisp * 0.7 + wisp2 * 0.55 - 0.18, 0.0), 1.4) + exp(-r * r * 9.0) * 0.5;
          }
          float edge = 1.0 - smoothstep(0.72, 1.0, r);
          float bright = smoothstep(0.12, 0.75, density) * edge;
          vec3 col = mix(colorA, colorB, clamp(wisp2, 0.0, 1.0));
          gl_FragColor = vec4(col + vec3(1.0) * smoothstep(0.55, 1.0, density) * 0.35, bright * 0.85);
        }
      `} />
  </mesh>;
}

function DistantObjectNode({ object, onSelect }: { object: DistantSpaceObject; onSelect: (info: SelectedInfo) => void }) {
  const cloud = object.kind === 'Nebula' || object.kind === 'Supernova remnant';
  const cluster = object.kind === 'Star cluster';
  const particles = useMemo(() => {
    const items = seededShell(cluster ? 65 : 220, cluster ? 1 : 2, cluster ? 5 : 8);
    return new Float32Array(items.flatMap((item) => item.position));
  }, [cluster]);
  return <group position={object.position}>
    {object.kind === 'Galaxy' && <SoftGalaxy object={object} onSelect={onSelect} />}
    <mesh onClick={(event) => { event.stopPropagation(); onSelect(infoForDistant(object)); }} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }}>
      <sphereGeometry args={[cloud ? 5 : cluster ? 4 : object.kind === 'Black hole' ? 1.6 : 1.1, 24, 16]} />
      <meshBasicMaterial color={object.color} transparent={cloud || cluster || object.kind === 'Black hole' || object.kind === 'Galaxy'} opacity={object.kind === 'Galaxy' ? 0 : cloud ? 0.05 : cluster ? 0.04 : object.kind === 'Black hole' ? 0.05 : 1} depthWrite={!cloud && !cluster && object.kind !== 'Galaxy'} />
    </mesh>
    {cloud && <NebulaBillboard object={object} onSelect={onSelect} />}
    {cluster && <points>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[particles, 3]} /></bufferGeometry>
      <pointsMaterial color={object.color} size={0.22} transparent opacity={0.9} depthWrite={false} />
    </points>}
    {(object.kind === 'Star' || object.kind === 'Pulsar' || object.kind === 'Neutron star') && <StarGlow tint={object.color} size={object.kind === 'Star' ? 4.4 : 2.6} />}
    {(object.kind === 'Black hole' || object.name.includes('Helix') || object.name.includes('Ring')) && <Ring args={[2, 3.5, 64]} rotation={[0.4, 0.2, 0]}><meshBasicMaterial color={object.color} transparent opacity={0.7} side={THREE.DoubleSide} /></Ring>}
    {(object.kind === 'Pulsar' || object.kind === 'Neutron star') && <mesh rotation={[0, 0, 0.4]}><cylinderGeometry args={[0.07, 0.07, 7, 8]} /><meshBasicMaterial color={object.color} transparent opacity={0.4} /></mesh>}
    <Html distanceFactor={48} position={[0, object.kind === 'Galaxy' ? 13 : cloud || cluster ? 9 : 3, 0]}><span className="whitespace-nowrap rounded border border-border bg-card/85 px-2 py-1 text-xs text-card-foreground">{object.name}</span></Html>
  </group>;
}

function Scene({ onSelect, selectedInfo, alignmentView, focusTarget, resetKey }: { onSelect: (info: SelectedInfo | null) => void; selectedInfo: SelectedInfo | null; alignmentView: boolean; focusTarget: [number, number, number] | null; resetKey: number }) {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls || !focusTarget) return;
    controls.target.set(...focusTarget);
    const viewOffset = alignmentView ? new THREE.Vector3(-7, 0.75, 0) : new THREE.Vector3(0, 11, 23);
    const position = new THREE.Vector3(...focusTarget).add(viewOffset);
    controls.object.position.copy(position);
    controls.update();
  }, [focusTarget, alignmentView]);
  useEffect(() => {
    if (resetKey === 0) return;
    const controls = controlsRef.current;
    if (!controls) return;
    controls.target.set(0, 0, 0);
    controls.object.position.set(0, 20, 40);
    controls.update();
  }, [resetKey]);
  useFrame((state, rawDelta) => {
    if (!alignmentView) return;
    const controls = controlsRef.current;
    if (!controls) return;
    const delta = Math.min(rawDelta, 0.05);
    const target = new THREE.Vector3(8, 0, 0);
    const position = new THREE.Vector3(1.2, 0.65, 0);
    controls.target.lerp(target, 1 - Math.exp(-3.5 * delta));
    state.camera.position.lerp(position, 1 - Math.exp(-3.5 * delta));
    controls.update();
  });
  return <>
    <ambientLight intensity={0.38} />
    <Stars radius={700} depth={180} count={2500} factor={4} saturation={0.15} fade speed={0.35} />
    <Sun onClick={() => onSelect({ name: 'Sun', emoji: '☀️', category: 'Star', fact: 'The Sun is the star at the centre of our Solar System. Its gravity holds the planets, comets, and asteroids in orbit.', detail: 'The scene uses compressed distances and sizes to keep the planetary system visible.', focus: [0, 0, 0] })} />
    <InstancedBelt count={230} inner={11.8} outer={14.2} color="#927d64" label="Asteroid Belt" labelPosition={[13, 1.7, 0]} />
    <InstancedBelt count={300} inner={32} outer={50} color="#82a9bb" seedOffset={90} label="Kuiper Belt" labelPosition={[40, 3, 0]} shape="ice" />
    <OortCloud />
    {allCelestialBodies.map((body) => <CelestialBody key={body.name} data={body} onSelect={onSelect} isSelected={selectedInfo?.name === body.name} />)}
    {starSystems.map((star) => <StarSystemNode key={star.name} star={star} onSelect={onSelect} isSelected={selectedInfo?.name === star.name || star.companions?.some((companion) => selectedInfo?.name === companion.name) === true} />)}
    {distantSpaceObjects.map((object) => <DistantObjectNode key={object.name} object={object} onSelect={onSelect} />)}
    <OrbitControls ref={controlsRef} makeDefault enablePan enableZoom enableRotate minDistance={2.5} maxDistance={900} autoRotate={!selectedInfo && !alignmentView} autoRotateSpeed={0.22} />
  </>;
}

const SolarSystem3D = () => {
  const [selectedInfo, setSelectedInfo] = useState<SelectedInfo | null>(null);
  const [jumpValue, setJumpValue] = useState('');
  const [alignmentView, setAlignmentView] = useState(false);
  const [focusTarget, setFocusTarget] = useState<[number, number, number] | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '100px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const selectableObjects = useMemo(() => [
    { value: 'sun', label: 'Sun', info: { name: 'Sun', emoji: '☀️', category: 'Star', fact: 'The Sun is the star at the centre of our Solar System. Its gravity holds the planets, comets, and asteroids in orbit.', detail: 'Scene distances and sizes are compressed for exploration.', focus: [0, 0, 0] as [number, number, number] } },
    ...allCelestialBodies.map((body) => ({ value: `body:${body.name}`, label: body.name, info: infoForBody(body) })),
    ...starSystems.map((star) => ({ value: `star:${star.name}`, label: star.name, info: infoForStar(star) })),
    ...starSystems.flatMap((star) => (star.companions ?? []).map((companion) => ({ value: `star:${companion.name}`, label: companion.name, info: infoForStar(star, companion) }))),
    ...starSystems.flatMap((star) => (star.planets ?? []).map((planet) => ({ value: `exoplanet:${planet.name}`, label: planet.name, info: { name: planet.name, emoji: '🪐', category: 'Exoplanet', fact: planet.fact, detail: `Orbits ${star.name} · ${star.distanceLy} light-years from the Sun · Schematic orbit.`, focus: star.position } }))),
    ...allCelestialBodies.flatMap((body) => (body.moonData ?? []).map((moon) => ({ value: `moon:${moon.name}`, label: moon.name, info: { name: moon.name, emoji: '🌙', category: `Moon of ${body.name}`, fact: moon.funFact, detail: 'Schematic orbit and size.', focus: [body.distance, 0, 0] as [number, number, number] } }))),
    ...distantSpaceObjects.map((object) => ({ value: `distant:${object.name}`, label: object.name, info: infoForDistant(object) })),
  ], []);

  const chooseInfo = (info: SelectedInfo, value?: string) => {
    setSelectedInfo(info);
    setFocusTarget(info.focus);
    setAlignmentView(false);
    setJumpValue(value ?? '');
  };
  const resetView = () => {
    setSelectedInfo(null);
    setJumpValue('');
    setAlignmentView(false);
    setFocusTarget(null);
    setResetKey((key) => key + 1);
  };
  const toggleAlignment = () => {
    const next = !alignmentView;
    setAlignmentView(next);
    if (next) {
      const earth = planetsData.find((body) => body.name === 'Earth');
      if (earth) setFocusTarget([earth.distance, 0, 0]);
      setSelectedInfo(null);
      setJumpValue('');
    } else {
      setFocusTarget(null);
    }
  };

  return <section id="solar-system-3d" className="relative px-4 py-12 md:py-16">
    <div className="mx-auto max-w-7xl">
      <header className="mb-6 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary">
          <Rocket className="h-5 w-5" /><span className="font-semibold">Interactive Solar System</span>
        </div>
        <h2 className="mb-3 font-fredoka text-3xl font-bold text-foreground sm:text-4xl">Explore the Solar System & Beyond</h2>
        <p className="mx-auto max-w-3xl text-sm text-muted-foreground sm:text-base">Planets, moons, asteroids, nearby stars, nebulae and stellar remnants.</p>
      </header>

      <div className="mb-3 grid grid-cols-1 gap-2 rounded-lg border border-border bg-card/90 p-3 text-card-foreground shadow-sm sm:grid-cols-2 lg:grid-cols-3">
        <label className="min-w-0 space-y-1">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><Telescope className="h-3.5 w-3.5" />Find a body</span>
          <Select value={jumpValue} onValueChange={(value) => {
            const choice = selectableObjects.find((item) => item.value === value);
            if (choice) chooseInfo(choice.info, choice.value);
          }}>
            <SelectTrigger aria-label="Find a celestial object" className="h-9 text-xs"><SelectValue placeholder="Planets, moons, stars…" /></SelectTrigger>
            <SelectContent className="z-[150]">{selectableObjects.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent>
          </Select>
        </label>
        <div className="flex items-end">
          <Button type="button" variant={alignmentView ? 'default' : 'outline'} className="h-9 w-full px-2 text-xs" onClick={toggleAlignment} aria-pressed={alignmentView}>
            <Crosshair className="h-4 w-4" />Earth view
          </Button>
        </div>
        <div className="flex items-end">
          <Button type="button" variant="secondary" className="h-9 w-full px-2 text-xs" onClick={resetView}>
            <RotateCcw className="h-4 w-4" />Reset
          </Button>
        </div>
      </div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 text-xs text-muted-foreground" aria-live="polite">
        <span>Distances and sizes are schematic; reported distances are approximate.</span>

        <Button type="button" variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => setShowInstructions((value) => !value)} aria-expanded={showInstructions}><Info className="h-3.5 w-3.5" />{showInstructions ? 'Hide guide' : 'Guide'}</Button>
      </div>
      {showInstructions && <div className="mb-3 border-l-2 border-primary px-3 py-2 text-sm text-muted-foreground">Drag to rotate, scroll or pinch to zoom, and select a body or moon for facts. Use the object picker to travel directly to a star system.</div>}

      <div ref={containerRef} className="relative h-[460px] overflow-hidden rounded-xl border border-border bg-background/70 shadow-card md:h-[650px]">
        {selectedInfo && <aside className="absolute bottom-3 left-3 right-3 z-20 max-h-[43%] overflow-y-auto rounded-lg border border-border bg-card/95 p-4 text-card-foreground shadow-lg backdrop-blur md:bottom-auto md:left-auto md:right-4 md:top-4 md:max-h-[70%] md:w-80">
          <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1 h-8 w-8" aria-label="Close celestial object facts" onClick={() => { setSelectedInfo(null); setJumpValue(''); }}><X className="h-4 w-4" /></Button>
          <div className="mb-2 flex items-center gap-3 pr-7">
            <span className="text-3xl" aria-hidden="true">{selectedInfo.emoji}</span>
            <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-normal text-primary">{selectedInfo.category}</p><h3 className="break-words font-fredoka text-xl font-bold">{selectedInfo.name}</h3></div>
          </div>
          <p className="text-sm leading-relaxed">{selectedInfo.fact}</p>
          <p className="mt-2 border-t border-border pt-2 text-xs leading-relaxed text-muted-foreground">{selectedInfo.detail}</p>
        </aside>}
        {inView ? <WebGLGuard>
          <Canvas camera={{ position: [0, 20, 40], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false }} onCreated={({ gl }) => { gl.domElement.addEventListener('webglcontextlost', (event) => event.preventDefault()); }}>
            <Scene onSelect={(info) => { if (info) chooseInfo(info); else setSelectedInfo(null); }} selectedInfo={selectedInfo} alignmentView={alignmentView} focusTarget={focusTarget} resetKey={resetKey} />
          </Canvas>
        </WebGLGuard> : <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Scroll to load the Solar System explorer</div>}
        <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex flex-wrap gap-2 text-[11px] text-card-foreground">
          <span className="rounded border border-border bg-card/85 px-2 py-1">Planets & moons</span><span className="rounded border border-border bg-card/85 px-2 py-1">Comets & asteroids</span><span className="rounded border border-border bg-card/85 px-2 py-1">Stars · nebulae · remnants</span>
        </div>
        {alignmentView && <div className="pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full border border-primary/30 bg-card/90 px-3 py-1.5 text-xs font-semibold text-card-foreground">Earth alignment view · schematic</div>}
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">Schematic exploration, not a precision sky map. Calvera’s distance is uncertain; some distant objects lie beyond 1,550 light-years.</p>
    </div>
  </section>;
};

export default SolarSystem3D;
