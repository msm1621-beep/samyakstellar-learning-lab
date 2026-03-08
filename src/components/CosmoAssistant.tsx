import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Bot, X, Sparkles, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages, langToSpeechLocale } from '@/data/translations';
import { translateTexts } from '@/lib/translateText';

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

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cosmo-chat`;

const getLanguageName = (code: string) => languages.find((lang) => lang.code === code)?.name ?? 'English';

async function streamChat({
  messages,
  language,
  targetLanguageName,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[];
  language: string;
  targetLanguageName: string;
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages, language, targetLanguageName }),
  });

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({ error: "Failed to connect to Cosmo" }));
    onError(errorData.error || "Something went wrong");
    return;
  }

  if (!resp.body) {
    onError("No response stream");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  // Final flush
  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

const CosmoAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const speechLocale = langToSpeechLocale[language];
  const targetLanguageName = getLanguageName(language);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = speechLocale;

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
      window.speechSynthesis.cancel();
    };
  }, [speechLocale]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speak text using Web Speech API
  const speak = (text: string) => {
    if (!voiceEnabled) return;
    window.speechSynthesis.cancel();
    
    // Remove emojis and markdown for cleaner speech
    const cleanText = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}☿♀♂♃♄⛢♆☀✨⚪⚖⚙️❌]/gu, '')
      .replace(/[*#_~`]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    utterance.lang = speechLocale;

    const voices = window.speechSynthesis.getVoices();
    const localePrefix = speechLocale.split('-')[0].toLowerCase();
    const preferredVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith(localePrefix));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Handle user message with AI streaming
  const handleUserMessage = async (text: string) => {
    const userMessage: Message = { role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Build conversation history for AI (last 10 messages for context)
    const history = [...messages, userMessage].slice(-10).map(m => ({
      role: m.role === 'cosmo' ? 'assistant' : 'user',
      content: m.content,
    }));

    let assistantSoFar = "";

    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'cosmo') {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: 'cosmo', content: assistantSoFar, timestamp: new Date() }];
      });
    };

    try {
      await streamChat({
        messages: history,
        language,
        targetLanguageName,
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => {
          setIsLoading(false);
          if (assistantSoFar) speak(assistantSoFar);
        },
        onError: (error) => {
          setIsLoading(false);
          const errorMsg: Message = {
            role: 'cosmo',
            content: `Oops! ${error} Try asking again! 🚀`,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, errorMsg]);
          toast({ title: "Cosmo Error", description: error, variant: "destructive" });
        },
      });
    } catch (e) {
      setIsLoading(false);
      const errorMsg: Message = {
        role: 'cosmo',
        content: "Sorry, I had a little space glitch! 🛸 Please try asking again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    }
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
    if (inputText.trim() && !isLoading) {
      handleUserMessage(inputText.trim());
    }
  };

  // Open with greeting
  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      const greeting = "Hello, young explorer! I'm Cosmo, your AI-powered space assistant! 🚀✨ I can answer ANY question about space, science, and everything on this website. Ask me about planets, stars, black holes, rockets, astronauts, our courses, games, library — literally anything! What cosmic mystery shall we explore today? 🌌";
      const cosmoMessage: Message = { role: 'cosmo', content: greeting, timestamp: new Date() };
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
                <p className="text-purple-200 text-xs">AI Space Assistant • Ask anything!</p>
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
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="bg-purple-600/40 text-white rounded-2xl rounded-bl-sm border border-purple-500/30 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-purple-300 animate-spin" />
                    <span className="text-xs text-purple-300">Cosmo is thinking...</span>
                  </div>
                </div>
              </div>
            )}
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
                placeholder={isListening ? "Listening..." : "Ask me anything about space..."}
                className="flex-1 bg-white/10 border border-purple-500/30 rounded-full px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="shrink-0 w-12 h-12 rounded-full bg-space-star hover:bg-space-star/80"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CosmoAssistant;
