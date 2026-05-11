import { useRef, useState, useCallback, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { WebGLGuard } from './WebGLBoundary';

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
        <Html position={[-1, 1.5, 0]} center>
          <span className="text-xs font-semibold text-primary whitespace-nowrap">Mr. Doom</span>
        </Html>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <AlienBody 
          color="#06b6d4" 
          position={[1, 0, 0]} 
          eyeColor="#facc15"
          isSpeaking={speakingAlien === 'mrs'}
        />
        <Html position={[1, 1.5, 0]} center>
          <span className="text-xs font-semibold text-accent whitespace-nowrap">Mrs. Doom</span>
        </Html>
      </Float>
    </>
  );
};

const ALIEN_CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/alien-chat`;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ALIEN_INTRO_MESSAGES: { speaker: 'mr' | 'mrs'; text: string }[] = [
  { speaker: 'mr', text: "Greetings, young Earthling! I'm Mr. Doom!" },
  { speaker: 'mrs', text: "And I'm Mrs. Doom! We're here from the Andromeda galaxy to teach you about space! Ask us anything!" },
];

const AlienDoom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ speaker: 'user' | 'mr' | 'mrs'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [speakingAlien, setSpeakingAlien] = useState<'mr' | 'mrs' | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const language = 'en';
  const speechLocale = 'en-US';
  const targetLanguageName = 'English';

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
    utterance.lang = speechLocale;

    // Different voice settings for Mr. and Mrs. Doom
    if (speaker === 'mr') {
      utterance.pitch = 0.8;
      utterance.rate = 0.9;
    } else {
      utterance.pitch = 1.3;
      utterance.rate = 1.0;
    }

    const voices = window.speechSynthesis.getVoices();
    const localePrefix = speechLocale.split('-')[0].toLowerCase();
    const localeVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith(localePrefix));

    if (speaker === 'mr') {
      const maleVoice = localeVoices.find((voice) => /male|daniel|alex/i.test(voice.name)) || localeVoices[0];
      if (maleVoice) utterance.voice = maleVoice;
    } else {
      const femaleVoice = localeVoices.find((voice) => /female|samantha|victoria/i.test(voice.name)) || localeVoices[0];
      if (femaleVoice) utterance.voice = femaleVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled, speechLocale]);

  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<{ role: string; content: string }[]>([]);

  const initializeIntroMessages = useCallback(async () => {
    if (messages.length > 0) return;

    try {
      let resp: Response | null = null;

      for (let attempt = 0; attempt < 3; attempt++) {
        resp = await fetch(ALIEN_CHAT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: 'Give a short greeting in 2 lines introducing Mr. Doom and Mrs. Doom to a kid.' }],
            language,
            targetLanguageName,
          }),
        });

        if ((resp.status === 429 || resp.status >= 500) && attempt < 2) {
          await wait(1200 * (attempt + 1));
          continue;
        }

        break;
      }

      if (!resp || !resp.ok) throw new Error('Failed to initialize greeting');

      const data = await resp.json();
      const raw = (data.content || '').replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(raw) as { speaker: 'mr' | 'mrs'; text: string }[];

      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed.slice(0, 2));
        return;
      }

      setMessages(ALIEN_INTRO_MESSAGES);
    } catch {
      setMessages(ALIEN_INTRO_MESSAGES);
    }
  }, [messages.length, language, targetLanguageName]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { speaker: 'user', text: userMessage }]);
    setIsLoading(true);

    const newHistory = [...conversationHistory, { role: 'user', content: userMessage }];

    try {
      let resp: Response | null = null;

      for (let attempt = 0; attempt < 3; attempt++) {
        resp = await fetch(ALIEN_CHAT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: newHistory.slice(-10), language, targetLanguageName }),
        });

        if ((resp.status === 429 || resp.status >= 500) && attempt < 2) {
          await wait(1200 * (attempt + 1));
          continue;
        }

        break;
      }

      if (!resp || !resp.ok) {
        const errData = await resp?.json().catch(() => ({}));
        throw new Error(errData?.error || 'Failed to get response');
      }

      const data = await resp.json();
      let parsed: { speaker: 'mr' | 'mrs'; text: string }[];

      try {
        const raw = data.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsed = JSON.parse(raw);
      } catch {
        parsed = [{ speaker: 'mr', text: data.content }];
      }

      const assistantContent = parsed.map(p => `${p.speaker === 'mr' ? 'Mr. Doom' : 'Mrs. Doom'}: ${p.text}`).join('\n');
      setConversationHistory([...newHistory, { role: 'assistant', content: assistantContent }]);

      parsed.forEach((resp, index) => {
        setTimeout(() => {
          setSpeakingAlien(resp.speaker);
          setMessages(prev => [...prev, { speaker: resp.speaker, text: resp.text }]);
          const cleanText = resp.text.replace(/[\u{1F600}-\u{1F9FF}]/gu, '').replace(/[*#_~`]/g, '');
          speak(cleanText, resp.speaker);
          setTimeout(() => setSpeakingAlien(null), 2000);
        }, (index + 1) * 1500);
      });
    } catch (e) {
      console.error('Alien chat error:', e);
      setMessages(prev => [...prev, { speaker: 'mr', text: "Our cosmic signal got disrupted! Please try asking again, Earthling! 🛸" }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, speak, isLoading, conversationHistory, language, targetLanguageName]);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleOpen = async () => {
    setIsOpen(true);
    await initializeIntroMessages();
  };

  return (
    <>
      {/* Floating button to open alien chat */}
      <button
        onClick={handleOpen}
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
              <WebGLGuard>
                <Canvas
                  camera={{ position: [0, 0.5, 4], fov: 50 }}
                  dpr={[1, 1.5]}
                  gl={{ antialias: false, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false }}
                  onCreated={({ gl }) => {
                    gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault());
                  }}
                >
                  <Suspense fallback={null}>
                    <AlienScene speakingAlien={speakingAlien} />
                  </Suspense>
                </Canvas>
              </WebGLGuard>
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
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] px-4 py-2 rounded-2xl bg-secondary text-secondary-foreground">
                      <span className="font-bold text-xs opacity-80 block mb-1">👽 Mr. Doom</span>
                      <p className="text-sm animate-pulse">Consulting the cosmos...</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input area */}
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Mr & Mrs Doom about space..."
                  className="flex-1 bg-muted/50 border-primary/30 text-foreground placeholder:text-muted-foreground"
                  disabled={isLoading}
                />
                <Button onClick={handleSend} className="bg-primary hover:bg-primary/90" disabled={isLoading}>
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
