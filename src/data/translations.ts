export type LanguageCode = 
  | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ko'
  | 'hi' | 'ar' | 'tr' | 'nl' | 'pl' | 'sv' | 'th' | 'vi' | 'id' | 'el';

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
];

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

  // Language
  'language.select': string;
};

export type TranslationKey = keyof TranslationKeys;

const translations: Record<LanguageCode, TranslationKeys> = {
  en: {
    'nav.home': 'Home',
    'nav.solarSystem': 'Solar System',
    'nav.timeline': 'Timeline',
    'nav.constellations': 'Constellations',
    'nav.library': 'Library',
    'nav.games': 'Games',
    'nav.subscriptions': 'Subscriptions',
    'nav.funFacts': 'Fun Facts',
    'nav.about': 'About',
    'nav.startJourney': 'Start Your Journey',
    'nav.cosmicClassroom': 'Cosmic Classroom',
    'hero.badge': 'For young explorers ages 7-13',
    'hero.welcome': 'Welcome to',
    'hero.cosmicClassroom': 'Cosmic Classroom',
    'hero.subtitle': 'Explore Every Corner of the Universe! 🚀 Learn about planets, stars, nebulas, galaxies, and so much more!',
    'hero.startJourney': 'Start Your Space Journey',
    'hero.takeQuiz': 'Take a Quiz',
    'hero.solarSystem': 'Solar System',
    'hero.solarSystemDesc': 'Explore planets, moons, asteroids & comets',
    'hero.starsNebulas': 'Stars & Nebulas',
    'hero.starsNebulasDesc': 'Discover star types, supernovas & glowing clouds',
    'hero.galaxiesBeyond': 'Galaxies & Beyond',
    'hero.galaxiesBeyondDesc': 'Journey through galaxies, black holes & exoplanets',
    'section.dailyFact': 'Daily Space Fact',
    'section.spaceQnA': 'Space Q&A',
    'section.spaceQnADesc': 'Ask anything about space!',
    'section.celestialExplorer': 'Celestial Explorer',
    'section.spaceTimeline': 'Space Timeline',
    'section.constellations': 'Constellations',
    'section.courses': 'Space Courses',
    'section.coursesDesc': 'Complete structured courses with videos, books, and audiobooks. Earn certificates when you finish!',
    'section.giftVouchers': 'Gift Vouchers',
    'section.manuscripts': 'Space Manuscripts',
    'section.library': '📚 Celestial Library',
    'section.libraryDesc': 'Watch amazing videos, explore space books, and listen to audiobooks about space theories!',
    'section.games': '🎮 Games & Quizzes',
    'section.gamesDesc': 'Test your space knowledge with fun interactive games!',
    'section.premiumGames': 'Premium Games',
    'section.gamePass': 'Game Pass',
    'section.shop': 'Space Shop',
    'section.trophyCabinet': 'Trophy Cabinet',
    'section.trophyCabinetDesc': 'Your collection of achievements, certificates, and accomplishments from your space exploration journey!',
    'section.subscriptions': 'Subscriptions',
    'section.funFacts': 'Fun Facts',
    'section.about': '✨ About Cosmic Classroom',
    'section.aboutMission': 'Our Mission',
    'section.aboutMissionDesc': 'Cosmic Classroom is designed to spark curiosity about the universe in young minds! We make learning about space fun and accessible for kids ages 7-13.',
    'section.aboutMissionDesc2': 'From planets in our solar system to distant galaxies, colorful nebulas to mysterious black holes - there\'s so much to explore!',
    'common.learn': 'Learn',
    'common.play': 'Play',
    'common.explore': 'Explore',
    'common.learnDesc': 'Discover fun facts about every type of celestial body in our universe.',
    'common.playDesc': 'Test your knowledge with fun quizzes and earn cool space badges!',
    'common.exploreDesc': 'Watch videos and read books curated just for young space explorers.',
    'common.videos': 'Videos',
    'common.books': 'Books',
    'common.audiobooks': 'Audiobooks',
    'common.all': 'All',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.readNow': 'Read Now',
    'common.watchNow': 'Watch Now',
    'common.listenNow': 'Listen Now',
    'common.noAchievements': 'No Achievements Yet',
    'common.noAchievementsDesc': 'Complete courses, games, and quizzes to earn achievements!',
    'common.totalAchievements': 'Total Achievements',
    'common.earnedOn': 'Earned on',
    'common.locked': 'Locked',
    'footer.tagline': 'Making space exploration fun for young minds! 🚀',
    'footer.explore': 'Explore',
    'footer.learnPlay': 'Learn & Play',
    'footer.resources': 'Resources',
    'footer.universeExplorer': 'Universe Explorer',
    'footer.celestialLibrary': 'Celestial Library',
    'footer.quizzes': 'Quizzes',
    'footer.forParents': 'For Parents & Teachers',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.madeWith': 'Made with',
    'footer.copyright': '© 2024 Cosmic Classroom. Keep exploring the stars! ✨',
    'games.quiz': 'Quiz',
    'games.sizeCompare': 'Size Compare',
    'games.rocketShooter': 'Rocket Shooter',
    'games.memoryMatch': 'Memory Match',
    'games.wordScramble': 'Word Scramble',
    'games.rocketMath': 'Rocket Math',
    'library.videos': 'Videos',
    'library.books': 'Books',
    'library.audiobooks': 'Audiobooks',
    'courses.spaceCourses': 'Space Courses',
    'courses.backToCourses': '← Back to Courses',
    'courses.claimCertificate': 'Claim Certificate',
    'courses.takeQuiz': 'Take Quiz',
    'courses.restartCourse': 'Restart Course',
    'courses.progress': 'Progress',
    'courses.learningGoals': 'Learning Goals',
    'courses.coursePlan': 'Course Plan',
    'courses.plan': 'Plan',
    'about.planetsMoons': 'Planets & Moons',
    'about.starsNebulas': 'Stars & Nebulas',
    'about.galaxies': 'Galaxies',
    'about.booksVideos': 'Books & Videos',
    'language.select': 'Language',
  },

  es: {
    'nav.home': 'Inicio',
    'nav.solarSystem': 'Sistema Solar',
    'nav.timeline': 'Cronología',
    'nav.constellations': 'Constelaciones',
    'nav.library': 'Biblioteca',
    'nav.games': 'Juegos',
    'nav.subscriptions': 'Suscripciones',
    'nav.funFacts': 'Datos Curiosos',
    'nav.about': 'Acerca de',
    'nav.startJourney': 'Comienza tu Viaje',
    'nav.cosmicClassroom': 'Aula Cósmica',
    'hero.badge': 'Para jóvenes exploradores de 7 a 13 años',
    'hero.welcome': 'Bienvenido a',
    'hero.cosmicClassroom': 'Aula Cósmica',
    'hero.subtitle': '¡Explora cada rincón del Universo! 🚀 Aprende sobre planetas, estrellas, nebulosas, galaxias y mucho más!',
    'hero.startJourney': 'Comienza tu Viaje Espacial',
    'hero.takeQuiz': 'Haz un Quiz',
    'hero.solarSystem': 'Sistema Solar',
    'hero.solarSystemDesc': 'Explora planetas, lunas, asteroides y cometas',
    'hero.starsNebulas': 'Estrellas y Nebulosas',
    'hero.starsNebulasDesc': 'Descubre tipos de estrellas, supernovas y nubes brillantes',
    'hero.galaxiesBeyond': 'Galaxias y Más Allá',
    'hero.galaxiesBeyondDesc': 'Viaja por galaxias, agujeros negros y exoplanetas',
    'section.dailyFact': 'Dato Espacial del Día',
    'section.spaceQnA': 'Preguntas y Respuestas Espaciales',
    'section.spaceQnADesc': '¡Pregunta cualquier cosa sobre el espacio!',
    'section.celestialExplorer': 'Explorador Celestial',
    'section.spaceTimeline': 'Cronología Espacial',
    'section.constellations': 'Constelaciones',
    'section.courses': 'Cursos Espaciales',
    'section.coursesDesc': '¡Completa cursos estructurados con videos, libros y audiolibros. Obtén certificados al terminar!',
    'section.giftVouchers': 'Vales de Regalo',
    'section.manuscripts': 'Manuscritos Espaciales',
    'section.library': '📚 Biblioteca Celestial',
    'section.libraryDesc': '¡Mira videos increíbles, explora libros espaciales y escucha audiolibros sobre teorías espaciales!',
    'section.games': '🎮 Juegos y Quizzes',
    'section.gamesDesc': '¡Pon a prueba tus conocimientos espaciales con juegos interactivos!',
    'section.premiumGames': 'Juegos Premium',
    'section.gamePass': 'Pase de Juegos',
    'section.shop': 'Tienda Espacial',
    'section.trophyCabinet': 'Vitrina de Trofeos',
    'section.trophyCabinetDesc': '¡Tu colección de logros, certificados y accomplishments de tu viaje de exploración espacial!',
    'section.subscriptions': 'Suscripciones',
    'section.funFacts': 'Datos Curiosos',
    'section.about': '✨ Sobre Aula Cósmica',
    'section.aboutMission': 'Nuestra Misión',
    'section.aboutMissionDesc': '¡Aula Cósmica está diseñada para despertar la curiosidad sobre el universo en las mentes jóvenes! Hacemos que aprender sobre el espacio sea divertido y accesible para niños de 7 a 13 años.',
    'section.aboutMissionDesc2': 'Desde planetas en nuestro sistema solar hasta galaxias distantes, nebulosas coloridas hasta misteriosos agujeros negros - ¡hay tanto por explorar!',
    'common.learn': 'Aprender',
    'common.play': 'Jugar',
    'common.explore': 'Explorar',
    'common.learnDesc': 'Descubre datos divertidos sobre cada tipo de cuerpo celeste en nuestro universo.',
    'common.playDesc': '¡Pon a prueba tus conocimientos con quizzes divertidos y gana insignias espaciales!',
    'common.exploreDesc': 'Mira videos y lee libros seleccionados para jóvenes exploradores espaciales.',
    'common.videos': 'Videos',
    'common.books': 'Libros',
    'common.audiobooks': 'Audiolibros',
    'common.all': 'Todo',
    'common.close': 'Cerrar',
    'common.back': 'Atrás',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    'common.readNow': 'Leer Ahora',
    'common.watchNow': 'Ver Ahora',
    'common.listenNow': 'Escuchar Ahora',
    'common.noAchievements': 'Sin Logros Aún',
    'common.noAchievementsDesc': '¡Completa cursos, juegos y quizzes para ganar logros!',
    'common.totalAchievements': 'Logros Totales',
    'common.earnedOn': 'Obtenido el',
    'common.locked': 'Bloqueado',
    'footer.tagline': '¡Haciendo la exploración espacial divertida para mentes jóvenes! 🚀',
    'footer.explore': 'Explorar',
    'footer.learnPlay': 'Aprender y Jugar',
    'footer.resources': 'Recursos',
    'footer.universeExplorer': 'Explorador del Universo',
    'footer.celestialLibrary': 'Biblioteca Celestial',
    'footer.quizzes': 'Quizzes',
    'footer.forParents': 'Para Padres y Maestros',
    'footer.contact': 'Contacto',
    'footer.privacy': 'Política de Privacidad',
    'footer.madeWith': 'Hecho con',
    'footer.copyright': '© 2024 Aula Cósmica. ¡Sigue explorando las estrellas! ✨',
    'games.quiz': 'Quiz',
    'games.sizeCompare': 'Comparar Tamaños',
    'games.rocketShooter': 'Disparador de Cohetes',
    'games.memoryMatch': 'Memoria',
    'games.wordScramble': 'Palabras Revueltas',
    'games.rocketMath': 'Matemáticas Cohete',
    'library.videos': 'Videos',
    'library.books': 'Libros',
    'library.audiobooks': 'Audiolibros',
    'courses.spaceCourses': 'Cursos Espaciales',
    'courses.backToCourses': '← Volver a Cursos',
    'courses.claimCertificate': 'Reclamar Certificado',
    'courses.takeQuiz': 'Hacer Quiz',
    'courses.restartCourse': 'Reiniciar Curso',
    'courses.progress': 'Progreso',
    'courses.learningGoals': 'Objetivos de Aprendizaje',
    'courses.coursePlan': 'Plan del Curso',
    'courses.plan': 'Plan',
    'about.planetsMoons': 'Planetas y Lunas',
    'about.starsNebulas': 'Estrellas y Nebulosas',
    'about.galaxies': 'Galaxias',
    'about.booksVideos': 'Libros y Videos',
    'language.select': 'Idioma',
  },

  fr: {
    'nav.home': 'Accueil',
    'nav.solarSystem': 'Système Solaire',
    'nav.timeline': 'Chronologie',
    'nav.constellations': 'Constellations',
    'nav.library': 'Bibliothèque',
    'nav.games': 'Jeux',
    'nav.subscriptions': 'Abonnements',
    'nav.funFacts': 'Faits Amusants',
    'nav.about': 'À Propos',
    'nav.startJourney': 'Commencez Votre Voyage',
    'nav.cosmicClassroom': 'Classe Cosmique',
    'hero.badge': 'Pour les jeunes explorateurs de 7 à 13 ans',
    'hero.welcome': 'Bienvenue à',
    'hero.cosmicClassroom': 'Classe Cosmique',
    'hero.subtitle': 'Explorez chaque recoin de l\'Univers! 🚀 Apprenez sur les planètes, étoiles, nébuleuses, galaxies et bien plus!',
    'hero.startJourney': 'Commencez Votre Voyage Spatial',
    'hero.takeQuiz': 'Faire un Quiz',
    'hero.solarSystem': 'Système Solaire',
    'hero.solarSystemDesc': 'Explorez planètes, lunes, astéroïdes et comètes',
    'hero.starsNebulas': 'Étoiles et Nébuleuses',
    'hero.starsNebulasDesc': 'Découvrez les types d\'étoiles, supernovas et nuages lumineux',
    'hero.galaxiesBeyond': 'Galaxies et Au-delà',
    'hero.galaxiesBeyondDesc': 'Voyagez à travers galaxies, trous noirs et exoplanètes',
    'section.dailyFact': 'Fait Spatial du Jour',
    'section.spaceQnA': 'Questions et Réponses Spatiales',
    'section.spaceQnADesc': 'Posez n\'importe quelle question sur l\'espace!',
    'section.celestialExplorer': 'Explorateur Céleste',
    'section.spaceTimeline': 'Chronologie Spatiale',
    'section.constellations': 'Constellations',
    'section.courses': 'Cours Spatiaux',
    'section.coursesDesc': 'Complétez des cours structurés avec vidéos, livres et livres audio. Obtenez des certificats!',
    'section.giftVouchers': 'Bons Cadeaux',
    'section.manuscripts': 'Manuscrits Spatiaux',
    'section.library': '📚 Bibliothèque Céleste',
    'section.libraryDesc': 'Regardez des vidéos incroyables, explorez des livres spatiaux et écoutez des livres audio!',
    'section.games': '🎮 Jeux et Quiz',
    'section.gamesDesc': 'Testez vos connaissances spatiales avec des jeux interactifs!',
    'section.premiumGames': 'Jeux Premium',
    'section.gamePass': 'Pass de Jeux',
    'section.shop': 'Boutique Spatiale',
    'section.trophyCabinet': 'Vitrine des Trophées',
    'section.trophyCabinetDesc': 'Votre collection de réalisations et certificats de votre voyage d\'exploration spatiale!',
    'section.subscriptions': 'Abonnements',
    'section.funFacts': 'Faits Amusants',
    'section.about': '✨ À Propos de Classe Cosmique',
    'section.aboutMission': 'Notre Mission',
    'section.aboutMissionDesc': 'Classe Cosmique est conçue pour éveiller la curiosité sur l\'univers chez les jeunes esprits! Nous rendons l\'apprentissage de l\'espace amusant et accessible pour les enfants de 7 à 13 ans.',
    'section.aboutMissionDesc2': 'Des planètes de notre système solaire aux galaxies lointaines, des nébuleuses colorées aux mystérieux trous noirs - il y a tant à explorer!',
    'common.learn': 'Apprendre',
    'common.play': 'Jouer',
    'common.explore': 'Explorer',
    'common.learnDesc': 'Découvrez des faits amusants sur chaque type de corps céleste dans notre univers.',
    'common.playDesc': 'Testez vos connaissances avec des quiz amusants et gagnez des badges spatiaux!',
    'common.exploreDesc': 'Regardez des vidéos et lisez des livres pour jeunes explorateurs spatiaux.',
    'common.videos': 'Vidéos',
    'common.books': 'Livres',
    'common.audiobooks': 'Livres Audio',
    'common.all': 'Tout',
    'common.close': 'Fermer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.readNow': 'Lire Maintenant',
    'common.watchNow': 'Regarder Maintenant',
    'common.listenNow': 'Écouter Maintenant',
    'common.noAchievements': 'Pas Encore de Réalisations',
    'common.noAchievementsDesc': 'Complétez des cours, jeux et quiz pour gagner des réalisations!',
    'common.totalAchievements': 'Réalisations Totales',
    'common.earnedOn': 'Obtenu le',
    'common.locked': 'Verrouillé',
    'footer.tagline': 'Rendre l\'exploration spatiale amusante pour les jeunes esprits! 🚀',
    'footer.explore': 'Explorer',
    'footer.learnPlay': 'Apprendre et Jouer',
    'footer.resources': 'Ressources',
    'footer.universeExplorer': 'Explorateur de l\'Univers',
    'footer.celestialLibrary': 'Bibliothèque Céleste',
    'footer.quizzes': 'Quiz',
    'footer.forParents': 'Pour Parents et Enseignants',
    'footer.contact': 'Contact',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.madeWith': 'Fait avec',
    'footer.copyright': '© 2024 Classe Cosmique. Continuez à explorer les étoiles! ✨',
    'games.quiz': 'Quiz',
    'games.sizeCompare': 'Comparer Tailles',
    'games.rocketShooter': 'Tireur de Fusée',
    'games.memoryMatch': 'Mémoire',
    'games.wordScramble': 'Mots Mélangés',
    'games.rocketMath': 'Maths Fusée',
    'library.videos': 'Vidéos',
    'library.books': 'Livres',
    'library.audiobooks': 'Livres Audio',
    'courses.spaceCourses': 'Cours Spatiaux',
    'courses.backToCourses': '← Retour aux Cours',
    'courses.claimCertificate': 'Réclamer Certificat',
    'courses.takeQuiz': 'Faire le Quiz',
    'courses.restartCourse': 'Recommencer le Cours',
    'courses.progress': 'Progrès',
    'courses.learningGoals': 'Objectifs d\'Apprentissage',
    'courses.coursePlan': 'Plan du Cours',
    'courses.plan': 'Plan',
    'about.planetsMoons': 'Planètes et Lunes',
    'about.starsNebulas': 'Étoiles et Nébuleuses',
    'about.galaxies': 'Galaxies',
    'about.booksVideos': 'Livres et Vidéos',
    'language.select': 'Langue',
  },

  de: {
    'nav.home': 'Startseite',
    'nav.solarSystem': 'Sonnensystem',
    'nav.timeline': 'Zeitleiste',
    'nav.constellations': 'Sternbilder',
    'nav.library': 'Bibliothek',
    'nav.games': 'Spiele',
    'nav.subscriptions': 'Abonnements',
    'nav.funFacts': 'Wissenswertes',
    'nav.about': 'Über uns',
    'nav.startJourney': 'Starte deine Reise',
    'nav.cosmicClassroom': 'Kosmisches Klassenzimmer',
    'hero.badge': 'Für junge Entdecker von 7 bis 13 Jahren',
    'hero.welcome': 'Willkommen im',
    'hero.cosmicClassroom': 'Kosmischen Klassenzimmer',
    'hero.subtitle': 'Erkunde jeden Winkel des Universums! 🚀 Lerne über Planeten, Sterne, Nebel, Galaxien und vieles mehr!',
    'hero.startJourney': 'Starte deine Weltraumreise',
    'hero.takeQuiz': 'Quiz machen',
    'hero.solarSystem': 'Sonnensystem',
    'hero.solarSystemDesc': 'Erkunde Planeten, Monde, Asteroiden und Kometen',
    'hero.starsNebulas': 'Sterne und Nebel',
    'hero.starsNebulasDesc': 'Entdecke Sterntypen, Supernovas und leuchtende Wolken',
    'hero.galaxiesBeyond': 'Galaxien und Mehr',
    'hero.galaxiesBeyondDesc': 'Reise durch Galaxien, Schwarze Löcher und Exoplaneten',
    'section.dailyFact': 'Täglicher Weltraumfakt',
    'section.spaceQnA': 'Weltraum-Fragen und Antworten',
    'section.spaceQnADesc': 'Frage alles über den Weltraum!',
    'section.celestialExplorer': 'Himmelskörper-Explorer',
    'section.spaceTimeline': 'Weltraum-Zeitleiste',
    'section.constellations': 'Sternbilder',
    'section.courses': 'Weltraumkurse',
    'section.coursesDesc': 'Absolviere strukturierte Kurse mit Videos, Büchern und Hörbüchern. Verdiene Zertifikate!',
    'section.giftVouchers': 'Geschenkgutscheine',
    'section.manuscripts': 'Weltraum-Manuskripte',
    'section.library': '📚 Himmlische Bibliothek',
    'section.libraryDesc': 'Schau tolle Videos, erkunde Weltraumbücher und höre Hörbücher über Weltraumtheorien!',
    'section.games': '🎮 Spiele und Quiz',
    'section.gamesDesc': 'Teste dein Weltraumwissen mit lustigen interaktiven Spielen!',
    'section.premiumGames': 'Premium-Spiele',
    'section.gamePass': 'Spielepass',
    'section.shop': 'Weltraum-Shop',
    'section.trophyCabinet': 'Trophäenschrank',
    'section.trophyCabinetDesc': 'Deine Sammlung von Errungenschaften und Zertifikaten deiner Weltraum-Entdeckungsreise!',
    'section.subscriptions': 'Abonnements',
    'section.funFacts': 'Wissenswertes',
    'section.about': '✨ Über Kosmisches Klassenzimmer',
    'section.aboutMission': 'Unsere Mission',
    'section.aboutMissionDesc': 'Kosmisches Klassenzimmer soll die Neugier junger Köpfe über das Universum wecken! Wir machen das Lernen über den Weltraum spaßig und zugänglich für Kinder von 7-13.',
    'section.aboutMissionDesc2': 'Von Planeten in unserem Sonnensystem bis zu fernen Galaxien, bunten Nebeln bis zu mysteriösen Schwarzen Löchern - es gibt so viel zu entdecken!',
    'common.learn': 'Lernen',
    'common.play': 'Spielen',
    'common.explore': 'Erkunden',
    'common.learnDesc': 'Entdecke lustige Fakten über jeden Himmelskörper in unserem Universum.',
    'common.playDesc': 'Teste dein Wissen mit lustigen Quiz und verdiene coole Weltraum-Abzeichen!',
    'common.exploreDesc': 'Schau Videos und lies Bücher für junge Weltraumforscher.',
    'common.videos': 'Videos',
    'common.books': 'Bücher',
    'common.audiobooks': 'Hörbücher',
    'common.all': 'Alle',
    'common.close': 'Schließen',
    'common.back': 'Zurück',
    'common.next': 'Weiter',
    'common.previous': 'Vorherige',
    'common.readNow': 'Jetzt Lesen',
    'common.watchNow': 'Jetzt Ansehen',
    'common.listenNow': 'Jetzt Anhören',
    'common.noAchievements': 'Noch keine Errungenschaften',
    'common.noAchievementsDesc': 'Absolviere Kurse, Spiele und Quiz um Errungenschaften zu verdienen!',
    'common.totalAchievements': 'Errungenschaften Gesamt',
    'common.earnedOn': 'Verdient am',
    'common.locked': 'Gesperrt',
    'footer.tagline': 'Weltraumerkundung für junge Köpfe spaßig machen! 🚀',
    'footer.explore': 'Erkunden',
    'footer.learnPlay': 'Lernen und Spielen',
    'footer.resources': 'Ressourcen',
    'footer.universeExplorer': 'Universum-Explorer',
    'footer.celestialLibrary': 'Himmlische Bibliothek',
    'footer.quizzes': 'Quiz',
    'footer.forParents': 'Für Eltern und Lehrer',
    'footer.contact': 'Kontakt',
    'footer.privacy': 'Datenschutz',
    'footer.madeWith': 'Gemacht mit',
    'footer.copyright': '© 2024 Kosmisches Klassenzimmer. Erkunde weiter die Sterne! ✨',
    'games.quiz': 'Quiz',
    'games.sizeCompare': 'Größenvergleich',
    'games.rocketShooter': 'Raketenschießer',
    'games.memoryMatch': 'Memory',
    'games.wordScramble': 'Wörter-Durcheinander',
    'games.rocketMath': 'Raketen-Mathe',
    'library.videos': 'Videos',
    'library.books': 'Bücher',
    'library.audiobooks': 'Hörbücher',
    'courses.spaceCourses': 'Weltraumkurse',
    'courses.backToCourses': '← Zurück zu Kursen',
    'courses.claimCertificate': 'Zertifikat Anfordern',
    'courses.takeQuiz': 'Quiz Machen',
    'courses.restartCourse': 'Kurs Neu Starten',
    'courses.progress': 'Fortschritt',
    'courses.learningGoals': 'Lernziele',
    'courses.coursePlan': 'Kursplan',
    'courses.plan': 'Plan',
    'about.planetsMoons': 'Planeten und Monde',
    'about.starsNebulas': 'Sterne und Nebel',
    'about.galaxies': 'Galaxien',
    'about.booksVideos': 'Bücher und Videos',
    'language.select': 'Sprache',
  },

  it: {
    'nav.home': 'Home', 'nav.solarSystem': 'Sistema Solare', 'nav.timeline': 'Cronologia', 'nav.constellations': 'Costellazioni', 'nav.library': 'Biblioteca', 'nav.games': 'Giochi', 'nav.subscriptions': 'Abbonamenti', 'nav.funFacts': 'Curiosità', 'nav.about': 'Chi Siamo', 'nav.startJourney': 'Inizia il Viaggio', 'nav.cosmicClassroom': 'Aula Cosmica',
    'hero.badge': 'Per giovani esploratori dai 7 ai 13 anni', 'hero.welcome': 'Benvenuto in', 'hero.cosmicClassroom': 'Aula Cosmica', 'hero.subtitle': 'Esplora ogni angolo dell\'Universo! 🚀 Impara su pianeti, stelle, nebulose, galassie e molto altro!', 'hero.startJourney': 'Inizia il tuo Viaggio Spaziale', 'hero.takeQuiz': 'Fai un Quiz',
    'hero.solarSystem': 'Sistema Solare', 'hero.solarSystemDesc': 'Esplora pianeti, lune, asteroidi e comete', 'hero.starsNebulas': 'Stelle e Nebulose', 'hero.starsNebulasDesc': 'Scopri tipi di stelle, supernove e nubi luminose', 'hero.galaxiesBeyond': 'Galassie e Oltre', 'hero.galaxiesBeyondDesc': 'Viaggia attraverso galassie, buchi neri ed esopianeti',
    'section.dailyFact': 'Fatto Spaziale del Giorno', 'section.spaceQnA': 'Domande e Risposte Spaziali', 'section.spaceQnADesc': 'Chiedi qualsiasi cosa sullo spazio!', 'section.celestialExplorer': 'Esploratore Celeste', 'section.spaceTimeline': 'Cronologia Spaziale', 'section.constellations': 'Costellazioni',
    'section.courses': 'Corsi Spaziali', 'section.coursesDesc': 'Completa corsi strutturati con video, libri e audiolibri. Ottieni certificati!', 'section.giftVouchers': 'Buoni Regalo', 'section.manuscripts': 'Manoscritti Spaziali', 'section.library': '📚 Biblioteca Celeste', 'section.libraryDesc': 'Guarda video incredibili, esplora libri spaziali e ascolta audiolibri!',
    'section.games': '🎮 Giochi e Quiz', 'section.gamesDesc': 'Testa le tue conoscenze spaziali con giochi interattivi!', 'section.premiumGames': 'Giochi Premium', 'section.gamePass': 'Pass Giochi', 'section.shop': 'Negozio Spaziale', 'section.trophyCabinet': 'Bacheca dei Trofei', 'section.trophyCabinetDesc': 'La tua collezione di traguardi e certificati dal tuo viaggio di esplorazione spaziale!',
    'section.subscriptions': 'Abbonamenti', 'section.funFacts': 'Curiosità', 'section.about': '✨ Chi è Aula Cosmica', 'section.aboutMission': 'La Nostra Missione', 'section.aboutMissionDesc': 'Aula Cosmica è progettata per accendere la curiosità sull\'universo nelle giovani menti! Rendiamo l\'apprendimento dello spazio divertente per bambini dai 7 ai 13 anni.', 'section.aboutMissionDesc2': 'Dai pianeti del nostro sistema solare alle galassie lontane - c\'è tanto da esplorare!',
    'common.learn': 'Imparare', 'common.play': 'Giocare', 'common.explore': 'Esplorare', 'common.learnDesc': 'Scopri fatti divertenti su ogni tipo di corpo celeste.', 'common.playDesc': 'Testa le tue conoscenze con quiz divertenti!', 'common.exploreDesc': 'Guarda video e leggi libri per giovani esploratori spaziali.',
    'common.videos': 'Video', 'common.books': 'Libri', 'common.audiobooks': 'Audiolibri', 'common.all': 'Tutto', 'common.close': 'Chiudi', 'common.back': 'Indietro', 'common.next': 'Avanti', 'common.previous': 'Precedente', 'common.readNow': 'Leggi Ora', 'common.watchNow': 'Guarda Ora', 'common.listenNow': 'Ascolta Ora',
    'common.noAchievements': 'Nessun Traguardo Ancora', 'common.noAchievementsDesc': 'Completa corsi, giochi e quiz per guadagnare traguardi!', 'common.totalAchievements': 'Traguardi Totali', 'common.earnedOn': 'Ottenuto il', 'common.locked': 'Bloccato',
    'footer.tagline': 'Rendere l\'esplorazione spaziale divertente per le giovani menti! 🚀', 'footer.explore': 'Esplorare', 'footer.learnPlay': 'Imparare e Giocare', 'footer.resources': 'Risorse', 'footer.universeExplorer': 'Esploratore dell\'Universo', 'footer.celestialLibrary': 'Biblioteca Celeste', 'footer.quizzes': 'Quiz', 'footer.forParents': 'Per Genitori e Insegnanti', 'footer.contact': 'Contatto', 'footer.privacy': 'Politica sulla Privacy', 'footer.madeWith': 'Fatto con', 'footer.copyright': '© 2024 Aula Cosmica. Continua ad esplorare le stelle! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Confronto Dimensioni', 'games.rocketShooter': 'Sparatutto Razzo', 'games.memoryMatch': 'Memoria', 'games.wordScramble': 'Parole Mescolate', 'games.rocketMath': 'Matematica Razzo',
    'library.videos': 'Video', 'library.books': 'Libri', 'library.audiobooks': 'Audiolibri',
    'courses.spaceCourses': 'Corsi Spaziali', 'courses.backToCourses': '← Torna ai Corsi', 'courses.claimCertificate': 'Richiedi Certificato', 'courses.takeQuiz': 'Fai il Quiz', 'courses.restartCourse': 'Ricomincia il Corso', 'courses.progress': 'Progresso', 'courses.learningGoals': 'Obiettivi di Apprendimento', 'courses.coursePlan': 'Piano del Corso', 'courses.plan': 'Piano',
    'about.planetsMoons': 'Pianeti e Lune', 'about.starsNebulas': 'Stelle e Nebulose', 'about.galaxies': 'Galassie', 'about.booksVideos': 'Libri e Video',
    'language.select': 'Lingua',
  },

  pt: {
    'nav.home': 'Início', 'nav.solarSystem': 'Sistema Solar', 'nav.timeline': 'Cronologia', 'nav.constellations': 'Constelações', 'nav.library': 'Biblioteca', 'nav.games': 'Jogos', 'nav.subscriptions': 'Assinaturas', 'nav.funFacts': 'Curiosidades', 'nav.about': 'Sobre', 'nav.startJourney': 'Comece sua Jornada', 'nav.cosmicClassroom': 'Sala Cósmica',
    'hero.badge': 'Para jovens exploradores de 7 a 13 anos', 'hero.welcome': 'Bem-vindo à', 'hero.cosmicClassroom': 'Sala Cósmica', 'hero.subtitle': 'Explore cada canto do Universo! 🚀 Aprenda sobre planetas, estrelas, nebulosas, galáxias e muito mais!', 'hero.startJourney': 'Comece sua Jornada Espacial', 'hero.takeQuiz': 'Faça um Quiz',
    'hero.solarSystem': 'Sistema Solar', 'hero.solarSystemDesc': 'Explore planetas, luas, asteroides e cometas', 'hero.starsNebulas': 'Estrelas e Nebulosas', 'hero.starsNebulasDesc': 'Descubra tipos de estrelas, supernovas e nuvens brilhantes', 'hero.galaxiesBeyond': 'Galáxias e Além', 'hero.galaxiesBeyondDesc': 'Viaje por galáxias, buracos negros e exoplanetas',
    'section.dailyFact': 'Fato Espacial do Dia', 'section.spaceQnA': 'Perguntas e Respostas Espaciais', 'section.spaceQnADesc': 'Pergunte qualquer coisa sobre o espaço!', 'section.celestialExplorer': 'Explorador Celestial', 'section.spaceTimeline': 'Cronologia Espacial', 'section.constellations': 'Constelações',
    'section.courses': 'Cursos Espaciais', 'section.coursesDesc': 'Complete cursos estruturados com vídeos, livros e audiolivros. Ganhe certificados!', 'section.giftVouchers': 'Vales Presente', 'section.manuscripts': 'Manuscritos Espaciais', 'section.library': '📚 Biblioteca Celestial', 'section.libraryDesc': 'Assista vídeos incríveis, explore livros espaciais e ouça audiolivros!',
    'section.games': '🎮 Jogos e Quizzes', 'section.gamesDesc': 'Teste seus conhecimentos espaciais com jogos interativos!', 'section.premiumGames': 'Jogos Premium', 'section.gamePass': 'Passe de Jogos', 'section.shop': 'Loja Espacial', 'section.trophyCabinet': 'Vitrine de Troféus', 'section.trophyCabinetDesc': 'Sua coleção de conquistas e certificados da sua jornada de exploração espacial!',
    'section.subscriptions': 'Assinaturas', 'section.funFacts': 'Curiosidades', 'section.about': '✨ Sobre Sala Cósmica', 'section.aboutMission': 'Nossa Missão', 'section.aboutMissionDesc': 'Sala Cósmica foi projetada para despertar a curiosidade sobre o universo em mentes jovens! Tornamos o aprendizado sobre o espaço divertido para crianças de 7 a 13 anos.', 'section.aboutMissionDesc2': 'De planetas do nosso sistema solar a galáxias distantes - há tanto para explorar!',
    'common.learn': 'Aprender', 'common.play': 'Jogar', 'common.explore': 'Explorar', 'common.learnDesc': 'Descubra fatos divertidos sobre cada corpo celeste.', 'common.playDesc': 'Teste seus conhecimentos com quizzes divertidos!', 'common.exploreDesc': 'Assista vídeos e leia livros para jovens exploradores espaciais.',
    'common.videos': 'Vídeos', 'common.books': 'Livros', 'common.audiobooks': 'Audiolivros', 'common.all': 'Tudo', 'common.close': 'Fechar', 'common.back': 'Voltar', 'common.next': 'Próximo', 'common.previous': 'Anterior', 'common.readNow': 'Ler Agora', 'common.watchNow': 'Assistir Agora', 'common.listenNow': 'Ouvir Agora',
    'common.noAchievements': 'Sem Conquistas Ainda', 'common.noAchievementsDesc': 'Complete cursos, jogos e quizzes para ganhar conquistas!', 'common.totalAchievements': 'Conquistas Totais', 'common.earnedOn': 'Conquistado em', 'common.locked': 'Bloqueado',
    'footer.tagline': 'Tornando a exploração espacial divertida para mentes jovens! 🚀', 'footer.explore': 'Explorar', 'footer.learnPlay': 'Aprender e Jogar', 'footer.resources': 'Recursos', 'footer.universeExplorer': 'Explorador do Universo', 'footer.celestialLibrary': 'Biblioteca Celestial', 'footer.quizzes': 'Quizzes', 'footer.forParents': 'Para Pais e Professores', 'footer.contact': 'Contato', 'footer.privacy': 'Política de Privacidade', 'footer.madeWith': 'Feito com', 'footer.copyright': '© 2024 Sala Cósmica. Continue explorando as estrelas! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Comparar Tamanhos', 'games.rocketShooter': 'Atirador de Foguetes', 'games.memoryMatch': 'Memória', 'games.wordScramble': 'Palavras Embaralhadas', 'games.rocketMath': 'Matemática Foguete',
    'library.videos': 'Vídeos', 'library.books': 'Livros', 'library.audiobooks': 'Audiolivros',
    'courses.spaceCourses': 'Cursos Espaciais', 'courses.backToCourses': '← Voltar aos Cursos', 'courses.claimCertificate': 'Solicitar Certificado', 'courses.takeQuiz': 'Fazer Quiz', 'courses.restartCourse': 'Reiniciar Curso', 'courses.progress': 'Progresso', 'courses.learningGoals': 'Objetivos de Aprendizagem', 'courses.coursePlan': 'Plano do Curso', 'courses.plan': 'Plano',
    'about.planetsMoons': 'Planetas e Luas', 'about.starsNebulas': 'Estrelas e Nebulosas', 'about.galaxies': 'Galáxias', 'about.booksVideos': 'Livros e Vídeos',
    'language.select': 'Idioma',
  },

  ru: {
    'nav.home': 'Главная', 'nav.solarSystem': 'Солнечная Система', 'nav.timeline': 'Хронология', 'nav.constellations': 'Созвездия', 'nav.library': 'Библиотека', 'nav.games': 'Игры', 'nav.subscriptions': 'Подписки', 'nav.funFacts': 'Интересные Факты', 'nav.about': 'О нас', 'nav.startJourney': 'Начни Путешествие', 'nav.cosmicClassroom': 'Космический Класс',
    'hero.badge': 'Для юных исследователей от 7 до 13 лет', 'hero.welcome': 'Добро пожаловать в', 'hero.cosmicClassroom': 'Космический Класс', 'hero.subtitle': 'Исследуй каждый уголок Вселенной! 🚀 Узнай о планетах, звёздах, туманностях, галактиках и многом другом!', 'hero.startJourney': 'Начни Космическое Путешествие', 'hero.takeQuiz': 'Пройти Тест',
    'hero.solarSystem': 'Солнечная Система', 'hero.solarSystemDesc': 'Исследуй планеты, луны, астероиды и кометы', 'hero.starsNebulas': 'Звёзды и Туманности', 'hero.starsNebulasDesc': 'Открой типы звёзд, сверхновые и светящиеся облака', 'hero.galaxiesBeyond': 'Галактики и Дальше', 'hero.galaxiesBeyondDesc': 'Путешествуй по галактикам, чёрным дырам и экзопланетам',
    'section.dailyFact': 'Космический Факт Дня', 'section.spaceQnA': 'Вопросы и Ответы о Космосе', 'section.spaceQnADesc': 'Спроси что угодно о космосе!', 'section.celestialExplorer': 'Небесный Исследователь', 'section.spaceTimeline': 'Космическая Хронология', 'section.constellations': 'Созвездия',
    'section.courses': 'Космические Курсы', 'section.coursesDesc': 'Пройди структурированные курсы с видео, книгами и аудиокнигами. Получи сертификаты!', 'section.giftVouchers': 'Подарочные Сертификаты', 'section.manuscripts': 'Космические Рукописи', 'section.library': '📚 Небесная Библиотека', 'section.libraryDesc': 'Смотри потрясающие видео, изучай книги о космосе и слушай аудиокниги!',
    'section.games': '🎮 Игры и Тесты', 'section.gamesDesc': 'Проверь свои знания о космосе с весёлыми играми!', 'section.premiumGames': 'Премиум Игры', 'section.gamePass': 'Игровой Пасс', 'section.shop': 'Космический Магазин', 'section.trophyCabinet': 'Витрина Трофеев', 'section.trophyCabinetDesc': 'Твоя коллекция достижений и сертификатов твоего космического путешествия!',
    'section.subscriptions': 'Подписки', 'section.funFacts': 'Интересные Факты', 'section.about': '✨ О Космическом Классе', 'section.aboutMission': 'Наша Миссия', 'section.aboutMissionDesc': 'Космический Класс создан чтобы разжечь любопытство о вселенной в молодых умах! Мы делаем изучение космоса весёлым для детей 7-13 лет.', 'section.aboutMissionDesc2': 'От планет нашей солнечной системы до далёких галактик - так много всего можно исследовать!',
    'common.learn': 'Учиться', 'common.play': 'Играть', 'common.explore': 'Исследовать', 'common.learnDesc': 'Узнай интересные факты о каждом небесном теле.', 'common.playDesc': 'Проверь знания с весёлыми тестами и заработай космические значки!', 'common.exploreDesc': 'Смотри видео и читай книги для юных космических исследователей.',
    'common.videos': 'Видео', 'common.books': 'Книги', 'common.audiobooks': 'Аудиокниги', 'common.all': 'Все', 'common.close': 'Закрыть', 'common.back': 'Назад', 'common.next': 'Далее', 'common.previous': 'Назад', 'common.readNow': 'Читать', 'common.watchNow': 'Смотреть', 'common.listenNow': 'Слушать',
    'common.noAchievements': 'Пока нет Достижений', 'common.noAchievementsDesc': 'Заверши курсы, игры и тесты чтобы получить достижения!', 'common.totalAchievements': 'Всего Достижений', 'common.earnedOn': 'Получено', 'common.locked': 'Закреплено',
    'footer.tagline': 'Делаем исследование космоса весёлым для молодых умов! 🚀', 'footer.explore': 'Исследовать', 'footer.learnPlay': 'Учиться и Играть', 'footer.resources': 'Ресурсы', 'footer.universeExplorer': 'Исследователь Вселенной', 'footer.celestialLibrary': 'Небесная Библиотека', 'footer.quizzes': 'Тесты', 'footer.forParents': 'Для Родителей и Учителей', 'footer.contact': 'Контакт', 'footer.privacy': 'Политика Конфиденциальности', 'footer.madeWith': 'Сделано с', 'footer.copyright': '© 2024 Космический Класс. Продолжай исследовать звёзды! ✨',
    'games.quiz': 'Тест', 'games.sizeCompare': 'Сравнение Размеров', 'games.rocketShooter': 'Ракетный Стрелок', 'games.memoryMatch': 'Память', 'games.wordScramble': 'Перемешанные Слова', 'games.rocketMath': 'Ракетная Математика',
    'library.videos': 'Видео', 'library.books': 'Книги', 'library.audiobooks': 'Аудиокниги',
    'courses.spaceCourses': 'Космические Курсы', 'courses.backToCourses': '← Назад к Курсам', 'courses.claimCertificate': 'Получить Сертификат', 'courses.takeQuiz': 'Пройти Тест', 'courses.restartCourse': 'Начать Заново', 'courses.progress': 'Прогресс', 'courses.learningGoals': 'Цели Обучения', 'courses.coursePlan': 'План Курса', 'courses.plan': 'План',
    'about.planetsMoons': 'Планеты и Луны', 'about.starsNebulas': 'Звёзды и Туманности', 'about.galaxies': 'Галактики', 'about.booksVideos': 'Книги и Видео',
    'language.select': 'Язык',
  },

  zh: {
    'nav.home': '首页', 'nav.solarSystem': '太阳系', 'nav.timeline': '时间线', 'nav.constellations': '星座', 'nav.library': '图书馆', 'nav.games': '游戏', 'nav.subscriptions': '订阅', 'nav.funFacts': '趣味知识', 'nav.about': '关于', 'nav.startJourney': '开始旅程', 'nav.cosmicClassroom': '宇宙课堂',
    'hero.badge': '适合7-13岁的小探险家', 'hero.welcome': '欢迎来到', 'hero.cosmicClassroom': '宇宙课堂', 'hero.subtitle': '探索宇宙的每个角落！🚀 了解行星、恒星、星云、星系等等！', 'hero.startJourney': '开始你的太空之旅', 'hero.takeQuiz': '参加测验',
    'hero.solarSystem': '太阳系', 'hero.solarSystemDesc': '探索行星、卫星、小行星和彗星', 'hero.starsNebulas': '恒星与星云', 'hero.starsNebulasDesc': '发现恒星类型、超新星和发光云', 'hero.galaxiesBeyond': '星系及更远', 'hero.galaxiesBeyondDesc': '穿越星系、黑洞和系外行星',
    'section.dailyFact': '每日太空知识', 'section.spaceQnA': '太空问答', 'section.spaceQnADesc': '问任何关于太空的问题！', 'section.celestialExplorer': '天体探索者', 'section.spaceTimeline': '太空时间线', 'section.constellations': '星座',
    'section.courses': '太空课程', 'section.coursesDesc': '完成包含视频、书籍和有声读物的结构化课程。获得证书！', 'section.giftVouchers': '礼品券', 'section.manuscripts': '太空手稿', 'section.library': '📚 天体图书馆', 'section.libraryDesc': '观看精彩视频，探索太空书籍，收听有声读物！',
    'section.games': '🎮 游戏与测验', 'section.gamesDesc': '用有趣的互动游戏测试你的太空知识！', 'section.premiumGames': '高级游戏', 'section.gamePass': '游戏通行证', 'section.shop': '太空商店', 'section.trophyCabinet': '奖杯柜', 'section.trophyCabinetDesc': '你太空探索旅程中的成就和证书收藏！',
    'section.subscriptions': '订阅', 'section.funFacts': '趣味知识', 'section.about': '✨ 关于宇宙课堂', 'section.aboutMission': '我们的使命', 'section.aboutMissionDesc': '宇宙课堂旨在激发青少年对宇宙的好奇心！我们让7-13岁的孩子学习太空变得有趣。', 'section.aboutMissionDesc2': '从太阳系的行星到遥远的星系——有太多值得探索的！',
    'common.learn': '学习', 'common.play': '游戏', 'common.explore': '探索', 'common.learnDesc': '发现宇宙中每种天体的有趣知识。', 'common.playDesc': '通过有趣的测验测试你的知识，赢得太空徽章！', 'common.exploreDesc': '观看视频和阅读专为年轻太空探索者准备的书籍。',
    'common.videos': '视频', 'common.books': '书籍', 'common.audiobooks': '有声读物', 'common.all': '全部', 'common.close': '关闭', 'common.back': '返回', 'common.next': '下一个', 'common.previous': '上一个', 'common.readNow': '立即阅读', 'common.watchNow': '立即观看', 'common.listenNow': '立即收听',
    'common.noAchievements': '暂无成就', 'common.noAchievementsDesc': '完成课程、游戏和测验来获得成就！', 'common.totalAchievements': '总成就', 'common.earnedOn': '获得于', 'common.locked': '已锁定',
    'footer.tagline': '让太空探索对年轻的心灵变得有趣！🚀', 'footer.explore': '探索', 'footer.learnPlay': '学习与游戏', 'footer.resources': '资源', 'footer.universeExplorer': '宇宙探索者', 'footer.celestialLibrary': '天体图书馆', 'footer.quizzes': '测验', 'footer.forParents': '给家长和老师', 'footer.contact': '联系我们', 'footer.privacy': '隐私政策', 'footer.madeWith': '用爱制作', 'footer.copyright': '© 2024 宇宙课堂。继续探索星辰！✨',
    'games.quiz': '测验', 'games.sizeCompare': '大小比较', 'games.rocketShooter': '火箭射手', 'games.memoryMatch': '记忆配对', 'games.wordScramble': '单词拼图', 'games.rocketMath': '火箭数学',
    'library.videos': '视频', 'library.books': '书籍', 'library.audiobooks': '有声读物',
    'courses.spaceCourses': '太空课程', 'courses.backToCourses': '← 返回课程', 'courses.claimCertificate': '领取证书', 'courses.takeQuiz': '参加测验', 'courses.restartCourse': '重新开始', 'courses.progress': '进度', 'courses.learningGoals': '学习目标', 'courses.coursePlan': '课程计划', 'courses.plan': '计划',
    'about.planetsMoons': '行星与卫星', 'about.starsNebulas': '恒星与星云', 'about.galaxies': '星系', 'about.booksVideos': '书籍与视频',
    'language.select': '语言',
  },

  ja: {
    'nav.home': 'ホーム', 'nav.solarSystem': '太陽系', 'nav.timeline': 'タイムライン', 'nav.constellations': '星座', 'nav.library': '図書館', 'nav.games': 'ゲーム', 'nav.subscriptions': 'サブスクリプション', 'nav.funFacts': '豆知識', 'nav.about': '概要', 'nav.startJourney': '旅を始めよう', 'nav.cosmicClassroom': 'コズミック教室',
    'hero.badge': '7〜13歳の若い探検家向け', 'hero.welcome': 'ようこそ', 'hero.cosmicClassroom': 'コズミック教室へ', 'hero.subtitle': '宇宙の隅々を探検しよう！🚀 惑星、星、星雲、銀河などについて学ぼう！', 'hero.startJourney': '宇宙の旅を始めよう', 'hero.takeQuiz': 'クイズに挑戦',
    'hero.solarSystem': '太陽系', 'hero.solarSystemDesc': '惑星、衛星、小惑星、彗星を探検', 'hero.starsNebulas': '星と星雲', 'hero.starsNebulasDesc': '星の種類、超新星、輝く雲を発見', 'hero.galaxiesBeyond': '銀河とその先', 'hero.galaxiesBeyondDesc': '銀河、ブラックホール、系外惑星を旅しよう',
    'section.dailyFact': '今日の宇宙豆知識', 'section.spaceQnA': '宇宙Q&A', 'section.spaceQnADesc': '宇宙について何でも聞いてね！', 'section.celestialExplorer': '天体探検家', 'section.spaceTimeline': '宇宙タイムライン', 'section.constellations': '星座',
    'section.courses': '宇宙コース', 'section.coursesDesc': '動画、本、オーディオブック付きのコースを完了して証明書を獲得！', 'section.giftVouchers': 'ギフト券', 'section.manuscripts': '宇宙の原稿', 'section.library': '📚 天体図書館', 'section.libraryDesc': '素晴らしい動画を見て、宇宙の本を読んで、オーディオブックを聴こう！',
    'section.games': '🎮 ゲームとクイズ', 'section.gamesDesc': '楽しいゲームで宇宙の知識をテスト！', 'section.premiumGames': 'プレミアムゲーム', 'section.gamePass': 'ゲームパス', 'section.shop': '宇宙ショップ', 'section.trophyCabinet': 'トロフィーキャビネット', 'section.trophyCabinetDesc': '宇宙探検の旅からの実績と証明書のコレクション！',
    'section.subscriptions': 'サブスクリプション', 'section.funFacts': '豆知識', 'section.about': '✨ コズミック教室について', 'section.aboutMission': '私たちの使命', 'section.aboutMissionDesc': 'コズミック教室は若い心に宇宙への好奇心を呼び起こすために作られました！7〜13歳の子供たちが楽しく宇宙を学べます。', 'section.aboutMissionDesc2': '太陽系の惑星から遠い銀河まで——探検すべきことがたくさん！',
    'common.learn': '学ぶ', 'common.play': '遊ぶ', 'common.explore': '探検', 'common.learnDesc': '宇宙のあらゆる天体について楽しい事実を発見。', 'common.playDesc': '楽しいクイズで知識をテストして宇宙バッジを獲得！', 'common.exploreDesc': '若い宇宙探検家のための動画と本。',
    'common.videos': '動画', 'common.books': '本', 'common.audiobooks': 'オーディオブック', 'common.all': 'すべて', 'common.close': '閉じる', 'common.back': '戻る', 'common.next': '次へ', 'common.previous': '前へ', 'common.readNow': '今すぐ読む', 'common.watchNow': '今すぐ見る', 'common.listenNow': '今すぐ聴く',
    'common.noAchievements': 'まだ実績なし', 'common.noAchievementsDesc': 'コース、ゲーム、クイズを完了して実績を獲得！', 'common.totalAchievements': '実績合計', 'common.earnedOn': '獲得日', 'common.locked': 'ロック済み',
    'footer.tagline': '若い心に宇宙探検を楽しくする！🚀', 'footer.explore': '探検', 'footer.learnPlay': '学んで遊ぶ', 'footer.resources': 'リソース', 'footer.universeExplorer': '宇宙探検家', 'footer.celestialLibrary': '天体図書館', 'footer.quizzes': 'クイズ', 'footer.forParents': '保護者と教師向け', 'footer.contact': 'お問い合わせ', 'footer.privacy': 'プライバシーポリシー', 'footer.madeWith': '愛を込めて作成', 'footer.copyright': '© 2024 コズミック教室。星を探検し続けよう！✨',
    'games.quiz': 'クイズ', 'games.sizeCompare': 'サイズ比較', 'games.rocketShooter': 'ロケットシューター', 'games.memoryMatch': '神経衰弱', 'games.wordScramble': '言葉パズル', 'games.rocketMath': 'ロケット算数',
    'library.videos': '動画', 'library.books': '本', 'library.audiobooks': 'オーディオブック',
    'courses.spaceCourses': '宇宙コース', 'courses.backToCourses': '← コースに戻る', 'courses.claimCertificate': '証明書を取得', 'courses.takeQuiz': 'クイズに挑戦', 'courses.restartCourse': 'やり直す', 'courses.progress': '進捗', 'courses.learningGoals': '学習目標', 'courses.coursePlan': 'コース計画', 'courses.plan': '計画',
    'about.planetsMoons': '惑星と衛星', 'about.starsNebulas': '星と星雲', 'about.galaxies': '銀河', 'about.booksVideos': '本と動画',
    'language.select': '言語',
  },

  ko: {
    'nav.home': '홈', 'nav.solarSystem': '태양계', 'nav.timeline': '타임라인', 'nav.constellations': '별자리', 'nav.library': '도서관', 'nav.games': '게임', 'nav.subscriptions': '구독', 'nav.funFacts': '재미있는 사실', 'nav.about': '소개', 'nav.startJourney': '여행 시작', 'nav.cosmicClassroom': '우주 교실',
    'hero.badge': '7~13세 어린 탐험가를 위해', 'hero.welcome': '환영합니다', 'hero.cosmicClassroom': '우주 교실에', 'hero.subtitle': '우주의 모든 곳을 탐험하세요! 🚀 행성, 별, 성운, 은하 등에 대해 배우세요!', 'hero.startJourney': '우주 여행을 시작하세요', 'hero.takeQuiz': '퀴즈 풀기',
    'hero.solarSystem': '태양계', 'hero.solarSystemDesc': '행성, 위성, 소행성, 혜성 탐험', 'hero.starsNebulas': '별과 성운', 'hero.starsNebulasDesc': '별의 종류, 초신성, 빛나는 구름 발견', 'hero.galaxiesBeyond': '은하와 그 너머', 'hero.galaxiesBeyondDesc': '은하, 블랙홀, 외계 행성을 여행',
    'section.dailyFact': '오늘의 우주 사실', 'section.spaceQnA': '우주 Q&A', 'section.spaceQnADesc': '우주에 대해 뭐든 물어보세요!', 'section.celestialExplorer': '천체 탐험가', 'section.spaceTimeline': '우주 타임라인', 'section.constellations': '별자리',
    'section.courses': '우주 코스', 'section.coursesDesc': '비디오, 책, 오디오북이 포함된 코스를 완료하고 인증서를 받으세요!', 'section.giftVouchers': '기프트 바우처', 'section.manuscripts': '우주 필사본', 'section.library': '📚 천체 도서관', 'section.libraryDesc': '놀라운 비디오를 보고, 우주 책을 탐험하고, 오디오북을 들으세요!',
    'section.games': '🎮 게임과 퀴즈', 'section.gamesDesc': '재미있는 게임으로 우주 지식을 테스트하세요!', 'section.premiumGames': '프리미엄 게임', 'section.gamePass': '게임 패스', 'section.shop': '우주 상점', 'section.trophyCabinet': '트로피 캐비닛', 'section.trophyCabinetDesc': '우주 탐험 여정에서 얻은 업적과 인증서 컬렉션!',
    'section.subscriptions': '구독', 'section.funFacts': '재미있는 사실', 'section.about': '✨ 우주 교실 소개', 'section.aboutMission': '우리의 사명', 'section.aboutMissionDesc': '우주 교실은 어린이들의 우주에 대한 호기심을 불러일으키기 위해 만들어졌습니다! 7-13세 어린이들이 재미있게 우주를 배울 수 있습니다.', 'section.aboutMissionDesc2': '태양계의 행성부터 먼 은하까지 — 탐험할 것이 너무 많아요!',
    'common.learn': '배우기', 'common.play': '놀기', 'common.explore': '탐험', 'common.learnDesc': '우주의 모든 천체에 대한 재미있는 사실을 발견하세요.', 'common.playDesc': '재미있는 퀴즈로 지식을 테스트하고 우주 배지를 받으세요!', 'common.exploreDesc': '어린 우주 탐험가를 위한 비디오와 책.',
    'common.videos': '비디오', 'common.books': '책', 'common.audiobooks': '오디오북', 'common.all': '전체', 'common.close': '닫기', 'common.back': '뒤로', 'common.next': '다음', 'common.previous': '이전', 'common.readNow': '지금 읽기', 'common.watchNow': '지금 보기', 'common.listenNow': '지금 듣기',
    'common.noAchievements': '아직 업적 없음', 'common.noAchievementsDesc': '코스, 게임, 퀴즈를 완료하여 업적을 획득하세요!', 'common.totalAchievements': '총 업적', 'common.earnedOn': '획득일', 'common.locked': '잠김',
    'footer.tagline': '어린이들에게 우주 탐험을 재미있게! 🚀', 'footer.explore': '탐험', 'footer.learnPlay': '배우고 놀기', 'footer.resources': '자료', 'footer.universeExplorer': '우주 탐험가', 'footer.celestialLibrary': '천체 도서관', 'footer.quizzes': '퀴즈', 'footer.forParents': '부모와 교사를 위해', 'footer.contact': '연락처', 'footer.privacy': '개인정보 보호정책', 'footer.madeWith': '사랑으로 제작', 'footer.copyright': '© 2024 우주 교실. 별을 계속 탐험하세요! ✨',
    'games.quiz': '퀴즈', 'games.sizeCompare': '크기 비교', 'games.rocketShooter': '로켓 슈터', 'games.memoryMatch': '기억력 게임', 'games.wordScramble': '단어 퍼즐', 'games.rocketMath': '로켓 수학',
    'library.videos': '비디오', 'library.books': '책', 'library.audiobooks': '오디오북',
    'courses.spaceCourses': '우주 코스', 'courses.backToCourses': '← 코스로 돌아가기', 'courses.claimCertificate': '인증서 받기', 'courses.takeQuiz': '퀴즈 풀기', 'courses.restartCourse': '코스 다시 시작', 'courses.progress': '진행률', 'courses.learningGoals': '학습 목표', 'courses.coursePlan': '코스 계획', 'courses.plan': '계획',
    'about.planetsMoons': '행성과 위성', 'about.starsNebulas': '별과 성운', 'about.galaxies': '은하', 'about.booksVideos': '책과 비디오',
    'language.select': '언어',
  },

  hi: {
    'nav.home': 'होम', 'nav.solarSystem': 'सौर मंडल', 'nav.timeline': 'समयरेखा', 'nav.constellations': 'नक्षत्र', 'nav.library': 'पुस्तकालय', 'nav.games': 'खेल', 'nav.subscriptions': 'सदस्यता', 'nav.funFacts': 'रोचक तथ्य', 'nav.about': 'हमारे बारे में', 'nav.startJourney': 'अपनी यात्रा शुरू करें', 'nav.cosmicClassroom': 'कॉस्मिक क्लासरूम',
    'hero.badge': '7-13 साल के युवा खोजकर्ताओं के लिए', 'hero.welcome': 'स्वागत है', 'hero.cosmicClassroom': 'कॉस्मिक क्लासरूम में', 'hero.subtitle': 'ब्रह्मांड के हर कोने का अन्वेषण करें! 🚀 ग्रहों, तारों, नीहारिकाओं, आकाशगंगाओं और बहुत कुछ के बारे में जानें!', 'hero.startJourney': 'अपनी अंतरिक्ष यात्रा शुरू करें', 'hero.takeQuiz': 'क्विज़ लें',
    'hero.solarSystem': 'सौर मंडल', 'hero.solarSystemDesc': 'ग्रहों, चंद्रमाओं, क्षुद्रग्रहों और धूमकेतुओं का अन्वेषण करें', 'hero.starsNebulas': 'तारे और नीहारिकाएं', 'hero.starsNebulasDesc': 'तारों के प्रकार, सुपरनोवा और चमकते बादलों की खोज करें', 'hero.galaxiesBeyond': 'आकाशगंगाएं और उससे आगे', 'hero.galaxiesBeyondDesc': 'आकाशगंगाओं, ब्लैक होल और बाह्यग्रहों की यात्रा करें',
    'section.dailyFact': 'आज का अंतरिक्ष तथ्य', 'section.spaceQnA': 'अंतरिक्ष प्रश्नोत्तर', 'section.spaceQnADesc': 'अंतरिक्ष के बारे में कुछ भी पूछें!', 'section.celestialExplorer': 'खगोलीय अन्वेषक', 'section.spaceTimeline': 'अंतरिक्ष समयरेखा', 'section.constellations': 'नक्षत्र',
    'section.courses': 'अंतरिक्ष पाठ्यक्रम', 'section.coursesDesc': 'वीडियो, किताबें और ऑडियोबुक के साथ पाठ्यक्रम पूरा करें। प्रमाणपत्र अर्जित करें!', 'section.giftVouchers': 'उपहार वाउचर', 'section.manuscripts': 'अंतरिक्ष पांडुलिपियां', 'section.library': '📚 खगोलीय पुस्तकालय', 'section.libraryDesc': 'अद्भुत वीडियो देखें, अंतरिक्ष की किताबें पढ़ें और ऑडियोबुक सुनें!',
    'section.games': '🎮 खेल और क्विज़', 'section.gamesDesc': 'मज़ेदार इंटरैक्टिव खेलों से अपने अंतरिक्ष ज्ञान का परीक्षण करें!', 'section.premiumGames': 'प्रीमियम खेल', 'section.gamePass': 'गेम पास', 'section.shop': 'अंतरिक्ष दुकान', 'section.trophyCabinet': 'ट्रॉफी कैबिनेट', 'section.trophyCabinetDesc': 'आपकी अंतरिक्ष अन्वेषण यात्रा से उपलब्धियों और प्रमाणपत्रों का संग्रह!',
    'section.subscriptions': 'सदस्यता', 'section.funFacts': 'रोचक तथ्य', 'section.about': '✨ कॉस्मिक क्लासरूम के बारे में', 'section.aboutMission': 'हमारा मिशन', 'section.aboutMissionDesc': 'कॉस्मिक क्लासरूम युवा मन में ब्रह्मांड के बारे में जिज्ञासा जगाने के लिए बनाया गया है! हम 7-13 साल के बच्चों के लिए अंतरिक्ष सीखना मज़ेदार बनाते हैं।', 'section.aboutMissionDesc2': 'हमारे सौर मंडल के ग्रहों से लेकर दूर की आकाशगंगाओं तक — खोजने के लिए बहुत कुछ है!',
    'common.learn': 'सीखें', 'common.play': 'खेलें', 'common.explore': 'अन्वेषण', 'common.learnDesc': 'ब्रह्मांड में हर खगोलीय पिंड के बारे में रोचक तथ्य खोजें।', 'common.playDesc': 'मज़ेदार क्विज़ से ज्ञान का परीक्षण करें और अंतरिक्ष बैज कमाएं!', 'common.exploreDesc': 'युवा अंतरिक्ष खोजकर्ताओं के लिए वीडियो और किताबें।',
    'common.videos': 'वीडियो', 'common.books': 'किताबें', 'common.audiobooks': 'ऑडियोबुक', 'common.all': 'सभी', 'common.close': 'बंद करें', 'common.back': 'वापस', 'common.next': 'अगला', 'common.previous': 'पिछला', 'common.readNow': 'अभी पढ़ें', 'common.watchNow': 'अभी देखें', 'common.listenNow': 'अभी सुनें',
    'common.noAchievements': 'अभी कोई उपलब्धि नहीं', 'common.noAchievementsDesc': 'उपलब्धियां कमाने के लिए पाठ्यक्रम, खेल और क्विज़ पूरा करें!', 'common.totalAchievements': 'कुल उपलब्धियां', 'common.earnedOn': 'प्राप्त', 'common.locked': 'लॉक',
    'footer.tagline': 'युवा मन के लिए अंतरिक्ष अन्वेषण को मज़ेदार बनाना! 🚀', 'footer.explore': 'अन्वेषण', 'footer.learnPlay': 'सीखें और खेलें', 'footer.resources': 'संसाधन', 'footer.universeExplorer': 'ब्रह्मांड अन्वेषक', 'footer.celestialLibrary': 'खगोलीय पुस्तकालय', 'footer.quizzes': 'क्विज़', 'footer.forParents': 'माता-पिता और शिक्षकों के लिए', 'footer.contact': 'संपर्क', 'footer.privacy': 'गोपनीयता नीति', 'footer.madeWith': 'प्यार से बनाया', 'footer.copyright': '© 2024 कॉस्मिक क्लासरूम। तारों की खोज जारी रखें! ✨',
    'games.quiz': 'क्विज़', 'games.sizeCompare': 'आकार तुलना', 'games.rocketShooter': 'रॉकेट शूटर', 'games.memoryMatch': 'मेमोरी मैच', 'games.wordScramble': 'शब्द पहेली', 'games.rocketMath': 'रॉकेट गणित',
    'library.videos': 'वीडियो', 'library.books': 'किताबें', 'library.audiobooks': 'ऑडियोबुक',
    'courses.spaceCourses': 'अंतरिक्ष पाठ्यक्रम', 'courses.backToCourses': '← पाठ्यक्रमों पर वापस', 'courses.claimCertificate': 'प्रमाणपत्र प्राप्त करें', 'courses.takeQuiz': 'क्विज़ लें', 'courses.restartCourse': 'पुनः शुरू करें', 'courses.progress': 'प्रगति', 'courses.learningGoals': 'सीखने के लक्ष्य', 'courses.coursePlan': 'पाठ्यक्रम योजना', 'courses.plan': 'योजना',
    'about.planetsMoons': 'ग्रह और चंद्रमा', 'about.starsNebulas': 'तारे और नीहारिकाएं', 'about.galaxies': 'आकाशगंगाएं', 'about.booksVideos': 'किताबें और वीडियो',
    'language.select': 'भाषा',
  },

  ar: {
    'nav.home': 'الرئيسية', 'nav.solarSystem': 'النظام الشمسي', 'nav.timeline': 'الجدول الزمني', 'nav.constellations': 'الأبراج', 'nav.library': 'المكتبة', 'nav.games': 'الألعاب', 'nav.subscriptions': 'الاشتراكات', 'nav.funFacts': 'حقائق ممتعة', 'nav.about': 'عن', 'nav.startJourney': 'ابدأ رحلتك', 'nav.cosmicClassroom': 'الفصل الكوني',
    'hero.badge': 'للمستكشفين الصغار من 7 إلى 13 سنة', 'hero.welcome': 'مرحباً في', 'hero.cosmicClassroom': 'الفصل الكوني', 'hero.subtitle': 'استكشف كل زاوية من الكون! 🚀 تعلم عن الكواكب والنجوم والسدم والمجرات والمزيد!', 'hero.startJourney': 'ابدأ رحلتك الفضائية', 'hero.takeQuiz': 'خذ اختباراً',
    'hero.solarSystem': 'النظام الشمسي', 'hero.solarSystemDesc': 'استكشف الكواكب والأقمار والكويكبات والمذنبات', 'hero.starsNebulas': 'النجوم والسدم', 'hero.starsNebulasDesc': 'اكتشف أنواع النجوم والمستعرات العظمى والسحب المتوهجة', 'hero.galaxiesBeyond': 'المجرات وما وراءها', 'hero.galaxiesBeyondDesc': 'سافر عبر المجرات والثقوب السوداء والكواكب الخارجية',
    'section.dailyFact': 'حقيقة فضائية يومية', 'section.spaceQnA': 'أسئلة وأجوبة فضائية', 'section.spaceQnADesc': 'اسأل أي شيء عن الفضاء!', 'section.celestialExplorer': 'المستكشف السماوي', 'section.spaceTimeline': 'الجدول الزمني الفضائي', 'section.constellations': 'الأبراج',
    'section.courses': 'دورات فضائية', 'section.coursesDesc': 'أكمل دورات منظمة مع فيديوهات وكتب وكتب صوتية. احصل على شهادات!', 'section.giftVouchers': 'قسائم هدايا', 'section.manuscripts': 'مخطوطات فضائية', 'section.library': '📚 المكتبة السماوية', 'section.libraryDesc': 'شاهد فيديوهات رائعة واستكشف كتب الفضاء واستمع لكتب صوتية!',
    'section.games': '🎮 ألعاب واختبارات', 'section.gamesDesc': 'اختبر معرفتك الفضائية بألعاب تفاعلية ممتعة!', 'section.premiumGames': 'ألعاب مميزة', 'section.gamePass': 'بطاقة الألعاب', 'section.shop': 'المتجر الفضائي', 'section.trophyCabinet': 'خزانة الجوائز', 'section.trophyCabinetDesc': 'مجموعتك من الإنجازات والشهادات من رحلة استكشاف الفضاء!',
    'section.subscriptions': 'الاشتراكات', 'section.funFacts': 'حقائق ممتعة', 'section.about': '✨ عن الفصل الكوني', 'section.aboutMission': 'مهمتنا', 'section.aboutMissionDesc': 'الفصل الكوني مصمم لإشعال الفضول حول الكون في العقول الشابة! نجعل تعلم الفضاء ممتعاً للأطفال من 7-13 سنة.', 'section.aboutMissionDesc2': 'من كواكب نظامنا الشمسي إلى المجرات البعيدة — هناك الكثير لاستكشافه!',
    'common.learn': 'تعلم', 'common.play': 'العب', 'common.explore': 'استكشف', 'common.learnDesc': 'اكتشف حقائق ممتعة عن كل جرم سماوي.', 'common.playDesc': 'اختبر معرفتك مع اختبارات ممتعة واربح شارات فضائية!', 'common.exploreDesc': 'شاهد فيديوهات واقرأ كتب للمستكشفين الصغار.',
    'common.videos': 'فيديوهات', 'common.books': 'كتب', 'common.audiobooks': 'كتب صوتية', 'common.all': 'الكل', 'common.close': 'إغلاق', 'common.back': 'رجوع', 'common.next': 'التالي', 'common.previous': 'السابق', 'common.readNow': 'اقرأ الآن', 'common.watchNow': 'شاهد الآن', 'common.listenNow': 'استمع الآن',
    'common.noAchievements': 'لا إنجازات بعد', 'common.noAchievementsDesc': 'أكمل الدورات والألعاب والاختبارات لكسب الإنجازات!', 'common.totalAchievements': 'إجمالي الإنجازات', 'common.earnedOn': 'حصل عليه في', 'common.locked': 'مقفل',
    'footer.tagline': 'جعل استكشاف الفضاء ممتعاً للعقول الشابة! 🚀', 'footer.explore': 'استكشف', 'footer.learnPlay': 'تعلم والعب', 'footer.resources': 'موارد', 'footer.universeExplorer': 'مستكشف الكون', 'footer.celestialLibrary': 'المكتبة السماوية', 'footer.quizzes': 'اختبارات', 'footer.forParents': 'للآباء والمعلمين', 'footer.contact': 'اتصل بنا', 'footer.privacy': 'سياسة الخصوصية', 'footer.madeWith': 'صنع بـ', 'footer.copyright': '© 2024 الفصل الكوني. استمر في استكشاف النجوم! ✨',
    'games.quiz': 'اختبار', 'games.sizeCompare': 'مقارنة الأحجام', 'games.rocketShooter': 'إطلاق الصواريخ', 'games.memoryMatch': 'مطابقة الذاكرة', 'games.wordScramble': 'خلط الكلمات', 'games.rocketMath': 'رياضيات الصاروخ',
    'library.videos': 'فيديوهات', 'library.books': 'كتب', 'library.audiobooks': 'كتب صوتية',
    'courses.spaceCourses': 'دورات فضائية', 'courses.backToCourses': '← العودة للدورات', 'courses.claimCertificate': 'طلب الشهادة', 'courses.takeQuiz': 'خذ الاختبار', 'courses.restartCourse': 'إعادة البدء', 'courses.progress': 'التقدم', 'courses.learningGoals': 'أهداف التعلم', 'courses.coursePlan': 'خطة الدورة', 'courses.plan': 'الخطة',
    'about.planetsMoons': 'كواكب وأقمار', 'about.starsNebulas': 'نجوم وسدم', 'about.galaxies': 'مجرات', 'about.booksVideos': 'كتب وفيديوهات',
    'language.select': 'اللغة',
  },

  tr: {
    'nav.home': 'Ana Sayfa', 'nav.solarSystem': 'Güneş Sistemi', 'nav.timeline': 'Zaman Çizelgesi', 'nav.constellations': 'Takımyıldızlar', 'nav.library': 'Kütüphane', 'nav.games': 'Oyunlar', 'nav.subscriptions': 'Abonelikler', 'nav.funFacts': 'Eğlenceli Bilgiler', 'nav.about': 'Hakkında', 'nav.startJourney': 'Yolculuğunu Başlat', 'nav.cosmicClassroom': 'Kozmik Sınıf',
    'hero.badge': '7-13 yaş arası genç kaşifler için', 'hero.welcome': 'Hoş Geldiniz', 'hero.cosmicClassroom': 'Kozmik Sınıf\'a', 'hero.subtitle': 'Evrenin her köşesini keşfedin! 🚀 Gezegenler, yıldızlar, bulutsular, galaksiler ve çok daha fazlası!', 'hero.startJourney': 'Uzay Yolculuğunu Başlat', 'hero.takeQuiz': 'Teste Gir',
    'hero.solarSystem': 'Güneş Sistemi', 'hero.solarSystemDesc': 'Gezegenleri, uyduları, asteroitleri ve kuyruklu yıldızları keşfedin', 'hero.starsNebulas': 'Yıldızlar ve Bulutsular', 'hero.starsNebulasDesc': 'Yıldız türlerini, süpernovaları ve parlayan bulutları keşfedin', 'hero.galaxiesBeyond': 'Galaksiler ve Ötesi', 'hero.galaxiesBeyondDesc': 'Galaksiler, kara delikler ve ötegezegenlerde yolculuk yapın',
    'section.dailyFact': 'Günün Uzay Bilgisi', 'section.spaceQnA': 'Uzay Soru-Cevap', 'section.spaceQnADesc': 'Uzay hakkında her şeyi sorun!', 'section.celestialExplorer': 'Gök Cismi Kaşifi', 'section.spaceTimeline': 'Uzay Zaman Çizelgesi', 'section.constellations': 'Takımyıldızlar',
    'section.courses': 'Uzay Kursları', 'section.coursesDesc': 'Video, kitap ve sesli kitaplarla yapılandırılmış kursları tamamlayın. Sertifika kazanın!', 'section.giftVouchers': 'Hediye Çekleri', 'section.manuscripts': 'Uzay El Yazmaları', 'section.library': '📚 Göksel Kütüphane', 'section.libraryDesc': 'Harika videoları izleyin, uzay kitaplarını keşfedin ve sesli kitapları dinleyin!',
    'section.games': '🎮 Oyunlar ve Testler', 'section.gamesDesc': 'Eğlenceli oyunlarla uzay bilginizi test edin!', 'section.premiumGames': 'Premium Oyunlar', 'section.gamePass': 'Oyun Kartı', 'section.shop': 'Uzay Dükkanı', 'section.trophyCabinet': 'Kupa Vitrini', 'section.trophyCabinetDesc': 'Uzay keşif yolculuğunuzdan başarılar ve sertifikalar koleksiyonu!',
    'section.subscriptions': 'Abonelikler', 'section.funFacts': 'Eğlenceli Bilgiler', 'section.about': '✨ Kozmik Sınıf Hakkında', 'section.aboutMission': 'Misyonumuz', 'section.aboutMissionDesc': 'Kozmik Sınıf, genç zihinlerde evren hakkında merak uyandırmak için tasarlandı! 7-13 yaş çocuklar için uzayı öğrenmeyi eğlenceli hale getiriyoruz.', 'section.aboutMissionDesc2': 'Güneş sistemimizdeki gezegenlerden uzak galaksilere kadar — keşfedecek çok şey var!',
    'common.learn': 'Öğren', 'common.play': 'Oyna', 'common.explore': 'Keşfet', 'common.learnDesc': 'Her gök cismi hakkında eğlenceli bilgiler keşfedin.', 'common.playDesc': 'Eğlenceli testlerle bilginizi test edin ve uzay rozetleri kazanın!', 'common.exploreDesc': 'Genç uzay kaşifleri için videolar ve kitaplar izleyin.',
    'common.videos': 'Videolar', 'common.books': 'Kitaplar', 'common.audiobooks': 'Sesli Kitaplar', 'common.all': 'Hepsi', 'common.close': 'Kapat', 'common.back': 'Geri', 'common.next': 'İleri', 'common.previous': 'Önceki', 'common.readNow': 'Şimdi Oku', 'common.watchNow': 'Şimdi İzle', 'common.listenNow': 'Şimdi Dinle',
    'common.noAchievements': 'Henüz Başarı Yok', 'common.noAchievementsDesc': 'Başarı kazanmak için kursları, oyunları ve testleri tamamlayın!', 'common.totalAchievements': 'Toplam Başarı', 'common.earnedOn': 'Kazanıldı', 'common.locked': 'Kilitli',
    'footer.tagline': 'Genç zihinler için uzay keşfini eğlenceli hale getirmek! 🚀', 'footer.explore': 'Keşfet', 'footer.learnPlay': 'Öğren ve Oyna', 'footer.resources': 'Kaynaklar', 'footer.universeExplorer': 'Evren Kaşifi', 'footer.celestialLibrary': 'Göksel Kütüphane', 'footer.quizzes': 'Testler', 'footer.forParents': 'Ebeveynler ve Öğretmenler İçin', 'footer.contact': 'İletişim', 'footer.privacy': 'Gizlilik Politikası', 'footer.madeWith': 'Sevgiyle yapıldı', 'footer.copyright': '© 2024 Kozmik Sınıf. Yıldızları keşfetmeye devam edin! ✨',
    'games.quiz': 'Test', 'games.sizeCompare': 'Boyut Karşılaştır', 'games.rocketShooter': 'Roket Atıcı', 'games.memoryMatch': 'Hafıza Eşleştirme', 'games.wordScramble': 'Kelime Karıştırma', 'games.rocketMath': 'Roket Matematik',
    'library.videos': 'Videolar', 'library.books': 'Kitaplar', 'library.audiobooks': 'Sesli Kitaplar',
    'courses.spaceCourses': 'Uzay Kursları', 'courses.backToCourses': '← Kurslara Dön', 'courses.claimCertificate': 'Sertifika Al', 'courses.takeQuiz': 'Teste Gir', 'courses.restartCourse': 'Kursu Yeniden Başlat', 'courses.progress': 'İlerleme', 'courses.learningGoals': 'Öğrenim Hedefleri', 'courses.coursePlan': 'Kurs Planı', 'courses.plan': 'Plan',
    'about.planetsMoons': 'Gezegenler ve Uydular', 'about.starsNebulas': 'Yıldızlar ve Bulutsular', 'about.galaxies': 'Galaksiler', 'about.booksVideos': 'Kitaplar ve Videolar',
    'language.select': 'Dil',
  },

  nl: {
    'nav.home': 'Home', 'nav.solarSystem': 'Zonnestelsel', 'nav.timeline': 'Tijdlijn', 'nav.constellations': 'Sterrenbeelden', 'nav.library': 'Bibliotheek', 'nav.games': 'Spellen', 'nav.subscriptions': 'Abonnementen', 'nav.funFacts': 'Leuke Feiten', 'nav.about': 'Over Ons', 'nav.startJourney': 'Begin je Reis', 'nav.cosmicClassroom': 'Kosmisch Klaslokaal',
    'hero.badge': 'Voor jonge ontdekkers van 7 tot 13 jaar', 'hero.welcome': 'Welkom bij', 'hero.cosmicClassroom': 'Kosmisch Klaslokaal', 'hero.subtitle': 'Verken elke hoek van het Universum! 🚀 Leer over planeten, sterren, nevels, sterrenstelsels en nog veel meer!', 'hero.startJourney': 'Begin je Ruimtereis', 'hero.takeQuiz': 'Doe een Quiz',
    'hero.solarSystem': 'Zonnestelsel', 'hero.solarSystemDesc': 'Verken planeten, manen, asteroïden en kometen', 'hero.starsNebulas': 'Sterren en Nevels', 'hero.starsNebulasDesc': 'Ontdek stertypen, supernova\'s en gloeiende wolken', 'hero.galaxiesBeyond': 'Sterrenstelsels en Verder', 'hero.galaxiesBeyondDesc': 'Reis door sterrenstelsels, zwarte gaten en exoplaneten',
    'section.dailyFact': 'Dagelijks Ruimtefeit', 'section.spaceQnA': 'Ruimte Vraag & Antwoord', 'section.spaceQnADesc': 'Vraag alles over de ruimte!', 'section.celestialExplorer': 'Hemelse Ontdekker', 'section.spaceTimeline': 'Ruimte Tijdlijn', 'section.constellations': 'Sterrenbeelden',
    'section.courses': 'Ruimtecursussen', 'section.coursesDesc': 'Voltooi cursussen met video\'s, boeken en luisterboeken. Verdien certificaten!', 'section.giftVouchers': 'Cadeaubonnen', 'section.manuscripts': 'Ruimte Manuscripten', 'section.library': '📚 Hemelse Bibliotheek', 'section.libraryDesc': 'Bekijk geweldige video\'s, verken ruimteboeken en luister naar luisterboeken!',
    'section.games': '🎮 Spellen en Quizzen', 'section.gamesDesc': 'Test je ruimtekennis met leuke interactieve spellen!', 'section.premiumGames': 'Premium Spellen', 'section.gamePass': 'Spelenpas', 'section.shop': 'Ruimte Winkel', 'section.trophyCabinet': 'Trofeeënkast', 'section.trophyCabinetDesc': 'Je collectie van prestaties en certificaten!',
    'section.subscriptions': 'Abonnementen', 'section.funFacts': 'Leuke Feiten', 'section.about': '✨ Over Kosmisch Klaslokaal', 'section.aboutMission': 'Onze Missie', 'section.aboutMissionDesc': 'Kosmisch Klaslokaal is ontworpen om nieuwsgierigheid over het universum aan te wakkeren bij jonge geesten! We maken leren over de ruimte leuk voor kinderen van 7-13.', 'section.aboutMissionDesc2': 'Van planeten in ons zonnestelsel tot verre sterrenstelsels — er is zoveel te ontdekken!',
    'common.learn': 'Leren', 'common.play': 'Spelen', 'common.explore': 'Ontdekken', 'common.learnDesc': 'Ontdek leuke feiten over elk hemellichaam.', 'common.playDesc': 'Test je kennis met leuke quizzen en verdien ruimte-badges!', 'common.exploreDesc': 'Bekijk video\'s en lees boeken voor jonge ruimte-ontdekkers.',
    'common.videos': 'Video\'s', 'common.books': 'Boeken', 'common.audiobooks': 'Luisterboeken', 'common.all': 'Alles', 'common.close': 'Sluiten', 'common.back': 'Terug', 'common.next': 'Volgende', 'common.previous': 'Vorige', 'common.readNow': 'Nu Lezen', 'common.watchNow': 'Nu Kijken', 'common.listenNow': 'Nu Luisteren',
    'common.noAchievements': 'Nog Geen Prestaties', 'common.noAchievementsDesc': 'Voltooi cursussen, spellen en quizzen om prestaties te verdienen!', 'common.totalAchievements': 'Totaal Prestaties', 'common.earnedOn': 'Verdiend op', 'common.locked': 'Vergrendeld',
    'footer.tagline': 'Ruimteverkenning leuk maken voor jonge geesten! 🚀', 'footer.explore': 'Ontdekken', 'footer.learnPlay': 'Leren en Spelen', 'footer.resources': 'Bronnen', 'footer.universeExplorer': 'Universum Ontdekker', 'footer.celestialLibrary': 'Hemelse Bibliotheek', 'footer.quizzes': 'Quizzen', 'footer.forParents': 'Voor Ouders en Leraren', 'footer.contact': 'Contact', 'footer.privacy': 'Privacybeleid', 'footer.madeWith': 'Gemaakt met', 'footer.copyright': '© 2024 Kosmisch Klaslokaal. Blijf de sterren ontdekken! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Groottevergelijking', 'games.rocketShooter': 'Raket Schieter', 'games.memoryMatch': 'Geheugenspel', 'games.wordScramble': 'Woordpuzzel', 'games.rocketMath': 'Raket Wiskunde',
    'library.videos': 'Video\'s', 'library.books': 'Boeken', 'library.audiobooks': 'Luisterboeken',
    'courses.spaceCourses': 'Ruimtecursussen', 'courses.backToCourses': '← Terug naar Cursussen', 'courses.claimCertificate': 'Certificaat Claimen', 'courses.takeQuiz': 'Quiz Doen', 'courses.restartCourse': 'Cursus Opnieuw', 'courses.progress': 'Voortgang', 'courses.learningGoals': 'Leerdoelen', 'courses.coursePlan': 'Cursusplan', 'courses.plan': 'Plan',
    'about.planetsMoons': 'Planeten en Manen', 'about.starsNebulas': 'Sterren en Nevels', 'about.galaxies': 'Sterrenstelsels', 'about.booksVideos': 'Boeken en Video\'s',
    'language.select': 'Taal',
  },

  pl: {
    'nav.home': 'Strona Główna', 'nav.solarSystem': 'Układ Słoneczny', 'nav.timeline': 'Oś Czasu', 'nav.constellations': 'Gwiazdozbiory', 'nav.library': 'Biblioteka', 'nav.games': 'Gry', 'nav.subscriptions': 'Subskrypcje', 'nav.funFacts': 'Ciekawostki', 'nav.about': 'O Nas', 'nav.startJourney': 'Rozpocznij Podróż', 'nav.cosmicClassroom': 'Kosmiczna Klasa',
    'hero.badge': 'Dla młodych odkrywców w wieku 7-13 lat', 'hero.welcome': 'Witaj w', 'hero.cosmicClassroom': 'Kosmicznej Klasie', 'hero.subtitle': 'Odkryj każdy zakątek Wszechświata! 🚀 Poznaj planety, gwiazdy, mgławice, galaktyki i wiele więcej!', 'hero.startJourney': 'Rozpocznij Kosmiczną Podróż', 'hero.takeQuiz': 'Rozwiąż Quiz',
    'hero.solarSystem': 'Układ Słoneczny', 'hero.solarSystemDesc': 'Odkryj planety, księżyce, asteroidy i komety', 'hero.starsNebulas': 'Gwiazdy i Mgławice', 'hero.starsNebulasDesc': 'Poznaj typy gwiazd, supernowe i świecące obłoki', 'hero.galaxiesBeyond': 'Galaktyki i Dalej', 'hero.galaxiesBeyondDesc': 'Podróżuj przez galaktyki, czarne dziury i egzoplanety',
    'section.dailyFact': 'Kosmiczny Fakt Dnia', 'section.spaceQnA': 'Kosmiczne Pytania i Odpowiedzi', 'section.spaceQnADesc': 'Zapytaj o cokolwiek o kosmosie!', 'section.celestialExplorer': 'Odkrywca Nieba', 'section.spaceTimeline': 'Kosmiczna Oś Czasu', 'section.constellations': 'Gwiazdozbiory',
    'section.courses': 'Kursy Kosmiczne', 'section.coursesDesc': 'Ukończ kursy z filmami, książkami i audiobookami. Zdobądź certyfikaty!', 'section.giftVouchers': 'Vouchery Prezentowe', 'section.manuscripts': 'Kosmiczne Manuskrypty', 'section.library': '📚 Niebiańska Biblioteka', 'section.libraryDesc': 'Oglądaj filmy, czytaj kosmiczne książki i słuchaj audiobooków!',
    'section.games': '🎮 Gry i Quizy', 'section.gamesDesc': 'Przetestuj swoją wiedzę kosmiczną z grami interaktywnymi!', 'section.premiumGames': 'Gry Premium', 'section.gamePass': 'Karta Gier', 'section.shop': 'Kosmiczny Sklep', 'section.trophyCabinet': 'Gablota Trofeów', 'section.trophyCabinetDesc': 'Twoja kolekcja osiągnięć i certyfikatów z kosmicznej podróży!',
    'section.subscriptions': 'Subskrypcje', 'section.funFacts': 'Ciekawostki', 'section.about': '✨ O Kosmicznej Klasie', 'section.aboutMission': 'Nasza Misja', 'section.aboutMissionDesc': 'Kosmiczna Klasa jest stworzona aby rozbudzić ciekawość o wszechświecie w młodych umysłach! Sprawiamy, że nauka o kosmosie jest zabawna dla dzieci w wieku 7-13 lat.', 'section.aboutMissionDesc2': 'Od planet w naszym układzie słonecznym do odległych galaktyk — jest tyle do odkrycia!',
    'common.learn': 'Ucz się', 'common.play': 'Graj', 'common.explore': 'Odkrywaj', 'common.learnDesc': 'Odkryj ciekawe fakty o każdym ciele niebieskim.', 'common.playDesc': 'Testuj wiedzę z zabawnymi quizami i zdobywaj odznaki kosmiczne!', 'common.exploreDesc': 'Oglądaj filmy i czytaj książki dla młodych odkrywców.',
    'common.videos': 'Filmy', 'common.books': 'Książki', 'common.audiobooks': 'Audiobooki', 'common.all': 'Wszystko', 'common.close': 'Zamknij', 'common.back': 'Wróć', 'common.next': 'Dalej', 'common.previous': 'Wstecz', 'common.readNow': 'Czytaj Teraz', 'common.watchNow': 'Oglądaj Teraz', 'common.listenNow': 'Słuchaj Teraz',
    'common.noAchievements': 'Brak Osiągnięć', 'common.noAchievementsDesc': 'Ukończ kursy, gry i quizy aby zdobyć osiągnięcia!', 'common.totalAchievements': 'Łączne Osiągnięcia', 'common.earnedOn': 'Zdobyto', 'common.locked': 'Zablokowane',
    'footer.tagline': 'Czynimy eksplorację kosmosu zabawną! 🚀', 'footer.explore': 'Odkrywaj', 'footer.learnPlay': 'Ucz się i Graj', 'footer.resources': 'Zasoby', 'footer.universeExplorer': 'Odkrywca Wszechświata', 'footer.celestialLibrary': 'Niebiańska Biblioteka', 'footer.quizzes': 'Quizy', 'footer.forParents': 'Dla Rodziców i Nauczycieli', 'footer.contact': 'Kontakt', 'footer.privacy': 'Polityka Prywatności', 'footer.madeWith': 'Zrobione z', 'footer.copyright': '© 2024 Kosmiczna Klasa. Odkrywaj gwiazdy! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Porównanie Rozmiarów', 'games.rocketShooter': 'Strzelanie Rakietą', 'games.memoryMatch': 'Pamięć', 'games.wordScramble': 'Mieszanka Słów', 'games.rocketMath': 'Rakietowa Matematyka',
    'library.videos': 'Filmy', 'library.books': 'Książki', 'library.audiobooks': 'Audiobooki',
    'courses.spaceCourses': 'Kursy Kosmiczne', 'courses.backToCourses': '← Powrót do Kursów', 'courses.claimCertificate': 'Odbierz Certyfikat', 'courses.takeQuiz': 'Rozwiąż Quiz', 'courses.restartCourse': 'Zacznij Od Nowa', 'courses.progress': 'Postęp', 'courses.learningGoals': 'Cele Nauki', 'courses.coursePlan': 'Plan Kursu', 'courses.plan': 'Plan',
    'about.planetsMoons': 'Planety i Księżyce', 'about.starsNebulas': 'Gwiazdy i Mgławice', 'about.galaxies': 'Galaktyki', 'about.booksVideos': 'Książki i Filmy',
    'language.select': 'Język',
  },

  sv: {
    'nav.home': 'Hem', 'nav.solarSystem': 'Solsystemet', 'nav.timeline': 'Tidslinje', 'nav.constellations': 'Stjärnbilder', 'nav.library': 'Bibliotek', 'nav.games': 'Spel', 'nav.subscriptions': 'Prenumerationer', 'nav.funFacts': 'Roliga Fakta', 'nav.about': 'Om Oss', 'nav.startJourney': 'Börja din Resa', 'nav.cosmicClassroom': 'Kosmiskt Klassrum',
    'hero.badge': 'För unga utforskare 7-13 år', 'hero.welcome': 'Välkommen till', 'hero.cosmicClassroom': 'Kosmiskt Klassrum', 'hero.subtitle': 'Utforska varje hörn av Universum! 🚀 Lär dig om planeter, stjärnor, nebulosor, galaxer och mycket mer!', 'hero.startJourney': 'Börja din Rymdresa', 'hero.takeQuiz': 'Gör ett Quiz',
    'hero.solarSystem': 'Solsystemet', 'hero.solarSystemDesc': 'Utforska planeter, månar, asteroider och kometer', 'hero.starsNebulas': 'Stjärnor och Nebulosor', 'hero.starsNebulasDesc': 'Upptäck stjärntyper, supernovor och lysande moln', 'hero.galaxiesBeyond': 'Galaxer och Bortom', 'hero.galaxiesBeyondDesc': 'Res genom galaxer, svarta hål och exoplaneter',
    'section.dailyFact': 'Dagens Rymdfakt', 'section.spaceQnA': 'Rymd Frågor och Svar', 'section.spaceQnADesc': 'Fråga vad som helst om rymden!', 'section.celestialExplorer': 'Himmelsk Utforskare', 'section.spaceTimeline': 'Rymd Tidslinje', 'section.constellations': 'Stjärnbilder',
    'section.courses': 'Rymdkurser', 'section.coursesDesc': 'Slutför kurser med videor, böcker och ljudböcker. Tjäna certifikat!', 'section.giftVouchers': 'Presentkort', 'section.manuscripts': 'Rymdmanuskript', 'section.library': '📚 Himmelskt Bibliotek', 'section.libraryDesc': 'Titta på fantastiska videor, utforska rymdböcker och lyssna på ljudböcker!',
    'section.games': '🎮 Spel och Quiz', 'section.gamesDesc': 'Testa din rymdkunskap med roliga interaktiva spel!', 'section.premiumGames': 'Premiumspel', 'section.gamePass': 'Spelkort', 'section.shop': 'Rymdbutik', 'section.trophyCabinet': 'Troféskåp', 'section.trophyCabinetDesc': 'Din samling av prestationer och certifikat!',
    'section.subscriptions': 'Prenumerationer', 'section.funFacts': 'Roliga Fakta', 'section.about': '✨ Om Kosmiskt Klassrum', 'section.aboutMission': 'Vårt Uppdrag', 'section.aboutMissionDesc': 'Kosmiskt Klassrum är designat för att väcka nyfikenhet om universum hos unga sinnen! Vi gör det roligt att lära sig om rymden för barn 7-13 år.', 'section.aboutMissionDesc2': 'Från planeter i vårt solsystem till avlägsna galaxer — det finns så mycket att utforska!',
    'common.learn': 'Lär dig', 'common.play': 'Spela', 'common.explore': 'Utforska', 'common.learnDesc': 'Upptäck roliga fakta om varje himlakropp.', 'common.playDesc': 'Testa din kunskap med roliga quiz och tjäna rymdmärken!', 'common.exploreDesc': 'Titta på videor och läs böcker för unga rymdutforskare.',
    'common.videos': 'Videor', 'common.books': 'Böcker', 'common.audiobooks': 'Ljudböcker', 'common.all': 'Alla', 'common.close': 'Stäng', 'common.back': 'Tillbaka', 'common.next': 'Nästa', 'common.previous': 'Föregående', 'common.readNow': 'Läs Nu', 'common.watchNow': 'Titta Nu', 'common.listenNow': 'Lyssna Nu',
    'common.noAchievements': 'Inga Prestationer Än', 'common.noAchievementsDesc': 'Slutför kurser, spel och quiz för att tjäna prestationer!', 'common.totalAchievements': 'Totala Prestationer', 'common.earnedOn': 'Tjänat den', 'common.locked': 'Låst',
    'footer.tagline': 'Gör rymdutforskning rolig för unga sinnen! 🚀', 'footer.explore': 'Utforska', 'footer.learnPlay': 'Lär och Spela', 'footer.resources': 'Resurser', 'footer.universeExplorer': 'Universumutforskare', 'footer.celestialLibrary': 'Himmelskt Bibliotek', 'footer.quizzes': 'Quiz', 'footer.forParents': 'För Föräldrar och Lärare', 'footer.contact': 'Kontakt', 'footer.privacy': 'Integritetspolicy', 'footer.madeWith': 'Gjord med', 'footer.copyright': '© 2024 Kosmiskt Klassrum. Fortsätt utforska stjärnorna! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Storleksjämförelse', 'games.rocketShooter': 'Raketskjutare', 'games.memoryMatch': 'Memory', 'games.wordScramble': 'Ordpussel', 'games.rocketMath': 'Raketmatte',
    'library.videos': 'Videor', 'library.books': 'Böcker', 'library.audiobooks': 'Ljudböcker',
    'courses.spaceCourses': 'Rymdkurser', 'courses.backToCourses': '← Tillbaka till Kurser', 'courses.claimCertificate': 'Hämta Certifikat', 'courses.takeQuiz': 'Gör Quiz', 'courses.restartCourse': 'Starta Om', 'courses.progress': 'Framsteg', 'courses.learningGoals': 'Lärandemål', 'courses.coursePlan': 'Kursplan', 'courses.plan': 'Plan',
    'about.planetsMoons': 'Planeter och Månar', 'about.starsNebulas': 'Stjärnor och Nebulosor', 'about.galaxies': 'Galaxer', 'about.booksVideos': 'Böcker och Videor',
    'language.select': 'Språk',
  },

  th: {
    'nav.home': 'หน้าแรก', 'nav.solarSystem': 'ระบบสุริยะ', 'nav.timeline': 'ไทม์ไลน์', 'nav.constellations': 'กลุ่มดาว', 'nav.library': 'ห้องสมุด', 'nav.games': 'เกม', 'nav.subscriptions': 'สมัครสมาชิก', 'nav.funFacts': 'ข้อเท็จจริงสนุก', 'nav.about': 'เกี่ยวกับ', 'nav.startJourney': 'เริ่มการเดินทาง', 'nav.cosmicClassroom': 'ห้องเรียนจักรวาล',
    'hero.badge': 'สำหรับนักสำรวจรุ่นเยาว์อายุ 7-13 ปี', 'hero.welcome': 'ยินดีต้อนรับสู่', 'hero.cosmicClassroom': 'ห้องเรียนจักรวาล', 'hero.subtitle': 'สำรวจทุกมุมของจักรวาล! 🚀 เรียนรู้เกี่ยวกับดาวเคราะห์ ดาวฤกษ์ เนบิวลา กาแล็กซี่ และอีกมากมาย!', 'hero.startJourney': 'เริ่มการเดินทางอวกาศ', 'hero.takeQuiz': 'ทำแบบทดสอบ',
    'hero.solarSystem': 'ระบบสุริยะ', 'hero.solarSystemDesc': 'สำรวจดาวเคราะห์ ดวงจันทร์ ดาวเคราะห์น้อย และดาวหาง', 'hero.starsNebulas': 'ดาวฤกษ์และเนบิวลา', 'hero.starsNebulasDesc': 'ค้นพบประเภทดาว ซูเปอร์โนวา และเมฆเรืองแสง', 'hero.galaxiesBeyond': 'กาแล็กซี่และไกลกว่า', 'hero.galaxiesBeyondDesc': 'เดินทางผ่านกาแล็กซี่ หลุมดำ และดาวเคราะห์นอกระบบ',
    'section.dailyFact': 'ข้อเท็จจริงอวกาศประจำวัน', 'section.spaceQnA': 'ถาม-ตอบอวกาศ', 'section.spaceQnADesc': 'ถามอะไรก็ได้เกี่ยวกับอวกาศ!', 'section.celestialExplorer': 'นักสำรวจท้องฟ้า', 'section.spaceTimeline': 'ไทม์ไลน์อวกาศ', 'section.constellations': 'กลุ่มดาว',
    'section.courses': 'หลักสูตรอวกาศ', 'section.coursesDesc': 'เรียนหลักสูตรพร้อมวิดีโอ หนังสือ และหนังสือเสียง รับประกาศนียบัตร!', 'section.giftVouchers': 'บัตรของขวัญ', 'section.manuscripts': 'ต้นฉบับอวกาศ', 'section.library': '📚 ห้องสมุดท้องฟ้า', 'section.libraryDesc': 'ดูวิดีโอ สำรวจหนังสืออวกาศ และฟังหนังสือเสียง!',
    'section.games': '🎮 เกมและแบบทดสอบ', 'section.gamesDesc': 'ทดสอบความรู้อวกาศด้วยเกมสนุก!', 'section.premiumGames': 'เกมพรีเมียม', 'section.gamePass': 'บัตรเกม', 'section.shop': 'ร้านค้าอวกาศ', 'section.trophyCabinet': 'ตู้ถ้วยรางวัล', 'section.trophyCabinetDesc': 'คอลเลกชันความสำเร็จและประกาศนียบัตรจากการสำรวจอวกาศ!',
    'section.subscriptions': 'สมัครสมาชิก', 'section.funFacts': 'ข้อเท็จจริงสนุก', 'section.about': '✨ เกี่ยวกับห้องเรียนจักรวาล', 'section.aboutMission': 'ภารกิจของเรา', 'section.aboutMissionDesc': 'ห้องเรียนจักรวาลออกแบบมาเพื่อจุดประกายความอยากรู้เกี่ยวกับจักรวาลในจิตใจเยาวชน! เราทำให้การเรียนรู้อวกาศสนุกสำหรับเด็ก 7-13 ปี', 'section.aboutMissionDesc2': 'จากดาวเคราะห์ในระบบสุริยะถึงกาแล็กซี่ไกล — มีอะไรให้สำรวจมากมาย!',
    'common.learn': 'เรียนรู้', 'common.play': 'เล่น', 'common.explore': 'สำรวจ', 'common.learnDesc': 'ค้นพบข้อเท็จจริงสนุกเกี่ยวกับวัตถุท้องฟ้าทุกประเภท', 'common.playDesc': 'ทดสอบความรู้ด้วยแบบทดสอบสนุกและรับเหรียญตราอวกาศ!', 'common.exploreDesc': 'ดูวิดีโอและอ่านหนังสือสำหรับนักสำรวจอวกาศรุ่นเยาว์',
    'common.videos': 'วิดีโอ', 'common.books': 'หนังสือ', 'common.audiobooks': 'หนังสือเสียง', 'common.all': 'ทั้งหมด', 'common.close': 'ปิด', 'common.back': 'กลับ', 'common.next': 'ถัดไป', 'common.previous': 'ก่อนหน้า', 'common.readNow': 'อ่านตอนนี้', 'common.watchNow': 'ดูตอนนี้', 'common.listenNow': 'ฟังตอนนี้',
    'common.noAchievements': 'ยังไม่มีความสำเร็จ', 'common.noAchievementsDesc': 'ทำหลักสูตร เกม และแบบทดสอบให้สำเร็จเพื่อรับรางวัล!', 'common.totalAchievements': 'ความสำเร็จทั้งหมด', 'common.earnedOn': 'ได้รับเมื่อ', 'common.locked': 'ล็อค',
    'footer.tagline': 'ทำให้การสำรวจอวกาศสนุกสำหรับจิตใจเยาวชน! 🚀', 'footer.explore': 'สำรวจ', 'footer.learnPlay': 'เรียนและเล่น', 'footer.resources': 'แหล่งข้อมูล', 'footer.universeExplorer': 'นักสำรวจจักรวาล', 'footer.celestialLibrary': 'ห้องสมุดท้องฟ้า', 'footer.quizzes': 'แบบทดสอบ', 'footer.forParents': 'สำหรับผู้ปกครองและครู', 'footer.contact': 'ติดต่อ', 'footer.privacy': 'นโยบายความเป็นส่วนตัว', 'footer.madeWith': 'สร้างด้วย', 'footer.copyright': '© 2024 ห้องเรียนจักรวาล สำรวจดวงดาวต่อไป! ✨',
    'games.quiz': 'แบบทดสอบ', 'games.sizeCompare': 'เปรียบเทียบขนาด', 'games.rocketShooter': 'จรวดยิง', 'games.memoryMatch': 'จับคู่ความจำ', 'games.wordScramble': 'สลับคำ', 'games.rocketMath': 'คณิตจรวด',
    'library.videos': 'วิดีโอ', 'library.books': 'หนังสือ', 'library.audiobooks': 'หนังสือเสียง',
    'courses.spaceCourses': 'หลักสูตรอวกาศ', 'courses.backToCourses': '← กลับสู่หลักสูตร', 'courses.claimCertificate': 'รับประกาศนียบัตร', 'courses.takeQuiz': 'ทำแบบทดสอบ', 'courses.restartCourse': 'เริ่มใหม่', 'courses.progress': 'ความก้าวหน้า', 'courses.learningGoals': 'เป้าหมายการเรียนรู้', 'courses.coursePlan': 'แผนหลักสูตร', 'courses.plan': 'แผน',
    'about.planetsMoons': 'ดาวเคราะห์และดวงจันทร์', 'about.starsNebulas': 'ดาวฤกษ์และเนบิวลา', 'about.galaxies': 'กาแล็กซี่', 'about.booksVideos': 'หนังสือและวิดีโอ',
    'language.select': 'ภาษา',
  },

  vi: {
    'nav.home': 'Trang Chủ', 'nav.solarSystem': 'Hệ Mặt Trời', 'nav.timeline': 'Dòng Thời Gian', 'nav.constellations': 'Chòm Sao', 'nav.library': 'Thư Viện', 'nav.games': 'Trò Chơi', 'nav.subscriptions': 'Đăng Ký', 'nav.funFacts': 'Thú Vị', 'nav.about': 'Giới Thiệu', 'nav.startJourney': 'Bắt Đầu Hành Trình', 'nav.cosmicClassroom': 'Lớp Học Vũ Trụ',
    'hero.badge': 'Dành cho nhà thám hiểm nhỏ từ 7-13 tuổi', 'hero.welcome': 'Chào mừng đến', 'hero.cosmicClassroom': 'Lớp Học Vũ Trụ', 'hero.subtitle': 'Khám phá mọi ngóc ngách của Vũ Trụ! 🚀 Tìm hiểu về hành tinh, ngôi sao, tinh vân, thiên hà và nhiều hơn nữa!', 'hero.startJourney': 'Bắt Đầu Hành Trình Không Gian', 'hero.takeQuiz': 'Làm Bài Quiz',
    'hero.solarSystem': 'Hệ Mặt Trời', 'hero.solarSystemDesc': 'Khám phá hành tinh, vệ tinh, tiểu hành tinh và sao chổi', 'hero.starsNebulas': 'Ngôi Sao và Tinh Vân', 'hero.starsNebulasDesc': 'Khám phá các loại sao, siêu tân tinh và đám mây phát sáng', 'hero.galaxiesBeyond': 'Thiên Hà và Xa Hơn', 'hero.galaxiesBeyondDesc': 'Du hành qua thiên hà, hố đen và ngoại hành tinh',
    'section.dailyFact': 'Sự Thật Không Gian Hằng Ngày', 'section.spaceQnA': 'Hỏi Đáp Không Gian', 'section.spaceQnADesc': 'Hỏi bất cứ điều gì về không gian!', 'section.celestialExplorer': 'Nhà Thám Hiểm Thiên Thể', 'section.spaceTimeline': 'Dòng Thời Gian Không Gian', 'section.constellations': 'Chòm Sao',
    'section.courses': 'Khóa Học Không Gian', 'section.coursesDesc': 'Hoàn thành khóa học với video, sách và sách nói. Nhận chứng chỉ!', 'section.giftVouchers': 'Phiếu Quà Tặng', 'section.manuscripts': 'Bản Thảo Không Gian', 'section.library': '📚 Thư Viện Thiên Thể', 'section.libraryDesc': 'Xem video tuyệt vời, khám phá sách không gian và nghe sách nói!',
    'section.games': '🎮 Trò Chơi và Câu Đố', 'section.gamesDesc': 'Kiểm tra kiến thức không gian với trò chơi tương tác vui!', 'section.premiumGames': 'Trò Chơi Cao Cấp', 'section.gamePass': 'Thẻ Trò Chơi', 'section.shop': 'Cửa Hàng Không Gian', 'section.trophyCabinet': 'Tủ Cúp', 'section.trophyCabinetDesc': 'Bộ sưu tập thành tích và chứng chỉ từ hành trình khám phá không gian!',
    'section.subscriptions': 'Đăng Ký', 'section.funFacts': 'Thú Vị', 'section.about': '✨ Về Lớp Học Vũ Trụ', 'section.aboutMission': 'Sứ Mệnh', 'section.aboutMissionDesc': 'Lớp Học Vũ Trụ được thiết kế để khơi dậy sự tò mò về vũ trụ! Chúng tôi làm cho việc học về không gian trở nên thú vị cho trẻ em 7-13 tuổi.', 'section.aboutMissionDesc2': 'Từ các hành tinh đến thiên hà xa xôi — có rất nhiều điều để khám phá!',
    'common.learn': 'Học', 'common.play': 'Chơi', 'common.explore': 'Khám Phá', 'common.learnDesc': 'Khám phá sự thật thú vị về mọi thiên thể.', 'common.playDesc': 'Kiểm tra kiến thức với câu đố vui và nhận huy hiệu không gian!', 'common.exploreDesc': 'Xem video và đọc sách cho nhà thám hiểm không gian nhỏ tuổi.',
    'common.videos': 'Video', 'common.books': 'Sách', 'common.audiobooks': 'Sách Nói', 'common.all': 'Tất Cả', 'common.close': 'Đóng', 'common.back': 'Quay Lại', 'common.next': 'Tiếp', 'common.previous': 'Trước', 'common.readNow': 'Đọc Ngay', 'common.watchNow': 'Xem Ngay', 'common.listenNow': 'Nghe Ngay',
    'common.noAchievements': 'Chưa Có Thành Tích', 'common.noAchievementsDesc': 'Hoàn thành khóa học, trò chơi và câu đố để nhận thành tích!', 'common.totalAchievements': 'Tổng Thành Tích', 'common.earnedOn': 'Đạt được vào', 'common.locked': 'Đã Khóa',
    'footer.tagline': 'Làm cho khám phá không gian trở nên thú vị! 🚀', 'footer.explore': 'Khám Phá', 'footer.learnPlay': 'Học và Chơi', 'footer.resources': 'Tài Nguyên', 'footer.universeExplorer': 'Nhà Thám Hiểm Vũ Trụ', 'footer.celestialLibrary': 'Thư Viện Thiên Thể', 'footer.quizzes': 'Câu Đố', 'footer.forParents': 'Cho Phụ Huynh và Giáo Viên', 'footer.contact': 'Liên Hệ', 'footer.privacy': 'Chính Sách Bảo Mật', 'footer.madeWith': 'Được tạo với', 'footer.copyright': '© 2024 Lớp Học Vũ Trụ. Tiếp tục khám phá các vì sao! ✨',
    'games.quiz': 'Câu Đố', 'games.sizeCompare': 'So Sánh Kích Thước', 'games.rocketShooter': 'Bắn Tên Lửa', 'games.memoryMatch': 'Trí Nhớ', 'games.wordScramble': 'Xáo Trộn Từ', 'games.rocketMath': 'Toán Tên Lửa',
    'library.videos': 'Video', 'library.books': 'Sách', 'library.audiobooks': 'Sách Nói',
    'courses.spaceCourses': 'Khóa Học Không Gian', 'courses.backToCourses': '← Quay Lại Khóa Học', 'courses.claimCertificate': 'Nhận Chứng Chỉ', 'courses.takeQuiz': 'Làm Quiz', 'courses.restartCourse': 'Bắt Đầu Lại', 'courses.progress': 'Tiến Độ', 'courses.learningGoals': 'Mục Tiêu Học Tập', 'courses.coursePlan': 'Kế Hoạch Khóa Học', 'courses.plan': 'Kế Hoạch',
    'about.planetsMoons': 'Hành Tinh và Vệ Tinh', 'about.starsNebulas': 'Ngôi Sao và Tinh Vân', 'about.galaxies': 'Thiên Hà', 'about.booksVideos': 'Sách và Video',
    'language.select': 'Ngôn Ngữ',
  },

  id: {
    'nav.home': 'Beranda', 'nav.solarSystem': 'Tata Surya', 'nav.timeline': 'Garis Waktu', 'nav.constellations': 'Rasi Bintang', 'nav.library': 'Perpustakaan', 'nav.games': 'Permainan', 'nav.subscriptions': 'Langganan', 'nav.funFacts': 'Fakta Menarik', 'nav.about': 'Tentang', 'nav.startJourney': 'Mulai Perjalanan', 'nav.cosmicClassroom': 'Kelas Kosmik',
    'hero.badge': 'Untuk penjelajah muda usia 7-13 tahun', 'hero.welcome': 'Selamat datang di', 'hero.cosmicClassroom': 'Kelas Kosmik', 'hero.subtitle': 'Jelajahi setiap sudut Alam Semesta! 🚀 Pelajari planet, bintang, nebula, galaksi, dan banyak lagi!', 'hero.startJourney': 'Mulai Perjalanan Luar Angkasa', 'hero.takeQuiz': 'Ikuti Kuis',
    'hero.solarSystem': 'Tata Surya', 'hero.solarSystemDesc': 'Jelajahi planet, bulan, asteroid, dan komet', 'hero.starsNebulas': 'Bintang dan Nebula', 'hero.starsNebulasDesc': 'Temukan jenis bintang, supernova, dan awan bercahaya', 'hero.galaxiesBeyond': 'Galaksi dan Seterusnya', 'hero.galaxiesBeyondDesc': 'Perjalanan melalui galaksi, lubang hitam, dan exoplanet',
    'section.dailyFact': 'Fakta Angkasa Harian', 'section.spaceQnA': 'Tanya Jawab Angkasa', 'section.spaceQnADesc': 'Tanyakan apa saja tentang luar angkasa!', 'section.celestialExplorer': 'Penjelajah Langit', 'section.spaceTimeline': 'Garis Waktu Angkasa', 'section.constellations': 'Rasi Bintang',
    'section.courses': 'Kursus Angkasa', 'section.coursesDesc': 'Selesaikan kursus dengan video, buku, dan buku audio. Dapatkan sertifikat!', 'section.giftVouchers': 'Voucher Hadiah', 'section.manuscripts': 'Manuskrip Angkasa', 'section.library': '📚 Perpustakaan Langit', 'section.libraryDesc': 'Tonton video luar biasa, jelajahi buku angkasa, dan dengarkan buku audio!',
    'section.games': '🎮 Permainan dan Kuis', 'section.gamesDesc': 'Uji pengetahuan angkasamu dengan permainan interaktif yang seru!', 'section.premiumGames': 'Permainan Premium', 'section.gamePass': 'Pass Permainan', 'section.shop': 'Toko Angkasa', 'section.trophyCabinet': 'Lemari Piala', 'section.trophyCabinetDesc': 'Koleksi pencapaian dan sertifikat dari perjalanan eksplorasi angkasa!',
    'section.subscriptions': 'Langganan', 'section.funFacts': 'Fakta Menarik', 'section.about': '✨ Tentang Kelas Kosmik', 'section.aboutMission': 'Misi Kami', 'section.aboutMissionDesc': 'Kelas Kosmik dirancang untuk memicu rasa ingin tahu tentang alam semesta! Kami membuat belajar angkasa menyenangkan untuk anak usia 7-13 tahun.', 'section.aboutMissionDesc2': 'Dari planet di tata surya hingga galaksi jauh — ada banyak yang bisa dijelajahi!',
    'common.learn': 'Belajar', 'common.play': 'Main', 'common.explore': 'Jelajahi', 'common.learnDesc': 'Temukan fakta menarik tentang setiap benda langit.', 'common.playDesc': 'Uji pengetahuan dengan kuis seru dan dapatkan lencana angkasa!', 'common.exploreDesc': 'Tonton video dan baca buku untuk penjelajah angkasa muda.',
    'common.videos': 'Video', 'common.books': 'Buku', 'common.audiobooks': 'Buku Audio', 'common.all': 'Semua', 'common.close': 'Tutup', 'common.back': 'Kembali', 'common.next': 'Selanjutnya', 'common.previous': 'Sebelumnya', 'common.readNow': 'Baca Sekarang', 'common.watchNow': 'Tonton Sekarang', 'common.listenNow': 'Dengar Sekarang',
    'common.noAchievements': 'Belum Ada Pencapaian', 'common.noAchievementsDesc': 'Selesaikan kursus, permainan, dan kuis untuk mendapatkan pencapaian!', 'common.totalAchievements': 'Total Pencapaian', 'common.earnedOn': 'Diperoleh pada', 'common.locked': 'Terkunci',
    'footer.tagline': 'Membuat eksplorasi angkasa menyenangkan untuk pikiran muda! 🚀', 'footer.explore': 'Jelajahi', 'footer.learnPlay': 'Belajar dan Main', 'footer.resources': 'Sumber Daya', 'footer.universeExplorer': 'Penjelajah Alam Semesta', 'footer.celestialLibrary': 'Perpustakaan Langit', 'footer.quizzes': 'Kuis', 'footer.forParents': 'Untuk Orang Tua dan Guru', 'footer.contact': 'Kontak', 'footer.privacy': 'Kebijakan Privasi', 'footer.madeWith': 'Dibuat dengan', 'footer.copyright': '© 2024 Kelas Kosmik. Terus jelajahi bintang! ✨',
    'games.quiz': 'Kuis', 'games.sizeCompare': 'Bandingkan Ukuran', 'games.rocketShooter': 'Penembak Roket', 'games.memoryMatch': 'Cocokkan Ingatan', 'games.wordScramble': 'Acak Kata', 'games.rocketMath': 'Matematika Roket',
    'library.videos': 'Video', 'library.books': 'Buku', 'library.audiobooks': 'Buku Audio',
    'courses.spaceCourses': 'Kursus Angkasa', 'courses.backToCourses': '← Kembali ke Kursus', 'courses.claimCertificate': 'Klaim Sertifikat', 'courses.takeQuiz': 'Ikuti Kuis', 'courses.restartCourse': 'Mulai Ulang', 'courses.progress': 'Kemajuan', 'courses.learningGoals': 'Tujuan Pembelajaran', 'courses.coursePlan': 'Rencana Kursus', 'courses.plan': 'Rencana',
    'about.planetsMoons': 'Planet dan Bulan', 'about.starsNebulas': 'Bintang dan Nebula', 'about.galaxies': 'Galaksi', 'about.booksVideos': 'Buku dan Video',
    'language.select': 'Bahasa',
  },

  el: {
    'nav.home': 'Αρχική', 'nav.solarSystem': 'Ηλιακό Σύστημα', 'nav.timeline': 'Χρονολόγιο', 'nav.constellations': 'Αστερισμοί', 'nav.library': 'Βιβλιοθήκη', 'nav.games': 'Παιχνίδια', 'nav.subscriptions': 'Συνδρομές', 'nav.funFacts': 'Ενδιαφέροντα', 'nav.about': 'Σχετικά', 'nav.startJourney': 'Ξεκίνα το Ταξίδι', 'nav.cosmicClassroom': 'Κοσμική Τάξη',
    'hero.badge': 'Για νεαρούς εξερευνητές 7-13 ετών', 'hero.welcome': 'Καλώς ήρθατε στην', 'hero.cosmicClassroom': 'Κοσμική Τάξη', 'hero.subtitle': 'Εξερεύνησε κάθε γωνιά του Σύμπαντος! 🚀 Μάθε για πλανήτες, αστέρια, νεφελώματα, γαλαξίες και πολλά ακόμα!', 'hero.startJourney': 'Ξεκίνα το Διαστημικό Ταξίδι', 'hero.takeQuiz': 'Κάνε ένα Quiz',
    'hero.solarSystem': 'Ηλιακό Σύστημα', 'hero.solarSystemDesc': 'Εξερεύνησε πλανήτες, φεγγάρια, αστεροειδείς και κομήτες', 'hero.starsNebulas': 'Αστέρια και Νεφελώματα', 'hero.starsNebulasDesc': 'Ανακάλυψε τύπους αστεριών, σούπερνοβα και λαμπερά σύννεφα', 'hero.galaxiesBeyond': 'Γαλαξίες και Πέρα', 'hero.galaxiesBeyondDesc': 'Ταξίδεψε μέσα από γαλαξίες, μαύρες τρύπες και εξωπλανήτες',
    'section.dailyFact': 'Διαστημικό Γεγονός της Ημέρας', 'section.spaceQnA': 'Ερωτήσεις και Απαντήσεις', 'section.spaceQnADesc': 'Ρώτα ό,τι θέλεις για το διάστημα!', 'section.celestialExplorer': 'Ουράνιος Εξερευνητής', 'section.spaceTimeline': 'Διαστημικό Χρονολόγιο', 'section.constellations': 'Αστερισμοί',
    'section.courses': 'Διαστημικά Μαθήματα', 'section.coursesDesc': 'Ολοκλήρωσε μαθήματα με βίντεο, βιβλία και ηχητικά βιβλία. Κέρδισε πιστοποιητικά!', 'section.giftVouchers': 'Δωροεπιταγές', 'section.manuscripts': 'Διαστημικά Χειρόγραφα', 'section.library': '📚 Ουράνια Βιβλιοθήκη', 'section.libraryDesc': 'Δες εκπληκτικά βίντεο, εξερεύνησε βιβλία διαστήματος και άκουσε ηχητικά βιβλία!',
    'section.games': '🎮 Παιχνίδια και Quiz', 'section.gamesDesc': 'Δοκίμασε τις γνώσεις σου με διαδραστικά παιχνίδια!', 'section.premiumGames': 'Προνομιακά Παιχνίδια', 'section.gamePass': 'Κάρτα Παιχνιδιών', 'section.shop': 'Διαστημικό Κατάστημα', 'section.trophyCabinet': 'Βιτρίνα Τροπαίων', 'section.trophyCabinetDesc': 'Η συλλογή επιτευγμάτων και πιστοποιητικών σου!',
    'section.subscriptions': 'Συνδρομές', 'section.funFacts': 'Ενδιαφέροντα', 'section.about': '✨ Σχετικά με την Κοσμική Τάξη', 'section.aboutMission': 'Η Αποστολή μας', 'section.aboutMissionDesc': 'Η Κοσμική Τάξη σχεδιάστηκε για να εμπνεύσει την περιέργεια για το σύμπαν στα νεαρά μυαλά! Κάνουμε τη μάθηση για το διάστημα διασκεδαστική για παιδιά 7-13 ετών.', 'section.aboutMissionDesc2': 'Από τους πλανήτες του ηλιακού μας συστήματος μέχρι μακρινούς γαλαξίες — υπάρχουν τόσα πολλά να εξερευνήσεις!',
    'common.learn': 'Μάθε', 'common.play': 'Παίξε', 'common.explore': 'Εξερεύνησε', 'common.learnDesc': 'Ανακάλυψε ενδιαφέροντα γεγονότα για κάθε ουράνιο σώμα.', 'common.playDesc': 'Δοκίμασε τις γνώσεις σου με quiz και κέρδισε διαστημικά σήματα!', 'common.exploreDesc': 'Δες βίντεο και διάβασε βιβλία για νεαρούς εξερευνητές.',
    'common.videos': 'Βίντεο', 'common.books': 'Βιβλία', 'common.audiobooks': 'Ηχητικά Βιβλία', 'common.all': 'Όλα', 'common.close': 'Κλείσιμο', 'common.back': 'Πίσω', 'common.next': 'Επόμενο', 'common.previous': 'Προηγούμενο', 'common.readNow': 'Διάβασε Τώρα', 'common.watchNow': 'Δες Τώρα', 'common.listenNow': 'Άκουσε Τώρα',
    'common.noAchievements': 'Ακόμα Χωρίς Επιτεύγματα', 'common.noAchievementsDesc': 'Ολοκλήρωσε μαθήματα, παιχνίδια και quiz για να κερδίσεις επιτεύγματα!', 'common.totalAchievements': 'Σύνολο Επιτευγμάτων', 'common.earnedOn': 'Κερδήθηκε στις', 'common.locked': 'Κλειδωμένο',
    'footer.tagline': 'Κάνουμε την εξερεύνηση του διαστήματος διασκεδαστική! 🚀', 'footer.explore': 'Εξερεύνησε', 'footer.learnPlay': 'Μάθε και Παίξε', 'footer.resources': 'Πόροι', 'footer.universeExplorer': 'Εξερευνητής Σύμπαντος', 'footer.celestialLibrary': 'Ουράνια Βιβλιοθήκη', 'footer.quizzes': 'Quiz', 'footer.forParents': 'Για Γονείς και Δασκάλους', 'footer.contact': 'Επικοινωνία', 'footer.privacy': 'Πολιτική Απορρήτου', 'footer.madeWith': 'Φτιαγμένο με', 'footer.copyright': '© 2024 Κοσμική Τάξη. Συνέχισε να εξερευνάς τα αστέρια! ✨',
    'games.quiz': 'Quiz', 'games.sizeCompare': 'Σύγκριση Μεγέθους', 'games.rocketShooter': 'Πυραυλοβόλο', 'games.memoryMatch': 'Μνήμη', 'games.wordScramble': 'Ανακάτεμα Λέξεων', 'games.rocketMath': 'Μαθηματικά Πυραύλων',
    'library.videos': 'Βίντεο', 'library.books': 'Βιβλία', 'library.audiobooks': 'Ηχητικά Βιβλία',
    'courses.spaceCourses': 'Διαστημικά Μαθήματα', 'courses.backToCourses': '← Πίσω στα Μαθήματα', 'courses.claimCertificate': 'Λήψη Πιστοποιητικού', 'courses.takeQuiz': 'Κάνε Quiz', 'courses.restartCourse': 'Ξανά από την Αρχή', 'courses.progress': 'Πρόοδος', 'courses.learningGoals': 'Μαθησιακοί Στόχοι', 'courses.coursePlan': 'Πρόγραμμα Μαθήματος', 'courses.plan': 'Πρόγραμμα',
    'about.planetsMoons': 'Πλανήτες και Φεγγάρια', 'about.starsNebulas': 'Αστέρια και Νεφελώματα', 'about.galaxies': 'Γαλαξίες', 'about.booksVideos': 'Βιβλία και Βίντεο',
    'language.select': 'Γλώσσα',
  },
};

export default translations;
