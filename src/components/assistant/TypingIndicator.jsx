const TypingIndicator = () => (
  <div className="flex items-center gap-1">
    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.1s]" />
    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.2s]" />
  </div>
)

export default TypingIndicator
