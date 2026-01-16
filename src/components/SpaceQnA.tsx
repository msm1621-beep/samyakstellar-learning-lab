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
    keywords: ['sky', 'blue', 'color'],
    question: "Why is the sky blue?",
    answer: "The sky looks blue because of how sunlight interacts with our atmosphere! When sunlight enters Earth's atmosphere, it collides with gas molecules and gets scattered in all directions. Blue light has a shorter wavelength and gets scattered more than other colors, so we see blue when we look up! 🌤️"
  },
  {
    keywords: ['moon', 'far', 'distance', 'away'],
    question: "How far is the Moon?",
    answer: "The Moon is about 238,855 miles (384,400 km) away from Earth! That's like driving around Earth almost 10 times. It takes about 3 days for a spacecraft to travel there. Astronauts first walked on the Moon in 1969! 🌙"
  },
  {
    keywords: ['black', 'hole'],
    question: "What is a black hole?",
    answer: "A black hole is a region in space where gravity is SO strong that nothing can escape from it - not even light! They form when massive stars collapse at the end of their lives. The nearest known black hole is about 1,000 light-years away, so don't worry - we're safe! 🕳️"
  },
  {
    keywords: ['sun', 'hot', 'temperature', 'heat'],
    question: "How hot is the Sun?",
    answer: "The Sun's surface is about 10,000°F (5,500°C), but its core is even hotter - around 27 million°F (15 million°C)! That's hot enough to power nuclear fusion, which is what makes the Sun shine and keeps our planet warm. ☀️"
  },
  {
    keywords: ['star', 'stars', 'twinkle', 'flicker', 'sparkle'],
    question: "Why do stars twinkle?",
    answer: "Stars twinkle because of Earth's atmosphere! As starlight travels through layers of air with different temperatures, it gets bent and bounced around, making stars appear to flicker. In space, astronauts see stars that don't twinkle at all! ✨"
  },
  {
    keywords: ['mars', 'red', 'planet', 'made'],
    question: "What is Mars made of?",
    answer: "Mars is a rocky planet made of iron, magnesium, and other minerals. Its famous red color comes from iron oxide (rust) on its surface! Mars has the largest volcano in the solar system called Olympus Mons, which is about 3 times taller than Mount Everest! 🔴"
  },
  {
    keywords: ['how', 'many', 'planets', 'number', 'count'],
    question: "How many planets are there?",
    answer: "There are 8 planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Mercury is closest to the Sun, and Neptune is the farthest. Pluto was reclassified as a 'dwarf planet' in 2006. 🪐"
  },
  {
    keywords: ['galaxy', 'galaxies', 'milky', 'way'],
    question: "What is a galaxy?",
    answer: "A galaxy is a huge collection of stars, planets, gas, and dust held together by gravity. Our galaxy, the Milky Way, contains over 200 billion stars! There are billions of galaxies in the universe, each with their own stars and planets. 🌌"
  },
  {
    keywords: ['space', 'dark', 'darkness', 'night'],
    question: "Why is space dark?",
    answer: "Space is dark because there's no atmosphere to scatter light like on Earth. Even though the Sun shines brightly, light travels in straight lines through the vacuum of space without bouncing around. That's why space appears black between the stars! 🌑"
  },
  {
    keywords: ['universe', 'old', 'age', 'born', 'created'],
    question: "How old is the universe?",
    answer: "The universe is about 13.8 billion years old! Scientists figured this out by studying the oldest light in the universe, called the Cosmic Microwave Background. The Big Bang created all space, time, and matter in that instant! 💫"
  },
  {
    keywords: ['comet', 'comets', 'tail'],
    question: "What is a comet?",
    answer: "A comet is like a giant dirty snowball made of ice, rock, and dust! When comets get close to the Sun, the ice melts and creates a beautiful glowing tail that can stretch millions of miles across space. Famous comets include Halley's Comet, which visits us every 76 years! ☄️"
  },
  {
    keywords: ['sound', 'hear', 'noise', 'silent', 'quiet'],
    question: "Can you hear sound in space?",
    answer: "No, space is completely silent! This is because space is a vacuum - there's no air or other material for sound waves to travel through. Astronauts have to use radio waves to communicate with each other when outside the spacecraft. 🤫"
  },
  {
    keywords: ['biggest', 'largest', 'jupiter', 'giant'],
    question: "What is the biggest planet?",
    answer: "Jupiter is the biggest planet in our solar system! It's so huge that over 1,300 Earths could fit inside it. Jupiter is a 'gas giant' made mostly of hydrogen and helium. It has a famous storm called the Great Red Spot that has been raging for hundreds of years! 🟠"
  },
  {
    keywords: ['astronaut', 'astronauts', 'sleep', 'sleeping'],
    question: "How do astronauts sleep in space?",
    answer: "Astronauts sleep in special sleeping bags attached to the wall so they don't float around! In microgravity, there's no up or down, so they can sleep in any direction. They also wear eye masks because the Sun rises every 90 minutes on the International Space Station! 😴"
  },
  {
    keywords: ['supernova', 'explode', 'explosion', 'exploding'],
    question: "What is a supernova?",
    answer: "A supernova is a giant explosion that happens when a massive star dies! It can be brighter than an entire galaxy for a short time. The explosion spreads elements like gold, silver, and iron throughout space - the iron in your blood came from ancient supernovas! 💥"
  },
  {
    keywords: ['gravity', 'float', 'floating', 'weightless'],
    question: "Why do astronauts float in space?",
    answer: "Astronauts float because they're in 'free fall' around Earth! The space station and astronauts are constantly falling toward Earth, but moving sideways fast enough that they keep missing it. This creates the feeling of weightlessness called microgravity. 🧑‍🚀"
  },
  {
    keywords: ['light', 'year', 'years', 'travel'],
    question: "What is a light year?",
    answer: "A light year is the distance that light travels in one year - about 5.88 trillion miles (9.46 trillion km)! It's used to measure huge distances in space. For example, the nearest star to our Sun (Proxima Centauri) is about 4.24 light years away. 🌟"
  },
  {
    keywords: ['earth', 'round', 'sphere', 'shape'],
    question: "Why is Earth round?",
    answer: "Earth is round because of gravity! When Earth formed 4.5 billion years ago, gravity pulled all the material toward the center equally from all directions. This created a sphere shape. All planets, moons, and stars are round for the same reason! 🌍"
  },
  {
    keywords: ['rocket', 'rockets', 'work', 'fly', 'launch'],
    question: "How do rockets work?",
    answer: "Rockets work by pushing gas out of their engines at very high speed! This is called Newton's Third Law - for every action, there's an equal and opposite reaction. When hot gas shoots down, it pushes the rocket up. Rockets carry their own fuel and oxygen, so they can work in the vacuum of space! 🚀"
  },
  {
    keywords: ['saturn', 'rings', 'ring'],
    question: "What are Saturn's rings made of?",
    answer: "Saturn's beautiful rings are made of billions of pieces of ice and rock! They range in size from tiny grains to chunks as big as houses. The rings are actually very thin - only about 30 feet thick in most places, but they stretch out for thousands of miles! 🪐"
  },
  {
    keywords: ['meteor', 'meteors', 'shooting', 'falling'],
    question: "What is a shooting star?",
    answer: "A 'shooting star' is actually a meteor - a small piece of space rock burning up in Earth's atmosphere! When space debris enters our atmosphere at high speed, it creates friction and heats up, producing that beautiful streak of light. Most meteors are only the size of a grain of sand! 🌠"
  },
  {
    keywords: ['iss', 'station', 'international', 'space station'],
    question: "What is the International Space Station?",
    answer: "The International Space Station (ISS) is a large spacecraft orbiting Earth where astronauts live and work! It's about the size of a football field and travels at 17,500 mph, orbiting Earth every 90 minutes. Astronauts from many countries work together there doing science experiments! 🛸"
  },
  {
    keywords: ['oxygen', 'breathe', 'breathing', 'air'],
    question: "Can you breathe in space?",
    answer: "No, you cannot breathe in space without a spacesuit! Space is a vacuum with no air or oxygen. Astronauts must wear special suits with life support systems that provide oxygen and remove carbon dioxide. The ISS has systems that create oxygen from water! 🌬️"
  },
  {
    keywords: ['nebula', 'nebulas', 'nebulae', 'cloud', 'clouds'],
    question: "What is a nebula?",
    answer: "A nebula is a giant cloud of gas and dust in space! Some nebulae are 'stellar nurseries' where new stars are born. Others are the remains of exploded stars. The beautiful colors come from different gases glowing - hydrogen glows red, oxygen glows green and blue! 🌈"
  },
  {
    keywords: ['telescope', 'telescopes', 'see', 'hubble', 'james', 'webb'],
    question: "How do telescopes work?",
    answer: "Telescopes collect and focus light to make distant objects appear closer and brighter! The Hubble Space Telescope orbits Earth above the atmosphere for clearer views. The James Webb Space Telescope uses infrared light to see through cosmic dust and observe the earliest galaxies! 🔭"
  },
  {
    keywords: ['alien', 'aliens', 'life', 'extraterrestrial', 'exist'],
    question: "Are there aliens?",
    answer: "We haven't found proof of alien life yet, but scientists are actively searching! With billions of galaxies and trillions of planets in the universe, many scientists think it's likely life exists somewhere else. We're looking for signs of life on Mars, Europa, and planets around other stars! 👽"
  },
  {
    keywords: ['venus', 'hottest', 'greenhouse'],
    question: "Why is Venus the hottest planet?",
    answer: "Venus is the hottest planet (even hotter than Mercury!) because of its thick atmosphere of carbon dioxide. This creates a super-strong greenhouse effect that traps heat. Venus's surface temperature is about 900°F (475°C) - hot enough to melt lead! 🔥"
  },
  {
    keywords: ['pluto', 'dwarf', 'not', 'planet'],
    question: "Why isn't Pluto a planet anymore?",
    answer: "In 2006, scientists created a new definition of 'planet' that Pluto doesn't meet. A planet must: orbit the Sun, be round, AND have 'cleared' its orbit of other objects. Pluto shares its orbit with other icy objects, so it's now called a 'dwarf planet.' It's still an amazing world! ❄️"
  },
  {
    keywords: ['day', 'night', 'rotate', 'rotation', 'spin'],
    question: "Why do we have day and night?",
    answer: "We have day and night because Earth rotates (spins) on its axis once every 24 hours! The side of Earth facing the Sun experiences daytime, while the opposite side is in darkness (nighttime). As Earth continues to spin, different areas move from day to night and back again! 🌓"
  },
  {
    keywords: ['season', 'seasons', 'winter', 'summer', 'tilt'],
    question: "Why do we have seasons?",
    answer: "We have seasons because Earth is tilted on its axis by about 23.5 degrees! As Earth orbits the Sun, different parts of the planet receive more direct sunlight at different times of year. When your hemisphere tilts toward the Sun, it's summer; when it tilts away, it's winter! 🍂"
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
