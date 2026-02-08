const ChatMessage = ({ message }) => {
  const isAssistant = message.role === "assistant"

  return (
    <div className={`flex`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
          isAssistant
            ? "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
            : "bg-brand-500 text-white"
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}

export default ChatMessage
