// Gemini 2.5 Pro model endpoint
const MODEL = "gemini-2.5-pro";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export async function generateQuizFromText({ apiKey, text }) {
  if (!text?.trim()) throw new Error("Missing source text");

  // Prefer explicit apiKey, fallback to Vite env
  const resolvedKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || "";

  // If no key, return placeholder quiz so the app works end-to-end
  if (!resolvedKey) {
    return getPlaceholderQuestions(text);
  }

  const systemPrompt = `You are FlashQuiz, an expert quiz generator. Given arbitrary study text, produce concise multiple-choice questions.
Requirements:
- Return STRICT JSON only. No prose.
- Shape: { "questions": [ { "question": string, "options": string[4], "answerIndex": number } ] }
- 6 questions, each with exactly 4 options. Ensure one correct answer via answerIndex (0-3). Keep questions clear and unambiguous.`;

  const body = {
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          { text: systemPrompt },
          { text: `SOURCE:\n${text}` },
          { text: "Respond with JSON only." },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      topP: 0.9,
      maxOutputTokens: 2048,
    },
  };

  const res = await fetch(`${API_URL}?key=${resolvedKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Gemini error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Attempt to parse JSON from model output
  const jsonStart = candidateText.indexOf("{");
  const jsonEnd = candidateText.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("Invalid model output from Gemini");
  }
  let parsed;
  try {
    parsed = JSON.parse(candidateText.slice(jsonStart, jsonEnd + 1));
  } catch {
    throw new Error("Failed to parse Gemini response JSON");
  }

  const questions = Array.isArray(parsed?.questions) ? parsed.questions : [];
  if (!questions.length) {
    throw new Error("Gemini returned no questions");
  }
  return questions;
}

function getPlaceholderQuestions(source) {
  const topic = (source || "").slice(0, 40) || "your text";
  return [
    {
      question: `What is a key idea from ${topic}?`,
      options: [
        "Concept overview",
        "Random detail",
        "Unrelated fact",
        "Stylistic note",
      ],
      answerIndex: 0,
    },
    {
      question: "Which statement best summarizes the text?",
      options: [
        "Accurate summary",
        "Contradiction",
        "Irrelevant info",
        "Example only",
      ],
      answerIndex: 0,
    },
    {
      question: "Which option is most likely true given the text?",
      options: ["Supported inference", "Speculation", "Hyperbole", "Opinion"],
      answerIndex: 0,
    },
    {
      question: "What is the primary purpose of the text?",
      options: ["Explain", "Entertain", "Advertise", "Discredit"],
      answerIndex: 0,
    },
    {
      question: "Which detail best supports the main idea?",
      options: [
        "Key supporting fact",
        "Minor aside",
        "Counterexample",
        "Vague claim",
      ],
      answerIndex: 0,
    },
    {
      question: "What should a learner remember from the text?",
      options: [
        "Core takeaway",
        "Trivial note",
        "Formatting detail",
        "Author bio",
      ],
      answerIndex: 0,
    },
  ];
}
