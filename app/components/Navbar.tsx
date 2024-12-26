'use client'
import { useState } from 'react'
import Link from 'next/link'
import HamburgerMenu from './HamburgerMenu'

export default function Navbar() {
  return (
    <nav className="bg-[#0c141c]/95 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex-shrink-0 flex items-center group transition-all duration-200"
            >
              <div className="h-8 w-8 rounded-full bg-[#44bcd8] flex items-center justify-center
                group-hover:shadow-[0_0_15px_rgba(68,188,216,0.3)] transition-all duration-200">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-100 hidden sm:block
                group-hover:text-[#44bcd8] transition-colors duration-200">
                NSPF
              </span>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center md:hidden">
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </nav>
  )
} 