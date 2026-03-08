import { useState, useEffect, useRef } from 'react';
import { GraduationCap, BookOpen, Video, Headphones, ChevronRight, Star, Clock, Award, Check, Play, RotateCcw, Trophy, X, ChevronLeft, Pause, Volume2, VolumeX, HelpCircle, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { courses, Course } from '@/data/courses';
import { videos } from '@/data/videos';
import { books, Book } from '@/data/books';
import CourseCertificate from './CourseCertificate';
import CourseQuiz from './CourseQuiz';
import { useCoins, COIN_REWARDS } from '@/contexts/CoinsContext';
import { useAchievements } from '@/contexts/AchievementsContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface CourseProgress {
  courseId: string;
  completedVideos: string[];
  completedBooks: string[];
  completedAudiobooks: string[];
  startedAt: string;
  completedAt?: string;
}

interface CompletedCourse {
  courseId: string;
  completedAt: string;
}

const CourseSection = () => {
  const { t } = useLanguage();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>([]);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState<{ course: Course; date: string } | null>(null);
  const [showQuiz, setShowQuiz] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'videos' | 'books' | 'audiobooks' | 'plan'>('plan');
  
  // Book reading state
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  
  // Audiobook playback state
  const [playingAudiobook, setPlayingAudiobook] = useState<Book | null>(null);
  const [audioChapter, setAudioChapter] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechVolume, setSpeechVolume] = useState(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentTextRef = useRef<string>('');
  
  const { addCoins } = useCoins();
  const { addAchievement } = useAchievements();

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('courseProgress');
    const savedCompleted = localStorage.getItem('completedCourses');
    if (savedProgress) setCourseProgress(JSON.parse(savedProgress));
    if (savedCompleted) setCompletedCourses(JSON.parse(savedCompleted));
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('courseProgress', JSON.stringify(courseProgress));
  }, [courseProgress]);

  useEffect(() => {
    localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
  }, [completedCourses]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const getProgress = (courseId: string): CourseProgress | undefined => {
    return courseProgress.find(p => p.courseId === courseId);
  };

  const getProgressPercentage = (course: Course): number => {
    const progress = getProgress(course.id);
    if (!progress) return 0;
    
    const totalItems = course.videoIds.length + course.bookIds.length + course.audiobookIds.length;
    const completedItems = progress.completedVideos.length + progress.completedBooks.length + progress.completedAudiobooks.length;
    return Math.round((completedItems / totalItems) * 100);
  };

  const isItemCompleted = (courseId: string, itemId: string, type: 'video' | 'book' | 'audiobook'): boolean => {
    const progress = getProgress(courseId);
    if (!progress) return false;
    
    switch (type) {
      case 'video': return progress.completedVideos.includes(itemId);
      case 'book': return progress.completedBooks.includes(itemId);
      case 'audiobook': return progress.completedAudiobooks.includes(itemId);
    }
  };

  const toggleItemComplete = (courseId: string, itemId: string, type: 'video' | 'book' | 'audiobook') => {
    setCourseProgress(prev => {
      const existing = prev.find(p => p.courseId === courseId);
      
      if (!existing) {
        const newProgress: CourseProgress = {
          courseId,
          completedVideos: type === 'video' ? [itemId] : [],
          completedBooks: type === 'book' ? [itemId] : [],
          completedAudiobooks: type === 'audiobook' ? [itemId] : [],
          startedAt: new Date().toISOString()
        };
        return [...prev, newProgress];
      }

      return prev.map(p => {
        if (p.courseId !== courseId) return p;
        
        const getUpdatedList = (list: string[]) => 
          list.includes(itemId) ? list.filter(id => id !== itemId) : [...list, itemId];
        
        switch (type) {
          case 'video': return { ...p, completedVideos: getUpdatedList(p.completedVideos) };
          case 'book': return { ...p, completedBooks: getUpdatedList(p.completedBooks) };
          case 'audiobook': return { ...p, completedAudiobooks: getUpdatedList(p.completedAudiobooks) };
        }
      });
    });
  };

  const isCourseCompleted = (courseId: string): boolean => {
    return completedCourses.some(c => c.courseId === courseId);
  };

  const completeCourse = (course: Course) => {
    const completedAt = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });
    
    setCompletedCourses(prev => [...prev, { courseId: course.id, completedAt }]);
    setShowCertificate({ course, date: completedAt });
    addCoins(COIN_REWARDS.COURSE_COMPLETE, `Completed: ${course.title}`);
    
    // Grant a gift voucher
    const currentVouchers = parseInt(localStorage.getItem('giftVouchersAvailable') || '0', 10);
    localStorage.setItem('giftVouchersAvailable', (currentVouchers + 1).toString());
    
    // Add achievement for course completion
    addAchievement({
      type: 'course',
      name: course.title,
      icon: '🎓',
      description: `Successfully completed the ${course.title} course on ${completedAt}!`
    });
  };

  const restartCourse = (courseId: string) => {
    setCourseProgress(prev => prev.filter(p => p.courseId !== courseId));
    setCompletedCourses(prev => prev.filter(c => c.courseId !== courseId));
  };

  const getAvailableCourses = () => {
    return courses.filter(course => !isCourseCompleted(course.id));
  };

  const getCompletedCoursesList = () => {
    return courses.filter(course => isCourseCompleted(course.id));
  };

  const getVideoById = (id: string) => videos.find(v => v.id === id);
  const getBookById = (id: string) => books.find(b => b.id === id);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  // Book reading functions
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
      setCurrentChapter(prev => prev + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(prev => prev - 1);
    }
  };

  // Text-to-Speech functions
  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    currentTextRef.current = text;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = 1;
    utterance.volume = speechVolume;
    
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const togglePlayPause = () => {
    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
    } else if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsSpeaking(true);
    } else if (playingAudiobook) {
      const chapter = playingAudiobook.chapters[audioChapter];
      speak(chapter.content);
    }
  };

  const openAudiobook = (book: Book) => {
    stopSpeaking();
    setPlayingAudiobook(book);
    setAudioChapter(0);
    setTimeout(() => {
      speak(book.fullContent);
    }, 100);
  };

  const closeAudiobook = () => {
    stopSpeaking();
    setPlayingAudiobook(null);
    setAudioChapter(0);
  };

  const playAudioChapter = (chapterIndex: number) => {
    if (playingAudiobook) {
      setAudioChapter(chapterIndex);
      speak(playingAudiobook.chapters[chapterIndex].content);
    }
  };

  const availableCourses = getAvailableCourses();
  const completedCoursesList = getCompletedCoursesList();

  return (
    <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-10 h-10 text-space-gold" />
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-space-gold via-yellow-300 to-space-gold">
              Space Courses
            </h2>
          </div>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Complete structured courses with videos, books, and audiobooks. Earn certificates when you finish!
          </p>
        </div>

        {/* Course Detail View */}
        {selectedCourse ? (
          <div className="bg-gradient-to-br from-space-deep/80 to-space-nebula/20 border border-white/10 rounded-2xl p-6 md:p-8">
            {/* Back Button & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <Button
                variant="ghost"
                onClick={() => setSelectedCourse(null)}
                className="text-white/70 hover:text-white self-start"
              >
                ← Back to Courses
              </Button>
              
              <div className="flex items-center gap-3">
                {getProgressPercentage(selectedCourse) === 100 && !isCourseCompleted(selectedCourse.id) && (
                  <Button
                    onClick={() => completeCourse(selectedCourse)}
                    className="bg-gradient-to-r from-space-gold to-yellow-500 text-space-deep hover:from-yellow-400"
                  >
                    <Award className="w-4 h-4 mr-2" /> Claim Certificate
                  </Button>
                )}
                <Button
                  onClick={() => setShowQuiz(selectedCourse)}
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  <HelpCircle className="w-4 h-4 mr-2" /> Take Quiz
                </Button>
                {isCourseCompleted(selectedCourse.id) && (
                  <Button
                    variant="outline"
                    onClick={() => restartCourse(selectedCourse.id)}
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Restart Course
                  </Button>
                )}
              </div>
            </div>

            {/* Course Header */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <img
                src={selectedCourse.thumbnail}
                alt={selectedCourse.title}
                className="w-full md:w-64 h-40 object-cover rounded-xl"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(selectedCourse.difficulty)}`}>
                    {selectedCourse.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-white/60 text-sm">
                    <Clock className="w-4 h-4" /> {selectedCourse.estimatedDuration}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedCourse.title}</h3>
                <p className="text-white/70 mb-4">{selectedCourse.description}</p>
                
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Progress</span>
                    <span className="text-space-gold font-medium">{getProgressPercentage(selectedCourse)}%</span>
                  </div>
                  <Progress value={getProgressPercentage(selectedCourse)} className="h-3" />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(['plan', 'videos', 'books', 'audiobooks'] as const).map(tab => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab)}
                  className={activeTab === tab 
                    ? 'bg-space-gold text-space-deep' 
                    : 'border-white/20 text-white hover:bg-white/10'
                  }
                >
                  {tab === 'plan' && <BookOpen className="w-4 h-4 mr-2" />}
                  {tab === 'videos' && <Video className="w-4 h-4 mr-2" />}
                  {tab === 'books' && <BookOpen className="w-4 h-4 mr-2" />}
                  {tab === 'audiobooks' && <Headphones className="w-4 h-4 mr-2" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {/* Course Plan */}
              {activeTab === 'plan' && (
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-space-gold" /> Learning Goals
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {selectedCourse.learningGoals.map((goal, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-white/80">
                          <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Course Plan</h4>
                    {selectedCourse.plan.map((week, idx) => (
                      <div key={idx} className="bg-white/5 rounded-xl p-4 border-l-4 border-space-gold">
                        <h5 className="text-white font-medium mb-2">Week {week.week}: {week.topic}</h5>
                        <ul className="space-y-1">
                          {week.activities.map((activity, aIdx) => (
                            <li key={aIdx} className="text-white/70 text-sm flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-space-gold" /> {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos */}
              {activeTab === 'videos' && (
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedCourse.videoIds.map(videoId => {
                    const video = getVideoById(videoId);
                    if (!video) return null;
                    const isCompleted = isItemCompleted(selectedCourse.id, videoId, 'video');
                    
                    return (
                      <div key={videoId} className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
                        {playingVideo === videoId ? (
                          <div className="aspect-video">
                            <iframe
                              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                              className="w-full h-full"
                              allow="autoplay; encrypted-media"
                              allowFullScreen
                            />
                          </div>
                        ) : (
                          <div className="relative cursor-pointer" onClick={() => setPlayingVideo(videoId)}>
                            <img src={video.thumbnail} alt={video.title} className="w-full aspect-video object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <div className="w-14 h-14 bg-space-gold/90 rounded-full flex items-center justify-center">
                                <Play className="w-6 h-6 text-space-deep ml-1" />
                              </div>
                            </div>
                            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </span>
                          </div>
                        )}
                        <div className="p-3">
                          <h5 className="text-white font-medium text-sm line-clamp-2">{video.title}</h5>
                          <Button
                            size="sm"
                            variant={isCompleted ? 'default' : 'outline'}
                            onClick={() => toggleItemComplete(selectedCourse.id, videoId, 'video')}
                            className={`mt-2 w-full ${isCompleted ? 'bg-green-600 hover:bg-green-700' : 'border-white/20 text-white'}`}
                          >
                            {isCompleted ? <><Check className="w-4 h-4 mr-1" /> Completed</> : 'Mark Complete'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Books */}
              {activeTab === 'books' && (
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedCourse.bookIds.map(bookId => {
                    const book = getBookById(bookId);
                    if (!book) return null;
                    const isCompleted = isItemCompleted(selectedCourse.id, bookId, 'book');
                    
                    return (
                      <div key={bookId} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 p-4">
                        <img src={book.cover} alt={book.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                        <h5 className="text-white font-medium text-sm line-clamp-2 mb-1">{book.title}</h5>
                        <p className="text-white/60 text-xs mb-3">by {book.author}</p>
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => openBook(book)}
                            className="w-full bg-space-nebula hover:bg-space-nebula/80"
                          >
                            <BookOpen className="w-4 h-4 mr-1" /> Read Now
                          </Button>
                          <Button
                            size="sm"
                            variant={isCompleted ? 'default' : 'outline'}
                            onClick={() => toggleItemComplete(selectedCourse.id, bookId, 'book')}
                            className={`w-full ${isCompleted ? 'bg-green-600 hover:bg-green-700' : 'border-white/20 text-white'}`}
                          >
                            {isCompleted ? <><Check className="w-4 h-4 mr-1" /> Completed</> : 'Mark Complete'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Audiobooks */}
              {activeTab === 'audiobooks' && (
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedCourse.audiobookIds.map(abId => {
                    const audiobook = getBookById(abId);
                    if (!audiobook) return null;
                    const isCompleted = isItemCompleted(selectedCourse.id, abId, 'audiobook');
                    
                    return (
                      <div key={abId} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 p-4">
                        <div className="relative">
                          <img src={audiobook.cover} alt={audiobook.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                          <div className="absolute top-2 right-2 bg-purple-600 rounded-full p-2">
                            <Headphones className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <h5 className="text-white font-medium text-sm line-clamp-2 mb-1">{audiobook.title}</h5>
                        <p className="text-white/60 text-xs mb-1">by {audiobook.author}</p>
                        {audiobook.duration && (
                          <p className="text-purple-400 text-xs mb-3">{audiobook.duration}</p>
                        )}
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => openAudiobook(audiobook)}
                            className="w-full bg-purple-600 hover:bg-purple-700"
                          >
                            <Play className="w-4 h-4 mr-1" /> Listen Now
                          </Button>
                          <Button
                            size="sm"
                            variant={isCompleted ? 'default' : 'outline'}
                            onClick={() => toggleItemComplete(selectedCourse.id, abId, 'audiobook')}
                            className={`w-full ${isCompleted ? 'bg-green-600 hover:bg-green-700' : 'border-white/20 text-white'}`}
                          >
                            {isCompleted ? <><Check className="w-4 h-4 mr-1" /> Completed</> : 'Mark Complete'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Available Courses */}
            {availableCourses.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-space-gold" /> Available Courses ({availableCourses.length})
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {availableCourses.map(course => (
                    <div
                      key={course.id}
                      className="group bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl overflow-hidden hover:border-space-gold/50 transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedCourse(course)}
                    >
                      <div className="relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="text-white font-semibold mb-2 line-clamp-2">{course.title}</h4>
                        <p className="text-white/60 text-sm line-clamp-2 mb-3">{course.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                          <span className="flex items-center gap-1"><Video className="w-3 h-3" /> {course.videoIds.length}</span>
                          <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.bookIds.length}</span>
                          <span className="flex items-center gap-1"><Headphones className="w-3 h-3" /> {course.audiobookIds.length}</span>
                        </div>

                        {/* Progress if started */}
                        {getProgressPercentage(course) > 0 && (
                          <div className="space-y-1 mb-3">
                            <Progress value={getProgressPercentage(course)} className="h-2" />
                            <span className="text-xs text-space-gold">{getProgressPercentage(course)}% complete</span>
                          </div>
                        )}

                        <Button
                          variant="outline"
                          className="w-full border-space-gold/50 text-space-gold hover:bg-space-gold/20"
                        >
                          {getProgressPercentage(course) > 0 ? 'Continue' : 'Start Course'} <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Courses */}
            {completedCoursesList.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-space-gold" /> Completed Courses ({completedCoursesList.length})
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {completedCoursesList.map(course => {
                    const completion = completedCourses.find(c => c.courseId === course.id);
                    return (
                      <div
                        key={course.id}
                        className="bg-gradient-to-br from-space-gold/10 to-yellow-500/5 border border-space-gold/30 rounded-2xl overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-36 object-cover opacity-80"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                            <div className="bg-space-gold rounded-full p-3">
                              <Award className="w-8 h-8 text-space-deep" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="text-white font-semibold mb-1">{course.title}</h4>
                          <p className="text-white/60 text-sm mb-3">Completed {completion?.completedAt}</p>
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => setShowCertificate({ course, date: completion?.completedAt || '' })}
                              className="flex-1 bg-space-gold text-space-deep hover:bg-yellow-400"
                            >
                              <Award className="w-4 h-4 mr-1" /> Certificate
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => restartCourse(course.id)}
                              className="border-white/30 text-white hover:bg-white/10"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty State */}
            {availableCourses.length === 0 && completedCoursesList.length > 0 && (
              <div className="text-center py-12 bg-gradient-to-br from-space-gold/10 to-transparent rounded-2xl border border-space-gold/20">
                <Trophy className="w-16 h-16 text-space-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Amazing! You've completed all courses!</h3>
                <p className="text-white/70 mb-4">You're a certified space expert. Want to restart any course?</p>
                <Button
                  onClick={() => {
                    setCompletedCourses([]);
                    setCourseProgress([]);
                  }}
                  className="bg-space-gold text-space-deep hover:bg-yellow-400"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Reset All Courses
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <CourseCertificate
          course={showCertificate.course}
          completedDate={showCertificate.date}
          onClose={() => setShowCertificate(null)}
        />
      )}

      {/* Book Reader Modal */}
      {readingBook && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-space-deep to-space-nebula/30 border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white">{readingBook.title}</h3>
                <p className="text-white/60 text-sm">by {readingBook.author}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={closeBook} className="text-white/70 hover:text-white">
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            {/* Chapter Navigation */}
            <div className="flex items-center gap-2 p-4 border-b border-white/10 overflow-x-auto">
              {readingBook.chapters.map((chapter, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  variant={currentChapter === idx ? 'default' : 'outline'}
                  onClick={() => setCurrentChapter(idx)}
                  className={`whitespace-nowrap ${
                    currentChapter === idx 
                      ? 'bg-space-gold text-space-deep' 
                      : 'border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  Ch. {idx + 1}
                </Button>
              ))}
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <h4 className="text-2xl font-bold text-space-gold mb-4">
                Chapter {currentChapter + 1}: {readingBook.chapters[currentChapter].title}
              </h4>
              <p className="text-white/90 text-lg leading-relaxed whitespace-pre-wrap">
                {readingBook.chapters[currentChapter].content}
              </p>
            </div>
            
            {/* Footer Navigation */}
            <div className="flex items-center justify-between p-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={prevChapter}
                disabled={currentChapter === 0}
                className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <span className="text-white/60">
                {currentChapter + 1} of {readingBook.chapters.length}
              </span>
              <Button
                variant="outline"
                onClick={nextChapter}
                disabled={currentChapter === readingBook.chapters.length - 1}
                className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Audiobook Player Modal */}
      {playingAudiobook && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-900/80 to-space-deep border border-purple-500/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
              <div className="flex items-center gap-4">
                <img
                  src={playingAudiobook.cover}
                  alt={playingAudiobook.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{playingAudiobook.title}</h3>
                  <p className="text-white/60 text-sm">by {playingAudiobook.author}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={closeAudiobook} className="text-white/70 hover:text-white">
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            {/* Controls */}
            <div className="p-6 space-y-6">
              {/* Play/Pause Button */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={togglePlayPause}
                  className="w-20 h-20 rounded-full bg-purple-600 hover:bg-purple-700"
                >
                  {isSpeaking ? (
                    <Pause className="w-10 h-10" />
                  ) : (
                    <Play className="w-10 h-10 ml-1" />
                  )}
                </Button>
              </div>
              
              {/* Speed Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>Speed</span>
                  <span>{speechRate}x</span>
                </div>
                <Slider
                  value={[speechRate]}
                  onValueChange={([value]) => setSpeechRate(value)}
                  min={0.5}
                  max={2}
                  step={0.25}
                  className="w-full"
                />
              </div>
              
              {/* Volume Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span className="flex items-center gap-2">
                    {speechVolume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    Volume
                  </span>
                  <span>{Math.round(speechVolume * 100)}%</span>
                </div>
                <Slider
                  value={[speechVolume]}
                  onValueChange={([value]) => setSpeechVolume(value)}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Chapters */}
            <div className="flex-1 overflow-y-auto border-t border-purple-500/20">
              <div className="p-4">
                <h4 className="text-white/60 text-sm font-medium mb-3">Chapters</h4>
                <div className="space-y-2">
                  {playingAudiobook.chapters.map((chapter, idx) => (
                    <button
                      key={idx}
                      onClick={() => playAudioChapter(idx)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        audioChapter === idx && isSpeaking
                          ? 'bg-purple-600/50 border border-purple-500'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          audioChapter === idx && isSpeaking ? 'bg-purple-500' : 'bg-white/10'
                        }`}>
                          {audioChapter === idx && isSpeaking ? (
                            <Headphones className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-white/70 text-sm">{idx + 1}</span>
                          )}
                        </div>
                        <span className="text-white font-medium">{chapter.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Quiz Modal */}
      {showQuiz && (
        <CourseQuiz
          courseId={showQuiz.id}
          courseTitle={showQuiz.title}
          onClose={() => setShowQuiz(null)}
        />
      )}
    </section>
  );
};

export default CourseSection;
