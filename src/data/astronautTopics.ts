export interface Resource {
  type: 'video' | 'book' | 'audiobook' | 'article';
  title: string;
  description: string;
  url?: string;
  duration?: string;
}

export interface AstronautTopic {
  id: string;
  title: string;
  icon: string;
  category: 'Science' | 'Engineering' | 'Health' | 'Operations' | 'Survival' | 'Mission';
  summary: string;
  whyItMatters: string;
  keyConcepts: string[];
  resources: Resource[];
}

export const astronautTopics: AstronautTopic[] = [
  {
    id: 'orbital-mechanics',
    title: 'Orbital Mechanics',
    icon: '🛰️',
    category: 'Science',
    summary: 'Understanding how spacecraft move, orbit, and rendezvous in space using Newtonian physics.',
    whyItMatters: 'Every maneuver — launch, docking, return — depends on precise orbital math.',
    keyConcepts: ['Kepler\'s Laws', 'Hohmann Transfers', 'Delta-V', 'Lagrange Points', 'Rendezvous & Docking'],
    resources: [
      { type: 'video', title: 'Orbital Mechanics Explained (NASA)', description: 'Visual intro to orbits and trajectories.', url: 'https://www.youtube.com/results?search_query=orbital+mechanics+nasa', duration: '18 min' },
      { type: 'book', title: 'Fundamentals of Astrodynamics', description: 'Classic textbook by Bate, Mueller & White.' },
      { type: 'audiobook', title: 'Orbit: A Listener\'s Guide', description: 'Narrated overview of orbital physics.', duration: '2h 15m' },
    ],
  },
  {
    id: 'rocket-propulsion',
    title: 'Rocket Propulsion',
    icon: '🚀',
    category: 'Engineering',
    summary: 'How rockets generate thrust to escape Earth\'s gravity and travel between worlds.',
    whyItMatters: 'Choosing the right engine determines payload, range, and mission success.',
    keyConcepts: ['Tsiolkovsky Equation', 'Specific Impulse', 'Liquid vs Solid Fuel', 'Ion Drives', 'Staging'],
    resources: [
      { type: 'video', title: 'How Rockets Work — Saturn V to Starship', description: 'Animated breakdown of rocket engines.', duration: '22 min' },
      { type: 'book', title: 'Ignition! by John D. Clark', description: 'Informal history of liquid rocket propellants.' },
      { type: 'audiobook', title: 'The Rocket Eternal', description: 'A narrated journey through propulsion history.', duration: '5h' },
    ],
  },
  {
    id: 'spacecraft-systems',
    title: 'Spacecraft Systems',
    icon: '🛠️',
    category: 'Engineering',
    summary: 'Power, thermal, life support, and avionics systems that keep a spacecraft alive.',
    whyItMatters: 'Astronauts must diagnose and repair failures with no help on the way.',
    keyConcepts: ['ECLSS', 'Solar Arrays', 'Thermal Control', 'Avionics', 'Redundancy'],
    resources: [
      { type: 'video', title: 'Inside the ISS Life Support System', description: 'Tour of how the station recycles air & water.', duration: '15 min' },
      { type: 'book', title: 'Human Spaceflight: Mission Analysis & Design', description: 'The standard engineering reference.' },
      { type: 'article', title: 'NASA Systems Engineering Handbook', description: 'Free PDF from NASA.' },
    ],
  },
  {
    id: 'eva-spacewalks',
    title: 'EVA & Spacewalks',
    icon: '👨‍🚀',
    category: 'Operations',
    summary: 'Extravehicular activity — working outside the spacecraft in a pressurized suit.',
    whyItMatters: 'Spacewalks repair satellites, install hardware, and explore alien surfaces.',
    keyConcepts: ['EMU Suit', 'Pre-breathe Protocol', 'Tethers & SAFER', 'Tool Management', 'Suit Fit'],
    resources: [
      { type: 'video', title: 'A Spacewalk in 360° — NASA', description: 'Immersive POV of an ISS EVA.', duration: '12 min' },
      { type: 'book', title: 'Spacewalker by Jerry Ross', description: 'Memoir of a record-holding spacewalker.' },
      { type: 'audiobook', title: 'Walking in Space', description: 'Audio retelling of historic EVAs.', duration: '6h 30m' },
    ],
  },
  {
    id: 'space-medicine',
    title: 'Space Medicine & Physiology',
    icon: '🩺',
    category: 'Health',
    summary: 'How microgravity, radiation, and isolation affect the human body.',
    whyItMatters: 'Long missions require crews who can stay healthy for months or years.',
    keyConcepts: ['Bone Density Loss', 'Fluid Shift', 'Radiation Dose', 'SANS Eye Syndrome', 'Countermeasures'],
    resources: [
      { type: 'video', title: 'What Happens to Your Body in Space', description: 'Scott Kelly\'s twin study explained.', duration: '10 min' },
      { type: 'book', title: 'Endurance by Scott Kelly', description: 'A year in space, told first-hand.' },
      { type: 'audiobook', title: 'Packing for Mars by Mary Roach', description: 'The curious science of life in the void.', duration: '8h' },
    ],
  },
  {
    id: 'astronomy-navigation',
    title: 'Astronomy & Navigation',
    icon: '🌌',
    category: 'Science',
    summary: 'Reading the stars and using celestial references to navigate space.',
    whyItMatters: 'GPS doesn\'t work past Earth orbit — astronauts use star trackers and sextants.',
    keyConcepts: ['Star Trackers', 'Celestial Coordinates', 'Sextant Use', 'Pulsar Navigation', 'Constellations'],
    resources: [
      { type: 'video', title: 'Navigating by the Stars', description: 'Apollo-era sextant techniques.', duration: '14 min' },
      { type: 'book', title: 'NightWatch by Terence Dickinson', description: 'A practical guide to viewing the universe.' },
      { type: 'audiobook', title: 'The Sky at Night', description: 'Audio tour of constellations and deep sky.', duration: '4h 20m' },
    ],
  },
  {
    id: 'survival-training',
    title: 'Survival Training',
    icon: '🏕️',
    category: 'Survival',
    summary: 'Land, sea, and wilderness survival in case of off-target re-entry.',
    whyItMatters: 'Soyuz capsules can land anywhere from Siberia to the Pacific.',
    keyConcepts: ['Cold Weather Survival', 'Water Survival', 'Shelter Building', 'Signaling', 'First Aid'],
    resources: [
      { type: 'video', title: 'Astronaut Winter Survival Training', description: 'Inside Star City\'s legendary course.', duration: '20 min' },
      { type: 'book', title: 'SAS Survival Handbook', description: 'A staple in every cosmonaut kit.' },
      { type: 'audiobook', title: 'The Will to Survive', description: 'True survival stories, narrated.', duration: '7h' },
    ],
  },
  {
    id: 'robotics-arm',
    title: 'Robotics & Canadarm',
    icon: '🤖',
    category: 'Operations',
    summary: 'Operating robotic arms to capture cargo and assemble structures.',
    whyItMatters: 'Robotic arms extend an astronaut\'s reach across the entire spacecraft exterior.',
    keyConcepts: ['Canadarm2', 'Joint Control', 'Berthing', 'Camera Views', 'Force Feedback'],
    resources: [
      { type: 'video', title: 'Flying Canadarm2 — CSA', description: 'Hadfield demos the robotic arm.', duration: '8 min' },
      { type: 'book', title: 'Canadarm and Collaboration', description: 'The story of Canada\'s robotic legacy.' },
      { type: 'audiobook', title: 'An Astronaut\'s Guide to Life on Earth', description: 'Hadfield narrates his own memoir.', duration: '9h 11m' },
    ],
  },
  {
    id: 'mission-planning',
    title: 'Mission Planning',
    icon: '📋',
    category: 'Mission',
    summary: 'Timelines, contingencies, and the art of flying a mission from the ground up.',
    whyItMatters: 'Every minute in orbit is scripted — and every script needs a backup.',
    keyConcepts: ['Flight Rules', 'Timeline Planning', 'Contingency Ops', 'Crew Scheduling', 'Mission Control'],
    resources: [
      { type: 'video', title: 'A Day in Mission Control', description: 'Behind the consoles at Houston.', duration: '25 min' },
      { type: 'book', title: 'Failure Is Not an Option by Gene Kranz', description: 'Mission control from Mercury to Apollo 13.' },
      { type: 'audiobook', title: 'Apollo 13 by Jim Lovell', description: 'The mission that defined planning under pressure.', duration: '12h' },
    ],
  },
  {
    id: 'psychology-teamwork',
    title: 'Psychology & Teamwork',
    icon: '🧠',
    category: 'Health',
    summary: 'Living in confined spaces with the same crew for months on end.',
    whyItMatters: 'Mental resilience and teamwork can make or break a long-duration mission.',
    keyConcepts: ['Group Dynamics', 'Conflict Resolution', 'Isolation Management', 'Mindfulness', 'Cultural Awareness'],
    resources: [
      { type: 'video', title: 'The Psychology of Isolation', description: 'Lessons from Antarctic & ISS crews.', duration: '16 min' },
      { type: 'book', title: 'The Right Stuff by Tom Wolfe', description: 'The mental makeup of the first astronauts.' },
      { type: 'audiobook', title: 'Off the Planet', description: 'Cosmonaut Jerry Linenger\'s Mir story.', duration: '10h' },
    ],
  },
  {
    id: 'planetary-geology',
    title: 'Planetary Geology',
    icon: '🪨',
    category: 'Science',
    summary: 'Reading rocks and landscapes to understand other worlds.',
    whyItMatters: 'Future Moon and Mars crews will be field geologists in spacesuits.',
    keyConcepts: ['Igneous Rocks', 'Regolith', 'Impact Craters', 'Sample Collection', 'Stratigraphy'],
    resources: [
      { type: 'video', title: 'Apollo Geology Training', description: 'How NASA turned pilots into geologists.', duration: '19 min' },
      { type: 'book', title: 'To a Rocky Moon by Don Wilhelms', description: 'A geologist\'s history of lunar exploration.' },
      { type: 'audiobook', title: 'The Planets by Andrew Cohen', description: 'Audio companion to the BBC series.', duration: '9h' },
    ],
  },
  {
    id: 'communications',
    title: 'Communications & Networks',
    icon: '📡',
    category: 'Engineering',
    summary: 'Radios, deep space network, and keeping in touch across millions of kilometers.',
    whyItMatters: 'Without comms, an astronaut is truly alone.',
    keyConcepts: ['DSN', 'Light-Lag Delay', 'Antenna Pointing', 'Encryption', 'Bandwidth'],
    resources: [
      { type: 'video', title: 'How NASA Talks to Voyager', description: 'The Deep Space Network explained.', duration: '11 min' },
      { type: 'book', title: 'Communications Satellite Handbook', description: 'Practical reference for space links.' },
      { type: 'article', title: 'NASA SCaN Overview', description: 'Free guide to space communications.' },
    ],
  },
];

export const topicCategories = ['All', 'Science', 'Engineering', 'Health', 'Operations', 'Survival', 'Mission'] as const;
