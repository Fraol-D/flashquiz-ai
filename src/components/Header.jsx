export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="text-white" aria-hidden>
              ⚡
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
              FlashQuiz
            </span>
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="primary-btn"
          >
            Star
          </a>
        </div>
      </div>
    </header>
  );
}
