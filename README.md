# Adaptive Quiz Application

## 🚀 Overview

Adaptive Quiz is an intelligent quiz application that dynamically adjusts question difficulty based on user performance. Built with React and modern UI libraries, it offers a personalized learning experience by presenting increasingly challenging questions as users demonstrate proficiency.

## ✨ Features

### Core Features

- **Adaptive Difficulty System** - Questions automatically adjust in difficulty based on user performance
- **Three Difficulty Levels** - Easy, Medium, and Hard question pools
- **Performance-Based Progression** - Difficulty increases after 2 consecutive correct answers and decreases after 2 consecutive wrong answers
- **Multiple-Choice Interface** - Clean UI with immediate visual feedback on answers
- **Progress Indicator** - Track your progress through the quiz
- **Detailed Results** - Comprehensive breakdown of performance with score and retry options

### Advanced Features

- **State Persistence** - Quiz state is preserved during page refresh using localStorage
- **Performance Visualization** - Interactive circular progress indicators showing performance by difficulty
- **Answer Review Mode** - Revisit all quiz questions with your answers and correct solutions
- **Visual Feedback** - Animations, confetti celebrations for high scores, and toast notifications
- **Responsive Design** - Works seamlessly across mobile, tablet, and desktop devices

## 🛠️ Technologies Used

- **React** - Frontend library for building user interfaces
- **React Router** - Navigation and routing
- **Framer Motion** - Animations and transitions
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Vite** - Next generation frontend tooling

## 🏁 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/adaptive-quiz.git
   cd adaptive-quiz
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Usage

1. Start a new quiz from the homepage
2. Answer questions to the best of your ability
3. The quiz will adapt based on your performance:
   - Successfully answer questions to encounter more challenging ones
   - Struggle with questions and the difficulty will decrease
4. Complete the quiz to view your performance breakdown
5. Review your answers or try again to improve your score

## 🏗️ Project Structure

```
/
├── public/            # Static assets
├── src/
│   ├── components/    # UI components
│   │   ├── quiz/      # Quiz-specific components
│   │   └── ui/        # Shared UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilities and helpers
│   ├── pages/         # Application pages
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Entry point
├── index.html         # HTML template
└── vite.config.js     # Vite configuration
```

## 📱 Responsive Design

The application is fully responsive and works well on:

- Mobile devices
- Tablets
- Desktop computers

## 🔮 Future Enhancements

- Question timer to add urgency
- Category selector for different quiz topics
- Adaptive graph showing difficulty progression
- Sound effects for correct/incorrect answers
- User accounts and persistent high scores
- Additional question formats (true/false, fill-in-the-blank)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgements

- Icons by [Lucide](https://lucide.dev/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Confetti effects using [canvas-confetti](https://github.com/catdad/canvas-confetti)
