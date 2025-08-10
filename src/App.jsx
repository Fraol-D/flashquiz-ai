import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import QuizForm from "./components/QuizForm.jsx";
import QuizStage from "./components/QuizStage.jsx";
import LoadingCard from "./components/LoadingCard.jsx";
import ErrorCard from "./components/ErrorCard.jsx";
import { generateQuizFromText } from "./services/geminiService.js";
import "./index.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState("input"); // input | quiz | results
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");

  const apiKey = useMemo(
    () => localStorage.getItem("GEMINI_API_KEY") || "",
    []
  );

  async function handleGenerate(text) {
    try {
      setIsLoading(true);
      setError("");
      setScore(0);
      setCurrentIndex(0);
      setSelectedOption(null);
      const key = localStorage.getItem("GEMINI_API_KEY") || apiKey;
      const result = await generateQuizFromText({ apiKey: key, text });
      setQuestions(result);
      setStage("quiz");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelectOption(oi) {
    if (selectedOption !== null) return;
    setSelectedOption(oi);
    if (oi === questions[currentIndex].answerIndex) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    }
  }

  function handleFinish() {
    setStage("results");
  }

  function handlePlayAgain() {
    setStage("input");
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setError("");
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {stage === "input" && (
          <>
            <QuizForm onGenerate={handleGenerate} isLoading={isLoading} />
            {isLoading && <LoadingCard />}
            {!isLoading && error && (
              <ErrorCard message={error} onRetry={() => setError("")} />
            )}
          </>
        )}

        {stage === "quiz" && questions.length > 0 && (
          <QuizStage
            questions={questions}
            currentIndex={currentIndex}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onFinish={handleFinish}
          />
        )}

        {stage === "results" && (
          <div className="glass-card p-6 space-y-2">
            <p className="text-lg font-semibold">
              Score: {score} / {questions.length}
            </p>
            <p className="text-slate-300">
              {questions.length
                ? Math.round((score / questions.length) * 100)
                : 0}
              %
            </p>
            <div className="pt-2">
              <button
                className="primary-btn px-5 py-2.5"
                onClick={handlePlayAgain}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
