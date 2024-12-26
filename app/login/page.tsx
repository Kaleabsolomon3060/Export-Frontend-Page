'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      await login(formData.email, formData.password)
      // After successful login, redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      setErrors({
        general: 'Failed to login. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0c141c]">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 p-8 border border-[#44bcd8]/30 rounded-lg
          shadow-[0_0_15px_rgba(68,188,216,0.15)] backdrop-blur-sm">
          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4">
            <Link
              href="/login"
              className="px-8 py-2 text-[#44bcd8] border-2 border-[#44bcd8] rounded-lg 
                hover:bg-[#44bcd8]/10 transition-all duration-200 
                hover:shadow-[0_0_15px_rgba(68,188,216,0.3)]"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-8 py-2 text-[#2ecc71] border-2 border-[#2ecc71] rounded-lg 
                hover:bg-[#2ecc71]/10 transition-all duration-200 
                hover:shadow-[0_0_15px_rgba(46,204,113,0.3)]"
            >
              Sign Up
            </Link>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="rounded-md bg-red-900/50 border border-red-500/50 p-3 animate-shake">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-400">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-[#44bcd8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Username"
                    className={`w-full pl-12 pr-4 py-3 bg-transparent border ${
                      errors.email ? 'border-red-500' : 'border-[#44bcd8]'
                    } rounded-lg text-gray-200 placeholder-gray-400
                      focus:outline-none focus:ring-1 focus:ring-[#44bcd8] 
                      transition-all duration-200 group-hover:shadow-[0_0_15px_rgba(68,188,216,0.25)]`}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      if (errors.email) setErrors({ ...errors, email: undefined })
                    }}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400 animate-fade-in">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-[#44bcd8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                    className={`w-full pl-12 pr-4 py-3 bg-transparent border ${
                      errors.password ? 'border-red-500' : 'border-[#44bcd8]'
                    } rounded-lg text-gray-200 placeholder-gray-400
                      focus:outline-none focus:ring-1 focus:ring-[#44bcd8]
                      transition-all duration-200 group-hover:shadow-[0_0_15px_rgba(68,188,216,0.25)]`}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value })
                      if (errors.password) setErrors({ ...errors, password: undefined })
                    }}
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-400 animate-fade-in">{errors.password}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-300">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#44bcd8] bg-transparent text-[#44bcd8] focus:ring-[#44bcd8]"
                />
                <label htmlFor="remember-me" className="ml-2">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-[#44bcd8] hover:text-[#44bcd8]/80 transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`mx-auto w-1/2 flex justify-center py-2 px-4 rounded-lg text-white 
                bg-[#2ecc71] hover:bg-[#2ecc71]/90
                transition-all duration-200 hover:shadow-[0_0_15px_rgba(46,204,113,0.5)]
                ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Signing in...' : 'LOGIN'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 border-t border-[#44bcd8]/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-[#44bcd8]/10 flex items-center justify-center">
              <span className="text-[#44bcd8] text-sm font-bold">N</span>
            </div>
            <span className="text-[#44bcd8]/70 text-sm font-medium">
              Nefas Silk Paints Factory Plc
            </span>
          </div>
          <p className="text-[#44bcd8]/40 text-xs">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </footer>
    </div>
  )
} 