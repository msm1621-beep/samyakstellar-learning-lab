# Stellar learning lab 

create this prompt with all celestial bodies like galaxies, nebulas etc.it should have videos and books

Create a fun, interactive **space** learning website for kids aged 7–13 called “Cosmic Classroom – Explore the Universe”. The site should be modern, responsive, and feel like a playful science lab in space, covering planets, moons, asteroids, comets, dwarf planets, stars, constellations, nebulas, star clusters, galaxies, black holes, and exoplanets.  

## Overall app and structure  
- Build a single-page web app with sections: Home, Solar System, Deep Space (Stars & Galaxies), Celestial Library (Videos & Books), Games & Quizzes, Fun Facts, and About.  
- Use a sticky top navigation bar with smooth scrolling, and a clear primary button: “Start Your Space Journey”.  
- Design mobile-first with large cards, touch-friendly buttons, and minimal text supported by icons or illustrations.  

## Home and main categories  
- Hero section: Full-width illustration of kids in space suits floating among planets, nebulas, and galaxies, with a headline like “Welcome to Cosmic Classroom – Explore Every Corner of the Universe!”.  
- Below the hero, show three big category tiles: “Solar System”, “Stars & Nebulas”, “Galaxies & Beyond”, each with a short description and “Explore” button that scrolls to the relevant section.  

## Celestial bodies explorer  
- Create a “Universe Explorer” section organized by tabs or filters:  
  - Solar System: Sun, Mercury, Venus, Earth, Moon, Mars, Jupiter, Saturn, Uranus, Neptune, dwarf planets (like Pluto), asteroids, comets.  
  - Stars & Nebulas: different star types (red giant, white dwarf, etc. simplified), star clusters, nebulas (e.g., Orion Nebula, Eagle Nebula), supernovas.  
  - Galaxies & Beyond: spiral, elliptical, irregular galaxies, the Milky Way, Andromeda, black holes, exoplanets, and galaxy clusters.  
- Each celestial body should be a card with:  
  - Name, simple icon or image, and a one-line kid-friendly description.  
  - A “Learn More” button opening a modal or side panel with: what it is, where it is, one cool fact, and a simple metric (e.g., “very far”, “very hot”, “very big”) explained in plain language instead of complex numbers.  
- Include basic filters (e.g., Distance: “Near / Far”, Type: “Planet / Star / Nebula / Galaxy / Other”) using colorful toggle chips.  

## Videos and books library  
- Add a “Celestial Library” section split into two subsections: “Videos” and “Books & Guides”.  
- Videos:  
  - Create a grid of video cards with thumbnail, title, short 1-line description (e.g., “Tour of the Milky Way”, “What is a Nebula?”), and a “Watch” button.  
  - Use embedded video placeholders (e.g., iframe blocks) that can be replaced later with real educational YouTube or space-agency videos; ensure the layout works well on mobile.  
- Books & Guides:  
  - Show book-style cards for kids’ astronomy books and short guides, with title, author/creator name (or “Space Guide”), recommended age, and a brief 1–2 line summary.  
  - Include tags like “Planets”, “Stars & Nebulas”, “Galaxies”, “Beginner”, “Advanced” so kids or parents can filter content.  
  - Add a “Download / Read More” button that for now can be a placeholder link, making it easy to hook into real ebooks or PDFs later.  

## Games, quizzes, and fun facts  
- “Games & Quizzes” section should include:  
  - Multiple-choice quiz that pulls questions from all categories: Solar System, stars, nebulas, galaxies, black holes, exoplanets, etc., with instant feedback and a friendly results badge (e.g., “Nebula Navigator”, “Galaxy Genius”).  
  - A drag-and-drop game to group celestial bodies into “Solar System”, “Stars”, “Nebulas”, “Galaxies”, and “Other Space Objects”.  
- “Fun Facts” section:  
  - A grid of flip cards that reveal short, surprising facts when tapped or clicked, mixing topics like how stars are born, how nebulas glow, how galaxies spin, and what happens near a black hole.  
  - Optionally include a “Random Space Fact” button that shows a new fact each time it is clicked.  

## About, accessibility, and tech  
- “About Cosmic Classroom” section should explain in simple language that the website helps kids learn about all kinds of celestial bodies through short explanations, pictures, videos, games, and a small library of kid-friendly books.  
- Ensure accessibility with clear color contrast, readable fonts, keyboard-friendly navigation, and alt text for all images and icons.  
- Implement using a modern stack (e.g., React with a component-based structure and a JSON-like data source for all celestial bodies, videos, and books) so new bodies, videos, and books can be added easily later.  

## Footer and future expansion  
- Footer should include simple links: Home, Celestial Library, For Parents & Teachers, Contact (placeholder), and Privacy (placeholder).  
- Leave clear placeholder notes for future features such as user profiles, saved favorite celestial bodies, progress tracking through quizzes, and badges for completing topic collections (e.g., “Nebula Expert”, “Galaxy Explorer”).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://samyakstellar-learning-lab.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/59fea425-dd45-4778-a60b-77311968bfff).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
