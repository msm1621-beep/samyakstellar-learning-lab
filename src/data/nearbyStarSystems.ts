export interface NearbyPlanetData {
  name: string;
  radius: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  fact: string;
}

export interface StarCompanionData {
  name: string;
  radius: number;
  color: string;
  spectral: string;
  orbitRadius: number;
  orbitSpeed: number;
  fact: string;
}

export interface NearbyStarSystemData {
  name: string;
  distanceLy: number;
  position: [number, number, number];
  radius: number;
  color: string;
  spectral: string;
  category?: string;
  fact: string;
  companions?: StarCompanionData[];
  planets?: NearbyPlanetData[];
  distantShowcase?: boolean;
}

const planet = (name: string, orbitRadius: number, color: string, fact: string): NearbyPlanetData => ({
  name,
  radius: 0.12,
  color,
  orbitRadius,
  orbitSpeed: 1.5 / Math.sqrt(orbitRadius),
  fact,
});

const companion = (name: string, radius: number, color: string, spectral: string, orbitRadius: number, fact: string): StarCompanionData => ({
  name,
  radius,
  color,
  spectral,
  orbitRadius,
  orbitSpeed: 0.34 / Math.sqrt(orbitRadius / 2),
  fact,
});

// Positions are intentionally compressed and schematic so the whole neighbourhood can be explored in one scene.
const positionFor = (distanceLy: number, index: number): [number, number, number] => {
  const radius = 122 + distanceLy * 7.6;
  const angle = index * 2.399963;
  const latitude = ((index % 7) - 3) * 0.13;
  return [
    Math.cos(angle) * radius,
    Math.sin(latitude) * radius * 0.58,
    Math.sin(angle) * radius,
  ];
};

const star = (
  name: string,
  distanceLy: number,
  index: number,
  color: string,
  spectral: string,
  fact: string,
  options: Pick<NearbyStarSystemData, 'category' | 'companions' | 'planets'> = {},
): NearbyStarSystemData => ({
  name,
  distanceLy,
  position: positionFor(distanceLy, index),
  radius: spectral.includes('A') ? 1.3 : spectral.includes('G') ? 1.1 : 0.76,
  color,
  spectral,
  fact,
  ...options,
});

const red = '#ff8068';
const orange = '#ffb36c';
const white = '#dceeff';
const brown = '#c27b57';
const yellow = '#ffe0a1';

export const nearbyStarSystems: NearbyStarSystemData[] = [
  star('Alpha Centauri A', 4.37, 0, yellow, 'G2 V', 'Alpha Centauri A is a Sun-like star in the nearest bright binary system.', {
    companions: [companion('Alpha Centauri B', 1.05, orange, 'K1 V', 3.2, 'Alpha Centauri B orbits the shared centre of mass with Alpha Centauri A.')],
  }),
  star('Proxima Centauri', 4.24, 1, red, 'M5.5 V', 'Proxima Centauri is the nearest individual star to the Sun and a flare-producing red dwarf.', {
    planets: [
      planet('Proxima Centauri b', 1.7, '#6b93d6', 'A roughly Earth-mass planet in Proxima Centauri’s habitable-zone region; its climate is uncertain.'),
      planet('Proxima Centauri c', 2.35, '#a89080', 'A candidate outer planet in the Proxima Centauri system, shown here as a schematic orbit.'),
      planet('Proxima Centauri d', 1.25, '#c1440e', 'A small inner planet candidate orbiting close to Proxima Centauri.'),
    ],
  }),
  star("Barnard's Star", 5.96, 2, red, 'M4 V', "Barnard's Star is a nearby red dwarf with exceptionally high apparent proper motion.", {
    planets: [planet("Barnard's Star b", 1.8, '#a89080', 'A reported planet candidate orbiting Barnard’s Star; its detection history remains under study.')],
  }),
  star('Luhman 16A', 6.51, 3, brown, 'L7.5', 'Luhman 16A is one component of a nearby pair of cooling brown dwarfs.', {
    category: 'Brown dwarf',
    companions: [companion('Luhman 16B', 0.82, '#a8624d', 'T0.5', 2.2, 'Luhman 16B is the cooler companion in this binary brown-dwarf system.')],
  }),
  star('WISE 0855−0714', 7.26, 4, '#7fb8c9', 'Y dwarf', 'WISE 0855−0714 is one of the coldest known brown dwarfs, with possible water clouds.', { category: 'Brown dwarf' }),
  star('Wolf 359', 7.86, 5, red, 'M6 V', 'Wolf 359 is a faint, flare-active red dwarf in the constellation Leo.', {
    planets: [planet('Wolf 359 b', 1.55, '#c8a47e', 'A catalogue planet entry orbiting the red dwarf Wolf 359.'), planet('Wolf 359 c', 2.1, '#7da9d8', 'A catalogue planet entry shown on a schematic outer orbit.')],
  }),
  star('Lalande 21185', 8.31, 6, orange, 'M2 V', 'Lalande 21185 is a nearby red dwarf in Ursa Major.', {
    planets: [planet('Lalande 21185 b', 1.6, '#bf8469', 'A reported nearby planet candidate around Lalande 21185.'), planet('Lalande 21185 c', 2.25, '#7f9bb8', 'A catalogue companion planet shown for exploration.')],
  }),
  star('Sirius A', 8.60, 7, white, 'A1 V', 'Sirius A is the brightest star in Earth’s night sky.', {
    companions: [companion('Sirius B', 0.72, '#b7d8ff', 'White dwarf', 4.1, 'Sirius B is a dense white-dwarf companion orbiting Sirius A.')],
  }),
  star('Luyten 726-8 A', 8.73, 8, red, 'M5.5 V', 'Luyten 726-8 is a close binary of flare-producing red dwarfs.', {
    companions: [companion('Luyten 726-8 B (UV Ceti)', 0.68, '#ff8b69', 'M6 V', 2.6, 'UV Ceti is the flaring companion in the Luyten 726-8 binary.')],
  }),
  star('Ross 154', 9.69, 9, red, 'M3.5 V', 'Ross 154 is a nearby red dwarf that occasionally produces stellar flares.'),
  star('Ross 248', 10.30, 10, red, 'M6 V', 'Ross 248 is a small red dwarf that will become one of the closest stars to the Sun in the distant future.'),
  star('Epsilon Eridani', 10.50, 11, orange, 'K2 V', 'Epsilon Eridani is a young orange dwarf with a dusty debris disc.', { planets: [planet('Epsilon Eridani b (AEgir)', 2.25, '#c28b62', 'A gas-giant planet candidate in the Epsilon Eridani system.') ]}),
  star('Lacaille 9352', 10.74, 12, red, 'M0 V', 'Lacaille 9352 is a bright nearby red dwarf in the southern sky.', { planets: [planet('Lacaille 9352 b', 1.6, '#8da9c7', 'A catalogue planet entry around Lacaille 9352.'), planet('Lacaille 9352 c', 2.2, '#c49b76', 'A catalogue outer planet entry around Lacaille 9352.')] }),
  star('Ross 128', 11.03, 13, red, 'M4 V', 'Ross 128 is a quiet nearby red dwarf.', { planets: [planet('Ross 128 b', 1.65, '#7393be', 'A roughly Earth-sized planet candidate orbiting Ross 128.') ]}),
  star('Gliese 412 A', 11.26, 14, red, 'M1 V', 'Gliese 412 A is the red-dwarf primary of a nearby stellar pair.', { companions: [companion('Gliese 412 B', 0.58, '#d17c5d', 'M5 V', 2.8, 'Gliese 412 B is the dim red-dwarf companion.') ]}),
  star('61 Cygni A', 11.41, 15, orange, 'K5 V', '61 Cygni A is an orange dwarf in a famous nearby binary.', { companions: [companion('61 Cygni B', 0.72, '#e18b5c', 'K7 V', 3.1, '61 Cygni B is the orange-dwarf companion to 61 Cygni A.') ]}),
  star('Procyon A', 11.46, 16, '#fff1c7', 'F5 IV', 'Procyon A is a yellow-white subgiant in a nearby binary system.', { companions: [companion('Procyon B', 0.55, '#c4ddff', 'White dwarf', 3.8, 'Procyon B is the compact white-dwarf companion of Procyon A.') ]}),
  star('Groombridge 34 A', 11.62, 17, red, 'M1.5 V', 'Groombridge 34 A is a nearby red dwarf in a binary system.', { companions: [companion('Groombridge 34 B', 0.62, '#dc825e', 'M3.5 V', 2.7, 'Groombridge 34 B is the red-dwarf companion.'),], planets: [planet('Groombridge 34 Ab', 1.65, '#769bc0', 'A catalogue planet entry orbiting Groombridge 34 A.') ]}),
  star('DX Cancri', 11.82, 18, red, 'M6 V', 'DX Cancri is a small, cool red dwarf.'),
  star('Epsilon Indi A', 11.83, 19, orange, 'K5 V', 'Epsilon Indi A is an orange dwarf with a pair of known brown-dwarf companions.', { companions: [companion('Epsilon Indi Ba', 0.62, brown, 'T1', 2.5, 'Epsilon Indi Ba is one of the brown-dwarf companions.'), companion('Epsilon Indi Bb', 0.55, '#a66b50', 'T6', 3.4, 'Epsilon Indi Bb is the second brown-dwarf companion.')], planets: [planet('Epsilon Indi Ab', 1.8, '#b08d70', 'A giant planet candidate orbiting Epsilon Indi A.') ]}),
  star('Tau Ceti', 11.89, 20, yellow, 'G8 V', 'Tau Ceti is a Sun-like star often used in discussions of nearby planetary systems.', { planets: ['e', 'f', 'g', 'h'].map((suffix, i) => planet(`Tau Ceti ${suffix}`, 1.45 + i * 0.48, i % 2 ? '#6e91ba' : '#c5a27c', `Tau Ceti ${suffix} is a catalogue planet entry shown on a schematic orbit.`)) }),
  star('Gliese 1061', 11.98, 21, red, 'M5.5 V', 'Gliese 1061 is a nearby red dwarf with a compact planetary system.', { planets: ['b', 'c', 'd'].map((suffix, i) => planet(`Gliese 1061 ${suffix}`, 1.35 + i * 0.44, i === 1 ? '#7199bd' : '#ae8068', `Gliese 1061 ${suffix} is a catalogue planet entry around the red dwarf.`)) }),
  star('YZ Ceti', 12.11, 22, red, 'M4.5 V', 'YZ Ceti is a nearby red dwarf with several small planet candidates.', { planets: ['b', 'c', 'd'].map((suffix, i) => planet(`YZ Ceti ${suffix}`, 1.35 + i * 0.4, i === 1 ? '#7b9fc2' : '#b88468', `YZ Ceti ${suffix} is a catalogue planet entry shown for learning.`)) }),
  star("Luyten's Star", 12.25, 23, red, 'M3.5 V', "Luyten's Star is a nearby red dwarf with a compact planetary system.", { planets: [planet("Luyten's Star b", 1.45, '#7095bb', 'A nearby planet entry around Luyten’s Star.'), planet("Luyten's Star c", 2.0, '#b18a6d', 'A second catalogue planet entry around Luyten’s Star.')] }),
  star("Teegarden's Star", 12.50, 24, red, 'M7 V', "Teegarden's Star is a very faint nearby red dwarf.", { planets: ['b', 'c', 'd'].map((suffix, i) => planet(`Teegarden's Star ${suffix}`, 1.4 + i * 0.42, i === 1 ? '#7199c0' : '#b8896d', `Teegarden's Star ${suffix} is a small planet candidate in this nearby system.`)) }),
  star("Kapteyn's Star", 12.83, 25, '#d48e6b', 'M1 subdwarf', "Kapteyn's Star is an old high-velocity subdwarf.", { planets: [planet("Kapteyn's Star b", 1.6, '#8ba4bd', 'A catalogue planet entry around Kapteyn’s Star.'), planet("Kapteyn's Star c", 2.15, '#b08b6c', 'A second catalogue planet entry around Kapteyn’s Star.')] }),
  star('Lacaille 8760', 12.95, 26, red, 'M0 V', 'Lacaille 8760, also called AX Microscopii, is a nearby red dwarf.'),
  star('SCR 1845-6357 A', 13.05, 27, red, 'M8 V', 'SCR 1845-6357 A is a red dwarf with a brown-dwarf companion.', { companions: [companion('SCR 1845-6357 B', 0.55, brown, 'T6', 2.4, 'SCR 1845-6357 B is the system’s cool brown-dwarf companion.') ]}),
  star('Krüger 60 A', 13.08, 28, red, 'M3 V', 'Krüger 60 A is the primary in a nearby red-dwarf binary.', { companions: [companion('Krüger 60 B', 0.58, '#dd865e', 'M4 V', 2.4, 'Krüger 60 B is the red-dwarf companion.') ]}),
  star('DENIS J1048−3956', 13.19, 29, brown, 'M9/Y', 'DENIS J1048−3956 lies at the star–brown-dwarf boundary and is extremely faint.', { category: 'Brown dwarf' }),
  star('Ross 614 A', 13.36, 30, red, 'M4 V', 'Ross 614 A is the primary of a nearby low-mass binary.', { companions: [companion('Ross 614 B', 0.52, '#c8785b', 'M7 V', 2.25, 'Ross 614 B is the low-mass companion.') ]}),
  star('Wolf 424 A', 14.30, 31, red, 'M5 V', 'Wolf 424 A is a nearby red dwarf in a binary system.', { companions: [companion('Wolf 424 B', 0.58, '#d47d5d', 'M6 V', 2.7, 'Wolf 424 B is the red-dwarf companion.') ]}),
  star('TZ Arietis', 14.59, 32, red, 'M4.5 V', 'TZ Arietis is a nearby red dwarf.', { planets: [planet('TZ Arietis b', 1.55, '#759bc0', 'A catalogue planet entry around TZ Arietis.'), planet('TZ Arietis c', 2.1, '#b58c70', 'A second catalogue planet entry around TZ Arietis.')] }),
  star('Gliese 687', 14.84, 33, red, 'M3 V', 'Gliese 687 is a nearby red dwarf with planetary companions.', { planets: [planet('Gliese 687 b', 1.5, '#7299be', 'A planet entry around Gliese 687.'), planet('Gliese 687 c', 2.05, '#b58c70', 'A second catalogue planet entry around Gliese 687.')] }),
  star('Gliese 674', 14.85, 34, red, 'M2.5 V', 'Gliese 674 is a nearby red dwarf with a close-in planet candidate.', { planets: [planet('Gliese 674 b', 1.45, '#759bc0', 'A close-in planet candidate orbiting Gliese 674.') ]}),
];