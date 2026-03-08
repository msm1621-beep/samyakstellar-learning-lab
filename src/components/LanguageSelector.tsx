import { useState } from 'react';
import { Globe, ChevronDown, Check, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages } from '@/data/translations';

const LanguageSelector = () => {
  const { language, setLanguage, t, isSpeaking, readPageAloud } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="fixed top-[4.5rem] right-4 z-[45] flex items-center gap-2">
      {/* TTS Button */}
      <button
        onClick={readPageAloud}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-md border shadow-lg transition-all ${
          isSpeaking
            ? 'bg-primary/20 border-primary/50 text-primary animate-pulse'
            : 'bg-background/80 border-border/50 hover:border-primary/50'
        }`}
        title={isSpeaking ? t('tts.stopReading') : t('tts.readPage')}
      >
        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        <span className="text-xs font-medium hidden sm:inline">
          {isSpeaking ? t('tts.stopReading') : t('tts.readAloud')}
        </span>
      </button>

      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all shadow-lg"
        >
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{currentLang?.flag} {currentLang?.nativeName}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div className="fixed inset-0 z-[44]" onClick={() => setIsOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64 max-h-[70vh] overflow-y-auto rounded-xl bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl z-[46]"
              >
                <div className="p-3 border-b border-border/30">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t('language.select')}
                  </p>
                </div>
                <div className="p-2 grid grid-cols-1 gap-0.5">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-all ${
                        language === lang.code
                          ? 'bg-primary/15 text-primary'
                          : 'hover:bg-muted/50 text-foreground'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{lang.nativeName}</p>
                        <p className="text-xs text-muted-foreground">{lang.name}</p>
                      </div>
                      {language === lang.code && (
                        <Check className="w-4 h-4 text-primary shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LanguageSelector;
