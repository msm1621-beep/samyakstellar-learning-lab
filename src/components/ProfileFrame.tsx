import { motion } from 'framer-motion';
import { usePerks } from '@/contexts/PerksContext';

interface ProfileFrameProps {
  icon: string;
  size?: number;
}

/**
 * Animated profile frame that renders the user's avatar inside
 * a glowing rotating ring whose color depends on owned perks.
 */
const ProfileFrame = ({ icon, size = 48 }: ProfileFrameProps) => {
  const { frameStyle, hasSupremeCrown, hasGalaxyAnimations } = usePerks();

  if (!frameStyle) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-purple-900/30"
        style={{ width: size, height: size, fontSize: size * 0.5 }}
      >
        {icon}
      </div>
    );
  }

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${frameStyle} blur-md opacity-70`}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${frameStyle}`}
        style={{ padding: 2 }}
        animate={{ rotate: hasGalaxyAnimations ? 360 : 0 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center"
          style={{ fontSize: size * 0.5 }}
        >
          {icon}
        </div>
      </motion.div>
      {hasSupremeCrown && (
        <motion.span
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-base"
          animate={{ y: [0, -2, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          👑
        </motion.span>
      )}
    </div>
  );
};

export default ProfileFrame;
