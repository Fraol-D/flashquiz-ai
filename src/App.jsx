import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import QuizForm from "./components/QuizForm.jsx";
// import QuizStage from "./components/QuizStage.jsx";
import QuizDisplay from "./components/QuizDisplay.jsx";
import LoadingCard from "./components/LoadingCard.jsx";
import ErrorCard from "./components/ErrorCard.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { generateQuizFromText } from "./services/geminiService.js";
import "./index.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState("input"); // input | quiz | results
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // qi -> oi
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");

  const apiKey = useMemo(
    () => localStorage.getItem("GEMINI_API_KEY") || "",
    []
  );

  async function handleGenerate(text, numQuestions = 6) {
    try {
      setIsLoading(true);
      setError("");
      setScore(0);
      setAnswers({});
      const key = localStorage.getItem("GEMINI_API_KEY") || apiKey;
      const result = await generateQuizFromText({
        apiKey: key,
        text,
        numQuestions,
      });
      setQuestions(result);
      setStage("quiz");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleAnswer(qi, oi) {
    setAnswers((prev) => ({ ...prev, [qi]: oi }));
  }

  function handleSubmitAll() {
    if (!questions.length) return;
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answerIndex) correct += 1;
    });
    setScore(correct);
    setStage("results");
  }

  function handlePlayAgain() {
    setStage("input");
    setQuestions([]);
    setAnswers({});
    setScore(0);
    setError("");
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        {/* Always show input form at top */}
        <QuizForm onGenerate={handleGenerate} isLoading={isLoading} />
        {isLoading && <LoadingCard />}
        {!isLoading && error && (
          <ErrorCard message={error} onRetry={() => setError("")} />
        )}

        {questions.length > 0 && stage !== "results" && (
          <QuizDisplay
            questions={questions}
            answers={answers}
            onAnswer={handleAnswer}
            canSubmit={Object.keys(answers).length === questions.length}
            onSubmit={handleSubmitAll}
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
