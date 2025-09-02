import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Alert from '../components/Alert'
import { registerUser, verifyOTP, googleLogin } from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ email: '', otp: '' })
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await registerUser({
        name: 'Temp Name', // backend handles it for login
        email: formData.email,
      })
      setStep(2)
      setAlert({ type: 'success', message: 'OTP sent to your email address' })
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to send OTP',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await verifyOTP({
        name: 'Temp Name',
        email: formData.email,
        otp: formData.otp,
      })
      setUser(data)
      navigate('/dashboard')
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to verify OTP',
      })
    } finally {
      setLoading(false)
    }
  }

  // Google Sign-In setup
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleResponse,
        })
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInDiv'),
          { theme: 'outline', size: 'large', width: '100%' }
        )
      }
    }
  }, [])

  const handleGoogleResponse = async (response) => {
    if (!response.credential) return
    setLoading(true)
    try {
      const { data } = await googleLogin({ token: response.credential })
      setUser(data)
      navigate('/dashboard')
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Google login failed',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Header />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* Title */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your notes securely with OTP login.
          </p>
        </div>

        {/* Card */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          <div className="bg-white shadow-xl rounded-2xl px-8 py-10">
            {step === 1 ? (
              <form className="space-y-6" onSubmit={handleSendOTP}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleVerifyOTP}>
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Verification Code
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    We&apos;ve sent a verification code to your email.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify & Sign In'}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Change email address
                  </button>
                </div>
              </form>
            )}

            {/* Divider */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium">
                  <span className="bg-white px-4 text-gray-600">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6" id="googleSignInDiv"></div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
