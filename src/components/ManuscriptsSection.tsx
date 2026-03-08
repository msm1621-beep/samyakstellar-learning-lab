import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollText, ChevronRight, Calendar, MapPin, User, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Manuscript {
  id: string;
  title: string;
  year: string;
  location: string;
  pioneer: string;
  thumbnail: string;
  summary: string;
  fullDescription: string;
  significance: string;
}

const manuscripts: Manuscript[] = [
  {
    id: 'm1',
    title: 'First Human in Space',
    year: 'April 12, 1961',
    location: 'Baikonur Cosmodrome, USSR',
    pioneer: 'Yuri Gagarin',
    thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop',
    summary: 'Yuri Gagarin became the first human to journey into outer space aboard Vostok 1.',
    fullDescription: 'On April 12, 1961, Soviet cosmonaut Yuri Alekseyevich Gagarin made history by becoming the first human being to travel into outer space. His spacecraft, Vostok 1, completed one orbit of the Earth in a flight lasting 108 minutes. Gagarin ejected from the capsule at about 7 km altitude during descent and parachuted to the ground separately. His famous words "Poyekhali!" (Let\'s go!) became an iconic phrase in spaceflight history. The mission was a triumph of the Soviet space program and marked a pivotal moment in the Space Race between the USSR and the United States.',
    significance: 'Proved that humans could survive in space, opening the door to all future human spaceflight missions and inspiring generations of astronauts and cosmonauts.'
  },
  {
    id: 'm2',
    title: 'Apollo 11 Moon Landing',
    year: 'July 20, 1969',
    location: 'Sea of Tranquility, Moon',
    pioneer: 'Neil Armstrong & Buzz Aldrin',
    thumbnail: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=400&h=300&fit=crop',
    summary: 'Neil Armstrong took humanity\'s first steps on the Moon, a giant leap for mankind.',
    fullDescription: 'Apollo 11 was the spaceflight that first landed humans on the Moon. Commander Neil Armstrong and lunar module pilot Buzz Aldrin formed the American crew that landed the Apollo Lunar Module Eagle on July 20, 1969. Armstrong became the first person to step onto the lunar surface six hours later, and Aldrin joined him 19 minutes later. They spent about two and a quarter hours together exploring the site they had named Tranquility Base. Michael Collins piloted the command module Columbia alone in lunar orbit while they were on the Moon\'s surface. Armstrong\'s words "That\'s one small step for man, one giant leap for mankind" echoed across the world as 600 million people watched on television.',
    significance: 'Fulfilled President Kennedy\'s goal of landing a man on the Moon, demonstrated human capability to reach other celestial bodies, and returned invaluable lunar samples for scientific study.'
  },
  {
    id: 'm3',
    title: 'Launch of the Hubble Space Telescope',
    year: 'April 24, 1990',
    location: 'Low Earth Orbit',
    pioneer: 'NASA & ESA',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop',
    summary: 'The Hubble Space Telescope revolutionized our understanding of the cosmos.',
    fullDescription: 'The Hubble Space Telescope was launched into low Earth orbit in 1990 and remains in operation. It was not the first space telescope, but it is one of the largest and most versatile, renowned as a vital research tool and a public relations boon for astronomy. Despite an initial flaw in its primary mirror that was corrected during a servicing mission in 1993, Hubble has made more than 1.5 million observations since its launch. Its deep field images revealed thousands of galaxies in seemingly empty patches of sky, fundamentally changing our understanding of the universe\'s size and age. Hubble helped determine that the expansion of the universe is accelerating, leading to the discovery of dark energy.',
    significance: 'Transformed our understanding of the universe by providing unprecedented deep-space imagery, helping determine the age of the universe at approximately 13.8 billion years, and discovering dark energy.'
  },
  {
    id: 'm4',
    title: 'First Satellite: Sputnik 1',
    year: 'October 4, 1957',
    location: 'Baikonur Cosmodrome, USSR',
    pioneer: 'Sergei Korolev & Soviet Engineers',
    thumbnail: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&h=300&fit=crop',
    summary: 'The launch of Sputnik 1 marked the beginning of the Space Age.',
    fullDescription: 'Sputnik 1 was the first artificial Earth satellite, launched by the Soviet Union on October 4, 1957. The 58 cm diameter polished metal sphere transmitted radio signals for 21 days before its batteries died, and continued orbiting for two more months before falling back into the atmosphere. The satellite\'s radio pulses were detectable by amateur radio operators around the world, providing proof that it was truly orbiting the Earth. The launch shocked the world and triggered the Space Race between the Soviet Union and the United States, leading to the creation of NASA and unprecedented investment in space technology and science education.',
    significance: 'Launched the Space Age and the Space Race, leading to massive investments in space technology, the creation of NASA, and ultimately the Moon landings.'
  },
  {
    id: 'm5',
    title: 'Mars Rover Curiosity Landing',
    year: 'August 6, 2012',
    location: 'Gale Crater, Mars',
    pioneer: 'NASA / JPL',
    thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=300&fit=crop',
    summary: 'Curiosity landed on Mars using a daring sky crane maneuver to explore habitability.',
    fullDescription: 'NASA\'s Mars Science Laboratory mission successfully landed the Curiosity rover in Gale Crater on Mars on August 6, 2012, using an innovative sky crane landing system. The car-sized rover was designed to assess whether Mars ever had conditions favorable for microbial life. Curiosity discovered that ancient Mars had the right chemistry and environment to support living microbes. It found evidence of an ancient streambed where water once flowed, clay minerals that form in water, and organic molecules essential for life. The rover continues to explore and has climbed Mount Sharp, revealing billions of years of Martian geological history in the crater\'s layered rock formations.',
    significance: 'Proved that Mars once had conditions suitable for life, demonstrated revolutionary landing technology, and paved the way for future human Mars missions.'
  },
  {
    id: 'm6',
    title: 'International Space Station Assembly',
    year: 'November 20, 1998',
    location: 'Low Earth Orbit',
    pioneer: '15 Nations Collaboration',
    thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop',
    summary: 'The ISS became the largest international cooperative project in space history.',
    fullDescription: 'The International Space Station is a modular space station in low Earth orbit. It is the largest artificial object in space and the largest satellite in low Earth orbit, visible to the naked eye from Earth. The ISS program is a multi-national collaborative project involving NASA, Roscosmos, JAXA, ESA, and CSA. The first module, Zarya, was launched in November 1998, and the station has been continuously occupied since November 2000. Over 250 astronauts and cosmonauts from 20 countries have visited the station, conducting thousands of experiments in biology, physics, astronomy, and meteorology. The station orbits Earth at an average altitude of 408 km, traveling at about 28,000 km/h and completing 15.5 orbits per day.',
    significance: 'Demonstrated unprecedented international cooperation in space, served as a laboratory for thousands of scientific experiments, and provided continuous human presence in space for over two decades.'
  },
  {
    id: 'm7',
    title: 'Voyager 1 Enters Interstellar Space',
    year: 'August 25, 2012',
    location: 'Beyond the Heliosphere',
    pioneer: 'NASA / JPL',
    thumbnail: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=400&h=300&fit=crop',
    summary: 'Voyager 1 became the first human-made object to reach interstellar space.',
    fullDescription: 'Voyager 1 is a space probe launched by NASA on September 5, 1977. It is the most distant human-made object from Earth. On August 25, 2012, Voyager 1 crossed the heliopause and entered interstellar space, becoming the first spacecraft to do so. The probe carries the Golden Record, a phonograph record containing sounds and images selected to portray the diversity of life and culture on Earth, intended for any intelligent extraterrestrial life form that might find it. Despite being launched over 47 years ago, Voyager 1 continues to communicate with Earth, sending data from instruments that measure magnetic fields and cosmic rays in interstellar space. It is currently over 24 billion kilometers from the Sun.',
    significance: 'First human-made object to enter interstellar space, carrying a message from Earth to the cosmos, and still providing data about the space between stars after nearly five decades.'
  },
  {
    id: 'm8',
    title: 'James Webb Space Telescope First Images',
    year: 'July 12, 2022',
    location: 'L2 Lagrange Point',
    pioneer: 'NASA, ESA & CSA',
    thumbnail: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=300&fit=crop',
    summary: 'JWST revealed the deepest and sharpest infrared images of the distant universe.',
    fullDescription: 'The James Webb Space Telescope, the most powerful space telescope ever built, released its first full-color images on July 12, 2022. The $10 billion observatory, positioned at the second Lagrange point about 1.5 million km from Earth, captured the deepest and sharpest infrared image of the distant universe ever taken — Webb\'s First Deep Field showing galaxy cluster SMACS 0723 as it appeared 4.6 billion years ago. The telescope\'s 6.5-meter gold-plated mirror and infrared instruments can peer through cosmic dust to see the first galaxies formed after the Big Bang, study the atmospheres of exoplanets for signs of habitability, and observe star formation in unprecedented detail. JWST has already discovered galaxies from just 300 million years after the Big Bang.',
    significance: 'Opened a new era of astronomy by revealing the earliest galaxies, analyzing exoplanet atmospheres, and providing unprecedented views of cosmic phenomena invisible to previous telescopes.'
  },
  {
    id: 'm9',
    title: 'First Space Walk',
    year: 'March 18, 1965',
    location: 'Low Earth Orbit',
    pioneer: 'Alexei Leonov',
    thumbnail: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=400&h=300&fit=crop',
    summary: 'Alexei Leonov floated outside his spacecraft for 12 minutes, becoming the first human to walk in space.',
    fullDescription: 'On March 18, 1965, Soviet cosmonaut Alexei Leonov exited the Voskhod 2 spacecraft and floated freely in the vacuum of space for approximately 12 minutes, connected only by a 5.35-meter tether. His spacesuit inflated unexpectedly in the vacuum, making it extremely difficult to re-enter the airlock. Leonov had to partially deflate his suit to squeeze back inside, risking decompression sickness. The mission nearly ended in disaster when the automatic re-entry system failed and the crew had to land manually, ending up in a dense forest in the Ural Mountains where they spent two nights in freezing temperatures before rescue. Despite the dangers, Leonov\'s spacewalk proved humans could work outside a spacecraft.',
    significance: 'Demonstrated that astronauts could survive and function outside a spacecraft, paving the way for all future spacewalks essential to satellite repairs, space station construction, and lunar surface exploration.'
  },
  {
    id: 'm10',
    title: 'Cassini-Huygens at Saturn',
    year: 'July 1, 2004',
    location: 'Saturn System',
    pioneer: 'NASA, ESA & ASI',
    thumbnail: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=300&fit=crop',
    summary: 'Cassini orbited Saturn for 13 years, revealing stunning rings and ocean moons.',
    fullDescription: 'The Cassini-Huygens mission was a collaboration between NASA, ESA, and the Italian Space Agency that studied Saturn and its system of rings and moons for over 13 years. Launched in 1997, Cassini arrived at Saturn in 2004 and the Huygens probe landed on Titan in January 2005 — the first landing in the outer solar system. Cassini discovered that Enceladus, one of Saturn\'s moons, has a global subsurface ocean with hydrothermal vents shooting plumes of water ice into space, making it a prime candidate for extraterrestrial life. The spacecraft also revealed Titan\'s methane lakes and rivers, discovered seven new moons, and captured breathtaking images of Saturn\'s rings in unprecedented detail. The mission ended in September 2017 with a deliberate plunge into Saturn\'s atmosphere.',
    significance: 'Revealed Saturn\'s moons Enceladus and Titan as potential harbors for life, achieved the first landing in the outer solar system, and transformed our understanding of giant planet systems.'
  },
  {
    id: 'm11',
    title: 'First Woman in Space',
    year: 'June 16, 1963',
    location: 'Baikonur Cosmodrome, USSR',
    pioneer: 'Valentina Tereshkova',
    thumbnail: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400&h=300&fit=crop',
    summary: 'Valentina Tereshkova orbited Earth 48 times, proving women could fly in space.',
    fullDescription: 'On June 16, 1963, Soviet cosmonaut Valentina Vladimirovna Tereshkova launched aboard Vostok 6 and became the first woman to fly in space. Over the course of nearly three days, she orbited the Earth 48 times, spending more time in space than all American astronauts combined at that point. Tereshkova was selected from over 400 applicants and underwent 18 months of rigorous training including weightlessness flights, isolation tests, and parachute jumps. She maintained a detailed flight log and took photographs of the horizon that were later used to identify aerosol layers in the atmosphere. Despite experiencing nausea and physical discomfort, she completed her mission successfully. It would be 19 years before another woman, Svetlana Savitskaya, flew to space.',
    significance: 'Shattered gender barriers in spaceflight and inspired generations of women to pursue careers in science, technology, engineering, and space exploration.'
  },
  {
    id: 'm12',
    title: 'New Horizons Reaches Pluto',
    year: 'July 14, 2015',
    location: 'Pluto System',
    pioneer: 'NASA / APL / SwRI',
    thumbnail: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=400&h=300&fit=crop',
    summary: 'New Horizons flew past Pluto, revealing a surprisingly complex and active world.',
    fullDescription: 'After a nine-and-a-half-year journey covering over 5 billion kilometers, NASA\'s New Horizons spacecraft made its closest approach to Pluto on July 14, 2015, passing within 12,500 km of the dwarf planet\'s surface. The flyby revealed Pluto to be far more complex and geologically active than anyone had expected. The spacecraft discovered a vast heart-shaped glacier of nitrogen ice (Tombaugh Regio), towering mountains of water ice up to 3,500 meters high, a thin but hazy atmosphere with multiple layers, and evidence of possible cryovolcanism. Pluto\'s largest moon Charon was found to have a massive canyon system and a dark reddish polar cap. New Horizons later flew past the Kuiper Belt object Arrokoth in 2019, the most distant object ever visited by a spacecraft.',
    significance: 'Completed the initial reconnaissance of the classical solar system, revealed Pluto as a geologically active world, and opened exploration of the Kuiper Belt.'
  },
  {
    id: 'm13',
    title: 'SpaceX Falcon 9 First Landing',
    year: 'December 21, 2015',
    location: 'Cape Canaveral, Florida',
    pioneer: 'SpaceX / Elon Musk',
    thumbnail: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=400&h=300&fit=crop',
    summary: 'SpaceX successfully landed a Falcon 9 rocket booster, ushering in the era of reusable rockets.',
    fullDescription: 'On December 21, 2015, SpaceX achieved a historic milestone by successfully landing the first stage of a Falcon 9 rocket at Landing Zone 1 at Cape Canaveral after delivering 11 ORBCOMM satellites to orbit. This was the first time an orbital-class rocket booster had ever been landed vertically after a mission. The achievement came after years of development and several failed landing attempts on drone ships at sea. The reusable rocket technology dramatically reduced the cost of access to space — previously, rocket boosters worth tens of millions of dollars were discarded after a single use. SpaceX has since reflown boosters over 300 times, with some individual boosters flying more than 20 missions. This breakthrough fundamentally changed the economics of spaceflight.',
    significance: 'Revolutionized spaceflight economics by proving orbital rockets could be reused, dramatically reducing launch costs and making space more accessible for scientific and commercial missions.'
  },
  {
    id: 'm14',
    title: 'First Photo of a Black Hole',
    year: 'April 10, 2019',
    location: 'Galaxy M87',
    pioneer: 'Event Horizon Telescope Team',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop',
    summary: 'Scientists captured the first-ever image of a black hole\'s shadow, confirming Einstein\'s predictions.',
    fullDescription: 'On April 10, 2019, the Event Horizon Telescope (EHT) collaboration released the first-ever direct image of a black hole, specifically the supermassive black hole at the center of the galaxy Messier 87, located 55 million light-years from Earth. The image showed a bright ring of superheated gas and plasma swirling around the black hole\'s shadow — a dark region where light cannot escape the enormous gravitational pull. The achievement required linking eight radio telescopes across four continents to create a virtual Earth-sized telescope. The resulting data — over 5 petabytes — took two years to process using advanced algorithms. The image spectacularly confirmed predictions made by Einstein\'s general theory of relativity over a century earlier about how light behaves around extreme gravitational fields.',
    significance: 'Provided the first visual evidence of black holes, confirmed Einstein\'s general relativity in extreme gravity, and demonstrated the power of global scientific collaboration.'
  },
];

const ManuscriptsSection = () => {
  const [selectedManuscript, setSelectedManuscript] = useState<Manuscript | null>(null);
  const { t } = useLanguage();

  return (
    <section id="manuscripts" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <ScrollText className="w-10 h-10 text-amber-400" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 bg-clip-text text-transparent">
              {t('section.manuscripts')}
            </h2>
          </div>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t('manuscripts.desc')}
          </p>
        </motion.div>

        {/* Manuscript Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {manuscripts.map((ms, index) => (
            <motion.div
              key={ms.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setSelectedManuscript(ms)}
              className="group cursor-pointer bg-gradient-to-br from-slate-900/80 to-slate-800/40 border border-amber-500/10 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={ms.thumbnail}
                  alt={ms.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3">
                  <span className="text-[10px] uppercase tracking-widest text-amber-400/80 font-semibold">
                    {ms.year}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-amber-300 transition-colors line-clamp-2">
                  {ms.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mb-3">
                  {ms.summary}
                </p>
                <div className="flex items-center gap-1 text-amber-400/70 text-xs font-medium">
                  <span>Read manuscript</span>
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Manuscript Detail Modal */}
        <AnimatePresence>
          {selectedManuscript && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedManuscript(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: 'spring', damping: 25 }}
                className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/20 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl shadow-amber-500/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header Image */}
                <div className="relative h-48 sm:h-56">
                  <img
                    src={selectedManuscript.thumbnail}
                    alt={selectedManuscript.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  <button
                    onClick={() => setSelectedManuscript(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
                      {selectedManuscript.title}
                    </h3>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-amber-400/80">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedManuscript.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/50">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedManuscript.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/50">
                      <User className="w-4 h-4" />
                      <span>{selectedManuscript.pioneer}</span>
                    </div>
                  </div>

                  {/* Decorative divider */}
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                    <ScrollText className="w-4 h-4 text-amber-500/40" />
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                  </div>

                  {/* Full description */}
                  <div className="space-y-4">
                    <p className="text-white/80 leading-relaxed text-sm sm:text-base first-letter:text-3xl first-letter:font-bold first-letter:text-amber-400 first-letter:mr-1 first-letter:float-left">
                      {selectedManuscript.fullDescription}
                    </p>
                  </div>

                  {/* Significance */}
                  <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-5">
                    <h4 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-2">
                      Historical Significance
                    </h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {selectedManuscript.significance}
                    </p>
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

export default ManuscriptsSection;
