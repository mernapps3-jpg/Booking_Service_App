import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import {
  addUserMessage,
  selectChatMessages,
  selectChatSuggestions,
  selectChatTyping,
  sendChatMessage,
} from "../../store/chatSlice"
import ChatMessage from "./ChatMessage"
import TypingIndicator from "./TypingIndicator"

const MotionDiv = motion.div

const SupportAssistant = () => {
  const dispatch = useDispatch()
  const messages = useSelector(selectChatMessages)
  const suggestions = useSelector(selectChatSuggestions)
  const isTyping = useSelector(selectChatTyping)
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isTyping])

  const handleSend = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    dispatch(addUserMessage(trimmed))
    dispatch(sendChatMessage(trimmed))
    setInput("")
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen ? (
          <MotionDiv
            className="mb-4 w-80 overflow-hidden rounded-3xl border bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
          >
            <div className="flex items-center justify-between border-b px-4 py-3 dark:border-slate-800">
              <div>
                <div className="text-sm font-semibold">Support Assistant</div>
                <div className="text-xs text-slate-500">Ask a quick question</div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full border p-1 text-slate-500 transition hover:text-slate-700 dark:border-slate-700"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div
              ref={scrollRef}
              className="flex max-h-72 flex-col gap-3 overflow-y-auto px-4 py-3"
            >
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping ? (
                <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm dark:bg-slate-800">
                  <TypingIndicator />
                </div>
              ) : null}
            </div>
            <div className="border-t px-4 py-3 dark:border-slate-800">
              <div className="flex flex-wrap gap-2 pb-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="rounded-full border px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    type="button"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-2xl border bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-transparent outline-none"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSend(input)
                    }
                  }}
                />
                <button
                  onClick={() => handleSend(input)}
                  className="rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white"
                  type="button"
                >
                  Send
                </button>
              </div>
            </div>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
      <button
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white shadow-soft"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  )
}

export default SupportAssistant
