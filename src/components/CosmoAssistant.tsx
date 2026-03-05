import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Bot, X, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

// TypeScript declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

interface Message {
  role: 'user' | 'cosmo';
  content: string;
  timestamp: Date;
}

// Comprehensive knowledge base covering ALL website content
const spaceKnowledge: { keywords: string[]; answer: string; questionTypes?: string[] }[] = [
  // ===================== SOLAR SYSTEM =====================
  { keywords: ['sun', 'star', 'our star'], answer: "The Sun is our closest star and the center of our solar system! It's a giant ball of hot, glowing gas that's about 93 million miles from Earth. The Sun is so big that over 1 million Earths could fit inside it! It gives us light, heat, and makes life on Earth possible. The Sun contains 99.86% of all the mass in our solar system and its surface is about 5,500°C. In about 5 billion years, it will become a red giant! ☀️" },
  { keywords: ['mercury'], answer: "Mercury is the smallest planet and closest to the Sun! It zooms around the Sun in just 88 Earth days - that's the fastest of any planet. Mercury has no moons and almost no atmosphere, so it gets super hot during the day (430°C) and freezing cold at night (-180°C). Despite being closest to the Sun, it's not the hottest planet - Venus holds that record! ☿️" },
  { keywords: ['venus'], answer: "Venus is sometimes called Earth's twin because they're almost the same size! But Venus is very different - it's covered in thick, toxic clouds of sulfuric acid and is the hottest planet at 465°C, even hotter than Mercury. Venus spins backwards (retrograde rotation), so the Sun rises in the west there! A day on Venus is longer than a year on Venus. ♀️" },
  { keywords: ['earth', 'our planet', 'home planet'], answer: "Earth is our amazing home and the only planet we know that has life! It's covered in oceans of liquid water (71% of the surface) and wrapped in a protective atmosphere. Earth is the only planet not named after a god - its name means 'the ground.' We have one Moon that controls our ocean tides. Earth orbits the Sun at about 67,000 mph! 🌍" },
  { keywords: ['mars', 'red planet'], answer: "Mars is called the Red Planet because iron oxide (rust) covers its surface! It has the tallest volcano, Olympus Mons (3 times taller than Everest), and the deepest canyon, Valles Marineris. NASA's rovers Curiosity (2012) and Perseverance (2021) are exploring Mars. Mars has two tiny moons: Phobos and Deimos. One day humans might live there! ♂️" },
  { keywords: ['jupiter', 'biggest planet', 'largest planet'], answer: "Jupiter is the biggest planet - you could fit over 1,300 Earths inside it! This gas giant has a famous storm called the Great Red Spot that has been raging for 350+ years. Jupiter has at least 95 moons, including four large Galilean moons: Io, Europa, Ganymede, and Callisto. Jupiter contains 2.5x the mass of all other planets combined! ♃" },
  { keywords: ['saturn', 'rings'], answer: "Saturn is famous for its beautiful rings made of 99.9% water ice with traces of rock and dust! It's so light that it would float in water if you had a big enough bathtub. Saturn has many moons, including Titan (with lakes of methane) and Enceladus (with water geysers). The rings are 175,000 miles wide but only 30-300 feet thick! ♄" },
  { keywords: ['uranus'], answer: "Uranus is an ice giant that spins on its side like a rolling ball - probably from a giant collision long ago! It has rings too, though they're much fainter than Saturn's. Uranus has 27 known moons named after Shakespeare characters. It takes 84 Earth years to orbit the Sun and has the coldest atmosphere of any planet at -224°C! ⛢" },
  { keywords: ['neptune'], answer: "Neptune is the windiest planet in our solar system, with storms over 2,000 km/h - faster than the speed of sound! It's a beautiful blue color because of methane in its atmosphere. Neptune is so far away that it takes 165 Earth years to orbit the Sun. It has 16 known moons, with Triton being the largest. ♆" },
  { keywords: ['pluto', 'dwarf planet'], answer: "Pluto was reclassified as a dwarf planet in 2006 because it hasn't 'cleared its orbital neighborhood.' It has a heart-shaped glacier made of frozen nitrogen and five moons. NASA's New Horizons flew by Pluto in 2015. Pluto is in the Kuiper Belt, a region of icy objects beyond Neptune. There are 5 recognized dwarf planets: Pluto, Eris, Haumea, Makemake, and Ceres! 💫" },

  // ===================== MOONS =====================
  { keywords: ['moon', 'lunar', 'our moon'], answer: "Our Moon is Earth's only natural satellite and the fifth largest moon in the solar system! It controls our ocean tides and stabilizes Earth's tilt. Twelve astronauts have walked on the Moon during NASA's Apollo missions. The Moon has no atmosphere, so astronaut footprints will last for millions of years! It's slowly drifting away from Earth at 3.8 cm per year. 🌙" },
  { keywords: ['europa'], answer: "Europa is one of Jupiter's moons with a vast ocean of liquid water under its icy surface - more water than all of Earth's oceans combined! Scientists believe it might be one of the best places to search for alien life in our solar system. Its diameter is 3,122 km. 🧊" },
  { keywords: ['titan'], answer: "Titan is Saturn's largest moon and the only moon with a thick atmosphere! It has lakes and rivers of liquid methane and ethane - not water! Titan is 5,150 km in diameter, bigger than Mercury. It's like a very cold version of early Earth. 🟠" },
  { keywords: ['io'], answer: "Io is the most volcanically active world in the entire solar system! It has over 400 active volcanoes that shoot lava hundreds of miles into space. Jupiter's strong gravity constantly squeezes Io, heating its interior. Its diameter is 3,643 km. 🌋" },
  { keywords: ['ganymede'], answer: "Ganymede is the largest moon in our solar system - even bigger than Mercury at 5,268 km diameter! It's one of Jupiter's four Galilean moons and has its own magnetic field, the only moon known to have one. 🌑" },
  { keywords: ['enceladus'], answer: "Enceladus is a small icy moon of Saturn that shoots giant geysers of water vapor into space! These plumes come from a subsurface ocean heated by Saturn's gravity. Scientists think it could be a great place to search for life! 💧" },

  // ===================== STARS =====================
  { keywords: ['star', 'how stars work', 'stars'], answer: "Stars are giant balls of hot, glowing gas powered by nuclear fusion - hydrogen atoms smashing together to form helium! They come in many colors - blue stars are hottest (30,000°C+), red stars are coolest (2,500°C). There are more stars in the universe than grains of sand on Earth! Our Milky Way has 200-400 billion stars. ⭐" },
  { keywords: ['supernova', 'exploding star'], answer: "A supernova is a massive explosion when a giant star dies! It can briefly outshine entire galaxies. Supernovas create and spread heavy elements like gold and iron - the calcium in your bones was forged in ancient supernovae! The last visible one in our galaxy was Kepler's Supernova in 1604. 💥" },
  { keywords: ['neutron star', 'pulsar'], answer: "Neutron stars are incredibly dense cores left after supernovas. A teaspoon of neutron star material would weigh 6 billion tons! Some spin up to 716 times per second and beam radiation like lighthouses - we call these pulsars. They have the strongest magnetic fields in the universe. ⭐" },
  { keywords: ['red giant'], answer: "A red giant is what happens when a star runs out of hydrogen fuel. It swells up to many times its original size and becomes cooler and redder. In about 5 billion years, our Sun will become a red giant, possibly swallowing Mercury, Venus, and Earth! 🔴" },
  { keywords: ['white dwarf'], answer: "A white dwarf is the final stage for stars like our Sun. After the red giant phase, the star sheds its outer layers and leaves behind a hot, dense core about the size of Earth but with the mass of the Sun. White dwarfs slowly cool over billions of years. ⚪" },
  { keywords: ['betelgeuse'], answer: "Betelgeuse is a famous red supergiant in Orion! It's about 700 times wider than our Sun and so huge that if it replaced our Sun, it would swallow up Mars! It could explode as a supernova any time in the next 100,000 years and might be visible during the day. 🔴" },
  { keywords: ['sirius', 'dog star'], answer: "Sirius is the brightest star in our night sky, located just 8.6 light-years away! It's nicknamed the 'Dog Star' and is actually a binary system - Sirius A is bright white, Sirius B is a tiny white dwarf. Ancient Egyptians based their calendar on when Sirius rose! ✨" },
  { keywords: ['arcturus'], answer: "Arcturus is an orange giant star moving through space at 122 km per second! It has a diameter about 35.7 million km and is one of the brightest stars visible from Earth. It's located in the constellation Boötes. 🟠" },

  // ===================== BLACK HOLES =====================
  { keywords: ['black hole'], answer: "Black holes are regions where gravity is so incredibly strong that nothing can escape - not even light! They form when massive stars die and collapse. At the center of most galaxies, including our Milky Way, there are supermassive black holes. One teaspoon of a black hole would weigh billions of tons! 🕳️" },
  { keywords: ['event horizon'], answer: "The event horizon is the boundary around a black hole - the point of no return! Once anything crosses it, it can never escape. From outside, time appears to slow down for objects approaching the event horizon. It's one of the most extreme environments in the universe. 🌑" },
  { keywords: ['sagittarius', 'milky way center'], answer: "Sagittarius A* is the supermassive black hole at the center of our Milky Way! It's about 4 million times more massive than our Sun and 26,000 light-years away. Scientists took the first picture of it in 2022! 📸" },

  // ===================== GALAXIES =====================
  { keywords: ['galaxy', 'galaxies'], answer: "Galaxies are huge collections of stars, gas, dust, and dark matter held together by gravity. Our Milky Way has 200-400 billion stars! There are over 200 billion galaxies in the observable universe. They come in spiral, elliptical, and irregular shapes. 🌌" },
  { keywords: ['milky way', 'our galaxy'], answer: "The Milky Way is our home galaxy - a spiral galaxy about 100,000 light-years across! Our solar system is in one of the spiral arms, about 26,000 light-years from the center. When you see the Milky Way in the night sky, you're looking into the disk of our galaxy. It contains 200-400 billion stars! 🌌" },
  { keywords: ['andromeda'], answer: "Andromeda is the nearest large galaxy, about 2.5 million light-years away! It contains about a trillion stars and is heading toward the Milky Way at 110 km/s. They will collide in about 4.5 billion years, merging into a new galaxy sometimes called 'Milkomeda'! 🌌" },

  // ===================== NEBULAS =====================
  { keywords: ['nebula', 'nebulas', 'nebulae'], answer: "Nebulas are giant clouds of gas and dust in space! Some are stellar nurseries where new stars are born, others are remains of dying stars. Types include emission, reflection, dark, and planetary nebulae. Famous ones include the Orion Nebula and the Pillars of Creation, which are 5 light-years tall! 🌈" },
  { keywords: ['orion nebula'], answer: "The Orion Nebula is one of the closest stellar nurseries, about 1,344 light-years away! You can see it with your naked eye as a fuzzy patch in Orion's sword. New stars are being born there right now! 🌟" },
  { keywords: ['pillars of creation'], answer: "The Pillars of Creation are towering columns of gas and dust in the Eagle Nebula where new stars form! They're about 5 light-years tall. The Hubble Space Telescope made them famous, and JWST captured them in even more stunning detail! 🏛️" },

  // ===================== SPACE EXPLORATION - ROCKETS =====================
  { keywords: ['rocket', 'rockets'], answer: "Rockets work using Newton's Third Law - hot gases shoot out the bottom, pushing the rocket upward! Unlike airplanes, rockets carry their own oxygen to work in space. SpaceX has made rockets that can land and be reused. The Saturn V remains the most powerful rocket successfully flown! 🚀" },
  { keywords: ['saturn v', 'saturn 5', 'moon rocket'], answer: "The Saturn V was the most powerful rocket ever successfully flown! At 363 feet tall (taller than the Statue of Liberty), it launched all Apollo Moon missions. Its five F-1 engines produced 7.5 million pounds of thrust - enough to lift 130 tons! 🚀" },
  { keywords: ['falcon', 'spacex rocket', 'spacex'], answer: "SpaceX's Falcon 9 is a reusable rocket that revolutionized spaceflight! It can land its first stage on a drone ship at sea. The Falcon Heavy is even more powerful - currently the most powerful operational rocket. SpaceX has dramatically reduced launch costs! 🚀" },
  { keywords: ['starship'], answer: "Starship is SpaceX's next-generation rocket designed to carry 100 people to Mars! It's the tallest and most powerful rocket ever built, fully reusable. Elon Musk hopes it will help make humans a multi-planetary species! 🚀" },
  { keywords: ['sls', 'artemis rocket'], answer: "The Space Launch System (SLS) is NASA's new mega-rocket for the Artemis Moon program! It's the most powerful rocket NASA has ever built. The first Artemis mission in 2022 sent an uncrewed Orion spacecraft around the Moon. 🚀" },

  // ===================== ASTRONAUTS =====================
  { keywords: ['astronaut', 'astronauts', 'become astronaut'], answer: "Astronauts are brave people who travel to space! To become one, you need to study hard (especially math and science), be very fit, and train for years. Over 600 people have been to space. They've walked on the Moon and now live on the International Space Station! 🧑‍🚀" },
  { keywords: ['yuri gagarin', 'first human space'], answer: "Yuri Gagarin became the first human in space on April 12, 1961! His flight in Vostok 1 lasted 108 minutes as he orbited Earth once. His famous words were 'Poyekhali!' meaning 'Let's go!' This pivotal moment proved humans could survive in space and opened the door to all future spaceflight. 🚀" },
  { keywords: ['neil armstrong', 'first moon walk'], answer: "Neil Armstrong became the first human to walk on the Moon on July 20, 1969! As commander of Apollo 11, he spoke the famous words: 'That's one small step for man, one giant leap for mankind.' Over 600 million people watched on TV! 🌙" },
  { keywords: ['buzz aldrin'], answer: "Buzz Aldrin was the second person to walk on the Moon, joining Neil Armstrong on Apollo 11 in 1969! He described the lunar landscape as 'magnificent desolation.' Aldrin is still an active space advocate who wants humans to go to Mars! 🌙" },
  { keywords: ['sally ride'], answer: "Sally Ride became the first American woman in space on June 18, 1983! She flew on the Space Shuttle twice and later started a program to inspire kids to study science. She was also the youngest American astronaut in space at 32! 👩‍🚀" },
  { keywords: ['valentina tereshkova', 'first woman space'], answer: "Valentina Tereshkova became the first woman in space on June 16, 1963 - twenty years before any American woman! She orbited Earth 48 times in nearly three days aboard Vostok 6. She was a factory worker and parachutist before becoming a cosmonaut! 👩‍🚀" },
  { keywords: ['chris hadfield'], answer: "Chris Hadfield is a Canadian astronaut famous for sharing space on social media! He recorded David Bowie's 'Space Oddity' on the ISS that went viral. He commanded the space station and inspired millions with his videos about life in space! 🎸" },
  { keywords: ['peggy whitson'], answer: "Peggy Whitson holds the record for most time in space by an American - 665 days! She commanded the ISS twice and did 10 spacewalks. She's an incredible role model for future astronauts! 👩‍🚀" },
  { keywords: ['mae jemison'], answer: "Mae Jemison became the first African American woman in space in 1992 aboard Space Shuttle Endeavour! She was a doctor before becoming an astronaut. She said she was inspired by Lt. Uhura from Star Trek! 👩‍🚀" },

  // ===================== MISSIONS =====================
  { keywords: ['iss', 'space station', 'international space station'], answer: "The ISS is a home in space orbiting at 250 miles altitude at 17,500 mph - circling Earth every 90 minutes! It's 357 feet long, weighing 420 tons, built by 15 nations since 1998. Over 250 astronauts from 20 countries have visited, conducting thousands of experiments. You can see it from Earth without a telescope! 🛸" },
  { keywords: ['apollo', 'apollo 11', 'moon landing'], answer: "NASA's Apollo program landed 12 astronauts on the Moon between 1969 and 1972! Apollo 11 was the first Moon landing on July 20, 1969, at the Sea of Tranquility. Astronauts collected Moon rocks, took photos, and conducted experiments. It fulfilled President Kennedy's goal and demonstrated human capability to reach other worlds! 🌙" },
  { keywords: ['apollo 13'], answer: "Apollo 13 is called a 'successful failure' - an oxygen tank exploded on the way to the Moon, but Mission Control and the crew worked together to bring everyone home safely! It's an incredible story of problem-solving and teamwork in a life-or-death situation. 🚀" },
  { keywords: ['voyager'], answer: "Voyager 1 and 2 launched in 1977 have traveled farther than any human-made object! They explored Jupiter, Saturn, Uranus, and Neptune, and are now in interstellar space. They carry Golden Records with sounds and images from Earth, in case aliens find them! Voyager 1 entered interstellar space on August 25, 2012 - the first spacecraft to do so! 🛸" },
  { keywords: ['hubble', 'hubble telescope'], answer: "The Hubble Space Telescope has been taking amazing pictures since 1990! It's made over 1.5 million observations. Its deep field images revealed thousands of galaxies in seemingly empty patches of sky. Hubble helped determine the universe's age at 13.8 billion years and discovered that expansion is accelerating (dark energy)! 🔭" },
  { keywords: ['james webb', 'jwst', 'webb telescope'], answer: "The James Webb Space Telescope is the most powerful space telescope ever built! Launched December 2021, its 6.5-meter gold-plated mirror can see the earliest galaxies from just 300 million years after the Big Bang. JWST is positioned at the L2 Lagrange point, 1.5 million km from Earth. The $10 billion observatory released its first stunning images on July 12, 2022! 🔭" },
  { keywords: ['artemis'], answer: "The Artemis program is NASA's plan to return humans to the Moon - and this time to stay! Artemis will land the first woman and first person of color on the Moon. It uses the SLS rocket and Orion spacecraft. It's preparing us for future missions to Mars! 🌙" },
  { keywords: ['perseverance', 'mars rover'], answer: "Perseverance is NASA's newest Mars rover, landing in Gale Crater in 2021! It's searching for signs of ancient microbial life and collecting rock samples. It also carried Ingenuity, the first helicopter to fly on another planet! 🤖" },
  { keywords: ['curiosity'], answer: "Curiosity is a car-sized Mars rover that landed in Gale Crater in August 2012 using a daring sky crane maneuver! It discovered that ancient Mars had conditions suitable for life, found evidence of ancient water, clay minerals, and organic molecules. It has traveled over 18 miles on Mars and continues exploring! 🤖" },
  { keywords: ['sputnik'], answer: "Sputnik 1 was the first artificial satellite, launched by the Soviet Union on October 4, 1957! This beach ball-sized spacecraft orbited Earth and beeped radio signals heard worldwide. It launched the Space Age and the Space Race, leading to the creation of NASA and eventually the Moon landings! 📡" },
  { keywords: ['ingenuity', 'mars helicopter'], answer: "Ingenuity is the first powered aircraft to fly on another planet! It landed on Mars with Perseverance in 2021 and completed over 50 flights. Flying on Mars is incredibly hard because the atmosphere is 100 times thinner than Earth's! 🚁" },

  // ===================== SPACE PHENOMENA =====================
  { keywords: ['comet', 'comets', 'halley'], answer: "Comets are 'dirty snowballs' of ice, rock, and organic compounds from the outer solar system! Near the Sun, ice vaporizes creating a glowing coma and two tails: a dust tail (curved, yellow) and an ion tail (straight, blue). Halley's Comet returns every 76 years - next visit in 2061! ☄️" },
  { keywords: ['asteroid', 'asteroids'], answer: "Asteroids are rocky remnants from 4.6 billion years ago! Most orbit in the belt between Mars and Jupiter. The Chicxulub asteroid (6 miles wide) caused the dinosaur extinction 66 million years ago. NASA's DART mission successfully deflected asteroid Dimorphos in 2022! ☄️" },
  { keywords: ['meteor', 'shooting star', 'meteorite'], answer: "Meteors or 'shooting stars' are space debris burning up in Earth's atmosphere at up to 160,000 mph! Most are grain-sized. If a rock survives to hit Earth, it's called a meteorite. About 48 tons of meteoric material falls to Earth daily! Meteor showers like the Perseids happen when Earth passes through comet debris trails. 🌠" },
  { keywords: ['aurora', 'northern lights'], answer: "Auroras are beautiful light shows caused by Sun particles interacting with Earth's magnetic field! The Northern Lights (Aurora Borealis) and Southern Lights (Aurora Australis) create dancing curtains of green, purple, and red light. They're most visible near the poles! 🌌" },
  { keywords: ['solar flare'], answer: "Solar flares are powerful explosions on the Sun's surface releasing huge energy! Large flares can disrupt satellites, GPS, and power grids. The Sun goes through an 11-year activity cycle with more flares at solar maximum! ☀️" },
  { keywords: ['eclipse', 'solar eclipse', 'lunar eclipse'], answer: "A solar eclipse occurs when the Moon passes between Earth and Sun. A lunar eclipse occurs when Earth blocks sunlight from reaching the Moon. Total solar eclipses are cosmic coincidences - the Moon is 400x smaller than the Sun but 400x closer, making them appear the same size! 🌑" },

  // ===================== BIG QUESTIONS =====================
  { keywords: ['big bang', 'beginning universe'], answer: "The Big Bang was the beginning of our universe about 13.8 billion years ago! It wasn't an explosion in space - it was the beginning of space itself. Everything was incredibly hot and dense, then started expanding and cooling. The universe is still expanding today, and the expansion is accelerating due to dark energy! 💥" },
  { keywords: ['dark matter'], answer: "Dark matter makes up about 27% of the universe! We can't see it, but we know it exists because of its gravitational effects - it holds galaxies together. Scientists are still trying to figure out exactly what dark matter is made of. It's one of the biggest mysteries in physics! 🌑" },
  { keywords: ['dark energy'], answer: "Dark energy makes up about 68% of the universe and is causing the universe to expand faster and faster! We don't know what it is - it's one of the biggest mysteries in science. Hubble and JWST have helped us understand its effects. Only about 5% of the universe is normal matter! 🌌" },
  { keywords: ['exoplanet', 'other planets', 'exoplanets'], answer: "Exoplanets orbit stars other than our Sun! We've confirmed over 5,500, and there are probably billions more. Detection methods include transit (dimming) and radial velocity (star wobble). Some are in the 'habitable zone' where liquid water might exist. Maybe one has life! 🌍" },
  { keywords: ['alien', 'extraterrestrial', 'life in space', 'are we alone'], answer: "We haven't found aliens yet, but scientists are searching! They look for signs of life on Mars, study moons like Europa with hidden oceans, and listen for radio signals (SETI). With trillions of galaxies each with billions of stars, the probability of life somewhere seems high (Drake Equation). The Fermi Paradox asks: if aliens exist, where are they? 👽" },
  { keywords: ['light year', 'lightyear'], answer: "A light-year is the distance light travels in one year - about 5.88 trillion miles! Light is the fastest thing in the universe at 186,282 miles per second. The nearest star, Proxima Centauri, is 4.24 light-years away. The observable universe is 93 billion light-years across! 🌟" },
  { keywords: ['gravity', 'gravitational'], answer: "Gravity pulls objects toward each other! It's why we stay on the ground and why planets orbit the Sun. The more massive something is, the stronger its gravity. Einstein showed gravity actually bends space and time - massive objects create 'dips' in spacetime! 🌐" },
  { keywords: ['wormhole'], answer: "A wormhole is a theoretical tunnel through space-time connecting two distant places! If they exist, you could travel billions of miles instantly. However, wormholes have never been observed and might require exotic matter. They remain science fiction - for now! 🌀" },
  { keywords: ['time travel'], answer: "According to Einstein, time passes differently depending on speed and gravity! Astronauts on the ISS age slightly slower than people on Earth. Traveling near light speed would slow time even more. Going to the past might be impossible, but the future? Physics says maybe! ⏰" },

  // ===================== GENERAL SPACE FACTS =====================
  { keywords: ['solar system'], answer: "Our solar system includes the Sun and everything orbiting it: 8 planets, dwarf planets like Pluto, moons, asteroids, comets, and more! It formed 4.6 billion years ago from a giant cloud of gas and dust. The Sun contains 99.8% of all the mass! 🌞" },
  { keywords: ['space', 'what is space'], answer: "Space is the vast expanse beyond Earth's atmosphere! It's mostly empty vacuum, incredibly cold (-455°F), and has no air. Space contains stars, planets, galaxies, nebulas, and mysterious dark matter and dark energy. The observable universe is 93 billion light-years across with at least 200 billion galaxies! 🌌" },
  { keywords: ['universe'], answer: "The universe is everything that exists - all space, time, matter, and energy! It began with the Big Bang 13.8 billion years ago and has been expanding ever since. The observable universe contains at least 200 billion galaxies, each with billions of stars! 🌌" },
  { keywords: ['spacewalk', 'eva'], answer: "A spacewalk (EVA - Extra-Vehicular Activity) is when an astronaut goes outside in a spacesuit! The first spacewalk was by Alexei Leonov in 1965. They're used to repair satellites, install equipment, and maintain the space station. Modern spacesuits cost about $12 million each! 🧑‍🚀" },
  { keywords: ['spacesuit'], answer: "A spacesuit is like a personal spacecraft! It provides oxygen, temperature control, and protection from radiation and micrometeors. They must be carefully designed so astronauts can move their fingers and work in space. A single spacesuit costs about $12 million! 🧑‍🚀" },
  { keywords: ['moon base', 'lunar base'], answer: "NASA and other space agencies are planning Moon bases! The Artemis program's Gateway station will orbit the Moon. Eventually, astronauts could live on the lunar surface for months, using local ice for water and preparing for Mars missions! 🏗️" },
  { keywords: ['mars colony', 'living mars', 'mars base'], answer: "People are seriously planning to live on Mars! SpaceX wants to build a city there. We'd need greenhouses for food, fuel from the Martian atmosphere, and radiation protection. It's challenging but could happen in your lifetime! 🏠" },
  { keywords: ['sound space'], answer: "No - space is a near-perfect vacuum with no medium for sound waves! Sound needs particles (air, water) to vibrate. However, NASA has 'sonified' data from space. Astronauts communicate via radio waves, which are electromagnetic, not mechanical! 🤫" },
  { keywords: ['day night', 'rotate', 'rotation'], answer: "Day and night occur because Earth rotates on its axis every 23 hours 56 minutes! The side facing the Sun has day, the opposite has night. Earth rotates west to east, making the Sun appear to rise in the east. At the equator, the surface moves at about 1,000 mph! 🌓" },
  { keywords: ['season', 'seasons', 'winter', 'summer'], answer: "Seasons happen because Earth's axis is tilted 23.5°! When your hemisphere tilts toward the Sun, you get summer (longer days, more direct sunlight). It's NOT about distance - Earth is actually closest to the Sun in January! 🍂" },
  { keywords: ['float', 'weightless', 'microgravity', 'zero gravity'], answer: "Astronauts experience 'microgravity' because they're in continuous free-fall around Earth! The ISS orbits at 17,500 mph - falling toward Earth but moving sideways fast enough to keep missing it. Gravity at ISS altitude is still 90% of surface gravity. It's perpetual falling! 🧑‍🚀" },
  { keywords: ['space cold', 'temperature space'], answer: "Space is incredibly cold - about -455°F (-270°C), just above absolute zero! There's almost nothing to hold heat. In sunlight, things get very hot (250°F), but in shadow, they freeze instantly. 🥶" },
  { keywords: ['speed earth', 'how fast earth'], answer: "Earth moves really fast! We orbit the Sun at 67,000 mph, move with the galaxy at 515,000 mph, and the galaxy travels through the universe at 1.3 million mph! We don't feel it because everything moves together. 🌍" },
  { keywords: ['smell space'], answer: "Astronauts say space has a distinct smell! After spacewalks, their suits smell like seared steak, gunpowder, or welding fumes. This comes from dying stars releasing polycyclic aromatic hydrocarbons! 👃" },
  { keywords: ['cry space', 'tears space'], answer: "If you cry in space, your tears don't fall - they form a wobbly ball on your face! Without gravity, tears just stick to your eyes. Astronauts have to wipe them off with a towel. Same goes for sweat during exercise! 😢" },
  { keywords: ['satellite', 'satellites', 'gps'], answer: "About 7,000 active artificial satellites orbit Earth for communication, GPS, weather, and science! The Moon is Earth's natural satellite. Geostationary satellites at 22,236 miles orbit in sync with Earth's rotation, appearing stationary. The first satellite was Sputnik in 1957! 📡" },
  { keywords: ['sleep space', 'astronaut sleep'], answer: "Astronauts sleep in sleeping bags tethered to walls! Without gravity, they'd drift around. The ISS has 16 sunrises daily, so astronauts use eye masks and scheduled sleep periods. Sleeping in microgravity is actually comfortable - no pressure points! 😴" },

  // ===================== CONSTELLATIONS =====================
  { keywords: ['constellation', 'constellations'], answer: "Constellations are patterns of stars used for navigation and storytelling for millennia! There are 88 official constellations covering the entire sky. Famous ones include Orion, Ursa Major (Big Dipper), Cassiopeia, and Scorpius. Stars in a constellation aren't physically close - they just appear aligned from Earth. On our website, you can explore interactive constellation maps in the Constellation Viewer! 🌟" },
  { keywords: ['orion', 'hunter'], answer: "Orion the Hunter is one of the most recognizable constellations! Named from Greek mythology - Orion was a mighty hunter who boasted he could defeat any animal. His three belt stars are Alnitak, Alnilam, and Mintaka. Best visible in winter. Contains famous stars Betelgeuse and Rigel! 🏹" },
  { keywords: ['big dipper', 'ursa major', 'great bear'], answer: "The Big Dipper is part of Ursa Major (Great Bear)! In one story, Callisto was turned into a bear by a jealous goddess. You can use the Big Dipper to find the North Star (Polaris) by following the two 'pointer stars' at the end of the cup. Best visible in spring! 🐻" },
  { keywords: ['cassiopeia'], answer: "Cassiopeia is shaped like a 'W' and named after a vain queen in Greek mythology! She boasted she was more beautiful than the sea nymphs. Cassiopeia is circumpolar, meaning it never sets below the horizon in the northern hemisphere. Best visible in autumn! 👑" },
  { keywords: ['scorpius', 'scorpio'], answer: "Scorpius contains the bright red supergiant star Antares, often called the 'Heart of the Scorpion'! In Greek mythology, Scorpius was the scorpion that stung Orion. That's why they're on opposite sides of the sky - they never appear together! Best visible in summer. 🦂" },

  // ===================== SIZE COMPARISON =====================
  { keywords: ['size comparison', 'how big', 'compare size', 'which bigger'], answer: "Our website has an amazing Size Comparison tool! Here are some mind-blowing sizes: Ceres (940 km), Pluto (2,377 km), Moon (3,474 km), Mercury (4,879 km), Earth (12,742 km), Neptune (49,244 km), Jupiter (139,820 km), the Sun (1,392,700 km), Sirius (2,380,000 km), and Betelgeuse (1,234,000,000 km - it would swallow Mars if it replaced our Sun)! 📏" },

  // ===================== MANUSCRIPTS / SPACE HISTORY =====================
  { keywords: ['manuscript', 'manuscripts', 'space history', 'achievements'], answer: "Our Space Manuscripts section showcases the greatest achievements in space history! It covers: Sputnik 1 (1957), Yuri Gagarin's first spaceflight (1961), Apollo 11 Moon landing (1969), Hubble Space Telescope (1990), ISS Assembly (1998), Curiosity Mars landing (2012), Voyager 1 entering interstellar space (2012), and JWST first images (2022). Click on any manuscript to read the full historical account! 📜" },

  // ===================== COURSES =====================
  { keywords: ['course', 'courses', 'learn', 'study', 'lesson'], answer: "We have amazing space courses you can take! Including: 'Our Solar System Adventure' (beginner), 'Stars and Constellations,' 'Black Holes & Mysteries,' 'Rocket Science & Engineering,' 'Mars Exploration,' 'Astronaut Training,' and many more! Each course has videos, books, and audiobooks. Complete free courses to earn Gift Vouchers and certificates! 📚" },
  { keywords: ['certificate', 'certificates'], answer: "You can earn certificates by completing our space courses! Finish all the course materials (videos, books, audiobooks) and pass the course quiz. Your certificates are displayed in the Certificate Showcase section. Completing free courses also earns you Gift Vouchers! 🏆" },

  // ===================== LIBRARY =====================
  { keywords: ['book', 'books', 'read', 'reading'], answer: "Our Celestial Library has a wonderful collection of space books! Titles include 'My First Book of Planets,' 'The Stars: A New Way to See Them,' and many more covering planets, stars, rockets, and space exploration. Each book has chapters you can read right on the website! 📖" },
  { keywords: ['video', 'videos', 'watch'], answer: "We have space videos in our Celestial Library! Watch educational content about planets, stars, rockets, space missions, and more. Videos are also included in our structured courses so you can learn step by step! 🎬" },
  { keywords: ['audiobook', 'audiobooks', 'listen', 'audio'], answer: "Our Celestial Library includes audiobooks you can listen to! They cover topics like rocketry, space exploration, astronauts, and the cosmos. Each audiobook has a narrator and estimated duration. They're also part of our structured courses! 🎧" },
  { keywords: ['library'], answer: "The Celestial Library is your one-stop space learning hub! It contains videos, books, and audiobooks about space. You can browse by category or access them through our structured courses. Look for the Library section on the website or click 'Library' in the navigation menu! 📚" },

  // ===================== GAMES =====================
  { keywords: ['game', 'games', 'play', 'quiz'], answer: "We have fun space games! Free games include Memory Match (match space pairs), Planet Order (arrange planets), Rocket Math (solve math problems), and Word Scramble (unscramble space words). Premium games include Asteroid Defender, Galaxy Explorer, Constellation Quest, and more! Earn coins by playing and winning! 🎮" },
  { keywords: ['memory match', 'memory game'], answer: "Memory Match is a fun game where you flip cards to find matching space-themed pairs! Test your memory while learning about planets, stars, and space objects. Earn coins for every match! 🃏" },
  { keywords: ['planet order'], answer: "In the Planet Order game, you arrange the planets in their correct order from the Sun! It's a great way to memorize Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune! 🪐" },
  { keywords: ['rocket math'], answer: "Rocket Math is an exciting game where you solve math problems to launch your rocket higher! The faster you answer, the more coins you earn. Great for practicing arithmetic while having space fun! 🚀" },
  { keywords: ['word scramble'], answer: "Word Scramble challenges you to unscramble jumbled space-related words! It's a fun way to learn space vocabulary like planets, astronauts, and cosmic phenomena! 🔤" },
  { keywords: ['premium game', 'premium games'], answer: "Premium games include Asteroid Defender (protect Earth from asteroids), Galaxy Explorer (navigate through galaxies), Constellation Quest, Gravity Runner, Space Station Builder, Exoplanet Hunter, and more! Each has coin rewards. You need a Game Pass to access premium games! 🎮" },
  { keywords: ['game pass'], answer: "Game Passes unlock premium games and perks! The Phoenix Pass gives extra lives, Star Booster doubles your coins, and more. You can buy them with your earned coins. Each pass lasts for a set number of days! 🎫" },

  // ===================== COINS & REWARDS =====================
  { keywords: ['coin', 'coins', 'earn', 'reward'], answer: "You earn coins by playing games, completing quizzes, and engaging with the website! Coins can be spent on Game Passes, subscriptions, and the Featured Shop. Your coin balance is displayed at the top of the screen. Keep learning and playing to earn more! 🪙" },
  { keywords: ['gift voucher', 'voucher', 'scratch card'], answer: "Gift Vouchers are special scratch-to-reveal rewards! You earn them by completing free courses. Each voucher reveals a surprise reward when you scratch it. Check the Gift Vouchers section to see your available vouchers! 🎁" },

  // ===================== SUBSCRIPTIONS =====================
  { keywords: ['subscription', 'subscriptions', 'subscribe', 'vip'], answer: "We offer subscription tiers: Space Explorer (basic perks, 5% bonus coins), Stargazer, and higher tiers with VIP benefits! Subscriptions give you bonus coins, daily login rewards, special badges, and exclusive features. You can subscribe using your earned coins! 🌟" },

  // ===================== WEBSITE FEATURES =====================
  { keywords: ['shop', 'featured shop', 'buy'], answer: "The Featured Shop offers special items and perks you can purchase with your coins! Check out the latest items available and spend your hard-earned space coins on exclusive rewards. 🛒" },
  { keywords: ['daily fact', 'fact of the day'], answer: "Check out the Daily Fact Widget for a new amazing space fact every day! Facts cover planets, stars, black holes, galaxies, rockets, and more. It's a great way to learn something new about space daily! 📰" },
  { keywords: ['timeline', 'space timeline', 'history timeline'], answer: "Our Space Timeline shows the history of the universe from the Big Bang (13.8 billion years ago) through the first stars, formation of our solar system, Earth, all the way to modern space exploration achievements! It's an interactive journey through cosmic history! ⏳" },
  { keywords: ['cosmo', 'assistant', 'help', 'chatbot'], answer: "I'm Cosmo, your friendly space assistant! 🚀 I can answer questions about anything on this website - planets, stars, galaxies, space history, courses, games, books, videos, and more! Try asking me 'what,' 'why,' 'where,' 'which,' 'when,' or 'what if' questions. You can type or use the microphone to ask! 🤖" },
  { keywords: ['navigate', 'find', 'where is', 'how to find', 'menu'], answer: "You can navigate the website using the top menu! It has links to sections like Solar System, Courses, Library (books, videos, audiobooks), Games, and more. Use the navigation bar at the top or scroll down to explore all sections including the Celestial Explorer, Space Timeline, Constellations, Manuscripts, and Fun Facts! 🧭" },
  { keywords: ['alien doom', 'mr doom', 'mrs doom', 'doom'], answer: "Mr. and Mrs. Doom are our fun 3D animated alien assistants! They're purple and cyan flying aliens who can answer your space questions with text-to-speech and animated mouth movements. They have distinct voice personalities. Find them on the main page! 👾" },
  { keywords: ['space qna', 'q&a', 'search bar', 'ask question'], answer: "The Space Q&A search bar at the top lets you type any space question and get an instant answer! It covers hundreds of topics including planets, stars, rockets, astronauts, and space phenomena. You can also use Cosmo (me!) or Mr. & Mrs. Doom for voice-based Q&A! 🔍" },
  { keywords: ['fun fact', 'fun facts', 'interesting'], answer: "Our Fun Facts section has dozens of mind-blowing space facts! Like: a day on Venus is longer than a year on Venus, neutron stars spin 600 times per second, there are more stars than grains of sand on Earth, and Jupiter's Great Red Spot has raged for 300+ years! 🤯" },
  { keywords: ['celestial explorer', 'explore celestial'], answer: "The Celestial Explorer lets you browse through 175+ celestial bodies including planets, moons, exoplanets, star types, nebulae, galaxies, and rare phenomena like magnetars, kilonovae, and blazars! Click on any object to learn more about it! 🔭" },

  // ===================== WHAT IF QUESTIONS =====================
  { keywords: ['what if sun disappeared', 'sun gone', 'no sun'], answer: "What if the Sun disappeared? Earth would go dark in 8 minutes (the time light takes to reach us). We'd keep orbiting where the Sun was for 8 minutes, then fly off in a straight line into space. Earth would freeze to about -240°C within a week. Some deep-sea organisms near volcanic vents might survive, but surface life would end. Thankfully, the Sun has 5 billion more years of fuel! ☀️❌" },
  { keywords: ['what if earth stopped', 'earth stop spinning', 'stop rotating'], answer: "What if Earth stopped spinning? Everything not bolted down would fly eastward at up to 1,000 mph! The oceans would surge in massive tsunamis. Days would be 6 months long (half a year of sunlight, half of darkness). Wind patterns would completely change. Earth would become more perfectly spherical. It would be catastrophic! 🌍💨" },
  { keywords: ['what if moon gone', 'no moon', 'moon disappeared'], answer: "What if the Moon disappeared? Earth's tides would shrink to about 1/3 (only solar tides). Nights would be much darker. Earth's axial tilt would become unstable over millions of years, causing extreme climate changes. Days would be slightly shorter since the Moon slows Earth's rotation. Many marine ecosystems that depend on tidal cycles would be disrupted! 🌙❌" },
  { keywords: ['what if jupiter gone', 'no jupiter'], answer: "What if Jupiter disappeared? Jupiter acts as our solar system's 'vacuum cleaner,' deflecting asteroids and comets with its massive gravity. Without it, Earth would be bombarded by 1,000 times more asteroid impacts! Many scientists believe Jupiter's protection was crucial for life to develop on Earth. 🪐❌" },
  { keywords: ['what if fell black hole', 'fall into black hole', 'enter black hole'], answer: "What if you fell into a black hole? You'd experience 'spaghettification' - gravity's difference between your feet and head would stretch you like spaghetti! Time would slow down relative to outside observers. From outside, you'd appear to freeze at the event horizon. For a supermassive black hole, you might cross the event horizon without initially noticing! 🕳️😱" },
  { keywords: ['what if faster light', 'faster than light', 'speed of light'], answer: "What if you could travel faster than light? According to Einstein, objects with mass can't reach light speed - you'd need infinite energy. But theoretically: you could travel forward in time, see light from the past, and distances would contract. Wormholes and 'warp drives' (like Alcubierre's) are theoretical ways to effectively cheat this limit! ⚡" },
  { keywords: ['what if asteroid hit', 'asteroid impact earth', 'asteroid earth'], answer: "What if a large asteroid hit Earth? A 6-mile asteroid (like the one that killed the dinosaurs) would cause: massive tsunamis, global firestorms, a dust cloud blocking sunlight for years, an 'impact winter,' and mass extinction. NASA's DART mission in 2022 proved we can deflect asteroids! They track all near-Earth objects. ☄️🌍" },
  { keywords: ['what if two planets collide', 'planets collide', 'planet crash'], answer: "What if two planets collided? It actually happened! About 4.5 billion years ago, a Mars-sized body called Theia crashed into early Earth, and the debris formed our Moon! Such a collision would release enormous energy, melt both planets' surfaces, and create a ring of debris. It's extremely rare in our current solar system. 💥🪐" },
  { keywords: ['what if live mars', 'living on mars', 'life on mars survive'], answer: "What if you lived on Mars? You'd need a pressurized habitat (Mars atmosphere is 100x thinner than Earth's). Days are 37 minutes longer. You'd weigh 38% of your Earth weight. Radiation is intense without a magnetic field. You'd grow food in greenhouses. Communication with Earth has a 4-24 minute delay. It's being planned by NASA and SpaceX! 🏠🔴" },
  { keywords: ['what if no gravity', 'gravity turned off', 'without gravity'], answer: "What if gravity turned off? The atmosphere would fly into space. Oceans would float away. Earth itself would disintegrate since gravity holds it together. Everything would drift apart. The Sun would stop nuclear fusion. The entire universe would fly apart! Gravity is truly the force that holds everything together. 🌐❌" },
];

const CosmoAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enhanced answer finder with question-type awareness
  const findAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase().trim();
    
    // Detect question type for context-aware responses
    const questionType = detectQuestionType(lowerQuestion);
    
    let bestMatch = { score: 0, answer: '' };
    
    for (const item of spaceKnowledge) {
      let score = 0;
      for (const keyword of item.keywords) {
        const lowerKeyword = keyword.toLowerCase();
        if (lowerQuestion.includes(lowerKeyword)) {
          // Longer keywords get higher scores for more specific matches
          score += lowerKeyword.length * 2;
          // Bonus for exact word match (not substring)
          const regex = new RegExp(`\\b${lowerKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
          if (regex.test(lowerQuestion)) {
            score += 5;
          }
        }
      }
      // Boost score if question type matches entry's types
      if (item.questionTypes && questionType && item.questionTypes.includes(questionType)) {
        score += 3;
      }
      if (score > bestMatch.score) {
        bestMatch = { score, answer: item.answer };
      }
    }

    if (bestMatch.score > 0) {
      return bestMatch.answer;
    }

    // Smart fallback responses based on question type
    return getQuestionTypeFallback(questionType, lowerQuestion);
  };

  // Detect the type of question being asked
  const detectQuestionType = (q: string): string | null => {
    if (q.startsWith('what if') || q.includes('what would happen') || q.includes('imagine if')) return 'what-if';
    if (q.startsWith('what') || q.includes('what is') || q.includes('what are') || q.includes("what's")) return 'what';
    if (q.startsWith('why') || q.includes('why do') || q.includes('why is') || q.includes('reason')) return 'why';
    if (q.startsWith('where') || q.includes('where is') || q.includes('where can') || q.includes('location')) return 'where';
    if (q.startsWith('which') || q.includes('which one') || q.includes('which is')) return 'which';
    if (q.startsWith('when') || q.includes('when did') || q.includes('when was') || q.includes('when will')) return 'when';
    if (q.startsWith('how') || q.includes('how does') || q.includes('how many') || q.includes('how far')) return 'how';
    if (q.startsWith('who') || q.includes('who was') || q.includes('who is')) return 'who';
    if (q.startsWith('can') || q.startsWith('could') || q.startsWith('is it possible')) return 'can';
    return null;
  };

  // Provide intelligent fallback based on question type
  const getQuestionTypeFallback = (type: string | null, q: string): string => {
    switch (type) {
      case 'what-if':
        return "That's a fascinating 'What If' scenario! 🤔 I love hypothetical space questions. Try asking me things like: 'What if the Sun disappeared?', 'What if you fell into a black hole?', 'What if Earth stopped spinning?', or 'What if Jupiter disappeared?' I have detailed answers for many cosmic scenarios!";
      case 'what':
        return "Great question! I know about planets, stars, galaxies, black holes, nebulas, constellations, rockets, astronauts, space missions, and everything on this website including courses, books, games, and more! Could you be more specific? For example: 'What is a black hole?', 'What are the courses available?', or 'What games can I play?' 🔭";
      case 'why':
        return "Excellent 'why' question! I can explain why the sky is blue, why Mars is red, why stars twinkle, why we have seasons, why Pluto isn't a planet, why astronauts float, and much more! Try asking about a specific topic. 🤔";
      case 'where':
        return "I can help you find things! On the website, you can find: the Celestial Library (books, videos, audiobooks) in the Library section, Space Courses in the Courses section, Games in the Games section, and Space Manuscripts about history. In space, I can tell you where planets, stars, and galaxies are located! 🧭";
      case 'which':
        return "I can help you compare! Try asking: 'Which is the biggest planet?', 'Which planet is hottest?', 'Which moon might have life?', 'Which constellation is visible in winter?', or 'Which course should I take?' I love comparison questions! ⚖️";
      case 'when':
        return "I know lots of space dates! From the Big Bang (13.8 billion years ago) to modern missions. Try asking: 'When was the Moon landing?', 'When was Sputnik launched?', 'When will Halley's Comet return?', or 'When did the universe begin?' Our Space Timeline covers all major events! 📅";
      case 'how':
        return "I can explain how things work in space! Try asking: 'How do rockets work?', 'How big is Jupiter?', 'How far is the Moon?', 'How do astronauts sleep?', or 'How many planets are there?' I love explaining cosmic mechanics! ⚙️";
      case 'who':
        return "I know about famous space explorers! Try asking about Yuri Gagarin, Neil Armstrong, Buzz Aldrin, Sally Ride, Valentina Tereshkova, Mae Jemison, Chris Hadfield, or Peggy Whitson. Each has an amazing story! 🧑‍🚀";
      case 'can':
        return "Great question! Try asking: 'Can you hear sound in space?', 'Can you breathe in space?', 'Can we live on Mars?', or 'Can you cry in space?' I have answers about what's possible in the cosmos! 🌟";
      default:
        return "Hello, young astronaut! I'm Cosmo, your friendly space guide! 🚀 I can answer questions about everything on this website — planets, stars, galaxies, black holes, space history, courses, books, videos, games, and more! Try asking me 'What,' 'Why,' 'Where,' 'Which,' 'When,' 'How,' or 'What If' questions. What cosmic mystery shall we explore? ✨";
    }
  };

  // Speak text using Web Speech API
  const speak = (text: string) => {
    if (!voiceEnabled) return;
    
    window.speechSynthesis.cancel();
    
    // Remove emojis for cleaner speech
    const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}☿♀♂♃♄⛢♆☀✨⚪⚖⚙️❌]/gu, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    // Try to find a friendly voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Daniel') || 
      v.name.includes('Samantha') ||
      v.name.includes('Alex') ||
      v.lang === 'en-US'
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Handle user message
  const handleUserMessage = (text: string) => {
    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Get Cosmo's response
    setTimeout(() => {
      const answer = findAnswer(text);
      const cosmoMessage: Message = {
        role: 'cosmo',
        content: answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, cosmoMessage]);
      speak(answer);
    }, 500);
  };

  // Toggle voice input
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      handleUserMessage(inputText.trim());
    }
  };

  // Open with greeting
  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      const greeting = "Hello, young explorer! I'm Cosmo, your friendly space assistant! 🚀 I know everything about this website — ask me about planets, stars, galaxies, black holes, space history, courses, games, books, videos, and more! Try 'What,' 'Why,' 'Where,' 'Which,' 'When,' or 'What If' questions. You can type or click the microphone to speak. What cosmic mystery shall we explore today? ✨";
      const cosmoMessage: Message = {
        role: 'cosmo',
        content: greeting,
        timestamp: new Date()
      };
      setMessages([cosmoMessage]);
      setTimeout(() => speak(greeting), 500);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleOpen}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-space-nebula to-space-star shadow-lg shadow-purple-500/40 flex items-center justify-center hover:scale-110 transition-all duration-300 ${isOpen ? 'hidden' : ''}`}
      >
        <div className="relative">
          <Bot className="w-8 h-8 text-white" />
          <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] bg-gradient-to-br from-space-deep via-space-nebula/40 to-space-deep border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600/80 to-space-nebula/80 p-4 flex items-center justify-between border-b border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-space-star flex items-center justify-center">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                {isSpeaking && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
                )}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  Cosmo <Sparkles className="w-4 h-4 text-yellow-300" />
                </h3>
                <p className="text-purple-200 text-xs">Your Space Assistant • Ask anything!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="text-white hover:bg-white/20"
              >
                {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-space-star/80 text-white rounded-br-sm'
                      : 'bg-purple-600/40 text-white rounded-bl-sm border border-purple-500/30'
                  }`}
                >
                  {message.role === 'cosmo' && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="w-4 h-4 text-purple-300" />
                      <span className="text-xs text-purple-300 font-medium">Cosmo</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-purple-500/30 bg-space-deep/50">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Button
                type="button"
                onClick={toggleListening}
                className={`shrink-0 w-12 h-12 rounded-full ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask what, why, where, when, what if..."}
                className="flex-1 bg-white/10 border border-purple-500/30 rounded-full px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-purple-400"
              />
              <Button
                type="submit"
                disabled={!inputText.trim()}
                className="shrink-0 w-12 h-12 rounded-full bg-space-star hover:bg-space-star/80"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CosmoAssistant;
