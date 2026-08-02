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

const SAMPLE_ENTRIES: LeaderboardEntry[] = [
  { display_name: 'StarGazer', avatar_emoji: '🌟', courses_completed: 12, total_coins: 2400 },
  { display_name: 'NebulaNinja', avatar_emoji: '🚀', courses_completed: 10, total_coins: 1850 },
  { display_name: 'CosmicCoder', avatar_emoji: '👨‍🚀', courses_completed: 8, total_coins: 1600 },
  { display_name: 'GalaxyQueen', avatar_emoji: '👑', courses_completed: 7, total_coins: 1350 },
  { display_name: 'OrbitOtter', avatar_emoji: '🦦', courses_completed: 5, total_coins: 900 },
];

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await supabase.rpc('get_leaderboard', { limit_count: 20 });

      const rankedEntries = ((data || []) as LeaderboardEntry[]).filter((entry) => entry.courses_completed > 0);

      if (rankedEntries.length > 0) {
        setEntries(rankedEntries);
        setShowPreview(false);
      } else {
        setEntries(SAMPLE_ENTRIES);
        setShowPreview(true);
      }

      setLoading(false);
    };

    void fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <Crown className="w-5 h-5 text-primary" />;
    if (rank === 1) return <Medal className="w-5 h-5 text-accent" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-star" />;
    return <Star className="w-4 h-4 text-muted-foreground" />;
  };

  const getRankBg = (rank: number) => {
    if (rank === 0) return 'bg-primary/10 border-primary/30';
    if (rank === 1) return 'bg-accent/10 border-accent/30';
    if (rank === 2) return 'bg-secondary/40 border-secondary';
    return 'bg-card/50 border-border';
  };

  return (
    <section id="leaderboard" className="scroll-mt-28 py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-muted-foreground mb-4">
            <Trophy className="w-4 h-4 text-primary" />
            Course Champions
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-star" />
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-star">
              Leaderboard
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Top space explorers ranked by courses completed
          </p>
          {showPreview && !loading && (
            <p className="text-sm text-muted-foreground mt-3">
              Preview rankings are shown until real explorers complete their first courses.
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading rankings...</div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, idx) => (
              <motion.div
                key={`${entry.display_name}-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-center gap-4 rounded-xl border p-4 ${getRankBg(idx)}`}
              >
                <div className="w-8 flex items-center justify-center">{getRankIcon(idx)}</div>
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
