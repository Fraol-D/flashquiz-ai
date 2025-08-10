import { useState } from "react";
import Spinner from "./Spinner.jsx";

export default function QuizForm({ onGenerate, isLoading }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onGenerate(text.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-4 sm:p-6">
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
          className="text-sm text-slate-300 hover:text-white/90 transition"
          onClick={() => setText("")}
          disabled={isLoading}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
