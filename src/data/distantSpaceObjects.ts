export interface DistantSpaceObject {
  name: string;
  distanceLy: number | null;
  kind: 'Star' | 'Star cluster' | 'Nebula' | 'Supernova remnant' | 'Neutron star' | 'Pulsar' | 'Black hole';
  color: string;
  fact: string;
  position: [number, number, number];
}

// Approximate distances, not a spatial map or a precision distance catalogue.
const entries: [string, number | null, DistantSpaceObject['kind'], string, string][] = [
  ['Vega', 25, 'Star', '#c8e6ff', 'Vega is a bright blue-white star in Lyra and part of the Summer Triangle.'],
  ['Altair', 17, 'Star', '#e2eeff', 'Altair spins rapidly enough to bulge around its equator.'],
  ['Fomalhaut', 25, 'Star', '#c8e6ff', 'Fomalhaut is surrounded by a dusty debris belt.'],
  ['Pollux', 34, 'Star', '#ffc883', 'Pollux is an orange giant with a known giant planet.'],
  ['Arcturus', 37, 'Star', '#ffae6c', 'Arcturus is a bright orange giant in Boötes.'],
  ['Capella', 43, 'Star', '#ffe7a0', 'Capella is a multiple-star system whose bright pair consists of two giant stars.'],
  ['Castor', 51, 'Star', '#d8eaff', 'Castor is a complex system containing six stars.'],
  ['Aldebaran', 65, 'Star', '#ff9b65', 'Aldebaran is an orange giant seen in front of the Hyades, but is not a member of that cluster.'],
  ['Algol', 93, 'Star', '#cce5ff', 'Algol is a multiple-star system famous for eclipses that change its brightness.'],
  ['Regulus', 79, 'Star', '#c9e6ff', 'Regulus is a rapidly rotating star in a multiple-star system in Leo.'],
  ['The Hyades Cluster', 153, 'Star cluster', '#ffdf9c', 'The Hyades is the nearest large open star cluster to the Sun.'],
  ['Merak', 80, 'Star', '#d4eaff', 'Merak and Dubhe are the Big Dipper’s pointer stars toward Polaris.'],
  ['Dubhe', 123, 'Star', '#ffd293', 'Dubhe is a giant star and one of the Big Dipper’s pointer stars.'],
  ['Phecda', 83, 'Star', '#d0e8ff', 'Phecda marks a corner of the Big Dipper’s bowl.'],
  ['Megrez', 81, 'Star', '#dcecff', 'Megrez joins the Big Dipper’s bowl to its handle.'],
  ['Alioth', 83, 'Star', '#d0e8ff', 'Alioth is the brightest star in Ursa Major.'],
  ['Mizar', 83, 'Star', '#cce5ff', 'Mizar is a multiple-star system beside Alcor in the Big Dipper.'],
  ['Alcor', 82, 'Star', '#d8eaff', 'Alcor and Mizar form a famous naked-eye double in the Big Dipper.'],
  ['Alkaid', 104, 'Star', '#b4d7ff', 'Alkaid is a hot blue-white star at the end of the Big Dipper’s handle.'],
  ['The Coma Star Cluster', 280, 'Star cluster', '#dceaff', 'The Coma Berenices cluster is a loose nearby open cluster.'],
  ['The Pleiades Cluster', 444, 'Star cluster', '#9fcaff', 'The Pleiades is a young open cluster whose stars illuminate surrounding dust.'],
  ['The Beehive Cluster', 577, 'Star cluster', '#ffe6b1', 'The Beehive, also called M44, contains hundreds of stars in Cancer.'],
  ['Canopus', 310, 'Star', '#fff0bb', 'Canopus is a luminous giant and the second-brightest star in Earth’s night sky.'],
  ['Achernar', 139, 'Star', '#a9d1ff', 'Achernar rotates extremely rapidly and has a flattened shape.'],
  ['Mirach', 197, 'Star', '#ffa478', 'Mirach is a red giant in Andromeda.'],
  ['Almach', 350, 'Star', '#ffd197', 'Almach is a multiple-star system with a striking contrasting-color visual pair.'],
  ['Spica', 250, 'Star', '#a9cfff', 'Spica is a close binary of hot stars in Virgo.'],
  ['Betelgeuse', 550, 'Star', '#ff8664', 'Betelgeuse is a red supergiant in Orion; its distance is still uncertain.'],
  ['The Helix Nebula', 650, 'Nebula', '#77d8ce', 'The Helix is a planetary nebula: an expanding shell of gas shed by a dying Sun-like star.'],
  ['Antares', 550, 'Star', '#ff8862', 'Antares is a red supergiant in Scorpius with a hot stellar companion.'],
  ['The Vela Supernova Remnant', 800, 'Supernova remnant', '#80e1ca', 'This expanding debris cloud was created by a stellar explosion roughly 11,000 years ago and contains the Vela pulsar.'],
  ['Hadar', 390, 'Star', '#badcff', 'Hadar, also called Beta Centauri, is a multiple system of hot stars.'],
  ['Polaris (The North Star)', 447, 'Star', '#ffe6ab', 'Polaris lies close to Earth’s north celestial pole and is a pulsating star in a multiple system.'],
  ['Bellatrix', 250, 'Star', '#b4d8ff', 'Bellatrix is a hot blue giant marking one of Orion’s shoulders.'],
  ['Mintaka', 1200, 'Star', '#b4d8ff', 'Mintaka is a multiple-star system at one end of Orion’s Belt.'],
  ['Alnilam', 2000, 'Star', '#badcff', 'Alnilam is a luminous blue supergiant at the centre of Orion’s Belt; estimates place it beyond 1,550 light-years.'],
  ['Alnitak', 1260, 'Star', '#acd3ff', 'Alnitak is a multiple-star system near the Horsehead Nebula in Orion.'],
  ['Saiph', 650, 'Star', '#b0d4ff', 'Saiph is a hot supergiant marking one of Orion’s feet.'],
  ['Rigel', 860, 'Star', '#bedfff', 'Rigel is a blue supergiant and part of a multiple-star system.'],
  ['The Orion Nebula', 1344, 'Nebula', '#ed9bcc', 'The Orion Nebula is a stellar nursery where young stars form from gas and dust.'],
  ['The Ring Nebula', 2300, 'Nebula', '#9cded7', 'The Ring Nebula, M57, is a planetary nebula in Lyra, generally placed around 2,300 light-years away rather than 1,400.'],
  ['Gacrux', 88, 'Star', '#ffa783', 'Gacrux is the red giant at the top of the Southern Cross.'],
  ['Mimosa (Becrux)', 280, 'Star', '#acd1ff', 'Mimosa is a hot blue star in the Southern Cross.'],
  ['Acrux', 320, 'Star', '#bedfff', 'Acrux is a multiple-star system at the foot of the Southern Cross.'],
  ['Enif', 690, 'Star', '#ffbf87', 'Enif is an orange supergiant in Pegasus.'],
  ['Sadr', 1800, 'Star', '#ffe7b1', 'Sadr is a yellow-white supergiant in Cygnus; typical distance estimates exceed 1,550 light-years.'],
  ['RX J1856.5−3754', 400, 'Neutron star', '#b3efff', 'RX J1856.5−3754 is an isolated neutron star detected through its thermal X-rays; it is not usually classified as a radio pulsar.'],
  ['Calvera', null, 'Pulsar', '#99dbff', 'Calvera is an isolated X-ray pulsar, also called 1RXS J141256.0+792204. Its distance remains uncertain.'],
  ['Gaia BH1', 1560, 'Black hole', '#ffce8d', 'Gaia BH1 is a dormant stellar-mass black hole detected through the motion of its Sun-like companion. The ring here is illustrative, not an observed accretion disk.'],
];

export const distantSpaceObjects: DistantSpaceObject[] = entries.map(([name, distanceLy, kind, color, fact], index) => {
  const radius = 290 + index * 6;
  const angle = index * 2.399963;
  return { name, distanceLy, kind, color, fact, position: [Math.cos(angle) * radius, ((index % 5) - 2) * 24, Math.sin(angle) * radius] };
});