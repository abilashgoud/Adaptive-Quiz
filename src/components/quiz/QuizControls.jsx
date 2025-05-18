import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Check, Award } from 'lucide-react';

const QuizControls = ({ showNextButton, onNextQuestion, currentQuestionIndex, totalQuestions, score }) => {
  return (
    <>
      <AnimatePresence>
      {showNextButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "circOut" }}
          className="mt-8 flex justify-end"
        >
          <Button
            onClick={onNextQuestion}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-xl text-lg font-semibold shadow-lg hover:shadow-primary/40 transition-all duration-300 transform active:scale-95"
            size="lg"
          >
            {currentQuestionIndex === totalQuestions - 1 ? "Finish Quiz" : "Next Question"}
            {currentQuestionIndex === totalQuestions - 1 ? <Check size={22} className="ml-2.5" /> : <ChevronRight size={22} className="ml-2.5" />}
          </Button>
        </motion.div>
      )}
      </AnimatePresence>
      
      <motion.div 
        key={`score-${score}`}
        initial={{ opacity: 0.5, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 text-center text-lg"
      >
        <span className="font-semibold text-foreground">Score: </span>
        <span className="font-bold text-primary">{score}</span>
        <span className="text-muted-foreground"> / {totalQuestions}</span>
        {score > 0 && <Award size={20} className="inline ml-2 text-yellow-500" />}
      </motion.div>
    </>
  );
};

export default QuizControls;