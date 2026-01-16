import { useState, useEffect } from 'react';
import { Play, Pause, BookOpen, Filter, X, ChevronLeft, ChevronRight, Headphones, Volume2, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { videos } from '@/data/videos';
import { books, type Book } from '@/data/books';
import CompletionCertificate from './CompletionCertificate';

type LibraryTab = 'videos' | 'books' | 'audiobooks';

interface CompletedBook {
  bookId: string;
  completedDate: string;
}

const LibrarySection = () => {
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

  // Load completed books from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedBooks');
    if (saved) {
      setCompletedBooks(JSON.parse(saved));
    }
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

  const openAudiobook = (book: Book) => {
    setPlayingAudiobook(book);
    setCurrentChapter(0);
    setIsPlaying(true);
    setAudioProgress(0);
  };

  const closeAudiobook = () => {
    setPlayingAudiobook(null);
    setIsPlaying(false);
    setCurrentChapter(0);
    setAudioProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="library" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            📚 Celestial Library
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch amazing videos, explore space books, and listen to audiobooks about space theories!
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
            Videos
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
            Books
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
            Audiobooks
            <span className="px-2 py-0.5 text-xs bg-white/20 rounded-full">NEW</span>
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
                      Watch Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
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
                      Read Now
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
              <div className="flex items-center justify-center gap-6 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => currentChapter > 0 && setCurrentChapter(currentChapter - 1)}
                  disabled={currentChapter === 0}
                  className="text-purple-300 hover:text-white hover:bg-purple-500/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  size="lg"
                  onClick={togglePlayPause}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => currentChapter < playingAudiobook.chapters.length - 1 && setCurrentChapter(currentChapter + 1)}
                  disabled={currentChapter === playingAudiobook.chapters.length - 1}
                  className="text-purple-300 hover:text-white hover:bg-purple-500/20"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="h-2 bg-purple-500/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                    style={{ width: `${(currentChapter / playingAudiobook.chapters.length) * 100 + (isPlaying ? 10 : 0)}%` }}
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
              <p className="text-xs text-purple-300 mb-2">Chapters:</p>
              <div className="flex flex-wrap gap-2">
                {playingAudiobook.chapters.map((chapter, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentChapter(idx)}
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
