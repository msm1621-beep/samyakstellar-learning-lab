import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollText, ChevronRight, Calendar, MapPin, User, X } from 'lucide-react';

interface Manuscript {
  id: string;
  title: string;
  year: string;
  location: string;
  pioneers: string;
  description: string;
  significance: string;
}

const manuscripts: Manuscript[] = [
  {
    id: 'sputnik',
    title: 'Sputnik 1 — First Satellite',
    year: '1957',
    location: 'Baikonur Cosmodrome, USSR',
    pioneers: 'Sergei Korolev',
    description: 'On October 4, 1957, the Soviet Union launched Sputnik 1, the first artificial satellite, into orbit. This 58cm sphere with radio transmitters orbited Earth in 98 minutes, its beeping signal heard worldwide.',
    significance: 'Ignited the Space Race between the USA and USSR, marking humanity\'s first step into the space age and proving that objects could be launched into orbit.',
  },
  {
    id: 'gagarin',
    title: 'Vostok 1 — First Human in Space',
    year: '1961',
    location: 'Baikonur Cosmodrome, USSR',
    pioneers: 'Yuri Gagarin',
    description: 'Cosmonaut Yuri Gagarin became the first human to journey into outer space on April 12, 1961. His Vostok spacecraft completed one orbit of Earth in 108 minutes before returning safely.',
    significance: 'Proved that humans could survive in space, paving the way for all future crewed missions. Gagarin became an international hero and symbol of human achievement.',
  },
  {
    id: 'tereshkova',
    title: 'Vostok 6 — First Woman in Space',
    year: '1963',
    location: 'Baikonur Cosmodrome, USSR',
    pioneers: 'Valentina Tereshkova',
    description: 'Valentina Tereshkova orbited Earth 48 times over nearly three days aboard Vostok 6, spending more time in space than all American astronauts combined at that point.',
    significance: 'Broke gender barriers in space exploration. Tereshkova remains the youngest woman and the only woman to fly a solo space mission.',
  },
  {
    id: 'spacewalk',
    title: 'Voskhod 2 — First Space Walk',
    year: '1965',
    location: 'Low Earth Orbit',
    pioneers: 'Alexei Leonov',
    description: 'Alexei Leonov floated outside Voskhod 2 for 12 minutes, becoming the first human to conduct a spacewalk (EVA). His suit inflated dangerously, and he had to release pressure to re-enter the airlock.',
    significance: 'Demonstrated that astronauts could work outside spacecraft, essential for future space station construction and repairs.',
  },
  {
    id: 'apollo11',
    title: 'Apollo 11 — First Moon Landing',
    year: '1969',
    location: 'Sea of Tranquility, Moon',
    pioneers: 'Neil Armstrong, Buzz Aldrin, Michael Collins',
    description: 'On July 20, 1969, Neil Armstrong stepped onto the Moon\'s surface, declaring "That\'s one small step for man, one giant leap for mankind." Buzz Aldrin followed, while Collins orbited above.',
    significance: 'The greatest achievement in human exploration. Proved that humans could travel to and walk on another celestial body, fulfilling President Kennedy\'s challenge.',
  },
  {
    id: 'apollo13',
    title: 'Apollo 13 — Successful Failure',
    year: '1970',
    location: 'En route to the Moon',
    pioneers: 'Jim Lovell, Jack Swigert, Fred Haise',
    description: 'An oxygen tank exploded en route to the Moon, crippling the spacecraft. The crew used the lunar module as a lifeboat, and Mission Control improvised solutions to bring them home safely.',
    significance: 'Demonstrated NASA\'s problem-solving capabilities under extreme pressure. The mission is celebrated as a triumph of human ingenuity and teamwork.',
  },
  {
    id: 'skylab',
    title: 'Skylab — First US Space Station',
    year: '1973',
    location: 'Low Earth Orbit',
    pioneers: 'Multiple NASA crews',
    description: 'America\'s first space station hosted three crews over six years, conducting nearly 300 scientific experiments including studies of the Sun, Earth resources, and the effects of microgravity on the human body.',
    significance: 'Proved humans could live and work in space for extended periods, laying groundwork for the International Space Station.',
  },
  {
    id: 'voyager',
    title: 'Voyager Missions — Grand Tour',
    year: '1977',
    location: 'Interstellar Space',
    pioneers: 'NASA JPL Team',
    description: 'Voyager 1 and 2 launched in 1977, visiting Jupiter, Saturn, Uranus, and Neptune. Voyager 1 became the first human-made object to enter interstellar space in 2012, still transmitting data.',
    significance: 'Revolutionized our understanding of the outer planets and their moons. The Golden Records aboard carry sounds and images of Earth for any extraterrestrial finders.',
  },
  {
    id: 'hubble',
    title: 'Hubble Space Telescope',
    year: '1990',
    location: 'Low Earth Orbit',
    pioneers: 'NASA & ESA',
    description: 'Launched in 1990, Hubble has captured some of the most iconic images of the universe including the Pillars of Creation and the Hubble Deep Field, revealing galaxies billions of light-years away.',
    significance: 'Transformed astronomy by providing unprecedented views of the cosmos, helping determine the age of the universe and confirming the existence of dark energy.',
  },
  {
    id: 'iss',
    title: 'International Space Station',
    year: '1998',
    location: 'Low Earth Orbit',
    pioneers: 'NASA, Roscosmos, ESA, JAXA, CSA',
    description: 'The ISS has been continuously occupied since 2000, orbiting Earth every 90 minutes. This football-field-sized laboratory hosts experiments in biology, physics, and technology from 15 nations.',
    significance: 'The largest and most complex international scientific project in history, proving that nations can collaborate peacefully in space exploration.',
  },
  {
    id: 'cassini',
    title: 'Cassini-Huygens — Saturn Explorer',
    year: '2004',
    location: 'Saturn System',
    pioneers: 'NASA, ESA, ASI',
    description: 'Cassini orbited Saturn for 13 years, discovering ocean worlds on Enceladus and vast methane lakes on Titan. The Huygens probe landed on Titan — the farthest landing from Earth ever achieved.',
    significance: 'Revealed Saturn\'s moons as potential harbors for life, fundamentally changing our search for habitable worlds beyond Earth.',
  },
  {
    id: 'falcon9',
    title: 'SpaceX Falcon 9 — Reusable Rockets',
    year: '2015',
    location: 'Cape Canaveral, USA',
    pioneers: 'Elon Musk, SpaceX Team',
    description: 'SpaceX successfully landed a Falcon 9 first stage in December 2015, proving orbital-class rockets could be reused. This achievement has since been repeated over 200 times.',
    significance: 'Revolutionized spaceflight economics by dramatically reducing launch costs, making space more accessible and enabling ambitious missions like Starlink.',
  },
  {
    id: 'jwst',
    title: 'James Webb Space Telescope',
    year: '2021',
    location: 'L2 Lagrange Point',
    pioneers: 'NASA, ESA, CSA',
    description: 'Launched on Christmas Day 2021, JWST is the most powerful space telescope ever built. Its infrared instruments peer through cosmic dust to reveal the earliest galaxies formed after the Big Bang.',
    significance: 'Pushing the boundaries of observational astronomy, revealing details of exoplanet atmospheres and the universe\'s first light with unprecedented clarity.',
  },
];

const ManuscriptsSection = () => {
  const [selectedManuscript, setSelectedManuscript] = useState<Manuscript | null>(null);

  return (
    <section id="manuscripts" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">📜 Historic Space Manuscripts</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Relive humanity's greatest space achievements — from the first satellite to the James Webb Telescope.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {manuscripts.map((m) => (
            <motion.button
              key={m.id}
              className="glass-card p-5 rounded-2xl text-left hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1"
              onClick={() => setSelectedManuscript(m)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <ScrollText className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground font-mono">{m.year}</span>
              </div>
              <h3 className="text-sm font-display font-bold mb-1 group-hover:text-primary transition-colors leading-tight">
                {m.title}
              </h3>
              <p className="text-xs text-muted-foreground">{m.pioneers}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-primary/70">
                <ChevronRight className="w-3 h-3" /> Read More
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedManuscript && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="glass-card rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
              >
                <button
                  onClick={() => setSelectedManuscript(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground">{selectedManuscript.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedManuscript.year}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedManuscript.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {selectedManuscript.pioneers}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">📖 The Story</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedManuscript.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-star mb-2">⭐ Why It Matters</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedManuscript.significance}</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-border/50 text-right">
                  <button
                    onClick={() => setSelectedManuscript(null)}
                    className="py-2 px-6 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
                  >
                    Close
                  </button>
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
