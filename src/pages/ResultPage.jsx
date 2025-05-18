import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, animate } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  BarChart3,
  Brain,
  Target,
  Repeat,
  Award,
  ListChecks,
  PieChart,
} from "lucide-react";
import { difficulties as difficultyLevels } from "@/lib/quizData";

const AnimatedCounter = ({ value, className }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "circOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return controls.stop;
  }, [value]);

  return <span className={className}>{displayValue}</span>;
};

// New circular progress component
const CircularProgress = ({
  percentage,
  color,
  size = 80,
  strokeWidth = 8,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress after component mounts
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 500);

    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted opacity-20"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={color}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span
          className={`text-xl font-bold ${color.replace("text-", "text-")}`}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    score = 0,
    totalQuestions = 0,
    answeredQuestions = [],
  } = location.state || {};

  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (totalQuestions > 0 && score / totalQuestions >= 0.8) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 250);
    }
  }, [score, totalQuestions]);

  const getFeedback = () => {
    if (totalQuestions === 0)
      return {
        text: "No questions answered.",
        Icon: Repeat,
        color: "text-muted-foreground",
        iconBg: "bg-muted",
      };
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80)
      return {
        text: "Excellent Work! 🧠",
        Icon: Award,
        color: "text-easy-dark",
        iconBg: "bg-easy-light",
      };
    if (percentage >= 50)
      return {
        text: "Good Effort! 🎯",
        Icon: Target,
        color: "text-medium-dark",
        iconBg: "bg-medium-light",
      };
    return {
      text: "Keep Practicing! 🔄",
      Icon: Brain,
      color: "text-hard-dark",
      iconBg: "bg-hard-light",
    };
  };

  const feedback = getFeedback();
  const FeedbackIcon = feedback.Icon;

  const performanceByDifficulty = useMemo(() => {
    if (!answeredQuestions || answeredQuestions.length === 0) return [];

    return difficultyLevels
      .map((level) => {
        const questionsOfDifficulty = answeredQuestions.filter(
          (q) => q.difficulty === level
        );
        const correctAnswers = questionsOfDifficulty.filter(
          (q) => q.isCorrect
        ).length;
        let textColor = "text-secondary";
        if (level === "easy") textColor = "text-easy-dark";
        else if (level === "medium") textColor = "text-medium-dark";
        else if (level === "hard") textColor = "text-hard-dark";

        return {
          difficulty: level.charAt(0).toUpperCase() + level.slice(1),
          correct: correctAnswers,
          total: questionsOfDifficulty.length,
          textColor: textColor,
          level: level,
          percentage:
            questionsOfDifficulty.length > 0
              ? (correctAnswers / questionsOfDifficulty.length) * 100
              : 0,
        };
      })
      .filter((d) => d.total > 0);
  }, [answeredQuestions]);

  if (!location.state || totalQuestions === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-destructive/80 to-orange-500/80 text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/80 backdrop-blur-md p-8 rounded-2xl shadow-soft-xl text-center"
        >
          <h1 className="text-3xl font-bold mb-4 text-foreground">Oops!</h1>
          <p className="text-xl mb-6 text-muted-foreground">
            No result data found. Please complete a quiz first.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col items-center p-4 sm:p-6 font-sans overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="bg-card/90 backdrop-blur-md border border-border/30 rounded-2xl shadow-soft-xl p-6 sm:p-10 text-center w-full max-w-3xl my-8"
      >
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold mb-3 text-gradient-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Your Score
        </motion.h1>
        <motion.p
          className="text-6xl sm:text-8xl font-bold text-foreground mb-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        >
          <AnimatedCounter value={score} />/
          <AnimatedCounter value={totalQuestions} />
        </motion.p>

        <motion.div
          key={feedback.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={`flex items-center justify-center text-xl sm:text-2xl font-semibold ${feedback.color} mb-10 p-3 rounded-lg ${feedback.iconBg} border border-current/30`}
        >
          <FeedbackIcon size={28} className="mr-3" />
          {feedback.text}
        </motion.div>

        {performanceByDifficulty.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center justify-center">
              <PieChart size={26} className="mr-3 text-primary" /> Performance
              Breakdown
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
              {performanceByDifficulty.map((item, index) => (
                <motion.div
                  key={item.difficulty}
                  className="flex flex-col items-center p-4 rounded-xl bg-card/50 border border-border/40 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.2 }}
                >
                  <h3 className={`text-lg font-medium mb-2 ${item.textColor}`}>
                    {item.difficulty}
                  </h3>
                  <CircularProgress
                    percentage={item.percentage}
                    color={item.textColor}
                  />
                  <p className="mt-4 text-sm font-medium text-muted-foreground">
                    <span className={`${item.textColor} font-semibold`}>
                      {item.correct}
                    </span>{" "}
                    correct out of{" "}
                    <span className="font-semibold">{item.total}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button
            onClick={() => navigate("/quiz")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-xl text-lg font-semibold shadow-lg hover:shadow-primary/40 transition-all duration-300 transform active:scale-95 w-full sm:w-auto"
            size="lg"
          >
            <RotateCcw size={22} className="mr-2.5" /> Try Again
          </Button>
          {answeredQuestions && answeredQuestions.length > 0 && (
            <Button
              onClick={() => setShowReview(!showReview)}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary px-8 py-3.5 rounded-xl text-lg font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-300 transform active:scale-95 w-full sm:w-auto"
              size="lg"
            >
              <ListChecks size={22} className="mr-2.5" />
              {showReview ? "Hide Review" : "Review Answers"}
            </Button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showReview && answeredQuestions && answeredQuestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 30 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 30 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="w-full max-w-3xl bg-card/90 backdrop-blur-md border border-border/30 rounded-2xl shadow-soft-xl p-6 sm:p-8 overflow-hidden mb-8"
          >
            <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
              Review Your Answers
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {answeredQuestions.map((item, index) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={index}
                  className="border border-border/50 p-1 rounded-xl transition-shadow hover:shadow-md bg-background/50 data-[state=open]:bg-muted/50"
                >
                  <AccordionTrigger className="text-left hover:no-underline px-4 py-3 text-foreground font-medium text-base">
                    <div className="flex items-center">
                      {item.isCorrect ? (
                        <CheckCircle
                          size={20}
                          className="mr-3 text-easy-DEFAULT"
                        />
                      ) : (
                        <XCircle size={20} className="mr-3 text-hard-DEFAULT" />
                      )}
                      Question {index + 1}: {item.question.substring(0, 60)}
                      {item.question.length > 60 ? "..." : ""}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-3 px-4 text-muted-foreground">
                    <p className="mb-2 text-sm">
                      <span className="font-semibold text-foreground">
                        Full Question:
                      </span>{" "}
                      {item.question}
                    </p>
                    <p
                      className={`mb-1.5 text-sm flex items-center ${
                        item.isCorrect ? "text-easy-dark" : "text-hard-dark"
                      }`}
                    >
                      <span className="font-semibold mr-1.5 text-foreground">
                        Your Answer:
                      </span>{" "}
                      {item.selectedAnswer || "Not answered"}
                    </p>
                    {!item.isCorrect && (
                      <p className="mb-1.5 text-sm text-easy-dark">
                        <span className="font-semibold text-foreground">
                          Correct Answer:
                        </span>{" "}
                        {item.answer}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground/80">
                      <span className="font-semibold">Difficulty:</span>{" "}
                      <span
                        className={`font-medium ${
                          item.difficulty === "easy"
                            ? "text-easy-dark"
                            : item.difficulty === "medium"
                            ? "text-medium-dark"
                            : "text-hard-dark"
                        }`}
                      >
                        {item.difficulty.charAt(0).toUpperCase() +
                          item.difficulty.slice(1)}
                      </span>
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        )}
      </AnimatePresence>
      <footer className="text-center w-full py-6">
        <p className="text-muted-foreground text-xs">
          Adaptive Quiz App &copy; {new Date().getFullYear()} &bull; Visually
          Enhanced
        </p>
      </footer>
    </div>
  );
};

export default ResultPage;
