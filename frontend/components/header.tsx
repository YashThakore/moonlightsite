"use client"

import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import Link from "next/link"

export function Header() {
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

          {/* Center: Navigation */}
          <nav className="hidden md:flex space-x-8 text-white/90 text-sm font-medium">
            <Link href="/commands" className="hover:text-white transition-colors">Commands</Link>
            <Link href="/#premium" className="hover:text-white transition-colors">Premium</Link>
            <Link href="/#support" className="hover:text-white transition-colors">Support</Link>
          </nav>

          {/* Right: Dashboard */}
          <Link href="/dashboard">
            <div className="flex items-center gap-2 bg-[#FDFBD4] text-[#030303] hover:bg-[#f2f0e8] px-4 py-2 rounded-full transition-all text-sm">
              <Bot className="h-4 w-4" />
              Dashboard
            </div>
          </Link>
        </div>
      </header>

      <div className="h-20 sm:h-24 md:h-28 lg:h-32" />
    </>
  )
}
