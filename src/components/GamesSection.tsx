import QuizGame from './QuizGame';
import SizeComparison from './SizeComparison';

const GamesSection = () => {
  return (
    <section id="games" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            🎮 Games & Quizzes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test your space knowledge and explore the universe interactively!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <QuizGame />
          <SizeComparison />
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
