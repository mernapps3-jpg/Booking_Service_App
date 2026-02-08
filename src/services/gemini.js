const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
// Gemini 2.5 Flash model (free tier)
const MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash"

export const hasGeminiKey = Boolean(API_KEY)

const buildFaqContext = (faqs = []) => {
  if (!faqs.length) return ""
  return `FAQs:\n${faqs
    .map((faq) => `- Q: ${faq.question}\n  A: ${faq.answer}`)
    .join("\n")}`
}

const mapHistory = (history = []) =>
  history.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }))

export const generateGeminiResponse = async ({
  message,
  faqs,
  history = [],
}) => {
  if (!API_KEY) {
    throw new Error("Missing Gemini API key.")
  }

  // Use v1beta API for Gemini 2.5 Flash model
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`

  const context = [
    "You are a helpful support assistant for a service booking platform.",
    "Keep responses short, friendly, and action-oriented.",
    "If unsure, suggest checking booking details or using the booking form.",
    buildFaqContext(faqs),
  ]
    .filter(Boolean)
    .join("\n")

  const contents = [
    { role: "user", parts: [{ text: context }] },
    ...mapHistory(history),
    { role: "user", parts: [{ text: message }] },
  ]

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.4, maxOutputTokens: 220 },
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const errorMessage = errorData?.error?.message || `Status: ${response.status}`
    console.error("Gemini API Error:", {
      status: response.status,
      model: MODEL,
      error: errorMessage,
    })
    throw new Error(`Gemini API request failed: ${errorMessage}`)
  }

  const data = await response.json()
  const text = data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .join("")
    .trim()

  if (!text) {
    throw new Error("Gemini did not return a response.")
  }

  return {
    answer: text,
    related: faqs.slice(0, 3).map((faq) => faq.question),
  }
}
