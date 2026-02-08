import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import BookingModal from "./components/booking/BookingModal"
import SupportAssistant from "./components/assistant/SupportAssistant"
import Toast from "./components/ui/Toast"
import ScrollToTop from "./components/ui/ScrollToTop"
import ServicesPage from "./pages/ServicesPage"
import ServiceDetailsPage from "./pages/ServiceDetailsPage"
import BookingsPage from "./pages/BookingsPage"
import FavoritesPage from "./pages/FavoritesPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import { selectTheme } from "./store/uiSlice"
import { fetchFaqs } from "./store/chatSlice"

function App() {
  // Hooks to interact with Redux store
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  useEffect(() => {
    dispatch(fetchFaqs())
  }, [dispatch])

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailsPage />} />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <BookingModal />
      <SupportAssistant />
      <Toast />
    </div>
  )
}

export default App
