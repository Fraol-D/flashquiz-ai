import Spinner from "./Spinner.jsx";

export default function LoadingCard() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="inline-flex items-center justify-center rounded-full bg-cyan-400/20 p-2">
          <Spinner />
        </div>
        <p className="font-medium text-slate-100">Generating quiz…</p>
      </div>
      <div className="space-y-2 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-5/6" />
        <div className="h-4 bg-white/10 rounded w-4/6" />
        <div className="h-4 bg-white/10 rounded w-3/6" />
      </div>
    </div>
  );
}
