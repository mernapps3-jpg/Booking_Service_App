import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getFaqs } from "../services/api"
import { generateGeminiResponse, hasGeminiKey } from "../services/gemini"
import { getAiResponse } from "../utils/ai"
import { createId } from "../utils/id"
import { delay } from "../utils/delay"

const initialState = {
  messages: [
    {
      id: createId("msg"),
      role: "assistant",
      content:
        "Hi! I can help with pricing, booking, cancellations, and availability.",
      createdAt: new Date().toISOString(),
    },
  ],
  faqs: [],
  suggestions: [],
  isTyping: false,
  status: "idle",
  error: null,
}

export const fetchFaqs = createAsyncThunk("chat/fetchFaqs", async () => {
  return getFaqs()
})

export const sendChatMessage = createAsyncThunk(
  "chat/sendChatMessage",
  async (message, { getState }) => {
    await delay(700)
    const faqs = getState().chat.faqs
    const history = getState().chat.messages
    let response = null

    if (hasGeminiKey) {
      try {
        response = await generateGeminiResponse({
          message,
          faqs,
          history: history.filter(
            (entry, index, array) =>
              !(
                index === array.length - 1 &&
                entry.role === "user" &&
                entry.content === message
              )
          ),
        })
      } catch {
        response = null
      }
    }

    if (!response) {
      response = getAiResponse(message, faqs)
    }

    return response
  }
)

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserMessage(state, action) {
      state.messages.push({
        id: createId("msg"),
        role: "user",
        content: action.payload,
        createdAt: new Date().toISOString(),
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.faqs = action.payload
        state.suggestions = action.payload
          .slice(0, 3)
          .map((faq) => faq.question)
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error?.message || "Unable to load FAQs."
      })
      .addCase(sendChatMessage.pending, (state) => {
        state.isTyping = true
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.isTyping = false
        state.messages.push({
          id: createId("msg"),
          role: "assistant",
          content: action.payload.answer,
          createdAt: new Date().toISOString(),
        })
        state.suggestions = action.payload.related || state.suggestions
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isTyping = false
        state.error = action.error?.message || "Unable to respond."
      })
  },
})

export const { addUserMessage } = chatSlice.actions

export const selectChatMessages = (state) => state.chat.messages
export const selectChatSuggestions = (state) => state.chat.suggestions
export const selectChatTyping = (state) => state.chat.isTyping

export default chatSlice.reducer
