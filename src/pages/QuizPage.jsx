import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuestionCard from "@/components/quiz/QuestionCard";
import QuizControls from "@/components/quiz/QuizControls";
import { Zap } from "lucide-react";

const QuizPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    currentQuestionData,
    currentDifficulty,
    currentQuestionIndex,
    questionPool,
    TOTAL_QUESTIONS,
    selectedAnswer,
    isCorrect,
    score,
    showNextButton,
    handleAnswerSelect,
    handleNextQuestion,
    difficultyMap,
  } = useQuizLogic(toast, navigate);

  if (!currentQuestionData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4 text-foreground">
        <Zap size={48} className="text-primary mb-4 animate-pulse" />
        <p className="text-xl font-semibold">Loading your challenge...</p>
        <p className="text-muted-foreground">Getting questions ready!</p>
      </div>
    );
  }

  const displayDifficulty = currentQuestionData.difficulty || currentDifficulty;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-20 dark:bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] dark:opacity-5"></div>

      <div className="w-full max-w-2xl z-10">
        <QuizHeader
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questionPool.length || TOTAL_QUESTIONS}
          difficulty={displayDifficulty}
          difficultyMap={difficultyMap}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 120,
              damping: 15,
            }}
            className="w-full"
          >
            <QuestionCard
              questionData={currentQuestionData}
              selectedAnswer={selectedAnswer}
              isCorrect={isCorrect}
              onAnswerSelect={handleAnswerSelect}
            />
          </motion.div>
        </AnimatePresence>

        <QuizControls
          showNextButton={showNextButton}
          onNextQuestion={handleNextQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questionPool.length || TOTAL_QUESTIONS}
          score={score}
        />
      </div>
      <footer className="text-center w-full mt-10 py-4 z-10">
        <p className="text-muted-foreground text-xs">
          Adaptive Quiz App &copy; {new Date().getFullYear()} &bull; Hackathon
          Edition
        </p>
      </footer>
    </div>
  );
};

export default QuizPage;
