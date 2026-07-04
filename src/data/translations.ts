export type LanguageCode = 
  | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ko'
  | 'hi' | 'ar' | 'tr' | 'nl' | 'pl' | 'sv' | 'th' | 'vi' | 'id' | 'el'
  | 'uk' | 'he' | 'bn' | 'ms';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
];

// Language to speech synthesis locale mapping
export const langToSpeechLocale: Record<LanguageCode, string> = {
  en: 'en-US', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', it: 'it-IT', pt: 'pt-BR',
  ru: 'ru-RU', zh: 'zh-CN', ja: 'ja-JP', ko: 'ko-KR', hi: 'hi-IN', ar: 'ar-SA',
  tr: 'tr-TR', nl: 'nl-NL', pl: 'pl-PL', sv: 'sv-SE', th: 'th-TH', vi: 'vi-VN',
  id: 'id-ID', el: 'el-GR', uk: 'uk-UA', he: 'he-IL', bn: 'bn-BD', ms: 'ms-MY',
};

type TranslationKeys = {
  // Navigation
  'nav.home': string;
  'nav.solarSystem': string;
  'nav.timeline': string;
  'nav.constellations': string;
  'nav.library': string;
  'nav.games': string;
  'nav.subscriptions': string;
  'nav.funFacts': string;
  'nav.about': string;
  'nav.startJourney': string;
  'nav.cosmicClassroom': string;

  // Hero
  'hero.badge': string;
  'hero.welcome': string;
  'hero.cosmicClassroom': string;
  'hero.subtitle': string;
  'hero.startJourney': string;
  'hero.takeQuiz': string;
  'hero.solarSystem': string;
  'hero.solarSystemDesc': string;
  'hero.starsNebulas': string;
  'hero.starsNebulasDesc': string;
  'hero.galaxiesBeyond': string;
  'hero.galaxiesBeyondDesc': string;

  // Sections
  'section.dailyFact': string;
  'section.spaceQnA': string;
  'section.spaceQnADesc': string;
  'section.celestialExplorer': string;
  'section.spaceTimeline': string;
  'section.constellations': string;
  'section.courses': string;
  'section.coursesDesc': string;
  'section.giftVouchers': string;
  'section.manuscripts': string;
  'section.library': string;
  'section.libraryDesc': string;
  'section.games': string;
  'section.gamesDesc': string;
  'section.premiumGames': string;
  'section.gamePass': string;
  'section.shop': string;
  'section.trophyCabinet': string;
  'section.trophyCabinetDesc': string;
  'section.subscriptions': string;
  'section.funFacts': string;
  'section.about': string;
  'section.aboutMission': string;
  'section.aboutMissionDesc': string;
  'section.aboutMissionDesc2': string;

  // Common
  'common.learn': string;
  'common.play': string;
  'common.explore': string;
  'common.learnDesc': string;
  'common.playDesc': string;
  'common.exploreDesc': string;
  'common.videos': string;
  'common.books': string;
  'common.audiobooks': string;
  'common.all': string;
  'common.close': string;
  'common.back': string;
  'common.next': string;
  'common.previous': string;
  'common.readNow': string;
  'common.watchNow': string;
  'common.listenNow': string;
  'common.noAchievements': string;
  'common.noAchievementsDesc': string;
  'common.totalAchievements': string;
  'common.earnedOn': string;
  'common.locked': string;
  'common.coins': string;
  'common.new': string;
  'common.buy': string;
  'common.purchased': string;

  // Footer
  'footer.tagline': string;
  'footer.explore': string;
  'footer.learnPlay': string;
  'footer.resources': string;
  'footer.universeExplorer': string;
  'footer.celestialLibrary': string;
  'footer.quizzes': string;
  'footer.forParents': string;
  'footer.contact': string;
  'footer.privacy': string;
  'footer.madeWith': string;
  'footer.copyright': string;

  // Games
  'games.quiz': string;
  'games.sizeCompare': string;
  'games.rocketShooter': string;
  'games.memoryMatch': string;
  'games.wordScramble': string;
  'games.rocketMath': string;

  // Library tabs
  'library.videos': string;
  'library.books': string;
  'library.audiobooks': string;

  // Courses
  'courses.spaceCourses': string;
  'courses.backToCourses': string;
  'courses.claimCertificate': string;
  'courses.takeQuiz': string;
  'courses.restartCourse': string;
  'courses.progress': string;
  'courses.learningGoals': string;
  'courses.coursePlan': string;
  'courses.plan': string;

  // About items
  'about.planetsMoons': string;
  'about.starsNebulas': string;
  'about.galaxies': string;
  'about.booksVideos': string;

  // Language & TTS
  'language.select': string;
  'tts.readAloud': string;
  'tts.stopReading': string;
  'tts.readPage': string;

  // Explorer section
  'explorer.title': string;
  'explorer.desc': string;
  'explorer.anyDistance': string;
  'explorer.near': string;
  'explorer.far': string;
  'explorer.noResults': string;
  'explorer.adjustFilters': string;

  // Timeline
  'timeline.title': string;
  'timeline.desc': string;
  'timeline.allEvents': string;

  // Constellation
  'constellation.title': string;
  'constellation.desc': string;
  'constellation.starMap': string;
  'constellation.selectToView': string;

  // Daily Fact
  'dailyFact.subtitle': string;
  'dailyFact.newFact': string;
  'dailyFact.share': string;
  'dailyFact.comeBack': string;

  // Fun Facts
  'funFacts.desc': string;
  'funFacts.tapCards': string;
  'funFacts.randomFact': string;

  // Shop
  'shop.desc': string;
  'shop.boosts': string;
  'shop.cosmetics': string;
  'shop.utilities': string;
  'shop.popular': string;

  // Subscription
  'subscription.desc': string;
  'subscription.current': string;
  'subscription.purchase': string;
  'subscription.dailyBonus': string;
  'subscription.claimBonus': string;
  'subscription.expired': string;
  'subscription.daysLeft': string;

  // Game Pass
  'gamePass.desc': string;
  'gamePass.active': string;

  // Premium Games
  'premiumGames.desc': string;

  // Gift Voucher
  'giftVoucher.desc': string;
  'giftVoucher.scratch': string;
  'giftVoucher.noVouchers': string;

  // Manuscripts
  'manuscripts.desc': string;

  // Q&A
  'qna.askAnything': string;
  'qna.searching': string;
  'qna.ask': string;
  'qna.suggested': string;

  // Account
  'account.createAccount': string;
  'account.guest': string;
  'account.profile': string;
};

export type TranslationKey = keyof TranslationKeys;

const translations: Record<string, TranslationKeys> = {
  en: {
    'nav.home': 'Home', 'nav.solarSystem': 'Solar System', 'nav.timeline': 'Timeline', 'nav.constellations': 'Constellations', 'nav.library': 'Library', 'nav.games': 'Games', 'nav.subscriptions': 'Subscriptions', 'nav.funFacts': 'Fun Facts', 'nav.about': 'About', 'nav.startJourney': 'Start Your Journey', 'nav.cosmicClassroom': 'Stellar Learning Lab',
    'hero.badge': 'For young explorers ages 7-13', 'hero.welcome': 'Welcome to', 'hero.cosmicClassroom': 'Stellar Learning Lab', 'hero.subtitle': 'Explore Every Corner of the Universe! 🚀 Learn about planets, stars, nebulas, galaxies, and so much more!', 'hero.startJourney': 'Start Your Space Journey', 'hero.takeQuiz': 'Take a Quiz',
    'hero.solarSystem': 'Solar System', 'hero.solarSystemDesc': 'Explore planets, moons, asteroids & comets', 'hero.starsNebulas': 'Stars & Nebulas', 'hero.starsNebulasDesc': 'Discover star types, supernovas & glowing clouds', 'hero.galaxiesBeyond': 'Galaxies & Beyond', 'hero.galaxiesBeyondDesc': 'Journey through galaxies, black holes & exoplanets',
    'section.dailyFact': 'Daily Space Fact', 'section.spaceQnA': 'Space Q&A', 'section.spaceQnADesc': 'Ask anything about space!', 'section.celestialExplorer': 'Celestial Explorer', 'section.spaceTimeline': 'Space Timeline', 'section.constellations': 'Constellations',
    'section.courses': 'Space Courses', 'section.coursesDesc': 'Complete structured courses with videos, books, and audiobooks. Earn certificates when you finish!', 'section.giftVouchers': 'Gift Vouchers', 'section.manuscripts': 'Space Manuscripts',
    'section.library': '📚 Celestial Library', 'section.libraryDesc': 'Watch amazing videos, explore space books, and listen to audiobooks about space theories!',
    'section.games': '🎮 Games & Quizzes', 'section.gamesDesc': 'Test your space knowledge with fun interactive games!', 'section.premiumGames': 'Premium Games', 'section.gamePass': 'Game Pass', 'section.shop': 'Space Shop',
    'section.trophyCabinet': 'Trophy Cabinet', 'section.trophyCabinetDesc': 'Your collection of achievements, certificates, and accomplishments from your space exploration journey!',
    'section.subscriptions': 'Subscriptions', 'section.funFacts': 'Fun Facts', 'section.about': '✨ About Stellar Learning Lab', 'section.aboutMission': 'Our Mission',
    'section.aboutMissionDesc': 'Stellar Learning Lab is designed to spark curiosity about the universe in young minds! We make learning about space fun and accessible for kids ages 7-13.',
    'section.aboutMissionDesc2': 'From planets in our solar system to distant galaxies, colorful nebulas to mysterious black holes - there\'s so much to explore!',
    'common.learn': 'Learn', 'common.play': 'Play', 'common.explore': 'Explore', 'common.learnDesc': 'Discover fun facts about every type of celestial body in our universe.', 'common.playDesc': 'Test your knowledge with fun quizzes and earn cool space badges!', 'common.exploreDesc': 'Watch videos and read books curated just for young space explorers.',
    'common.videos': 'Videos', 'common.books': 'Books', 'common.audiobooks': 'Audiobooks', 'common.all': 'All', 'common.close': 'Close', 'common.back': 'Back', 'common.next': 'Next', 'common.previous': 'Previous', 'common.readNow': 'Read Now', 'common.watchNow': 'Watch Now', 'common.listenNow': 'Listen Now',
    'common.noAchievements': 'No Achievements Yet', 'common.noAchievementsDesc': 'Complete courses, games, and quizzes to earn achievements!', 'common.totalAchievements': 'Total Achievements', 'common.earnedOn': 'Earned on', 'common.locked': 'Locked',
    'common.coins': 'Coins', 'common.new': 'NEW', 'common.buy': 'Buy', 'common.purchased': 'Purchased',
    'footer.tagline': 'Making space exploration fun for young minds! 🚀', 'footer.explore': 'Explore', 'footer.learnPlay': 'Learn & Play', 'footer.resources': 'Resources', 'footer.universeExplorer': 'Universe Explorer', 'footer.celestialLibrary': 'Celestial Library', 'footer.quizzes': 'Quizzes', 'footer.forParents': 'For Parents & Teachers', 'footer.contact': 'Contact', 'footer.privacy': 'Privacy Policy', 'footer.madeWith': 'Made with', 'footer.copyright': '© 2024 Stellar Learning Lab. Keep exploring the stars! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Size Compare', 'games.rocketShooter': 'Rocket Shooter', 'games.memoryMatch': 'Memory Match', 'games.wordScramble': 'Word Scramble', 'games.rocketMath': 'Rocket Math',
    'library.videos': 'Videos', 'library.books': 'Books', 'library.audiobooks': 'Audiobooks',
    'courses.spaceCourses': 'Space Courses', 'courses.backToCourses': '← Back to Courses', 'courses.claimCertificate': 'Claim Certificate', 'courses.takeQuiz': 'Take Quiz', 'courses.restartCourse': 'Restart Course', 'courses.progress': 'Progress', 'courses.learningGoals': 'Learning Goals', 'courses.coursePlan': 'Course Plan', 'courses.plan': 'Plan',
    'about.planetsMoons': 'Planets & Moons', 'about.starsNebulas': 'Stars & Nebulas', 'about.galaxies': 'Galaxies', 'about.booksVideos': 'Books & Videos',
    'language.select': 'Language', 'tts.readAloud': 'Read Aloud', 'tts.stopReading': 'Stop Reading', 'tts.readPage': 'Read page content aloud',
    'explorer.title': '🔭 Universe Explorer', 'explorer.desc': 'Click on any celestial body to see images, read about it, or ask Cosmo!', 'explorer.anyDistance': '📍 Any Distance', 'explorer.near': '🏠 Near', 'explorer.far': '🚀 Far', 'explorer.noResults': 'No celestial bodies found with these filters.', 'explorer.adjustFilters': 'Try adjusting your filters!',
    'timeline.title': 'Journey Through Time', 'timeline.desc': 'Travel from the Big Bang to today! Explore the most amazing moments in cosmic history.', 'timeline.allEvents': '🌟 All Events',
    'constellation.title': '✨ Constellation Viewer ✨', 'constellation.desc': 'Click on any constellation to discover its ancient story and see its stars connect!', 'constellation.starMap': 'Interactive Star Map', 'constellation.selectToView': 'Select a constellation to view its star pattern',
    'dailyFact.subtitle': 'Something new to learn every day!', 'dailyFact.newFact': 'New Fact', 'dailyFact.share': 'Share', 'dailyFact.comeBack': 'Come back tomorrow for a new daily fact!',
    'funFacts.desc': 'Tap the cards to reveal amazing facts about the universe!', 'funFacts.tapCards': 'Tap to reveal!', 'funFacts.randomFact': 'Random Fact!',
    'shop.desc': 'Spend your coins on amazing boosts, cosmetics, and utilities!', 'shop.boosts': '⚡ Boosts', 'shop.cosmetics': '🎨 Cosmetics', 'shop.utilities': '🔧 Utilities', 'shop.popular': 'Popular',
    'subscription.desc': 'Unlock premium features with a subscription!', 'subscription.current': 'Current Plan', 'subscription.purchase': 'Purchase', 'subscription.dailyBonus': 'Daily Bonus', 'subscription.claimBonus': 'Claim Bonus', 'subscription.expired': 'Expired', 'subscription.daysLeft': 'days left',
    'gamePass.desc': 'Unlock special game powers and bonuses!', 'gamePass.active': 'Active',
    'premiumGames.desc': 'Exclusive games with amazing rewards!',
    'giftVoucher.desc': 'Scratch your gift vouchers to reveal rewards!', 'giftVoucher.scratch': 'Scratch to Reveal!', 'giftVoucher.noVouchers': 'No vouchers available. Complete courses to earn them!',
    'manuscripts.desc': 'Explore the greatest achievements in space exploration history!',
    'qna.askAnything': 'Ask anything about space...', 'qna.searching': 'Searching...', 'qna.ask': 'Ask', 'qna.suggested': 'Suggested Questions',
    'account.createAccount': 'Create Account', 'account.guest': 'Guest Explorer', 'account.profile': 'Your Profile',
  },

  es: {
    'nav.home': 'Inicio', 'nav.solarSystem': 'Sistema Solar', 'nav.timeline': 'Cronología', 'nav.constellations': 'Constelaciones', 'nav.library': 'Biblioteca', 'nav.games': 'Juegos', 'nav.subscriptions': 'Suscripciones', 'nav.funFacts': 'Datos Curiosos', 'nav.about': 'Acerca de', 'nav.startJourney': 'Comienza tu Viaje', 'nav.cosmicClassroom': 'Aula Cósmica',
    'hero.badge': 'Para jóvenes exploradores de 7 a 13 años', 'hero.welcome': 'Bienvenido a', 'hero.cosmicClassroom': 'Aula Cósmica', 'hero.subtitle': '¡Explora cada rincón del Universo! 🚀 Aprende sobre planetas, estrellas, nebulosas, galaxias y mucho más!', 'hero.startJourney': 'Comienza tu Viaje Espacial', 'hero.takeQuiz': 'Haz un Quiz',
    'hero.solarSystem': 'Sistema Solar', 'hero.solarSystemDesc': 'Explora planetas, lunas, asteroides y cometas', 'hero.starsNebulas': 'Estrellas y Nebulosas', 'hero.starsNebulasDesc': 'Descubre tipos de estrellas, supernovas y nubes brillantes', 'hero.galaxiesBeyond': 'Galaxias y Más Allá', 'hero.galaxiesBeyondDesc': 'Viaja por galaxias, agujeros negros y exoplanetas',
    'section.dailyFact': 'Dato Espacial del Día', 'section.spaceQnA': 'Preguntas y Respuestas Espaciales', 'section.spaceQnADesc': '¡Pregunta cualquier cosa sobre el espacio!', 'section.celestialExplorer': 'Explorador Celestial', 'section.spaceTimeline': 'Cronología Espacial', 'section.constellations': 'Constelaciones',
    'section.courses': 'Cursos Espaciales', 'section.coursesDesc': '¡Completa cursos con videos, libros y audiolibros. Obtén certificados!', 'section.giftVouchers': 'Vales de Regalo', 'section.manuscripts': 'Manuscritos Espaciales',
    'section.library': '📚 Biblioteca Celestial', 'section.libraryDesc': '¡Mira videos, explora libros espaciales y escucha audiolibros!', 'section.games': '🎮 Juegos y Quizzes', 'section.gamesDesc': '¡Pon a prueba tus conocimientos espaciales con juegos interactivos!',
    'section.premiumGames': 'Juegos Premium', 'section.gamePass': 'Pase de Juegos', 'section.shop': 'Tienda Espacial', 'section.trophyCabinet': 'Vitrina de Trofeos', 'section.trophyCabinetDesc': '¡Tu colección de logros y certificados!',
    'section.subscriptions': 'Suscripciones', 'section.funFacts': 'Datos Curiosos', 'section.about': '✨ Sobre Aula Cósmica', 'section.aboutMission': 'Nuestra Misión',
    'section.aboutMissionDesc': '¡Aula Cósmica está diseñada para despertar la curiosidad sobre el universo en las mentes jóvenes!', 'section.aboutMissionDesc2': 'Desde planetas hasta galaxias distantes - ¡hay tanto por explorar!',
    'common.learn': 'Aprender', 'common.play': 'Jugar', 'common.explore': 'Explorar', 'common.learnDesc': 'Descubre datos divertidos sobre cada cuerpo celeste.', 'common.playDesc': '¡Pon a prueba tus conocimientos con quizzes divertidos!', 'common.exploreDesc': 'Mira videos y lee libros para jóvenes exploradores.',
    'common.videos': 'Videos', 'common.books': 'Libros', 'common.audiobooks': 'Audiolibros', 'common.all': 'Todo', 'common.close': 'Cerrar', 'common.back': 'Atrás', 'common.next': 'Siguiente', 'common.previous': 'Anterior', 'common.readNow': 'Leer Ahora', 'common.watchNow': 'Ver Ahora', 'common.listenNow': 'Escuchar Ahora',
    'common.noAchievements': 'Sin Logros Aún', 'common.noAchievementsDesc': '¡Completa cursos y juegos para ganar logros!', 'common.totalAchievements': 'Logros Totales', 'common.earnedOn': 'Obtenido el', 'common.locked': 'Bloqueado',
    'common.coins': 'Monedas', 'common.new': 'NUEVO', 'common.buy': 'Comprar', 'common.purchased': 'Comprado',
    'footer.tagline': '¡Haciendo la exploración espacial divertida! 🚀', 'footer.explore': 'Explorar', 'footer.learnPlay': 'Aprender y Jugar', 'footer.resources': 'Recursos', 'footer.universeExplorer': 'Explorador del Universo', 'footer.celestialLibrary': 'Biblioteca Celestial', 'footer.quizzes': 'Quizzes', 'footer.forParents': 'Para Padres y Maestros', 'footer.contact': 'Contacto', 'footer.privacy': 'Política de Privacidad', 'footer.madeWith': 'Hecho con', 'footer.copyright': '© 2024 Aula Cósmica. ¡Sigue explorando! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Comparar Tamaños', 'games.rocketShooter': 'Disparador de Cohetes', 'games.memoryMatch': 'Memoria', 'games.wordScramble': 'Palabras Revueltas', 'games.rocketMath': 'Matemáticas Cohete',
    'library.videos': 'Videos', 'library.books': 'Libros', 'library.audiobooks': 'Audiolibros',
    'courses.spaceCourses': 'Cursos Espaciales', 'courses.backToCourses': '← Volver a Cursos', 'courses.claimCertificate': 'Reclamar Certificado', 'courses.takeQuiz': 'Hacer Quiz', 'courses.restartCourse': 'Reiniciar Curso', 'courses.progress': 'Progreso', 'courses.learningGoals': 'Objetivos de Aprendizaje', 'courses.coursePlan': 'Plan del Curso', 'courses.plan': 'Plan',
    'about.planetsMoons': 'Planetas y Lunas', 'about.starsNebulas': 'Estrellas y Nebulosas', 'about.galaxies': 'Galaxias', 'about.booksVideos': 'Libros y Videos',
    'language.select': 'Idioma', 'tts.readAloud': 'Leer en Voz Alta', 'tts.stopReading': 'Parar Lectura', 'tts.readPage': 'Leer contenido de la página',
    'explorer.title': '🔭 Explorador del Universo', 'explorer.desc': '¡Haz clic en cualquier cuerpo celeste para ver imágenes y aprender!', 'explorer.anyDistance': '📍 Cualquier Distancia', 'explorer.near': '🏠 Cerca', 'explorer.far': '🚀 Lejos', 'explorer.noResults': 'No se encontraron cuerpos celestes con estos filtros.', 'explorer.adjustFilters': '¡Intenta ajustar tus filtros!',
    'timeline.title': 'Viaje a Través del Tiempo', 'timeline.desc': '¡Viaja desde el Big Bang hasta hoy! Explora los momentos más increíbles de la historia cósmica.', 'timeline.allEvents': '🌟 Todos los Eventos',
    'constellation.title': '✨ Visor de Constelaciones ✨', 'constellation.desc': '¡Haz clic en cualquier constelación para descubrir su historia antigua!', 'constellation.starMap': 'Mapa Estelar Interactivo', 'constellation.selectToView': 'Selecciona una constelación para ver su patrón estelar',
    'dailyFact.subtitle': '¡Algo nuevo para aprender cada día!', 'dailyFact.newFact': 'Nuevo Dato', 'dailyFact.share': 'Compartir', 'dailyFact.comeBack': '¡Vuelve mañana para un nuevo dato!',
    'funFacts.desc': '¡Toca las tarjetas para revelar datos increíbles del universo!', 'funFacts.tapCards': '¡Toca para revelar!', 'funFacts.randomFact': '¡Dato Aleatorio!',
    'shop.desc': '¡Gasta tus monedas en mejoras, cosméticos y utilidades!', 'shop.boosts': '⚡ Mejoras', 'shop.cosmetics': '🎨 Cosméticos', 'shop.utilities': '🔧 Utilidades', 'shop.popular': 'Popular',
    'subscription.desc': '¡Desbloquea funciones premium con una suscripción!', 'subscription.current': 'Plan Actual', 'subscription.purchase': 'Comprar', 'subscription.dailyBonus': 'Bonus Diario', 'subscription.claimBonus': 'Reclamar Bonus', 'subscription.expired': 'Expirado', 'subscription.daysLeft': 'días restantes',
    'gamePass.desc': '¡Desbloquea poderes especiales de juego!', 'gamePass.active': 'Activo',
    'premiumGames.desc': '¡Juegos exclusivos con recompensas increíbles!',
    'giftVoucher.desc': '¡Rasca tus vales de regalo para revelar premios!', 'giftVoucher.scratch': '¡Rasca para Revelar!', 'giftVoucher.noVouchers': '¡No hay vales. Completa cursos para ganarlos!',
    'manuscripts.desc': '¡Explora los mayores logros en la historia de la exploración espacial!',
    'qna.askAnything': 'Pregunta cualquier cosa sobre el espacio...', 'qna.searching': 'Buscando...', 'qna.ask': 'Preguntar', 'qna.suggested': 'Preguntas Sugeridas',
    'account.createAccount': 'Crear Cuenta', 'account.guest': 'Explorador Invitado', 'account.profile': 'Tu Perfil',
  },

  fr: {
    'nav.home': 'Accueil', 'nav.solarSystem': 'Système Solaire', 'nav.timeline': 'Chronologie', 'nav.constellations': 'Constellations', 'nav.library': 'Bibliothèque', 'nav.games': 'Jeux', 'nav.subscriptions': 'Abonnements', 'nav.funFacts': 'Faits Amusants', 'nav.about': 'À Propos', 'nav.startJourney': 'Commencez Votre Voyage', 'nav.cosmicClassroom': 'Classe Cosmique',
    'hero.badge': 'Pour les jeunes explorateurs de 7 à 13 ans', 'hero.welcome': 'Bienvenue à', 'hero.cosmicClassroom': 'Classe Cosmique', 'hero.subtitle': 'Explorez chaque recoin de l\'Univers! 🚀', 'hero.startJourney': 'Commencez Votre Voyage Spatial', 'hero.takeQuiz': 'Faire un Quiz',
    'hero.solarSystem': 'Système Solaire', 'hero.solarSystemDesc': 'Explorez planètes, lunes, astéroïdes et comètes', 'hero.starsNebulas': 'Étoiles et Nébuleuses', 'hero.starsNebulasDesc': 'Découvrez les types d\'étoiles et supernovas', 'hero.galaxiesBeyond': 'Galaxies et Au-delà', 'hero.galaxiesBeyondDesc': 'Voyagez à travers galaxies et trous noirs',
    'section.dailyFact': 'Fait Spatial du Jour', 'section.spaceQnA': 'Questions et Réponses', 'section.spaceQnADesc': 'Posez n\'importe quelle question sur l\'espace!', 'section.celestialExplorer': 'Explorateur Céleste', 'section.spaceTimeline': 'Chronologie Spatiale', 'section.constellations': 'Constellations',
    'section.courses': 'Cours Spatiaux', 'section.coursesDesc': 'Complétez des cours avec vidéos, livres et livres audio!', 'section.giftVouchers': 'Bons Cadeaux', 'section.manuscripts': 'Manuscrits Spatiaux',
    'section.library': '📚 Bibliothèque Céleste', 'section.libraryDesc': 'Regardez des vidéos, explorez des livres et écoutez des livres audio!', 'section.games': '🎮 Jeux et Quiz', 'section.gamesDesc': 'Testez vos connaissances spatiales avec des jeux interactifs!',
    'section.premiumGames': 'Jeux Premium', 'section.gamePass': 'Pass de Jeux', 'section.shop': 'Boutique Spatiale', 'section.trophyCabinet': 'Vitrine des Trophées', 'section.trophyCabinetDesc': 'Votre collection de réalisations et certificats!',
    'section.subscriptions': 'Abonnements', 'section.funFacts': 'Faits Amusants', 'section.about': '✨ À Propos de Classe Cosmique', 'section.aboutMission': 'Notre Mission',
    'section.aboutMissionDesc': 'Classe Cosmique éveille la curiosité sur l\'univers chez les jeunes esprits!', 'section.aboutMissionDesc2': 'Des planètes aux galaxies lointaines — il y a tant à explorer!',
    'common.learn': 'Apprendre', 'common.play': 'Jouer', 'common.explore': 'Explorer', 'common.learnDesc': 'Découvrez des faits sur chaque corps céleste.', 'common.playDesc': 'Testez vos connaissances avec des quiz amusants!', 'common.exploreDesc': 'Regardez des vidéos et lisez des livres pour explorateurs.',
    'common.videos': 'Vidéos', 'common.books': 'Livres', 'common.audiobooks': 'Livres Audio', 'common.all': 'Tout', 'common.close': 'Fermer', 'common.back': 'Retour', 'common.next': 'Suivant', 'common.previous': 'Précédent', 'common.readNow': 'Lire Maintenant', 'common.watchNow': 'Regarder Maintenant', 'common.listenNow': 'Écouter Maintenant',
    'common.noAchievements': 'Pas de Réalisations', 'common.noAchievementsDesc': 'Complétez des cours et jeux pour gagner des réalisations!', 'common.totalAchievements': 'Réalisations Totales', 'common.earnedOn': 'Obtenu le', 'common.locked': 'Verrouillé',
    'common.coins': 'Pièces', 'common.new': 'NOUVEAU', 'common.buy': 'Acheter', 'common.purchased': 'Acheté',
    'footer.tagline': 'Rendre l\'exploration spatiale amusante! 🚀', 'footer.explore': 'Explorer', 'footer.learnPlay': 'Apprendre et Jouer', 'footer.resources': 'Ressources', 'footer.universeExplorer': 'Explorateur de l\'Univers', 'footer.celestialLibrary': 'Bibliothèque Céleste', 'footer.quizzes': 'Quiz', 'footer.forParents': 'Pour Parents et Enseignants', 'footer.contact': 'Contact', 'footer.privacy': 'Politique de Confidentialité', 'footer.madeWith': 'Fait avec', 'footer.copyright': '© 2024 Classe Cosmique. Explorez les étoiles! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Comparer Tailles', 'games.rocketShooter': 'Tireur de Fusée', 'games.memoryMatch': 'Mémoire', 'games.wordScramble': 'Mots Mélangés', 'games.rocketMath': 'Maths Fusée',
    'library.videos': 'Vidéos', 'library.books': 'Livres', 'library.audiobooks': 'Livres Audio',
    'courses.spaceCourses': 'Cours Spatiaux', 'courses.backToCourses': '← Retour aux Cours', 'courses.claimCertificate': 'Réclamer Certificat', 'courses.takeQuiz': 'Faire le Quiz', 'courses.restartCourse': 'Recommencer', 'courses.progress': 'Progrès', 'courses.learningGoals': 'Objectifs', 'courses.coursePlan': 'Plan du Cours', 'courses.plan': 'Plan',
    'about.planetsMoons': 'Planètes et Lunes', 'about.starsNebulas': 'Étoiles et Nébuleuses', 'about.galaxies': 'Galaxies', 'about.booksVideos': 'Livres et Vidéos',
    'language.select': 'Langue', 'tts.readAloud': 'Lire à Haute Voix', 'tts.stopReading': 'Arrêter la Lecture', 'tts.readPage': 'Lire le contenu de la page',
    'explorer.title': '🔭 Explorateur de l\'Univers', 'explorer.desc': 'Cliquez sur un corps céleste pour en savoir plus!', 'explorer.anyDistance': '📍 Toute Distance', 'explorer.near': '🏠 Proche', 'explorer.far': '🚀 Loin', 'explorer.noResults': 'Aucun corps céleste trouvé.', 'explorer.adjustFilters': 'Ajustez vos filtres!',
    'timeline.title': 'Voyage à Travers le Temps', 'timeline.desc': 'Voyagez du Big Bang à aujourd\'hui! Explorez les moments les plus incroyables.', 'timeline.allEvents': '🌟 Tous les Événements',
    'constellation.title': '✨ Visionneuse de Constellations ✨', 'constellation.desc': 'Cliquez sur une constellation pour découvrir son histoire!', 'constellation.starMap': 'Carte Stellaire Interactive', 'constellation.selectToView': 'Sélectionnez une constellation',
    'dailyFact.subtitle': 'Quelque chose de nouveau chaque jour!', 'dailyFact.newFact': 'Nouveau Fait', 'dailyFact.share': 'Partager', 'dailyFact.comeBack': 'Revenez demain pour un nouveau fait!',
    'funFacts.desc': 'Touchez les cartes pour révéler des faits incroyables!', 'funFacts.tapCards': 'Touchez pour révéler!', 'funFacts.randomFact': 'Fait Aléatoire!',
    'shop.desc': 'Dépensez vos pièces en améliorations et cosmétiques!', 'shop.boosts': '⚡ Améliorations', 'shop.cosmetics': '🎨 Cosmétiques', 'shop.utilities': '🔧 Utilitaires', 'shop.popular': 'Populaire',
    'subscription.desc': 'Débloquez des fonctionnalités premium!', 'subscription.current': 'Plan Actuel', 'subscription.purchase': 'Acheter', 'subscription.dailyBonus': 'Bonus Quotidien', 'subscription.claimBonus': 'Réclamer Bonus', 'subscription.expired': 'Expiré', 'subscription.daysLeft': 'jours restants',
    'gamePass.desc': 'Débloquez des pouvoirs de jeu spéciaux!', 'gamePass.active': 'Actif',
    'premiumGames.desc': 'Jeux exclusifs avec des récompenses incroyables!',
    'giftVoucher.desc': 'Grattez vos bons cadeaux pour révéler des récompenses!', 'giftVoucher.scratch': 'Grattez pour Révéler!', 'giftVoucher.noVouchers': 'Pas de bons. Complétez des cours!',
    'manuscripts.desc': 'Explorez les plus grands exploits de l\'exploration spatiale!',
    'qna.askAnything': 'Posez une question sur l\'espace...', 'qna.searching': 'Recherche...', 'qna.ask': 'Demander', 'qna.suggested': 'Questions Suggérées',
    'account.createAccount': 'Créer un Compte', 'account.guest': 'Explorateur Invité', 'account.profile': 'Votre Profil',
  },

  de: {
    'nav.home': 'Startseite', 'nav.solarSystem': 'Sonnensystem', 'nav.timeline': 'Zeitleiste', 'nav.constellations': 'Sternbilder', 'nav.library': 'Bibliothek', 'nav.games': 'Spiele', 'nav.subscriptions': 'Abonnements', 'nav.funFacts': 'Wissenswertes', 'nav.about': 'Über uns', 'nav.startJourney': 'Starte deine Reise', 'nav.cosmicClassroom': 'Kosmisches Klassenzimmer',
    'hero.badge': 'Für junge Entdecker von 7-13 Jahren', 'hero.welcome': 'Willkommen bei', 'hero.cosmicClassroom': 'Kosmisches Klassenzimmer', 'hero.subtitle': 'Erkunde jede Ecke des Universums! 🚀', 'hero.startJourney': 'Starte deine Weltraumreise', 'hero.takeQuiz': 'Quiz machen',
    'hero.solarSystem': 'Sonnensystem', 'hero.solarSystemDesc': 'Erkunde Planeten, Monde, Asteroiden und Kometen', 'hero.starsNebulas': 'Sterne und Nebel', 'hero.starsNebulasDesc': 'Entdecke Sterntypen, Supernovae und leuchtende Wolken', 'hero.galaxiesBeyond': 'Galaxien und Darüber Hinaus', 'hero.galaxiesBeyondDesc': 'Reise durch Galaxien, Schwarze Löcher und Exoplaneten',
    'section.dailyFact': 'Täglicher Weltraumfakt', 'section.spaceQnA': 'Weltraum-Fragen', 'section.spaceQnADesc': 'Frag alles über den Weltraum!', 'section.celestialExplorer': 'Himmelserkunder', 'section.spaceTimeline': 'Weltraum-Zeitleiste', 'section.constellations': 'Sternbilder',
    'section.courses': 'Weltraumkurse', 'section.coursesDesc': 'Schließe Kurse mit Videos, Büchern und Hörbüchern ab!', 'section.giftVouchers': 'Geschenkgutscheine', 'section.manuscripts': 'Weltraum-Manuskripte',
    'section.library': '📚 Himmlische Bibliothek', 'section.libraryDesc': 'Schau Videos, lies Bücher und höre Hörbücher!', 'section.games': '🎮 Spiele und Quiz', 'section.gamesDesc': 'Teste dein Weltraumwissen mit interaktiven Spielen!',
    'section.premiumGames': 'Premium-Spiele', 'section.gamePass': 'Spielepass', 'section.shop': 'Weltraum-Shop', 'section.trophyCabinet': 'Trophäenschrank', 'section.trophyCabinetDesc': 'Deine Sammlung von Erfolgen und Zertifikaten!',
    'section.subscriptions': 'Abonnements', 'section.funFacts': 'Wissenswertes', 'section.about': '✨ Über Kosmisches Klassenzimmer', 'section.aboutMission': 'Unsere Mission',
    'section.aboutMissionDesc': 'Kosmisches Klassenzimmer weckt die Neugier am Universum bei jungen Köpfen!', 'section.aboutMissionDesc2': 'Von Planeten bis zu fernen Galaxien — es gibt so viel zu entdecken!',
    'common.learn': 'Lernen', 'common.play': 'Spielen', 'common.explore': 'Erkunden', 'common.learnDesc': 'Entdecke Fakten über jeden Himmelskörper.', 'common.playDesc': 'Teste dein Wissen mit lustigen Quiz!', 'common.exploreDesc': 'Schau Videos und lies Bücher für junge Entdecker.',
    'common.videos': 'Videos', 'common.books': 'Bücher', 'common.audiobooks': 'Hörbücher', 'common.all': 'Alle', 'common.close': 'Schließen', 'common.back': 'Zurück', 'common.next': 'Weiter', 'common.previous': 'Zurück', 'common.readNow': 'Jetzt Lesen', 'common.watchNow': 'Jetzt Ansehen', 'common.listenNow': 'Jetzt Anhören',
    'common.noAchievements': 'Noch keine Erfolge', 'common.noAchievementsDesc': 'Schließe Kurse und Spiele ab!', 'common.totalAchievements': 'Gesamte Erfolge', 'common.earnedOn': 'Erhalten am', 'common.locked': 'Gesperrt',
    'common.coins': 'Münzen', 'common.new': 'NEU', 'common.buy': 'Kaufen', 'common.purchased': 'Gekauft',
    'footer.tagline': 'Weltraumforschung macht Spaß! 🚀', 'footer.explore': 'Erkunden', 'footer.learnPlay': 'Lernen und Spielen', 'footer.resources': 'Ressourcen', 'footer.universeExplorer': 'Universumserkunder', 'footer.celestialLibrary': 'Himmlische Bibliothek', 'footer.quizzes': 'Quiz', 'footer.forParents': 'Für Eltern und Lehrer', 'footer.contact': 'Kontakt', 'footer.privacy': 'Datenschutz', 'footer.madeWith': 'Gemacht mit', 'footer.copyright': '© 2024 Kosmisches Klassenzimmer. Weiter die Sterne erkunden! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Größenvergleich', 'games.rocketShooter': 'Raketenschütze', 'games.memoryMatch': 'Memory', 'games.wordScramble': 'Worträtsel', 'games.rocketMath': 'Raketen-Mathe',
    'library.videos': 'Videos', 'library.books': 'Bücher', 'library.audiobooks': 'Hörbücher',
    'courses.spaceCourses': 'Weltraumkurse', 'courses.backToCourses': '← Zurück zu Kursen', 'courses.claimCertificate': 'Zertifikat Anfordern', 'courses.takeQuiz': 'Quiz Machen', 'courses.restartCourse': 'Kurs Neustarten', 'courses.progress': 'Fortschritt', 'courses.learningGoals': 'Lernziele', 'courses.coursePlan': 'Kursplan', 'courses.plan': 'Plan',
    'about.planetsMoons': 'Planeten und Monde', 'about.starsNebulas': 'Sterne und Nebel', 'about.galaxies': 'Galaxien', 'about.booksVideos': 'Bücher und Videos',
    'language.select': 'Sprache', 'tts.readAloud': 'Vorlesen', 'tts.stopReading': 'Stopp', 'tts.readPage': 'Seiteninhalt vorlesen',
    'explorer.title': '🔭 Universumserkunder', 'explorer.desc': 'Klicke auf einen Himmelskörper um mehr zu erfahren!', 'explorer.anyDistance': '📍 Jede Entfernung', 'explorer.near': '🏠 Nah', 'explorer.far': '🚀 Weit', 'explorer.noResults': 'Keine Himmelskörper gefunden.', 'explorer.adjustFilters': 'Versuche die Filter anzupassen!',
    'timeline.title': 'Reise Durch die Zeit', 'timeline.desc': 'Reise vom Urknall bis heute! Erkunde die erstaunlichsten kosmischen Momente.', 'timeline.allEvents': '🌟 Alle Ereignisse',
    'constellation.title': '✨ Sternbild-Betrachter ✨', 'constellation.desc': 'Klicke auf ein Sternbild um seine Geschichte zu entdecken!', 'constellation.starMap': 'Interaktive Sternenkarte', 'constellation.selectToView': 'Wähle ein Sternbild',
    'dailyFact.subtitle': 'Jeden Tag etwas Neues lernen!', 'dailyFact.newFact': 'Neuer Fakt', 'dailyFact.share': 'Teilen', 'dailyFact.comeBack': 'Komm morgen für einen neuen Fakt!',
    'funFacts.desc': 'Tippe auf die Karten um erstaunliche Fakten zu enthüllen!', 'funFacts.tapCards': 'Zum Enthüllen tippen!', 'funFacts.randomFact': 'Zufälliger Fakt!',
    'shop.desc': 'Gib deine Münzen für Boosts, Kosmetik und Werkzeuge aus!', 'shop.boosts': '⚡ Boosts', 'shop.cosmetics': '🎨 Kosmetik', 'shop.utilities': '🔧 Werkzeuge', 'shop.popular': 'Beliebt',
    'subscription.desc': 'Schalte Premium-Funktionen frei!', 'subscription.current': 'Aktueller Plan', 'subscription.purchase': 'Kaufen', 'subscription.dailyBonus': 'Täglicher Bonus', 'subscription.claimBonus': 'Bonus Abholen', 'subscription.expired': 'Abgelaufen', 'subscription.daysLeft': 'Tage übrig',
    'gamePass.desc': 'Schalte spezielle Spielkräfte frei!', 'gamePass.active': 'Aktiv',
    'premiumGames.desc': 'Exklusive Spiele mit tollen Belohnungen!',
    'giftVoucher.desc': 'Rubbele deine Geschenkgutscheine für Belohnungen!', 'giftVoucher.scratch': 'Zum Aufrubbeln!', 'giftVoucher.noVouchers': 'Keine Gutscheine. Schließe Kurse ab!',
    'manuscripts.desc': 'Erkunde die größten Errungenschaften der Raumfahrt!',
    'qna.askAnything': 'Frage alles über den Weltraum...', 'qna.searching': 'Suche...', 'qna.ask': 'Fragen', 'qna.suggested': 'Vorgeschlagene Fragen',
    'account.createAccount': 'Konto Erstellen', 'account.guest': 'Gast-Entdecker', 'account.profile': 'Dein Profil',
  },

  it: {
    'nav.home': 'Home', 'nav.solarSystem': 'Sistema Solare', 'nav.timeline': 'Cronologia', 'nav.constellations': 'Costellazioni', 'nav.library': 'Biblioteca', 'nav.games': 'Giochi', 'nav.subscriptions': 'Abbonamenti', 'nav.funFacts': 'Curiosità', 'nav.about': 'Info', 'nav.startJourney': 'Inizia il Viaggio', 'nav.cosmicClassroom': 'Classe Cosmica',
    'hero.badge': 'Per giovani esploratori da 7 a 13 anni', 'hero.welcome': 'Benvenuto nella', 'hero.cosmicClassroom': 'Classe Cosmica', 'hero.subtitle': 'Esplora ogni angolo dell\'Universo! 🚀', 'hero.startJourney': 'Inizia il Viaggio Spaziale', 'hero.takeQuiz': 'Fai un Quiz',
    'hero.solarSystem': 'Sistema Solare', 'hero.solarSystemDesc': 'Esplora pianeti, lune, asteroidi e comete', 'hero.starsNebulas': 'Stelle e Nebulose', 'hero.starsNebulasDesc': 'Scopri tipi di stelle e supernove', 'hero.galaxiesBeyond': 'Galassie e Oltre', 'hero.galaxiesBeyondDesc': 'Viaggia attraverso galassie e buchi neri',
    'section.dailyFact': 'Fatto Spaziale del Giorno', 'section.spaceQnA': 'Domande e Risposte', 'section.spaceQnADesc': 'Chiedi qualsiasi cosa sullo spazio!', 'section.celestialExplorer': 'Esploratore Celeste', 'section.spaceTimeline': 'Cronologia Spaziale', 'section.constellations': 'Costellazioni',
    'section.courses': 'Corsi Spaziali', 'section.coursesDesc': 'Completa corsi con video, libri e audiolibri!', 'section.giftVouchers': 'Buoni Regalo', 'section.manuscripts': 'Manoscritti Spaziali',
    'section.library': '📚 Biblioteca Celeste', 'section.libraryDesc': 'Guarda video, esplora libri e ascolta audiolibri!', 'section.games': '🎮 Giochi e Quiz', 'section.gamesDesc': 'Metti alla prova le tue conoscenze con giochi interattivi!',
    'section.premiumGames': 'Giochi Premium', 'section.gamePass': 'Pass Giochi', 'section.shop': 'Negozio Spaziale', 'section.trophyCabinet': 'Vetrina Trofei', 'section.trophyCabinetDesc': 'La tua collezione di risultati e certificati!',
    'section.subscriptions': 'Abbonamenti', 'section.funFacts': 'Curiosità', 'section.about': '✨ Info su Classe Cosmica', 'section.aboutMission': 'La Nostra Missione',
    'section.aboutMissionDesc': 'Classe Cosmica stimola la curiosità sull\'universo!', 'section.aboutMissionDesc2': 'Dai pianeti alle galassie lontane — c\'è tanto da esplorare!',
    'common.learn': 'Imparare', 'common.play': 'Giocare', 'common.explore': 'Esplorare', 'common.learnDesc': 'Scopri fatti su ogni corpo celeste.', 'common.playDesc': 'Metti alla prova le tue conoscenze con quiz divertenti!', 'common.exploreDesc': 'Guarda video e leggi libri per giovani esploratori.',
    'common.videos': 'Video', 'common.books': 'Libri', 'common.audiobooks': 'Audiolibri', 'common.all': 'Tutto', 'common.close': 'Chiudi', 'common.back': 'Indietro', 'common.next': 'Avanti', 'common.previous': 'Precedente', 'common.readNow': 'Leggi Ora', 'common.watchNow': 'Guarda Ora', 'common.listenNow': 'Ascolta Ora',
    'common.noAchievements': 'Nessun Risultato', 'common.noAchievementsDesc': 'Completa corsi e giochi per guadagnare risultati!', 'common.totalAchievements': 'Risultati Totali', 'common.earnedOn': 'Ottenuto il', 'common.locked': 'Bloccato',
    'common.coins': 'Monete', 'common.new': 'NUOVO', 'common.buy': 'Acquista', 'common.purchased': 'Acquistato',
    'footer.tagline': 'Rendere l\'esplorazione spaziale divertente! 🚀', 'footer.explore': 'Esplora', 'footer.learnPlay': 'Impara e Gioca', 'footer.resources': 'Risorse', 'footer.universeExplorer': 'Esploratore dell\'Universo', 'footer.celestialLibrary': 'Biblioteca Celeste', 'footer.quizzes': 'Quiz', 'footer.forParents': 'Per Genitori e Insegnanti', 'footer.contact': 'Contatto', 'footer.privacy': 'Privacy', 'footer.madeWith': 'Fatto con', 'footer.copyright': '© 2024 Classe Cosmica. Continua a esplorare le stelle! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Confronta Dimensioni', 'games.rocketShooter': 'Sparatutto Razzo', 'games.memoryMatch': 'Memoria', 'games.wordScramble': 'Parole Mescolate', 'games.rocketMath': 'Matematica Razzo',
    'library.videos': 'Video', 'library.books': 'Libri', 'library.audiobooks': 'Audiolibri',
    'courses.spaceCourses': 'Corsi Spaziali', 'courses.backToCourses': '← Torna ai Corsi', 'courses.claimCertificate': 'Richiedi Certificato', 'courses.takeQuiz': 'Fai il Quiz', 'courses.restartCourse': 'Ricomincia', 'courses.progress': 'Progresso', 'courses.learningGoals': 'Obiettivi', 'courses.coursePlan': 'Piano del Corso', 'courses.plan': 'Piano',
    'about.planetsMoons': 'Pianeti e Lune', 'about.starsNebulas': 'Stelle e Nebulose', 'about.galaxies': 'Galassie', 'about.booksVideos': 'Libri e Video',
    'language.select': 'Lingua', 'tts.readAloud': 'Leggi ad Alta Voce', 'tts.stopReading': 'Ferma Lettura', 'tts.readPage': 'Leggi il contenuto della pagina',
    'explorer.title': '🔭 Esploratore dell\'Universo', 'explorer.desc': 'Clicca su un corpo celeste per saperne di più!', 'explorer.anyDistance': '📍 Qualsiasi Distanza', 'explorer.near': '🏠 Vicino', 'explorer.far': '🚀 Lontano', 'explorer.noResults': 'Nessun corpo celeste trovato.', 'explorer.adjustFilters': 'Prova a regolare i filtri!',
    'timeline.title': 'Viaggio nel Tempo', 'timeline.desc': 'Viaggia dal Big Bang a oggi! Esplora i momenti più incredibili.', 'timeline.allEvents': '🌟 Tutti gli Eventi',
    'constellation.title': '✨ Visore Costellazioni ✨', 'constellation.desc': 'Clicca su una costellazione per scoprirne la storia!', 'constellation.starMap': 'Mappa Stellare Interattiva', 'constellation.selectToView': 'Seleziona una costellazione',
    'dailyFact.subtitle': 'Qualcosa di nuovo ogni giorno!', 'dailyFact.newFact': 'Nuovo Fatto', 'dailyFact.share': 'Condividi', 'dailyFact.comeBack': 'Torna domani per un nuovo fatto!',
    'funFacts.desc': 'Tocca le carte per rivelare fatti incredibili!', 'funFacts.tapCards': 'Tocca per rivelare!', 'funFacts.randomFact': 'Fatto Casuale!',
    'shop.desc': 'Spendi le monete in potenziamenti, cosmetici e utilità!', 'shop.boosts': '⚡ Potenziamenti', 'shop.cosmetics': '🎨 Cosmetici', 'shop.utilities': '🔧 Utilità', 'shop.popular': 'Popolare',
    'subscription.desc': 'Sblocca funzionalità premium!', 'subscription.current': 'Piano Attuale', 'subscription.purchase': 'Acquista', 'subscription.dailyBonus': 'Bonus Giornaliero', 'subscription.claimBonus': 'Riscuoti Bonus', 'subscription.expired': 'Scaduto', 'subscription.daysLeft': 'giorni rimanenti',
    'gamePass.desc': 'Sblocca poteri di gioco speciali!', 'gamePass.active': 'Attivo',
    'premiumGames.desc': 'Giochi esclusivi con ricompense incredibili!',
    'giftVoucher.desc': 'Gratta i buoni regalo per rivelare premi!', 'giftVoucher.scratch': 'Gratta per Rivelare!', 'giftVoucher.noVouchers': 'Nessun buono. Completa i corsi!',
    'manuscripts.desc': 'Esplora le più grandi conquiste dell\'esplorazione spaziale!',
    'qna.askAnything': 'Chiedi qualsiasi cosa sullo spazio...', 'qna.searching': 'Ricerca...', 'qna.ask': 'Chiedi', 'qna.suggested': 'Domande Suggerite',
    'account.createAccount': 'Crea Account', 'account.guest': 'Esploratore Ospite', 'account.profile': 'Il Tuo Profilo',
  },

  pt: {
    'nav.home': 'Início', 'nav.solarSystem': 'Sistema Solar', 'nav.timeline': 'Cronologia', 'nav.constellations': 'Constelações', 'nav.library': 'Biblioteca', 'nav.games': 'Jogos', 'nav.subscriptions': 'Assinaturas', 'nav.funFacts': 'Curiosidades', 'nav.about': 'Sobre', 'nav.startJourney': 'Comece sua Jornada', 'nav.cosmicClassroom': 'Sala Cósmica',
    'hero.badge': 'Para jovens exploradores de 7 a 13 anos', 'hero.welcome': 'Bem-vindo à', 'hero.cosmicClassroom': 'Sala Cósmica', 'hero.subtitle': 'Explore cada canto do Universo! 🚀', 'hero.startJourney': 'Comece sua Jornada Espacial', 'hero.takeQuiz': 'Faça um Quiz',
    'hero.solarSystem': 'Sistema Solar', 'hero.solarSystemDesc': 'Explore planetas, luas, asteroides e cometas', 'hero.starsNebulas': 'Estrelas e Nebulosas', 'hero.starsNebulasDesc': 'Descubra tipos de estrelas e supernovas', 'hero.galaxiesBeyond': 'Galáxias e Além', 'hero.galaxiesBeyondDesc': 'Viaje por galáxias e buracos negros',
    'section.dailyFact': 'Fato Espacial do Dia', 'section.spaceQnA': 'Perguntas e Respostas', 'section.spaceQnADesc': 'Pergunte qualquer coisa sobre o espaço!', 'section.celestialExplorer': 'Explorador Celestial', 'section.spaceTimeline': 'Cronologia Espacial', 'section.constellations': 'Constelações',
    'section.courses': 'Cursos Espaciais', 'section.coursesDesc': 'Complete cursos com vídeos, livros e audiolivros!', 'section.giftVouchers': 'Vales Presente', 'section.manuscripts': 'Manuscritos Espaciais',
    'section.library': '📚 Biblioteca Celestial', 'section.libraryDesc': 'Assista vídeos, explore livros e ouça audiolivros!', 'section.games': '🎮 Jogos e Quiz', 'section.gamesDesc': 'Teste seus conhecimentos com jogos interativos!',
    'section.premiumGames': 'Jogos Premium', 'section.gamePass': 'Passe de Jogos', 'section.shop': 'Loja Espacial', 'section.trophyCabinet': 'Vitrine de Troféus', 'section.trophyCabinetDesc': 'Sua coleção de conquistas e certificados!',
    'section.subscriptions': 'Assinaturas', 'section.funFacts': 'Curiosidades', 'section.about': '✨ Sobre Sala Cósmica', 'section.aboutMission': 'Nossa Missão',
    'section.aboutMissionDesc': 'Sala Cósmica desperta a curiosidade sobre o universo!', 'section.aboutMissionDesc2': 'De planetas a galáxias distantes — há tanto para explorar!',
    'common.learn': 'Aprender', 'common.play': 'Jogar', 'common.explore': 'Explorar', 'common.learnDesc': 'Descubra fatos sobre cada corpo celeste.', 'common.playDesc': 'Teste seus conhecimentos com quiz divertidos!', 'common.exploreDesc': 'Assista vídeos e leia livros para jovens exploradores.',
    'common.videos': 'Vídeos', 'common.books': 'Livros', 'common.audiobooks': 'Audiolivros', 'common.all': 'Tudo', 'common.close': 'Fechar', 'common.back': 'Voltar', 'common.next': 'Próximo', 'common.previous': 'Anterior', 'common.readNow': 'Ler Agora', 'common.watchNow': 'Assistir Agora', 'common.listenNow': 'Ouvir Agora',
    'common.noAchievements': 'Sem Conquistas', 'common.noAchievementsDesc': 'Complete cursos e jogos para ganhar conquistas!', 'common.totalAchievements': 'Total de Conquistas', 'common.earnedOn': 'Conquistado em', 'common.locked': 'Bloqueado',
    'common.coins': 'Moedas', 'common.new': 'NOVO', 'common.buy': 'Comprar', 'common.purchased': 'Comprado',
    'footer.tagline': 'Tornando a exploração espacial divertida! 🚀', 'footer.explore': 'Explorar', 'footer.learnPlay': 'Aprender e Jogar', 'footer.resources': 'Recursos', 'footer.universeExplorer': 'Explorador do Universo', 'footer.celestialLibrary': 'Biblioteca Celestial', 'footer.quizzes': 'Quiz', 'footer.forParents': 'Para Pais e Professores', 'footer.contact': 'Contato', 'footer.privacy': 'Política de Privacidade', 'footer.madeWith': 'Feito com', 'footer.copyright': '© 2024 Sala Cósmica. Continue explorando! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Comparar Tamanhos', 'games.rocketShooter': 'Atirador de Foguetes', 'games.memoryMatch': 'Memória', 'games.wordScramble': 'Palavras Embaralhadas', 'games.rocketMath': 'Matemática Foguete',
    'library.videos': 'Vídeos', 'library.books': 'Livros', 'library.audiobooks': 'Audiolivros',
    'courses.spaceCourses': 'Cursos Espaciais', 'courses.backToCourses': '← Voltar aos Cursos', 'courses.claimCertificate': 'Reivindicar Certificado', 'courses.takeQuiz': 'Fazer Quiz', 'courses.restartCourse': 'Reiniciar Curso', 'courses.progress': 'Progresso', 'courses.learningGoals': 'Objetivos', 'courses.coursePlan': 'Plano do Curso', 'courses.plan': 'Plano',
    'about.planetsMoons': 'Planetas e Luas', 'about.starsNebulas': 'Estrelas e Nebulosas', 'about.galaxies': 'Galáxias', 'about.booksVideos': 'Livros e Vídeos',
    'language.select': 'Idioma', 'tts.readAloud': 'Ler em Voz Alta', 'tts.stopReading': 'Parar Leitura', 'tts.readPage': 'Ler conteúdo da página',
    'explorer.title': '🔭 Explorador do Universo', 'explorer.desc': 'Clique em um corpo celeste para saber mais!', 'explorer.anyDistance': '📍 Qualquer Distância', 'explorer.near': '🏠 Perto', 'explorer.far': '🚀 Longe', 'explorer.noResults': 'Nenhum corpo celeste encontrado.', 'explorer.adjustFilters': 'Tente ajustar os filtros!',
    'timeline.title': 'Viagem Através do Tempo', 'timeline.desc': 'Viaje do Big Bang até hoje! Explore os momentos mais incríveis.', 'timeline.allEvents': '🌟 Todos os Eventos',
    'constellation.title': '✨ Visualizador de Constelações ✨', 'constellation.desc': 'Clique em uma constelação para descobrir sua história!', 'constellation.starMap': 'Mapa Estelar Interativo', 'constellation.selectToView': 'Selecione uma constelação',
    'dailyFact.subtitle': 'Algo novo para aprender todo dia!', 'dailyFact.newFact': 'Novo Fato', 'dailyFact.share': 'Compartilhar', 'dailyFact.comeBack': 'Volte amanhã para um novo fato!',
    'funFacts.desc': 'Toque nas cartas para revelar fatos incríveis!', 'funFacts.tapCards': 'Toque para revelar!', 'funFacts.randomFact': 'Fato Aleatório!',
    'shop.desc': 'Gaste suas moedas em melhorias e cosméticos!', 'shop.boosts': '⚡ Melhorias', 'shop.cosmetics': '🎨 Cosméticos', 'shop.utilities': '🔧 Utilidades', 'shop.popular': 'Popular',
    'subscription.desc': 'Desbloqueie recursos premium!', 'subscription.current': 'Plano Atual', 'subscription.purchase': 'Comprar', 'subscription.dailyBonus': 'Bônus Diário', 'subscription.claimBonus': 'Reivindicar Bônus', 'subscription.expired': 'Expirado', 'subscription.daysLeft': 'dias restantes',
    'gamePass.desc': 'Desbloqueie poderes especiais de jogo!', 'gamePass.active': 'Ativo',
    'premiumGames.desc': 'Jogos exclusivos com recompensas incríveis!',
    'giftVoucher.desc': 'Raspe seus vales para revelar prêmios!', 'giftVoucher.scratch': 'Raspe para Revelar!', 'giftVoucher.noVouchers': 'Sem vales. Complete cursos!',
    'manuscripts.desc': 'Explore as maiores conquistas da exploração espacial!',
    'qna.askAnything': 'Pergunte sobre o espaço...', 'qna.searching': 'Pesquisando...', 'qna.ask': 'Perguntar', 'qna.suggested': 'Perguntas Sugeridas',
    'account.createAccount': 'Criar Conta', 'account.guest': 'Explorador Convidado', 'account.profile': 'Seu Perfil',
  },

  ru: {
    'nav.home': 'Главная', 'nav.solarSystem': 'Солнечная Система', 'nav.timeline': 'Хронология', 'nav.constellations': 'Созвездия', 'nav.library': 'Библиотека', 'nav.games': 'Игры', 'nav.subscriptions': 'Подписки', 'nav.funFacts': 'Факты', 'nav.about': 'О нас', 'nav.startJourney': 'Начни Путешествие', 'nav.cosmicClassroom': 'Космический Класс',
    'hero.badge': 'Для юных исследователей 7-13 лет', 'hero.welcome': 'Добро пожаловать в', 'hero.cosmicClassroom': 'Космический Класс', 'hero.subtitle': 'Исследуй каждый уголок Вселенной! 🚀', 'hero.startJourney': 'Начни Космическое Путешествие', 'hero.takeQuiz': 'Пройди Викторину',
    'hero.solarSystem': 'Солнечная Система', 'hero.solarSystemDesc': 'Исследуй планеты, луны, астероиды и кометы', 'hero.starsNebulas': 'Звёзды и Туманности', 'hero.starsNebulasDesc': 'Открой типы звёзд и сверхновые', 'hero.galaxiesBeyond': 'Галактики и Далее', 'hero.galaxiesBeyondDesc': 'Путешествуй по галактикам и чёрным дырам',
    'section.dailyFact': 'Космический Факт Дня', 'section.spaceQnA': 'Вопросы и Ответы', 'section.spaceQnADesc': 'Спроси что угодно о космосе!', 'section.celestialExplorer': 'Небесный Исследователь', 'section.spaceTimeline': 'Космическая Хронология', 'section.constellations': 'Созвездия',
    'section.courses': 'Космические Курсы', 'section.coursesDesc': 'Пройди курсы с видео, книгами и аудиокнигами!', 'section.giftVouchers': 'Подарочные Купоны', 'section.manuscripts': 'Космические Рукописи',
    'section.library': '📚 Небесная Библиотека', 'section.libraryDesc': 'Смотри видео, читай книги и слушай аудиокниги!', 'section.games': '🎮 Игры и Викторины', 'section.gamesDesc': 'Проверь свои знания в интерактивных играх!',
    'section.premiumGames': 'Премиум Игры', 'section.gamePass': 'Игровой Пропуск', 'section.shop': 'Космический Магазин', 'section.trophyCabinet': 'Витрина Трофеев', 'section.trophyCabinetDesc': 'Твоя коллекция достижений и сертификатов!',
    'section.subscriptions': 'Подписки', 'section.funFacts': 'Факты', 'section.about': '✨ О Космическом Классе', 'section.aboutMission': 'Наша Миссия',
    'section.aboutMissionDesc': 'Космический Класс пробуждает любопытство к вселенной!', 'section.aboutMissionDesc2': 'От планет до далёких галактик — столько всего для исследования!',
    'common.learn': 'Учиться', 'common.play': 'Играть', 'common.explore': 'Исследовать', 'common.learnDesc': 'Открой факты о каждом небесном теле.', 'common.playDesc': 'Проверь свои знания в весёлых викторинах!', 'common.exploreDesc': 'Смотри видео и читай книги для юных исследователей.',
    'common.videos': 'Видео', 'common.books': 'Книги', 'common.audiobooks': 'Аудиокниги', 'common.all': 'Все', 'common.close': 'Закрыть', 'common.back': 'Назад', 'common.next': 'Далее', 'common.previous': 'Назад', 'common.readNow': 'Читать', 'common.watchNow': 'Смотреть', 'common.listenNow': 'Слушать',
    'common.noAchievements': 'Нет Достижений', 'common.noAchievementsDesc': 'Пройди курсы и игры для получения достижений!', 'common.totalAchievements': 'Всего Достижений', 'common.earnedOn': 'Получено', 'common.locked': 'Заблокировано',
    'common.coins': 'Монеты', 'common.new': 'НОВОЕ', 'common.buy': 'Купить', 'common.purchased': 'Куплено',
    'footer.tagline': 'Делаем исследование космоса увлекательным! 🚀', 'footer.explore': 'Исследовать', 'footer.learnPlay': 'Учиться и Играть', 'footer.resources': 'Ресурсы', 'footer.universeExplorer': 'Исследователь Вселенной', 'footer.celestialLibrary': 'Небесная Библиотека', 'footer.quizzes': 'Викторины', 'footer.forParents': 'Для Родителей и Учителей', 'footer.contact': 'Контакты', 'footer.privacy': 'Конфиденциальность', 'footer.madeWith': 'Сделано с', 'footer.copyright': '© 2024 Космический Класс. Исследуй звёзды! ✨',
    'games.quiz': 'Викторина', 'games.sizeCompare': 'Сравнение Размеров', 'games.rocketShooter': 'Ракетный Стрелок', 'games.memoryMatch': 'Память', 'games.wordScramble': 'Слова', 'games.rocketMath': 'Ракетная Математика',
    'library.videos': 'Видео', 'library.books': 'Книги', 'library.audiobooks': 'Аудиокниги',
    'courses.spaceCourses': 'Космические Курсы', 'courses.backToCourses': '← Назад к Курсам', 'courses.claimCertificate': 'Получить Сертификат', 'courses.takeQuiz': 'Пройти Тест', 'courses.restartCourse': 'Начать Заново', 'courses.progress': 'Прогресс', 'courses.learningGoals': 'Цели Обучения', 'courses.coursePlan': 'План Курса', 'courses.plan': 'План',
    'about.planetsMoons': 'Планеты и Луны', 'about.starsNebulas': 'Звёзды и Туманности', 'about.galaxies': 'Галактики', 'about.booksVideos': 'Книги и Видео',
    'language.select': 'Язык', 'tts.readAloud': 'Читать Вслух', 'tts.stopReading': 'Остановить', 'tts.readPage': 'Прочитать содержимое страницы',
    'explorer.title': '🔭 Исследователь Вселенной', 'explorer.desc': 'Нажми на любое небесное тело чтобы узнать больше!', 'explorer.anyDistance': '📍 Любое Расстояние', 'explorer.near': '🏠 Близко', 'explorer.far': '🚀 Далеко', 'explorer.noResults': 'Небесные тела не найдены.', 'explorer.adjustFilters': 'Попробуй изменить фильтры!',
    'timeline.title': 'Путешествие Во Времени', 'timeline.desc': 'Путешествуй от Большого Взрыва до сегодня!', 'timeline.allEvents': '🌟 Все События',
    'constellation.title': '✨ Просмотр Созвездий ✨', 'constellation.desc': 'Нажми на созвездие чтобы узнать его историю!', 'constellation.starMap': 'Интерактивная Карта Звёзд', 'constellation.selectToView': 'Выбери созвездие',
    'dailyFact.subtitle': 'Что-то новое каждый день!', 'dailyFact.newFact': 'Новый Факт', 'dailyFact.share': 'Поделиться', 'dailyFact.comeBack': 'Возвращайся завтра за новым фактом!',
    'funFacts.desc': 'Нажми на карточки чтобы увидеть удивительные факты!', 'funFacts.tapCards': 'Нажми чтобы увидеть!', 'funFacts.randomFact': 'Случайный Факт!',
    'shop.desc': 'Трать монеты на усиления и косметику!', 'shop.boosts': '⚡ Усиления', 'shop.cosmetics': '🎨 Косметика', 'shop.utilities': '🔧 Утилиты', 'shop.popular': 'Популярное',
    'subscription.desc': 'Разблокируй премиум функции!', 'subscription.current': 'Текущий План', 'subscription.purchase': 'Купить', 'subscription.dailyBonus': 'Ежедневный Бонус', 'subscription.claimBonus': 'Получить Бонус', 'subscription.expired': 'Истёк', 'subscription.daysLeft': 'дней осталось',
    'gamePass.desc': 'Разблокируй специальные игровые силы!', 'gamePass.active': 'Активен',
    'premiumGames.desc': 'Эксклюзивные игры с наградами!',
    'giftVoucher.desc': 'Стирай купоны чтобы получить призы!', 'giftVoucher.scratch': 'Потри для Приза!', 'giftVoucher.noVouchers': 'Нет купонов. Пройди курсы!',
    'manuscripts.desc': 'Исследуй величайшие достижения космоса!',
    'qna.askAnything': 'Спроси что угодно о космосе...', 'qna.searching': 'Поиск...', 'qna.ask': 'Спросить', 'qna.suggested': 'Рекомендуемые Вопросы',
    'account.createAccount': 'Создать Аккаунт', 'account.guest': 'Гость-Исследователь', 'account.profile': 'Твой Профиль',
  },

  zh: {
    'nav.home': '首页', 'nav.solarSystem': '太阳系', 'nav.timeline': '时间线', 'nav.constellations': '星座', 'nav.library': '图书馆', 'nav.games': '游戏', 'nav.subscriptions': '订阅', 'nav.funFacts': '趣味知识', 'nav.about': '关于', 'nav.startJourney': '开始旅程', 'nav.cosmicClassroom': '宇宙课堂',
    'hero.badge': '适合7-13岁的小探险家', 'hero.welcome': '欢迎来到', 'hero.cosmicClassroom': '宇宙课堂', 'hero.subtitle': '探索宇宙的每个角落！🚀 学习行星、恒星、星云、星系等更多知识！', 'hero.startJourney': '开始太空之旅', 'hero.takeQuiz': '参加测验',
    'hero.solarSystem': '太阳系', 'hero.solarSystemDesc': '探索行星、卫星、小行星和彗星', 'hero.starsNebulas': '恒星与星云', 'hero.starsNebulasDesc': '发现恒星类型和超新星', 'hero.galaxiesBeyond': '星系及更远处', 'hero.galaxiesBeyondDesc': '穿越星系和黑洞',
    'section.dailyFact': '每日太空知识', 'section.spaceQnA': '太空问答', 'section.spaceQnADesc': '问任何关于太空的问题！', 'section.celestialExplorer': '天体探索者', 'section.spaceTimeline': '太空时间线', 'section.constellations': '星座',
    'section.courses': '太空课程', 'section.coursesDesc': '完成包含视频、书籍和有声书的课程！', 'section.giftVouchers': '礼品券', 'section.manuscripts': '太空手稿',
    'section.library': '📚 天体图书馆', 'section.libraryDesc': '观看视频，探索书籍，收听有声书！', 'section.games': '🎮 游戏与测验', 'section.gamesDesc': '用互动游戏测试你的太空知识！',
    'section.premiumGames': '高级游戏', 'section.gamePass': '游戏通行证', 'section.shop': '太空商店', 'section.trophyCabinet': '奖杯柜', 'section.trophyCabinetDesc': '你的成就和证书收藏！',
    'section.subscriptions': '订阅', 'section.funFacts': '趣味知识', 'section.about': '✨ 关于宇宙课堂', 'section.aboutMission': '我们的使命',
    'section.aboutMissionDesc': '宇宙课堂激发孩子们对宇宙的好奇心！', 'section.aboutMissionDesc2': '从行星到遥远的星系——有太多可以探索！',
    'common.learn': '学习', 'common.play': '游戏', 'common.explore': '探索', 'common.learnDesc': '发现每种天体的有趣事实。', 'common.playDesc': '用有趣的测验测试你的知识！', 'common.exploreDesc': '为年轻探索者观看视频和阅读书籍。',
    'common.videos': '视频', 'common.books': '书籍', 'common.audiobooks': '有声书', 'common.all': '全部', 'common.close': '关闭', 'common.back': '返回', 'common.next': '下一个', 'common.previous': '上一个', 'common.readNow': '立即阅读', 'common.watchNow': '立即观看', 'common.listenNow': '立即收听',
    'common.noAchievements': '暂无成就', 'common.noAchievementsDesc': '完成课程和游戏来获得成就！', 'common.totalAchievements': '总成就', 'common.earnedOn': '获得于', 'common.locked': '已锁定',
    'common.coins': '金币', 'common.new': '新', 'common.buy': '购买', 'common.purchased': '已购买',
    'footer.tagline': '让太空探索变得有趣！🚀', 'footer.explore': '探索', 'footer.learnPlay': '学习与游戏', 'footer.resources': '资源', 'footer.universeExplorer': '宇宙探索者', 'footer.celestialLibrary': '天体图书馆', 'footer.quizzes': '测验', 'footer.forParents': '给家长和老师', 'footer.contact': '联系', 'footer.privacy': '隐私政策', 'footer.madeWith': '用心制作', 'footer.copyright': '© 2024 宇宙课堂。继续探索星辰！✨',
    'games.quiz': '测验', 'games.sizeCompare': '大小比较', 'games.rocketShooter': '火箭射手', 'games.memoryMatch': '记忆配对', 'games.wordScramble': '单词拼图', 'games.rocketMath': '火箭数学',
    'library.videos': '视频', 'library.books': '书籍', 'library.audiobooks': '有声书',
    'courses.spaceCourses': '太空课程', 'courses.backToCourses': '← 返回课程', 'courses.claimCertificate': '领取证书', 'courses.takeQuiz': '参加测验', 'courses.restartCourse': '重新开始', 'courses.progress': '进度', 'courses.learningGoals': '学习目标', 'courses.coursePlan': '课程计划', 'courses.plan': '计划',
    'about.planetsMoons': '行星和卫星', 'about.starsNebulas': '恒星和星云', 'about.galaxies': '星系', 'about.booksVideos': '书籍和视频',
    'language.select': '语言', 'tts.readAloud': '朗读', 'tts.stopReading': '停止朗读', 'tts.readPage': '朗读页面内容',
    'explorer.title': '🔭 宇宙探索者', 'explorer.desc': '点击任何天体了解更多！', 'explorer.anyDistance': '📍 任何距离', 'explorer.near': '🏠 近', 'explorer.far': '🚀 远', 'explorer.noResults': '未找到天体。', 'explorer.adjustFilters': '尝试调整筛选条件！',
    'timeline.title': '穿越时空之旅', 'timeline.desc': '从大爆炸到今天！探索最惊人的宇宙时刻。', 'timeline.allEvents': '🌟 所有事件',
    'constellation.title': '✨ 星座查看器 ✨', 'constellation.desc': '点击星座发现它的古老故事！', 'constellation.starMap': '互动星图', 'constellation.selectToView': '选择一个星座',
    'dailyFact.subtitle': '每天学点新东西！', 'dailyFact.newFact': '新知识', 'dailyFact.share': '分享', 'dailyFact.comeBack': '明天回来看新知识！',
    'funFacts.desc': '点击卡片揭示宇宙的惊人事实！', 'funFacts.tapCards': '点击揭示！', 'funFacts.randomFact': '随机知识！',
    'shop.desc': '用金币购买加成和装饰品！', 'shop.boosts': '⚡ 加成', 'shop.cosmetics': '🎨 装饰', 'shop.utilities': '🔧 工具', 'shop.popular': '热门',
    'subscription.desc': '解锁高级功能！', 'subscription.current': '当前计划', 'subscription.purchase': '购买', 'subscription.dailyBonus': '每日奖励', 'subscription.claimBonus': '领取奖励', 'subscription.expired': '已过期', 'subscription.daysLeft': '天剩余',
    'gamePass.desc': '解锁特殊游戏能力！', 'gamePass.active': '活跃',
    'premiumGames.desc': '独家游戏，丰厚奖励！',
    'giftVoucher.desc': '刮开礼品券获得奖励！', 'giftVoucher.scratch': '刮开揭示！', 'giftVoucher.noVouchers': '没有券。完成课程获得！',
    'manuscripts.desc': '探索太空探索史上最伟大的成就！',
    'qna.askAnything': '问任何关于太空的问题...', 'qna.searching': '搜索中...', 'qna.ask': '提问', 'qna.suggested': '推荐问题',
    'account.createAccount': '创建账户', 'account.guest': '访客探索者', 'account.profile': '你的资料',
  },

  ja: {
    'nav.home': 'ホーム', 'nav.solarSystem': '太陽系', 'nav.timeline': 'タイムライン', 'nav.constellations': '星座', 'nav.library': '図書館', 'nav.games': 'ゲーム', 'nav.subscriptions': 'サブスクリプション', 'nav.funFacts': '豆知識', 'nav.about': '概要', 'nav.startJourney': '旅を始めよう', 'nav.cosmicClassroom': 'コズミック教室',
    'hero.badge': '7〜13歳の若い探検家向け', 'hero.welcome': 'ようこそ', 'hero.cosmicClassroom': 'コズミック教室', 'hero.subtitle': '宇宙のすべてを探検しよう！🚀', 'hero.startJourney': '宇宙の旅を始めよう', 'hero.takeQuiz': 'クイズに挑戦',
    'hero.solarSystem': '太陽系', 'hero.solarSystemDesc': '惑星、衛星、小惑星、彗星を探検', 'hero.starsNebulas': '恒星と星雲', 'hero.starsNebulasDesc': '恒星の種類と超新星を発見', 'hero.galaxiesBeyond': '銀河とその先', 'hero.galaxiesBeyondDesc': '銀河とブラックホールを旅する',
    'section.dailyFact': '今日の宇宙豆知識', 'section.spaceQnA': '宇宙Q&A', 'section.spaceQnADesc': '宇宙について何でも聞いて！', 'section.celestialExplorer': '天体探検家', 'section.spaceTimeline': '宇宙タイムライン', 'section.constellations': '星座',
    'section.courses': '宇宙コース', 'section.coursesDesc': 'ビデオ、本、オーディオブックでコースを完了しよう！', 'section.giftVouchers': 'ギフト券', 'section.manuscripts': '宇宙文書',
    'section.library': '📚 天体図書館', 'section.libraryDesc': 'ビデオを見て、本を読んで、オーディオブックを聴こう！', 'section.games': '🎮 ゲームとクイズ', 'section.gamesDesc': 'インタラクティブなゲームで宇宙の知識をテスト！',
    'section.premiumGames': 'プレミアムゲーム', 'section.gamePass': 'ゲームパス', 'section.shop': '宇宙ショップ', 'section.trophyCabinet': 'トロフィーキャビネット', 'section.trophyCabinetDesc': '達成と証明書のコレクション！',
    'section.subscriptions': 'サブスクリプション', 'section.funFacts': '豆知識', 'section.about': '✨ コズミック教室について', 'section.aboutMission': '私たちの使命',
    'section.aboutMissionDesc': 'コズミック教室は宇宙への好奇心を育てます！', 'section.aboutMissionDesc2': '惑星から遠い銀河まで — 探検することがたくさん！',
    'common.learn': '学ぶ', 'common.play': '遊ぶ', 'common.explore': '探検', 'common.learnDesc': 'あらゆる天体の面白い事実を発見。', 'common.playDesc': '楽しいクイズで知識をテスト！', 'common.exploreDesc': '若い探検家のためのビデオと本。',
    'common.videos': 'ビデオ', 'common.books': '本', 'common.audiobooks': 'オーディオブック', 'common.all': 'すべて', 'common.close': '閉じる', 'common.back': '戻る', 'common.next': '次へ', 'common.previous': '前へ', 'common.readNow': '今すぐ読む', 'common.watchNow': '今すぐ見る', 'common.listenNow': '今すぐ聴く',
    'common.noAchievements': '達成なし', 'common.noAchievementsDesc': 'コースとゲームを完了して達成を獲得！', 'common.totalAchievements': '総達成数', 'common.earnedOn': '獲得日', 'common.locked': 'ロック済み',
    'common.coins': 'コイン', 'common.new': '新着', 'common.buy': '購入', 'common.purchased': '購入済み',
    'footer.tagline': '宇宙探検を楽しく！🚀', 'footer.explore': '探検', 'footer.learnPlay': '学びと遊び', 'footer.resources': 'リソース', 'footer.universeExplorer': '宇宙探検家', 'footer.celestialLibrary': '天体図書館', 'footer.quizzes': 'クイズ', 'footer.forParents': '保護者と先生へ', 'footer.contact': '連絡先', 'footer.privacy': 'プライバシー', 'footer.madeWith': '作成', 'footer.copyright': '© 2024 コズミック教室。星を探検し続けよう！✨',
    'games.quiz': 'クイズ', 'games.sizeCompare': 'サイズ比較', 'games.rocketShooter': 'ロケットシューター', 'games.memoryMatch': '記憶ゲーム', 'games.wordScramble': '文字並べ替え', 'games.rocketMath': 'ロケット算数',
    'library.videos': 'ビデオ', 'library.books': '本', 'library.audiobooks': 'オーディオブック',
    'courses.spaceCourses': '宇宙コース', 'courses.backToCourses': '← コースに戻る', 'courses.claimCertificate': '証明書を取得', 'courses.takeQuiz': 'クイズを受ける', 'courses.restartCourse': '再開', 'courses.progress': '進捗', 'courses.learningGoals': '学習目標', 'courses.coursePlan': 'コース計画', 'courses.plan': '計画',
    'about.planetsMoons': '惑星と衛星', 'about.starsNebulas': '恒星と星雲', 'about.galaxies': '銀河', 'about.booksVideos': '本とビデオ',
    'language.select': '言語', 'tts.readAloud': '読み上げ', 'tts.stopReading': '停止', 'tts.readPage': 'ページを読み上げ',
    'explorer.title': '🔭 宇宙探検家', 'explorer.desc': '天体をクリックして詳しく学ぼう！', 'explorer.anyDistance': '📍 すべての距離', 'explorer.near': '🏠 近い', 'explorer.far': '🚀 遠い', 'explorer.noResults': '天体が見つかりません。', 'explorer.adjustFilters': 'フィルターを調整してみて！',
    'timeline.title': '時間の旅', 'timeline.desc': 'ビッグバンから今日まで！最も驚くべき宇宙の瞬間を探検。', 'timeline.allEvents': '🌟 すべてのイベント',
    'constellation.title': '✨ 星座ビューアー ✨', 'constellation.desc': '星座をクリックしてその物語を発見！', 'constellation.starMap': 'インタラクティブ星図', 'constellation.selectToView': '星座を選択',
    'dailyFact.subtitle': '毎日新しいことを学ぼう！', 'dailyFact.newFact': '新しい豆知識', 'dailyFact.share': '共有', 'dailyFact.comeBack': '明日も新しい豆知識をチェック！',
    'funFacts.desc': 'カードをタップして驚きの事実を発見！', 'funFacts.tapCards': 'タップして発見！', 'funFacts.randomFact': 'ランダム豆知識！',
    'shop.desc': 'コインでブーストや装飾品を購入！', 'shop.boosts': '⚡ ブースト', 'shop.cosmetics': '🎨 装飾', 'shop.utilities': '🔧 ユーティリティ', 'shop.popular': '人気',
    'subscription.desc': 'プレミアム機能をアンロック！', 'subscription.current': '現在のプラン', 'subscription.purchase': '購入', 'subscription.dailyBonus': 'デイリーボーナス', 'subscription.claimBonus': 'ボーナス獲得', 'subscription.expired': '期限切れ', 'subscription.daysLeft': '日残り',
    'gamePass.desc': '特別なゲームパワーをアンロック！', 'gamePass.active': 'アクティブ',
    'premiumGames.desc': '素晴らしい報酬付き限定ゲーム！',
    'giftVoucher.desc': 'ギフト券をスクラッチして報酬を獲得！', 'giftVoucher.scratch': 'スクラッチ！', 'giftVoucher.noVouchers': '券がありません。コースを完了しよう！',
    'manuscripts.desc': '宇宙探査史上最大の偉業を探検！',
    'qna.askAnything': '宇宙について何でも聞いて...', 'qna.searching': '検索中...', 'qna.ask': '質問', 'qna.suggested': 'おすすめの質問',
    'account.createAccount': 'アカウント作成', 'account.guest': 'ゲスト探検家', 'account.profile': 'プロフィール',
  },

  ko: {
    'nav.home': '홈', 'nav.solarSystem': '태양계', 'nav.timeline': '타임라인', 'nav.constellations': '별자리', 'nav.library': '도서관', 'nav.games': '게임', 'nav.subscriptions': '구독', 'nav.funFacts': '재미있는 사실', 'nav.about': '소개', 'nav.startJourney': '여행 시작', 'nav.cosmicClassroom': '우주 교실',
    'hero.badge': '7-13세 어린 탐험가를 위한', 'hero.welcome': '환영합니다', 'hero.cosmicClassroom': '우주 교실', 'hero.subtitle': '우주의 모든 곳을 탐험하세요! 🚀', 'hero.startJourney': '우주 여행 시작', 'hero.takeQuiz': '퀴즈 풀기',
    'hero.solarSystem': '태양계', 'hero.solarSystemDesc': '행성, 위성, 소행성, 혜성 탐험', 'hero.starsNebulas': '별과 성운', 'hero.starsNebulasDesc': '별의 종류와 초신성 발견', 'hero.galaxiesBeyond': '은하와 그 너머', 'hero.galaxiesBeyondDesc': '은하와 블랙홀 여행',
    'section.dailyFact': '오늘의 우주 사실', 'section.spaceQnA': '우주 Q&A', 'section.spaceQnADesc': '우주에 대해 무엇이든 물어보세요!', 'section.celestialExplorer': '천체 탐험가', 'section.spaceTimeline': '우주 타임라인', 'section.constellations': '별자리',
    'section.courses': '우주 과정', 'section.coursesDesc': '비디오, 책, 오디오북으로 과정을 완료하세요!', 'section.giftVouchers': '기프트 바우처', 'section.manuscripts': '우주 원고',
    'section.library': '📚 천체 도서관', 'section.libraryDesc': '비디오를 보고, 책을 읽고, 오디오북을 들으세요!', 'section.games': '🎮 게임과 퀴즈', 'section.gamesDesc': '인터랙티브 게임으로 우주 지식을 테스트!',
    'section.premiumGames': '프리미엄 게임', 'section.gamePass': '게임 패스', 'section.shop': '우주 상점', 'section.trophyCabinet': '트로피 캐비닛', 'section.trophyCabinetDesc': '당신의 업적과 인증서 컬렉션!',
    'section.subscriptions': '구독', 'section.funFacts': '재미있는 사실', 'section.about': '✨ 우주 교실 소개', 'section.aboutMission': '우리의 미션',
    'section.aboutMissionDesc': '우주 교실은 우주에 대한 호기심을 일깨웁니다!', 'section.aboutMissionDesc2': '행성에서 먼 은하까지 — 탐험할 것이 많습니다!',
    'common.learn': '배우기', 'common.play': '놀기', 'common.explore': '탐험', 'common.learnDesc': '모든 천체에 대한 재미있는 사실을 발견하세요.', 'common.playDesc': '재미있는 퀴즈로 지식을 테스트하세요!', 'common.exploreDesc': '어린 탐험가를 위한 비디오와 책.',
    'common.videos': '비디오', 'common.books': '책', 'common.audiobooks': '오디오북', 'common.all': '전체', 'common.close': '닫기', 'common.back': '뒤로', 'common.next': '다음', 'common.previous': '이전', 'common.readNow': '지금 읽기', 'common.watchNow': '지금 보기', 'common.listenNow': '지금 듣기',
    'common.noAchievements': '아직 업적 없음', 'common.noAchievementsDesc': '과정과 게임을 완료하여 업적을 얻으세요!', 'common.totalAchievements': '총 업적', 'common.earnedOn': '획득일', 'common.locked': '잠김',
    'common.coins': '코인', 'common.new': '새로운', 'common.buy': '구매', 'common.purchased': '구매됨',
    'footer.tagline': '우주 탐험을 재미있게! 🚀', 'footer.explore': '탐험', 'footer.learnPlay': '배우고 놀기', 'footer.resources': '리소스', 'footer.universeExplorer': '우주 탐험가', 'footer.celestialLibrary': '천체 도서관', 'footer.quizzes': '퀴즈', 'footer.forParents': '부모와 선생님을 위해', 'footer.contact': '연락처', 'footer.privacy': '개인정보 보호', 'footer.madeWith': '제작', 'footer.copyright': '© 2024 우주 교실. 별을 탐험하세요! ✨',
    'games.quiz': '퀴즈', 'games.sizeCompare': '크기 비교', 'games.rocketShooter': '로켓 슈터', 'games.memoryMatch': '메모리 매치', 'games.wordScramble': '단어 스크램블', 'games.rocketMath': '로켓 수학',
    'library.videos': '비디오', 'library.books': '책', 'library.audiobooks': '오디오북',
    'courses.spaceCourses': '우주 과정', 'courses.backToCourses': '← 과정으로 돌아가기', 'courses.claimCertificate': '인증서 받기', 'courses.takeQuiz': '퀴즈 풀기', 'courses.restartCourse': '다시 시작', 'courses.progress': '진행', 'courses.learningGoals': '학습 목표', 'courses.coursePlan': '과정 계획', 'courses.plan': '계획',
    'about.planetsMoons': '행성과 위성', 'about.starsNebulas': '별과 성운', 'about.galaxies': '은하', 'about.booksVideos': '책과 비디오',
    'language.select': '언어', 'tts.readAloud': '소리내어 읽기', 'tts.stopReading': '중지', 'tts.readPage': '페이지 내용 읽기',
    'explorer.title': '🔭 우주 탐험가', 'explorer.desc': '천체를 클릭하여 더 알아보세요!', 'explorer.anyDistance': '📍 모든 거리', 'explorer.near': '🏠 가까운', 'explorer.far': '🚀 먼', 'explorer.noResults': '천체를 찾을 수 없습니다.', 'explorer.adjustFilters': '필터를 조정해보세요!',
    'timeline.title': '시간 여행', 'timeline.desc': '빅뱅부터 오늘까지! 가장 놀라운 우주 순간을 탐험하세요.', 'timeline.allEvents': '🌟 모든 이벤트',
    'constellation.title': '✨ 별자리 뷰어 ✨', 'constellation.desc': '별자리를 클릭하여 이야기를 발견하세요!', 'constellation.starMap': '인터랙티브 별지도', 'constellation.selectToView': '별자리를 선택하세요',
    'dailyFact.subtitle': '매일 새로운 것을 배우세요!', 'dailyFact.newFact': '새로운 사실', 'dailyFact.share': '공유', 'dailyFact.comeBack': '내일 새로운 사실을 확인하세요!',
    'funFacts.desc': '카드를 탭하여 놀라운 사실을 발견하세요!', 'funFacts.tapCards': '탭하여 발견!', 'funFacts.randomFact': '랜덤 사실!',
    'shop.desc': '코인으로 부스트와 장식을 구매하세요!', 'shop.boosts': '⚡ 부스트', 'shop.cosmetics': '🎨 장식', 'shop.utilities': '🔧 유틸리티', 'shop.popular': '인기',
    'subscription.desc': '프리미엄 기능을 잠금 해제하세요!', 'subscription.current': '현재 플랜', 'subscription.purchase': '구매', 'subscription.dailyBonus': '일일 보너스', 'subscription.claimBonus': '보너스 받기', 'subscription.expired': '만료됨', 'subscription.daysLeft': '일 남음',
    'gamePass.desc': '특별한 게임 파워를 잠금 해제하세요!', 'gamePass.active': '활성',
    'premiumGames.desc': '놀라운 보상이 있는 독점 게임!',
    'giftVoucher.desc': '기프트 바우처를 긁어 보상을 받으세요!', 'giftVoucher.scratch': '긁어서 확인!', 'giftVoucher.noVouchers': '바우처가 없습니다. 과정을 완료하세요!',
    'manuscripts.desc': '우주 탐사 역사의 위대한 업적을 탐험하세요!',
    'qna.askAnything': '우주에 대해 무엇이든 물어보세요...', 'qna.searching': '검색 중...', 'qna.ask': '질문', 'qna.suggested': '추천 질문',
    'account.createAccount': '계정 만들기', 'account.guest': '게스트 탐험가', 'account.profile': '프로필',
  },

  hi: {
    'nav.home': 'होम', 'nav.solarSystem': 'सौर मंडल', 'nav.timeline': 'समयरेखा', 'nav.constellations': 'तारामंडल', 'nav.library': 'पुस्तकालय', 'nav.games': 'खेल', 'nav.subscriptions': 'सदस्यता', 'nav.funFacts': 'रोचक तथ्य', 'nav.about': 'के बारे में', 'nav.startJourney': 'यात्रा शुरू करें', 'nav.cosmicClassroom': 'ब्रह्मांड कक्षा',
    'hero.badge': '7-13 वर्ष के युवा खोजकर्ताओं के लिए', 'hero.welcome': 'आपका स्वागत है', 'hero.cosmicClassroom': 'ब्रह्मांड कक्षा', 'hero.subtitle': 'ब्रह्मांड के हर कोने की खोज करें! 🚀', 'hero.startJourney': 'अंतरिक्ष यात्रा शुरू करें', 'hero.takeQuiz': 'क्विज़ लें',
    'hero.solarSystem': 'सौर मंडल', 'hero.solarSystemDesc': 'ग्रह, चंद्रमा, क्षुद्रग्रह और धूमकेतु की खोज करें', 'hero.starsNebulas': 'तारे और निहारिका', 'hero.starsNebulasDesc': 'तारों के प्रकार और सुपरनोवा की खोज करें', 'hero.galaxiesBeyond': 'आकाशगंगा और उससे आगे', 'hero.galaxiesBeyondDesc': 'आकाशगंगाओं और ब्लैक होल की यात्रा करें',
    'section.dailyFact': 'दैनिक अंतरिक्ष तथ्य', 'section.spaceQnA': 'अंतरिक्ष प्रश्नोत्तर', 'section.spaceQnADesc': 'अंतरिक्ष के बारे में कुछ भी पूछें!', 'section.celestialExplorer': 'खगोलीय खोजकर्ता', 'section.spaceTimeline': 'अंतरिक्ष समयरेखा', 'section.constellations': 'तारामंडल',
    'section.courses': 'अंतरिक्ष पाठ्यक्रम', 'section.coursesDesc': 'वीडियो, किताबें और ऑडियोबुक के साथ पाठ्यक्रम पूरा करें!', 'section.giftVouchers': 'उपहार वाउचर', 'section.manuscripts': 'अंतरिक्ष पांडुलिपियां',
    'section.library': '📚 खगोलीय पुस्तकालय', 'section.libraryDesc': 'वीडियो देखें, किताबें पढ़ें और ऑडियोबुक सुनें!', 'section.games': '🎮 खेल और क्विज़', 'section.gamesDesc': 'इंटरैक्टिव गेम से अपने अंतरिक्ष ज्ञान का परीक्षण करें!',
    'section.premiumGames': 'प्रीमियम खेल', 'section.gamePass': 'गेम पास', 'section.shop': 'अंतरिक्ष दुकान', 'section.trophyCabinet': 'ट्रॉफी कैबिनेट', 'section.trophyCabinetDesc': 'आपकी उपलब्धियों और प्रमाणपत्रों का संग्रह!',
    'section.subscriptions': 'सदस्यता', 'section.funFacts': 'रोचक तथ्य', 'section.about': '✨ ब्रह्मांड कक्षा के बारे में', 'section.aboutMission': 'हमारा मिशन',
    'section.aboutMissionDesc': 'ब्रह्मांड कक्षा ब्रह्मांड के प्रति जिज्ञासा जगाता है!', 'section.aboutMissionDesc2': 'ग्रहों से दूर की आकाशगंगाओं तक — खोजने के लिए बहुत कुछ है!',
    'common.learn': 'सीखें', 'common.play': 'खेलें', 'common.explore': 'खोजें', 'common.learnDesc': 'हर खगोलीय पिंड के बारे में रोचक तथ्य खोजें।', 'common.playDesc': 'मज़ेदार क्विज़ से अपने ज्ञान का परीक्षण करें!', 'common.exploreDesc': 'युवा खोजकर्ताओं के लिए वीडियो और किताबें।',
    'common.videos': 'वीडियो', 'common.books': 'किताबें', 'common.audiobooks': 'ऑडियोबुक', 'common.all': 'सभी', 'common.close': 'बंद करें', 'common.back': 'वापस', 'common.next': 'अगला', 'common.previous': 'पिछला', 'common.readNow': 'अभी पढ़ें', 'common.watchNow': 'अभी देखें', 'common.listenNow': 'अभी सुनें',
    'common.noAchievements': 'अभी तक कोई उपलब्धि नहीं', 'common.noAchievementsDesc': 'पाठ्यक्रम और खेल पूरे करके उपलब्धियां अर्जित करें!', 'common.totalAchievements': 'कुल उपलब्धियां', 'common.earnedOn': 'प्राप्त किया', 'common.locked': 'लॉक',
    'common.coins': 'सिक्के', 'common.new': 'नया', 'common.buy': 'खरीदें', 'common.purchased': 'खरीदा गया',
    'footer.tagline': 'अंतरिक्ष अन्वेषण को मज़ेदार बनाना! 🚀', 'footer.explore': 'खोजें', 'footer.learnPlay': 'सीखें और खेलें', 'footer.resources': 'संसाधन', 'footer.universeExplorer': 'ब्रह्मांड खोजकर्ता', 'footer.celestialLibrary': 'खगोलीय पुस्तकालय', 'footer.quizzes': 'क्विज़', 'footer.forParents': 'माता-पिता और शिक्षकों के लिए', 'footer.contact': 'संपर्क', 'footer.privacy': 'गोपनीयता नीति', 'footer.madeWith': 'बनाया गया', 'footer.copyright': '© 2024 ब्रह्मांड कक्षा। तारों की खोज जारी रखें! ✨',
    'games.quiz': 'क्विज़', 'games.sizeCompare': 'आकार तुलना', 'games.rocketShooter': 'रॉकेट शूटर', 'games.memoryMatch': 'मेमोरी मैच', 'games.wordScramble': 'शब्द पहेली', 'games.rocketMath': 'रॉकेट गणित',
    'library.videos': 'वीडियो', 'library.books': 'किताबें', 'library.audiobooks': 'ऑडियोबुक',
    'courses.spaceCourses': 'अंतरिक्ष पाठ्यक्रम', 'courses.backToCourses': '← पाठ्यक्रम पर वापस', 'courses.claimCertificate': 'प्रमाणपत्र प्राप्त करें', 'courses.takeQuiz': 'क्विज़ लें', 'courses.restartCourse': 'फिर से शुरू', 'courses.progress': 'प्रगति', 'courses.learningGoals': 'सीखने के लक्ष्य', 'courses.coursePlan': 'पाठ्यक्रम योजना', 'courses.plan': 'योजना',
    'about.planetsMoons': 'ग्रह और चंद्रमा', 'about.starsNebulas': 'तारे और निहारिका', 'about.galaxies': 'आकाशगंगा', 'about.booksVideos': 'किताबें और वीडियो',
    'language.select': 'भाषा', 'tts.readAloud': 'जोर से पढ़ें', 'tts.stopReading': 'रोकें', 'tts.readPage': 'पृष्ठ की सामग्री पढ़ें',
    'explorer.title': '🔭 ब्रह्मांड खोजकर्ता', 'explorer.desc': 'किसी भी खगोलीय पिंड पर क्लिक करके और जानें!', 'explorer.anyDistance': '📍 कोई भी दूरी', 'explorer.near': '🏠 निकट', 'explorer.far': '🚀 दूर', 'explorer.noResults': 'कोई खगोलीय पिंड नहीं मिला।', 'explorer.adjustFilters': 'फ़िल्टर बदलकर देखें!',
    'timeline.title': 'समय की यात्रा', 'timeline.desc': 'बिग बैंग से आज तक! सबसे अद्भुत ब्रह्मांडीय क्षणों की खोज करें।', 'timeline.allEvents': '🌟 सभी घटनाएं',
    'constellation.title': '✨ तारामंडल दर्शक ✨', 'constellation.desc': 'किसी तारामंडल पर क्लिक करके उसकी कहानी जानें!', 'constellation.starMap': 'इंटरैक्टिव तारा नक्शा', 'constellation.selectToView': 'एक तारामंडल चुनें',
    'dailyFact.subtitle': 'हर दिन कुछ नया सीखें!', 'dailyFact.newFact': 'नया तथ्य', 'dailyFact.share': 'शेयर करें', 'dailyFact.comeBack': 'कल नए तथ्य के लिए वापस आएं!',
    'funFacts.desc': 'कार्ड पर टैप करके अद्भुत तथ्य देखें!', 'funFacts.tapCards': 'टैप करके देखें!', 'funFacts.randomFact': 'यादृच्छिक तथ्य!',
    'shop.desc': 'अपने सिक्कों से बूस्ट और सजावट खरीदें!', 'shop.boosts': '⚡ बूस्ट', 'shop.cosmetics': '🎨 सजावट', 'shop.utilities': '🔧 उपयोगिता', 'shop.popular': 'लोकप्रिय',
    'subscription.desc': 'प्रीमियम सुविधाएं अनलॉक करें!', 'subscription.current': 'वर्तमान योजना', 'subscription.purchase': 'खरीदें', 'subscription.dailyBonus': 'दैनिक बोनस', 'subscription.claimBonus': 'बोनस प्राप्त करें', 'subscription.expired': 'समाप्त', 'subscription.daysLeft': 'दिन शेष',
    'gamePass.desc': 'विशेष खेल शक्तियां अनलॉक करें!', 'gamePass.active': 'सक्रिय',
    'premiumGames.desc': 'शानदार पुरस्कारों वाले विशेष खेल!',
    'giftVoucher.desc': 'गिफ्ट वाउचर खुरचकर पुरस्कार पाएं!', 'giftVoucher.scratch': 'खुरचकर देखें!', 'giftVoucher.noVouchers': 'कोई वाउचर नहीं। पाठ्यक्रम पूरा करें!',
    'manuscripts.desc': 'अंतरिक्ष अन्वेषण की महानतम उपलब्धियां खोजें!',
    'qna.askAnything': 'अंतरिक्ष के बारे में कुछ भी पूछें...', 'qna.searching': 'खोज रहे हैं...', 'qna.ask': 'पूछें', 'qna.suggested': 'सुझाए गए प्रश्न',
    'account.createAccount': 'खाता बनाएं', 'account.guest': 'अतिथि खोजकर्ता', 'account.profile': 'आपकी प्रोफ़ाइल',
  },

  ar: {
    'nav.home': 'الرئيسية', 'nav.solarSystem': 'المجموعة الشمسية', 'nav.timeline': 'الجدول الزمني', 'nav.constellations': 'الأبراج', 'nav.library': 'المكتبة', 'nav.games': 'الألعاب', 'nav.subscriptions': 'الاشتراكات', 'nav.funFacts': 'حقائق ممتعة', 'nav.about': 'حول', 'nav.startJourney': 'ابدأ رحلتك', 'nav.cosmicClassroom': 'الفصل الكوني',
    'hero.badge': 'للمستكشفين الصغار من 7 إلى 13 سنة', 'hero.welcome': 'مرحباً بك في', 'hero.cosmicClassroom': 'الفصل الكوني', 'hero.subtitle': 'استكشف كل ركن من أركان الكون! 🚀', 'hero.startJourney': 'ابدأ رحلتك الفضائية', 'hero.takeQuiz': 'قم بالاختبار',
    'hero.solarSystem': 'المجموعة الشمسية', 'hero.solarSystemDesc': 'استكشف الكواكب والأقمار والكويكبات', 'hero.starsNebulas': 'النجوم والسدم', 'hero.starsNebulasDesc': 'اكتشف أنواع النجوم والمستعرات', 'hero.galaxiesBeyond': 'المجرات وما بعدها', 'hero.galaxiesBeyondDesc': 'سافر عبر المجرات والثقوب السوداء',
    'section.dailyFact': 'حقيقة فضائية يومية', 'section.spaceQnA': 'أسئلة وأجوبة فضائية', 'section.spaceQnADesc': 'اسأل أي شيء عن الفضاء!', 'section.celestialExplorer': 'المستكشف السماوي', 'section.spaceTimeline': 'الجدول الزمني الفضائي', 'section.constellations': 'الأبراج',
    'section.courses': 'دورات فضائية', 'section.coursesDesc': 'أكمل الدورات مع فيديوهات وكتب!', 'section.giftVouchers': 'قسائم الهدايا', 'section.manuscripts': 'مخطوطات فضائية',
    'section.library': '📚 المكتبة السماوية', 'section.libraryDesc': 'شاهد فيديوهات واقرأ كتباً واستمع لكتب صوتية!', 'section.games': '🎮 ألعاب واختبارات', 'section.gamesDesc': 'اختبر معرفتك الفضائية بألعاب تفاعلية!',
    'section.premiumGames': 'ألعاب مميزة', 'section.gamePass': 'بطاقة الألعاب', 'section.shop': 'متجر الفضاء', 'section.trophyCabinet': 'خزانة الجوائز', 'section.trophyCabinetDesc': 'مجموعتك من الإنجازات والشهادات!',
    'section.subscriptions': 'الاشتراكات', 'section.funFacts': 'حقائق ممتعة', 'section.about': '✨ حول الفصل الكوني', 'section.aboutMission': 'مهمتنا',
    'section.aboutMissionDesc': 'الفصل الكوني يثير الفضول حول الكون!', 'section.aboutMissionDesc2': 'من الكواكب إلى المجرات البعيدة — هناك الكثير لاستكشافه!',
    'common.learn': 'تعلم', 'common.play': 'العب', 'common.explore': 'استكشف', 'common.learnDesc': 'اكتشف حقائق عن كل جسم سماوي.', 'common.playDesc': 'اختبر معرفتك باختبارات ممتعة!', 'common.exploreDesc': 'شاهد فيديوهات واقرأ كتباً للمستكشفين.',
    'common.videos': 'فيديوهات', 'common.books': 'كتب', 'common.audiobooks': 'كتب صوتية', 'common.all': 'الكل', 'common.close': 'إغلاق', 'common.back': 'رجوع', 'common.next': 'التالي', 'common.previous': 'السابق', 'common.readNow': 'اقرأ الآن', 'common.watchNow': 'شاهد الآن', 'common.listenNow': 'استمع الآن',
    'common.noAchievements': 'لا إنجازات بعد', 'common.noAchievementsDesc': 'أكمل الدورات والألعاب لكسب الإنجازات!', 'common.totalAchievements': 'إجمالي الإنجازات', 'common.earnedOn': 'حصل عليها في', 'common.locked': 'مقفل',
    'common.coins': 'عملات', 'common.new': 'جديد', 'common.buy': 'شراء', 'common.purchased': 'تم الشراء',
    'footer.tagline': 'جعل استكشاف الفضاء ممتعاً! 🚀', 'footer.explore': 'استكشف', 'footer.learnPlay': 'تعلم والعب', 'footer.resources': 'موارد', 'footer.universeExplorer': 'مستكشف الكون', 'footer.celestialLibrary': 'المكتبة السماوية', 'footer.quizzes': 'اختبارات', 'footer.forParents': 'للآباء والمعلمين', 'footer.contact': 'اتصل بنا', 'footer.privacy': 'سياسة الخصوصية', 'footer.madeWith': 'صنع بـ', 'footer.copyright': '© 2024 الفصل الكوني. استمر في استكشاف النجوم! ✨',
    'games.quiz': 'اختبار', 'games.sizeCompare': 'مقارنة الأحجام', 'games.rocketShooter': 'قاذف الصواريخ', 'games.memoryMatch': 'تطابق الذاكرة', 'games.wordScramble': 'خلط الكلمات', 'games.rocketMath': 'رياضيات الصواريخ',
    'library.videos': 'فيديوهات', 'library.books': 'كتب', 'library.audiobooks': 'كتب صوتية',
    'courses.spaceCourses': 'دورات فضائية', 'courses.backToCourses': '← العودة للدورات', 'courses.claimCertificate': 'احصل على الشهادة', 'courses.takeQuiz': 'قم بالاختبار', 'courses.restartCourse': 'إعادة البدء', 'courses.progress': 'التقدم', 'courses.learningGoals': 'أهداف التعلم', 'courses.coursePlan': 'خطة الدورة', 'courses.plan': 'خطة',
    'about.planetsMoons': 'كواكب وأقمار', 'about.starsNebulas': 'نجوم وسدم', 'about.galaxies': 'مجرات', 'about.booksVideos': 'كتب وفيديوهات',
    'language.select': 'اللغة', 'tts.readAloud': 'اقرأ بصوت عالٍ', 'tts.stopReading': 'توقف', 'tts.readPage': 'اقرأ محتوى الصفحة',
    'explorer.title': '🔭 مستكشف الكون', 'explorer.desc': 'انقر على أي جسم سماوي لمعرفة المزيد!', 'explorer.anyDistance': '📍 أي مسافة', 'explorer.near': '🏠 قريب', 'explorer.far': '🚀 بعيد', 'explorer.noResults': 'لم يتم العثور على أجسام سماوية.', 'explorer.adjustFilters': 'جرب تعديل الفلاتر!',
    'timeline.title': 'رحلة عبر الزمن', 'timeline.desc': 'سافر من الانفجار العظيم حتى اليوم!', 'timeline.allEvents': '🌟 كل الأحداث',
    'constellation.title': '✨ عارض الأبراج ✨', 'constellation.desc': 'انقر على برج لاكتشاف قصته!', 'constellation.starMap': 'خريطة نجوم تفاعلية', 'constellation.selectToView': 'اختر برجاً',
    'dailyFact.subtitle': 'شيء جديد كل يوم!', 'dailyFact.newFact': 'حقيقة جديدة', 'dailyFact.share': 'شارك', 'dailyFact.comeBack': 'عد غداً لحقيقة جديدة!',
    'funFacts.desc': 'انقر على البطاقات لكشف حقائق مذهلة!', 'funFacts.tapCards': 'انقر للكشف!', 'funFacts.randomFact': 'حقيقة عشوائية!',
    'shop.desc': 'أنفق عملاتك على التعزيزات والمستحضرات!', 'shop.boosts': '⚡ تعزيزات', 'shop.cosmetics': '🎨 مستحضرات', 'shop.utilities': '🔧 أدوات', 'shop.popular': 'شائع',
    'subscription.desc': 'افتح الميزات المميزة!', 'subscription.current': 'الخطة الحالية', 'subscription.purchase': 'شراء', 'subscription.dailyBonus': 'المكافأة اليومية', 'subscription.claimBonus': 'احصل على المكافأة', 'subscription.expired': 'منتهي', 'subscription.daysLeft': 'أيام متبقية',
    'gamePass.desc': 'افتح قوى اللعب الخاصة!', 'gamePass.active': 'نشط',
    'premiumGames.desc': 'ألعاب حصرية بمكافآت رائعة!',
    'giftVoucher.desc': 'اخدش قسائمك للكشف عن المكافآت!', 'giftVoucher.scratch': 'اخدش للكشف!', 'giftVoucher.noVouchers': 'لا قسائم. أكمل الدورات!',
    'manuscripts.desc': 'استكشف أعظم إنجازات استكشاف الفضاء!',
    'qna.askAnything': 'اسأل أي شيء عن الفضاء...', 'qna.searching': 'بحث...', 'qna.ask': 'اسأل', 'qna.suggested': 'أسئلة مقترحة',
    'account.createAccount': 'إنشاء حساب', 'account.guest': 'مستكشف ضيف', 'account.profile': 'ملفك الشخصي',
  },

  tr: {
    'nav.home': 'Ana Sayfa', 'nav.solarSystem': 'Güneş Sistemi', 'nav.timeline': 'Zaman Çizelgesi', 'nav.constellations': 'Takımyıldızlar', 'nav.library': 'Kütüphane', 'nav.games': 'Oyunlar', 'nav.subscriptions': 'Abonelikler', 'nav.funFacts': 'İlginç Bilgiler', 'nav.about': 'Hakkında', 'nav.startJourney': 'Yolculuğunu Başlat', 'nav.cosmicClassroom': 'Kozmik Sınıf',
    'hero.badge': '7-13 yaş arası genç kaşifler için', 'hero.welcome': 'Hoş geldiniz', 'hero.cosmicClassroom': 'Kozmik Sınıf', 'hero.subtitle': 'Evrenin her köşesini keşfet! 🚀', 'hero.startJourney': 'Uzay Yolculuğuna Başla', 'hero.takeQuiz': 'Quiz Yap',
    'hero.solarSystem': 'Güneş Sistemi', 'hero.solarSystemDesc': 'Gezegenleri, uyduları ve kuyruklu yıldızları keşfet', 'hero.starsNebulas': 'Yıldızlar ve Bulutsular', 'hero.starsNebulasDesc': 'Yıldız türlerini ve süpernovalari keşfet', 'hero.galaxiesBeyond': 'Galaksiler ve Ötesi', 'hero.galaxiesBeyondDesc': 'Galaksiler ve kara delikler arasında yolculuk',
    'section.dailyFact': 'Günün Uzay Gerçeği', 'section.spaceQnA': 'Uzay Soru-Cevap', 'section.spaceQnADesc': 'Uzay hakkında her şeyi sor!', 'section.celestialExplorer': 'Gökyüzü Kaşifi', 'section.spaceTimeline': 'Uzay Zaman Çizelgesi', 'section.constellations': 'Takımyıldızlar',
    'section.courses': 'Uzay Kursları', 'section.coursesDesc': 'Video, kitap ve sesli kitaplarla kursları tamamla!', 'section.giftVouchers': 'Hediye Kuponları', 'section.manuscripts': 'Uzay El Yazmaları',
    'section.library': '📚 Göksel Kütüphane', 'section.libraryDesc': 'Video izle, kitap oku ve sesli kitap dinle!', 'section.games': '🎮 Oyunlar ve Quizler', 'section.gamesDesc': 'İnteraktif oyunlarla uzay bilgini test et!',
    'section.premiumGames': 'Premium Oyunlar', 'section.gamePass': 'Oyun Kartı', 'section.shop': 'Uzay Mağazası', 'section.trophyCabinet': 'Kupa Dolabı', 'section.trophyCabinetDesc': 'Başarı ve sertifika koleksiyonun!',
    'section.subscriptions': 'Abonelikler', 'section.funFacts': 'İlginç Bilgiler', 'section.about': '✨ Kozmik Sınıf Hakkında', 'section.aboutMission': 'Misyonumuz',
    'section.aboutMissionDesc': 'Kozmik Sınıf evrene olan merakı uyandırır!', 'section.aboutMissionDesc2': 'Gezegenlerden uzak galaksilere — keşfedecek çok şey var!',
    'common.learn': 'Öğren', 'common.play': 'Oyna', 'common.explore': 'Keşfet', 'common.learnDesc': 'Her gök cismi hakkında ilginç bilgiler keşfet.', 'common.playDesc': 'Eğlenceli quizlerle bilgini test et!', 'common.exploreDesc': 'Genç kaşifler için videolar ve kitaplar.',
    'common.videos': 'Videolar', 'common.books': 'Kitaplar', 'common.audiobooks': 'Sesli Kitaplar', 'common.all': 'Hepsi', 'common.close': 'Kapat', 'common.back': 'Geri', 'common.next': 'Sonraki', 'common.previous': 'Önceki', 'common.readNow': 'Şimdi Oku', 'common.watchNow': 'Şimdi İzle', 'common.listenNow': 'Şimdi Dinle',
    'common.noAchievements': 'Henüz Başarı Yok', 'common.noAchievementsDesc': 'Kursları ve oyunları tamamlayarak başarı kazan!', 'common.totalAchievements': 'Toplam Başarılar', 'common.earnedOn': 'Kazanıldı', 'common.locked': 'Kilitli',
    'common.coins': 'Jeton', 'common.new': 'YENİ', 'common.buy': 'Satın Al', 'common.purchased': 'Satın Alındı',
    'footer.tagline': 'Uzay keşfini eğlenceli yapıyoruz! 🚀', 'footer.explore': 'Keşfet', 'footer.learnPlay': 'Öğren ve Oyna', 'footer.resources': 'Kaynaklar', 'footer.universeExplorer': 'Evren Kaşifi', 'footer.celestialLibrary': 'Göksel Kütüphane', 'footer.quizzes': 'Quizler', 'footer.forParents': 'Ebeveynler ve Öğretmenler İçin', 'footer.contact': 'İletişim', 'footer.privacy': 'Gizlilik Politikası', 'footer.madeWith': 'Yapıldı', 'footer.copyright': '© 2024 Kozmik Sınıf. Yıldızları keşfetmeye devam! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Boyut Karşılaştır', 'games.rocketShooter': 'Roket Atıcı', 'games.memoryMatch': 'Hafıza', 'games.wordScramble': 'Kelime Bulmaca', 'games.rocketMath': 'Roket Matematik',
    'library.videos': 'Videolar', 'library.books': 'Kitaplar', 'library.audiobooks': 'Sesli Kitaplar',
    'courses.spaceCourses': 'Uzay Kursları', 'courses.backToCourses': '← Kurslara Dön', 'courses.claimCertificate': 'Sertifika Al', 'courses.takeQuiz': 'Quiz Yap', 'courses.restartCourse': 'Yeniden Başlat', 'courses.progress': 'İlerleme', 'courses.learningGoals': 'Öğrenme Hedefleri', 'courses.coursePlan': 'Kurs Planı', 'courses.plan': 'Plan',
    'about.planetsMoons': 'Gezegenler ve Uydular', 'about.starsNebulas': 'Yıldızlar ve Bulutsular', 'about.galaxies': 'Galaksiler', 'about.booksVideos': 'Kitaplar ve Videolar',
    'language.select': 'Dil', 'tts.readAloud': 'Sesli Oku', 'tts.stopReading': 'Durdur', 'tts.readPage': 'Sayfa içeriğini oku',
    'explorer.title': '🔭 Evren Kaşifi', 'explorer.desc': 'Herhangi bir gök cismini tıklayarak daha fazla öğren!', 'explorer.anyDistance': '📍 Herhangi Bir Mesafe', 'explorer.near': '🏠 Yakın', 'explorer.far': '🚀 Uzak', 'explorer.noResults': 'Gök cismi bulunamadı.', 'explorer.adjustFilters': 'Filtreleri ayarlamayı dene!',
    'timeline.title': 'Zamanda Yolculuk', 'timeline.desc': 'Büyük Patlama\'dan bugüne! En harika kozmik anları keşfet.', 'timeline.allEvents': '🌟 Tüm Olaylar',
    'constellation.title': '✨ Takımyıldız Görüntüleyici ✨', 'constellation.desc': 'Bir takımyıldıza tıklayarak hikayesini keşfet!', 'constellation.starMap': 'İnteraktif Yıldız Haritası', 'constellation.selectToView': 'Bir takımyıldız seç',
    'dailyFact.subtitle': 'Her gün yeni bir şey öğren!', 'dailyFact.newFact': 'Yeni Bilgi', 'dailyFact.share': 'Paylaş', 'dailyFact.comeBack': 'Yarın yeni bilgi için geri gel!',
    'funFacts.desc': 'Kartlara dokunarak harika gerçekleri keşfet!', 'funFacts.tapCards': 'Dokunarak keşfet!', 'funFacts.randomFact': 'Rastgele Bilgi!',
    'shop.desc': 'Jetonlarını güçlendirmeler ve kozmetikler için harca!', 'shop.boosts': '⚡ Güçlendirmeler', 'shop.cosmetics': '🎨 Kozmetikler', 'shop.utilities': '🔧 Araçlar', 'shop.popular': 'Popüler',
    'subscription.desc': 'Premium özellikleri aç!', 'subscription.current': 'Mevcut Plan', 'subscription.purchase': 'Satın Al', 'subscription.dailyBonus': 'Günlük Bonus', 'subscription.claimBonus': 'Bonus Al', 'subscription.expired': 'Süresi Dolmuş', 'subscription.daysLeft': 'gün kaldı',
    'gamePass.desc': 'Özel oyun güçlerini aç!', 'gamePass.active': 'Aktif',
    'premiumGames.desc': 'Harika ödüllü özel oyunlar!',
    'giftVoucher.desc': 'Hediye kuponlarını kazıyarak ödül kazan!', 'giftVoucher.scratch': 'Kazıyarak Bul!', 'giftVoucher.noVouchers': 'Kupon yok. Kursları tamamla!',
    'manuscripts.desc': 'Uzay keşfinin en büyük başarılarını keşfet!',
    'qna.askAnything': 'Uzay hakkında her şeyi sor...', 'qna.searching': 'Aranıyor...', 'qna.ask': 'Sor', 'qna.suggested': 'Önerilen Sorular',
    'account.createAccount': 'Hesap Oluştur', 'account.guest': 'Misafir Kaşif', 'account.profile': 'Profilin',
  },

  nl: {
    'nav.home': 'Home', 'nav.solarSystem': 'Zonnestelsel', 'nav.timeline': 'Tijdlijn', 'nav.constellations': 'Sterrenbeelden', 'nav.library': 'Bibliotheek', 'nav.games': 'Spellen', 'nav.subscriptions': 'Abonnementen', 'nav.funFacts': 'Leuke Weetjes', 'nav.about': 'Over', 'nav.startJourney': 'Begin je Reis', 'nav.cosmicClassroom': 'Kosmisch Klaslokaal',
    'hero.badge': 'Voor jonge ontdekkers van 7-13 jaar', 'hero.welcome': 'Welkom bij', 'hero.cosmicClassroom': 'Kosmisch Klaslokaal', 'hero.subtitle': 'Verken elke hoek van het Universum! 🚀', 'hero.startJourney': 'Begin je Ruimtereis', 'hero.takeQuiz': 'Doe een Quiz',
    'hero.solarSystem': 'Zonnestelsel', 'hero.solarSystemDesc': 'Verken planeten, manen en kometen', 'hero.starsNebulas': 'Sterren en Nevels', 'hero.starsNebulasDesc': 'Ontdek stertypen en supernova\'s', 'hero.galaxiesBeyond': 'Sterrenstelsels en Verder', 'hero.galaxiesBeyondDesc': 'Reis door sterrenstelsels en zwarte gaten',
    'section.dailyFact': 'Dagelijks Ruimtefeit', 'section.spaceQnA': 'Ruimte Vragen', 'section.spaceQnADesc': 'Vraag alles over de ruimte!', 'section.celestialExplorer': 'Hemelverkenner', 'section.spaceTimeline': 'Ruimte Tijdlijn', 'section.constellations': 'Sterrenbeelden',
    'section.courses': 'Ruimtecursussen', 'section.coursesDesc': 'Voltooi cursussen met video\'s, boeken en audioboeken!', 'section.giftVouchers': 'Cadeaubonnen', 'section.manuscripts': 'Ruimte Manuscripten',
    'section.library': '📚 Hemelse Bibliotheek', 'section.libraryDesc': 'Bekijk video\'s, lees boeken en luister naar audioboeken!', 'section.games': '🎮 Spellen en Quiz', 'section.gamesDesc': 'Test je ruimtekennis met interactieve spellen!',
    'section.premiumGames': 'Premium Spellen', 'section.gamePass': 'Spelenpas', 'section.shop': 'Ruimtewinkel', 'section.trophyCabinet': 'Trofeeënkast', 'section.trophyCabinetDesc': 'Je verzameling van prestaties en certificaten!',
    'section.subscriptions': 'Abonnementen', 'section.funFacts': 'Leuke Weetjes', 'section.about': '✨ Over Kosmisch Klaslokaal', 'section.aboutMission': 'Onze Missie',
    'section.aboutMissionDesc': 'Kosmisch Klaslokaal wekt nieuwsgierigheid over het universum!', 'section.aboutMissionDesc2': 'Van planeten tot verre sterrenstelsels — er is zoveel te ontdekken!',
    'common.learn': 'Leren', 'common.play': 'Spelen', 'common.explore': 'Verkennen', 'common.learnDesc': 'Ontdek feiten over elk hemellichaam.', 'common.playDesc': 'Test je kennis met leuke quizzen!', 'common.exploreDesc': 'Bekijk video\'s en lees boeken voor jonge ontdekkers.',
    'common.videos': 'Video\'s', 'common.books': 'Boeken', 'common.audiobooks': 'Audioboeken', 'common.all': 'Alle', 'common.close': 'Sluiten', 'common.back': 'Terug', 'common.next': 'Volgende', 'common.previous': 'Vorige', 'common.readNow': 'Nu Lezen', 'common.watchNow': 'Nu Bekijken', 'common.listenNow': 'Nu Luisteren',
    'common.noAchievements': 'Nog Geen Prestaties', 'common.noAchievementsDesc': 'Voltooi cursussen en spellen voor prestaties!', 'common.totalAchievements': 'Totale Prestaties', 'common.earnedOn': 'Verdiend op', 'common.locked': 'Vergrendeld',
    'common.coins': 'Munten', 'common.new': 'NIEUW', 'common.buy': 'Kopen', 'common.purchased': 'Gekocht',
    'footer.tagline': 'Ruimteverkenning leuk maken! 🚀', 'footer.explore': 'Verkennen', 'footer.learnPlay': 'Leren en Spelen', 'footer.resources': 'Bronnen', 'footer.universeExplorer': 'Universumverkenner', 'footer.celestialLibrary': 'Hemelse Bibliotheek', 'footer.quizzes': 'Quizzen', 'footer.forParents': 'Voor Ouders en Leraren', 'footer.contact': 'Contact', 'footer.privacy': 'Privacybeleid', 'footer.madeWith': 'Gemaakt met', 'footer.copyright': '© 2024 Kosmisch Klaslokaal. Blijf de sterren verkennen! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Grootte Vergelijken', 'games.rocketShooter': 'Raketschutter', 'games.memoryMatch': 'Geheugen', 'games.wordScramble': 'Woordpuzzel', 'games.rocketMath': 'Raket Wiskunde',
    'library.videos': 'Video\'s', 'library.books': 'Boeken', 'library.audiobooks': 'Audioboeken',
    'courses.spaceCourses': 'Ruimtecursussen', 'courses.backToCourses': '← Terug naar Cursussen', 'courses.claimCertificate': 'Certificaat Claimen', 'courses.takeQuiz': 'Quiz Doen', 'courses.restartCourse': 'Opnieuw Starten', 'courses.progress': 'Voortgang', 'courses.learningGoals': 'Leerdoelen', 'courses.coursePlan': 'Cursusplan', 'courses.plan': 'Plan',
    'about.planetsMoons': 'Planeten en Manen', 'about.starsNebulas': 'Sterren en Nevels', 'about.galaxies': 'Sterrenstelsels', 'about.booksVideos': 'Boeken en Video\'s',
    'language.select': 'Taal', 'tts.readAloud': 'Voorlezen', 'tts.stopReading': 'Stoppen', 'tts.readPage': 'Pagina-inhoud voorlezen',
    'explorer.title': '🔭 Universumverkenner', 'explorer.desc': 'Klik op een hemellichaam voor meer info!', 'explorer.anyDistance': '📍 Elke Afstand', 'explorer.near': '🏠 Dichtbij', 'explorer.far': '🚀 Ver', 'explorer.noResults': 'Geen hemellichamen gevonden.', 'explorer.adjustFilters': 'Probeer de filters aan te passen!',
    'timeline.title': 'Reis Door de Tijd', 'timeline.desc': 'Reis van de Oerknal tot vandaag!', 'timeline.allEvents': '🌟 Alle Gebeurtenissen',
    'constellation.title': '✨ Sterrenbeeldviewer ✨', 'constellation.desc': 'Klik op een sterrenbeeld voor het verhaal!', 'constellation.starMap': 'Interactieve Sterrenkaart', 'constellation.selectToView': 'Selecteer een sterrenbeeld',
    'dailyFact.subtitle': 'Elke dag iets nieuws!', 'dailyFact.newFact': 'Nieuw Feit', 'dailyFact.share': 'Delen', 'dailyFact.comeBack': 'Kom morgen terug voor een nieuw feit!',
    'funFacts.desc': 'Tik op de kaarten voor verbazingwekkende feiten!', 'funFacts.tapCards': 'Tik om te onthullen!', 'funFacts.randomFact': 'Willekeurig Feit!',
    'shop.desc': 'Besteed je munten aan boosts en cosmetica!', 'shop.boosts': '⚡ Boosts', 'shop.cosmetics': '🎨 Cosmetica', 'shop.utilities': '🔧 Hulpmiddelen', 'shop.popular': 'Populair',
    'subscription.desc': 'Ontgrendel premium functies!', 'subscription.current': 'Huidig Plan', 'subscription.purchase': 'Kopen', 'subscription.dailyBonus': 'Dagelijkse Bonus', 'subscription.claimBonus': 'Bonus Claimen', 'subscription.expired': 'Verlopen', 'subscription.daysLeft': 'dagen over',
    'gamePass.desc': 'Ontgrendel speciale spelkrachten!', 'gamePass.active': 'Actief',
    'premiumGames.desc': 'Exclusieve spellen met geweldige beloningen!',
    'giftVoucher.desc': 'Kras je cadeaubonnen voor beloningen!', 'giftVoucher.scratch': 'Kras om te Onthullen!', 'giftVoucher.noVouchers': 'Geen bonnen. Voltooi cursussen!',
    'manuscripts.desc': 'Ontdek de grootste prestaties in ruimteverkenning!',
    'qna.askAnything': 'Vraag alles over de ruimte...', 'qna.searching': 'Zoeken...', 'qna.ask': 'Vraag', 'qna.suggested': 'Voorgestelde Vragen',
    'account.createAccount': 'Account Aanmaken', 'account.guest': 'Gast-Ontdekker', 'account.profile': 'Je Profiel',
  },

  pl: {
    'nav.home': 'Strona Główna', 'nav.solarSystem': 'Układ Słoneczny', 'nav.timeline': 'Oś Czasu', 'nav.constellations': 'Gwiazdozbiory', 'nav.library': 'Biblioteka', 'nav.games': 'Gry', 'nav.subscriptions': 'Subskrypcje', 'nav.funFacts': 'Ciekawostki', 'nav.about': 'O Nas', 'nav.startJourney': 'Rozpocznij Podróż', 'nav.cosmicClassroom': 'Kosmiczna Klasa',
    'hero.badge': 'Dla młodych odkrywców w wieku 7-13 lat', 'hero.welcome': 'Witaj w', 'hero.cosmicClassroom': 'Kosmiczna Klasa', 'hero.subtitle': 'Odkryj każdy zakątek Wszechświata! 🚀', 'hero.startJourney': 'Rozpocznij Kosmiczną Podróż', 'hero.takeQuiz': 'Rozwiąż Quiz',
    'hero.solarSystem': 'Układ Słoneczny', 'hero.solarSystemDesc': 'Odkryj planety, księżyce i komety', 'hero.starsNebulas': 'Gwiazdy i Mgławice', 'hero.starsNebulasDesc': 'Poznaj typy gwiazd i supernowe', 'hero.galaxiesBeyond': 'Galaktyki i Dalej', 'hero.galaxiesBeyondDesc': 'Podróżuj przez galaktyki i czarne dziury',
    'section.dailyFact': 'Kosmiczny Fakt Dnia', 'section.spaceQnA': 'Pytania i Odpowiedzi', 'section.spaceQnADesc': 'Zapytaj o cokolwiek o kosmosie!', 'section.celestialExplorer': 'Niebieski Odkrywca', 'section.spaceTimeline': 'Kosmiczna Oś Czasu', 'section.constellations': 'Gwiazdozbiory',
    'section.courses': 'Kursy Kosmiczne', 'section.coursesDesc': 'Ukończ kursy z filmami, książkami i audiobookami!', 'section.giftVouchers': 'Bony Podarunkowe', 'section.manuscripts': 'Kosmiczne Rękopisy',
    'section.library': '📚 Niebiańska Biblioteka', 'section.libraryDesc': 'Oglądaj filmy, czytaj książki i słuchaj audiobooków!', 'section.games': '🎮 Gry i Quizy', 'section.gamesDesc': 'Sprawdź swoją wiedzę kosmiczną w grach!',
    'section.premiumGames': 'Gry Premium', 'section.gamePass': 'Karnet na Gry', 'section.shop': 'Kosmiczny Sklep', 'section.trophyCabinet': 'Gablota Trofeów', 'section.trophyCabinetDesc': 'Twoja kolekcja osiągnięć i certyfikatów!',
    'section.subscriptions': 'Subskrypcje', 'section.funFacts': 'Ciekawostki', 'section.about': '✨ O Kosmicznej Klasie', 'section.aboutMission': 'Nasza Misja',
    'section.aboutMissionDesc': 'Kosmiczna Klasa budzi ciekawość wszechświata!', 'section.aboutMissionDesc2': 'Od planet do dalekich galaktyk — jest tyle do odkrycia!',
    'common.learn': 'Ucz się', 'common.play': 'Graj', 'common.explore': 'Odkrywaj', 'common.learnDesc': 'Odkryj fakty o każdym ciele niebieskim.', 'common.playDesc': 'Sprawdź swoją wiedzę w quizach!', 'common.exploreDesc': 'Oglądaj filmy i czytaj książki dla młodych odkrywców.',
    'common.videos': 'Filmy', 'common.books': 'Książki', 'common.audiobooks': 'Audiobooki', 'common.all': 'Wszystko', 'common.close': 'Zamknij', 'common.back': 'Wstecz', 'common.next': 'Dalej', 'common.previous': 'Poprzedni', 'common.readNow': 'Czytaj Teraz', 'common.watchNow': 'Oglądaj Teraz', 'common.listenNow': 'Słuchaj Teraz',
    'common.noAchievements': 'Brak Osiągnięć', 'common.noAchievementsDesc': 'Ukończ kursy i gry, aby zdobyć osiągnięcia!', 'common.totalAchievements': 'Łączne Osiągnięcia', 'common.earnedOn': 'Zdobyte', 'common.locked': 'Zablokowane',
    'common.coins': 'Monety', 'common.new': 'NOWE', 'common.buy': 'Kup', 'common.purchased': 'Kupione',
    'footer.tagline': 'Eksploracja kosmosu na wesoło! 🚀', 'footer.explore': 'Odkrywaj', 'footer.learnPlay': 'Ucz się i Graj', 'footer.resources': 'Zasoby', 'footer.universeExplorer': 'Odkrywca Wszechświata', 'footer.celestialLibrary': 'Niebiańska Biblioteka', 'footer.quizzes': 'Quizy', 'footer.forParents': 'Dla Rodziców i Nauczycieli', 'footer.contact': 'Kontakt', 'footer.privacy': 'Polityka Prywatności', 'footer.madeWith': 'Stworzone z', 'footer.copyright': '© 2024 Kosmiczna Klasa. Odkrywaj gwiazdy! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Porównanie Rozmiarów', 'games.rocketShooter': 'Strzelec Rakietowy', 'games.memoryMatch': 'Pamięć', 'games.wordScramble': 'Literki', 'games.rocketMath': 'Rakietowa Matematyka',
    'library.videos': 'Filmy', 'library.books': 'Książki', 'library.audiobooks': 'Audiobooki',
    'courses.spaceCourses': 'Kursy Kosmiczne', 'courses.backToCourses': '← Wróć do Kursów', 'courses.claimCertificate': 'Odbierz Certyfikat', 'courses.takeQuiz': 'Rozwiąż Quiz', 'courses.restartCourse': 'Zacznij Od Nowa', 'courses.progress': 'Postęp', 'courses.learningGoals': 'Cele', 'courses.coursePlan': 'Plan Kursu', 'courses.plan': 'Plan',
    'about.planetsMoons': 'Planety i Księżyce', 'about.starsNebulas': 'Gwiazdy i Mgławice', 'about.galaxies': 'Galaktyki', 'about.booksVideos': 'Książki i Filmy',
    'language.select': 'Język', 'tts.readAloud': 'Czytaj Głośno', 'tts.stopReading': 'Zatrzymaj', 'tts.readPage': 'Przeczytaj treść strony',
    'explorer.title': '🔭 Odkrywca Wszechświata', 'explorer.desc': 'Kliknij na ciało niebieskie, aby dowiedzieć się więcej!', 'explorer.anyDistance': '📍 Dowolna Odległość', 'explorer.near': '🏠 Blisko', 'explorer.far': '🚀 Daleko', 'explorer.noResults': 'Nie znaleziono ciał niebieskich.', 'explorer.adjustFilters': 'Spróbuj zmienić filtry!',
    'timeline.title': 'Podróż w Czasie', 'timeline.desc': 'Od Wielkiego Wybuchu do dziś! Odkryj najciekawsze momenty.', 'timeline.allEvents': '🌟 Wszystkie Wydarzenia',
    'constellation.title': '✨ Przeglądarka Gwiazdozbiorów ✨', 'constellation.desc': 'Kliknij gwiazdozbiór, aby poznać jego historię!', 'constellation.starMap': 'Interaktywna Mapa Gwiazd', 'constellation.selectToView': 'Wybierz gwiazdozbiór',
    'dailyFact.subtitle': 'Coś nowego każdego dnia!', 'dailyFact.newFact': 'Nowy Fakt', 'dailyFact.share': 'Udostępnij', 'dailyFact.comeBack': 'Wróć jutro po nowy fakt!',
    'funFacts.desc': 'Dotknij kart, aby odkryć niesamowite fakty!', 'funFacts.tapCards': 'Dotknij, aby odkryć!', 'funFacts.randomFact': 'Losowy Fakt!',
    'shop.desc': 'Wydaj monety na ulepszenia i kosmetyki!', 'shop.boosts': '⚡ Ulepszenia', 'shop.cosmetics': '🎨 Kosmetyki', 'shop.utilities': '🔧 Narzędzia', 'shop.popular': 'Popularne',
    'subscription.desc': 'Odblokuj funkcje premium!', 'subscription.current': 'Aktualny Plan', 'subscription.purchase': 'Kup', 'subscription.dailyBonus': 'Dzienny Bonus', 'subscription.claimBonus': 'Odbierz Bonus', 'subscription.expired': 'Wygasło', 'subscription.daysLeft': 'dni pozostało',
    'gamePass.desc': 'Odblokuj specjalne moce gry!', 'gamePass.active': 'Aktywny',
    'premiumGames.desc': 'Ekskluzywne gry ze wspaniałymi nagrodami!',
    'giftVoucher.desc': 'Zdrapuj bony podarunkowe!', 'giftVoucher.scratch': 'Zdrap!', 'giftVoucher.noVouchers': 'Brak bonów. Ukończ kursy!',
    'manuscripts.desc': 'Odkryj największe osiągnięcia eksploracji kosmosu!',
    'qna.askAnything': 'Zapytaj o kosmosie...', 'qna.searching': 'Szukam...', 'qna.ask': 'Zapytaj', 'qna.suggested': 'Sugerowane Pytania',
    'account.createAccount': 'Utwórz Konto', 'account.guest': 'Gość-Odkrywca', 'account.profile': 'Twój Profil',
  },

  sv: {
    'nav.home': 'Hem', 'nav.solarSystem': 'Solsystemet', 'nav.timeline': 'Tidslinje', 'nav.constellations': 'Stjärnbilder', 'nav.library': 'Bibliotek', 'nav.games': 'Spel', 'nav.subscriptions': 'Prenumerationer', 'nav.funFacts': 'Roliga Fakta', 'nav.about': 'Om', 'nav.startJourney': 'Börja din Resa', 'nav.cosmicClassroom': 'Kosmiskt Klassrum',
    'hero.badge': 'För unga utforskare 7-13 år', 'hero.welcome': 'Välkommen till', 'hero.cosmicClassroom': 'Kosmiskt Klassrum', 'hero.subtitle': 'Utforska varje hörn av Universum! 🚀', 'hero.startJourney': 'Börja din Rymdresa', 'hero.takeQuiz': 'Gör ett Quiz',
    'hero.solarSystem': 'Solsystemet', 'hero.solarSystemDesc': 'Utforska planeter, månar och kometer', 'hero.starsNebulas': 'Stjärnor och Nebulosor', 'hero.starsNebulasDesc': 'Upptäck stjärntyper och supernovor', 'hero.galaxiesBeyond': 'Galaxer och Bortom', 'hero.galaxiesBeyondDesc': 'Res genom galaxer och svarta hål',
    'section.dailyFact': 'Dagens Rymdfakta', 'section.spaceQnA': 'Rymdfrågor', 'section.spaceQnADesc': 'Fråga vad som helst om rymden!', 'section.celestialExplorer': 'Himmelsutforskare', 'section.spaceTimeline': 'Rymdtidslinje', 'section.constellations': 'Stjärnbilder',
    'section.courses': 'Rymdkurser', 'section.coursesDesc': 'Slutför kurser med videor, böcker och ljudböcker!', 'section.giftVouchers': 'Presentkort', 'section.manuscripts': 'Rymdmanuskript',
    'section.library': '📚 Himmelskt Bibliotek', 'section.libraryDesc': 'Titta på videor, läs böcker och lyssna på ljudböcker!', 'section.games': '🎮 Spel och Quiz', 'section.gamesDesc': 'Testa din rymdkunskap med interaktiva spel!',
    'section.premiumGames': 'Premiumspel', 'section.gamePass': 'Spelpass', 'section.shop': 'Rymdbutik', 'section.trophyCabinet': 'Troféskåp', 'section.trophyCabinetDesc': 'Din samling av prestationer och certifikat!',
    'section.subscriptions': 'Prenumerationer', 'section.funFacts': 'Roliga Fakta', 'section.about': '✨ Om Kosmiskt Klassrum', 'section.aboutMission': 'Vårt Uppdrag',
    'section.aboutMissionDesc': 'Kosmiskt Klassrum väcker nyfikenhet om universum!', 'section.aboutMissionDesc2': 'Från planeter till avlägsna galaxer — det finns så mycket att utforska!',
    'common.learn': 'Lär dig', 'common.play': 'Spela', 'common.explore': 'Utforska', 'common.learnDesc': 'Upptäck fakta om varje himmelskropp.', 'common.playDesc': 'Testa dina kunskaper med roliga quiz!', 'common.exploreDesc': 'Titta på videor och läs böcker för unga utforskare.',
    'common.videos': 'Videor', 'common.books': 'Böcker', 'common.audiobooks': 'Ljudböcker', 'common.all': 'Alla', 'common.close': 'Stäng', 'common.back': 'Tillbaka', 'common.next': 'Nästa', 'common.previous': 'Föregående', 'common.readNow': 'Läs Nu', 'common.watchNow': 'Titta Nu', 'common.listenNow': 'Lyssna Nu',
    'common.noAchievements': 'Inga Prestationer Ännu', 'common.noAchievementsDesc': 'Slutför kurser och spel för att få prestationer!', 'common.totalAchievements': 'Totala Prestationer', 'common.earnedOn': 'Intjänad', 'common.locked': 'Låst',
    'common.coins': 'Mynt', 'common.new': 'NYTT', 'common.buy': 'Köp', 'common.purchased': 'Köpt',
    'footer.tagline': 'Gör rymdutforskning roligt! 🚀', 'footer.explore': 'Utforska', 'footer.learnPlay': 'Lär och Spela', 'footer.resources': 'Resurser', 'footer.universeExplorer': 'Universumutforskare', 'footer.celestialLibrary': 'Himmelskt Bibliotek', 'footer.quizzes': 'Quiz', 'footer.forParents': 'För Föräldrar och Lärare', 'footer.contact': 'Kontakt', 'footer.privacy': 'Integritetspolicy', 'footer.madeWith': 'Gjord med', 'footer.copyright': '© 2024 Kosmiskt Klassrum. Utforska stjärnorna! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Storleksjämförelse', 'games.rocketShooter': 'Raketkastare', 'games.memoryMatch': 'Minne', 'games.wordScramble': 'Ordpussel', 'games.rocketMath': 'Raketmatte',
    'library.videos': 'Videor', 'library.books': 'Böcker', 'library.audiobooks': 'Ljudböcker',
    'courses.spaceCourses': 'Rymdkurser', 'courses.backToCourses': '← Tillbaka till Kurser', 'courses.claimCertificate': 'Hämta Certifikat', 'courses.takeQuiz': 'Gör Quiz', 'courses.restartCourse': 'Starta Om', 'courses.progress': 'Framsteg', 'courses.learningGoals': 'Lärandemål', 'courses.coursePlan': 'Kursplan', 'courses.plan': 'Plan',
    'about.planetsMoons': 'Planeter och Månar', 'about.starsNebulas': 'Stjärnor och Nebulosor', 'about.galaxies': 'Galaxer', 'about.booksVideos': 'Böcker och Videor',
    'language.select': 'Språk', 'tts.readAloud': 'Läs Högt', 'tts.stopReading': 'Stoppa', 'tts.readPage': 'Läs sidans innehåll',
    'explorer.title': '🔭 Universumutforskare', 'explorer.desc': 'Klicka på en himmelskropp för att lära dig mer!', 'explorer.anyDistance': '📍 Valfritt Avstånd', 'explorer.near': '🏠 Nära', 'explorer.far': '🚀 Långt', 'explorer.noResults': 'Inga himmelskroppar hittades.', 'explorer.adjustFilters': 'Prova att justera filtren!',
    'timeline.title': 'Resa Genom Tiden', 'timeline.desc': 'Res från Big Bang till idag!', 'timeline.allEvents': '🌟 Alla Händelser',
    'constellation.title': '✨ Stjärnbildsvisare ✨', 'constellation.desc': 'Klicka på en stjärnbild för att upptäcka dess historia!', 'constellation.starMap': 'Interaktiv Stjärnkarta', 'constellation.selectToView': 'Välj en stjärnbild',
    'dailyFact.subtitle': 'Något nytt varje dag!', 'dailyFact.newFact': 'Nytt Faktum', 'dailyFact.share': 'Dela', 'dailyFact.comeBack': 'Kom tillbaka imorgon!',
    'funFacts.desc': 'Tryck på korten för att avslöja fantastiska fakta!', 'funFacts.tapCards': 'Tryck för att avslöja!', 'funFacts.randomFact': 'Slumpmässigt Faktum!',
    'shop.desc': 'Spendera mynt på förstärkningar och kosmetik!', 'shop.boosts': '⚡ Förstärkningar', 'shop.cosmetics': '🎨 Kosmetik', 'shop.utilities': '🔧 Verktyg', 'shop.popular': 'Populärt',
    'subscription.desc': 'Lås upp premiumfunktioner!', 'subscription.current': 'Nuvarande Plan', 'subscription.purchase': 'Köp', 'subscription.dailyBonus': 'Daglig Bonus', 'subscription.claimBonus': 'Hämta Bonus', 'subscription.expired': 'Utgånget', 'subscription.daysLeft': 'dagar kvar',
    'gamePass.desc': 'Lås upp speciella spelkrafter!', 'gamePass.active': 'Aktiv',
    'premiumGames.desc': 'Exklusiva spel med fantastiska belöningar!',
    'giftVoucher.desc': 'Skrapa dina presentkort för belöningar!', 'giftVoucher.scratch': 'Skrapa!', 'giftVoucher.noVouchers': 'Inga kort. Slutför kurser!',
    'manuscripts.desc': 'Utforska rymdforskningens största prestationer!',
    'qna.askAnything': 'Fråga om rymden...', 'qna.searching': 'Söker...', 'qna.ask': 'Fråga', 'qna.suggested': 'Föreslagna Frågor',
    'account.createAccount': 'Skapa Konto', 'account.guest': 'Gästutforskare', 'account.profile': 'Din Profil',
  },

  th: {
    'nav.home': 'หน้าแรก', 'nav.solarSystem': 'ระบบสุริยะ', 'nav.timeline': 'ไทม์ไลน์', 'nav.constellations': 'กลุ่มดาว', 'nav.library': 'ห้องสมุด', 'nav.games': 'เกม', 'nav.subscriptions': 'สมาชิก', 'nav.funFacts': 'ความรู้สนุก', 'nav.about': 'เกี่ยวกับ', 'nav.startJourney': 'เริ่มการเดินทาง', 'nav.cosmicClassroom': 'ห้องเรียนจักรวาล',
    'hero.badge': 'สำหรับนักสำรวจรุ่นเยาว์อายุ 7-13 ปี', 'hero.welcome': 'ยินดีต้อนรับสู่', 'hero.cosmicClassroom': 'ห้องเรียนจักรวาล', 'hero.subtitle': 'สำรวจทุกมุมของจักรวาล! 🚀', 'hero.startJourney': 'เริ่มการเดินทางอวกาศ', 'hero.takeQuiz': 'ทำแบบทดสอบ',
    'hero.solarSystem': 'ระบบสุริยะ', 'hero.solarSystemDesc': 'สำรวจดาวเคราะห์ ดวงจันทร์ และดาวหาง', 'hero.starsNebulas': 'ดาวฤกษ์และเนบิวลา', 'hero.starsNebulasDesc': 'ค้นพบประเภทดาวฤกษ์และซูเปอร์โนวา', 'hero.galaxiesBeyond': 'กาแลกซีและไกลออกไป', 'hero.galaxiesBeyondDesc': 'เดินทางผ่านกาแลกซีและหลุมดำ',
    'section.dailyFact': 'ความรู้อวกาศประจำวัน', 'section.spaceQnA': 'ถาม-ตอบอวกาศ', 'section.spaceQnADesc': 'ถามอะไรก็ได้เกี่ยวกับอวกาศ!', 'section.celestialExplorer': 'นักสำรวจท้องฟ้า', 'section.spaceTimeline': 'ไทม์ไลน์อวกาศ', 'section.constellations': 'กลุ่มดาว',
    'section.courses': 'หลักสูตรอวกาศ', 'section.coursesDesc': 'เรียนจบหลักสูตรพร้อมวิดีโอ หนังสือ และหนังสือเสียง!', 'section.giftVouchers': 'บัตรของขวัญ', 'section.manuscripts': 'ต้นฉบับอวกาศ',
    'section.library': '📚 ห้องสมุดท้องฟ้า', 'section.libraryDesc': 'ดูวิดีโอ อ่านหนังสือ และฟังหนังสือเสียง!', 'section.games': '🎮 เกมและแบบทดสอบ', 'section.gamesDesc': 'ทดสอบความรู้อวกาศด้วยเกมสนุก!',
    'section.premiumGames': 'เกมพรีเมียม', 'section.gamePass': 'เกมพาส', 'section.shop': 'ร้านค้าอวกาศ', 'section.trophyCabinet': 'ตู้ถ้วยรางวัล', 'section.trophyCabinetDesc': 'คอลเลกชันความสำเร็จและใบรับรอง!',
    'section.subscriptions': 'สมาชิก', 'section.funFacts': 'ความรู้สนุก', 'section.about': '✨ เกี่ยวกับห้องเรียนจักรวาล', 'section.aboutMission': 'ภารกิจของเรา',
    'section.aboutMissionDesc': 'ห้องเรียนจักรวาลจุดประกายความอยากรู้เกี่ยวกับจักรวาล!', 'section.aboutMissionDesc2': 'จากดาวเคราะห์ถึงกาแลกซีไกลโพ้น — มีอะไรให้สำรวจมากมาย!',
    'common.learn': 'เรียนรู้', 'common.play': 'เล่น', 'common.explore': 'สำรวจ', 'common.learnDesc': 'ค้นพบข้อเท็จจริงเกี่ยวกับวัตถุท้องฟ้า', 'common.playDesc': 'ทดสอบความรู้ด้วยแบบทดสอบสนุก!', 'common.exploreDesc': 'ดูวิดีโอและอ่านหนังสือสำหรับนักสำรวจรุ่นเยาว์',
    'common.videos': 'วิดีโอ', 'common.books': 'หนังสือ', 'common.audiobooks': 'หนังสือเสียง', 'common.all': 'ทั้งหมด', 'common.close': 'ปิด', 'common.back': 'กลับ', 'common.next': 'ถัดไป', 'common.previous': 'ก่อนหน้า', 'common.readNow': 'อ่านเลย', 'common.watchNow': 'ดูเลย', 'common.listenNow': 'ฟังเลย',
    'common.noAchievements': 'ยังไม่มีความสำเร็จ', 'common.noAchievementsDesc': 'เรียนจบหลักสูตรและเล่นเกมเพื่อรับความสำเร็จ!', 'common.totalAchievements': 'ความสำเร็จทั้งหมด', 'common.earnedOn': 'ได้รับเมื่อ', 'common.locked': 'ล็อก',
    'common.coins': 'เหรียญ', 'common.new': 'ใหม่', 'common.buy': 'ซื้อ', 'common.purchased': 'ซื้อแล้ว',
    'footer.tagline': 'ทำให้การสำรวจอวกาศสนุก! 🚀', 'footer.explore': 'สำรวจ', 'footer.learnPlay': 'เรียนรู้และเล่น', 'footer.resources': 'แหล่งข้อมูล', 'footer.universeExplorer': 'นักสำรวจจักรวาล', 'footer.celestialLibrary': 'ห้องสมุดท้องฟ้า', 'footer.quizzes': 'แบบทดสอบ', 'footer.forParents': 'สำหรับผู้ปกครองและครู', 'footer.contact': 'ติดต่อ', 'footer.privacy': 'นโยบายความเป็นส่วนตัว', 'footer.madeWith': 'สร้างด้วย', 'footer.copyright': '© 2024 ห้องเรียนจักรวาล สำรวจดวงดาวต่อไป! ✨',
    'games.quiz': 'แบบทดสอบ', 'games.sizeCompare': 'เปรียบเทียบขนาด', 'games.rocketShooter': 'จรวดยิง', 'games.memoryMatch': 'จับคู่ความจำ', 'games.wordScramble': 'สลับคำ', 'games.rocketMath': 'คณิตจรวด',
    'library.videos': 'วิดีโอ', 'library.books': 'หนังสือ', 'library.audiobooks': 'หนังสือเสียง',
    'courses.spaceCourses': 'หลักสูตรอวกาศ', 'courses.backToCourses': '← กลับไปหลักสูตร', 'courses.claimCertificate': 'รับใบรับรอง', 'courses.takeQuiz': 'ทำแบบทดสอบ', 'courses.restartCourse': 'เริ่มใหม่', 'courses.progress': 'ความก้าวหน้า', 'courses.learningGoals': 'เป้าหมายการเรียนรู้', 'courses.coursePlan': 'แผนหลักสูตร', 'courses.plan': 'แผน',
    'about.planetsMoons': 'ดาวเคราะห์และดวงจันทร์', 'about.starsNebulas': 'ดาวฤกษ์และเนบิวลา', 'about.galaxies': 'กาแลกซี', 'about.booksVideos': 'หนังสือและวิดีโอ',
    'language.select': 'ภาษา', 'tts.readAloud': 'อ่านออกเสียง', 'tts.stopReading': 'หยุด', 'tts.readPage': 'อ่านเนื้อหาหน้า',
    'explorer.title': '🔭 นักสำรวจจักรวาล', 'explorer.desc': 'คลิกวัตถุท้องฟ้าเพื่อเรียนรู้เพิ่มเติม!', 'explorer.anyDistance': '📍 ทุกระยะทาง', 'explorer.near': '🏠 ใกล้', 'explorer.far': '🚀 ไกล', 'explorer.noResults': 'ไม่พบวัตถุท้องฟ้า', 'explorer.adjustFilters': 'ลองปรับตัวกรอง!',
    'timeline.title': 'เดินทางข้ามเวลา', 'timeline.desc': 'เดินทางจากบิกแบงถึงวันนี้!', 'timeline.allEvents': '🌟 ทุกเหตุการณ์',
    'constellation.title': '✨ ตัวแสดงกลุ่มดาว ✨', 'constellation.desc': 'คลิกกลุ่มดาวเพื่อค้นพบเรื่องราว!', 'constellation.starMap': 'แผนที่ดาวแบบโต้ตอบ', 'constellation.selectToView': 'เลือกกลุ่มดาว',
    'dailyFact.subtitle': 'เรียนรู้สิ่งใหม่ทุกวัน!', 'dailyFact.newFact': 'ความรู้ใหม่', 'dailyFact.share': 'แชร์', 'dailyFact.comeBack': 'กลับมาพรุ่งนี้!',
    'funFacts.desc': 'แตะการ์ดเพื่อเปิดเผยข้อเท็จจริง!', 'funFacts.tapCards': 'แตะเพื่อเปิด!', 'funFacts.randomFact': 'ความรู้สุ่ม!',
    'shop.desc': 'ใช้เหรียญซื้อบูสต์และเครื่องสำอาง!', 'shop.boosts': '⚡ บูสต์', 'shop.cosmetics': '🎨 เครื่องสำอาง', 'shop.utilities': '🔧 เครื่องมือ', 'shop.popular': 'ยอดนิยม',
    'subscription.desc': 'ปลดล็อกฟีเจอร์พรีเมียม!', 'subscription.current': 'แผนปัจจุบัน', 'subscription.purchase': 'ซื้อ', 'subscription.dailyBonus': 'โบนัสรายวัน', 'subscription.claimBonus': 'รับโบนัส', 'subscription.expired': 'หมดอายุ', 'subscription.daysLeft': 'วันเหลือ',
    'gamePass.desc': 'ปลดล็อกพลังเกมพิเศษ!', 'gamePass.active': 'ใช้งาน',
    'premiumGames.desc': 'เกมพิเศษพร้อมรางวัลมากมาย!',
    'giftVoucher.desc': 'ขูดบัตรของขวัญเพื่อรับรางวัล!', 'giftVoucher.scratch': 'ขูดเพื่อเปิด!', 'giftVoucher.noVouchers': 'ไม่มีบัตร เรียนจบหลักสูตร!',
    'manuscripts.desc': 'สำรวจความสำเร็จอันยิ่งใหญ่ของการสำรวจอวกาศ!',
    'qna.askAnything': 'ถามอะไรก็ได้เกี่ยวกับอวกาศ...', 'qna.searching': 'กำลังค้นหา...', 'qna.ask': 'ถาม', 'qna.suggested': 'คำถามแนะนำ',
    'account.createAccount': 'สร้างบัญชี', 'account.guest': 'นักสำรวจรับเชิญ', 'account.profile': 'โปรไฟล์ของคุณ',
  },

  vi: {
    'nav.home': 'Trang Chủ', 'nav.solarSystem': 'Hệ Mặt Trời', 'nav.timeline': 'Dòng Thời Gian', 'nav.constellations': 'Chòm Sao', 'nav.library': 'Thư Viện', 'nav.games': 'Trò Chơi', 'nav.subscriptions': 'Đăng Ký', 'nav.funFacts': 'Thú Vị', 'nav.about': 'Giới Thiệu', 'nav.startJourney': 'Bắt Đầu Hành Trình', 'nav.cosmicClassroom': 'Lớp Học Vũ Trụ',
    'hero.badge': 'Dành cho nhà thám hiểm nhỏ 7-13 tuổi', 'hero.welcome': 'Chào mừng đến', 'hero.cosmicClassroom': 'Lớp Học Vũ Trụ', 'hero.subtitle': 'Khám phá mọi ngóc ngách của Vũ Trụ! 🚀', 'hero.startJourney': 'Bắt Đầu Hành Trình Không Gian', 'hero.takeQuiz': 'Làm Quiz',
    'hero.solarSystem': 'Hệ Mặt Trời', 'hero.solarSystemDesc': 'Khám phá hành tinh, mặt trăng và sao chổi', 'hero.starsNebulas': 'Sao và Tinh Vân', 'hero.starsNebulasDesc': 'Khám phá các loại sao và siêu tân tinh', 'hero.galaxiesBeyond': 'Thiên Hà và Xa Hơn', 'hero.galaxiesBeyondDesc': 'Hành trình qua thiên hà và hố đen',
    'section.dailyFact': 'Kiến Thức Không Gian Hàng Ngày', 'section.spaceQnA': 'Hỏi Đáp Không Gian', 'section.spaceQnADesc': 'Hỏi bất cứ điều gì về không gian!', 'section.celestialExplorer': 'Nhà Thám Hiểm Thiên Thể', 'section.spaceTimeline': 'Dòng Thời Gian Không Gian', 'section.constellations': 'Chòm Sao',
    'section.courses': 'Khóa Học Không Gian', 'section.coursesDesc': 'Hoàn thành khóa học với video, sách và sách nói!', 'section.giftVouchers': 'Phiếu Quà Tặng', 'section.manuscripts': 'Bản Thảo Không Gian',
    'section.library': '📚 Thư Viện Thiên Thể', 'section.libraryDesc': 'Xem video, đọc sách và nghe sách nói!', 'section.games': '🎮 Trò Chơi và Câu Đố', 'section.gamesDesc': 'Kiểm tra kiến thức không gian với trò chơi tương tác!',
    'section.premiumGames': 'Trò Chơi Cao Cấp', 'section.gamePass': 'Thẻ Trò Chơi', 'section.shop': 'Cửa Hàng Không Gian', 'section.trophyCabinet': 'Tủ Cúp', 'section.trophyCabinetDesc': 'Bộ sưu tập thành tích và chứng chỉ!',
    'section.subscriptions': 'Đăng Ký', 'section.funFacts': 'Thú Vị', 'section.about': '✨ Về Lớp Học Vũ Trụ', 'section.aboutMission': 'Sứ Mệnh',
    'section.aboutMissionDesc': 'Lớp Học Vũ Trụ khơi dậy sự tò mò về vũ trụ!', 'section.aboutMissionDesc2': 'Từ các hành tinh đến thiên hà xa xôi — có rất nhiều điều để khám phá!',
    'common.learn': 'Học', 'common.play': 'Chơi', 'common.explore': 'Khám Phá', 'common.learnDesc': 'Khám phá sự thật thú vị về mọi thiên thể.', 'common.playDesc': 'Kiểm tra kiến thức với câu đố vui!', 'common.exploreDesc': 'Xem video và đọc sách cho nhà thám hiểm nhỏ.',
    'common.videos': 'Video', 'common.books': 'Sách', 'common.audiobooks': 'Sách Nói', 'common.all': 'Tất Cả', 'common.close': 'Đóng', 'common.back': 'Quay Lại', 'common.next': 'Tiếp', 'common.previous': 'Trước', 'common.readNow': 'Đọc Ngay', 'common.watchNow': 'Xem Ngay', 'common.listenNow': 'Nghe Ngay',
    'common.noAchievements': 'Chưa Có Thành Tích', 'common.noAchievementsDesc': 'Hoàn thành khóa học và trò chơi để nhận thành tích!', 'common.totalAchievements': 'Tổng Thành Tích', 'common.earnedOn': 'Đạt được vào', 'common.locked': 'Đã Khóa',
    'common.coins': 'Xu', 'common.new': 'MỚI', 'common.buy': 'Mua', 'common.purchased': 'Đã Mua',
    'footer.tagline': 'Làm cho khám phá không gian trở nên thú vị! 🚀', 'footer.explore': 'Khám Phá', 'footer.learnPlay': 'Học và Chơi', 'footer.resources': 'Tài Nguyên', 'footer.universeExplorer': 'Nhà Thám Hiểm Vũ Trụ', 'footer.celestialLibrary': 'Thư Viện Thiên Thể', 'footer.quizzes': 'Câu Đố', 'footer.forParents': 'Cho Phụ Huynh và Giáo Viên', 'footer.contact': 'Liên Hệ', 'footer.privacy': 'Chính Sách Bảo Mật', 'footer.madeWith': 'Được tạo với', 'footer.copyright': '© 2024 Lớp Học Vũ Trụ. Tiếp tục khám phá! ✨',
    'games.quiz': 'Câu Đố', 'games.sizeCompare': 'So Sánh Kích Thước', 'games.rocketShooter': 'Bắn Tên Lửa', 'games.memoryMatch': 'Trí Nhớ', 'games.wordScramble': 'Xáo Trộn Từ', 'games.rocketMath': 'Toán Tên Lửa',
    'library.videos': 'Video', 'library.books': 'Sách', 'library.audiobooks': 'Sách Nói',
    'courses.spaceCourses': 'Khóa Học Không Gian', 'courses.backToCourses': '← Quay Lại Khóa Học', 'courses.claimCertificate': 'Nhận Chứng Chỉ', 'courses.takeQuiz': 'Làm Quiz', 'courses.restartCourse': 'Bắt Đầu Lại', 'courses.progress': 'Tiến Độ', 'courses.learningGoals': 'Mục Tiêu Học Tập', 'courses.coursePlan': 'Kế Hoạch Khóa Học', 'courses.plan': 'Kế Hoạch',
    'about.planetsMoons': 'Hành Tinh và Vệ Tinh', 'about.starsNebulas': 'Ngôi Sao và Tinh Vân', 'about.galaxies': 'Thiên Hà', 'about.booksVideos': 'Sách và Video',
    'language.select': 'Ngôn Ngữ', 'tts.readAloud': 'Đọc To', 'tts.stopReading': 'Dừng', 'tts.readPage': 'Đọc nội dung trang',
    'explorer.title': '🔭 Nhà Thám Hiểm Vũ Trụ', 'explorer.desc': 'Nhấp vào thiên thể để tìm hiểu thêm!', 'explorer.anyDistance': '📍 Mọi Khoảng Cách', 'explorer.near': '🏠 Gần', 'explorer.far': '🚀 Xa', 'explorer.noResults': 'Không tìm thấy thiên thể.', 'explorer.adjustFilters': 'Thử điều chỉnh bộ lọc!',
    'timeline.title': 'Hành Trình Xuyên Thời Gian', 'timeline.desc': 'Từ Vụ Nổ Lớn đến ngày nay!', 'timeline.allEvents': '🌟 Tất Cả Sự Kiện',
    'constellation.title': '✨ Trình Xem Chòm Sao ✨', 'constellation.desc': 'Nhấp vào chòm sao để khám phá câu chuyện!', 'constellation.starMap': 'Bản Đồ Sao Tương Tác', 'constellation.selectToView': 'Chọn một chòm sao',
    'dailyFact.subtitle': 'Mỗi ngày học điều mới!', 'dailyFact.newFact': 'Kiến Thức Mới', 'dailyFact.share': 'Chia Sẻ', 'dailyFact.comeBack': 'Quay lại ngày mai!',
    'funFacts.desc': 'Chạm vào thẻ để khám phá sự thật!', 'funFacts.tapCards': 'Chạm để mở!', 'funFacts.randomFact': 'Kiến Thức Ngẫu Nhiên!',
    'shop.desc': 'Chi xu mua tăng cường và trang trí!', 'shop.boosts': '⚡ Tăng Cường', 'shop.cosmetics': '🎨 Trang Trí', 'shop.utilities': '🔧 Tiện Ích', 'shop.popular': 'Phổ Biến',
    'subscription.desc': 'Mở khóa tính năng cao cấp!', 'subscription.current': 'Gói Hiện Tại', 'subscription.purchase': 'Mua', 'subscription.dailyBonus': 'Thưởng Hàng Ngày', 'subscription.claimBonus': 'Nhận Thưởng', 'subscription.expired': 'Hết Hạn', 'subscription.daysLeft': 'ngày còn lại',
    'gamePass.desc': 'Mở khóa sức mạnh trò chơi đặc biệt!', 'gamePass.active': 'Đang Hoạt Động',
    'premiumGames.desc': 'Trò chơi độc quyền với phần thưởng tuyệt vời!',
    'giftVoucher.desc': 'Cào phiếu quà tặng để nhận phần thưởng!', 'giftVoucher.scratch': 'Cào Để Mở!', 'giftVoucher.noVouchers': 'Không có phiếu. Hoàn thành khóa học!',
    'manuscripts.desc': 'Khám phá những thành tựu vĩ đại nhất của khám phá không gian!',
    'qna.askAnything': 'Hỏi bất cứ điều gì về không gian...', 'qna.searching': 'Đang tìm...', 'qna.ask': 'Hỏi', 'qna.suggested': 'Câu Hỏi Gợi Ý',
    'account.createAccount': 'Tạo Tài Khoản', 'account.guest': 'Khách Thám Hiểm', 'account.profile': 'Hồ Sơ Của Bạn',
  },

  id: {
    'nav.home': 'Beranda', 'nav.solarSystem': 'Tata Surya', 'nav.timeline': 'Garis Waktu', 'nav.constellations': 'Rasi Bintang', 'nav.library': 'Perpustakaan', 'nav.games': 'Permainan', 'nav.subscriptions': 'Langganan', 'nav.funFacts': 'Fakta Menarik', 'nav.about': 'Tentang', 'nav.startJourney': 'Mulai Perjalanan', 'nav.cosmicClassroom': 'Kelas Kosmik',
    'hero.badge': 'Untuk penjelajah muda usia 7-13 tahun', 'hero.welcome': 'Selamat datang di', 'hero.cosmicClassroom': 'Kelas Kosmik', 'hero.subtitle': 'Jelajahi setiap sudut Alam Semesta! 🚀', 'hero.startJourney': 'Mulai Perjalanan Luar Angkasa', 'hero.takeQuiz': 'Ikuti Kuis',
    'hero.solarSystem': 'Tata Surya', 'hero.solarSystemDesc': 'Jelajahi planet, bulan dan komet', 'hero.starsNebulas': 'Bintang dan Nebula', 'hero.starsNebulasDesc': 'Temukan jenis bintang dan supernova', 'hero.galaxiesBeyond': 'Galaksi dan Seterusnya', 'hero.galaxiesBeyondDesc': 'Perjalanan melalui galaksi dan lubang hitam',
    'section.dailyFact': 'Fakta Angkasa Harian', 'section.spaceQnA': 'Tanya Jawab Angkasa', 'section.spaceQnADesc': 'Tanyakan apa saja tentang luar angkasa!', 'section.celestialExplorer': 'Penjelajah Langit', 'section.spaceTimeline': 'Garis Waktu Angkasa', 'section.constellations': 'Rasi Bintang',
    'section.courses': 'Kursus Angkasa', 'section.coursesDesc': 'Selesaikan kursus dengan video, buku, dan buku audio!', 'section.giftVouchers': 'Voucher Hadiah', 'section.manuscripts': 'Manuskrip Angkasa',
    'section.library': '📚 Perpustakaan Langit', 'section.libraryDesc': 'Tonton video, baca buku dan dengarkan buku audio!', 'section.games': '🎮 Permainan dan Kuis', 'section.gamesDesc': 'Uji pengetahuan angkasamu dengan permainan interaktif!',
    'section.premiumGames': 'Permainan Premium', 'section.gamePass': 'Pass Permainan', 'section.shop': 'Toko Angkasa', 'section.trophyCabinet': 'Lemari Piala', 'section.trophyCabinetDesc': 'Koleksi pencapaian dan sertifikat!',
    'section.subscriptions': 'Langganan', 'section.funFacts': 'Fakta Menarik', 'section.about': '✨ Tentang Kelas Kosmik', 'section.aboutMission': 'Misi Kami',
    'section.aboutMissionDesc': 'Kelas Kosmik memicu rasa ingin tahu tentang alam semesta!', 'section.aboutMissionDesc2': 'Dari planet hingga galaksi jauh — ada banyak yang bisa dijelajahi!',
    'common.learn': 'Belajar', 'common.play': 'Main', 'common.explore': 'Jelajahi', 'common.learnDesc': 'Temukan fakta menarik tentang setiap benda langit.', 'common.playDesc': 'Uji pengetahuan dengan kuis seru!', 'common.exploreDesc': 'Tonton video dan baca buku untuk penjelajah muda.',
    'common.videos': 'Video', 'common.books': 'Buku', 'common.audiobooks': 'Buku Audio', 'common.all': 'Semua', 'common.close': 'Tutup', 'common.back': 'Kembali', 'common.next': 'Selanjutnya', 'common.previous': 'Sebelumnya', 'common.readNow': 'Baca Sekarang', 'common.watchNow': 'Tonton Sekarang', 'common.listenNow': 'Dengar Sekarang',
    'common.noAchievements': 'Belum Ada Pencapaian', 'common.noAchievementsDesc': 'Selesaikan kursus dan permainan untuk mendapatkan pencapaian!', 'common.totalAchievements': 'Total Pencapaian', 'common.earnedOn': 'Diperoleh pada', 'common.locked': 'Terkunci',
    'common.coins': 'Koin', 'common.new': 'BARU', 'common.buy': 'Beli', 'common.purchased': 'Dibeli',
    'footer.tagline': 'Membuat eksplorasi angkasa menyenangkan! 🚀', 'footer.explore': 'Jelajahi', 'footer.learnPlay': 'Belajar dan Main', 'footer.resources': 'Sumber Daya', 'footer.universeExplorer': 'Penjelajah Alam Semesta', 'footer.celestialLibrary': 'Perpustakaan Langit', 'footer.quizzes': 'Kuis', 'footer.forParents': 'Untuk Orang Tua dan Guru', 'footer.contact': 'Kontak', 'footer.privacy': 'Kebijakan Privasi', 'footer.madeWith': 'Dibuat dengan', 'footer.copyright': '© 2024 Kelas Kosmik. Terus jelajahi bintang! ✨',
    'games.quiz': 'Kuis', 'games.sizeCompare': 'Bandingkan Ukuran', 'games.rocketShooter': 'Penembak Roket', 'games.memoryMatch': 'Cocokkan Ingatan', 'games.wordScramble': 'Acak Kata', 'games.rocketMath': 'Matematika Roket',
    'library.videos': 'Video', 'library.books': 'Buku', 'library.audiobooks': 'Buku Audio',
    'courses.spaceCourses': 'Kursus Angkasa', 'courses.backToCourses': '← Kembali ke Kursus', 'courses.claimCertificate': 'Klaim Sertifikat', 'courses.takeQuiz': 'Ikuti Kuis', 'courses.restartCourse': 'Mulai Ulang', 'courses.progress': 'Kemajuan', 'courses.learningGoals': 'Tujuan Pembelajaran', 'courses.coursePlan': 'Rencana Kursus', 'courses.plan': 'Rencana',
    'about.planetsMoons': 'Planet dan Bulan', 'about.starsNebulas': 'Bintang dan Nebula', 'about.galaxies': 'Galaksi', 'about.booksVideos': 'Buku dan Video',
    'language.select': 'Bahasa', 'tts.readAloud': 'Baca Keras', 'tts.stopReading': 'Berhenti', 'tts.readPage': 'Baca konten halaman',
    'explorer.title': '🔭 Penjelajah Alam Semesta', 'explorer.desc': 'Klik benda langit untuk pelajari lebih lanjut!', 'explorer.anyDistance': '📍 Semua Jarak', 'explorer.near': '🏠 Dekat', 'explorer.far': '🚀 Jauh', 'explorer.noResults': 'Tidak ada benda langit ditemukan.', 'explorer.adjustFilters': 'Coba sesuaikan filter!',
    'timeline.title': 'Perjalanan Melewati Waktu', 'timeline.desc': 'Dari Big Bang hingga hari ini!', 'timeline.allEvents': '🌟 Semua Peristiwa',
    'constellation.title': '✨ Penampil Rasi Bintang ✨', 'constellation.desc': 'Klik rasi bintang untuk menemukan ceritanya!', 'constellation.starMap': 'Peta Bintang Interaktif', 'constellation.selectToView': 'Pilih rasi bintang',
    'dailyFact.subtitle': 'Sesuatu yang baru setiap hari!', 'dailyFact.newFact': 'Fakta Baru', 'dailyFact.share': 'Bagikan', 'dailyFact.comeBack': 'Kembali besok!',
    'funFacts.desc': 'Ketuk kartu untuk mengungkap fakta menakjubkan!', 'funFacts.tapCards': 'Ketuk untuk buka!', 'funFacts.randomFact': 'Fakta Acak!',
    'shop.desc': 'Belanjakan koin untuk peningkatan dan kosmetik!', 'shop.boosts': '⚡ Peningkatan', 'shop.cosmetics': '🎨 Kosmetik', 'shop.utilities': '🔧 Utilitas', 'shop.popular': 'Populer',
    'subscription.desc': 'Buka fitur premium!', 'subscription.current': 'Paket Saat Ini', 'subscription.purchase': 'Beli', 'subscription.dailyBonus': 'Bonus Harian', 'subscription.claimBonus': 'Klaim Bonus', 'subscription.expired': 'Kedaluwarsa', 'subscription.daysLeft': 'hari tersisa',
    'gamePass.desc': 'Buka kekuatan permainan khusus!', 'gamePass.active': 'Aktif',
    'premiumGames.desc': 'Permainan eksklusif dengan hadiah luar biasa!',
    'giftVoucher.desc': 'Gores voucher hadiah untuk mendapat hadiah!', 'giftVoucher.scratch': 'Gores!', 'giftVoucher.noVouchers': 'Tidak ada voucher. Selesaikan kursus!',
    'manuscripts.desc': 'Jelajahi pencapaian terbesar eksplorasi angkasa!',
    'qna.askAnything': 'Tanyakan apa saja tentang angkasa...', 'qna.searching': 'Mencari...', 'qna.ask': 'Tanya', 'qna.suggested': 'Pertanyaan yang Disarankan',
    'account.createAccount': 'Buat Akun', 'account.guest': 'Penjelajah Tamu', 'account.profile': 'Profil Anda',
  },

  el: {
    'nav.home': 'Αρχική', 'nav.solarSystem': 'Ηλιακό Σύστημα', 'nav.timeline': 'Χρονολόγιο', 'nav.constellations': 'Αστερισμοί', 'nav.library': 'Βιβλιοθήκη', 'nav.games': 'Παιχνίδια', 'nav.subscriptions': 'Συνδρομές', 'nav.funFacts': 'Ενδιαφέροντα', 'nav.about': 'Σχετικά', 'nav.startJourney': 'Ξεκίνα το Ταξίδι', 'nav.cosmicClassroom': 'Κοσμική Τάξη',
    'hero.badge': 'Για νεαρούς εξερευνητές 7-13 ετών', 'hero.welcome': 'Καλώς ήρθατε στην', 'hero.cosmicClassroom': 'Κοσμική Τάξη', 'hero.subtitle': 'Εξερεύνησε κάθε γωνιά του Σύμπαντος! 🚀', 'hero.startJourney': 'Ξεκίνα το Διαστημικό Ταξίδι', 'hero.takeQuiz': 'Κάνε ένα Quiz',
    'hero.solarSystem': 'Ηλιακό Σύστημα', 'hero.solarSystemDesc': 'Εξερεύνησε πλανήτες, φεγγάρια και κομήτες', 'hero.starsNebulas': 'Αστέρια και Νεφελώματα', 'hero.starsNebulasDesc': 'Ανακάλυψε τύπους αστεριών και σούπερνοβα', 'hero.galaxiesBeyond': 'Γαλαξίες και Πέρα', 'hero.galaxiesBeyondDesc': 'Ταξίδεψε μέσα από γαλαξίες και μαύρες τρύπες',
    'section.dailyFact': 'Διαστημικό Γεγονός', 'section.spaceQnA': 'Ερωτήσεις και Απαντήσεις', 'section.spaceQnADesc': 'Ρώτα ό,τι θέλεις για το διάστημα!', 'section.celestialExplorer': 'Ουράνιος Εξερευνητής', 'section.spaceTimeline': 'Διαστημικό Χρονολόγιο', 'section.constellations': 'Αστερισμοί',
    'section.courses': 'Διαστημικά Μαθήματα', 'section.coursesDesc': 'Ολοκλήρωσε μαθήματα με βίντεο, βιβλία και ηχητικά βιβλία!', 'section.giftVouchers': 'Δωροεπιταγές', 'section.manuscripts': 'Διαστημικά Χειρόγραφα',
    'section.library': '📚 Ουράνια Βιβλιοθήκη', 'section.libraryDesc': 'Δες βίντεο, διάβασε βιβλία και άκουσε ηχητικά βιβλία!', 'section.games': '🎮 Παιχνίδια και Quiz', 'section.gamesDesc': 'Δοκίμασε τις γνώσεις σου με διαδραστικά παιχνίδια!',
    'section.premiumGames': 'Προνομιακά Παιχνίδια', 'section.gamePass': 'Κάρτα Παιχνιδιών', 'section.shop': 'Διαστημικό Κατάστημα', 'section.trophyCabinet': 'Βιτρίνα Τροπαίων', 'section.trophyCabinetDesc': 'Η συλλογή επιτευγμάτων σου!',
    'section.subscriptions': 'Συνδρομές', 'section.funFacts': 'Ενδιαφέροντα', 'section.about': '✨ Σχετικά με την Κοσμική Τάξη', 'section.aboutMission': 'Η Αποστολή μας',
    'section.aboutMissionDesc': 'Η Κοσμική Τάξη εμπνέει την περιέργεια για το σύμπαν!', 'section.aboutMissionDesc2': 'Από πλανήτες μέχρι μακρινούς γαλαξίες — υπάρχουν τόσα πολλά!',
    'common.learn': 'Μάθε', 'common.play': 'Παίξε', 'common.explore': 'Εξερεύνησε', 'common.learnDesc': 'Ανακάλυψε γεγονότα για κάθε ουράνιο σώμα.', 'common.playDesc': 'Δοκίμασε τις γνώσεις σου με quiz!', 'common.exploreDesc': 'Δες βίντεο και διάβασε βιβλία για νεαρούς εξερευνητές.',
    'common.videos': 'Βίντεο', 'common.books': 'Βιβλία', 'common.audiobooks': 'Ηχητικά Βιβλία', 'common.all': 'Όλα', 'common.close': 'Κλείσιμο', 'common.back': 'Πίσω', 'common.next': 'Επόμενο', 'common.previous': 'Προηγούμενο', 'common.readNow': 'Διάβασε Τώρα', 'common.watchNow': 'Δες Τώρα', 'common.listenNow': 'Άκουσε Τώρα',
    'common.noAchievements': 'Χωρίς Επιτεύγματα', 'common.noAchievementsDesc': 'Ολοκλήρωσε μαθήματα και παιχνίδια!', 'common.totalAchievements': 'Σύνολο Επιτευγμάτων', 'common.earnedOn': 'Κερδήθηκε', 'common.locked': 'Κλειδωμένο',
    'common.coins': 'Νομίσματα', 'common.new': 'ΝΕΟ', 'common.buy': 'Αγορά', 'common.purchased': 'Αγοράστηκε',
    'footer.tagline': 'Εξερεύνηση διαστήματος με διασκέδαση! 🚀', 'footer.explore': 'Εξερεύνησε', 'footer.learnPlay': 'Μάθε και Παίξε', 'footer.resources': 'Πόροι', 'footer.universeExplorer': 'Εξερευνητής Σύμπαντος', 'footer.celestialLibrary': 'Ουράνια Βιβλιοθήκη', 'footer.quizzes': 'Quiz', 'footer.forParents': 'Για Γονείς και Δασκάλους', 'footer.contact': 'Επικοινωνία', 'footer.privacy': 'Απόρρητο', 'footer.madeWith': 'Φτιαγμένο με', 'footer.copyright': '© 2024 Κοσμική Τάξη. Εξερεύνα τα αστέρια! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Σύγκριση Μεγέθους', 'games.rocketShooter': 'Πυραυλοβόλο', 'games.memoryMatch': 'Μνήμη', 'games.wordScramble': 'Ανακάτεμα Λέξεων', 'games.rocketMath': 'Μαθηματικά Πυραύλων',
    'library.videos': 'Βίντεο', 'library.books': 'Βιβλία', 'library.audiobooks': 'Ηχητικά Βιβλία',
    'courses.spaceCourses': 'Διαστημικά Μαθήματα', 'courses.backToCourses': '← Πίσω στα Μαθήματα', 'courses.claimCertificate': 'Λήψη Πιστοποιητικού', 'courses.takeQuiz': 'Κάνε Quiz', 'courses.restartCourse': 'Ξανά από την Αρχή', 'courses.progress': 'Πρόοδος', 'courses.learningGoals': 'Μαθησιακοί Στόχοι', 'courses.coursePlan': 'Πρόγραμμα Μαθήματος', 'courses.plan': 'Πρόγραμμα',
    'about.planetsMoons': 'Πλανήτες και Φεγγάρια', 'about.starsNebulas': 'Αστέρια και Νεφελώματα', 'about.galaxies': 'Γαλαξίες', 'about.booksVideos': 'Βιβλία και Βίντεο',
    'language.select': 'Γλώσσα', 'tts.readAloud': 'Ανάγνωση', 'tts.stopReading': 'Σταμάτα', 'tts.readPage': 'Διάβασε το περιεχόμενο',
    'explorer.title': '🔭 Εξερευνητής Σύμπαντος', 'explorer.desc': 'Κάνε κλικ σε ένα ουράνιο σώμα για να μάθεις!', 'explorer.anyDistance': '📍 Οποιαδήποτε Απόσταση', 'explorer.near': '🏠 Κοντά', 'explorer.far': '🚀 Μακριά', 'explorer.noResults': 'Δεν βρέθηκαν ουράνια σώματα.', 'explorer.adjustFilters': 'Δοκίμασε να αλλάξεις τα φίλτρα!',
    'timeline.title': 'Ταξίδι στο Χρόνο', 'timeline.desc': 'Από τη Μεγάλη Έκρηξη μέχρι σήμερα!', 'timeline.allEvents': '🌟 Όλα τα Γεγονότα',
    'constellation.title': '✨ Προβολέας Αστερισμών ✨', 'constellation.desc': 'Κάνε κλικ σε έναν αστερισμό!', 'constellation.starMap': 'Διαδραστικός Χάρτης Αστεριών', 'constellation.selectToView': 'Επίλεξε αστερισμό',
    'dailyFact.subtitle': 'Κάτι νέο κάθε μέρα!', 'dailyFact.newFact': 'Νέο Γεγονός', 'dailyFact.share': 'Μοιράσου', 'dailyFact.comeBack': 'Έλα αύριο για νέο γεγονός!',
    'funFacts.desc': 'Πάτα τις κάρτες για εκπληκτικά γεγονότα!', 'funFacts.tapCards': 'Πάτα για αποκάλυψη!', 'funFacts.randomFact': 'Τυχαίο Γεγονός!',
    'shop.desc': 'Ξόδεψε νομίσματα σε ενισχύσεις και καλλυντικά!', 'shop.boosts': '⚡ Ενισχύσεις', 'shop.cosmetics': '🎨 Καλλυντικά', 'shop.utilities': '🔧 Εργαλεία', 'shop.popular': 'Δημοφιλή',
    'subscription.desc': 'Ξεκλείδωσε premium λειτουργίες!', 'subscription.current': 'Τρέχον Πλάνο', 'subscription.purchase': 'Αγορά', 'subscription.dailyBonus': 'Ημερήσιο Μπόνους', 'subscription.claimBonus': 'Λάβε Μπόνους', 'subscription.expired': 'Έληξε', 'subscription.daysLeft': 'μέρες απομένουν',
    'gamePass.desc': 'Ξεκλείδωσε ειδικές δυνάμεις!', 'gamePass.active': 'Ενεργό',
    'premiumGames.desc': 'Αποκλειστικά παιχνίδια με εκπληκτικές ανταμοιβές!',
    'giftVoucher.desc': 'Ξύσε τα κουπόνια για ανταμοιβές!', 'giftVoucher.scratch': 'Ξύσε!', 'giftVoucher.noVouchers': 'Δεν υπάρχουν κουπόνια. Ολοκλήρωσε μαθήματα!',
    'manuscripts.desc': 'Εξερεύνησε τα μεγαλύτερα επιτεύγματα της διαστημικής εξερεύνησης!',
    'qna.askAnything': 'Ρώτα οτιδήποτε για το διάστημα...', 'qna.searching': 'Αναζήτηση...', 'qna.ask': 'Ρώτα', 'qna.suggested': 'Προτεινόμενες Ερωτήσεις',
    'account.createAccount': 'Δημιουργία Λογαριασμού', 'account.guest': 'Επισκέπτης Εξερευνητής', 'account.profile': 'Το Προφίλ σου',
  },
};

export default translations;
