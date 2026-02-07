import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Trophy, Gamepad2, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

interface ToolbarItem {
  id: string;
  icon: React.ElementType;
  label: string;
  href: string;
  color: string;
  gradient: string;
}

const toolbarItems: ToolbarItem[] = [
  {
    id: 'music',
    icon: Music,
    label: 'Music',
    href: '#music',
    color: 'text-purple-400',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'achievements',
    icon: Trophy,
    label: 'Trophies',
    href: '#achievements',
    color: 'text-amber-400',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'game-passes',
    icon: Gamepad2,
    label: 'Passes',
    href: '#game-passes',
    color: 'text-cyan-400',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'shop',
    icon: ShoppingBag,
    label: 'Shop',
    href: '#shop',
    color: 'text-pink-400',
    gradient: 'from-pink-500 to-purple-500',
  },
];

const QuickAccessToolbar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsExpanded(false);
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <motion.div
        className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Toggle button */}
        <motion.button
          className="w-full p-3 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="flex items-center gap-1"
              >
                <Sparkles className="w-4 h-4" />
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Toolbar items */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="p-2 space-y-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {toolbarItems.map((item, index) => {
                const Icon = item.icon;
                const isHovered = hoveredItem === item.id;

                return (
                  <motion.button
                    key={item.id}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      isHovered ? `bg-gradient-to-r ${item.gradient} text-white` : 'hover:bg-white/10'
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Icon className={`w-5 h-5 ${isHovered ? 'text-white' : item.color}`} />
                    <span className={`text-sm font-medium whitespace-nowrap ${isHovered ? 'text-white' : 'text-white/70'}`}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating indicator when collapsed */}
      {!isExpanded && (
        <motion.div
          className="absolute -right-2 top-0 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          4
        </motion.div>
      )}
    </div>
  );
};

export default QuickAccessToolbar;
