import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react"
import { loginSuccess, DEFAULT_EMAIL, DEFAULT_PASSWORD } from "../store/authSlice"
import { showToast } from "../store/uiSlice"
import Button from "../components/ui/Button"

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format"
    }
    if (!password) {
      newErrors.password = "Password is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setIsLoading(true)
    
    if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      const user = {
        id: "1",
        email: DEFAULT_EMAIL,
        name: "Demo User",
      }
      dispatch(loginSuccess(user))
      dispatch(
        showToast({
          message: "Login successful!",
          type: "success",
        })
      )
      navigate("/")
    } else {
      dispatch(
        showToast({
          message: "Invalid credentials",
          type: "error",
        })
      )
      setErrors({ form: "Invalid credentials" })
    }
    
    setIsLoading(false)
  }

  const handleDemoLogin = () => {
    setEmail(DEFAULT_EMAIL)
    setPassword(DEFAULT_PASSWORD)
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md">
        <div className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg">
                <LogIn className="h-8 w-8" />
              </div>
            </div>
            <h1 className="mb-2 text-2xl font-semibold text-slate-900 dark:text-white">
              Welcome back
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.form && (
              <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {errors.form}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrors({ ...errors, email: "" })
                  }}
                  placeholder="Enter your email"
                  className={`w-full rounded-2xl border bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : "border-slate-200"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors({ ...errors, password: "" })
                  }}
                  placeholder="Enter your password"
                  className={`w-full rounded-2xl border bg-slate-50 py-3 pl-11 pr-12 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : "border-slate-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                  Demo credentials
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleDemoLogin}
            >
              Use demo credentials
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
          <p className="font-semibold mb-1">Default Credentials:</p>
          <p>Email: {DEFAULT_EMAIL}</p>
          <p>Password: {DEFAULT_PASSWORD}</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
