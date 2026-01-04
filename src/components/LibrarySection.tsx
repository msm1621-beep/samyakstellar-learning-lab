import { useState } from 'react';
import { Play, BookOpen, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { videos } from '@/data/videos';
import { books } from '@/data/books';

type LibraryTab = 'videos' | 'books';

const LibrarySection = () => {
  const [activeTab, setActiveTab] = useState<LibraryTab>('videos');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allVideoTags = [...new Set(videos.flatMap((v) => v.tags))];
  const allBookTags = [...new Set(books.flatMap((b) => b.tags))];
  const currentTags = activeTab === 'videos' ? allVideoTags : allBookTags;

  const filteredVideos = selectedTag === 'all' 
    ? videos 
    : videos.filter((v) => v.tags.includes(selectedTag));

  const filteredBooks = selectedTag === 'all'
    ? books
    : books.filter((b) => b.tags.includes(selectedTag));

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
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cosmic-glow">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-background/80 text-xs font-medium">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold mb-1 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {video.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
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
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LibrarySection;
