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

const rawAstronautTopics: AstronautTopic[] = [
  {
    id: "orbital-mechanics",
    title: "Orbital Mechanics",
    icon: "🛰️",
    category: "Science",
    summary: "Understanding how spacecraft move, orbit, and rendezvous in space using Newtonian physics.",
    whyItMatters: "Every maneuver — launch, docking, return — depends on precise orbital math.",
    keyConcepts: ["Kepler's Laws", "Hohmann Transfers", "Delta-V", "Lagrange Points", "Rendezvous & Docking"],
    resources: [
      { type: "video", title: "Orbital Mechanics Explained (NASA)", description: "Visual intro to orbits and trajectories.", url: "https://www.youtube.com/results?search_query=orbital+mechanics+nasa", duration: "18 min" },
      { type: "book", title: "Fundamentals of Astrodynamics", description: "The legendary US Air Force Academy textbook by Roger R. Bate, Donald D. Mueller and Jerry E. White. It walks young readers from Newton's laws all the way to interplanetary trajectories with worked examples on conic orbits, ground tracks, Hohmann transfers, plane changes and rendezvous geometry. Used by NASA engineers and university students for over fifty years, it is still the friendliest deep dive into how spaceships actually move." },
      { type: "audiobook", title: "Orbit: A Listener's Guide", description: "A friendly 2-hour narrated tour of how things stay in orbit — from why the ISS does not fall down, to elliptical orbits, escape velocity, gravity assists and station-keeping burns. Perfect listening for car rides or bedtime, with sound effects from real launches and chapter-by-chapter Q&A breaks for curious kids.\n\nPart two goes far deeper. Chapter by chapter the narrator rebuilds orbital mechanics from first principles, pausing to explain every new word the moment it appears, then showing the same idea again through a real mission that depended on it. You will hear archive audio from launch control, engineers describing the night a problem almost stopped everything, and calm walkthroughs of the numbers behind each decision, so the science never feels like a list of facts to memorise but like a story with reasons behind every step.\n\nThe final stretch turns listening into doing. Guided thinking breaks invite you to predict what happens next before the narrator reveals the answer, simple at-home activities let you feel orbital mechanics for yourself, and a closing spoken review pulls every chapter together into one clear picture. By the end you will be able to explain orbital mechanics confidently in your own words, connect it to the other astronaut training topics in this journey, and know exactly which book, video and course to open next.", duration: "2h 15m" },
    ],
  },
  {
    id: "rocket-propulsion",
    title: "Rocket Propulsion",
    icon: "🚀",
    category: "Engineering",
    summary: "How rockets generate thrust to escape Earth's gravity and travel between worlds.",
    whyItMatters: "Choosing the right engine determines payload, range, and mission success.",
    keyConcepts: ["Tsiolkovsky Equation", "Specific Impulse", "Liquid vs Solid Fuel", "Ion Drives", "Staging"],
    resources: [
      { type: "video", title: "How Rockets Work — Saturn V to Starship", description: "Animated breakdown of rocket engines.", duration: "22 min" },
      { type: "book", title: "Ignition! by John D. Clark", description: "John D. Clark's hilarious and sometimes terrifying chronicle of the chemists who invented modern rocket fuels. It covers kerosene, hydrogen, hydrazine, the dangers of fluorine compounds, and the Cold War race to find better propellants. Full of personal stories and lab-bench disasters that make rocket chemistry come alive for budding engineers." },
      { type: "audiobook", title: "The Rocket Eternal", description: "A 5-hour audio adventure from black-powder fire arrows in ancient China, through V-2 rockets, the Saturn V Moon program and the Space Shuttle main engines, all the way to SpaceX's Merlin and Raptor, ion drives and dreams of nuclear thermal propulsion. Includes interviews with engine test engineers and the unmistakable roar of static-fire tests.\n\nPart two goes far deeper. Chapter by chapter the narrator rebuilds rocket propulsion from first principles, pausing to explain every new word the moment it appears, then showing the same idea again through a real mission that depended on it. You will hear archive audio from launch control, engineers describing the night a problem almost stopped everything, and calm walkthroughs of the numbers behind each decision, so the science never feels like a list of facts to memorise but like a story with reasons behind every step.\n\nThe final stretch turns listening into doing. Guided thinking breaks invite you to predict what happens next before the narrator reveals the answer, simple at-home activities let you feel rocket propulsion for yourself, and a closing spoken review pulls every chapter together into one clear picture. By the end you will be able to explain rocket propulsion confidently in your own words, connect it to the other astronaut training topics in this journey, and know exactly which book, video and course to open next.", duration: "5h" },
    ],
  },
  {
    id: "spacecraft-systems",
    title: "Spacecraft Systems",
    icon: "🛠️",
    category: "Engineering",
    summary: "Power, thermal, life support, and avionics systems that keep a spacecraft alive.",
    whyItMatters: "Astronauts must diagnose and repair failures with no help on the way.",
    keyConcepts: ["ECLSS", "Solar Arrays", "Thermal Control", "Avionics", "Redundancy"],
    resources: [
      { type: "video", title: "Inside the ISS Life Support System", description: "Tour of how the station recycles air & water.", duration: "15 min" },
      { type: "book", title: "Human Spaceflight: Mission Analysis & Design", description: "Edited by Wiley Larson and Linda Pranke, this is the encyclopedia astronaut-system designers actually keep on their desks. Chapters cover life support, thermal control, power, avionics, structures, EVA suits, mission planning and crew safety — written so a curious teenager can follow the diagrams and trace every wire from solar panel to spacesuit." },
      { type: "audiobook", title: "Riding Rockets by Mike Mullane", description: "Astronaut Mike Mullane narrates 13 hours of stories about flying the Space Shuttle: how every system worked, what failed, and how the crew kept it all running. A funny, honest look behind the panels of one of the most complex machines ever built.\n\nPart two goes far deeper. Chapter by chapter the narrator rebuilds spacecraft systems from first principles, pausing to explain every new word the moment it appears, then showing the same idea again through a real mission that depended on it. You will hear archive audio from launch control, engineers describing the night a problem almost stopped everything, and calm walkthroughs of the numbers behind each decision, so the science never feels like a list of facts to memorise but like a story with reasons behind every step.\n\nThe final stretch turns listening into doing. Guided thinking breaks invite you to predict what happens next before the narrator reveals the answer, simple at-home activities let you feel spacecraft systems for yourself, and a closing spoken review pulls every chapter together into one clear picture. By the end you will be able to explain spacecraft systems confidently in your own words, connect it to the other astronaut training topics in this journey, and know exactly which book, video and course to open next.", duration: "13h" },
      { type: "article", title: "NASA Systems Engineering Handbook", description: "Free PDF from NASA." },
    ],
  },
  {
    id: "eva-spacewalks",
    title: "EVA & Spacewalks",
    icon: "👨‍🚀",
    category: "Operations",
    summary: "Extravehicular activity — working outside the spacecraft in a pressurized suit.",
    whyItMatters: "Spacewalks repair satellites, install hardware, and explore alien surfaces.",
    keyConcepts: ["EMU Suit", "Pre-breathe Protocol", "Tethers & SAFER", "Tool Management", "Suit Fit"],
    resources: [
      { type: "video", title: "A Spacewalk in 360° — NASA", description: "Immersive POV of an ISS EVA.", duration: "12 min" },
      { type: "book", title: "Spacewalker by Jerry Ross", description: "Jerry Ross flew on the Space Shuttle seven times and performed nine spacewalks helping build the International Space Station. He shares what it feels like to float outside in a pressure suit, how astronauts train underwater for years in the giant Neutral Buoyancy Lab, the tools they invent, and the moments when something goes wrong 400 km above Earth." },
      { type: "audiobook", title: "Walking in Space", description: "A 6.5-hour narrated history of every famous spacewalk: Alexei Leonov's first risky float in 1965, Ed White's Gemini 4 walk, the Apollo Moon EVAs, Hubble repair missions, and ISS construction. Each chapter ends with a how-it-felt segment based on the astronaut's own words and original mission audio.\n\nPart two goes far deeper. Chapter by chapter the narrator rebuilds eva & spacewalks from first principles, pausing to explain every new word the moment it appears, then showing the same idea again through a real mission that depended on it. You will hear archive audio from launch control, engineers describing the night a problem almost stopped everything, and calm walkthroughs of the numbers behind each decision, so the science never feels like a list of facts to memorise but like a story with reasons behind every step.\n\nThe final stretch turns listening into doing. Guided thinking breaks invite you to predict what happens next before the narrator reveals the answer, simple at-home activities let you feel eva & spacewalks for yourself, and a closing spoken review pulls every chapter together into one clear picture. By the end you will be able to explain eva & spacewalks confidently in your own words, connect it to the other astronaut training topics in this journey, and know exactly which book, video and course to open next.", duration: "6h 30m" },
    ],
  },
  {
    id: "space-medicine",
    title: "Space Medicine & Physiology",
    icon: "🩺",
    category: "Health",
    summary: "How microgravity, radiation, and isolation affect the human body.",
    whyItMatters: "Long missions require crews who can stay healthy for months or years.",
    keyConcepts: ["Bone Density Loss", "Fluid Shift", "Radiation Dose", "SANS Eye Syndrome", "Countermeasures"],
    resources: [
      { type: "video", title: "What Happens to Your Body in Space", description: "Scott Kelly's twin study explained.", duration: "10 min" },
      { type: "book", title: "Endurance by Scott Kelly", description: "Scott Kelly's gripping account of his 340-day mission aboard the ISS — the science of how his body changed, life with cosmonaut Mikhail Kornienko, the smell of space, drinking recycled water, watching 16 sunrises a day, and the emotional toll of being away from family. NASA used this mission to plan future Mars trips." },
      { type: "audiobook", title: "Packing for Mars by Mary Roach", description: "Mary Roach's 8-hour audiobook is laugh-out-loud funny while teaching real science about going to the bathroom in zero gravity, eating space food, motion sickness, smells, and what happens to bones and muscles after months in orbit. Backed by interviews with astronauts, flight surgeons and weird-science researchers around the world.\n\nPart two goes far deeper. Chapter by chapter the narrator rebuilds space medicine & physiology from first principles, pausing to explain every new word the moment it appears, then showing the same idea again through a real mission that depended on it. You will hear archive audio from launch control, engineers describing the night a problem almost stopped everything, and calm walkthroughs of the numbers behind each decision, so the science never feels like a list of facts to memorise but like a story with reasons behind every step.\n\nThe final stretch turns listening into doing. Guided thinking breaks invite you to predict what happens next before the narrator reveals the answer, simple at-home activities let you feel space medicine & physiology for yourself, and a closing spoken review pulls every chapter together into one clear picture. By the end you will be able to explain space medicine & physiology confidently in your own words, connect it to the other astronaut training topics in this journey, and know exactly which book, video and course to open next.", duration: "8h" },
    ],
  },
  {
    id: "astronomy-navigation",
    title: "Astronomy & Navigation",
    icon: "🌌",
    category: "Science",
    summary: "Reading the stars and using celestial references to navigate space.",
    whyItMatters: "GPS does not work past Earth orbit — astronauts use star trackers and sextants.",
    keyConcepts: ["Star Trackers", "Celestial Coordinates", "Sextant Use", "Pulsar Navigation", "Constellations"],
    resources: [
      { type: "video", title: "Navigating by the Stars", description: "Apollo-era sextant techniques.", duration: "14 min" },
      { type: "book", title: "NightWatch by Terence Dickinson", description: "Terence Dickinson's beloved beginner-to-intermediate astronomy guide. Star charts for every season, advice on choosing your first telescope or binoculars, lunar maps, planet observing tips, deep-sky targets, and astrophotography basics — all in language young stargazers can follow on a backyard observing night." },
      { type: "audiobook", title: "The Sky at Night", description: "A 4-hour, 20-minute narrated sky tour. Each chapter walks you through one constellation: its myth, the stars that form it, its brightest deep-sky objects, and exactly when and where to look. Includes simple breathing-and-observing exercises so kids can stargaze calmly even from a city balcony.\n\nPart two goes far deeper. Chapter by chapter the narrator rebuilds astronomy & navigation from first principles, pausing to explain every new word the moment it appears, then showing the same idea again through a real mission that depended on it. You will hear archive audio from launch control, engineers describing the night a problem almost stopped everything, and calm walkthroughs of the numbers behind each decision, so the science never feels like a list of facts to memorise but like a story with reasons behind every step.\n\nThe final stretch turns listening into doing. Guided thinking breaks invite you to predict what happens next before the narrator reveals the answer, simple at-home activities let you feel astronomy & navigation for yourself, and a closing spoken review pulls every chapter together into one clear picture. By the end you will be able to explain astronomy & navigation confidently in your own words, connect it to the other astronaut training topics in this journey, and know exactly which book, video and course to open next.", duration: "4h 20m" },
    ],
  },
  {
    id: "survival-training",
    title: "Survival Training",
    icon: "🏕️",
    category: "Survival",
    summary: "Land, sea, and wilderness survival in case of off-target re-entry.",
    whyItMatters: "Soyuz capsules can land anywhere from Siberia to the Pacific.",
    keyConcepts: ["Cold Weather Survival", "Water Survival", "Shelter Building", "Signaling", "First Aid"],
    resources: [
      { type: "video", title: "Astronaut Winter Survival Training", description: "Inside Star City's legendary course.", duration: "20 min" },
      { type: "book", title: "SAS Survival Handbook", description: "John Lofty Wiseman's classic survival manual — the same book Russian cosmonauts carry in their Soyuz return capsule in case they land off-target. It covers shelter, fire, water, signaling, first aid, navigation by the stars, and surviving extreme cold or desert heat with detailed illustrations on every page." },
      { type: "audiobook", title: "The Will to Survive", description: "A 7-hour collection of real survival stories — Apollo 13, the Soyuz 23 ice-lake landing, polar explorers, mountaineers and pilots — paired with the psychological lessons astronauts apply: stay calm, work the problem, communicate clearly, and trust your training when everything goes wrong.\n\nPart two goes far deeper. Chapter by chapter the narrator rebuilds survival training from first principles, pausing to explain every new word the moment it appears, then showing the same idea again through a real mission that depended on it. You will hear archive audio from launch control, engineers describing the night a problem almost stopped everything, and calm walkthroughs of the numbers behind each decision, so the science never feels like a list of facts to memorise but like a story with reasons behind every step.\n\nThe final stretch turns listening into doing. Guided thinking breaks invite you to predict what happens next before the narrator reveals the answer, simple at-home activities let you feel survival training for yourself, and a closing spoken review pulls every chapter together into one clear picture. By the end you will be able to explain survival training confidently in your own words, connect it to the other astronaut training topics in this journey, and know exactly which book, video and course to open next.", duration: "7h" },
    ],
  },
  {
    id: "robotics-arm",
    title: "Robotics & Canadarm",
    icon: "🤖",
    category: "Operations",
    summary: "Operating robotic arms to capture cargo and assemble structures.",
    whyItMatters: "Robotic arms extend an astronaut's reach across the entire spacecraft exterior.",
    keyConcepts: ["Canadarm2", "Joint Control", "Berthing", "Camera Views", "Force Feedback"],
    resources: [
      { type: "video", title: "Flying Canadarm2 — CSA", description: "Hadfield demos the robotic arm.", duration: "8 min" },
      { type: "book", title: "Canadarm and Collaboration", description: "How a small Canadian engineering team built the Shuttle Remote Manipulator System (Canadarm), then Canadarm2 and Dextre on the ISS. Full of behind-the-scenes stories about how teleoperated robotic arms catch visiting cargo ships, swap broken refrigerator-sized batteries, and assemble billion-dollar modules in orbit." },
      { type: "audiobook", title: "An Astronaut's Guide to Life on Earth", description: "Commander Chris Hadfield reads his own 9-hour memoir, sharing his journey from a Canadian farm boy who watched Apollo 11 to commanding the ISS. Lessons on goal-setting, fear, teamwork, and the famous viral Space Oddity video — perfect inspiration for kids who dream of flying spacecraft one day.\n\nPart two goes far deeper. Chapter by chapter the narrator rebuilds robotics & canadarm from first principles, pausing to explain every new word the moment it appears, then showing the same idea again through a real mission that depended on it. You will hear archive audio from launch control, engineers describing the night a problem almost stopped everything, and calm walkthroughs of the numbers behind each decision, so the science never feels like a list of facts to memorise but like a story with reasons behind every step.\n\nThe final stretch turns listening into doing. Guided thinking breaks invite you to predict what happens next before the narrator reveals the answer, simple at-home activities let you feel robotics & canadarm for yourself, and a closing spoken review pulls every chapter together into one clear picture. By the end you will be able to explain robotics & canadarm confidently in your own words, connect it to the other astronaut training topics in this journey, and know exactly which book, video and course to open next.", duration: "9h 11m" },
    ],
  },
  {
    id: "mission-planning",
    title: "Mission Planning",
    icon: "📋",
    category: "Mission",
    summary: "Timelines, contingencies, and the art of flying a mission from the ground up.",
    whyItMatters: "Every minute in orbit is scripted — and every script needs a backup.",
    keyConcepts: ["Flight Rules", "Timeline Planning", "Contingency Ops", "Crew Scheduling", "Mission Control"],
    resources: [
      { type: "video", title: "A Day in Mission Control", description: "Behind the consoles at Houston.", duration: "25 min" },
      { type: "book", title: "Failure Is Not an Option by Gene Kranz", description: "Flight Director Gene Kranz takes you inside Houston's Mission Control room — the consoles, the headsets, the white vest he wore for Apollo 13. Detailed accounts of how flight controllers solved life-or-death problems with paper, pencils and slide rules in real time, and how the culture of tough-and-competent was born." },
      { type: "audiobook", title: "Lost Moon by Jim Lovell", description: "A 12-hour deep-dive narrated retelling of Apollo 13 by commander Jim Lovell. From the explosion on the way to the Moon to the freezing Lunar Module lifeboat, the carbon-dioxide filter fix, and the heart-stopping reentry — a masterclass in calm problem-solving every future astronaut should hear.\n\nPart two goes far deeper. Chapter by chapter the narrator rebuilds mission planning from first principles, pausing to explain every new word the moment it appears, then showing the same idea again through a real mission that depended on it. You will hear archive audio from launch control, engineers describing the night a problem almost stopped everything, and calm walkthroughs of the numbers behind each decision, so the science never feels like a list of facts to memorise but like a story with reasons behind every step.\n\nThe final stretch turns listening into doing. Guided thinking breaks invite you to predict what happens next before the narrator reveals the answer, simple at-home activities let you feel mission planning for yourself, and a closing spoken review pulls every chapter together into one clear picture. By the end you will be able to explain mission planning confidently in your own words, connect it to the other astronaut training topics in this journey, and know exactly which book, video and course to open next.", duration: "12h" },
    ],
  },
  {
    id: "psychology-teamwork",
    title: "Psychology & Teamwork",
    icon: "🧠",
    category: "Health",
    summary: "Living in confined spaces with the same crew for months on end.",
    whyItMatters: "Mental resilience and teamwork can make or break a long-duration mission.",
    keyConcepts: ["Group Dynamics", "Conflict Resolution", "Isolation Management", "Mindfulness", "Cultural Awareness"],
    resources: [
      { type: "video", title: "The Psychology of Isolation", description: "Lessons from Antarctic & ISS crews.", duration: "16 min" },
      { type: "book", title: "The Right Stuff by Tom Wolfe", description: "Tom Wolfe's classic profile of the test pilots who became the Mercury Seven. It captures the courage, ego, humour and discipline behind Project Mercury, with vivid scenes of supersonic test flights at Edwards Air Force Base and the political circus that surrounded America's first astronauts." },
      { type: "audiobook", title: "Off the Planet", description: "Jerry Linenger's 10-hour first-hand account of his 1997 Mir mission — including the worst fire ever on a crewed spacecraft, a near-collision with a cargo ship, and what it is like to live in an aging Russian station. A real-world lesson in resilience, language barriers, and trust between crewmates from very different cultures.\n\nPart two goes far deeper. Chapter by chapter the narrator rebuilds psychology & teamwork from first principles, pausing to explain every new word the moment it appears, then showing the same idea again through a real mission that depended on it. You will hear archive audio from launch control, engineers describing the night a problem almost stopped everything, and calm walkthroughs of the numbers behind each decision, so the science never feels like a list of facts to memorise but like a story with reasons behind every step.\n\nThe final stretch turns listening into doing. Guided thinking breaks invite you to predict what happens next before the narrator reveals the answer, simple at-home activities let you feel psychology & teamwork for yourself, and a closing spoken review pulls every chapter together into one clear picture. By the end you will be able to explain psychology & teamwork confidently in your own words, connect it to the other astronaut training topics in this journey, and know exactly which book, video and course to open next.", duration: "10h" },
    ],
  },
  {
    id: "planetary-geology",
    title: "Planetary Geology",
    icon: "🪨",
    category: "Science",
    summary: "Reading rocks and landscapes to understand other worlds.",
    whyItMatters: "Future Moon and Mars crews will be field geologists in spacesuits.",
    keyConcepts: ["Igneous Rocks", "Regolith", "Impact Craters", "Sample Collection", "Stratigraphy"],
    resources: [
      { type: "video", title: "Apollo Geology Training", description: "How NASA turned pilots into geologists.", duration: "19 min" },
      { type: "book", title: "To a Rocky Moon by Don Wilhelms", description: "Don Wilhelms helped train the Apollo astronauts to recognize Moon rocks. His detailed history covers every Apollo landing site, what we learned about lunar geology, the formation of the Moon, and how those returned samples still shape today's Artemis program and our search for water ice at the lunar south pole." },
      { type: "audiobook", title: "The Planets by Andrew Cohen", description: "A 9-hour audio companion to the BBC The Planets series narrated by Andrew Cohen and Brian Cox. Each chapter visits one world — Mercury's iron heart, Venus's runaway greenhouse, Mars's ancient rivers, the gas giants and the icy outer worlds — using the latest probe data to retell our solar system's story.\n\nPart two goes far deeper. Chapter by chapter the narrator rebuilds planetary geology from first principles, pausing to explain every new word the moment it appears, then showing the same idea again through a real mission that depended on it. You will hear archive audio from launch control, engineers describing the night a problem almost stopped everything, and calm walkthroughs of the numbers behind each decision, so the science never feels like a list of facts to memorise but like a story with reasons behind every step.\n\nThe final stretch turns listening into doing. Guided thinking breaks invite you to predict what happens next before the narrator reveals the answer, simple at-home activities let you feel planetary geology for yourself, and a closing spoken review pulls every chapter together into one clear picture. By the end you will be able to explain planetary geology confidently in your own words, connect it to the other astronaut training topics in this journey, and know exactly which book, video and course to open next.", duration: "9h" },
    ],
  },
  {
    id: "communications",
    title: "Communications & Networks",
    icon: "📡",
    category: "Engineering",
    summary: "Radios, deep space network, and keeping in touch across millions of kilometers.",
    whyItMatters: "Without comms, an astronaut is truly alone.",
    keyConcepts: ["DSN", "Light-Lag Delay", "Antenna Pointing", "Encryption", "Bandwidth"],
    resources: [
      { type: "video", title: "How NASA Talks to Voyager", description: "The Deep Space Network explained.", duration: "11 min" },
      { type: "book", title: "Communications Satellite Handbook", description: "The go-to reference for how spacecraft talk to Earth: antenna design, link budgets, frequency bands (S, X, Ka), the Deep Space Network, modulation schemes, error correction, and the basics of how a rover on Mars can send pictures back to your phone. Surprisingly readable for older kids who like radios and antennas." },
      { type: "audiobook", title: "The Interstellar Age by Jim Bell", description: "A 10-hour narrated history of the Voyager missions and the engineers who keep talking to two spacecraft now in interstellar space. Explains light-time delay, giant dish antennas, and the Golden Record — humanity's longest-distance phone call.\n\nPart two goes far deeper. Chapter by chapter the narrator rebuilds communications & networks from first principles, pausing to explain every new word the moment it appears, then showing the same idea again through a real mission that depended on it. You will hear archive audio from launch control, engineers describing the night a problem almost stopped everything, and calm walkthroughs of the numbers behind each decision, so the science never feels like a list of facts to memorise but like a story with reasons behind every step.\n\nThe final stretch turns listening into doing. Guided thinking breaks invite you to predict what happens next before the narrator reveals the answer, simple at-home activities let you feel communications & networks for yourself, and a closing spoken review pulls every chapter together into one clear picture. By the end you will be able to explain communications & networks confidently in your own words, connect it to the other astronaut training topics in this journey, and know exactly which book, video and course to open next.", duration: "10h" },
      { type: "article", title: "NASA SCaN Overview", description: "Free guide to space communications." },
    ],
  },
];

export const astronautTopics: AstronautTopic[] = rawAstronautTopics.map((topic) => ({
  ...topic,
  resources: topic.resources.map((resource) => resource.type !== 'audiobook' ? resource : ({
    ...resource,
    title: `${topic.title}: Complete Audio Lesson`,
    description: `Lesson one builds the foundation. ${topic.summary} We begin with ${topic.keyConcepts.slice(0, 2).join(' and ')}, define each idea in simple language, and use a clear space-mission example to show exactly how it works. Pause after each explanation and try to describe the idea in your own words before continuing.\n\nLesson two connects the system. You will learn ${topic.keyConcepts.slice(2).join(', ')}, how these concepts affect one another, and why astronauts and mission teams depend on them. ${topic.whyItMatters} The guided examples move from an everyday comparison to a real operational decision, followed by short prediction questions with spoken answers.\n\nLesson three is practice and review. Follow a complete mission scenario, choose what should happen at each step, and check your reasoning against the explanation. The final recap revisits ${topic.keyConcepts.join(', ')}, gives you a five-question self-check, and leaves you able to teach the topic confidently to someone else.`,
  })),
}));

export const topicCategories = ['All', 'Science', 'Engineering', 'Health', 'Operations', 'Survival', 'Mission'] as const;
