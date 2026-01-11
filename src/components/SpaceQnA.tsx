import { useState } from 'react';
import { Search, Sparkles, Rocket, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Pre-defined Q&A for common space questions
const spaceQnA: Record<string, string> = {
  "why is the sky blue": "The sky looks blue because of how sunlight interacts with our atmosphere! When sunlight enters Earth's atmosphere, it collides with gas molecules and gets scattered in all directions. Blue light has a shorter wavelength and gets scattered more than other colors, so we see blue when we look up! 🌤️",
  "how far is the moon": "The Moon is about 238,855 miles (384,400 km) away from Earth! That's like driving around Earth almost 10 times. It takes about 3 days for a spacecraft to travel there. Astronauts first walked on the Moon in 1969! 🌙",
  "what is a black hole": "A black hole is a region in space where gravity is SO strong that nothing can escape from it - not even light! They form when massive stars collapse at the end of their lives. Don't worry though, the nearest black hole is very far away! 🕳️",
  "how hot is the sun": "The Sun's surface is about 10,000°F (5,500°C), but its core is even hotter - around 27 million°F (15 million°C)! That's hot enough to power nuclear fusion, which is what makes the Sun shine and keeps our planet warm. ☀️",
  "why do stars twinkle": "Stars twinkle because of Earth's atmosphere! As starlight travels through layers of air with different temperatures, it gets bent and bounced around, making stars appear to flicker. In space, stars don't twinkle at all! ✨",
  "what is mars made of": "Mars is a rocky planet made of iron, magnesium, and other minerals. Its famous red color comes from iron oxide (rust) on its surface! Mars has the largest volcano in the solar system called Olympus Mons. 🔴",
  "how many planets are there": "There are 8 planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Pluto used to be called the 9th planet, but scientists now call it a 'dwarf planet.' 🪐",
  "what is a galaxy": "A galaxy is a huge collection of stars, planets, gas, and dust held together by gravity. Our galaxy, the Milky Way, contains over 100 billion stars! There are billions of galaxies in the universe. 🌌",
  "why is space dark": "Space is dark because there's no atmosphere to scatter light like on Earth. Even though the Sun shines brightly, the light travels in straight lines through the vacuum of space without bouncing around. 🌑",
  "how old is the universe": "The universe is about 13.8 billion years old! Scientists figured this out by studying the oldest light in the universe, called the Cosmic Microwave Background. That's really, really old! 💫",
  "what is a comet": "A comet is like a giant dirty snowball made of ice, rock, and dust! When comets get close to the Sun, the ice melts and creates a beautiful glowing tail that can stretch millions of miles across space. ☄️",
  "can you hear sound in space": "Nope! Space is completely silent because it's a vacuum - there's no air for sound waves to travel through. Astronauts have to use radios to talk to each other in space. 🤫",
  "what is the biggest planet": "Jupiter is the biggest planet in our solar system! It's so huge that over 1,300 Earths could fit inside it. Jupiter also has a famous storm called the Great Red Spot that's been raging for hundreds of years! 🟠",
  "how do astronauts sleep": "Astronauts sleep in sleeping bags attached to the wall so they don't float around! There's no up or down in space, so they can sleep in any direction. They also wear eye masks because the Sun rises every 90 minutes on the Space Station! 😴",
  "what is a supernova": "A supernova is a giant explosion that happens when a massive star dies! It can be brighter than an entire galaxy for a short time. The explosion spreads elements like gold and iron throughout space - the iron in your blood came from ancient supernovas! 💥"
};

const suggestedQuestions = [
  "Why is the sky blue?",
  "How far is the Moon?",
  "What is a black hole?",
  "How hot is the Sun?",
  "Why do stars twinkle?",
  "What is Mars made of?",
  "How many planets are there?",
  "What is a galaxy?"
];

const SpaceQnA = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [askedQuestion, setAskedQuestion] = useState('');

  const findAnswer = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim().replace(/[?!.,]/g, '');
    
    // Check for exact or partial matches
    for (const [key, value] of Object.entries(spaceQnA)) {
      if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
        return value;
      }
    }
    
    // Check for keyword matches
    const keywords = normalizedQuery.split(' ');
    for (const [key, value] of Object.entries(spaceQnA)) {
      const keyWords = key.split(' ');
      const matches = keywords.filter(k => keyWords.some(kw => kw.includes(k) || k.includes(kw)));
      if (matches.length >= 2) {
        return value;
      }
    }
    
    return null;
  };

  const handleSearch = (searchQuery?: string) => {
    const queryToSearch = searchQuery || question;
    if (!queryToSearch.trim()) return;

    setIsSearching(true);
    setAskedQuestion(queryToSearch);
    
    // Simulate search delay for effect
    setTimeout(() => {
      const result = findAnswer(queryToSearch);
      if (result) {
        setAnswer(result);
      } else {
        setAnswer("🤔 Great question! I don't have that answer yet, but here's a tip: Try asking about planets, stars, the Moon, black holes, or space exploration! There's so much to learn about space!");
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
                placeholder="Ask anything about space... (e.g., Why is the sky blue?)"
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

        {/* Empty State / Waiting State */}
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
