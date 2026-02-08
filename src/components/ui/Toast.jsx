import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { hideToast, selectToast } from "../../store/uiSlice"

const toneStyles = {
  success: "bg-emerald-500 text-white",
  error: "bg-rose-500 text-white",
  info: "bg-slate-900 text-white dark:bg-white dark:text-slate-900",
}

const MotionDiv = motion.div

const Toast = () => {
  const dispatch = useDispatch()
  const toast = useSelector(selectToast)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => dispatch(hideToast()), 4000)
    return () => clearTimeout(timer)
  }, [toast, dispatch])

  return (
    <AnimatePresence>
      {toast ? (
        <MotionDiv
          className={`fixed bottom-10 left-0 right-0 mx-auto z-50 w-fit rounded-2xl px-4 py-3 text-sm font-semibold shadow-soft ${
            toneStyles[toast.tone || "info"]
          }`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
        >
          {toast.message}
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  )
}

export default Toast
