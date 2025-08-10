export default function SingleQuestion({ q, qi, selected, onAnswer }) {
  return (
    <div className="glass-card p-4 sm:p-6 space-y-3">
      <p className="font-semibold">
        Q{qi + 1}. {q.question}
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {q.options.map((opt, oi) => (
          <button
            key={oi}
            type="button"
            onClick={() => onAnswer(qi, oi)}
            className={`option-btn ${
              selected === oi ? "option-btn-selected" : ""
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
