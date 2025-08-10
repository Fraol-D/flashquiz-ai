export default function SingleQuestion({ q, qi, selected, onAnswer }) {
  const isAnswered = selected !== undefined && selected !== null;
  const isCorrect = isAnswered && selected === q.answerIndex;

  return (
    <div className="glass-card p-4 sm:p-6 space-y-3">
      <p className="font-semibold">
        Q{qi + 1}. {q.question}
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {q.options.map((opt, oi) => {
          let classes = "option-btn";
          if (isAnswered) {
            if (oi === q.answerIndex) {
              classes += " option-btn-correct";
            } else if (selected === oi) {
              classes += " option-btn-incorrect";
            }
          } else if (selected === oi) {
            classes += " option-btn-selected";
          }
          return (
            <button
              key={oi}
              type="button"
              onClick={() => !isAnswered && onAnswer(qi, oi)}
              className={classes}
              disabled={isAnswered}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
