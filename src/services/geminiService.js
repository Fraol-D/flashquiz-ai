// Minimal Gemini 1.5 fetch wrapper. Replace endpoint if needed.
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function generateQuizFromText({ apiKey, text }) {
  if (!apiKey) throw new Error("Missing Gemini API key");
  if (!text?.trim()) throw new Error("Missing source text");

  const systemPrompt = `You are FlashQuiz, an expert quiz generator. Given arbitrary study text, produce concise multiple-choice questions.
Requirements:
- Return STRICT JSON only. No prose.
- Shape: { "questions": [ { "question": string, "options": string[4], "answerIndex": number } ] }
- 6 questions, each with exactly 4 options. Ensure one correct answer via answerIndex (0-3). Keep questions clear and unambiguous.`;

  const body = {
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

  const res = await fetch(`${API_URL}?key=${apiKey}`, {
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
  if (jsonStart === -1 || jsonEnd === -1)
    throw new Error("Invalid model output");
  const parsed = JSON.parse(candidateText.slice(jsonStart, jsonEnd + 1));

  const questions = Array.isArray(parsed?.questions) ? parsed.questions : [];
  return questions;
}
