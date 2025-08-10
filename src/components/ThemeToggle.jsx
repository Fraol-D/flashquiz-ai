import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("flashquiz_theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("flashquiz_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("flashquiz_theme", "light");
    }
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setIsDark((v) => !v)}
      className="primary-btn px-3 py-2"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {/* Sun for light, Moon for dark */}
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path d="M12 2.25a.75.75 0 01.75.75V5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.22 4.47a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L6.22 5.53a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75H5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm14.47-6.47a.75.75 0 011.06 1.06L16.72 7.65a.75.75 0 11-1.06-1.06l1.06-1.06zM12 18.75a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM4.47 17.78a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.47 18.84a.75.75 0 010-1.06zM19 11.25h1.5a.75.75 0 010 1.5H19a.75.75 0 010-1.5zm-2.78 6.53a.75.75 0 011.06-1.06l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06z" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path d="M21 12.79A9 9 0 1111.21 3c.2 0 .39.01.58.03a.75.75 0 01.4 1.33 6.5 6.5 0 008.45 9.23.75.75 0 01.36 1.2 8.96 8.96 0 01-0 0z" />
        </svg>
      )}
    </button>
  );
}
