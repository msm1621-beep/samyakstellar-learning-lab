import { motion } from 'framer-motion';
import { usePerks } from '@/contexts/PerksContext';
import { Award } from 'lucide-react';

const PerkBadgeRow = () => {
  const { badges } = usePerks();
  if (badges.length === 0) return null;

  return (
    <motion.div
      className="fixed top-20 right-4 z-40 flex flex-col items-end gap-2 pointer-events-none"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex items-center gap-1 text-xs text-amber-300/80 bg-slate-900/70 px-2 py-1 rounded-full backdrop-blur">
        <Award className="w-3 h-3" />
        <span>{badges.length} active</span>
      </div>
      <div className="flex flex-wrap justify-end gap-1 max-w-[200px]">
        {badges.slice(0, 12).map((b, i) => (
          <motion.div
            key={`${b.label}-${i}`}
            className={`relative w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur border border-white/10 flex items-center justify-center text-base shadow-lg ${b.glow}`}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.05 * i, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.15 }}
            title={b.label}
          >
            <motion.span
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
            >
              {b.icon}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PerkBadgeRow;
