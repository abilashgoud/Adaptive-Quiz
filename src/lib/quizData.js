/**
 * Quiz data organized by difficulty levels
 * Each question contains:
 * - question: The question text
 * - options: Array of possible answers
 * - answer: The correct answer (must match one of the options)
 */
const quizData = {
  easy: [
    {
      question: "What is the color of the sky on a clear day?",
      options: ["Blue", "Green", "Red", "Yellow"],
      answer: "Blue",
    },
    {
      question: "How many legs does a spider typically have?",
      options: ["6", "8", "10", "4"],
      answer: "8",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
  ],
  medium: [
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: [
        "Charles Dickens",
        "William Shakespeare",
        "Jane Austen",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "NaCl"],
      answer: "H2O",
    },
    {
      question: "In which year did World War II end?",
      options: ["1942", "1945", "1950", "1939"],
      answer: "1945",
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Great White Shark", "Giraffe"],
      answer: "Blue Whale",
    },
    {
      question: "What force keeps us on the ground?",
      options: ["Magnetism", "Gravity", "Friction", "Tension"],
      answer: "Gravity",
    },
  ],
  hard: [
    {
      question: "What is the speed of light in a vacuum (approximately)?",
      options: [
        "300,000 km/s",
        "150,000 km/s",
        "500,000 km/s",
        "1,000,000 km/s",
      ],
      answer: "300,000 km/s",
    },
    {
      question: "Who developed the theory of relativity?",
      options: [
        "Isaac Newton",
        "Galileo Galilei",
        "Albert Einstein",
        "Nikola Tesla",
      ],
      answer: "Albert Einstein",
    },
    {
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      answer: "2",
    },
    {
      question: "Which element has the atomic number 1?",
      options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
      answer: "Hydrogen",
    },
    {
      question: "What is the main component of Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      answer: "Nitrogen",
    },
  ],
};

/**
 * Available difficulty levels for the quiz
 * Used for difficulty progression
 */
export const difficulties = ["easy", "medium", "hard"];

/**
 * Total number of questions to include in a quiz session
 */
export const TOTAL_QUESTIONS = 10;

/**
 * Returns a shuffled array of questions for the specified difficulty
 * @param {string} difficulty - The difficulty level (easy, medium, hard)
 * @returns {Array} Array of shuffled questions
 */
export const getShuffledQuestions = (difficulty) => {
  const questions = quizData[difficulty] || [];
  return [...questions].sort(() => Math.random() - 0.5);
};

export default quizData;
