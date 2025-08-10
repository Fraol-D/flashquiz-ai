import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import QuizForm from "./components/QuizForm.jsx";
import QuizDisplay from "./components/QuizDisplay.jsx";
import { generateQuizFromText } from "./services/geminiService.js";
import "./index.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const apiKey = useMemo(
    () => localStorage.getItem("GEMINI_API_KEY") || "",
    []
  );

  async function handleGenerate(text) {
    try {
      setIsLoading(true);
      setAnswers({});
      setScore(null);
      const key = localStorage.getItem("GEMINI_API_KEY") || apiKey;
      const result = await generateQuizFromText({ apiKey: key, text });
      setQuestions(result);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to generate quiz");
    } finally {
      setIsLoading(false);
    }
  }

  function handleAnswer(questionIndex, optionIndex) {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  }

  function handleFinish() {
    if (!questions.length) return;
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answerIndex) correct += 1;
    });
    setScore({ correct, total: questions.length });
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        <QuizForm onGenerate={handleGenerate} isLoading={isLoading} />

        {score ? (
          <div className="glass-card p-6">
            <p className="text-lg font-semibold">
              Score: {score.correct} / {score.total}
            </p>
            <p className="text-slate-300 mt-1">
              {Math.round((score.correct / score.total) * 100)}%
            </p>
          </div>
        ) : null}

        <QuizDisplay
          questions={questions}
          answers={answers}
          onAnswer={handleAnswer}
          onFinish={handleFinish}
        />
      </main>
    </div>
  );
}

export default App;
