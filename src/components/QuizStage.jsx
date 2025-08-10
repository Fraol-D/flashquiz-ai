export default function QuizStage({
  questions,
  currentIndex,
  selectedOption,
  onSelectOption,
  onNext,
  onFinish,
}) {
  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="glass-card p-4 sm:p-6 space-y-4 hover:shadow-2xl hover:shadow-cyan-500/10">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-300">
          Question {currentIndex + 1} / {questions.length}
        </p>
      </div>

      <p className="font-semibold text-slate-100">{question.question}</p>

      <div className="grid gap-2 sm:grid-cols-2">
        {question.options.map((opt, oi) => {
          const isSelected = selectedOption === oi;
          const isCorrect = oi === question.answerIndex;
          const showFeedback =
            selectedOption !== null && selectedOption !== undefined;

          let classes = "option-btn ";
          if (showFeedback) {
            if (isCorrect) {
              classes +=
                " option-btn-correct text-emerald-300 border-emerald-400/60";
            } else if (isSelected) {
              classes +=
                " option-btn-incorrect text-rose-300 border-rose-400/60";
            } else {
              classes += "";
            }
          } else {
            classes += isSelected ? "option-btn-selected" : "";
          }

          return (
            <button
              key={oi}
              type="button"
              onClick={() => onSelectOption(oi)}
              className={classes}
              disabled={showFeedback}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="pt-2 flex justify-end">
        {selectedOption === null || selectedOption === undefined ? null : (
          <button
            className="primary-btn px-5 py-2.5"
            onClick={isLast ? onFinish : onNext}
          >
            {isLast ? "Finish Quiz" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
}
