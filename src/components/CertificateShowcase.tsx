import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, BookOpen, Gamepad2, GraduationCap, Headphones, X, Calendar, ShoppingBag, Ticket, Crown, Lock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAchievements, Achievement } from '@/contexts/AchievementsContext';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

const typeConfig = {
  course: { icon: GraduationCap, color: 'from-purple-500 to-violet-500', label: 'Courses' },
  game: { icon: Gamepad2, color: 'from-cyan-500 to-blue-500', label: 'Games' },
  quiz: { icon: Award, color: 'from-amber-500 to-orange-500', label: 'Quizzes' },
  book: { icon: BookOpen, color: 'from-green-500 to-emerald-500', label: 'Books' },
  audiobook: { icon: Headphones, color: 'from-pink-500 to-rose-500', label: 'Audiobooks' },
  shop: { icon: ShoppingBag, color: 'from-fuchsia-500 to-pink-500', label: 'Shop Items' },
  gamepass: { icon: Ticket, color: 'from-cyan-400 to-teal-500', label: 'Game Passes' },
  subscription: { icon: Crown, color: 'from-yellow-500 to-amber-500', label: 'Subscriptions' },
};

const CertificateShowcase = () => {
  const { t } = useLanguage();
  const { achievements, getAchievementsByType, totalAchievements, removeAchievement } = useAchievements();
  const [selectedType, setSelectedType] = useState<Achievement['type'] | 'all'>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const filteredAchievements = selectedType === 'all' 
    ? achievements 
    : getAchievementsByType(selectedType);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 px-4" id="achievements">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-amber-400" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 text-transparent bg-clip-text">
              {t('section.trophyCabinet')}
            </h2>
          </div>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t('section.trophyCabinetDesc')}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full border border-amber-500/30">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-amber-300 font-semibold">{totalAchievements} Total Achievements</span>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            variant={selectedType === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedType('all')}
            className={selectedType === 'all' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'border-white/20 text-white/70'}
          >
            All ({totalAchievements})
          </Button>
          {(Object.keys(typeConfig) as Achievement['type'][]).map(type => {
            const config = typeConfig[type];
            const count = getAchievementsByType(type).length;
            const Icon = config.icon;
            return (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                onClick={() => setSelectedType(type)}
                className={selectedType === type ? `bg-gradient-to-r ${config.color}` : 'border-white/20 text-white/70'}
              >
                <Icon className="w-4 h-4 mr-2" />
                {config.label} ({count})
              </Button>
            );
          })}
        </div>

        {/* Achievements Grid */}
        {filteredAchievements.length === 0 ? (
          <motion.div
            className="text-center py-16 bg-slate-900/50 rounded-2xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Trophy className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white/40 mb-2">No Achievements Yet</h3>
            <p className="text-white/30">Complete courses, games, and quizzes to earn achievements!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <AnimatePresence>
              {filteredAchievements.map((achievement, index) => {
                const config = typeConfig[achievement.type];
                const Icon = config.icon;
                
                return (
                  <motion.div
                    key={achievement.id}
                    className={`relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/30 transition-all group`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    onClick={() => setSelectedAchievement(achievement)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-10 rounded-xl`} />
                    
                    {/* Locked badge */}
                    <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-amber-500/20 px-1.5 py-0.5 rounded-full border border-amber-500/30">
                      <Lock className="w-2.5 h-2.5 text-amber-400" />
                      <span className="text-[9px] text-amber-300 font-bold uppercase">Locked</span>
                    </div>

                    {/* Delete button */}
                    <button
                      className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/20 hover:bg-red-500/40 p-1 rounded-full border border-red-500/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAchievement(achievement.id);
                        toast.success(`Removed "${achievement.name}" from trophy cabinet`);
                      }}
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
                    
                    <div className="relative z-10 text-center mt-3">
                      <motion.div
                        className="text-4xl mb-2"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      >
                        {achievement.icon}
                      </motion.div>
                      <h4 className="text-sm font-semibold text-white truncate" title={achievement.name}>
                        {achievement.name}
                      </h4>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Icon className="w-3 h-3 text-white/50" />
                        <span className="text-xs text-white/40">{config.label}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Achievement Detail Modal */}
        <AnimatePresence>
          {selectedAchievement && (
            <motion.div
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setSelectedAchievement(null)}
              />
              
              <motion.div
                className="relative bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center">
                  <motion.div
                    className="text-7xl mb-4"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {selectedAchievement.icon}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedAchievement.name}
                  </h3>
                  
                  {selectedAchievement.description && (
                    <p className="text-white/60 mb-4">{selectedAchievement.description}</p>
                  )}
                  
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${typeConfig[selectedAchievement.type].color}`}>
                    {React.createElement(typeConfig[selectedAchievement.type].icon, { className: 'w-4 h-4' })}
                    <span className="font-medium">{typeConfig[selectedAchievement.type].label}</span>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center gap-2 text-white/40">
                    <Calendar className="w-4 h-4" />
                    <span>Earned on {formatDate(selectedAchievement.earnedAt)}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CertificateShowcase;
