'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className="relative z-50">
      {/* Modern Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-lg bg-transparent focus:outline-none group"
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-4 flex flex-col justify-between">
          <span 
            className={`w-full h-0.5 bg-gray-600 rounded-full transform transition-all duration-300 ease-in-out
              ${isOpen ? 'rotate-45 translate-y-1.5' : ''}
            `}
          />
          <span 
            className={`w-full h-0.5 bg-gray-600 rounded-full transform transition-all duration-300 ease-in-out
              ${isOpen ? 'opacity-0 translate-x-3' : ''}
            `}
          />
          <span 
            className={`w-full h-0.5 bg-gray-600 rounded-full transform transition-all duration-300 ease-in-out
              ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}
            `}
          />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      )}

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <nav className="p-4 space-y-4">
            <Link
              href="/"
              className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <div className="px-4 py-2">
              <h3 className="text-[#44bcd8] font-medium mb-2">Welcome to NSPF</h3>
              <p className="text-sm text-gray-600">
                Access the paint management system to track inventory, manage orders, and monitor production.
              </p>
            </div>
            <div className="px-4 py-2">
              <h3 className="text-[#2ecc71] font-medium mb-2">System Access</h3>
              <p className="text-sm text-gray-600">
                Please contact your administrator for system access and credentials.
              </p>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
} 