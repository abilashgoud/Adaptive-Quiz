import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const QuestionCard = ({ questionData, selectedAnswer, isCorrect, onAnswerSelect }) => {
  return (
    <div className="bg-card/80 backdrop-blur-md border border-border/30 shadow-soft-xl rounded-2xl p-6 sm:p-8 w-full">
      <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6 sm:mb-8 min-h-[60px] sm:min-h-[84px] leading-tight">
        {questionData.question}
      </h2>
      
      <div className="space-y-3.5 sm:space-y-4">
        {questionData.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          let buttonClass = "border-border/70 hover:border-primary/70 hover:bg-primary/5 dark:hover:bg-primary/10 text-foreground";
          let IconComponent = null;
          let animationProps = {};

          if (isSelected) {
            if (isCorrect) {
              buttonClass = "bg-easy-light border-easy-DEFAULT text-easy-dark ring-2 ring-easy-DEFAULT/70 animate-pulse-correct";
              IconComponent = CheckCircle;
            } else {
              buttonClass = "bg-hard-light border-hard-DEFAULT text-hard-dark ring-2 ring-hard-DEFAULT/70 animate-shake-incorrect";
              IconComponent = XCircle;
            }
          } else if (selectedAnswer && option === questionData.answer) {
             buttonClass = "bg-easy-light/70 border-easy-DEFAULT/50 text-easy-dark"; 
          }

          return (
            <motion.button
              key={index}
              onClick={() => onAnswerSelect(option)}
              disabled={!!selectedAnswer}
              className={`w-full text-left px-5 py-3.5 border-2 rounded-xl transition-all duration-200 ease-in-out text-base font-medium flex items-center justify-between shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${buttonClass} ${selectedAnswer && !isSelected ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
              whileHover={!selectedAnswer ? { scale: 1.02, y: -2, boxShadow: "0px 6px 15px hsla(var(--primary),0.1)" } : {}}
              whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
              {...animationProps}
            >
              <span>{option}</span>
              {IconComponent && <IconComponent size={22} className="opacity-80" />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;