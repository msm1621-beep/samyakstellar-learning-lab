import { useState } from 'react';
import { Play, BookOpen, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { videos } from '@/data/videos';
import { books, type Book } from '@/data/books';

type LibraryTab = 'videos' | 'books';

const LibrarySection = () => {
  const [activeTab, setActiveTab] = useState<LibraryTab>('videos');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);

  const allVideoTags = [...new Set(videos.flatMap((v) => v.tags))];
  const allBookTags = [...new Set(books.flatMap((b) => b.tags))];
  const currentTags = activeTab === 'videos' ? allVideoTags : allBookTags;

  const filteredVideos = selectedTag === 'all' 
    ? videos 
    : videos.filter((v) => v.tags.includes(selectedTag));

  const filteredBooks = selectedTag === 'all'
    ? books
    : books.filter((b) => b.tags.includes(selectedTag));

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

  return (
    <section id="library" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            📚 Celestial Library
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch amazing videos and explore space books designed for young explorers!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => { setActiveTab('videos'); setSelectedTag('all'); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'videos'
                ? 'bg-primary text-primary-foreground cosmic-glow'
                : 'glass-card hover:border-primary/50'
            }`}
          >
            <Play className="w-5 h-5" />
            Videos
          </button>
          <button
            onClick={() => { setActiveTab('books'); setSelectedTag('all'); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'books'
                ? 'bg-secondary text-secondary-foreground nebula-glow'
                : 'glass-card hover:border-secondary/50'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Books & Guides
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
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full"
                    onClick={() => openBook(book)}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Now
                  </Button>
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
    </section>
  );
};

export default LibrarySection;