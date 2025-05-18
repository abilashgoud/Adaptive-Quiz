import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import QuizPage from "@/pages/QuizPage";
import ResultPage from "@/pages/ResultPage";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted dark:from-background dark:to-slate-900 selection:bg-primary/30 selection:text-primary-foreground">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/results" element={<ResultPage />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
