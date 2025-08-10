import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import QuizForm from "./components/QuizForm.jsx";
// import QuizStage from "./components/QuizStage.jsx";
import QuizDisplay from "./components/QuizDisplay.jsx";
import LoadingCard from "./components/LoadingCard.jsx";
import ErrorCard from "./components/ErrorCard.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import QuestionNavigator from "./components/QuestionNavigator.jsx";
import SingleQuestion from "./components/SingleQuestion.jsx";
import { generateQuizFromText } from "./services/geminiService.js";
import "./index.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState("input"); // input | quiz | results
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // qi -> oi
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
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
      setCurrentIndex(0);
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
    setCurrentIndex(0);
    setScore(0);
    setError("");
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {/* Always show input form at top */}
        <QuizForm onGenerate={handleGenerate} isLoading={isLoading} />
        {isLoading && <LoadingCard />}
        {!isLoading && error && (
          <ErrorCard message={error} onRetry={() => setError("")} />
        )}

        {questions.length > 0 && stage !== "results" && (
          <>
            <SingleQuestion
              q={questions[currentIndex]}
              qi={currentIndex}
              selected={answers[currentIndex]}
              onAnswer={handleAnswer}
            />
            <QuestionNavigator
              current={currentIndex + 1}
              total={questions.length}
              onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              onNext={() =>
                setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))
              }
              disablePrev={currentIndex === 0}
              disableNext={currentIndex === questions.length - 1}
            />
            <div className="flex justify-end">
              <button
                className="primary-btn mt-4 px-5 py-2.5"
                onClick={handleSubmitAll}
                disabled={Object.keys(answers).length !== questions.length}
              >
                Submit Answers
              </button>
            </div>
          </>
        )}

        {stage === "results" && (
          <div className="glass-card p-6 space-y-4 bg-white text-black dark:bg-black/70 dark:text-white">
            <div>
              <p className="text-xl font-semibold">Final Score</p>
              <p className="opacity-80">
                {score} / {questions.length} (
                {questions.length
                  ? Math.round((score / questions.length) * 100)
                  : 0}
                %)
              </p>
            </div>
            {questions.map((q, qi) => (
              <div key={qi} className="space-y-2">
                <p className="font-medium">
                  Q{qi + 1}. {q.question}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {q.options.map((opt, oi) => {
                    let classes = "option-btn";
                    if (oi === q.answerIndex) classes += " option-btn-correct";
                    else if (answers[qi] === oi)
                      classes += " option-btn-incorrect";
                    return (
                      <div key={oi} className={classes}>
                        {opt}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2">
              <button
                className="primary-btn px-5 py-2.5"
                onClick={() => setStage("quiz")}
              >
                Review Questions
              </button>
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
