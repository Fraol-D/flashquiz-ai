import { useState } from "react";
import Spinner from "./Spinner.jsx";

export default function QuizForm({
  onGenerate,
  isLoading,
  initialText = "",
  initialCount = 6,
}) {
  const [text, setText] = useState(initialText);
  const [count, setCount] = useState(initialCount);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    const n = Math.min(Math.max(Number(count) || 6, 1), 20);
    onGenerate(text.trim(), n);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card p-4 sm:p-6 hover:shadow-2xl hover:shadow-cyan-500/10"
    >
      <label
        htmlFor="source"
        className="block text-sm font-medium mb-2 text-slate-200"
      >
        Paste any study text. We’ll generate a multiple-choice quiz.
      </label>
      <textarea
        id="source"
        className="glass-input min-h-40 p-3 sm:p-4"
        placeholder="e.g., Notes about the water cycle, a Wikipedia paragraph, or a lecture transcript..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label
            htmlFor="qcount"
            className="text-sm text-black/70 dark:text-white/70"
          >
            Questions
          </label>
          <input
            id="qcount"
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="glass-input w-24 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="primary-btn px-5 py-2.5"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <Spinner /> Generating…
            </span>
          ) : (
            "Generate Quiz"
          )}
        </button>
        <button
          type="button"
          className="text-sm text-slate-300 hover:text-white/90 transition-all duration-300 hover:scale-[1.01]"
          onClick={() => setText("")}
          disabled={isLoading}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
