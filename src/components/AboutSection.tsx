import { Rocket, Heart, Sparkles, BookOpen } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">✨ About Cosmic Classroom</h2>
          </div>
          <div className="glass-card rounded-2xl p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
                  <Rocket className="w-6 h-6 text-primary" />
                  Our Mission
                </h3>
                <p className="text-muted-foreground mb-4">Cosmic Classroom is designed to spark curiosity about the universe in young minds! We make learning about space fun and accessible for kids ages 7-13.</p>
                <p className="text-muted-foreground">From planets in our solar system to distant galaxies, colorful nebulas to mysterious black holes - there's so much to explore!</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🪐', label: 'Planets & Moons' },
                  { icon: '⭐', label: 'Stars & Nebulas' },
                  { icon: '🌌', label: 'Galaxies' },
                  { icon: '📚', label: 'Books & Videos' },
                ].map((item) => (
                  <div key={item.label} className="glass-card p-4 rounded-xl text-center">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"><BookOpen className="w-6 h-6 text-primary" /></div>
              <h4 className="font-display font-bold mb-2">Learn</h4>
              <p className="text-sm text-muted-foreground">Discover fun facts about every type of celestial body in our universe.</p>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4"><Sparkles className="w-6 h-6 text-secondary" /></div>
              <h4 className="font-display font-bold mb-2">Play</h4>
              <p className="text-sm text-muted-foreground">Test your knowledge with fun quizzes and earn cool space badges!</p>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4"><Heart className="w-6 h-6 text-accent" /></div>
              <h4 className="font-display font-bold mb-2">Explore</h4>
              <p className="text-sm text-muted-foreground">Watch videos and read books curated just for young space explorers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
