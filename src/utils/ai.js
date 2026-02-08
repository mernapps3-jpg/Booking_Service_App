const keywordMap = [
  { tag: "pricing", keywords: ["price", "cost", "fee", "rate", "charge"] },
  { tag: "booking", keywords: ["book", "booking", "reserve", "schedule"] },
  { tag: "cancellation", keywords: ["cancel", "refund", "reschedule"] },
  { tag: "availability", keywords: ["available", "availability", "slot", "time"] },
  { tag: "payment", keywords: ["pay", "payment", "invoice", "card"] },
  { tag: "support", keywords: ["help", "support", "contact", "issue"] },
]

const fallback = {
  answer:
    "I can help with pricing, booking, cancellations, and availability. Try asking one of the suggested questions.",
  tag: "fallback",
}

export const getAiResponse = (question, faqs) => {
  const normalized = question.toLowerCase()
  const matchedTag = keywordMap.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword))
  )?.tag

  const matchedFaq = faqs.find((faq) => faq.tag === matchedTag)
  if (matchedFaq) {
    return {
      answer: matchedFaq.answer,
      matchedTag,
      related: faqs
        .filter((faq) => faq.tag !== matchedTag)
        .slice(0, 3)
        .map((faq) => faq.question),
    }
  }

  return { ...fallback, related: faqs.slice(0, 3).map((faq) => faq.question) }
}
