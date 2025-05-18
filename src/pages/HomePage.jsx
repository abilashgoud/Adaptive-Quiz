import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Brain, TrendingUp, CheckCircle, Star } from "lucide-react";

// Import the localStorage clear function
const STORAGE_KEY = "adaptive_quiz_state";

const clearQuizState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing quiz state:", error);
  }
};

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-card/80 backdrop-blur-sm p-6 rounded-xl shadow-soft-lg border border-border/50 flex flex-col items-center text-center"
  >
    <div className="p-3 mb-4 rounded-full bg-primary/10 text-primary">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </motion.div>
);

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    // Clear any existing quiz state when starting a new quiz
    clearQuizState();
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 text-center font-sans relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.1),transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.05),transparent)]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="mb-4"
      >
        <Star className="text-accent mx-auto" size={40} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.2,
          type: "spring",
          stiffness: 100,
        }}
        className="text-4xl sm:text-6xl font-extrabold mb-6 text-gradient-primary"
      >
        Test Your Knowledge Smartly
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg sm:text-xl"
      >
        Embark on a personalized learning journey. Our intelligent quiz adapts
        to your skill level, offering a unique and effective way to master new
        concepts.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 10px 25px -5px hsl(var(--primary)/0.3)",
        }}
        whileTap={{ scale: 0.95 }}
        className="mb-16"
      >
        <Button
          onClick={handleStartQuiz}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 rounded-xl text-xl font-semibold shadow-lg hover:shadow-primary/40 transition-all duration-300 transform active:scale-95"
          size="lg"
        >
          <Zap size={22} className="mr-3" />
          Start Your Challenge
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl w-full mb-12">
        <FeatureCard
          icon={<Brain />}
          title="Adaptive Difficulty"
          description="Questions get harder or easier based on your answers, keeping you engaged."
          delay={0.8}
        />
        <FeatureCard
          icon={<TrendingUp />}
          title="Track Progress"
          description="See how you improve over time with detailed performance insights."
          delay={1.0}
        />
        <FeatureCard
          icon={<CheckCircle />}
          title="Instant Feedback"
          description="Learn from your mistakes immediately with clear explanations."
          delay={1.2}
        />
      </div>

      <div className="flex items-center justify-center space-x-3 mb-10">
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.4 }}
          className="text-sm font-medium text-easy-dark bg-easy-light px-4 py-2 rounded-full shadow-sm border border-easy-dark/30"
        >
          Easy 🌱
        </motion.span>
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.5 }}
          className="text-sm font-medium text-medium-dark bg-medium-light px-4 py-2 rounded-full shadow-sm border border-medium-dark/30"
        >
          Medium 🎯
        </motion.span>
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.6 }}
          className="text-sm font-medium text-hard-dark bg-hard-light px-4 py-2 rounded-full shadow-sm border border-hard-dark/30"
        >
          Hard 🔥
        </motion.span>
      </div>

      <footer className="w-full py-6">
        <p className="text-muted-foreground text-sm">
          Adaptive Quiz App &copy; {new Date().getFullYear()} &bull; Crafted for
          Hackathon
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
