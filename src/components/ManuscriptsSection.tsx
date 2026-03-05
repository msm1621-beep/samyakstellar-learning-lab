import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollText, ChevronRight, Calendar, MapPin, User, X } from 'lucide-react';

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
];

const ManuscriptsSection = () => {
  const [selectedManuscript, setSelectedManuscript] = useState<Manuscript | null>(null);

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
              Space Manuscripts
            </h2>
          </div>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Explore the greatest achievements in space history — pivotal moments that shaped our understanding of the cosmos.
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
