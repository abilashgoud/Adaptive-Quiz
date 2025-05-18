import React from "react";
import { motion } from "framer-motion";

const QuizHeader = ({
  currentQuestionIndex,
  totalQuestions,
  difficulty,
  difficultyMap,
}) => {
  const DifficultyIcon = difficultyMap[difficulty]?.Icon || (() => null);
  const progressPercentage =
    totalQuestions > 0
      ? ((currentQuestionIndex + 1) / totalQuestions) * 100
      : 0;

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex justify-between items-center mb-2 text-sm">
        <p className="font-medium text-muted-foreground">
          Question{" "}
          <span className="text-foreground font-semibold">
            {currentQuestionIndex + 1}
          </span>{" "}
          of{" "}
          <span className="text-foreground font-semibold">
            {totalQuestions}
          </span>
        </p>
        <motion.div
          key={difficulty}
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 150,
            damping: 15,
          }}
          className={`text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center shadow-sm border ${
            difficultyMap[difficulty]?.badgeColor
          } ${difficultyMap[difficulty]?.color.replace("bg-", "border-")}`}
        >
          <DifficultyIcon size={16} className="mr-1.5" />
          {difficultyMap[difficulty]?.label}
        </motion.div>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner-soft border border-border/50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.6, ease: "circOut" }}
        />
      </div>
    </div>
  );
};

export default QuizHeader;
