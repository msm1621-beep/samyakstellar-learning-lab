import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, BookOpen, Filter, X, ChevronLeft, ChevronRight, Headphones, Volume2, VolumeX, Award, CheckCircle, Square, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { videos } from '@/data/videos';
import { books, type Book } from '@/data/books';
import CompletionCertificate from './CompletionCertificate';
import { useCoins, COIN_REWARDS } from '@/contexts/CoinsContext';
import { useAchievements } from '@/contexts/AchievementsContext';
import { useLanguage } from '@/contexts/LanguageContext';

type LibraryTab = 'videos' | 'books' | 'audiobooks';

interface CompletedBook {
  bookId: string;
  completedDate: string;
}

const LibrarySection = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<LibraryTab>('videos');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [playingAudiobook, setPlayingAudiobook] = useState<Book | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [completedBooks, setCompletedBooks] = useState<CompletedBook[]>([]);
  const [showCertificate, setShowCertificate] = useState<Book | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.9);
  const [volume, setVolume] = useState(1);
  
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentTextRef = useRef<string>('');
  
  const { addCoins } = useCoins();
  const { addAchievement } = useAchievements();

  // Load completed books from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedBooks');
    if (saved) {
      setCompletedBooks(JSON.parse(saved));
    }
  }, []);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Save completed books to localStorage
  const saveCompletion = (book: Book) => {
    const completedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const newCompletion: CompletedBook = { bookId: book.id, completedDate };
    const updated = [...completedBooks.filter(c => c.bookId !== book.id), newCompletion];
    setCompletedBooks(updated);
    localStorage.setItem('completedBooks', JSON.stringify(updated));
  };

  const isBookCompleted = (bookId: string) => completedBooks.some(c => c.bookId === bookId);
  
  const getCompletionDate = (bookId: string) => {
    const completed = completedBooks.find(c => c.bookId === bookId);
    return completed?.completedDate || '';
  };

  const handleMarkComplete = (book: Book) => {
    saveCompletion(book);
    setShowCertificate(book);
    const isAudiobook = book.type === 'audiobook';
    addCoins(isAudiobook ? COIN_REWARDS.AUDIOBOOK_COMPLETE : COIN_REWARDS.BOOK_COMPLETE, 
      `Finished: ${book.title}`);
    
    // Add achievement for book/audiobook completion
    addAchievement({
      type: isAudiobook ? 'audiobook' : 'book',
      name: book.title,
      icon: isAudiobook ? '🎧' : '📚',
      description: `Completed "${book.title}" by ${book.author}`
    });
  };

  const regularBooks = books.filter(b => b.type !== 'audiobook');
  const audiobooks = books.filter(b => b.type === 'audiobook');

  const allVideoTags = [...new Set(videos.flatMap((v) => v.tags))];
  const allBookTags = [...new Set(regularBooks.flatMap((b) => b.tags))];
  const allAudiobookTags = [...new Set(audiobooks.flatMap((b) => b.tags))];
  
  const currentTags = activeTab === 'videos' 
    ? allVideoTags 
    : activeTab === 'books' 
      ? allBookTags 
      : allAudiobookTags;

  // All videos are now free for everyone
  const filteredVideos = selectedTag === 'all' 
    ? videos 
    : videos.filter((v) => v.tags.includes(selectedTag));

  const filteredBooks = selectedTag === 'all'
    ? regularBooks
    : regularBooks.filter((b) => b.tags.includes(selectedTag));

  const filteredAudiobooks = selectedTag === 'all'
    ? audiobooks
    : audiobooks.filter((b) => b.tags.includes(selectedTag));

  const openBook = (book: Book) => {
    setReadingBook(book);
    setCurrentChapter(0);
  };

  const closeBook = () => {
    setReadingBook(null);
    setCurrentChapter(0);
  };

  const nextChapter = () => {
    if (readingBook && currentChapter < readingBook.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  // Text-to-Speech functions - uses selected language
  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = 1;
    utterance.volume = volume;
    
    // Use the selected language voice
    const { langToSpeechLocale } = require('@/data/translations');
    const locale = langToSpeechLocale[language];
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(locale.split('-')[0])) || voices[0];
    if (voice) utterance.voice = voice;
    utterance.lang = locale;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPlaying(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPlaying(false);
    };

    speechSynthRef.current = utterance;
    currentTextRef.current = text;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  }, [speechRate, volume]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPlaying(false);
  }, []);

  const pauseSpeaking = useCallback(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    }
  }, []);

  const resumeSpeaking = useCallback(() => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
    }
  }, []);

  const openAudiobook = (book: Book) => {
    setPlayingAudiobook(book);
    setCurrentChapter(0);
    setAudioProgress(0);
    // Start reading the introduction
    const introText = `${book.title}. By ${book.author}. Narrated for you. ${book.fullContent}`;
    speak(introText);
  };

  const closeAudiobook = () => {
    stopSpeaking();
    setPlayingAudiobook(null);
    setCurrentChapter(0);
    setAudioProgress(0);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseSpeaking();
    } else if (window.speechSynthesis.paused) {
      resumeSpeaking();
    } else if (playingAudiobook) {
      // Start reading current chapter
      const chapter = playingAudiobook.chapters[currentChapter];
      speak(`${chapter.title}. ${chapter.content}`);
    }
  };

  const playChapter = (chapterIndex: number) => {
    if (!playingAudiobook) return;
    setCurrentChapter(chapterIndex);
    const chapter = playingAudiobook.chapters[chapterIndex];
    speak(`${chapter.title}. ${chapter.content}`);
  };

  return (
    <section id="library" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('section.library')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('section.libraryDesc')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => { setActiveTab('videos'); setSelectedTag('all'); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all ${
              activeTab === 'videos'
                ? 'bg-primary text-primary-foreground cosmic-glow'
                : 'glass-card hover:border-primary/50'
            }`}
          >
            <Play className="w-4 h-4" />
            {t('library.videos')}
          </button>
          <button
            onClick={() => { setActiveTab('books'); setSelectedTag('all'); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all ${
              activeTab === 'books'
                ? 'bg-secondary text-secondary-foreground nebula-glow'
                : 'glass-card hover:border-secondary/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {t('library.books')}
          </button>
          <button
            onClick={() => { setActiveTab('audiobooks'); setSelectedTag('all'); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all ${
              activeTab === 'audiobooks'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'glass-card hover:border-purple-500/50'
            }`}
          >
            <Headphones className="w-4 h-4" />
            {t('library.audiobooks')}
            <span className="px-2 py-0.5 text-xs bg-white/20 rounded-full">{t('common.new')}</span>
          </button>
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              selectedTag === 'all'
                ? 'bg-accent text-accent-foreground'
                : 'glass-card hover:border-accent/50'
            }`}
          >
            <Filter className="w-3 h-3 inline mr-1" />
            All
          </button>
          {currentTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedTag === tag
                  ? 'bg-accent text-accent-foreground'
                  : 'glass-card hover:border-accent/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        {activeTab === 'videos' && (
          <div>
            {/* All Videos - Free for everyone! */}
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <div key={video.id} className="glass-card rounded-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                    <div className="relative aspect-video">
                      {playingVideo === video.id ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                          title={video.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <>
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <button 
                            onClick={() => setPlayingVideo(video.id)}
                            className="absolute inset-0 bg-background/40 flex items-center justify-center group-hover:bg-background/60 transition-colors"
                          >
                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cosmic-glow transform group-hover:scale-110 transition-transform">
                              <Play className="w-8 h-8 text-primary-foreground ml-1" />
                            </div>
                          </button>
                          <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-background/80 text-xs font-medium">
                            {video.duration}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-bold mb-1 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {video.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {playingVideo === video.id ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => setPlayingVideo(null)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Close Video
                        </Button>
                      ) : (
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="w-full"
                          onClick={() => setPlayingVideo(video.id)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {t('common.watchNow')}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Play className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold mb-2">No Videos Available</p>
                <p className="text-muted-foreground">
                  No videos match your current filter.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Books Grid */}
        {activeTab === 'books' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div key={book.id} className="glass-card rounded-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[3/4] max-h-48">
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                    {book.type === 'guide' ? '📖 Guide' : '📚 Book'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold mb-1 group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">By {book.author}</p>
                  <p className="text-xs text-accent mb-2">Ages {book.ageRange}</p>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{book.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {book.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => openBook(book)}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      {t('common.readNow')}
                    </Button>
                    {isBookCompleted(book.id) ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowCertificate(book)}
                        className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
                      >
                        <Award className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleMarkComplete(book)}
                        className="hover:border-green-500/50 hover:text-green-500"
                        title="Mark as completed"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {isBookCompleted(book.id) && (
                    <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Completed!
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Audiobooks Grid */}
        {activeTab === 'audiobooks' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAudiobooks.map((book) => (
              <div key={book.id} className="glass-card rounded-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 border-2 border-purple-500/20 hover:border-purple-500/50">
                <div className="relative aspect-[3/4] max-h-48">
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center gap-1">
                    <Headphones className="w-3 h-3" />
                    Audiobook
                  </span>
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1">
                      <Volume2 className="w-3 h-3" />
                      {book.duration}
                    </span>
                    <span>🎧 {book.narrator}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold mb-1 group-hover:text-purple-400 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">By {book.author}</p>
                  <p className="text-xs text-purple-400 mb-2">Ages {book.ageRange} • Narrated by {book.narrator}</p>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{book.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {book.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      onClick={() => openAudiobook(book)}
                    >
                      <Headphones className="w-4 h-4 mr-2" />
                      Listen Now
                    </Button>
                    {isBookCompleted(book.id) ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowCertificate(book)}
                        className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
                      >
                        <Award className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleMarkComplete(book)}
                        className="hover:border-green-500/50 hover:text-green-500"
                        title="Mark as completed"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {isBookCompleted(book.id) && (
                    <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Completed!
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Book Reader Modal */}
      {readingBook && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
          onClick={closeBook}
        >
          <div 
            className="glass-card max-w-3xl w-full max-h-[85vh] rounded-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-border/50 flex items-center justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold">{readingBook.title}</h3>
                <p className="text-sm text-muted-foreground">By {readingBook.author}</p>
              </div>
              <button
                onClick={closeBook}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {currentChapter === 0 && (
                <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <h4 className="font-display font-semibold text-primary mb-2">📖 Introduction</h4>
                  <p className="text-foreground leading-relaxed">{readingBook.fullContent}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span className="px-2 py-1 rounded-full bg-secondary/50 text-secondary-foreground">
                    Chapter {currentChapter + 1} of {readingBook.chapters.length}
                  </span>
                </div>
                <h4 className="text-lg md:text-xl font-display font-bold text-primary">
                  {readingBook.chapters[currentChapter].title}
                </h4>
                <p className="text-foreground leading-relaxed text-base md:text-lg">
                  {readingBook.chapters[currentChapter].content}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="p-4 md:p-6 border-t border-border/50 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={prevChapter}
                disabled={currentChapter === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <div className="flex gap-1">
                {readingBook.chapters.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentChapter(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentChapter ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to chapter ${idx + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="default"
                onClick={nextChapter}
                disabled={currentChapter === readingBook.chapters.length - 1}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Audiobook Player Modal */}
      {playingAudiobook && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
          onClick={closeAudiobook}
        >
          <div 
            className="glass-card max-w-3xl w-full max-h-[85vh] rounded-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col border-2 border-purple-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-purple-500/20 flex items-center justify-between bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden shadow-lg">
                  <img src={playingAudiobook.cover} alt={playingAudiobook.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-display font-bold">{playingAudiobook.title}</h3>
                  <p className="text-sm text-purple-300">🎧 Narrated by {playingAudiobook.narrator}</p>
                </div>
              </div>
              <button
                onClick={closeAudiobook}
                className="p-2 rounded-full hover:bg-purple-500/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Player Controls */}
            <div className="p-4 md:p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => currentChapter > 0 && playChapter(currentChapter - 1)}
                  disabled={currentChapter === 0}
                  className="text-purple-300 hover:text-white hover:bg-purple-500/20"
                  title="Previous chapter"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
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
                  onClick={togglePlayPause}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setVolume(volume > 0 ? 0 : 1)}
                  className="text-purple-300 hover:text-white hover:bg-purple-500/20"
                  title={volume > 0 ? "Mute" : "Unmute"}
                >
                  {volume > 0 ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => currentChapter < playingAudiobook.chapters.length - 1 && playChapter(currentChapter + 1)}
                  disabled={currentChapter === playingAudiobook.chapters.length - 1}
                  className="text-purple-300 hover:text-white hover:bg-purple-500/20"
                  title="Next chapter"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

              {/* Status indicator */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {isSpeaking && (
                  <div className="flex items-center gap-2 text-sm text-purple-300">
                    <div className="flex gap-1">
                      <span className="w-1 h-4 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1 h-6 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
                      <span className="w-1 h-5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '450ms' }}></span>
                    </div>
                    <span>Now playing...</span>
                  </div>
                )}
                {!isSpeaking && !isPlaying && (
                  <span className="text-sm text-purple-300/70">Click play to start listening</span>
                )}
              </div>

              {/* Speed control */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-xs text-purple-300">Speed:</span>
                {[0.75, 0.9, 1, 1.25].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setSpeechRate(rate)}
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

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="h-2 bg-purple-500/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                    style={{ width: `${((currentChapter + (isSpeaking ? 0.5 : 0)) / playingAudiobook.chapters.length) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-purple-300">
                  <span>Chapter {currentChapter + 1} of {playingAudiobook.chapters.length}</span>
                  <span>{playingAudiobook.duration}</span>
                </div>
              </div>
            </div>

            {/* Chapter Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {currentChapter === 0 && (
                <div className="mb-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <h4 className="font-display font-semibold text-purple-300 mb-2 flex items-center gap-2">
                    <Headphones className="w-5 h-5" />
                    Introduction
                  </h4>
                  <p className="text-foreground leading-relaxed">{playingAudiobook.fullContent}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <h4 className="text-lg md:text-xl font-display font-bold text-purple-300 flex items-center gap-2">
                  {isPlaying && <Volume2 className="w-5 h-5 animate-pulse" />}
                  {playingAudiobook.chapters[currentChapter].title}
                </h4>
                <p className="text-foreground leading-relaxed text-base md:text-lg">
                  {playingAudiobook.chapters[currentChapter].content}
                </p>
              </div>
            </div>

            {/* Chapter List */}
            <div className="p-4 md:p-6 border-t border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
              <p className="text-xs text-purple-300 mb-2">Click a chapter to listen:</p>
              <div className="flex flex-wrap gap-2">
                {playingAudiobook.chapters.map((chapter, idx) => (
                  <button
                    key={idx}
                    onClick={() => playChapter(idx)}
                    className={`px-3 py-1 rounded-full text-xs transition-all ${
                      idx === currentChapter 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                    }`}
                  >
                    {idx + 1}. {chapter.title.replace('Chapter ', '').replace(/^\d+:\s*/, '')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Certificate Modal */}
      {showCertificate && (
        <CompletionCertificate
          book={showCertificate}
          completedDate={getCompletionDate(showCertificate.id)}
          onClose={() => setShowCertificate(null)}
        />
      )}
    </section>
  );
};

export default LibrarySection;
