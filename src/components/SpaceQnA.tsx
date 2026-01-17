import { useState } from 'react';
import { Search, Sparkles, Rocket, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Comprehensive Q&A database with unique keywords for accurate matching
interface QnAEntry {
  keywords: string[];
  question: string;
  answer: string;
}

const spaceQnADatabase: QnAEntry[] = [
  {
    keywords: ['sky', 'blue', 'color', 'atmosphere'],
    question: "Why is the sky blue?",
    answer: "The sky looks blue because of Rayleigh scattering! When sunlight enters Earth's atmosphere, it collides with gas molecules. Blue light has a shorter wavelength (around 450-490nm) and scatters more easily than other colors. This scattered blue light reaches your eyes from all directions, making the sky appear blue! At sunset, light travels through more atmosphere, scattering away blue light and leaving red/orange. 🌤️"
  },
  {
    keywords: ['moon', 'far', 'distance', 'away', 'close'],
    question: "How far is the Moon?",
    answer: "The Moon averages 238,855 miles (384,400 km) from Earth - about 30 Earth diameters away! Light takes 1.3 seconds to travel there. Apollo astronauts took about 3 days to reach it. Fun fact: the Moon is slowly drifting away at 3.8 cm per year due to tidal interactions! 🌙"
  },
  {
    keywords: ['black', 'hole', 'holes', 'gravity', 'singularity'],
    question: "What is a black hole?",
    answer: "A black hole is a region where gravity is so intense that nothing - not even light - can escape! They form when massive stars (at least 3x the Sun's mass) collapse. The boundary is called the event horizon. The nearest known black hole, Gaia BH1, is about 1,560 light-years away. Supermassive black holes, millions to billions of solar masses, exist at galaxy centers! 🕳️"
  },
  {
    keywords: ['sun', 'hot', 'temperature', 'heat', 'warm', 'surface'],
    question: "How hot is the Sun?",
    answer: "The Sun's surface (photosphere) is about 5,500°C (9,932°F). But the core reaches 15 million°C (27 million°F) - hot enough for hydrogen fusion! Surprisingly, the corona (outer atmosphere) is 1-3 million°C, hotter than the surface - a mystery scientists are still solving! ☀️"
  },
  {
    keywords: ['star', 'stars', 'twinkle', 'flicker', 'sparkle', 'shimmer'],
    question: "Why do stars twinkle?",
    answer: "Stars twinkle due to atmospheric turbulence! Starlight passes through layers of air at different temperatures and densities, causing refraction (bending). This makes stars appear to shift position and brightness rapidly. Planets twinkle less because they appear larger (they're closer), averaging out the effect. In space, stars shine steadily! ✨"
  },
  {
    keywords: ['mars', 'red', 'planet', 'rusty', 'iron', 'oxide'],
    question: "Why is Mars red?",
    answer: "Mars appears red due to iron oxide (rust) covering its surface! Billions of years ago, iron in Martian rocks oxidized when exposed to trace oxygen and water. The fine rust dust gets suspended in the thin CO2 atmosphere, making even the sky appear pinkish. Mars has the largest volcano (Olympus Mons, 72,000 ft) and deepest canyon (Valles Marineris, 4 miles deep)! 🔴"
  },
  {
    keywords: ['how', 'many', 'planets', 'number', 'count', 'solar', 'system'],
    question: "How many planets are in our solar system?",
    answer: "There are 8 planets in our solar system: Mercury, Venus, Earth, Mars (rocky/terrestrial), Jupiter, Saturn (gas giants), Uranus, and Neptune (ice giants). Pluto was reclassified as a dwarf planet in 2006 because it hasn't 'cleared its orbital neighborhood.' There are 5 recognized dwarf planets: Pluto, Eris, Haumea, Makemake, and Ceres! 🪐"
  },
  {
    keywords: ['galaxy', 'galaxies', 'milky', 'way', 'andromeda'],
    question: "What is a galaxy?",
    answer: "A galaxy is a gravitationally bound system of stars, gas, dust, and dark matter. Our Milky Way contains 100-400 billion stars and is 100,000 light-years across! There are trillions of galaxies in the observable universe. The nearest major galaxy, Andromeda (M31), is 2.5 million light-years away and will merge with us in 4.5 billion years! 🌌"
  },
  {
    keywords: ['space', 'dark', 'darkness', 'night', 'empty', 'vacuum'],
    question: "Why is space dark?",
    answer: "Space is dark because it's essentially empty - there's no atmosphere to scatter light. This is Olbers' Paradox: if infinite stars existed, the sky should be bright. But the universe has a finite age (13.8 billion years), so light from distant stars hasn't reached us. Also, cosmic expansion redshifts ancient light beyond visibility! 🌑"
  },
  {
    keywords: ['universe', 'old', 'age', 'born', 'created', 'big', 'bang'],
    question: "How old is the universe?",
    answer: "The universe is 13.8 billion years old! Scientists determined this by measuring the Cosmic Microwave Background (leftover light from 380,000 years after the Big Bang) and observing the expansion rate. For context: Earth formed 4.5 billion years ago, humans appeared only 300,000 years ago - we're cosmic newcomers! 💫"
  },
  {
    keywords: ['comet', 'comets', 'tail', 'halley', 'dirty', 'snowball'],
    question: "What is a comet?",
    answer: "A comet is a 'dirty snowball' - a nucleus of ice, rock, and organic compounds from the outer solar system. When approaching the Sun, ice vaporizes, creating a glowing coma and two tails: a dust tail (curved, yellow) and an ion tail (straight, blue, always pointing away from the Sun due to solar wind). Halley's Comet returns every 76 years! ☄️"
  },
  {
    keywords: ['sound', 'hear', 'noise', 'silent', 'quiet', 'vacuum'],
    question: "Can you hear sound in space?",
    answer: "No - space is a near-perfect vacuum with no medium for sound waves to travel through! Sound requires particles (air, water, solid) to vibrate. However, NASA has 'sonified' data from space phenomena. In dense gas clouds or planetary atmospheres, sound could technically exist. Astronauts communicate via radio waves, which are electromagnetic, not mechanical! 🤫"
  },
  {
    keywords: ['biggest', 'largest', 'jupiter', 'giant', 'massive', 'planet'],
    question: "What is the biggest planet?",
    answer: "Jupiter is the largest planet - 86,881 miles (139,822 km) in diameter, 11x Earth's width! It contains 2.5x the mass of all other planets combined. Made of hydrogen and helium, it has no solid surface. The Great Red Spot is a storm 1.3x Earth's size, raging for 350+ years! Jupiter has 95 known moons, including Europa with a subsurface ocean! 🟠"
  },
  {
    keywords: ['astronaut', 'astronauts', 'sleep', 'sleeping', 'rest'],
    question: "How do astronauts sleep in space?",
    answer: "Astronauts sleep in special sleeping bags tethered to walls in small crew quarters. Without gravity, they'd drift around! The ISS orbits every 90 minutes, causing 16 sunrises daily, so astronauts use eye masks and stick to scheduled sleep periods. Sleeping in microgravity is actually comfortable - no pressure points! Some report the most restful sleep ever. 😴"
  },
  {
    keywords: ['supernova', 'explode', 'explosion', 'exploding', 'stellar', 'death'],
    question: "What is a supernova?",
    answer: "A supernova is a massive stellar explosion occurring when a star exhausts fuel (Type II) or when a white dwarf accretes too much mass (Type Ia). They can briefly outshine entire galaxies! Supernovae create and disperse heavy elements - the calcium in your bones and iron in your blood were forged in ancient supernovae. The last visible one in our galaxy was in 1604 (Kepler's Supernova)! 💥"
  },
  {
    keywords: ['gravity', 'float', 'floating', 'weightless', 'microgravity', 'zero'],
    question: "Why do astronauts float in space?",
    answer: "Astronauts experience 'microgravity' because they're in continuous free-fall around Earth! The ISS orbits at 17,500 mph - falling toward Earth but moving sideways fast enough to keep missing it. Gravity at ISS altitude (250 miles) is still 90% of surface gravity. It's not 'zero gravity' - it's perpetual falling while moving forward! 🧑‍🚀"
  },
  {
    keywords: ['light', 'year', 'years', 'travel', 'speed', 'distance'],
    question: "What is a light year?",
    answer: "A light year is the distance light travels in one year: 5.88 trillion miles (9.46 trillion km)! Light moves at 186,282 miles per second. Proxima Centauri (nearest star) is 4.24 light-years away. The observable universe is 93 billion light-years across. When you see Andromeda, you see it as it was 2.5 million years ago! 🌟"
  },
  {
    keywords: ['earth', 'round', 'sphere', 'shape', 'ball', 'spherical'],
    question: "Why is Earth round?",
    answer: "Earth is round due to gravity! When Earth formed 4.5 billion years ago, gravity pulled matter toward the center from all directions equally, creating a sphere - the shape with minimum surface area for a given volume. Earth isn't perfectly round though - it bulges at the equator due to rotation (21km wider at equator than pole-to-pole)! 🌍"
  },
  {
    keywords: ['rocket', 'rockets', 'work', 'fly', 'launch', 'thrust', 'propulsion'],
    question: "How do rockets work?",
    answer: "Rockets work via Newton's Third Law: action-reaction! Burning fuel creates hot gas expelled at high speed downward; the rocket moves upward with equal momentum. Unlike jets, rockets carry both fuel AND oxidizer, so they work in the vacuum of space. The Saturn V produced 7.5 million pounds of thrust - enough to lift 130 tons to the Moon! 🚀"
  },
  {
    keywords: ['saturn', 'rings', 'ring', 'ice', 'gaps'],
    question: "What are Saturn's rings made of?",
    answer: "Saturn's rings are 99.9% water ice with traces of rock and dust! Particles range from tiny grains to house-sized chunks. The rings span 175,000 miles but are only 30-300 feet thick. Gaps like the Cassini Division are created by moon gravitational resonances. The rings may be only 100 million years old - young compared to Saturn (4.5 billion years)! 🪐"
  },
  {
    keywords: ['meteor', 'meteors', 'shooting', 'falling', 'star', 'meteorite'],
    question: "What is a shooting star?",
    answer: "A 'shooting star' is a meteor - space debris burning up in Earth's atmosphere at 25,000-160,000 mph! Most are grain-sized, vaporizing 50-80 miles up. Meteoroids that survive and hit Earth become meteorites. Meteor showers (like Perseids in August) occur when Earth passes through comet debris trails. About 48 tons of meteoric material falls daily! 🌠"
  },
  {
    keywords: ['iss', 'station', 'international', 'space station', 'orbit'],
    question: "What is the International Space Station?",
    answer: "The ISS is a habitable spacecraft orbiting Earth at 250 miles altitude, moving at 17,500 mph (circling Earth every 90 minutes)! It's the largest human-made structure in space: 357 ft long, weighing 420 tons. Built by 15 nations since 1998, it hosts 6-7 astronauts conducting research in microgravity. You can see it from Earth without a telescope! 🛸"
  },
  {
    keywords: ['oxygen', 'breathe', 'breathing', 'air', 'spacesuit'],
    question: "Can you breathe in space?",
    answer: "No! Space is a near-vacuum - exposure without a suit causes unconsciousness in 15 seconds and death within 1-2 minutes. Spacesuits provide pressurized oxygen, temperature regulation, and radiation protection. The ISS generates oxygen through electrolysis (splitting water) and scrubs CO2 using chemical absorbers. A spacesuit is essentially a personal spacecraft! 🌬️"
  },
  {
    keywords: ['nebula', 'nebulas', 'nebulae', 'cloud', 'clouds', 'gas', 'dust'],
    question: "What is a nebula?",
    answer: "A nebula is a giant cloud of gas and dust in space! Types include: emission nebulae (glowing from nearby star radiation), reflection nebulae (reflecting starlight), dark nebulae (blocking background light), and planetary nebulae (expelled from dying stars). The Orion Nebula, 1,344 light-years away, is visible to the naked eye and is a stellar nursery birthing new stars! 🌈"
  },
  {
    keywords: ['telescope', 'telescopes', 'see', 'hubble', 'james', 'webb', 'observe'],
    question: "How do telescopes work?",
    answer: "Telescopes gather and focus light to reveal distant objects. Refractors use lenses, reflectors use mirrors. The Hubble Space Telescope (1990-present) orbits above atmospheric distortion, capturing visible/UV/infrared light. The James Webb Space Telescope (2022) uses a 21-foot gold-coated mirror to see infrared light from 13.5 billion years ago - the earliest galaxies! 🔭"
  },
  {
    keywords: ['alien', 'aliens', 'life', 'extraterrestrial', 'exist', 'et'],
    question: "Are there aliens?",
    answer: "We don't know yet! With 100-400 billion stars in our galaxy and trillions of galaxies, the probability seems high (Drake Equation). NASA searches for biosignatures on Mars, Europa, and Enceladus. SETI scans for radio signals. The Fermi Paradox asks: if aliens exist, where are they? We've confirmed 5,000+ exoplanets, many in habitable zones! 👽"
  },
  {
    keywords: ['venus', 'hottest', 'greenhouse', 'earth', 'twin'],
    question: "Why is Venus so hot?",
    answer: "Venus is the hottest planet (465°C/869°F) due to an extreme greenhouse effect! Its atmosphere is 96% CO2, 90x Earth's surface pressure. Sunlight penetrates the clouds but infrared radiation can't escape, trapping heat. Though Mercury is closer to the Sun, Venus's thick atmosphere makes it hotter. Venus also rotates backward and has 243-Earth-day-long days! 🔥"
  },
  {
    keywords: ['pluto', 'dwarf', 'not', 'planet', 'demotion', 'classification'],
    question: "Why isn't Pluto a planet?",
    answer: "In 2006, the IAU defined 'planet' as a body that: (1) orbits the Sun, (2) has enough mass for gravity to make it round, and (3) has 'cleared its orbital neighborhood.' Pluto fails criterion 3 - it shares its orbit with Kuiper Belt objects. Pluto is now a 'dwarf planet' - still a fascinating world with 5 moons, nitrogen glaciers, and a heart-shaped feature! ❄️"
  },
  {
    keywords: ['day', 'night', 'rotate', 'rotation', 'spin', 'turning'],
    question: "Why do we have day and night?",
    answer: "Day and night occur because Earth rotates on its axis once every 23 hours 56 minutes (a sidereal day)! The side facing the Sun experiences day; the opposite side experiences night. Earth rotates west to east, making the Sun appear to rise in the east. At the equator, Earth's surface moves at about 1,000 mph! 🌓"
  },
  {
    keywords: ['season', 'seasons', 'winter', 'summer', 'tilt', 'spring', 'fall', 'autumn'],
    question: "Why do we have seasons?",
    answer: "Seasons occur because Earth's axis is tilted 23.5° relative to its orbital plane! When your hemisphere tilts toward the Sun, you get longer days and more direct sunlight (summer). Six months later, it tilts away (winter). The equator experiences minimal seasonal change. It's NOT about Earth-Sun distance - Earth is actually closest to the Sun in January! 🍂"
  },
  {
    keywords: ['constellation', 'constellations', 'pattern', 'patterns', 'orion', 'zodiac'],
    question: "What are constellations?",
    answer: "Constellations are patterns of stars as seen from Earth, used for navigation and storytelling for millennia! The 88 official constellations cover the entire sky. Stars in a constellation aren't physically close - they just appear aligned from our viewpoint. Orion's Belt stars are 800-2,000 light-years away at varying distances! 🌟"
  },
  {
    keywords: ['eclipse', 'eclipses', 'solar', 'lunar', 'shadow', 'block'],
    question: "What causes eclipses?",
    answer: "A solar eclipse occurs when the Moon passes between Earth and Sun, casting a shadow on Earth. A lunar eclipse occurs when Earth blocks sunlight from reaching the Moon. Solar eclipses are rarer at any location because the Moon's shadow is small. Total solar eclipses are cosmic coincidences - the Moon is 400x smaller than the Sun but 400x closer! 🌑"
  },
  {
    keywords: ['asteroid', 'asteroids', 'belt', 'rock', 'impact', 'dinosaur'],
    question: "What is an asteroid?",
    answer: "Asteroids are rocky remnants from the solar system's formation 4.6 billion years ago! Most orbit in the asteroid belt between Mars and Jupiter. They range from 3 feet to 329 miles (Vesta) across. The Chicxulub asteroid (6 miles wide) caused the dinosaur extinction 66 million years ago. NASA's DART mission successfully deflected asteroid Dimorphos in 2022! ☄️"
  },
  {
    keywords: ['satellite', 'satellites', 'orbit', 'artificial', 'gps', 'communication'],
    question: "What is a satellite?",
    answer: "A satellite is any object orbiting another body. The Moon is Earth's natural satellite. Artificial satellites (since Sputnik, 1957) orbit Earth for communication, GPS, weather monitoring, and science. About 7,000 active satellites orbit Earth! Geostationary satellites at 22,236 miles orbit in sync with Earth's rotation, appearing stationary in the sky. 📡"
  },
  {
    keywords: ['exoplanet', 'exoplanets', 'other', 'worlds', 'kepler', 'habitable'],
    question: "What is an exoplanet?",
    answer: "An exoplanet is a planet orbiting a star other than our Sun! We've confirmed 5,500+ exoplanets since the first discovery in 1992. Detection methods include transit (dimming as planet passes star) and radial velocity (star wobble). Types include hot Jupiters, super-Earths, and potentially habitable worlds like Proxima Centauri b (4.24 light-years away)! 🌍"
  },
  {
    keywords: ['neutron', 'star', 'dense', 'pulsar', 'magnetar'],
    question: "What is a neutron star?",
    answer: "A neutron star is the ultra-dense remnant of a massive star after supernova! With 1.4-2 solar masses compressed into a 12-mile sphere, a teaspoon would weigh 6 billion tons! They spin incredibly fast (up to 716 times/second) and have intense magnetic fields. Pulsars are neutron stars beaming radiation like cosmic lighthouses! ⭐"
  },
  {
    keywords: ['red', 'giant', 'star', 'sun', 'future', 'expand'],
    question: "What is a red giant?",
    answer: "A red giant is an aging star that has exhausted its core hydrogen and expanded enormously! Our Sun will become a red giant in ~5 billion years, swelling to engulf Mercury, Venus, and possibly Earth. Despite being cooler (hence red), they're incredibly luminous due to their huge size. Betelgeuse in Orion is a famous red supergiant! 🔴"
  },
  {
    keywords: ['white', 'dwarf', 'star', 'dead', 'remnant', 'fate'],
    question: "What is a white dwarf?",
    answer: "A white dwarf is the dense core left after a Sun-like star sheds its outer layers! About Earth-sized but with the Sun's mass, they're extremely dense. No longer fusing atoms, they slowly cool over billions of years. Our Sun's fate is to become a white dwarf in ~7-8 billion years. The nearest is Sirius B, 8.6 light-years away! ⚪"
  },
  {
    keywords: ['dark', 'matter', 'invisible', 'mass', 'mystery'],
    question: "What is dark matter?",
    answer: "Dark matter is invisible matter that doesn't emit or absorb light but exerts gravitational effects! It makes up ~27% of the universe (normal matter is only 5%). We detect it through galaxy rotation curves and gravitational lensing. Despite decades of searching, we don't know what it's made of - WIMPs and axions are leading candidates! 🌑"
  },
  {
    keywords: ['dark', 'energy', 'expansion', 'accelerating', 'universe'],
    question: "What is dark energy?",
    answer: "Dark energy is the mysterious force causing the universe's expansion to accelerate! Discovered in 1998 via distant supernovae, it comprises ~68% of the universe. Its nature is unknown - possibly the cosmological constant (vacuum energy) or a dynamic field called quintessence. Dark energy will eventually push galaxies beyond our observable horizon! 🌌"
  },
  {
    keywords: ['wormhole', 'wormholes', 'shortcut', 'tunnel', 'travel'],
    question: "What is a wormhole?",
    answer: "A wormhole is a theoretical tunnel through spacetime connecting distant points! Predicted by Einstein's relativity, they could enable faster-than-light travel. However, they'd require exotic matter with negative energy density to stay open - which may not exist. No wormholes have been observed, and traversable ones may be physically impossible. They remain fascinating science fiction! 🕳️"
  },
  {
    keywords: ['milky', 'way', 'galaxy', 'home', 'center', 'shape'],
    question: "What is the Milky Way?",
    answer: "The Milky Way is our home galaxy - a barred spiral 100,000 light-years across containing 100-400 billion stars! Our Sun orbits the galactic center (where a 4-million-solar-mass black hole resides) every 225 million years. We're located in the Orion Arm, about 26,000 light-years from the center. The name comes from its milky appearance in the night sky! 🌌"
  },
  {
    keywords: ['speed', 'light', 'fast', 'fastest', 'limit', 'velocity'],
    question: "How fast is the speed of light?",
    answer: "Light travels at 299,792,458 meters per second (186,282 miles/second) in a vacuum - the cosmic speed limit! Nothing with mass can reach this speed. At light speed: you'd circle Earth 7.5 times per second, reach the Moon in 1.3 seconds, and the Sun in 8.3 minutes. Time dilation means time slows as you approach this speed! 💫"
  }
];

const suggestedQuestions = [
  "Why is the sky blue?",
  "How far is the Moon?",
  "What is a black hole?",
  "How do rockets work?",
  "Why do stars twinkle?",
  "What is a light year?",
  "Can you hear sound in space?",
  "Why is Venus the hottest planet?"
];

const SpaceQnA = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [askedQuestion, setAskedQuestion] = useState('');
  const [matchedQuestion, setMatchedQuestion] = useState('');

  const findBestMatch = (query: string): QnAEntry | null => {
    const normalizedQuery = query.toLowerCase().trim().replace(/[?!.,]/g, '');
    const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 2);
    
    let bestMatch: QnAEntry | null = null;
    let bestScore = 0;

    for (const entry of spaceQnADatabase) {
      let score = 0;
      
      // Check for keyword matches
      for (const keyword of entry.keywords) {
        if (normalizedQuery.includes(keyword)) {
          score += 10; // High score for direct keyword inclusion
        }
        // Check if query words match keywords
        for (const word of queryWords) {
          if (keyword.includes(word) || word.includes(keyword)) {
            score += 5;
          }
        }
      }
      
      // Bonus for multiple keyword matches (indicates better relevance)
      const matchedKeywords = entry.keywords.filter(k => 
        normalizedQuery.includes(k) || queryWords.some(w => k.includes(w) || w.includes(k))
      );
      if (matchedKeywords.length >= 2) {
        score += 15;
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    // Only return a match if score is high enough to be confident
    return bestScore >= 10 ? bestMatch : null;
  };

  const handleSearch = (searchQuery?: string) => {
    const queryToSearch = searchQuery || question;
    if (!queryToSearch.trim()) return;

    setIsSearching(true);
    setAskedQuestion(queryToSearch);
    
    setTimeout(() => {
      const match = findBestMatch(queryToSearch);
      if (match) {
        setAnswer(match.answer);
        setMatchedQuestion(match.question);
      } else {
        setAnswer("🤔 Great question! I don't have that specific answer yet, but keep exploring! Try asking about: planets, stars, black holes, the Moon, rockets, astronauts, or space exploration. There's so much amazing stuff to learn about space!");
        setMatchedQuestion('');
      }
      setIsSearching(false);
      setQuestion('');
    }, 800);
  };

  const handleSuggestedClick = (q: string) => {
    setQuestion(q);
    handleSearch(q);
  };

  return (
    <section id="space-qna" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <HelpCircle className="w-10 h-10 text-cyan-400" />
            Ask a Space Question
            <Sparkles className="w-10 h-10 text-yellow-400" />
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Curious about the universe? Type your question below and discover amazing space facts!
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <Input
                type="text"
                placeholder="Ask anything about space... (e.g., How do rockets work?)"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-12 pr-4 py-6 text-lg bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300/50 rounded-xl focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>
            <Button
              onClick={() => handleSearch()}
              disabled={!question.trim() || isSearching}
              className="px-8 py-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSearching ? (
                <Rocket className="w-6 h-6 animate-bounce" />
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Ask
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Suggested Questions */}
        {!answer && (
          <div className="mb-8">
            <p className="text-purple-300 text-sm mb-3 text-center">✨ Try asking:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestedClick(q)}
                  className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-purple-200 rounded-full border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Answer Area */}
        <div className={`transition-all duration-500 ${answer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {answer && (
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm">
              {/* Question Display */}
              <div className="mb-6">
                <p className="text-sm text-cyan-400 font-medium mb-1">Your Question:</p>
                <p className="text-lg text-white font-semibold">{askedQuestion}</p>
                {matchedQuestion && matchedQuestion.toLowerCase() !== askedQuestion.toLowerCase() && (
                  <p className="text-sm text-purple-300 mt-1">Matched to: "{matchedQuestion}"</p>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-6" />

              {/* Answer Display */}
              <div>
                <p className="text-sm text-purple-400 font-medium mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Answer:
                </p>
                <p className="text-xl text-white leading-relaxed">
                  {answer}
                </p>
              </div>

              {/* Ask Another Button */}
              <div className="mt-8 text-center">
                <Button
                  onClick={() => {
                    setAnswer(null);
                    setAskedQuestion('');
                    setMatchedQuestion('');
                  }}
                  variant="outline"
                  className="border-purple-500/50 text-purple-200 hover:bg-purple-500/20 hover:text-white"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Ask Another Question
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {!answer && !isSearching && (
          <div className="text-center py-12 opacity-60">
            <div className="text-6xl mb-4">🔭</div>
            <p className="text-purple-300">Your answer will appear here!</p>
          </div>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-bounce">🚀</div>
            <p className="text-purple-300 animate-pulse">Searching the cosmos for your answer...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SpaceQnA;
