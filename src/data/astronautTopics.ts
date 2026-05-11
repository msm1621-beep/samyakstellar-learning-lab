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
      { type: 'book', title: 'Fundamentals of Astrodynamics', description: 'The legendary US Air Force Academy textbook by Roger R. Bate, Donald D. Mueller and Jerry E. White. Walks young readers from Newton's laws all the way to interplanetary trajectories with worked examples on conic orbits, ground tracks, Hohmann transfers, plane changes and rendezvous geometry. Used by NASA engineers and university students for over fifty years.' },
      { type: 'audiobook', title: 'Orbit: A Listener\'s Guide', description: 'A friendly 2-hour narrated tour of how things stay in orbit — from why the ISS does not fall down, to elliptical orbits, escape velocity, gravity assists and station-keeping burns. Perfect listening for car rides or bedtime, with sound effects from real launches and chapter-by-chapter Q&A breaks.', duration: '2h 15m' },
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
      { type: 'book', title: 'Ignition! by John D. Clark', description: 'John D. Clark's hilarious and sometimes terrifying chronicle of the chemists who invented modern rocket fuels. Covers kerosene, hydrogen, hydrazine, the dangers of fluorine compounds, and the Cold War race to find better propellants — full of personal stories that make rocket chemistry come alive for budding engineers.' },
      { type: 'audiobook', title: 'The Rocket Eternal', description: 'A 5-hour audio adventure from black-powder fire arrows in ancient China, through V-2 rockets, the Saturn V Moon program, the Space Shuttle main engines, SpaceX's Merlin and Raptor, all the way to ion drives and dreams of nuclear thermal propulsion. Includes interviews with engine test engineers.', duration: '5h' },
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
      { type: 'book', title: 'Human Spaceflight: Mission Analysis & Design', description: 'Edited by Wiley Larson and Linda Pranke, this is the encyclopedia astronaut-system designers actually keep on their desks. Chapters cover life support, thermal control, power, avionics, structures, EVA suits, mission planning and crew safety — written so a curious teenager can follow the diagrams.' },
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
      { type: 'book', title: 'Spacewalker by Jerry Ross', description: 'Jerry Ross flew on the Space Shuttle seven times and performed nine spacewalks helping build the International Space Station. He shares what it feels like to float outside in a pressure suit, how astronauts train underwater for years, the tools they invent, and the moments when something goes wrong 400 km above Earth.' },
      { type: 'audiobook', title: 'Walking in Space', description: 'A 6.5-hour narrated history of every famous spacewalk: Alexei Leonov's first risky float in 1965, Ed White's Gemini 4 walk, the Apollo Moon EVAs, Hubble repair missions, and ISS construction. Each chapter ends with a 'how it felt' segment based on the astronaut's own words.', duration: '6h 30m' },
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
      { type: 'book', title: 'Endurance by Scott Kelly', description: 'Scott Kelly's gripping account of his 340-day mission aboard the ISS — the science of how his body changed, life with cosmonaut Mikhail Kornienko, the smell of space, drinking recycled water, watching 16 sunrises a day, and the emotional toll of being away from family. NASA used this mission to plan future Mars trips.' },
      { type: 'audiobook', title: 'Packing for Mars by Mary Roach', description: 'Mary Roach's 8-hour audiobook is laugh-out-loud funny while teaching real science about going to the bathroom in zero gravity, eating space food, motion sickness, smells, sex in space, and what happens to bones and muscles. Backed by interviews with astronauts and flight surgeons.', duration: '8h' },
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
      { type: 'book', title: 'NightWatch by Terence Dickinson', description: 'Terence Dickinson's beloved beginner-to-intermediate astronomy guide. Star charts for every season, advice on choosing your first telescope or binoculars, lunar maps, planet observing tips, deep-sky targets, and astrophotography basics — all in language young stargazers can follow.' },
      { type: 'audiobook', title: 'The Sky at Night', description: 'A 4-hour, 20-minute narrated sky tour. Each chapter walks you through one constellation: its myth, the stars that form it, its brightest deep-sky objects, and exactly when and where to look. Includes simple breathing-and-observing exercises so kids can stargaze calmly.', duration: '4h 20m' },
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
      { type: 'book', title: 'SAS Survival Handbook', description: 'John 'Lofty' Wiseman's classic survival manual — the same book Russian cosmonauts carry in their Soyuz return capsule in case they land off-target. Covers shelter, fire, water, signaling, first aid, navigation by stars, and surviving extreme cold or desert heat.' },
      { type: 'audiobook', title: 'The Will to Survive', description: 'A 7-hour collection of real survival stories — Apollo 13, the Soyuz 23 ice-lake landing, polar explorers, mountaineers and pilots — paired with the psychological lessons astronauts apply: stay calm, work the problem, communicate clearly, and trust your training.', duration: '7h' },
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
      { type: 'book', title: 'Canadarm and Collaboration', description: 'How a small Canadian engineering team built the Shuttle Remote Manipulator System (Canadarm), then Canadarm2 and Dextre on the ISS. Full of behind-the-scenes stories about how teleoperated robotic arms catch visiting cargo ships and assemble billion-dollar modules in orbit.' },
      { type: 'audiobook', title: 'An Astronaut\'s Guide to Life on Earth', description: 'Commander Chris Hadfield reads his own 9h 11m memoir, sharing his journey from a Canadian farm boy who watched Apollo 11 to commanding the ISS. Lessons on goal-setting, fear, teamwork and his famous viral 'Space Oddity' video — perfect inspiration for kids who dream of space.', duration: '9h 11m' },
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
      { type: 'book', title: 'Failure Is Not an Option by Gene Kranz', description: 'Flight Director Gene Kranz takes you inside Houston's Mission Control room — the consoles, the headsets, the white vest he wore for Apollo 13. Detailed accounts of how flight controllers solved life-or-death problems with paper, pencils and slide rules in real time.' },
      { type: 'audiobook', title: 'Apollo 13 by Jim Lovell', description: 'A 12-hour deep dive narrated retelling of Apollo 13 by commander Jim Lovell. From the explosion on the way to the Moon to the freezing Lunar Module 'lifeboat', the carbon-dioxide filter fix, and the heart-stopping reentry — a masterclass in calm problem-solving that every future astronaut should hear.', duration: '12h' },
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
      { type: 'book', title: 'The Right Stuff by Tom Wolfe', description: 'Tom Wolfe's classic profile of the test pilots who became the Mercury Seven. Captures the courage, ego, humour and discipline behind Project Mercury, with vivid scenes of supersonic test flights at Edwards Air Force Base and the political circus around the early space program.' },
      { type: 'audiobook', title: 'Off the Planet', description: 'Jerry Linenger's 10-hour first-hand account of his 1997 Mir mission — including the worst fire ever on a crewed spacecraft, a near-collision with a cargo ship, and what it is like to live in an aging Russian station. A real-world lesson in resilience, language barriers, and trust.', duration: '10h' },
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
      { type: 'book', title: 'To a Rocky Moon by Don Wilhelms', description: 'Don Wilhelms helped train the Apollo astronauts to recognize Moon rocks. His detailed history covers every Apollo landing site, what we learned about lunar geology, the formation of the Moon, and how those samples still inspire today's Artemis program.' },
      { type: 'audiobook', title: 'The Planets by Andrew Cohen', description: 'A 9-hour audio companion to the BBC 'The Planets' series narrated by Andrew Cohen and Brian Cox. Each chapter visits one world — Mercury's iron heart, Venus's runaway greenhouse, Mars's ancient rivers, the gas giants and the icy outer worlds — using the latest probe data.', duration: '9h' },
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
      { type: 'book', title: 'Communications Satellite Handbook', description: 'The go-to reference for how spacecraft talk to Earth: antenna design, link budgets, frequency bands (S, X, Ka), the Deep Space Network, modulation, error correction and the basics of how a rover on Mars sends pictures back to your phone. Surprisingly readable for older kids who like radios.' },
      { type: 'article', title: 'NASA SCaN Overview', description: 'Free guide to space communications.' },
    ],
  },
];

export const topicCategories = ['All', 'Science', 'Engineering', 'Health', 'Operations', 'Survival', 'Mission'] as const;
