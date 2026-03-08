import { useState, useEffect } from 'react';
import { dailyFacts, getCategoryColor, getCategoryLabel } from '@/data/dailyFacts';
import { Sparkles, RefreshCw, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

const DailyFactWidget = () => {
  const [currentFact, setCurrentFact] = useState(dailyFacts[0]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [factIndex, setFactIndex] = useState(0);

  // Get today's fact based on day of year
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const todayIndex = dayOfYear % dailyFacts.length;
    setFactIndex(todayIndex);
    setCurrentFact(dailyFacts[todayIndex]);
  }, []);

  const getNewFact = () => {
    setIsFlipping(true);
    setTimeout(() => {
      const newIndex = (factIndex + 1) % dailyFacts.length;
      setFactIndex(newIndex);
      setCurrentFact(dailyFacts[newIndex]);
      setIsFlipping(false);
    }, 300);
  };

  const shareFact = async () => {
    const shareText = `🌟 Space Fact: ${currentFact.fact} - via Cosmic Classroom`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cosmic Classroom - Space Fact',
          text: shareText,
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success('Fact copied to clipboard! 📋');
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            Daily Space Fact
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </h2>
          <p className="text-purple-200">Something new to learn every day!</p>
        </div>

        <div
          className={`relative bg-gradient-to-br ${getCategoryColor(currentFact.category)} border rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 ${
            isFlipping ? 'scale-95 opacity-50 rotate-y-180' : 'scale-100 opacity-100'
          }`}
        >
          {/* Category Badge */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-full shadow-lg">
              {getCategoryLabel(currentFact.category)}
            </span>
          </div>

          {/* Fact Content */}
          <div className="text-center pt-4">
            <span className="text-6xl mb-6 block">{currentFact.emoji}</span>
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-6">
              {currentFact.fact}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={getNewFact}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 hover:scale-105 group"
            >
              <RefreshCw className={`w-5 h-5 transition-transform ${isFlipping ? 'animate-spin' : 'group-hover:rotate-180'}`} />
              <span>New Fact</span>
            </button>
            <button
              onClick={shareFact}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full transition-all duration-300 hover:scale-105"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>

          {/* Decorative Stars */}
          <div className="absolute top-4 left-4 text-2xl opacity-50 animate-pulse">✨</div>
          <div className="absolute top-4 right-4 text-2xl opacity-50 animate-pulse delay-100">⭐</div>
          <div className="absolute bottom-4 left-4 text-2xl opacity-50 animate-pulse delay-200">🌟</div>
          <div className="absolute bottom-4 right-4 text-2xl opacity-50 animate-pulse delay-300">💫</div>
        </div>

        {/* Fact Counter */}
        <p className="text-center text-purple-300 mt-4 text-sm">
          Fact #{currentFact.id} of {dailyFacts.length} • Come back tomorrow for a new daily fact!
        </p>
      </div>
    </section>
  );
};

export default DailyFactWidget;
