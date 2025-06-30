"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bot, Menu, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="https://pbs.twimg.com/profile_images/1459679847115071495/ZOBwpWaf_400x400.jpg"
              alt="Moonlight Logo"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="text-white text-xl font-semibold">moonlight</span>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-white/90 text-sm font-medium">
            <Link href="/commands" className="hover:text-white transition-colors">Commands</Link>
            <Link href="/#premium" className="hover:text-white transition-colors">Premium</Link>
            <Link href="/#support" className="hover:text-white transition-colors">Support</Link>
          </nav>

          {/* Right: Dashboard + Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <div className="flex items-center gap-2 bg-[#FDFBD4] text-[#030303] hover:bg-[#f2f0e8] px-4 py-2 rounded-full transition-all text-sm">
                <Bot className="h-4 w-4" />
                Dashboard
              </div>
            </Link>

            {/* Mobile Toggle */}
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Animated Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobileMenu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-4 top-[72px] w-40 bg-black/90 rounded-lg shadow-md py-4 px-4 space-y-3 text-white text-sm font-medium"
            >
              <Link href="/commands" onClick={() => setMenuOpen(false)} className="block hover:text-white transition-colors">Commands</Link>
              <Link href="/#premium" onClick={() => setMenuOpen(false)} className="block hover:text-white transition-colors">Premium</Link>
              <Link href="/#support" onClick={() => setMenuOpen(false)} className="block hover:text-white transition-colors">Support</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
