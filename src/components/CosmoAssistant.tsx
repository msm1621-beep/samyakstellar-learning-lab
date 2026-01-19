import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Bot, X, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

// TypeScript declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

interface Message {
  role: 'user' | 'cosmo';
  content: string;
  timestamp: Date;
}

// Comprehensive space knowledge base
const spaceKnowledge: { keywords: string[]; answer: string }[] = [
  // Solar System
  { keywords: ['sun', 'star', 'our star'], answer: "The Sun is our closest star and the center of our solar system! It's a giant ball of hot, glowing gas that's about 93 million miles from Earth. The Sun is so big that over 1 million Earths could fit inside it! It gives us light, heat, and makes life on Earth possible." },
  { keywords: ['mercury'], answer: "Mercury is the smallest planet and closest to the Sun! It zooms around the Sun in just 88 Earth days - that's the fastest of any planet. Mercury has no moons and almost no atmosphere, so it gets super hot during the day and freezing cold at night." },
  { keywords: ['venus'], answer: "Venus is sometimes called Earth's twin because they're almost the same size! But Venus is very different - it's covered in thick, toxic clouds and is the hottest planet, even hotter than Mercury. Venus spins backwards, so the Sun rises in the west there!" },
  { keywords: ['earth', 'our planet'], answer: "Earth is our amazing home! It's the only planet we know that has life. Earth is covered in oceans of liquid water and wrapped in a protective atmosphere. We have one Moon that controls our ocean tides and lights up our nights." },
  { keywords: ['mars', 'red planet'], answer: "Mars is called the Red Planet because of its rusty red color! It has the tallest volcano called Olympus Mons and the deepest canyon in the solar system. Scientists have sent robots like Curiosity and Perseverance to explore Mars, and one day humans might live there!" },
  { keywords: ['jupiter', 'biggest planet'], answer: "Jupiter is the biggest planet - you could fit over 1,300 Earths inside it! This gas giant has a famous storm called the Great Red Spot that has been raging for hundreds of years. Jupiter has at least 95 moons, including four large ones discovered by Galileo!" },
  { keywords: ['saturn', 'rings'], answer: "Saturn is famous for its beautiful rings made of ice and rock! It's so light that it would float in water if you had a big enough bathtub. Saturn has many moons, including Titan, which has lakes and an atmosphere like Earth." },
  { keywords: ['uranus'], answer: "Uranus is an ice giant that spins on its side like a rolling ball! Scientists think something huge crashed into it long ago, knocking it over. Uranus has rings too, though they're much fainter than Saturn's." },
  { keywords: ['neptune'], answer: "Neptune is the windiest planet in our solar system, with storms faster than the speed of sound! It's a beautiful blue color because of methane in its atmosphere. Neptune is so far away that it takes 165 Earth years to orbit the Sun!" },
  { keywords: ['pluto', 'dwarf planet'], answer: "Pluto is now classified as a dwarf planet! It's in the Kuiper Belt, a region of icy objects beyond Neptune. Pluto has a heart-shaped glacier and five moons. NASA's New Horizons spacecraft flew by Pluto in 2015 and sent back amazing pictures!" },
  
  // Moons
  { keywords: ['moon', 'lunar'], answer: "Our Moon is Earth's only natural satellite and the fifth largest moon in the solar system! It controls our ocean tides and stabilizes Earth's tilt. Twelve astronauts have walked on the Moon during NASA's Apollo missions. The Moon has no atmosphere, so astronaut footprints will last for millions of years!" },
  { keywords: ['europa'], answer: "Europa is one of Jupiter's moons and it's incredibly exciting! Scientists believe there's a vast ocean of liquid water under its icy surface - more water than all of Earth's oceans combined! Europa might be one of the best places to search for alien life in our solar system." },
  { keywords: ['titan'], answer: "Titan is Saturn's largest moon and the only moon with a thick atmosphere! It has lakes and rivers, but they're not made of water - they're liquid methane and ethane! Titan is like a very cold version of early Earth." },
  { keywords: ['io'], answer: "Io is the most volcanically active world in the entire solar system! It has hundreds of volcanoes that shoot lava and sulfur hundreds of miles into space. Jupiter's strong gravity constantly squeezes Io, heating its interior and creating all this volcanic activity." },
  { keywords: ['ganymede'], answer: "Ganymede is the largest moon in our solar system - it's even bigger than the planet Mercury! It's one of Jupiter's four Galilean moons and has its own magnetic field, the only moon known to have one." },
  { keywords: ['enceladus'], answer: "Enceladus is a small icy moon of Saturn that shoots giant geysers of water vapor into space! These plumes come from a subsurface ocean heated by Saturn's gravity. Scientists think it could be a great place to search for life!" },
  
  // Stars
  { keywords: ['star', 'how stars work'], answer: "Stars are giant balls of hot, glowing gas! They're powered by nuclear fusion - hydrogen atoms smashing together to form helium, releasing enormous amounts of energy. Our Sun is a medium-sized yellow star. Stars come in many colors - blue stars are hottest, red stars are coolest!" },
  { keywords: ['supernova', 'exploding star'], answer: "A supernova is a massive explosion that happens when a giant star dies! It's one of the most powerful events in the universe, briefly outshining entire galaxies. Supernovas create and spread heavy elements like gold and iron throughout space!" },
  { keywords: ['neutron star', 'pulsar'], answer: "Neutron stars are the incredibly dense cores left behind after supernovas. A teaspoon of neutron star material would weigh billions of tons! Some neutron stars spin rapidly and beam radiation like lighthouses - we call these pulsars." },
  { keywords: ['red giant'], answer: "A red giant is what happens when a star like our Sun starts running out of hydrogen fuel. It swells up to many times its original size and becomes cooler and redder. In about 5 billion years, our Sun will become a red giant!" },
  { keywords: ['white dwarf'], answer: "A white dwarf is the final stage of life for stars like our Sun. After becoming a red giant, the star sheds its outer layers and leaves behind a hot, dense core about the size of Earth. White dwarfs slowly cool down over billions of years." },
  { keywords: ['betelgeuse'], answer: "Betelgeuse is a famous red supergiant star in the constellation Orion! It's about 700 times wider than our Sun and could explode as a supernova any time in the next 100,000 years. When it does, it might be visible during the day!" },
  { keywords: ['sirius'], answer: "Sirius is the brightest star in our night sky, located just 8.6 light-years away! It's actually a binary system - Sirius A is a bright white star, and Sirius B is a tiny white dwarf. Ancient Egyptians based their calendar on when Sirius rose!" },
  
  // Black Holes
  { keywords: ['black hole'], answer: "Black holes are regions of space where gravity is so incredibly strong that nothing can escape - not even light! They form when massive stars die and collapse. At the center of most galaxies, including our Milky Way, there are supermassive black holes millions or billions of times the mass of our Sun!" },
  { keywords: ['event horizon'], answer: "The event horizon is the boundary around a black hole - the point of no return! Once anything crosses the event horizon, it can never escape. From outside, time appears to slow down for objects approaching the event horizon." },
  { keywords: ['sagittarius', 'milky way center'], answer: "Sagittarius A* is the supermassive black hole at the center of our Milky Way galaxy! It's about 4 million times more massive than our Sun and 26,000 light-years away. Scientists took the first picture of it in 2022!" },
  
  // Galaxies
  { keywords: ['galaxy', 'galaxies'], answer: "Galaxies are huge collections of stars, gas, dust, and dark matter held together by gravity. Our Milky Way galaxy contains about 200-400 billion stars! There are over 200 billion galaxies in the observable universe, each with billions of stars." },
  { keywords: ['milky way', 'our galaxy'], answer: "The Milky Way is our home galaxy! It's a spiral galaxy about 100,000 light-years across. Our solar system is located in one of the spiral arms, about 26,000 light-years from the center. When you see the Milky Way in the night sky, you're looking into the disk of our galaxy!" },
  { keywords: ['andromeda'], answer: "Andromeda is the nearest large galaxy to the Milky Way, about 2.5 million light-years away! It's a spiral galaxy containing about a trillion stars. Andromeda and the Milky Way are actually moving toward each other and will collide in about 4.5 billion years!" },
  
  // Nebulas
  { keywords: ['nebula', 'nebulas'], answer: "Nebulas are giant clouds of gas and dust in space! Some are stellar nurseries where new stars are born. Others are the beautiful remains of dying stars. The word 'nebula' comes from Latin meaning 'cloud.' Famous nebulas include the Orion Nebula and the Pillars of Creation!" },
  { keywords: ['orion nebula'], answer: "The Orion Nebula is one of the closest stellar nurseries to Earth, about 1,344 light-years away! You can see it with your naked eye as a fuzzy patch in Orion's sword. New stars are being born there right now!" },
  { keywords: ['pillars of creation'], answer: "The Pillars of Creation are towering columns of gas and dust in the Eagle Nebula where new stars are forming! They're about 5 light-years tall - that's almost the distance from the Sun to the nearest star. The Hubble Space Telescope made them famous with a stunning photo!" },
  
  // Space Exploration - Rockets
  { keywords: ['rocket', 'rockets'], answer: "Rockets work using Newton's Third Law - when hot gases shoot out the bottom, the rocket is pushed upward! Unlike airplanes, rockets carry their own oxygen, so they can work in the vacuum of space. SpaceX has even made rockets that can land and be reused!" },
  { keywords: ['saturn v', 'saturn 5', 'moon rocket'], answer: "The Saturn V was the most powerful rocket ever successfully flown! It was 363 feet tall (taller than the Statue of Liberty!) and launched all the Apollo Moon missions. Its five F-1 engines produced 7.5 million pounds of thrust - enough to lift 130 tons!" },
  { keywords: ['falcon', 'spacex rocket'], answer: "SpaceX's Falcon 9 is a reusable rocket that has revolutionized spaceflight! It can land its first stage booster on a drone ship at sea and fly again, saving millions of dollars. The Falcon Heavy is even more powerful - it's currently the most powerful operational rocket!" },
  { keywords: ['starship'], answer: "Starship is SpaceX's next-generation rocket designed to carry 100 people to Mars! It's the tallest and most powerful rocket ever built. Starship is fully reusable and uses special heat tiles to survive reentry. Elon Musk hopes it will help make humans a multi-planetary species!" },
  { keywords: ['sls', 'artemis rocket'], answer: "The Space Launch System (SLS) is NASA's new mega-rocket for the Artemis Moon program! It's the most powerful rocket NASA has ever built. The first Artemis mission in 2022 sent an uncrewed Orion spacecraft around the Moon. Future missions will land astronauts on the lunar surface!" },
  
  // Space Exploration - Astronauts
  { keywords: ['astronaut', 'astronauts'], answer: "Astronauts are brave people who travel to space! To become an astronaut, you need to study hard, especially math and science, and be very fit and healthy. Astronauts train for years before going to space. They've walked on the Moon and now live on the International Space Station!" },
  { keywords: ['yuri gagarin', 'first human space'], answer: "Yuri Gagarin from Russia became the first human in space on April 12, 1961! His flight in Vostok 1 lasted just 108 minutes as he orbited Earth once. His famous words were 'Poyekhali!' meaning 'Let's go!' He became an instant hero worldwide!" },
  { keywords: ['neil armstrong', 'first moon'], answer: "Neil Armstrong became the first human to walk on the Moon on July 20, 1969! As commander of Apollo 11, he spoke the famous words: 'That's one small step for man, one giant leap for mankind.' Over 600 million people watched on TV!" },
  { keywords: ['buzz aldrin'], answer: "Buzz Aldrin was the second person to walk on the Moon, joining Neil Armstrong on Apollo 11 in 1969! He described the lunar landscape as 'magnificent desolation.' Aldrin is still an active space advocate and wants humans to go to Mars!" },
  { keywords: ['sally ride'], answer: "Sally Ride became the first American woman in space on June 18, 1983! She flew on the Space Shuttle twice and later started a program to inspire kids to study science. She was also the youngest American astronaut in space at 32!" },
  { keywords: ['valentina tereshkova', 'first woman space'], answer: "Valentina Tereshkova became the first woman in space on June 16, 1963 - twenty years before any American woman! She orbited Earth 48 times in nearly three days aboard Vostok 6. She was a factory worker and parachutist before becoming a cosmonaut!" },
  { keywords: ['chris hadfield'], answer: "Chris Hadfield is a Canadian astronaut who became famous for sharing space with the world on social media! He recorded a cover of David Bowie's 'Space Oddity' on the ISS that went viral. He commanded the space station and inspired millions with his videos about life in space!" },
  { keywords: ['peggy whitson'], answer: "Peggy Whitson holds the record for most time in space by an American - 665 days! She commanded the International Space Station twice and did 10 spacewalks. She's an incredible role model for future astronauts!" },
  { keywords: ['mae jemison'], answer: "Mae Jemison became the first African American woman in space in 1992 aboard Space Shuttle Endeavour! She was a doctor before becoming an astronaut. She said she was inspired by Lt. Uhura from Star Trek!" },
  
  // Space Exploration - Missions
  { keywords: ['iss', 'space station', 'international space station'], answer: "The International Space Station is a home in space where astronauts live and work! It orbits Earth about 16 times every day at 17,500 miles per hour. Astronauts from many countries work together on the ISS, doing science experiments and learning how to live in space." },
  { keywords: ['apollo', 'apollo 11', 'moon landing'], answer: "NASA's Apollo program landed 12 astronauts on the Moon between 1969 and 1972! Apollo 11 was the first Moon landing. Astronauts collected Moon rocks, took photographs, and conducted experiments. It was one of humanity's greatest achievements!" },
  { keywords: ['apollo 13'], answer: "Apollo 13 is called a 'successful failure' - an oxygen tank exploded on the way to the Moon, but Mission Control and the crew worked together to bring everyone home safely! It's an incredible story of problem-solving and teamwork in a life-or-death situation." },
  { keywords: ['voyager'], answer: "The Voyager 1 and 2 spacecraft launched in 1977 have traveled farther than any human-made object! They explored Jupiter, Saturn, Uranus, and Neptune, and are now in interstellar space. They carry Golden Records with sounds and images from Earth, in case aliens find them!" },
  { keywords: ['hubble', 'hubble telescope'], answer: "The Hubble Space Telescope has been taking amazing pictures of the universe since 1990! Orbiting above Earth's atmosphere, it can see things much more clearly than ground telescopes. Hubble has helped us learn the age of the universe and discovered that most galaxies have supermassive black holes!" },
  { keywords: ['james webb', 'jwst', 'telescope'], answer: "The James Webb Space Telescope is the most powerful space telescope ever built! Launched in December 2021, it can see incredibly distant galaxies and study the atmospheres of exoplanets. It orbits the Sun about a million miles from Earth!" },
  { keywords: ['artemis'], answer: "The Artemis program is NASA's plan to return humans to the Moon - and this time to stay! Artemis will land the first woman and first person of color on the Moon. It's preparing us for future missions to Mars!" },
  { keywords: ['perseverance', 'mars rover'], answer: "Perseverance is NASA's newest Mars rover, landing in 2021! It's searching for signs of ancient microbial life and collecting rock samples to eventually send back to Earth. It also carried Ingenuity, the first helicopter to fly on another planet!" },
  { keywords: ['curiosity'], answer: "Curiosity is a car-sized Mars rover that landed in 2012 and is still exploring! It discovered that Mars once had conditions that could support life. Curiosity has a laser to vaporize rocks and analyze them, and has traveled over 18 miles on Mars!" },
  { keywords: ['sputnik'], answer: "Sputnik 1 was the first artificial satellite, launched by the Soviet Union on October 4, 1957! This beach ball-sized spacecraft orbited Earth and beeped a radio signal that could be heard worldwide. It started the Space Age and the Space Race!" },
  { keywords: ['ingenuity', 'mars helicopter'], answer: "Ingenuity is a small helicopter that made history as the first powered aircraft to fly on another planet! It landed on Mars with Perseverance in 2021 and has completed over 50 flights. Flying on Mars is hard because the atmosphere is 100 times thinner than Earth's!" },
  
  // Space Exploration - General
  { keywords: ['spacewalk', 'eva'], answer: "A spacewalk (or EVA - Extra-Vehicular Activity) is when an astronaut goes outside the spacecraft in a spacesuit! The first spacewalk was by Soviet cosmonaut Alexei Leonov in 1965. Spacewalks are used to repair satellites, install equipment, and maintain the space station." },
  { keywords: ['spacesuit'], answer: "A spacesuit is like a personal spacecraft! It provides oxygen, temperature control, and protection from radiation and micrometeors. Modern spacesuits cost about $12 million each. They must be carefully designed so astronauts can move their fingers and work in space!" },
  { keywords: ['moon base', 'lunar base'], answer: "NASA and other space agencies are planning to build bases on the Moon! The Artemis program's Gateway station will orbit the Moon. Eventually, astronauts could live on the lunar surface for months, using local ice for water and preparing for Mars missions!" },
  { keywords: ['mars colony', 'living mars'], answer: "People are seriously planning to live on Mars! SpaceX wants to build a city there. We'd need to grow food in greenhouses, make fuel from the Martian atmosphere, and protect ourselves from radiation. It's challenging but could happen in your lifetime!" },
  
  // Phenomena
  { keywords: ['comet', 'comets'], answer: "Comets are like dirty snowballs made of ice, rock, and dust! When they get close to the Sun, the ice turns to gas and creates a beautiful glowing tail that always points away from the Sun. Halley's Comet visits every 76 years - it will return in 2061!" },
  { keywords: ['asteroid', 'asteroids'], answer: "Asteroids are rocky leftovers from when our solar system formed 4.6 billion years ago! Most orbit the Sun in the asteroid belt between Mars and Jupiter. Scientists track asteroids that come close to Earth to make sure we're safe." },
  { keywords: ['meteor', 'shooting star'], answer: "Meteors, or 'shooting stars,' are bits of space rock burning up in Earth's atmosphere! They create streaks of light as they heat up from friction. If a rock survives and lands on Earth, it's called a meteorite. You can see meteor showers several times a year!" },
  { keywords: ['aurora', 'northern lights'], answer: "Auroras are beautiful light shows in the sky caused by particles from the Sun interacting with Earth's magnetic field! The Northern Lights (Aurora Borealis) and Southern Lights (Aurora Australis) create dancing curtains of green, purple, and red light." },
  { keywords: ['solar flare'], answer: "Solar flares are powerful explosions on the Sun's surface! They release huge amounts of energy and radiation. Large solar flares can disrupt satellites, GPS, and power grids on Earth. The Sun goes through an 11-year cycle of activity, with more flares at solar maximum!" },
  
  // Big Questions
  { keywords: ['big bang'], answer: "The Big Bang was the beginning of our universe about 13.8 billion years ago! It wasn't an explosion in space - it was the beginning of space itself. Everything was incredibly hot and dense, then it started expanding and cooling. The universe is still expanding today!" },
  { keywords: ['dark matter'], answer: "Dark matter is mysterious invisible stuff that makes up about 27% of the universe! We can't see it, but we know it exists because of its gravity. Dark matter holds galaxies together. Scientists are still trying to figure out exactly what it is!" },
  { keywords: ['dark energy'], answer: "Dark energy is even more mysterious than dark matter! It makes up about 68% of the universe and is causing the universe to expand faster and faster. We don't really know what dark energy is - it's one of the biggest mysteries in science!" },
  { keywords: ['exoplanet', 'other planets'], answer: "Exoplanets are planets that orbit stars other than our Sun! We've discovered over 5,000 exoplanets, and there are probably billions more in our galaxy. Some are in the 'habitable zone' where liquid water might exist. Maybe one of them has life!" },
  { keywords: ['alien', 'extraterrestrial', 'life', 'are we alone'], answer: "We haven't found aliens yet, but scientists are searching! They look for signs of life on Mars, study moons like Europa that might have oceans, and listen for radio signals from space. The universe is so big that many scientists think life probably exists somewhere else!" },
  { keywords: ['light year'], answer: "A light-year is the distance light travels in one year - about 5.88 trillion miles! Light is the fastest thing in the universe, traveling at 186,000 miles per second. The nearest star to our Sun, Proxima Centauri, is about 4.24 light-years away." },
  { keywords: ['gravity'], answer: "Gravity is the force that pulls objects toward each other! It's why we stay on the ground and why planets orbit the Sun. The more massive something is, the stronger its gravity. Einstein showed that gravity actually bends space and time!" },
  { keywords: ['constellation', 'constellations'], answer: "Constellations are patterns of stars in the night sky that people have imagined for thousands of years! There are 88 official constellations. Famous ones include Orion the Hunter, Ursa Major (the Big Dipper is part of it), and Scorpius. Different constellations are visible in different seasons!" },
  { keywords: ['solar system'], answer: "Our solar system includes the Sun and everything that orbits around it: 8 planets, dwarf planets like Pluto, moons, asteroids, comets, and more! It formed about 4.6 billion years ago from a giant cloud of gas and dust. The Sun contains 99.8% of all the mass in our solar system!" },
  { keywords: ['space'], answer: "Space is the vast expanse beyond Earth's atmosphere! It's mostly empty, but contains stars, planets, galaxies, nebulas, and mysterious things like dark matter. Space is incredibly cold and has no air to breathe. Astronauts need special suits and spacecraft to survive in space!" },
  { keywords: ['universe'], answer: "The universe is everything that exists - all of space, time, matter, and energy! It began with the Big Bang about 13.8 billion years ago and has been expanding ever since. The observable universe is about 93 billion light-years across and contains at least 200 billion galaxies!" },
  { keywords: ['wormhole'], answer: "A wormhole is a theoretical tunnel through space-time that could connect two distant places! If they exist, you could travel billions of miles instantly. However, wormholes have never been observed and might require exotic matter that doesn't exist. They're still science fiction - for now!" },
  { keywords: ['time travel'], answer: "According to Einstein, time passes differently depending on speed and gravity! Astronauts on the ISS age slightly slower than people on Earth. Traveling near the speed of light would slow time even more. Going to the past might be impossible, but the future? Physics says maybe!" },
  { keywords: ['how old', 'sun age'], answer: "Our Sun is about 4.6 billion years old - and it's middle-aged! It has enough hydrogen fuel to keep shining for another 5 billion years. Then it will become a red giant and eventually a white dwarf." },
  { keywords: ['closest star', 'nearest star'], answer: "The closest star to our Sun is Proxima Centauri, about 4.24 light-years away! It's a small red dwarf star and has at least one planet. Even at the speed of the fastest spacecraft, it would take over 70,000 years to get there!" },
  { keywords: ['how many stars'], answer: "There are more stars in the universe than grains of sand on all Earth's beaches! Our Milky Way alone has 200-400 billion stars. With over 200 billion galaxies, that's roughly 200 sextillion stars (a 2 followed by 23 zeros)!" },
  { keywords: ['space cold', 'temperature space'], answer: "Space is incredibly cold - about -455°F (-270°C), just a few degrees above absolute zero! That's because there's almost nothing there to hold heat. In sunlight, things can get very hot (250°F), but in shadow, they freeze instantly!" },
  { keywords: ['speed earth', 'how fast earth'], answer: "Earth is moving really fast! We orbit the Sun at about 67,000 mph. But we're also moving with the solar system around the galaxy at 515,000 mph. And the galaxy is moving through the universe at 1.3 million mph! We don't feel it because everything moves together." },
  { keywords: ['smell space', 'space smell'], answer: "Astronauts say space has a distinct smell! When they come back inside after spacewalks, their suits smell like seared steak, gunpowder, or welding fumes. This comes from dying stars releasing chemicals called polycyclic aromatic hydrocarbons!" },
  { keywords: ['cry space'], answer: "If you cry in space, your tears don't fall - they form a wobbly ball on your face! Without gravity, the tears just stick to your eyes. Astronauts have to wipe them off with a towel. The same goes for sweat during exercise!" },
];

const CosmoAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Find the best answer from knowledge base
  const findAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    let bestMatch = { score: 0, answer: '' };
    
    for (const item of spaceKnowledge) {
      let score = 0;
      for (const keyword of item.keywords) {
        if (lowerQuestion.includes(keyword.toLowerCase())) {
          score += keyword.length;
        }
      }
      if (score > bestMatch.score) {
        bestMatch = { score, answer: item.answer };
      }
    }

    if (bestMatch.score > 0) {
      return bestMatch.answer;
    }

    // Default responses for common question types
    if (lowerQuestion.includes('how') || lowerQuestion.includes('why') || lowerQuestion.includes('what')) {
      return "That's a great space question! The universe is full of amazing mysteries. Could you ask me about something specific like the Sun, planets, stars, black holes, galaxies, or space exploration? I'd love to share what I know!";
    }

    return "Hello, young astronaut! I'm Cosmo, your friendly space guide. Ask me anything about the universe - planets, stars, galaxies, black holes, rockets, astronauts, or any cosmic wonder! What would you like to explore today?";
  };

  // Speak text using Web Speech API
  const speak = (text: string) => {
    if (!voiceEnabled) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    // Try to find a friendly voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Daniel') || 
      v.name.includes('Samantha') ||
      v.name.includes('Alex') ||
      v.lang === 'en-US'
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Handle user message
  const handleUserMessage = (text: string) => {
    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Get Cosmo's response
    setTimeout(() => {
      const answer = findAnswer(text);
      const cosmoMessage: Message = {
        role: 'cosmo',
        content: answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, cosmoMessage]);
      speak(answer);
    }, 500);
  };

  // Toggle voice input
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      handleUserMessage(inputText.trim());
    }
  };

  // Open with greeting
  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      const greeting = "Hello, young explorer! I'm Cosmo, your friendly space assistant! 🚀 Ask me anything about the amazing universe - planets, stars, galaxies, black holes, astronauts, and more! You can type your question or click the microphone to speak. What cosmic mystery shall we explore today?";
      const cosmoMessage: Message = {
        role: 'cosmo',
        content: greeting,
        timestamp: new Date()
      };
      setMessages([cosmoMessage]);
      setTimeout(() => speak(greeting), 500);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleOpen}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-space-nebula to-space-star shadow-lg shadow-purple-500/40 flex items-center justify-center hover:scale-110 transition-all duration-300 ${isOpen ? 'hidden' : ''}`}
      >
        <div className="relative">
          <Bot className="w-8 h-8 text-white" />
          <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] bg-gradient-to-br from-space-deep via-space-nebula/40 to-space-deep border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600/80 to-space-nebula/80 p-4 flex items-center justify-between border-b border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-space-star flex items-center justify-center">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                {isSpeaking && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
                )}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  Cosmo <Sparkles className="w-4 h-4 text-yellow-300" />
                </h3>
                <p className="text-purple-200 text-xs">Your Space Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="text-white hover:bg-white/20"
              >
                {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-space-star/80 text-white rounded-br-sm'
                      : 'bg-purple-600/40 text-white rounded-bl-sm border border-purple-500/30'
                  }`}
                >
                  {message.role === 'cosmo' && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="w-4 h-4 text-purple-300" />
                      <span className="text-xs text-purple-300 font-medium">Cosmo</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-purple-500/30 bg-space-deep/50">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Button
                type="button"
                onClick={toggleListening}
                className={`shrink-0 w-12 h-12 rounded-full ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask about space..."}
                className="flex-1 bg-white/10 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
                disabled={isListening}
              />
              <Button
                type="submit"
                disabled={!inputText.trim()}
                className="shrink-0 w-12 h-12 rounded-full bg-space-gold hover:bg-yellow-500 text-space-deep"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
            <p className="text-center text-purple-300/50 text-xs mt-2">
              {isListening ? '🎤 Speak your question...' : 'Click the mic to speak or type your question'}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CosmoAssistant;
