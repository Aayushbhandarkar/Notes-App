import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Organize your thoughts with
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
              Notes App
            </span>
          </h1>

          <p className="mt-6 md:mt-8 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Your personal space to capture ideas, stay organized, and never lose track of what matters.
          </p>

          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              to="/signup"
              className="w-full sm:w-auto relative px-8 py-4 rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-2">🚀</span> Get Started Free
              </span>
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-indigo-600 text-indigo-600 bg-white hover:bg-indigo-50 font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">🔑</span> Sign In
              </span>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto shadow-inner group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mt-4 md:mt-6 text-xl md:text-2xl font-bold text-gray-900">⚡ Fast & Simple</h3>
            <p className="mt-3 md:mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
              Create notes in seconds with a clean, intuitive interface designed for speed.
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto shadow-inner group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="mt-4 md:mt-6 text-xl md:text-2xl font-bold text-gray-900">🔒 Secure</h3>
            <p className="mt-3 md:mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
              Your notes are protected with industry-grade encryption and privacy-first design.
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto shadow-inner group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="mt-4 md:mt-6 text-xl md:text-2xl font-bold text-gray-900">📂 Organized</h3>
            <p className="mt-3 md:mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
              Keep everything tidy with tags, categories, and powerful search at your fingertips.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-md py-6 mt-20 md:mt-32 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Notes App. All rights reserved.
        </div>
      </footer>
    </div>
  )
}