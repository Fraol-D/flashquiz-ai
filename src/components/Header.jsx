export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl transition-colors duration-300 bg-white/70 border-b border-black/10 dark:bg-black/40 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-xl bg-black/10 border border-black/20 dark:bg-white/10 dark:border-white/20 flex items-center justify-center">
            <span className="text-black dark:text-white" aria-hidden>
              ⚡
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
              FlashQuiz
            </span>
          </h1>
        </div>
        <div
          className="hidden sm:flex items-center gap-2"
          id="header-actions"
        />
      </div>
    </header>
  );
}
