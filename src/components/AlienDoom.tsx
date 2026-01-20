import { useRef, useState, useCallback, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, MessageCircle, Volume2, VolumeX } from 'lucide-react';

// Alien body component - legless floating alien
const AlienBody = ({ 
  color, 
  position, 
  eyeColor,
  isSpeaking 
}: { 
  color: string; 
  position: [number, number, number];
  eyeColor: string;
  isSpeaking: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (mouthRef.current && isSpeaking) {
      // Mouth animation when speaking
      mouthRef.current.scale.y = 0.5 + Math.sin(state.clock.elapsedTime * 15) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main body - oval shaped */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Head - larger on top */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Big eyes */}
      <mesh position={[-0.15, 0.7, 0.3]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.15, 0.7, 0.3]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Pupils */}
      <mesh position={[-0.15, 0.7, 0.4]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={eyeColor} />
      </mesh>
      <mesh position={[0.15, 0.7, 0.4]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={eyeColor} />
      </mesh>
      
      {/* Mouth */}
      <mesh ref={mouthRef} position={[0, 0.45, 0.35]}>
        <boxGeometry args={[0.15, 0.05, 0.05]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Antennae */}
      <mesh position={[-0.2, 1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.2, 1.15, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.2, 1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.2, 1.15, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={0.5} />
      </mesh>
      
      {/* Small arms */}
      <mesh position={[-0.5, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <capsuleGeometry args={[0.06, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.5, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <capsuleGeometry args={[0.06, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Floating glow effect underneath */}
      <mesh position={[0, -0.3, 0]}>
        <ringGeometry args={[0.2, 0.4, 32]} />
        <meshBasicMaterial color={eyeColor} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// Scene with both aliens
const AlienScene = ({ 
  speakingAlien 
}: { 
  speakingAlien: 'mr' | 'mrs' | null 
}) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#a855f7" />
      <pointLight position={[-5, 5, 5]} intensity={1} color="#06b6d4" />
      
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <AlienBody 
          color="#8b5cf6" 
          position={[-1, 0, 0]} 
          eyeColor="#f43f5e"
          isSpeaking={speakingAlien === 'mr'}
        />
        <Text
          position={[-1, 1.5, 0]}
          fontSize={0.15}
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
        >
          Mr. Doom
        </Text>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <AlienBody 
          color="#06b6d4" 
          position={[1, 0, 0]} 
          eyeColor="#facc15"
          isSpeaking={speakingAlien === 'mrs'}
        />
        <Text
          position={[1, 1.5, 0]}
          fontSize={0.15}
          color="#06b6d4"
          anchorX="center"
          anchorY="middle"
        >
          Mrs. Doom
        </Text>
      </Float>
    </>
  );
};

// Space knowledge for Mr & Mrs Doom
const alienResponses: Record<string, { speaker: 'mr' | 'mrs'; response: string }[]> = {
  default: [
    { speaker: 'mr', response: "Greetings, young Earthling! I'm Mr. Doom, and this is my lovely partner Mrs. Doom. We've traveled across galaxies to share space knowledge with you!" },
    { speaker: 'mrs', response: "We come from the Andromeda galaxy! Ask us anything about space, planets, stars, or the mysteries of the universe!" }
  ],
  planet: [
    { speaker: 'mr', response: "Ah, planets! On our home world, we have 7 moons and purple oceans. Your solar system has 8 magnificent planets - Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune!" },
    { speaker: 'mrs', response: "Jupiter is my favorite! It's so massive that 1,300 Earths could fit inside it. The Great Red Spot is a storm bigger than your entire planet!" }
  ],
  star: [
    { speaker: 'mrs', response: "Stars are giant balls of hot glowing gas! Your Sun is a yellow dwarf star, but we've seen blue giants 100 times larger on our journeys!" },
    { speaker: 'mr', response: "Fun fact: When you look at stars, you're seeing the past! The light from distant stars takes years to reach Earth!" }
  ],
  moon: [
    { speaker: 'mr', response: "Your Moon is quite special! It's the 5th largest moon in the solar system. On our travels, we've seen moons with underground oceans like Europa!" },
    { speaker: 'mrs', response: "The Moon has no atmosphere, so astronaut footprints stay there forever! Isn't that fascinating?" }
  ],
  alien: [
    { speaker: 'mrs', response: "We're proof that aliens exist! *giggles* The universe is so vast - with billions of galaxies, it would be strange if Earth was the only place with life!" },
    { speaker: 'mr', response: "Scientists are always searching for signs of life on other planets. Mars and Europa are top candidates for finding microbial life!" }
  ],
  galaxy: [
    { speaker: 'mr', response: "Galaxies are like cosmic cities of stars! Your Milky Way has over 200 billion stars. We've visited many galaxies in our travels!" },
    { speaker: 'mrs', response: "The Andromeda galaxy, our home, is actually moving toward the Milky Way! But don't worry, the merger won't happen for 4 billion years!" }
  ],
  blackhole: [
    { speaker: 'mrs', response: "Black holes are regions where gravity is SO strong that not even light can escape! We always steer our spacecraft far away from them!" },
    { speaker: 'mr', response: "There's a supermassive black hole at the center of the Milky Way called Sagittarius A*. It's 4 million times more massive than your Sun!" }
  ],
  rocket: [
    { speaker: 'mr', response: "Your human rockets are quite impressive for a young civilization! The Saturn V that took astronauts to the Moon remains one of the most powerful rockets ever built!" },
    { speaker: 'mrs', response: "Rockets work by pushing gas out one end very fast, which propels the rocket forward. It's Newton's third law - for every action, there's an equal and opposite reaction!" }
  ],
  astronaut: [
    { speaker: 'mrs', response: "Astronauts are so brave! They float in microgravity, eat freeze-dried food, and work in a space station orbiting Earth at 17,500 miles per hour!" },
    { speaker: 'mr', response: "Yuri Gagarin was the first human in space in 1961, and Neil Armstrong was first to walk on the Moon in 1969. We watched from afar - very exciting times!" }
  ],
  sun: [
    { speaker: 'mr', response: "Your Sun is about 4.6 billion years old and is in the middle of its life! It's so hot that its core reaches 27 million degrees Fahrenheit!" },
    { speaker: 'mrs', response: "The Sun makes up 99.86% of all the mass in your solar system! Without it, life on Earth wouldn't exist. Cherish your star!" }
  ],
  mars: [
    { speaker: 'mrs', response: "Mars is called the Red Planet because of iron oxide (rust) on its surface! It has the largest volcano in the solar system - Olympus Mons!" },
    { speaker: 'mr', response: "We've picnicked on Mars! It's cold there - averaging minus 80°F. Humans might live there someday with the right technology!" }
  ]
};

const getAlienResponse = (question: string): { speaker: 'mr' | 'mrs'; response: string }[] => {
  const lowerQ = question.toLowerCase();
  
  if (lowerQ.includes('planet')) return alienResponses.planet;
  if (lowerQ.includes('star')) return alienResponses.star;
  if (lowerQ.includes('moon')) return alienResponses.moon;
  if (lowerQ.includes('alien') || lowerQ.includes('life')) return alienResponses.alien;
  if (lowerQ.includes('galaxy') || lowerQ.includes('milky')) return alienResponses.galaxy;
  if (lowerQ.includes('black hole')) return alienResponses.blackhole;
  if (lowerQ.includes('rocket') || lowerQ.includes('spacecraft')) return alienResponses.rocket;
  if (lowerQ.includes('astronaut') || lowerQ.includes('space travel')) return alienResponses.astronaut;
  if (lowerQ.includes('sun') || lowerQ.includes('solar')) return alienResponses.sun;
  if (lowerQ.includes('mars') || lowerQ.includes('red planet')) return alienResponses.mars;
  
  return alienResponses.default;
};

const AlienDoom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ speaker: 'user' | 'mr' | 'mrs'; text: string }[]>([
    { speaker: 'mr', text: "Greetings, young Earthling! I'm Mr. Doom!" },
    { speaker: 'mrs', text: "And I'm Mrs. Doom! We're here from the Andromeda galaxy to teach you about space! Ask us anything!" }
  ]);
  const [input, setInput] = useState('');
  const [speakingAlien, setSpeakingAlien] = useState<'mr' | 'mrs' | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize speech synthesis voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  // Voice synthesis function
  const speak = useCallback((text: string, speaker: 'mr' | 'mrs') => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Different voice settings for Mr. and Mrs. Doom
    if (speaker === 'mr') {
      utterance.pitch = 0.8;
      utterance.rate = 0.9;
    } else {
      utterance.pitch = 1.3;
      utterance.rate = 1.0;
    }
    
    const voices = window.speechSynthesis.getVoices();
    if (speaker === 'mr') {
      const maleVoice = voices.find(v => v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('Google UK English Male'));
      if (maleVoice) utterance.voice = maleVoice;
    } else {
      const femaleVoice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Google UK English Female'));
      if (femaleVoice) utterance.voice = femaleVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { speaker: 'user', text: userMessage }]);
    
    // Get responses from aliens
    const responses = getAlienResponse(userMessage);
    
    // Add responses with delay for speaking animation
    responses.forEach((resp, index) => {
      setTimeout(() => {
        setSpeakingAlien(resp.speaker);
        setMessages(prev => [...prev, { speaker: resp.speaker, text: resp.response }]);
        
        // Speak the response
        speak(resp.response, resp.speaker);
        
        setTimeout(() => setSpeakingAlien(null), 2000);
      }, (index + 1) * 1500);
    });
  }, [input, speak]);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <>
      {/* Floating button to open alien chat */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat with Mr & Mrs Doom"
      >
        <span className="text-2xl">👽</span>
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-xs text-destructive-foreground animate-pulse">
          2
        </span>
      </button>

      {/* Alien chat modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl h-[80vh] bg-gradient-to-b from-background to-primary/20 rounded-2xl border border-primary/30 shadow-2xl overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => {
                setIsOpen(false);
                stopSpeaking();
              }}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {/* Voice toggle */}
            <button
              onClick={() => {
                setVoiceEnabled(!voiceEnabled);
                if (voiceEnabled) stopSpeaking();
              }}
              className="absolute top-4 left-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              aria-label={voiceEnabled ? "Disable voice" : "Enable voice"}
            >
              {voiceEnabled ? (
                <Volume2 className="w-5 h-5 text-primary" />
              ) : (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            
            {/* 3D Canvas with aliens */}
            <div className="h-[45%] w-full">
              <Canvas camera={{ position: [0, 0.5, 4], fov: 50 }}>
                <Suspense fallback={null}>
                  <AlienScene speakingAlien={speakingAlien} />
                </Suspense>
              </Canvas>
            </div>
            
            {/* Chat area */}
            <div className="h-[55%] flex flex-col p-4">
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 scrollbar-thin">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                        msg.speaker === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : msg.speaker === 'mr'
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-accent text-accent-foreground'
                      }`}
                    >
                      {msg.speaker !== 'user' && (
                        <span className="font-bold text-xs opacity-80 block mb-1">
                          {msg.speaker === 'mr' ? '👽 Mr. Doom' : '👽 Mrs. Doom'}
                        </span>
                      )}
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Input area */}
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Mr & Mrs Doom about space..."
                  className="flex-1 bg-muted/50 border-primary/30 text-foreground placeholder:text-muted-foreground"
                />
                <Button onClick={handleSend} className="bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlienDoom;
