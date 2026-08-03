import nainaVoice from '@/assets/lectures/naina.mp3.asset.json';
import anandVoice from '@/assets/lectures/anand.mp3.asset.json';
import sanaVoice from '@/assets/lectures/sana.mp3.asset.json';
import krishnaVoice from '@/assets/lectures/krishna.mp3.asset.json';
import myraVoice from '@/assets/lectures/myra.mp3.asset.json';
import rohitVoice from '@/assets/lectures/rohit.mp3.asset.json';
import bhoomikaVoice from '@/assets/lectures/bhoomika.mp3.asset.json';
import dhurvVoice from '@/assets/lectures/dhurv.mp3.asset.json';
import mayaVoice from '@/assets/lectures/maya.mp3.asset.json';
import rajuVoice from '@/assets/lectures/raju.mp3.asset.json';
import sunnysinghVoice from '@/assets/lectures/sunnysingh.mp3.asset.json';
import buntyVoice from '@/assets/lectures/bunty.mp3.asset.json';
import meeshaVoice from '@/assets/lectures/meesha.mp3.asset.json';

export type VoiceKey = 'naina' | 'anand' | 'sana' | 'krishna' | 'myra' | 'rohit' | 'bhoomika' | 'dhurv' | 'maya' | 'raju' | 'sunnysingh' | 'bunty' | 'meesha';

export const VOICES: Record<VoiceKey, { name: string; url: string }> = {
  naina: { name: 'Naina Maam', url: nainaVoice.url },
  anand: { name: 'Anand Sir', url: anandVoice.url },
  sana: { name: 'Sana Maam', url: sanaVoice.url },
  krishna: { name: 'Krishna Sir', url: krishnaVoice.url },
  myra: { name: 'Myra Maam', url: myraVoice.url },
  rohit: { name: 'Rohit Sir', url: rohitVoice.url },
  bhoomika: { name: 'Bhoomika Maam', url: bhoomikaVoice.url },
  dhurv: { name: 'Dhruv Sir', url: dhurvVoice.url },
  maya: { name: 'Maya Maam', url: mayaVoice.url },
  raju: { name: 'Raju Sir', url: rajuVoice.url },
  sunnysingh: { name: 'Sunny Sir', url: sunnysinghVoice.url },
  bunty: { name: 'Bunty Sir', url: buntyVoice.url },
  meesha: { name: 'Meesha Maam', url: meeshaVoice.url },
};

export interface Faculty {
  id: number;
  name: string;
  role: string;
  topics: string[];
  voice: VoiceKey;
}

export const faculty: Faculty[] = [
  { id: 1, name: 'Arnav Sharma', role: 'Astrophysics Educator', topics: ['Galaxies & Cosmology', 'Black Holes', 'Space Telescopes', 'Star Formation'], voice: 'naina' },
  { id: 2, name: 'Ishita Verma', role: 'Space Science Communicator', topics: ['Planetary Science', 'Space Missions', 'Science Communication'], voice: 'anand' },
  { id: 3, name: 'Karan Mehta', role: 'Rocketry Mentor', topics: ['Rocket Design', 'Propulsion', 'Aerospace Basics', 'Model Rockets'], voice: 'sana' },
  { id: 4, name: 'Rohit Nair', role: 'Space Systems Engineer', topics: ['Satellite Systems', 'Launch Vehicles', 'Space Tech', 'Navigation & GPS'], voice: 'krishna' },
  { id: 5, name: 'Devansh Rai', role: 'Astrophotography Guide', topics: ['Astrophotography', 'Deep Sky Imaging', 'Telescopes', 'Night Sky Wonders'], voice: 'myra' },
  { id: 6, name: 'Gurpreet Singh', role: 'Astronomy Educator', topics: ['Solar System', 'Exoplanets', 'Astronomy Basics', 'Space History'], voice: 'rohit' },
  { id: 7, name: 'Meera Iyer', role: 'Science Storyteller', topics: ['Cosmic Mysteries', 'Space Exploration', 'Mythology & Space', 'Public Speaking'], voice: 'bhoomika' },
  { id: 8, name: 'Aditya Kulkarni', role: 'Planetary Scientist', topics: ['Planetary Geology', 'Mars Exploration', 'Moons & Satellites', 'Space Data Analysis'], voice: 'dhurv' },
  { id: 9, name: 'Sneha Patil', role: 'STEM Educator', topics: ['STEM Teaching', 'Science Experiments', 'Student Mentorship', 'Learning Innovation'], voice: 'maya' },
  { id: 10, name: 'Raghav Bansal', role: 'Space Entrepreneurship Mentor', topics: ['New Space Startups', 'Satellites', 'ISRO & NASA', 'Innovation & Tech'], voice: 'raju' },
  { id: 11, name: 'Aanya Deshpande', role: 'Black Hole Explorer', topics: ['Black Holes', 'Gravitational Waves', 'High Energy Physics', 'Theoretical Physics'], voice: 'sunnysingh' },
  { id: 12, name: 'Nikhil Joshi', role: 'Space Content Creator', topics: ['Space Education', 'YouTube & Media', 'Visual Storytelling', 'Making Space Simple'], voice: 'bunty' },
  { id: 13, name: 'Zoya Khan', role: 'Future Scientist Mentor', topics: ['Research Guidance', 'Career Mentorship', 'Girls in STEM', 'Future Technologies'], voice: 'meesha' },
  { id: 14, name: 'Kabir Malhotra', role: 'Space Tech Enthusiast', topics: ['Robotics in Space', 'AI & Space Tech', 'Space Instruments', 'CubeSats'], voice: 'naina' },
  { id: 15, name: 'Tanvi Shah', role: 'Astrobiology Researcher', topics: ['Life Beyond Earth', 'Microbiology', 'Extremophiles', 'Space Biology'], voice: 'anand' },
  { id: 16, name: 'Yashwant Rao', role: 'Orbital Mechanics Tutor', topics: ['Orbital Dynamics', 'Space Math', 'Trajectory Analysis', 'Simulation & Modeling'], voice: 'sana' },
  { id: 17, name: 'Diya Menon', role: 'Science Communicator', topics: ['Space Outreach', 'Science Writing', 'Educational Content', 'Community Building'], voice: 'krishna' },
  { id: 18, name: 'Sai Kiran', role: 'Launch Operations Analyst', topics: ['Launch Operations', 'Countdown Systems', 'Risk Analysis', 'Mission Assurance'], voice: 'myra' },
  { id: 19, name: 'Ananya Bose', role: 'Cosmology Enthusiast', topics: ['Big Bang Theory', 'Dark Matter', 'Dark Energy', 'Cosmic Evolution'], voice: 'rohit' },
  { id: 20, name: 'Harsh Vardhan', role: 'Satellite Design Mentor', topics: ['Satellite Design', 'Communication Systems', 'Payloads', 'Mission Design'], voice: 'bhoomika' },
  { id: 21, name: 'Krishna Reddy', role: 'Space Robotics Mentor', topics: ['Robotics', 'Autonomous Systems', 'Rovers & Landers', 'Control Systems'], voice: 'dhurv' },
  { id: 22, name: 'Pooja Nambiar', role: 'Astronomy Photographer', topics: ['Night Sky Photography', 'Image Processing', 'Telescope Handling', 'Celestial Landscapes'], voice: 'maya' },
  { id: 23, name: 'Manav Sood', role: 'Space Physics Mentor', topics: ['Plasma Physics', 'Solar Physics', 'Magnetospheres', 'Space Weather'], voice: 'raju' },
  { id: 24, name: 'Neha Reddy', role: 'Educational Psychologist', topics: ['Learning Strategies', 'Student Motivation', 'STEM Education', 'Mentorship'], voice: 'sunnysingh' },
  { id: 25, name: 'Arjun Menon', role: 'Avionics Engineer', topics: ['Avionics Systems', 'Flight Computers', 'Sensors & Actuators', 'Embedded Systems'], voice: 'bunty' },
  { id: 26, name: 'Simran Kaur', role: 'Space Outreach Lead', topics: ['Workshops', 'Events & Talks', 'STEM Outreach', 'Volunteer Programs'], voice: 'meesha' },
  { id: 27, name: 'Om Patwardhan', role: 'Exoplanet Researcher', topics: ['Exoplanets', 'Transit Method', 'Habitable Worlds', 'Alien Atmospheres'], voice: 'naina' },
  { id: 28, name: 'Atharv Desai', role: 'Earth Observation Specialist', topics: ['Weather Satellites', 'Remote Sensing', 'Climate Monitoring', 'Disaster Management'], voice: 'anand' },
  { id: 29, name: 'Ritika Malhotra', role: 'Human Spaceflight Mentor', topics: ['Astronaut Training', 'Space Habitats', 'Life Support Systems', 'Long Duration Missions'], voice: 'sana' },
  { id: 30, name: 'Vikram Iyer', role: 'Deep Space Communicator', topics: ['DSN & Communication', 'Signal Processing', 'Radio Astronomy', 'Interstellar Missions'], voice: 'krishna' },
  { id: 31, name: 'Leena Thomas', role: 'Space Education Designer', topics: ['Creative Learning', 'DIY Experiments', 'Curriculum Design', 'EdTech & Innovation'], voice: 'myra' },
  { id: 32, name: 'Rajveer Singh', role: 'Astronaut Training Mentor', topics: ['Astronaut Training', 'Physical Conditioning', 'Psychology in Space', 'Mission Preparation'], voice: 'rohit' },
  { id: 33, name: 'Ira Mukherjee', role: 'Space Data Analyst', topics: ['Data Analysis', 'Machine Learning', 'Pattern Recognition', 'Scientific Insights'], voice: 'bhoomika' },
  { id: 34, name: 'Siddharth Jain', role: 'Earth Explorer Mentor', topics: ['Earth Observation', 'Geospatial Analysis', 'Environmental Tech', 'Sustainable Earth'], voice: 'dhurv' },
  { id: 35, name: 'Dev Malhotra', role: 'Human Spaceflight Mentor', topics: ['System Engineering', 'Power Systems', 'Spacecraft Design', 'Mission Architecture'], voice: 'maya' },
  { id: 36, name: 'Mudit Chawla', role: 'AI in Space Mentor', topics: ['Artificial Intelligence', 'Predictive Modeling', 'Autonomous Systems', 'AI for Space'], voice: 'raju' },
  { id: 37, name: 'Aarush Kapoor', role: 'Deep Space Astronomy Mentor', topics: ['Interstellar Space', 'Deep Sky Objects', 'Cosmic Distances', 'Nebulae'], voice: 'sunnysingh' },
  { id: 38, name: 'Kiara Sen', role: 'Galaxy Evolution Mentor', topics: ['Spiral Galaxies', 'Elliptical Galaxies', 'Galaxy Collisions', 'Local Group'], voice: 'bunty' },
  { id: 39, name: 'Dhruv Narayanan', role: 'Exoplanet Discovery Specialist', topics: ['Exoplanets', 'Habitable Worlds', 'Transit Method', 'Alien Worlds'], voice: 'meesha' },
  { id: 40, name: 'Anika Bose', role: 'Black Hole Physics Mentor', topics: ['Event Horizon', 'Hawking Radiation', 'Supermassive BHs', 'Accretion Disks'], voice: 'naina' },
  { id: 41, name: 'Rohan Chatterjee', role: 'Cosmology Mentor', topics: ['Big Bang', 'Dark Energy', 'Dark Matter', 'Cosmic Expansion'], voice: 'anand' },
  { id: 42, name: 'Myra Thomas', role: 'Radio Astronomy Educator', topics: ['Pulsars', 'Radio Galaxies', 'Fast Radio Bursts', 'Giant Radio Telescopes'], voice: 'sana' },
  { id: 43, name: 'Eesha Kapoor', role: 'Badge Sparks Scientist', topics: ['Voyager Missions', 'New Horizons', 'Interstellar Probes', 'Space Exploration'], voice: 'krishna' },
  { id: 44, name: 'Vivaan Krishnan', role: 'Deep Space Mission Mentor', topics: ['Voyager Missions', 'New Horizons', 'Interstellar Probes', 'Space Exploration'], voice: 'myra' },
  { id: 45, name: 'Sana Iqbal', role: 'Stellar Evolution Specialist', topics: ['Star Formation', 'Red Giants', 'Supernovae', 'Neutron Stars'], voice: 'rohit' },
  { id: 46, name: 'Arvind Pillai', role: 'Deep Space Telescope Mentor', topics: ['James Webb Telescope', 'Hubble Telescope', 'Infrared Astronomy', 'Space Observatories'], voice: 'bhoomika' },
  { id: 47, name: 'Naina Kulkarni', role: 'Astrobiology & Cosmic Life Mentor', topics: ['Alien Life', 'Biosignatures', 'Habitable Zones', 'Future Space Exploration'], voice: 'dhurv' },
  { id: 48, name: 'Nikita Sharma', role: 'Space Law & Policy Guide', topics: ['Space Treaties', 'Space Debris Policy', 'Commercial Space', 'Ethics in Space'], voice: 'maya' },
  { id: 49, name: 'Aryan Gupta', role: 'Mission Control Mentor', topics: ['Flight Operations', 'Telemetry', 'Anomaly Handling', 'Team Coordination'], voice: 'raju' },
  { id: 50, name: 'Priya Menon', role: 'Space Medicine Educator', topics: ['Microgravity Effects', 'Astronaut Health', 'Radiation Safety', 'Space Nutrition'], voice: 'sunnysingh' },
];

export interface Lecture {
  id: string;
  title: string;
  duration: string;
  summary: string;
}

export interface MoneyCourse {
  id: string;
  title: string;
  tagline: string;
  facultyId: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  weeks: number;
  originalPrice: string;
  gradient: string;
  outcomes: string[];
  lectures: Lecture[];
}

const L = (id: string, title: string, duration: string, summary: string): Lecture => ({ id, title, duration, summary });

export const moneyCourses: MoneyCourse[] = [
  {
    id: 'mc1', title: 'Astrophysics Masterclass', tagline: 'Galaxies, black holes and the deep universe, explained simply.',
    facultyId: 1, level: 'Advanced', weeks: 6, originalPrice: '₹4,999', gradient: 'from-indigo-500 to-violet-600',
    outcomes: ['Read a galaxy classification chart', 'Explain how black holes form', 'Understand telescope data'],
    lectures: [
      L('mc1-1', 'Welcome to the Deep Universe', '4 min', 'Your AI mentor introduces the course roadmap and how to study each week.'),
      L('mc1-2', 'How Galaxies Are Born', '5 min', 'Gas clouds, gravity, and the first stars that lit the cosmos.'),
      L('mc1-3', 'Black Holes: Beyond the Horizon', '6 min', 'Event horizons, singularities and what falling in would feel like.'),
      L('mc1-4', 'Reading the Sky With Telescopes', '5 min', 'From Hubble to James Webb — what each instrument reveals.'),
      L('mc1-5', 'Star Formation Lab', '5 min', 'A guided walkthrough of a stellar nursery in the Orion Nebula.'),
      L('mc1-6', 'Final Review & Exam Prep', '4 min', 'Recap of every module with quick-fire revision points.'),
    ],
  },
  {
    id: 'mc2', title: 'Rocket Science for Young Engineers', tagline: 'Build the mental blueprints of real launch vehicles.',
    facultyId: 3, level: 'Intermediate', weeks: 5, originalPrice: '₹3,999', gradient: 'from-orange-500 to-red-600',
    outcomes: ['Explain Newton\'s laws in rocketry', 'Compare solid vs liquid engines', 'Design a paper rocket'],
    lectures: [
      L('mc2-1', 'Why Rockets Fly', '4 min', 'Action, reaction and thrust explained with everyday examples.'),
      L('mc2-2', 'Inside a Rocket Engine', '6 min', 'Combustion chambers, nozzles and turbopumps.'),
      L('mc2-3', 'Staging & The Rocket Equation', '5 min', 'Why rockets drop pieces on the way up.'),
      L('mc2-4', 'Launch Day Operations', '5 min', 'Countdown, hold points and abort decisions.'),
      L('mc2-5', 'Build Your Own Model Rocket', '6 min', 'A safe step-by-step project you can do at home.'),
    ],
  },
  {
    id: 'mc3', title: 'Astrophotography Pro Course', tagline: 'Capture the night sky like an observatory.',
    facultyId: 5, level: 'Intermediate', weeks: 4, originalPrice: '₹3,499', gradient: 'from-sky-500 to-blue-700',
    outcomes: ['Set camera settings for stars', 'Stack deep-sky images', 'Plan a shoot by moon phase'],
    lectures: [
      L('mc3-1', 'Gear That Actually Matters', '5 min', 'Cameras, tripods and cheap starter setups.'),
      L('mc3-2', 'Exposure, ISO and the 500 Rule', '5 min', 'Getting sharp stars instead of trails.'),
      L('mc3-3', 'Deep Sky Stacking', '6 min', 'Turning many noisy frames into one clean nebula shot.'),
      L('mc3-4', 'Editing Your Cosmic Photo', '5 min', 'Curves, colour balance and honest processing.'),
    ],
  },
  {
    id: 'mc4', title: 'Planetary Science Deep Dive', tagline: 'Worlds, moons and the geology of other planets.',
    facultyId: 8, level: 'Intermediate', weeks: 5, originalPrice: '₹4,299', gradient: 'from-amber-500 to-orange-600',
    outcomes: ['Compare rocky and gas worlds', 'Read planetary surface maps', 'Explain Mars exploration goals'],
    lectures: [
      L('mc4-1', 'How Planets Form', '5 min', 'From dust disks to full-grown worlds.'),
      L('mc4-2', 'Volcanoes Beyond Earth', '5 min', 'Io, Venus and the tallest mountain in the solar system.'),
      L('mc4-3', 'Mars: The Next Frontier', '6 min', 'Rovers, water evidence and future colonies.'),
      L('mc4-4', 'Ocean Moons', '5 min', 'Europa and Enceladus and their hidden seas.'),
      L('mc4-5', 'Mission Design Workshop', '5 min', 'Plan your own planetary mission profile.'),
    ],
  },
  {
    id: 'mc5', title: 'Astrobiology: Hunting Alien Life', tagline: 'The science of life beyond Earth.',
    facultyId: 15, level: 'Beginner', weeks: 4, originalPrice: '₹2,999', gradient: 'from-emerald-500 to-teal-600',
    outcomes: ['Define a biosignature', 'Explain habitable zones', 'Evaluate alien-life claims'],
    lectures: [
      L('mc5-1', 'What Is Life, Really?', '4 min', 'The definitions scientists argue about.'),
      L('mc5-2', 'Extremophiles on Earth', '5 min', 'Creatures that survive acid, ice and radiation.'),
      L('mc5-3', 'Biosignatures in Alien Air', '5 min', 'How telescopes sniff distant atmospheres.'),
      L('mc5-4', 'Are We Alone? The Drake Equation', '5 min', 'Estimating civilizations with maths.'),
    ],
  },
  {
    id: 'mc6', title: 'Orbital Mechanics & Space Math', tagline: 'Learn to think in orbits and trajectories.',
    facultyId: 16, level: 'Advanced', weeks: 6, originalPrice: '₹4,799', gradient: 'from-cyan-500 to-blue-600',
    outcomes: ['Describe Kepler\'s laws', 'Plan a Hohmann transfer', 'Understand gravity assists'],
    lectures: [
      L('mc6-1', 'Kepler in 5 Minutes', '5 min', 'The three laws that rule every orbit.'),
      L('mc6-2', 'Orbits You Should Know', '5 min', 'LEO, GEO, polar and sun-synchronous.'),
      L('mc6-3', 'Transfers & Delta-V Budgets', '6 min', 'Moving between orbits with the least fuel.'),
      L('mc6-4', 'Gravity Assist Slingshots', '5 min', 'How Voyager stole speed from Jupiter.'),
      L('mc6-5', 'Simulating a Mission', '6 min', 'Building a trajectory step by step.'),
      L('mc6-6', 'Exam Workshop', '4 min', 'Solved problems and shortcuts.'),
    ],
  },
  {
    id: 'mc7', title: 'Satellites & Space Systems Engineering', tagline: 'How a spacecraft is actually built.',
    facultyId: 20, level: 'Intermediate', weeks: 5, originalPrice: '₹4,199', gradient: 'from-fuchsia-500 to-purple-600',
    outcomes: ['Name every satellite subsystem', 'Design a CubeSat payload', 'Explain ground station links'],
    lectures: [
      L('mc7-1', 'Anatomy of a Satellite', '5 min', 'Bus, payload, power and thermal control.'),
      L('mc7-2', 'Talking to Space', '5 min', 'Antennas, bands and link budgets.'),
      L('mc7-3', 'CubeSats: Small and Mighty', '6 min', 'How students build real satellites.'),
      L('mc7-4', 'Surviving Space', '5 min', 'Radiation, vacuum and temperature swings.'),
      L('mc7-5', 'Your Mission Proposal', '5 min', 'Writing a payload proposal that convinces reviewers.'),
    ],
  },
  {
    id: 'mc8', title: 'AI & Robotics in Space', tagline: 'Rovers, autonomy and machine learning off-world.',
    facultyId: 36, level: 'Advanced', weeks: 5, originalPrice: '₹4,599', gradient: 'from-lime-500 to-emerald-600',
    outcomes: ['Explain rover autonomy', 'Understand space AI limits', 'Design an autonomous task'],
    lectures: [
      L('mc8-1', 'Why Space Needs AI', '5 min', 'Light-lag and why rovers must think alone.'),
      L('mc8-2', 'How Rovers Drive Themselves', '6 min', 'Vision, hazard maps and path planning.'),
      L('mc8-3', 'Machine Learning on Telescope Data', '5 min', 'Finding exoplanets in noisy signals.'),
      L('mc8-4', 'Robotic Arms & Sample Handling', '5 min', 'Precision work millions of km away.'),
      L('mc8-5', 'Build an Autonomy Flowchart', '5 min', 'A guided design exercise.'),
    ],
  },
  {
    id: 'mc9', title: 'Cosmology: Big Bang to Dark Energy', tagline: 'The full story of the universe.',
    facultyId: 41, level: 'Advanced', weeks: 6, originalPrice: '₹4,899', gradient: 'from-violet-500 to-indigo-700',
    outcomes: ['Describe cosmic inflation', 'Explain redshift evidence', 'Compare dark matter theories'],
    lectures: [
      L('mc9-1', 'The First Second', '5 min', 'Inflation and the birth of matter.'),
      L('mc9-2', 'Cosmic Microwave Background', '5 min', 'The oldest light we can see.'),
      L('mc9-3', 'Dark Matter Detectives', '6 min', 'Evidence from rotating galaxies.'),
      L('mc9-4', 'Dark Energy & Acceleration', '5 min', 'Why the universe speeds up.'),
      L('mc9-5', 'Fate of the Universe', '5 min', 'Big Freeze, Big Rip and Big Crunch.'),
      L('mc9-6', 'Revision Capsule', '4 min', 'Everything condensed for your exam.'),
    ],
  },
  {
    id: 'mc10', title: 'Human Spaceflight & Astronaut Training', tagline: 'Train your mind like an astronaut candidate.',
    facultyId: 29, level: 'Beginner', weeks: 4, originalPrice: '₹3,299', gradient: 'from-rose-500 to-pink-600',
    outcomes: ['List astronaut selection stages', 'Explain life support loops', 'Plan a fitness routine'],
    lectures: [
      L('mc10-1', 'Becoming an Astronaut', '5 min', 'Selection, medicals and skills that matter.'),
      L('mc10-2', 'Living in Microgravity', '5 min', 'Sleep, food, muscles and bones.'),
      L('mc10-3', 'Space Suits & EVA', '5 min', 'A personal spacecraft you wear.'),
      L('mc10-4', 'Mental Strength in Isolation', '5 min', 'Psychology of long missions.'),
    ],
  },
  {
    id: 'mc11', title: 'Space Medicine & Health', tagline: 'What space does to the human body.',
    facultyId: 50, level: 'Intermediate', weeks: 4, originalPrice: '₹3,799', gradient: 'from-teal-500 to-cyan-600',
    outcomes: ['Explain bone density loss', 'Describe radiation shielding', 'Plan space nutrition'],
    lectures: [
      L('mc11-1', 'The Body in Zero-G', '5 min', 'Fluid shifts, puffy faces and muscle loss.'),
      L('mc11-2', 'Cosmic Radiation Risks', '5 min', 'Shielding strategies for deep space.'),
      L('mc11-3', 'Food & Nutrition in Orbit', '5 min', 'Designing meals that keep crews healthy.'),
      L('mc11-4', 'Emergency Medicine in Space', '5 min', 'Treating injuries far from any hospital.'),
    ],
  },
  {
    id: 'mc12', title: 'Space Careers & Entrepreneurship', tagline: 'Turn a space passion into a career path.',
    facultyId: 10, level: 'Beginner', weeks: 4, originalPrice: '₹2,799', gradient: 'from-yellow-500 to-amber-600',
    outcomes: ['Map space career routes', 'Understand the New Space economy', 'Pitch a space startup idea'],
    lectures: [
      L('mc12-1', 'Jobs That Exist in Space Tech', '5 min', 'Engineers, scientists, artists and lawyers.'),
      L('mc12-2', 'The New Space Economy', '5 min', 'Startups, launch costs and satellites as a service.'),
      L('mc12-3', 'Study Roadmap by Age', '5 min', 'What to learn at 10, 14 and 18.'),
      L('mc12-4', 'Pitch Your Space Startup', '6 min', 'Building a one-minute idea pitch.'),
    ],
  },
];

/** Hinglish intro line spoken in every recorded lecture. */
export const hinglishLine = (title: string): string =>
  `Is lecture mein hum "${title}" ko bilkul aasaan Hinglish mein samjhenge — thoda Hindi, thoda English, taaki har concept ekdum clear ho jaaye.`;

/** Every lecture is taught by a different teacher — rotates through the whole faculty. */
export const lectureTeacher = (courseIndex: number, lectureIndex: number): Faculty =>
  faculty[(courseIndex * 7 + lectureIndex * 3) % faculty.length];
