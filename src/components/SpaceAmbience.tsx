import { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Music, ChevronDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface MelodyPreset {
  id: string;
  name: string;
  icon: string;
  frequencies: number[];
  oscType: OscillatorType;
  lfoSpeed: number;
  lfoDepth: number;
  filterFreq: number;
  noiseLevel: number;
  twinkleRange: [number, number];
  twinkleGain: number;
}

const melodyPresets: MelodyPreset[] = [
  { id: 'deep_space_drone', name: 'Deep Space Drone', icon: '🌑', frequencies: [55, 82.41, 110, 220], oscType: 'sine', lfoSpeed: 0.03, lfoDepth: 0.015, filterFreq: 150, noiseLevel: 0.025, twinkleRange: [200, 500], twinkleGain: 0.02 },
  { id: 'cosmic_waltz', name: 'Cosmic Waltz', icon: '💫', frequencies: [130.81, 164.81, 196, 261.63], oscType: 'triangle', lfoSpeed: 0.12, lfoDepth: 0.03, filterFreq: 400, noiseLevel: 0.01, twinkleRange: [500, 1200], twinkleGain: 0.04 },
  { id: 'stellar_lullaby', name: 'Stellar Lullaby', icon: '🌟', frequencies: [196, 246.94, 293.66, 392], oscType: 'sine', lfoSpeed: 0.06, lfoDepth: 0.02, filterFreq: 300, noiseLevel: 0.008, twinkleRange: [600, 1000], twinkleGain: 0.03 },
  { id: 'nebula_pulse', name: 'Nebula Pulse', icon: '🌀', frequencies: [73.42, 110, 146.83, 220], oscType: 'sawtooth', lfoSpeed: 0.08, lfoDepth: 0.04, filterFreq: 200, noiseLevel: 0.03, twinkleRange: [300, 700], twinkleGain: 0.02 },
  { id: 'aurora_waves', name: 'Aurora Waves', icon: '🌊', frequencies: [174.61, 220, 261.63, 329.63], oscType: 'sine', lfoSpeed: 0.04, lfoDepth: 0.025, filterFreq: 350, noiseLevel: 0.012, twinkleRange: [700, 1500], twinkleGain: 0.035 },
  { id: 'galactic_harp', name: 'Galactic Harp', icon: '🎵', frequencies: [261.63, 329.63, 392, 523.25], oscType: 'triangle', lfoSpeed: 0.15, lfoDepth: 0.01, filterFreq: 600, noiseLevel: 0.005, twinkleRange: [800, 2000], twinkleGain: 0.05 },
  { id: 'lunar_drift', name: 'Lunar Drift', icon: '🌙', frequencies: [65.41, 98, 130.81, 196], oscType: 'sine', lfoSpeed: 0.02, lfoDepth: 0.02, filterFreq: 180, noiseLevel: 0.02, twinkleRange: [300, 600], twinkleGain: 0.025 },
  { id: 'solar_wind', name: 'Solar Wind', icon: '☀️', frequencies: [110, 146.83, 174.61, 220], oscType: 'sawtooth', lfoSpeed: 0.1, lfoDepth: 0.05, filterFreq: 250, noiseLevel: 0.04, twinkleRange: [400, 900], twinkleGain: 0.03 },
  { id: 'quantum_whisper', name: 'Quantum Whisper', icon: '🔮', frequencies: [293.66, 349.23, 440, 523.25], oscType: 'sine', lfoSpeed: 0.07, lfoDepth: 0.008, filterFreq: 500, noiseLevel: 0.006, twinkleRange: [1000, 2500], twinkleGain: 0.04 },
  { id: 'astral_choir', name: 'Astral Choir', icon: '👼', frequencies: [220, 277.18, 329.63, 440], oscType: 'triangle', lfoSpeed: 0.05, lfoDepth: 0.018, filterFreq: 450, noiseLevel: 0.01, twinkleRange: [600, 1400], twinkleGain: 0.035 },
  { id: 'void_echo', name: 'Void Echo', icon: '🕳️', frequencies: [41.2, 55, 82.41, 110], oscType: 'sine', lfoSpeed: 0.015, lfoDepth: 0.03, filterFreq: 120, noiseLevel: 0.035, twinkleRange: [150, 400], twinkleGain: 0.015 },
  { id: 'supernova_glow', name: 'Supernova Glow', icon: '💥', frequencies: [164.81, 207.65, 261.63, 329.63], oscType: 'sawtooth', lfoSpeed: 0.09, lfoDepth: 0.035, filterFreq: 320, noiseLevel: 0.02, twinkleRange: [500, 1100], twinkleGain: 0.04 },
  { id: 'orbital_bells', name: 'Orbital Bells', icon: '🔔', frequencies: [523.25, 659.25, 783.99, 1046.5], oscType: 'sine', lfoSpeed: 0.2, lfoDepth: 0.005, filterFreq: 800, noiseLevel: 0.003, twinkleRange: [1200, 3000], twinkleGain: 0.06 },
  { id: 'comet_trail', name: 'Comet Trail', icon: '☄️', frequencies: [146.83, 196, 246.94, 293.66], oscType: 'triangle', lfoSpeed: 0.11, lfoDepth: 0.022, filterFreq: 380, noiseLevel: 0.015, twinkleRange: [450, 1000], twinkleGain: 0.03 },
  { id: 'starfield_shimmer', name: 'Starfield Shimmer', icon: '✨', frequencies: [392, 493.88, 587.33, 783.99], oscType: 'sine', lfoSpeed: 0.18, lfoDepth: 0.006, filterFreq: 700, noiseLevel: 0.004, twinkleRange: [900, 2200], twinkleGain: 0.05 },
];

const SpaceAmbience = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const [showMelodyList, setShowMelodyList] = useState(false);
  const [selectedMelody, setSelectedMelody] = useState<string>(() => {
    return localStorage.getItem('spaceMelody') || 'deep_space_drone';
  });
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const twinkleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lfosRef = useRef<OscillatorNode[]>([]);

  const currentPreset = melodyPresets.find(m => m.id === selectedMelody) || melodyPresets[0];

  const stopSpaceMusic = useCallback(() => {
    if (twinkleTimeoutRef.current) {
      clearTimeout(twinkleTimeoutRef.current);
      twinkleTimeoutRef.current = null;
    }
    oscillatorsRef.current.forEach(osc => { try { osc.stop(); } catch (e) {} });
    oscillatorsRef.current = [];
    lfosRef.current.forEach(lfo => { try { lfo.stop(); } catch (e) {} });
    lfosRef.current = [];
    if (noiseNodeRef.current) { try { noiseNodeRef.current.stop(); } catch (e) {} noiseNodeRef.current = null; }
    if (audioContextRef.current) { audioContextRef.current.close(); audioContextRef.current = null; gainNodeRef.current = null; }
  }, []);

  const createSpaceMusic = useCallback((preset: MelodyPreset) => {
    stopSpaceMusic();

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;

    const masterGain = audioContext.createGain();
    masterGain.gain.value = volume;
    masterGain.connect(audioContext.destination);
    gainNodeRef.current = masterGain;

    // Main pad from preset
    preset.frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const oscGain = audioContext.createGain();
      oscillator.type = preset.oscType;
      oscillator.frequency.value = freq;

      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = preset.lfoSpeed + index * 0.02;
      lfoGain.gain.value = freq * preset.lfoDepth;
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      lfo.start();
      lfosRef.current.push(lfo);

      oscGain.gain.value = 0.08;
      oscillator.connect(oscGain);
      oscGain.connect(masterGain);
      oscillator.start();
      oscillatorsRef.current.push(oscillator);
    });

    // Noise layer
    const bufferSize = audioContext.sampleRate * 4;
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * preset.noiseLevel;
    }
    const noiseNode = audioContext.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = preset.filterFreq;
    noiseNode.connect(filter);
    filter.connect(masterGain);
    noiseNode.start();
    noiseNodeRef.current = noiseNode;

    // Twinkle sounds
    const createTwinkle = () => {
      if (!audioContextRef.current || !gainNodeRef.current) return;
      const twinkleOsc = audioContextRef.current.createOscillator();
      const twinkleGain = audioContextRef.current.createGain();
      twinkleOsc.type = 'sine';
      twinkleOsc.frequency.value = preset.twinkleRange[0] + Math.random() * (preset.twinkleRange[1] - preset.twinkleRange[0]);
      twinkleGain.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      twinkleGain.gain.linearRampToValueAtTime(preset.twinkleGain, audioContextRef.current.currentTime + 0.1);
      twinkleGain.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 2);
      twinkleOsc.connect(twinkleGain);
      twinkleGain.connect(gainNodeRef.current);
      twinkleOsc.start();
      twinkleOsc.stop(audioContextRef.current.currentTime + 2);
      twinkleTimeoutRef.current = setTimeout(createTwinkle, 3000 + Math.random() * 5000);
    };
    twinkleTimeoutRef.current = setTimeout(createTwinkle, 2000);
  }, [volume, stopSpaceMusic]);

  const toggleMusic = () => {
    if (isPlaying) {
      stopSpaceMusic();
    } else {
      createSpaceMusic(currentPreset);
    }
    setIsPlaying(!isPlaying);
  };

  const switchMelody = (melodyId: string) => {
    setSelectedMelody(melodyId);
    localStorage.setItem('spaceMelody', melodyId);
    const preset = melodyPresets.find(m => m.id === melodyId) || melodyPresets[0];
    if (isPlaying) {
      createSpaceMusic(preset);
    }
    setShowMelodyList(false);
  };

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  useEffect(() => {
    return () => { stopSpaceMusic(); };
  }, [stopSpaceMusic]);

  useEffect(() => {
    const handler = () => { setShowControls(true); setShowMelodyList(true); };
    window.addEventListener('open-music', handler);
    return () => window.removeEventListener('open-music', handler);
  }, []);

  return (
    <div
      className="fixed bottom-6 right-24 z-40"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => { setShowControls(false); setShowMelodyList(false); }}
    >
      {/* Melody selector */}
      {showMelodyList && (
        <div className="absolute bottom-16 right-0 w-64 max-h-80 overflow-y-auto bg-black/80 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl animate-fade-in">
          <div className="p-2 border-b border-white/10">
            <p className="text-xs text-white/50 px-2 py-1">🎶 Select Melody</p>
          </div>
          <div className="p-1">
            {melodyPresets.map(preset => (
              <button
                key={preset.id}
                onClick={() => switchMelody(preset.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                  selectedMelody === preset.id
                    ? 'bg-purple-600/40 text-white'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <span>{preset.icon}</span>
                <span className="truncate">{preset.name}</span>
                {selectedMelody === preset.id && <span className="ml-auto text-purple-400 text-xs">▶</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={`flex items-center gap-3 transition-all duration-300 ${showControls ? 'bg-black/60 backdrop-blur-md rounded-full px-4 py-2' : ''}`}>
        {showControls && isPlaying && (
          <div className="flex items-center gap-2 animate-fade-in">
            <VolumeX className="w-4 h-4 text-white/60" />
            <Slider
              value={[volume * 100]}
              onValueChange={(val) => setVolume(val[0] / 100)}
              max={100}
              step={1}
              className="w-20"
            />
            <Volume2 className="w-4 h-4 text-white/60" />
          </div>
        )}

        {showControls && (
          <button
            onClick={() => setShowMelodyList(!showMelodyList)}
            className="text-white/60 hover:text-white transition-colors flex items-center gap-1 text-xs animate-fade-in"
            aria-label="Select melody"
          >
            <span>{currentPreset.icon}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        )}

        <button
          onClick={toggleMusic}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isPlaying
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30'
              : 'bg-white/10 hover:bg-white/20'
          }`}
          aria-label={isPlaying ? 'Pause space music' : 'Play space music'}
        >
          <Music className={`w-5 h-5 ${isPlaying ? 'text-white animate-pulse' : 'text-white/70'}`} />
        </button>
      </div>

      {isPlaying && (
        <div className="absolute -top-8 right-0 text-xs text-white/50 whitespace-nowrap animate-fade-in">
          🎵 {currentPreset.name}
        </div>
      )}
    </div>
  );
};

export default SpaceAmbience;
