'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'

export default function AuthNavbar() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <nav className="bg-[#1a2633] border-b border-[#44bcd8]/10 shadow-[0_0_15px_rgba(68,188,216,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-8">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex-shrink-0 flex items-center group transition-all duration-200">
              <div className="h-8 w-8 rounded-full bg-[#44bcd8] flex items-center justify-center
                group-hover:shadow-[0_0_15px_rgba(68,188,216,0.3)] transition-all duration-200">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-100 group-hover:text-[#44bcd8] transition-colors duration-200">
                NSPF
              </span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="p-2 text-[#44bcd8]/70 hover:text-[#44bcd8] transition-colors duration-200 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center hover:bg-[#44bcd8]/10 rounded-lg p-2 transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-[#44bcd8]/20 flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-semibold text-[#44bcd8]">{user?.name?.[0]}</span>
                  )}
                </div>
                <div className="flex items-center ml-3">
                  <span className="hidden md:block font-medium text-gray-100 text-right min-w-[120px]">
                    {user?.name}
                  </span>
                  <svg className="w-4 h-4 text-[#44bcd8]/70 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-[#44bcd8]/30 
                    bg-[#1a2633] shadow-[0_0_15px_rgba(68,188,216,0.25)] z-50 divide-y divide-[#44bcd8]/10">
                    <div className="px-4 py-3 text-xs">
                      <span className="text-[#44bcd8]/70">Signed in as</span>
                      <div className="font-medium text-gray-100 truncate">{user?.email}</div>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false)
                          logout()
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 
                          hover:bg-red-500/10 transition-colors duration-200"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 