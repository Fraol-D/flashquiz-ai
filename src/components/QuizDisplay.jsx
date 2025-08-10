export default function QuizDisplay({
  questions,
  answers,
  onAnswer,
  onFinish,
}) {
  if (!questions?.length) {
    return (
      <div className="glass-card p-6 text-slate-300">
        No questions yet. Paste text above and generate a quiz.
      </div>
    );
  }

  return (
    <div className="glass-card p-4 sm:p-6 space-y-6">
      {questions.map((q, qi) => (
        <div key={qi} className="space-y-3">
          <p className="font-semibold text-slate-100">{q.question}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => onAnswer(qi, oi)}
                  className={
                    "rounded-xl border px-3 py-2 text-left transition " +
                    (selected
                      ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-200"
                      : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-200")
                  }
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="pt-2">
        <button className="primary-btn px-5 py-2.5" onClick={onFinish}>
          Finish Quiz
        </button>
      </div>
    </div>
  );
}
