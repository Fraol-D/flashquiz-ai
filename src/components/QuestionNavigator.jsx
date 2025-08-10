export default function QuestionNavigator({
  current,
  total,
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        type="button"
        className="primary-btn px-4 py-2"
        onClick={onPrev}
        disabled={disablePrev}
      >
        Prev
      </button>

      <div className="glass-card px-4 py-2 text-sm counter-bump">
        <span className="font-semibold">Question</span>
        <span className="mx-2">{current}</span>
        <span className="opacity-60">/ {total}</span>
      </div>

      <button
        type="button"
        className="primary-btn px-4 py-2"
        onClick={onNext}
        disabled={disableNext}
      >
        Next
      </button>
    </div>
  );
}
