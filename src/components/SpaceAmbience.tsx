import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const SpaceAmbience = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);

  // Create ambient space music using Web Audio API
  const createSpaceMusic = () => {
    if (audioContextRef.current) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;

    // Master gain
    const masterGain = audioContext.createGain();
    masterGain.gain.value = volume;
    masterGain.connect(audioContext.destination);
    gainNodeRef.current = masterGain;

    // Create ethereal pad sounds
    const frequencies = [65.41, 82.41, 98.0, 130.81]; // C2, E2, G2, C3 - ambient chord
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const oscGain = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      // Very slow LFO for movement
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = 0.05 + index * 0.02;
      lfoGain.gain.value = freq * 0.02;
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      lfo.start();

      oscGain.gain.value = 0.08;
      oscillator.connect(oscGain);
      oscGain.connect(masterGain);
      oscillator.start();
      oscillatorsRef.current.push(oscillator);
    });

    // Add subtle "cosmic wind" noise
    const bufferSize = audioContext.sampleRate * 4;
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.02;
    }

    const noiseNode = audioContext.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;
    
    // Low-pass filter for softer noise
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 200;
    
    noiseNode.connect(filter);
    filter.connect(masterGain);
    noiseNode.start();
    noiseNodeRef.current = noiseNode;

    // Add occasional "twinkling" sounds
    const createTwinkle = () => {
      if (!audioContextRef.current || !gainNodeRef.current) return;
      
      const twinkleOsc = audioContextRef.current.createOscillator();
      const twinkleGain = audioContextRef.current.createGain();
      
      twinkleOsc.type = 'sine';
      twinkleOsc.frequency.value = 400 + Math.random() * 800;
      
      twinkleGain.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      twinkleGain.gain.linearRampToValueAtTime(0.03, audioContextRef.current.currentTime + 0.1);
      twinkleGain.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 2);
      
      twinkleOsc.connect(twinkleGain);
      twinkleGain.connect(gainNodeRef.current);
      
      twinkleOsc.start();
      twinkleOsc.stop(audioContextRef.current.currentTime + 2);
      
      // Random interval for next twinkle
      setTimeout(createTwinkle, 3000 + Math.random() * 5000);
    };
    
    setTimeout(createTwinkle, 2000);
  };

  const stopSpaceMusic = () => {
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    oscillatorsRef.current = [];
    
    if (noiseNodeRef.current) {
      try { noiseNodeRef.current.stop(); } catch (e) {}
      noiseNodeRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
      gainNodeRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopSpaceMusic();
    } else {
      createSpaceMusic();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopSpaceMusic();
    };
  }, []);

  return (
    <div 
      className="fixed bottom-6 right-6 z-40"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
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
          🎵 Space Ambience
        </div>
      )}
    </div>
  );
};

export default SpaceAmbience;
