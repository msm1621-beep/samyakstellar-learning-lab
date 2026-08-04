import { useState, useCallback, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, BookOpen, Headphones, Volume2, VolumeX, Square, X, ExternalLink, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FavStar from '@/components/FavStar';

interface DreamResource {
  type: 'video' | 'book' | 'audiobook' | 'article';
  title: string;
  description: string;
  url?: string;
  duration?: string;
}

interface DreamResourceCardProps {
  resource: DreamResource;
  topicTitle?: string;
  index?: number;
}

const getYouTubeId = (url: string): string | null => {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
};

const genericVideoThumb = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop';
const genericBookCover = 'https://images.unsplash.com/photo-1544716278-ca5e3a4b8ba3?w=300&h=400&fit=crop';
const genericAudioCover = 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=300&h=400&fit=crop';
const genericArticleCover = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop';

export const DreamResourceCard = ({ resource, topicTitle }: DreamResourceCardProps) => {
  const { toast } = useToast();
  const [playingVideo, setPlayingVideo] = useState(false);
  const [readingBook, setReadingBook] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.95);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const youtubeId = resource.url ? getYouTubeId(resource.url) : null;

  const favItem = {
    id: `dream-${resource.type}-${resource.title}`,
    kind: (resource.type === 'article' ? 'topic' : resource.type) as 'video' | 'book' | 'audiobook' | 'topic',
    title: resource.title,
    meta: topicTitle,
    url: resource.url,
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = speechRate;
    utter.pitch = 1;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
  }, [speechRate]);

  const handleVideoClick = () => {
    if (youtubeId) {
      setPlayingVideo(true);
    } else if (resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleBookClick = () => {
    setReadingBook(true);
  };

  const handleAudiobookClick = () => {
    setPlayingAudio(true);
    // Auto-start TTS of description
    setTimeout(() => speak(resource.description), 300);
  };

  const closeAll = () => {
    setPlayingVideo(false);
    setReadingBook(false);
    setPlayingAudio(false);
    stopSpeaking();
  };

  if (resource.type === 'video') {
    return (
      <>
        <div className="glass-card rounded-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
          <div className="relative aspect-video">
        <FavStar item={favItem} className="absolute top-2 left-2 z-10" />
            {playingVideo && youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={resource.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={genericVideoThumb}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handleVideoClick}
                  className="absolute inset-0 bg-background/40 flex items-center justify-center group-hover:bg-background/60 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cosmic-glow transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                </button>
                {resource.duration && (
                  <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-background/80 text-xs font-medium">
                    {resource.duration}
                  </span>
                )}
              </>
            )}
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Play className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide font-medium">Video</span>
              {resource.duration && <span className="text-xs text-muted-foreground ml-auto">{resource.duration}</span>}
            </div>
            <h3 className="font-display font-bold mb-1 group-hover:text-primary transition-colors">
              {resource.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">{resource.description}</p>
            {playingVideo && youtubeId ? (
              <Button variant="outline" size="sm" className="w-full mt-auto" onClick={() => setPlayingVideo(false)}>
                <X className="w-4 h-4 mr-2" /> Close Video
              </Button>
            ) : (
              <Button variant="default" size="sm" className="w-full mt-auto" onClick={handleVideoClick}>
                <Play className="w-4 h-4 mr-2" /> Watch Now
              </Button>
            )}
          </div>
        </div>
      </>
    );
  }

  if (resource.type === 'book') {
    return (
      <>
        <div className="glass-card rounded-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
          <div className="relative aspect-[3/4] max-h-48">
        <FavStar item={favItem} className="absolute top-2 left-2 z-10" />
            <img
              src={genericBookCover}
              alt={resource.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
              <BookOpen className="w-3 h-3 inline mr-1" /> Book
            </span>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-display font-bold mb-1 group-hover:text-primary transition-colors">
              {resource.title}
            </h3>
            {topicTitle && <p className="text-xs text-accent mb-1">Topic: {topicTitle}</p>}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">{resource.description}</p>
            <div className="flex gap-2 mt-auto">
              <Button variant="default" size="sm" className="flex-1" onClick={handleBookClick}>
                <BookOpen className="w-4 h-4 mr-2" /> Read Now
              </Button>
              {resource.url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Simple Book Reader Modal */}
        {readingBook && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
            onClick={closeAll}
          >
            <div
              className="glass-card max-w-3xl w-full max-h-[85vh] rounded-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 md:p-6 border-b border-border/50 flex items-center justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold">{resource.title}</h3>
                  {topicTitle && <p className="text-sm text-muted-foreground">Topic: {topicTitle}</p>}
                </div>
                <button onClick={closeAll} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Close">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <h4 className="font-display font-semibold text-primary mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> Introduction
                  </h4>
                  <p className="text-foreground leading-relaxed whitespace-pre-line">{resource.description}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30">
                  <h4 className="font-display font-semibold text-secondary mb-2">About This Book</h4>
                  <p className="text-foreground leading-relaxed">
                    This book is part of the <strong>{topicTitle}</strong> astronaut training topic.
                    Dive deeper into this subject by exploring the full content and related resources in the Celestial Library.
                  </p>
                </div>
              </div>
              <div className="p-4 md:p-6 border-t border-border/50 flex justify-end gap-3">
                {resource.url && (
                  <Button variant="outline" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" /> Open Original
                    </a>
                  </Button>
                )}
                <Button onClick={closeAll}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (resource.type === 'audiobook') {
    return (
      <>
        <div className="glass-card rounded-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 border-2 border-purple-500/20 hover:border-purple-500/50 h-full flex flex-col">
          <div className="relative aspect-[3/4] max-h-48">
        <FavStar item={favItem} className="absolute top-2 left-2 z-10" />
            <img
              src={genericAudioCover}
              alt={resource.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center gap-1">
              <Headphones className="w-3 h-3" /> Audiobook
            </span>
            {resource.duration && (
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs">
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3 h-3" /> {resource.duration}
                </span>
              </div>
            )}
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-display font-bold mb-1 group-hover:text-purple-400 transition-colors">
              {resource.title}
            </h3>
            {topicTitle && <p className="text-xs text-purple-400 mb-1">Topic: {topicTitle}</p>}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">{resource.description}</p>
            <div className="flex gap-2 mt-auto">
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={handleAudiobookClick}
              >
                <Headphones className="w-4 h-4 mr-2" /> Listen Now
              </Button>
              {resource.url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Audiobook Player Modal */}
        {playingAudio && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
            onClick={closeAll}
          >
            <div
              className="glass-card max-w-3xl w-full max-h-[85vh] rounded-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col border-2 border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 md:p-6 border-b border-purple-500/20 flex items-center justify-between bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shadow-lg">
                    <img src={genericAudioCover} alt={resource.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-display font-bold">{resource.title}</h3>
                    <p className="text-sm text-purple-300">🎧 Text-to-Speech Audiobook</p>
                  </div>
                </div>
                <button onClick={closeAll} className="p-2 rounded-full hover:bg-purple-500/20 transition-colors" aria-label="Close">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 md:p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={stopSpeaking}
                    className="text-purple-300 hover:text-white hover:bg-red-500/20"
                    title="Stop"
                  >
                    <Square className="w-5 h-5" />
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => {
                      if (isSpeaking) {
                        window.speechSynthesis.pause();
                        setIsSpeaking(false);
                      } else if (window.speechSynthesis.paused) {
                        window.speechSynthesis.resume();
                        setIsSpeaking(true);
                      } else {
                        speak(resource.description);
                      }
                    }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30"
                  >
                    {isSpeaking ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      window.speechSynthesis.cancel();
                      setIsSpeaking(false);
                    }}
                    className="text-purple-300 hover:text-white hover:bg-purple-500/20"
                    title="Reset"
                  >
                    <VolumeX className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 mb-4">
                  {isSpeaking ? (
                    <div className="flex items-center gap-2 text-sm text-purple-300">
                      <div className="flex gap-1">
                        <span className="w-1 h-4 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-6 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                        <span className="w-1 h-5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
                      </div>
                      <span>Now playing...</span>
                    </div>
                  ) : (
                    <span className="text-sm text-purple-300/70">Click play to start listening</span>
                  )}
                </div>

                <div className="flex items-center justify-center gap-4">
                  <span className="text-xs text-purple-300">Speed:</span>
                  {[0.75, 0.9, 1, 1.25].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => {
                        setSpeechRate(rate);
                        toast({ title: `Speed set to ${rate}x` });
                      }}
                      className={`px-2 py-1 text-xs rounded ${
                        speechRate === rate
                          ? 'bg-purple-500 text-white'
                          : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="mb-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <h4 className="font-display font-semibold text-purple-300 mb-2 flex items-center gap-2">
                    <Headphones className="w-5 h-5" /> Introduction
                  </h4>
                  <p className="text-foreground leading-relaxed whitespace-pre-line">{resource.description}</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/20">
                  <h4 className="font-display font-semibold text-purple-300 mb-2 flex items-center gap-2">
                    <Volume2 className="w-5 h-5" /> Now Playing
                  </h4>
                  <p className="text-foreground leading-relaxed whitespace-pre-line">{resource.description}</p>
                </div>
              </div>

              {resource.url && (
                <div className="p-4 md:p-6 border-t border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" /> Open Original Source
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  // article
  return (
    <div className="glass-card rounded-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      <div className="relative aspect-[3/4] max-h-48">
        <FavStar item={favItem} className="absolute top-2 left-2 z-10" />
        <img
          src={genericArticleCover}
          alt={resource.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
          <FileText className="w-3 h-3 inline mr-1" /> Article
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display font-bold mb-1 group-hover:text-primary transition-colors">
          {resource.title}
        </h3>
        {topicTitle && <p className="text-xs text-accent mb-1">Topic: {topicTitle}</p>}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">{resource.description}</p>
        {resource.url ? (
          <Button variant="default" size="sm" className="w-full mt-auto" asChild>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" /> Read Article
            </a>
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="w-full mt-auto" disabled>
            No link available
          </Button>
        )}
      </div>
    </div>
  );
};

export default DreamResourceCard;
