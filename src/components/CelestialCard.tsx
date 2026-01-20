import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image, BookOpen, MessageCircle, X, ChevronDown, ChevronUp, Sparkles, Loader2 } from 'lucide-react';
import type { CelestialBody } from '@/data/celestialBodies';

interface CelestialCardProps {
  body: CelestialBody;
  onSelect: () => void;
}

// Realistic image URLs for celestial bodies
const celestialImages: Record<string, string> = {
  sun: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&h=600&fit=crop',
  mercury: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=600&fit=crop',
  venus: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop',
  earth: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=600&fit=crop',
  moon: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=800&h=600&fit=crop',
  mars: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop',
  jupiter: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&h=600&fit=crop',
  saturn: 'https://images.unsplash.com/photo-1614732484003-ef9881f25834?w=800&h=600&fit=crop',
  uranus: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop',
  neptune: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&h=600&fit=crop',
  pluto: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop',
  // Nebulas
  orion: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop',
  crab: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&h=600&fit=crop',
  eagle: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&h=600&fit=crop',
  helix: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&h=600&fit=crop',
  // Galaxies
  milkyway: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&h=600&fit=crop',
  andromeda: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&h=600&fit=crop',
  triangulum: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop',
  whirlpool: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
  sombrero: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&h=600&fit=crop',
  // Stars
  sirius: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop',
  polaris: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=800&h=600&fit=crop',
  betelgeuse: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&h=600&fit=crop',
  rigel: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&h=600&fit=crop',
  // Default fallback
  default: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop'
};

const getImageForBody = (id: string): string => {
  return celestialImages[id] || celestialImages.default;
};

// Cosmo's knowledge base for celestial bodies
const getCosmoResponse = (bodyName: string): string => {
  const responses: Record<string, string> = {
    sun: "Hello, young explorer! ☀️ The Sun is absolutely magnificent! Did you know it's so big that about 1.3 million Earths could fit inside it? And it takes 8 minutes for sunlight to reach us here on Earth. The Sun is about 4.6 billion years old - that's older than dinosaurs by a LOT!",
    mercury: "Oh Mercury! 🪨 The smallest planet zooms around the Sun faster than any other - a year there is only 88 Earth days! But watch out for the temperature swings - it goes from super hot to freezing cold because Mercury has almost no atmosphere to keep it warm at night.",
    venus: "Venus is fascinating! 🌕 It's called Earth's twin because it's almost the same size, but it's SO different! It spins backwards, it's the hottest planet (even hotter than Mercury!), and a day there is longer than a year. Imagine that - celebrating your birthday before lunchtime!",
    earth: "Our beautiful home! 🌍 Earth is the only planet we know of with liquid water on its surface and the only one with known life. We're in the perfect 'Goldilocks zone' - not too hot, not too cold, just right! And fun fact: Earth is NOT perfectly round - it's a bit squished at the poles!",
    moon: "Our lovely Moon! 🌙 Did you know 12 humans have walked on the Moon? The footprints they left will stay there for millions of years because there's no wind! The Moon is slowly moving away from Earth - about 3.8 centimeters every year. It controls our ocean tides and lights up our night sky!",
    mars: "The Red Planet! 🔴 Mars has the biggest volcano in the whole solar system - Olympus Mons is about 3 times taller than Mount Everest! Scientists think Mars once had rivers and oceans. Right now, robots like Perseverance are exploring Mars and looking for signs of ancient life!",
    jupiter: "Mighty Jupiter! 🟠 It's SO big that all the other planets could fit inside it! The Great Red Spot is a storm bigger than Earth that's been raging for hundreds of years. Jupiter has at least 95 moons, and one of them - Europa - might have an ocean under its ice where aliens could live!",
    saturn: "Spectacular Saturn! 💫 Those gorgeous rings are made of billions of pieces of ice and rock! Some pieces are tiny like grains of sand, others are as big as houses. Saturn is so light that if you had a big enough bathtub, it would float! It also has an amazing moon called Titan with lakes of liquid methane.",
    uranus: "Silly Uranus! 🔵 This planet rolls around the Sun on its side like a bowling ball! Scientists think something HUGE crashed into it long ago and knocked it over. Uranus has 27 moons, all named after characters from Shakespeare plays. It's an ice giant with a beautiful blue-green color!",
    neptune: "Windy Neptune! 🔷 It has the strongest winds in the solar system - over 1,200 miles per hour! That's faster than the speed of sound! Neptune is so far away that it takes 165 Earth years to go around the Sun once. Its big moon Triton orbits backwards and might have geysers!",
    pluto: "Dear little Pluto! ❤️ Even though it's now called a dwarf planet, Pluto is still special! It has a heart-shaped glacier on its surface called Tombaugh Regio. Pluto is smaller than our Moon and takes 248 years to orbit the Sun. The New Horizons spacecraft showed us its amazing surface in 2015!",
  };
  
  const lowerName = bodyName.toLowerCase();
  for (const [key, response] of Object.entries(responses)) {
    if (lowerName.includes(key)) {
      return response;
    }
  }
  
  return `What an interesting celestial object! ${bodyName} is truly amazing. The universe is full of wonders waiting to be discovered. Did you know that when you look at stars, you're actually looking back in time? The light takes years to reach us! Keep exploring, young astronomer! 🚀✨`;
};

interface ImageModalProps {
  body: CelestialBody;
  onClose: () => void;
}

const ImageModal = ({ body, onClose }: ImageModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="glass-card max-w-4xl w-full rounded-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          <img 
            src={getImageForBody(body.id)} 
            alt={body.name}
            className="w-full h-[60vh] object-cover"
            onLoad={() => setIsLoading(false)}
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{body.icon}</span>
            <div>
              <h3 className="text-2xl font-display font-bold">{body.name}</h3>
              <span className="text-sm text-muted-foreground">{body.type}</span>
            </div>
          </div>
          <p className="text-muted-foreground">{body.description}</p>
        </div>
      </div>
    </div>
  );
};

interface ReadMoreModalProps {
  body: CelestialBody;
  onClose: () => void;
}

const ReadMoreModal = ({ body, onClose }: ReadMoreModalProps) => {
  const [showExtendedFacts, setShowExtendedFacts] = useState(false);
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="glass-card max-w-2xl w-full rounded-2xl p-6 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="text-6xl mb-3">{body.icon}</div>
          <h3 className="text-2xl font-display font-bold">{body.name}</h3>
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-primary/20 text-primary mt-2">
            {body.type}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1">What is it?</h4>
            <p className="text-foreground">{body.longDescription}</p>
          </div>

          <div className="glass-card p-4 rounded-xl bg-accent/10 border-accent/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <h4 className="text-sm font-semibold text-accent">Cool Fact!</h4>
            </div>
            <p className="text-foreground">{body.coolFact}</p>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <button
              onClick={() => setShowExtendedFacts(!showExtendedFacts)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🌟</span>
                <h4 className="text-sm font-semibold text-foreground">More Amazing Facts</h4>
              </div>
              {showExtendedFacts ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            {showExtendedFacts && (
              <ul className="mt-3 space-y-2">
                {body.extendedFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">✦</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-between items-center glass-card p-4 rounded-xl">
            <span className="text-sm text-muted-foreground">{body.metricLabel}</span>
            <span className="font-display font-bold text-primary">{body.metric}</span>
          </div>

          <div className="glass-card p-4 rounded-xl bg-secondary/10 border-secondary/30">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-secondary" />
              <h4 className="text-sm font-semibold text-secondary">Deep Dive</h4>
            </div>
            <p className="text-foreground leading-relaxed">{body.readMoreContent}</p>
          </div>
        </div>

        <Button onClick={onClose} className="w-full mt-6">
          Keep Exploring! 🚀
        </Button>
      </div>
    </div>
  );
};

interface CosmoModalProps {
  body: CelestialBody;
  onClose: () => void;
}

const CosmoModal = ({ body, onClose }: CosmoModalProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const response = getCosmoResponse(body.name);
  
  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Alex')
      );
      if (preferredVoice) utterance.voice = preferredVoice;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="glass-card max-w-lg w-full rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-2xl animate-pulse">
              🤖
            </div>
            <div>
              <h3 className="font-display font-bold">Cosmo Assistant</h3>
              <p className="text-xs text-muted-foreground">Space Knowledge Expert</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{body.icon}</span>
            <span className="font-semibold">About {body.name}...</span>
          </div>
          <p className="text-foreground leading-relaxed">{response}</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={isSpeaking ? stopSpeaking : speak} 
            variant={isSpeaking ? "destructive" : "default"}
            className="flex-1 gap-2"
          >
            <MessageCircle className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
            {isSpeaking ? 'Stop Speaking' : 'Listen to Cosmo 🎤'}
          </Button>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

const CelestialCard = ({ body, onSelect }: CelestialCardProps) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showReadMoreModal, setShowReadMoreModal] = useState(false);
  const [showCosmoModal, setShowCosmoModal] = useState(false);
  
  return (
    <>
      <div className="glass-card p-4 rounded-xl transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:border-primary/50">
        <div className="text-center mb-3">
          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
            {body.icon}
          </div>
          <h3 className="font-display font-bold text-sm mb-1 group-hover:text-primary transition-colors">
            {body.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {body.description}
          </p>
          <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs bg-${body.color}/20 text-${body.color}`}>
            {body.type}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-muted">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => setShowImageModal(true)}
            className="flex flex-col items-center gap-0.5 h-auto py-2 px-1 text-xs hover:bg-primary/10"
          >
            <Image className="w-4 h-4" />
            <span className="text-[10px]">Image</span>
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => setShowReadMoreModal(true)}
            className="flex flex-col items-center gap-0.5 h-auto py-2 px-1 text-xs hover:bg-secondary/10"
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px]">Read</span>
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => setShowCosmoModal(true)}
            className="flex flex-col items-center gap-0.5 h-auto py-2 px-1 text-xs hover:bg-accent/10"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-[10px]">Cosmo</span>
          </Button>
        </div>
      </div>
      
      {showImageModal && (
        <ImageModal body={body} onClose={() => setShowImageModal(false)} />
      )}
      {showReadMoreModal && (
        <ReadMoreModal body={body} onClose={() => setShowReadMoreModal(false)} />
      )}
      {showCosmoModal && (
        <CosmoModal body={body} onClose={() => setShowCosmoModal(false)} />
      )}
    </>
  );
};

export default CelestialCard;