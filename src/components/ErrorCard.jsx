export default function ErrorCard({ message, onRetry }) {
  return (
    <div className="glass-card p-6 border border-rose-400/30 hover:shadow-2xl hover:shadow-rose-500/10">
      <p className="text-rose-200 font-semibold">Quiz generation failed</p>
      <p className="text-slate-300 mt-1">
        {message ||
          "Something went wrong while generating your quiz. Please try again."}
      </p>
      <div className="pt-3">
        <button className="primary-btn px-5 py-2.5" onClick={onRetry}>
          Try Again
        </button>
      </div>
    </div>
  );
}
