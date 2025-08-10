export default function QuizDisplay({
  questions,
  answers,
  onAnswer,
  canSubmit,
  onSubmit,
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
          <p className="font-semibold">
            Q{qi + 1}. {q.question}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => onAnswer(qi, oi)}
                  className={`option-btn ${
                    selected ? "option-btn-selected" : ""
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="pt-2 flex justify-end">
        <button
          className="primary-btn px-5 py-2.5"
          onClick={onSubmit}
          disabled={!canSubmit}
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
}
