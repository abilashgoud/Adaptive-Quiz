import { useState, useEffect, useCallback } from "react";
import {
  getShuffledQuestions,
  difficulties,
  TOTAL_QUESTIONS,
} from "@/lib/quizData";
import { Smile, Meh, Frown } from "lucide-react";

/**
 * Visual mapping for different difficulty levels
 * Includes labels, colors, icons, and badge styles
 */
export const difficultyMap = {
  easy: {
    label: "Easy",
    color: "bg-easy-light text-easy-dark border-easy-DEFAULT",
    Icon: Smile,
    badgeColor: "bg-easy-DEFAULT text-easy-dark",
  },
  medium: {
    label: "Medium",
    color: "bg-medium-light text-medium-dark border-medium-DEFAULT",
    Icon: Meh,
    badgeColor: "bg-medium-DEFAULT text-medium-dark",
  },
  hard: {
    label: "Hard",
    color: "bg-hard-light text-hard-dark border-hard-DEFAULT",
    Icon: Frown,
    badgeColor: "bg-hard-DEFAULT text-hard-dark",
  },
};

// Key used to store quiz state in localStorage
const STORAGE_KEY = "adaptive_quiz_state";

/**
 * Helper Functions for localStorage persistence
 */

/**
 * Saves current quiz state to localStorage
 * @param {Object} state - The current quiz state
 */
const saveQuizState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving quiz state:", error);
  }
};

/**
 * Loads saved quiz state from localStorage
 * @returns {Object|null} The saved quiz state or null if none exists
 */
const loadQuizState = () => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error("Error loading quiz state:", error);
    return null;
  }
};

/**
 * Clears quiz state from localStorage
 */
const clearQuizState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing quiz state:", error);
  }
};

/**
 * Main quiz logic hook that handles the adaptive difficulty system
 * and state management for the quiz application
 *
 * @param {Function} toast - Toast notification function
 * @param {Function} navigate - React Router navigate function
 * @returns {Object} Quiz state and handler functions
 */
export const useQuizLogic = (toast, navigate) => {
  // Load saved state from localStorage or use defaults
  const savedState = loadQuizState();

  // Initialize state with saved values or defaults
  const [currentDifficulty, setCurrentDifficulty] = useState(
    savedState?.currentDifficulty || "medium"
  );
  const [questionPool, setQuestionPool] = useState(
    savedState?.questionPool || []
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    savedState?.currentQuestionIndex || 0
  );
  const [selectedAnswer, setSelectedAnswer] = useState(
    savedState?.selectedAnswer || null
  );
  const [isCorrect, setIsCorrect] = useState(savedState?.isCorrect || null);
  const [score, setScore] = useState(savedState?.score || 0);
  const [correctStreak, setCorrectStreak] = useState(
    savedState?.correctStreak || 0
  );
  const [wrongStreak, setWrongStreak] = useState(savedState?.wrongStreak || 0);
  const [showNextButton, setShowNextButton] = useState(
    savedState?.showNextButton || false
  );
  const [answeredQuestionsHistory, setAnsweredQuestionsHistory] = useState(
    savedState?.answeredQuestionsHistory || []
  );

  /**
   * Loads and prepares questions for the quiz
   * Ensures we have enough questions of the current difficulty level
   * and fills with other difficulty questions if needed
   */
  const loadQuestions = useCallback(() => {
    let newPool = [];
    const existingQuestionsOfCurrentDifficulty = questionPool.filter(
      (q) => q.difficulty === currentDifficulty
    ).length;

    // Determine how many more questions of current difficulty we need
    let questionsToFetchForCurrentDifficulty = Math.max(
      0,
      3 - existingQuestionsOfCurrentDifficulty
    );

    if (questionPool.length < TOTAL_QUESTIONS) {
      const difficultyQuestions = getShuffledQuestions(currentDifficulty);
      newPool = difficultyQuestions.slice(
        0,
        Math.min(
          difficultyQuestions.length,
          questionsToFetchForCurrentDifficulty,
          TOTAL_QUESTIONS - questionPool.length
        )
      );
    }

    setQuestionPool((prevPool) => {
      // Filter out questions we already have in the pool
      const uniqueNewQuestions = newPool.filter(
        (nq) => !prevPool.some((pq) => pq.question === nq.question)
      );

      let combinedPool = [
        ...prevPool,
        ...uniqueNewQuestions.map((q) => ({
          ...q,
          difficulty: currentDifficulty,
        })),
      ];

      // If we still don't have enough questions, get some from other difficulties
      if (combinedPool.length < TOTAL_QUESTIONS) {
        for (const diff of difficulties.filter(
          (d) => d !== currentDifficulty
        )) {
          if (combinedPool.length >= TOTAL_QUESTIONS) break;
          const additionalQuestions = getShuffledQuestions(diff);
          const questionsToAdd = additionalQuestions
            .filter(
              (aq) => !combinedPool.some((cq) => cq.question === aq.question)
            )
            .slice(0, TOTAL_QUESTIONS - combinedPool.length)
            .map((q) => ({ ...q, difficulty: diff }));
          combinedPool.push(...questionsToAdd);
        }
      }

      // Shuffle and limit to required number of questions
      const finalPool = combinedPool
        .sort(() => Math.random() - 0.5)
        .slice(0, TOTAL_QUESTIONS);
      return finalPool;
    });
  }, [currentDifficulty, questionPool]);

  // Initial question loading and ensuring we have enough questions
  useEffect(() => {
    if (
      questionPool.length === 0 ||
      (questionPool.length < TOTAL_QUESTIONS &&
        questionPool.filter((q) => q.difficulty === currentDifficulty).length <
          3)
    ) {
      loadQuestions();
    }
  }, [currentDifficulty, loadQuestions, questionPool]);

  // Save quiz state to localStorage whenever relevant state changes
  useEffect(() => {
    // Only save state if we have questions to avoid saving empty state
    if (questionPool.length > 0) {
      saveQuizState({
        currentDifficulty,
        questionPool,
        currentQuestionIndex,
        selectedAnswer,
        isCorrect,
        score,
        correctStreak,
        wrongStreak,
        showNextButton,
        answeredQuestionsHistory,
      });
    }
  }, [
    currentDifficulty,
    questionPool,
    currentQuestionIndex,
    selectedAnswer,
    isCorrect,
    score,
    correctStreak,
    wrongStreak,
    showNextButton,
    answeredQuestionsHistory,
  ]);

  // Get the current question data
  const currentQuestionData = questionPool[currentQuestionIndex];

  /**
   * Handles user answer selection
   * Updates score, streaks, and difficulty based on correctness
   *
   * @param {string} option - The selected answer option
   */
  const handleAnswerSelect = (option) => {
    if (selectedAnswer || !currentQuestionData) return;

    setSelectedAnswer(option);
    setShowNextButton(true);
    const correct = option === currentQuestionData.answer;
    setIsCorrect(correct);

    // Add to answered questions history
    setAnsweredQuestionsHistory((prev) => [
      ...prev,
      {
        ...currentQuestionData,
        selectedAnswer: option,
        isCorrect: correct,
        difficulty: currentQuestionData.difficulty || currentDifficulty,
      },
    ]);

    if (correct) {
      // Handle correct answer
      setScore((prev) => prev + 1);
      setCorrectStreak((prev) => prev + 1);
      setWrongStreak(0);

      // Increase difficulty after 2 consecutive correct answers
      if (correctStreak + 1 >= 2) {
        const currentDifficultyIndex = difficulties.indexOf(currentDifficulty);
        if (currentDifficultyIndex < difficulties.length - 1) {
          setCurrentDifficulty(difficulties[currentDifficultyIndex + 1]);
          toast({
            title: "Difficulty Increased! 🔥",
            description: "Great job! Moving to harder questions.",
            variant: "success",
          });
        }
        setCorrectStreak(0);
      }
    } else {
      // Handle wrong answer
      setWrongStreak((prev) => prev + 1);
      setCorrectStreak(0);

      // Decrease difficulty after 2 consecutive wrong answers
      if (wrongStreak + 1 >= 2) {
        const currentDifficultyIndex = difficulties.indexOf(currentDifficulty);
        if (currentDifficultyIndex > 0) {
          setCurrentDifficulty(difficulties[currentDifficultyIndex - 1]);
          toast({
            title: "Difficulty Decreased 📉",
            description: "No worries! Let's try some easier questions.",
            variant: "warning",
          });
        }
        setWrongStreak(0);
      }
    }
  };

  /**
   * Handles moving to the next question or finishing the quiz
   */
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionPool.length - 1) {
      // Move to next question
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowNextButton(false);

      // Update difficulty if next question has a different difficulty
      const nextQuestionDifficulty =
        questionPool[currentQuestionIndex + 1]?.difficulty || currentDifficulty;
      if (nextQuestionDifficulty !== currentDifficulty) {
        setCurrentDifficulty(nextQuestionDifficulty);
      }

      // Load more questions if we're running low on the current difficulty
      if (
        questionPool.filter(
          (q) =>
            q.difficulty ===
            (questionPool[currentQuestionIndex + 1]?.difficulty ||
              currentDifficulty)
        ).length < 3 &&
        currentQuestionIndex > questionPool.length - 4
      ) {
        loadQuestions();
      }
    } else {
      // End of quiz - navigate to results
      clearQuizState();
      navigate("/results", {
        state: {
          score: score,
          totalQuestions: questionPool.length,
          answeredQuestions: [
            ...answeredQuestionsHistory,
            ...(selectedAnswer && currentQuestionData
              ? []
              : [
                  {
                    ...currentQuestionData,
                    selectedAnswer: selectedAnswer,
                    isCorrect: isCorrect,
                    difficulty:
                      currentQuestionData?.difficulty || currentDifficulty,
                  },
                ]),
          ].filter(Boolean),
        },
      });
    }
  };

  /**
   * Resets the quiz to start over
   */
  const resetQuiz = () => {
    clearQuizState();
    setCurrentDifficulty("medium");
    setQuestionPool([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setCorrectStreak(0);
    setWrongStreak(0);
    setShowNextButton(false);
    setAnsweredQuestionsHistory([]);
    loadQuestions();
  };

  return {
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
    resetQuiz,
    difficultyMap,
  };
};
