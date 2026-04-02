import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
  display_name: string;
  avatar_emoji: string;
  courses_completed: number;
  total_coins: number;
}

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('display_name, avatar_emoji, courses_completed, total_coins')
        .order('courses_completed', { ascending: false })
        .limit(20);
      if (data) setEntries(data as LeaderboardEntry[]);
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 1) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-amber-600" />;
    return <Star className="w-4 h-4 text-muted-foreground" />;
  };

  const getRankBg = (rank: number) => {
    if (rank === 0) return 'bg-yellow-500/10 border-yellow-500/30';
    if (rank === 1) return 'bg-gray-400/10 border-gray-400/20';
    if (rank === 2) return 'bg-amber-600/10 border-amber-600/20';
    return 'bg-card/30 border-border/50';
  };

  return (
    <section id="leaderboard" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-star" />
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-star via-yellow-300 to-accent">
              Leaderboard
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Top space explorers ranked by courses completed
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading rankings...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No explorers on the board yet. Be the first!</p>
            <p className="text-sm text-muted-foreground/60 mt-2">Sign up and complete courses to appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-xl border ${getRankBg(idx)}`}
              >
                <div className="w-8 flex items-center justify-center">
                  {getRankIcon(idx)}
                </div>
                <span className="text-2xl">{entry.avatar_emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{entry.display_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {entry.courses_completed} course{entry.courses_completed !== 1 ? 's' : ''} completed • {entry.total_coins} coins
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-foreground">#{idx + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Leaderboard;
